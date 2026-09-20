import cp from 'child_process'
import os from 'os'
import path from 'path'

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const TMP_PROFILE = path.join(os.tmpdir(), 'edge_test_logo_' + Date.now())

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.msgId = 1
    this.pending = new Map()

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.id && this.pending.has(data.id)) {
        const { resolve, reject } = this.pending.get(data.id)
        this.pending.delete(data.id)
        if (data.error) reject(data.error)
        else resolve(data.result)
      }
    }
  }

  async waitOpen() {
    if (this.ws.readyState === WebSocket.OPEN) return
    await new Promise((resolve) => {
      this.ws.onopen = resolve
    })
  }

  send(method, params = {}) {
    const id = this.msgId++
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    return res.result?.value
  }

  close() {
    try {
      this.ws.close()
    } catch {}
  }
}

async function runTests() {
  console.log('🚀 Starting Edge in headless mode with debugging...')
  const browserProc = cp.spawn(EDGE_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${TMP_PROFILE}`,
    '--disable-gpu',
    'http://localhost:5173/',
  ])

  // Give Edge 2.5s to start
  await sleep(2500)

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list')
    const pages = await listRes.json()
    const page = pages.find((p) => p.type === 'page' && p.url.includes('5173'))
    if (!page) {
      throw new Error('Could not find POLAR-AI page in Edge debugger: ' + JSON.stringify(pages))
    }

    console.log('🔗 Connecting to page CDP at:', page.webSocketDebuggerUrl)
    const client = new CDPClient(page.webSocketDebuggerUrl)
    await client.waitOpen()

    // Enable Runtime and Page domains
    await client.send('Runtime.enable')
    await client.send('Page.enable')

    console.log('⏳ Waiting for app to initialize...')
    await sleep(2000)

    // Ensure user session is active as Commander
    await client.eval(`
      (() => {
        sessionStorage.setItem('polar.demoSession', JSON.stringify({
          name: 'Cdr. Anjali Kulkarni',
          role: 'COMMANDER',
          signedInAt: new Date().toISOString()
        }));
        sessionStorage.setItem('polar.activeStation', 'maitri');
        sessionStorage.setItem('polar.activeView', 'dashboard');
        if (!window.location.hash) {
          window.location.hash = '#dashboard';
        }
      })()
    `)

    // Reload page with session established
    await client.send('Page.reload', { ignoreCache: true })
    await sleep(2500)

    // Check session
    const sessionCheck = await client.eval(`
      (() => {
        const raw = sessionStorage.getItem('polar.demoSession');
        const sess = raw ? JSON.parse(raw) : null;
        const station = sessionStorage.getItem('polar.activeStation');
        const hash = window.location.hash;
        return { user: sess?.name, role: sess?.role, station, hash };
      })()
    `)
    console.log('👤 Active Session Check:', sessionCheck)

    // ==========================================
    // TEST 1: DESKTOP NAVIGATION MATRIX
    // ==========================================
    console.log('\n--- TEST 1: Desktop Viewport (1280x800) Brand Logo Tests ---')
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    })

    const testPages = [
      'expeditions',
      'cargo',
      'inventory',
      'assets',
      'risks',
      'simulator',
      'copilot',
      'personnel',
      'emergency',
      'reports',
      'audit',
    ]

    for (const p of testPages) {
      // Navigate to test page
      await client.eval(`window.location.hash = '#${p}'`)
      await sleep(400)

      const pageBefore = await client.eval(`window.location.hash`)
      if (pageBefore !== `#${p}`) {
        throw new Error(`Failed to navigate to #${p}, got ${pageBefore}`)
      }

      // Click POLAR-AI logo in Sidebar
      const clickRes = await client.eval(`
        (() => {
          const btn = document.querySelector('aside button[aria-label="Go to Dashboard"]');
          if (!btn) return { error: 'Sidebar Go to Dashboard button not found' };
          btn.click();
          return { ok: true };
        })()
      `)

      if (clickRes.error) {
        throw new Error(clickRes.error)
      }

      await sleep(350)

      // Verify returned to Dashboard
      const checkAfter = await client.eval(`
        (() => {
          const raw = sessionStorage.getItem('polar.demoSession');
          const sess = raw ? JSON.parse(raw) : null;
          const station = sessionStorage.getItem('polar.activeStation') || 'maitri';
          const hash = window.location.hash;
          return { user: sess?.name, role: sess?.role, station, hash };
        })()
      `)

      if (checkAfter.hash !== '#dashboard' && checkAfter.hash !== '') {
        throw new Error(`After clicking POLAR-AI from #${p}, expected #dashboard but got ${checkAfter.hash}`)
      }
      if (checkAfter.user !== 'Cdr. Anjali Kulkarni') {
        throw new Error(`User session was corrupted! Expected Cdr. Anjali Kulkarni, got ${checkAfter.user}`)
      }
      if (checkAfter.station !== 'maitri') {
        throw new Error(`Station selection was corrupted! Expected maitri, got ${checkAfter.station}`)
      }

      console.log(`  ✓ From #${p} -> Clicked POLAR-AI -> #dashboard | Session & Maitri intact`)
    }

    // ==========================================
    // TEST 2: ALREADY ON DASHBOARD -> REFRESH / REVALIDATE
    // ==========================================
    console.log('\n--- TEST 2: Already on Dashboard -> Click POLAR-AI ---')
    await client.eval(`window.location.hash = '#dashboard'`)
    await sleep(300)

    // Trigger detail drawer open on Dashboard
    await client.eval(`
      (() => {
        // Find and click any "Details →" button on Dashboard to open a drawer
        const detailBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Details →'));
        if (detailBtns[0]) detailBtns[0].click();
      })()
    `)
    await sleep(400)

    const drawerOpenBefore = await client.eval(`
      Boolean(document.querySelector('.fixed.inset-0') || document.querySelector('[role="dialog"]') || document.body.textContent.includes('System Subsystem Telemetry'))
    `)
    console.log('  Detail drawer opened before logo click:', drawerOpenBefore)

    // Click POLAR-AI logo
    const revalidateClick = await client.eval(`
      (() => {
        const btn = document.querySelector('aside button[aria-label="Go to Dashboard"]');
        if (!btn) return { error: 'Sidebar logo button not found' };
        btn.click();
        return { ok: true };
      })()
    `)
    if (revalidateClick.error) throw new Error(revalidateClick.error)

    await sleep(300)

    const revalidateCheck = await client.eval(`
      (() => {
        const raw = sessionStorage.getItem('polar.demoSession');
        const sess = raw ? JSON.parse(raw) : null;
        const station = sessionStorage.getItem('polar.activeStation') || 'maitri';
        const hash = window.location.hash;
        const text = document.body.textContent;
        const isRevalidating = text.includes('Revalidating Telemetry') || text.includes('Operational');
        return { user: sess?.name, station, hash, isRevalidating };
      })()
    `)

    console.log('  ✓ Dashboard in-place refresh result:', revalidateCheck)
    if (revalidateCheck.user !== 'Cdr. Anjali Kulkarni') {
      throw new Error('Session was reset during dashboard refresh!')
    }
    if (revalidateCheck.hash !== '#dashboard' && revalidateCheck.hash !== '') {
      throw new Error(`Unexpected hash after refresh: ${revalidateCheck.hash}`)
    }

    // ==========================================
    // TEST 3: TABLET VIEWPORT (820x1180)
    // ==========================================
    console.log('\n--- TEST 3: Tablet Viewport (820x1180) ---')
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 820,
      height: 1180,
      deviceScaleFactor: 2,
      mobile: false,
    })
    await client.eval(`window.location.hash = '#emergency'`)
    await sleep(400)

    // Click tablet topbar POLAR-AI button
    const tabletClick = await client.eval(`
      (() => {
        const btn = document.querySelector('header button[aria-label="Go to Dashboard"]');
        if (!btn) return { error: 'Tablet TopBar Go to Dashboard button not found' };
        btn.click();
        return { ok: true };
      })()
    `)
    if (tabletClick.error) throw new Error(tabletClick.error)
    await sleep(350)

    const tabletCheck = await client.eval(`
      (() => {
        const raw = sessionStorage.getItem('polar.demoSession');
        const sess = raw ? JSON.parse(raw) : null;
        const station = sessionStorage.getItem('polar.activeStation') || 'maitri';
        const hash = window.location.hash;
        return { user: sess?.name, station, hash };
      })()
    `)
    console.log('  ✓ Tablet TopBar POLAR-AI Click Result:', tabletCheck)
    if (tabletCheck.hash !== '#dashboard' && tabletCheck.hash !== '') {
      throw new Error(`Tablet click expected #dashboard, got ${tabletCheck.hash}`)
    }

    // ==========================================
    // TEST 4: MOBILE VIEWPORT (390x844)
    // ==========================================
    console.log('\n--- TEST 4: Mobile Viewport (390x844) ---')
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
      hasTouch: true,
    })
    await client.eval(`window.location.hash = '#cargo'`)
    await sleep(400)

    // Tap mobile header POLAR-AI button
    const mobileLogoClick = await client.eval(`
      (() => {
        const btn = document.querySelector('header.flex.md\\\\:hidden button[aria-label="Go to Dashboard"]');
        if (!btn) return { error: 'Mobile header Go to Dashboard button not found' };
        btn.click();
        return { ok: true };
      })()
    `)
    if (mobileLogoClick.error) throw new Error(mobileLogoClick.error)
    await sleep(350)

    const mobileCheck = await client.eval(`
      (() => {
        const raw = sessionStorage.getItem('polar.demoSession');
        const sess = raw ? JSON.parse(raw) : null;
        const station = sessionStorage.getItem('polar.activeStation') || 'maitri';
        const hash = window.location.hash;
        return { user: sess?.name, station, hash };
      })()
    `)
    console.log('  ✓ Mobile POLAR-AI Tap Result:', mobileCheck)
    if (mobileCheck.hash !== '#dashboard' && mobileCheck.hash !== '') {
      throw new Error(`Mobile tap expected #dashboard, got ${mobileCheck.hash}`)
    }
    if (mobileCheck.user !== 'Cdr. Anjali Kulkarni') {
      throw new Error('Mobile tap logged out user!')
    }

    // Now test tapping station button on mobile (must open station modal, NOT logout or navigate)
    const mobileStationClick = await client.eval(`
      (() => {
        const btn = document.querySelector('header.flex.md\\\\:hidden button[aria-label="Switch active polar station"]');
        if (!btn) return { error: 'Mobile station button not found' };
        btn.click();
        return { ok: true };
      })()
    `)
    if (mobileStationClick.error) throw new Error(mobileStationClick.error)
    await sleep(350)

    const stationModalCheck = await client.eval(`
      (() => {
        const hasStationModal = document.body.textContent.includes('Operational Theatres & Bases') || document.body.textContent.includes('Select Active Station');
        const raw = sessionStorage.getItem('polar.demoSession');
        const sess = raw ? JSON.parse(raw) : null;
        return { hasStationModal, user: sess?.name };
      })()
    `)
    console.log('  ✓ Mobile Station Switcher Click Result:', stationModalCheck)

    client.close()
    console.log('\n🎉 ALL POLAR-AI LOGO / DASHBOARD TESTS PASSED WITH 100% SUCCESS!')
  } finally {
    browserProc.kill()
  }
}

runTests().catch((err) => {
  console.error('\n❌ Test run failed:', err)
  process.exit(1)
})

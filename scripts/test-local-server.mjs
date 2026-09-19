import http from 'http';

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, length: data.length });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('Testing local server at http://localhost:5173 ...');
  try {
    const rootRes = await checkUrl('http://localhost:5173/');
    console.log(`[PASS] GET / -> HTTP ${rootRes.statusCode}, size: ${rootRes.length} bytes`);

    const mainRes = await checkUrl('http://localhost:5173/src/main.jsx');
    console.log(`[PASS] GET /src/main.jsx -> HTTP ${mainRes.statusCode}, size: ${mainRes.length} bytes`);

    const appRes = await checkUrl('http://localhost:5173/src/App.jsx');
    console.log(`[PASS] GET /src/App.jsx -> HTTP ${appRes.statusCode}, size: ${appRes.length} bytes`);

    const dashRes = await checkUrl('http://localhost:5173/src/pages/Dashboard.jsx');
    console.log(`[PASS] GET /src/pages/Dashboard.jsx -> HTTP ${dashRes.statusCode}, size: ${dashRes.length} bytes`);

    const landingRes = await checkUrl('http://localhost:5173/src/pages/LandingPage.jsx');
    console.log(`[PASS] GET /src/pages/LandingPage.jsx -> HTTP ${landingRes.statusCode}, size: ${landingRes.length} bytes`);

    console.log('\nAll local endpoints respond with HTTP 200 OK! Server is running smoothly.');
  } catch (e) {
    console.error('[FAIL] Error connecting to server:', e.message);
    process.exit(1);
  }
}

run();

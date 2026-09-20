/**
 * POLAR-AI — EXPEDITION MISSION COMMAND LOGIN
 * ===========================================
 * Clean, simplified Arctic White authentication gateway.
 *
 * Streamlined layout focusing on direct operator access:
 * - Operator Sign-In form with zero-trust validation
 * - Curated demo operator profiles with instant 1-click access
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  MapPin,
  Radio,
  ShieldCheck,
  User,
  Users as UsersIcon,
  X,
} from 'lucide-react'
import PolarLogo from '../components/PolarLogo'
import { useAuth } from '../store/AuthContext'
import { validateCredentials, USERS } from '../lib/credentials'

// Curated set of key demo operator profiles across core mission roles
const DEMO_OPERATORS = [
  USERS.find((u) => u.id === 'commander') || USERS[0],
  USERS.find((u) => u.id === 'admin') || USERS[2],
  USERS.find((u) => u.id === 'logistics') || USERS[4],
  USERS.find((u) => u.id === 'scientist') || USERS[6],
].filter(Boolean)

export default function Login() {
  const { signIn, signingIn, authError, clearAuthError } = useAuth()

  const [userId, setUserId] = useState('commander')
  const [password, setPassword] = useState('expedition@cmd')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [capsLockActive, setCapsLockActive] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [modalContent, setModalContent] = useState(null)

  // Detect Caps Lock state
  const handleKeyModifier = (e) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'))
    }
  }

  // Direct Credentials Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    clearAuthError()
    setLocalError(null)

    if (!userId.trim()) {
      setLocalError('Please enter your Operator User ID.')
      return
    }

    if (!password.trim()) {
      setLocalError('Please enter your security password.')
      return
    }

    const matched = validateCredentials(userId, password)
    if (!matched) {
      setLocalError('Invalid User ID or Password. Check credentials and try again.')
      return
    }

    signIn({ userId, password })
  }

  // Quick auto-fill into form
  const handleAutoFill = (u) => {
    setUserId(u.id)
    setPassword(u.password)
    setLocalError(null)
    clearAuthError()
  }

  // Instant 1-Click Login as a specific demo operator
  const handleInstantLogin = (u) => {
    setUserId(u.id)
    setPassword(u.password)
    setLocalError(null)
    clearAuthError()
    signIn({ userId: u.id, password: u.password })
  }

  return (
    <div className="relative min-h-screen w-full select-none overflow-x-hidden bg-[#F8FAFC] font-sans text-[#0C1E30] flex flex-col justify-between">
      {/* Background Subtle Polar Ice Accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#0284C7]/5 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-[#0284C7]/4 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(#0284C7 1px, transparent 1px), radial-gradient(#0C1E30 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />
      </div>

      {/* ============================================================
          1. CLEAN INSTITUTIONAL HEADER
          ============================================================ */}
      <header className="relative z-20 border-b border-[#DCE8F0] bg-white/90 px-4 py-3.5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] text-[#0284C7] shadow-xs">
              <PolarLogo size={28} withGlow={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold tracking-tight text-[#0C1E30]">
                  POLAR-AI
                </span>
                <span className="rounded-full bg-[#E0F2FE] px-2 py-0.5 text-[10.5px] font-mono font-medium text-[#0284C7]">
                  v2.4
                </span>
              </div>
              <div className="text-[11.5px] text-[#42586E]">
                Expedition Operations Gateway · NCPOR &amp; MoES
              </div>
            </div>
          </div>

          {/* Security & Support Status */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-mono font-medium text-emerald-800">
              <Lock size={11} className="text-emerald-700" />
              <span>TLS 1.3 Encrypted</span>
            </div>
            <button
              type="button"
              onClick={() => setModalContent('support')}
              className="text-[#42586E] hover:text-[#0284C7] transition hidden sm:inline-flex items-center gap-1 text-[11.5px] font-medium"
            >
              <HelpCircle size={13} />
              <span>Support</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          2. MAIN STAGE: LOGIN CARD (LEFT) + DEMO OPERATORS (RIGHT)
          ============================================================ */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 lg:py-12 my-auto">
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0C1E30]">
            Mission Command Access
          </h1>
          <p className="mt-1 text-sm text-[#42586E]">
            Sign in to access real-time polar telemetry, cargo tracking, and field logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* ================= LEFT: SECURE OPERATOR SIGN-IN ================= */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-xs sm:p-7">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] text-[#0284C7]">
                    <ShieldCheck size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#0C1E30] tracking-tight">
                      Operator Sign-In
                    </h2>
                    <p className="text-[11.5px] text-[#42586E]">
                      Enter credentials or select a demo profile
                    </p>
                  </div>
                </div>
                <span className="rounded-md border border-[#DCE8F0] bg-[#F8FAFC] px-2 py-0.5 font-mono text-[10.5px] font-medium text-[#0284C7]">
                  Auth Gate
                </span>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Operator ID Field */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0C1E30]">
                    Operator User ID
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8FA6B2]"
                    />
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value)
                        setLocalError(null)
                        clearAuthError()
                      }}
                      placeholder="e.g. commander, admin, logistics, scientist"
                      autoComplete="username"
                      className="w-full rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] py-2.5 pl-10 pr-3.5 text-xs text-[#0C1E30] placeholder-[#8FA6B2] transition focus:border-[#0284C7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15 font-mono"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-medium text-[#0C1E30]">
                      Security Passcode
                    </label>
                    {capsLockActive && (
                      <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-amber-600 animate-pulse">
                        <AlertTriangle size={11} />
                        Caps Lock ON
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8FA6B2]"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onKeyDown={handleKeyModifier}
                      onKeyUp={handleKeyModifier}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setLocalError(null)
                        clearAuthError()
                      }}
                      placeholder="Enter password (default: polar123)"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] py-2.5 pl-10 pr-10 text-xs text-[#0C1E30] placeholder-[#8FA6B2] transition focus:border-[#0284C7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15 font-mono"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA6B2] hover:text-[#0C1E30] transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Universal Password Note */}
                <div className="flex items-center justify-between text-xs text-[#42586E]">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-[#DCE8F0] text-[#0284C7] accent-[#0284C7]"
                    />
                    <span>Remember terminal</span>
                  </label>
                  <span className="font-mono text-[10.5px] text-[#0284C7]">
                    Master Pass: <code className="font-semibold">polar123</code>
                  </span>
                </div>

                {/* Error Banner */}
                {(localError || authError) && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0 text-rose-600" />
                    <span className="leading-relaxed">{localError || authError}</span>
                  </div>
                )}

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={signingIn}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] py-2.5 text-xs font-semibold text-white shadow-xs transition active:scale-[0.99] disabled:opacity-50"
                >
                  {signingIn ? (
                    <>
                      <Radio size={15} className="animate-pulse" />
                      <span>Verifying &amp; Initializing Console…</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Mission Console</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Zero-Trust Notice */}
              <div className="mt-4 border-t border-[#DCE8F0] pt-3.5 text-[11px] text-[#64748B] flex items-center gap-2">
                <Lock size={12} className="shrink-0 text-[#0284C7]" />
                <span>Authorized expedition personnel only. All access is cryptographically audited.</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: CURATED DEMO OPERATORS ================= */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-xs sm:p-7">
              {/* Roster Header */}
              <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <UsersIcon size={18} className="text-[#0284C7]" />
                    <h2 className="text-[16px] font-semibold text-[#0C1E30]">
                      Demo Operator Profiles
                    </h2>
                    <span className="rounded-full bg-[#E0F2FE] px-2 py-0.5 text-[10.5px] font-mono font-medium text-[#0284C7]">
                      {DEMO_OPERATORS.length} Ready
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#42586E]">
                    Click <strong>1-Click Login</strong> on any profile to test role permissions immediately.
                  </p>
                </div>
              </div>

              {/* Curated Profiles Grid (2x2) */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DEMO_OPERATORS.map((u) => {
                  const isSelected = userId.toLowerCase() === u.id.toLowerCase()

                  return (
                    <div
                      key={u.id}
                      className={`group relative rounded-xl border p-3.5 transition-all ${
                        isSelected
                          ? 'border-[#0284C7] bg-[#F0F9FF] shadow-xs'
                          : 'border-[#DCE8F0] bg-white hover:border-[#0284C7]/50 hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {/* Operator Identity & Role Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                              u.badgeTone === 'amber'
                                ? 'bg-amber-100 text-amber-800'
                                : u.badgeTone === 'sky'
                                ? 'bg-sky-100 text-sky-800'
                                : u.badgeTone === 'emerald'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}
                          >
                            {u.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-xs text-[#0C1E30] group-hover:text-[#0284C7] transition">
                              {u.name}
                            </div>
                            <div className="text-[10.5px] text-[#42586E]">{u.title}</div>
                          </div>
                        </div>

                        <span
                          className={`rounded px-1.5 py-0.5 text-[9.5px] font-mono font-medium uppercase ${
                            u.badgeTone === 'amber'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : u.badgeTone === 'sky'
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : u.badgeTone === 'emerald'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          {u.role}
                        </span>
                      </div>

                      {/* Station Assignment */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#42586E]">
                        <MapPin size={11} className="text-[#0284C7] shrink-0" />
                        <span className="truncate">{u.station}</span>
                      </div>

                      {/* Credentials Code Strip */}
                      <div className="mt-2.5 flex items-center justify-between rounded-lg bg-[#F8FAFC] px-2.5 py-1 text-[10.5px] font-mono border border-[#DCE8F0]">
                        <span className="text-[#42586E]">
                          ID: <strong className="text-[#0C1E30]">{u.id}</strong>
                        </span>
                        <span className="text-[#64748B]">
                          Pass: <code className="text-[#0284C7]">{u.password}</code>
                        </span>
                      </div>

                      {/* Action Buttons: 1-Click Login & Auto-Fill */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleInstantLogin(u)}
                          disabled={signingIn}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] py-1.5 text-[11px] font-medium text-white shadow-xs transition active:scale-95 disabled:opacity-50"
                        >
                          <CheckCircle2 size={12} />
                          <span>1-Click Login</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAutoFill(u)}
                          className="rounded-lg border border-[#DCE8F0] bg-white hover:bg-[#F8FAFC] px-2.5 py-1.5 text-[11px] font-medium text-[#42586E] hover:text-[#0C1E30] transition"
                          title="Pre-populate form inputs"
                        >
                          Auto-Fill
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================
          3. MINIMAL CLEAN FOOTER
          ============================================================ */}
      <footer className="relative z-10 border-t border-[#DCE8F0] bg-white/80 px-4 py-3.5 text-xs text-[#64748B] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div>
            <strong>POLAR-AI Mission Command</strong> · National Centre for Polar and Ocean Research (NCPOR)
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-[#64748B]">
            <span>MAITRI</span>
            <span className="text-[#DCE8F0]">·</span>
            <span>BHARATI</span>
            <span className="text-[#DCE8F0]">·</span>
            <span>HIMADRI</span>
            <span className="text-[#DCE8F0]">·</span>
            <span className="text-emerald-700 font-medium">SESSION ACTIVE</span>
          </div>
        </div>
      </footer>

      {/* ============================================================
          4. SUPPORT POPUP MODAL
          ============================================================ */}
      {modalContent === 'support' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1E30]/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-2xl text-xs text-[#0C1E30]">
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="absolute right-4 top-4 rounded-lg p-1 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0C1E30] transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#0C1E30]">
              <HelpCircle size={18} className="text-[#0284C7]" />
              <span>Polar Operations Room Support</span>
            </div>
            <p className="mt-2.5 leading-relaxed text-[#42586E]">
              24/7 communications support via Iridium satellite link and NCPOR Goa Operations Room.
            </p>
            <div className="mt-3 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-3 font-mono text-[11px] space-y-1.5">
              <div>HQ Relay: NCPOR Goa (+91 832 252 5600)</div>
              <div>HF USB Relay: 8.845 MHz USB</div>
              <div>Distress Frequency: 406.025 MHz COSPAS-SARSAT</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

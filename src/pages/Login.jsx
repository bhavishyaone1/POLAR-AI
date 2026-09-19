/**
 * POLAR-AI — EXPEDITION MISSION COMMAND LOGIN
 * ===========================================
 * Arctic White + Polar Ice High-Trust Authentication Gateway.
 *
 * Fully aligned with the 5 Core Operational Pillars:
 * 1. Expedition Planning (Field traverses & research campaigns)
 * 2. Cargo Tracking (Southern Ocean & DROMLAN air bridge logistics)
 * 3. Inventory Management (Fuel runway, life support, consumable reserves)
 * 4. Personnel Movement (Station rosters, field tracking, medical readiness)
 * 5. Emergency Response (Autonomous incident triage & 406 MHz SOS beacons)
 *
 * Includes interactive Demo Operator Roster with instant 1-click login
 * across all 8 scientific and operational roles.
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Compass,
  Eye,
  EyeOff,
  HelpCircle,
  Info,
  KeyRound,
  Lock,
  MapPin,
  Package,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users as UsersIcon,
  X,
  Zap,
} from 'lucide-react'
import PolarLogo from '../components/PolarLogo'
import { useAuth } from '../store/AuthContext'
import { validateCredentials, USERS } from '../lib/credentials'

export default function Login() {
  const { signIn, signingIn, authError, clearAuthError } = useAuth()

  const [userId, setUserId] = useState('commander')
  const [password, setPassword] = useState('expedition@cmd')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [capsLockActive, setCapsLockActive] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [activeRoleTab, setActiveRoleTab] = useState('ALL')
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

  // Filter demo operators based on active tab
  const filteredUsers =
    activeRoleTab === 'ALL'
      ? USERS
      : USERS.filter((u) => u.role === activeRoleTab)

  return (
    <div className="relative min-h-screen w-full select-none overflow-x-hidden bg-[#F7FBFD] font-sans text-[#12263A]">
      {/* Background Subtle Polar Ice Accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#1597D4]/5 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-[#1597D4]/4 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(#1597D4 1px, transparent 1px), radial-gradient(#12263A 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />
      </div>

      {/* ============================================================
          1. TOP INSTITUTIONAL HEADER BAR
          ============================================================ */}
      <header className="relative z-20 border-b border-[#DDEAF0] bg-white/90 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF5FA] text-[#1597D4] shadow-xs">
              <PolarLogo size={28} withGlow={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-[#12263A] sm:text-base">
                  POLAR-AI
                </span>
                <span className="rounded-full bg-[#EBF5FA] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#1597D4]">
                  v2.4 CONSOLE
                </span>
              </div>
              <div className="text-[11px] text-[#4A6572]">
                National Centre for Polar and Ocean Research · Ministry of Earth Sciences
              </div>
            </div>
          </div>

          {/* Quick Info & Direct Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium text-[#4A6572]">
            <button
              type="button"
              onClick={() => setModalContent('pillars')}
              className="flex items-center gap-1 hover:text-[#1597D4] transition"
            >
              <Compass size={14} className="text-[#1597D4]" />
              <span className="hidden sm:inline">Operational Pillars</span>
            </button>
            <span className="text-[#DDEAF0]">|</span>
            <button
              type="button"
              onClick={() => setModalContent('governance')}
              className="hover:text-[#1597D4] transition"
            >
              Governance
            </button>
            <span className="text-[#DDEAF0]">|</span>
            <button
              type="button"
              onClick={() => setModalContent('support')}
              className="hover:text-[#1597D4] transition"
            >
              Support
            </button>

            {/* Security Pill */}
            <div className="ml-2 hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-mono font-semibold text-emerald-700 md:flex">
              <Lock size={11} className="text-emerald-600" />
              <span>TLS 1.3 · ENCRYPTED</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          2. WELCOME BANNER & LIVE STATION TELEMETRY
          ============================================================ */}
      <section className="relative z-10 border-b border-[#DDEAF0] bg-gradient-to-b from-white to-[#F7FBFD] px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Eyebrow Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDEAF0] bg-white px-3 py-1 text-[11px] font-mono font-semibold text-[#1597D4] shadow-xs">
              <Sparkles size={12} />
              EXPEDITION INTELLIGENCE & MISSION CONTINUITY PLATFORM
            </span>
            <span className="text-[11px] text-[#8FA6B2] hidden sm:inline">
              Authoritative Operations Console for Antarctic & Arctic Field Bases
            </span>
          </div>

          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-[#12263A] sm:text-3xl lg:text-4xl">
                Centralized Expedition Command &amp; Logistics
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A6572]">
                A unified operational dashboard connecting <strong>Expedition Planning</strong>,{' '}
                <strong>Cargo Tracking</strong>, <strong>Inventory Management</strong>,{' '}
                <strong>Personnel Movement</strong>, and <strong>Emergency Response</strong> across
                India&apos;s polar stations.
              </p>
            </div>

            {/* Live Station Status Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-xl border border-[#DDEAF0] bg-white px-3 py-2 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="font-bold text-[#12263A]">Maitri Base</div>
                  <div className="text-[10px] text-[#4A6572] font-mono">70°45′S · -18°C Nominal</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#DDEAF0] bg-white px-3 py-2 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="font-bold text-[#12263A]">Bharati Base</div>
                  <div className="text-[10px] text-[#4A6572] font-mono">69°24′S · -12°C Online</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#DDEAF0] bg-white px-3 py-2 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                <div>
                  <div className="font-bold text-[#12263A]">Himadri Base</div>
                  <div className="text-[10px] text-[#4A6572] font-mono">78°55′N · -6°C Arctic Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. MAIN STAGE: LOGIN FORM (LEFT) + DEMO OPERATORS ROSTER (RIGHT)
          ============================================================ */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ================= LEFT: SECURE OPERATOR SIGN-IN ================= */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="rounded-2xl border border-[#DDEAF0] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#DDEAF0] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EBF5FA] text-[#1597D4]">
                    <ShieldCheck size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#12263A]">
                      Operator Sign-In
                    </h2>
                    <p className="text-[11px] text-[#4A6572]">
                      Enter credentials or select a demo role
                    </p>
                  </div>
                </div>
                <span className="rounded-md border border-[#DDEAF0] bg-[#F7FBFD] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1597D4]">
                  NCPOR AUTH
                </span>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Operator ID Field */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#12263A]">
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
                      className="w-full rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] py-2.5 pl-10 pr-3.5 text-xs text-[#12263A] placeholder-[#8FA6B2] transition focus:border-[#1597D4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1597D4]/15"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#12263A]">
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
                      className="w-full rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] py-2.5 pl-10 pr-10 text-xs text-[#12263A] placeholder-[#8FA6B2] transition focus:border-[#1597D4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1597D4]/15"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA6B2] hover:text-[#12263A] transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Universal Password Note */}
                <div className="flex items-center justify-between text-xs text-[#4A6572]">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-[#DDEAF0] text-[#1597D4] accent-[#1597D4]"
                    />
                    <span>Remember terminal</span>
                  </label>
                  <span className="font-mono text-[10.5px] text-[#1597D4]">
                    Master Pass: <code className="font-bold">polar123</code>
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1597D4] hover:bg-[#0284C7] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition active:scale-[0.99] disabled:opacity-50"
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
              <div className="mt-5 border-t border-[#DDEAF0] pt-4 text-[11px] text-[#8FA6B2] flex items-start gap-2">
                <Lock size={12} className="mt-0.5 shrink-0 text-[#1597D4]" />
                <p>
                  Zero data leakage pre-auth. Station records, emergency distress frequencies, and
                  cryptographic logs decrypt upon verified session establishment.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: INTERACTIVE DEMO OPERATORS ROSTER ================= */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="rounded-2xl border border-[#DDEAF0] bg-white p-6 shadow-sm sm:p-7">
              {/* Roster Header with Title and Tabs */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#DDEAF0] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <UsersIcon size={18} className="text-[#1597D4]" />
                    <h2 className="text-base font-bold text-[#12263A]">
                      Demo Operator Profiles
                    </h2>
                    <span className="rounded-full bg-[#EBF5FA] px-2 py-0.5 text-[10px] font-mono font-bold text-[#1597D4]">
                      8 READY
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#4A6572]">
                    Click <strong>1-Click Login</strong> on any profile to test role permissions
                    immediately.
                  </p>
                </div>

                {/* Role Tabs */}
                <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] p-1">
                  {[
                    { id: 'ALL', label: 'All (8)' },
                    { id: 'COMMANDER', label: 'Command' },
                    { id: 'LOGISTICS', label: 'Logistics' },
                    { id: 'SCIENTIST', label: 'Science' },
                    { id: 'ADMIN', label: 'Admin' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveRoleTab(tab.id)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                        activeRoleTab === tab.id
                          ? 'bg-white text-[#12263A] shadow-xs'
                          : 'text-[#4A6572] hover:text-[#12263A]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roster Grid */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredUsers.map((u) => {
                  const isSelected = userId.toLowerCase() === u.id.toLowerCase()

                  return (
                    <div
                      key={u.id}
                      className={`group relative rounded-xl border p-3.5 transition-all ${
                        isSelected
                          ? 'border-[#1597D4] bg-[#F0F8FD] shadow-xs'
                          : 'border-[#DDEAF0] bg-white hover:border-[#1597D4]/50 hover:bg-[#FAFDFE]'
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
                            <div className="font-bold text-xs text-[#12263A] group-hover:text-[#1597D4] transition">
                              {u.name}
                            </div>
                            <div className="text-[10px] text-[#4A6572]">{u.title}</div>
                          </div>
                        </div>

                        <span
                          className={`rounded px-1.5 py-0.5 text-[9.5px] font-mono font-bold tracking-tight uppercase ${
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

                      {/* Station & Responsibility */}
                      <div className="mt-2.5 space-y-1 text-[10.5px]">
                        <div className="flex items-center gap-1.5 text-[#4A6572]">
                          <MapPin size={11} className="text-[#1597D4] shrink-0" />
                          <span className="truncate">{u.station}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#8FA6B2]">
                          <Zap size={11} className="text-amber-500 shrink-0" />
                          <span className="truncate">{u.accessLevel}</span>
                        </div>
                      </div>

                      {/* Credentials Code Strip */}
                      <div className="mt-2.5 flex items-center justify-between rounded-lg bg-[#F7FBFD] px-2.5 py-1 text-[10px] font-mono border border-[#DDEAF0]/80">
                        <span className="text-[#4A6572]">
                          ID: <strong className="text-[#12263A]">{u.id}</strong>
                        </span>
                        <span className="text-[#8FA6B2]">
                          Pass: <code className="text-[#1597D4]">{u.password}</code>
                        </span>
                      </div>

                      {/* Action Buttons: 1-Click Login & Auto-Fill */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleInstantLogin(u)}
                          disabled={signingIn}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1597D4] hover:bg-[#0284C7] py-1.5 text-[11px] font-bold text-white shadow-2xs transition active:scale-95 disabled:opacity-50"
                        >
                          <CheckCircle2 size={12} />
                          <span>1-Click Login</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAutoFill(u)}
                          className="rounded-lg border border-[#DDEAF0] bg-white hover:bg-[#F7FBFD] px-2.5 py-1.5 text-[11px] font-semibold text-[#4A6572] hover:text-[#12263A] transition"
                          title="Pre-populate form inputs with these credentials"
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

        {/* ================= 4. THE 5 CORE OPERATIONAL PILLARS SHOWCASE ================= */}
        <div className="mt-8 rounded-2xl border border-[#DDEAF0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#DDEAF0] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#1597D4]" />
              <h3 className="text-sm font-bold text-[#12263A]">
                The 5 Core Operational Pillars of POLAR-AI
              </h3>
            </div>
            <span className="text-[11px] text-[#8FA6B2]">
              National Polar Mission Architecture
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: '01',
                title: 'Expedition Planning',
                icon: Compass,
                desc: 'Strategic route planning, field traverses, milestone logging, and multi-station campaign tracking.',
              },
              {
                step: '02',
                title: 'Cargo Tracking',
                icon: Package,
                desc: 'Southern Ocean maritime manifests, DROMLAN aviation air-bridge corridors, and resupply gap alerts.',
              },
              {
                step: '03',
                title: 'Inventory Reserves',
                icon: Boxes,
                desc: 'Real-time consumable monitoring, station diesel fuel runway, daily burn rates, and buffer alerts.',
              },
              {
                step: '04',
                title: 'Personnel Movement',
                icon: UsersIcon,
                desc: 'Station headcounts, field camp check-ins, medical clearances, and live satellite GPS fix telemetry.',
              },
              {
                step: '05',
                title: 'Emergency Response',
                icon: ShieldAlert,
                desc: '406 MHz COSPAS-SARSAT beacons, autonomous spatial triage matrix, and armed SOS incident dispatch.',
              },
            ].map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.step}
                  className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] p-3.5 transition hover:bg-white hover:shadow-xs"
                >
                  <div className="flex items-center justify-between text-[#1597D4]">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-2xs">
                      <Icon size={15} />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#8FA6B2]">
                      {p.step}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-[#12263A]">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#4A6572]">
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* ============================================================
          5. STATUS FOOTER
          ============================================================ */}
      <footer className="relative z-10 border-t border-[#DDEAF0] bg-white px-4 py-4 text-xs text-[#8FA6B2] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div>
            <strong>POLAR-AI Mission Command v2.4</strong> · Ministry of Earth Sciences (MoES) &amp;
            NCPOR
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>MAITRI: 70.76°S, 11.73°E</span>
            <span className="text-[#DDEAF0]">|</span>
            <span>BHARATI: 69.40°S, 76.18°E</span>
            <span className="text-[#DDEAF0]">|</span>
            <span>HIMADRI: 78.92°N, 11.93°E</span>
          </div>
        </div>
      </footer>

      {/* ============================================================
          6. INFORMATIVE POPUP MODALS
          ============================================================ */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12263A]/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-[#DDEAF0] bg-white p-6 shadow-2xl text-xs text-[#12263A]">
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="absolute right-4 top-4 rounded-lg p-1 text-[#8FA6B2] hover:bg-[#F7FBFD] hover:text-[#12263A] transition"
            >
              <X size={18} />
            </button>

            {modalContent === 'pillars' && (
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#12263A]">
                  <Compass size={18} className="text-[#1597D4]" />
                  <span>The 5 Core Operational Pillars</span>
                </div>
                <p className="mt-2.5 leading-relaxed text-[#4A6572]">
                  POLAR-AI directly answers the national expedition challenge:
                </p>
                <div className="mt-3 space-y-2 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-[#F7FBFD] border border-[#DDEAF0]">
                    1. <strong>Expedition Planning</strong>: Route schedules and campaign management.
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7FBFD] border border-[#DDEAF0]">
                    2. <strong>Cargo Tracking</strong>: Southern Ocean supply corridors &amp; resupply ETAs.
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7FBFD] border border-[#DDEAF0]">
                    3. <strong>Inventory Management</strong>: Diesel runway, buffers, and consumption.
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7FBFD] border border-[#DDEAF0]">
                    4. <strong>Personnel Movement</strong>: Station headcounts, GPS fixes, and rosters.
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7FBFD] border border-[#DDEAF0]">
                    5. <strong>Emergency Response</strong>: Triage matrix &amp; armed SOS distress.
                  </div>
                </div>
              </div>
            )}

            {modalContent === 'governance' && (
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#12263A]">
                  <ShieldCheck size={18} className="text-[#1597D4]" />
                  <span>Mission Governance &amp; Security</span>
                </div>
                <p className="mt-2.5 leading-relaxed text-[#4A6572]">
                  Authorized under the <strong>Indian Antarctic Act</strong> and the Ministry of Earth
                  Sciences (MoES). All operational decisions and emergency broadcasts are
                  cryptographically recorded to the immutable audit ledger.
                </p>
              </div>
            )}

            {modalContent === 'support' && (
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#12263A]">
                  <HelpCircle size={18} className="text-[#1597D4]" />
                  <span>Polar Operations Room Support</span>
                </div>
                <p className="mt-2.5 leading-relaxed text-[#4A6572]">
                  24/7 communications support via Iridium satellite link and NCPOR Goa Ops Room.
                </p>
                <div className="mt-3 rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] p-3 font-mono text-[11px] space-y-1.5">
                  <div>HQ Relay: NCPOR Goa (+91 832 252 5600)</div>
                  <div>HF USB Relay: 8.845 MHz USB</div>
                  <div>Distress Frequency: 406.025 MHz COSPAS-SARSAT</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

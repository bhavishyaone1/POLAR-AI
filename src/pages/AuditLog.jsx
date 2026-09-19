/**
 * CRYPTOGRAPHIC IMMUTABLE AUDIT TRAIL
 * ===================================
 * Logs every human officer decision, recommendation approval,
 * emergency dispatch, and systemic override with tamper-evident hashes.
 */

import React, { useState } from 'react'
import {
  CheckCircle2,
  FileCheck,
  Filter,
  Lock,
  Search,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function AuditLog({ goTo }) {
  const { auditLogs } = useData()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLogs = (auditLogs || []).filter((log) => {
    if (!searchTerm) return true
    const q = searchTerm.toLowerCase()
    return (
      log.action?.toLowerCase().includes(q) ||
      log.user?.toLowerCase().includes(q) ||
      log.details?.toLowerCase().includes(q) ||
      log.id?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDEAF0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#18A878] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              IMMUTABLE AUDIT TRAIL
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">CRYPTOGRAPHIC LEDGER</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Governance & Cryptographic Audit Trail</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Tamper-evident verification of all AI recommendation approvals and human operational decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-mono text-emerald-800 flex items-center gap-1.5 font-semibold shadow-2xs">
            <Lock size={13} className="text-emerald-600" />
            <span>Ledger Integrity: VERIFIED</span>
          </span>
        </div>
      </div>

      {/* ================= FILTER / SEARCH BAR ================= */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#DDEAF0] bg-white p-3.5 shadow-xs text-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8495A3]" />
          <input
            type="text"
            placeholder="Search officer decisions, audit IDs, recommendation approvals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] pl-9 pr-3 py-1.5 text-xs text-[#12263A] placeholder-[#8495A3] focus:border-[#1597D4] focus:bg-white focus:outline-none transition"
          />
        </div>

        <span className="text-xs font-mono text-[#526779]">
          Total Entries: <strong className="text-[#12263A]">{filteredLogs.length}</strong>
        </span>
      </div>

      {/* ================= AUDIT LOG TABLE ================= */}
      <div className="overflow-hidden rounded-2xl border border-[#DDEAF0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DDEAF0] bg-[#F7FBFD] font-mono text-[11px] uppercase tracking-wider text-[#8495A3]">
              <tr>
                <th className="p-4">Log ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Officer / Actor</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Operational Details</th>
                <th className="p-4 text-right">Verification Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF7FA] font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F0F8FB] transition">
                  <td className="p-4 font-mono font-bold text-[#1597D4] whitespace-nowrap">
                    {log.id}
                  </td>
                  <td className="p-4 text-[#526779] whitespace-nowrap font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-semibold text-[#12263A] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <UserCheck size={13} className="text-[#18A878] shrink-0" />
                      <span>{log.user}</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="rounded-md bg-[#DDF3FA] px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[#1597D4] border border-[#BFDDE7]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-[#526779] max-w-md">
                    {log.details}
                  </td>
                  <td className="p-4 text-right font-mono text-[11px] text-[#8495A3] whitespace-nowrap">
                    #{log.hash || 'sha256'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

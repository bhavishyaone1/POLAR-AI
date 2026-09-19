/**
 * DATATABLE — one table component used by every list page.
 * =========================================================
 * - Desktop (>= 768px): Preserved 100% UNTOUCHED with exact table styles,
 *   columns, alignment, fonts, and headers.
 * - Mobile (< 768px): Automatically transforms wide table rows into
 *   clean, touch-friendly, highly readable cards/list rows.
 *   Never forces mobile users to pinch-zoom or scroll wide tables.
 */

import React from 'react'
import { ChevronRight } from 'lucide-react'
import StateBlock from './StateBlock'

export default function DataTable({
  columns,
  rows,
  rowKey,
  loading = false,
  error = null,
  emptyTitle,
  emptyMessage,
  onRowClick,
  maxHeight,
  mobileCardRender,
}) {
  /* --- the three "no table" states, in priority order --- */
  if (loading) return <StateBlock kind="loading" />
  if (error) return <StateBlock kind="error" message={String(error)} />
  if (!rows || rows.length === 0)
    return <StateBlock kind="empty" title={emptyTitle} message={emptyMessage} />

  /* --- identify common column roles for mobile card generation --- */
  const idCol = columns.find((c) => c.mono || c.header?.toLowerCase() === 'id') || columns[0]
  const titleCol = columns.find((c) => c.strong) || columns[1] || columns[0]
  const otherCols = columns.filter((c) => c !== idCol && c !== titleCol)

  return (
    <>
      {/* ============================================================
          DESKTOP / TABLET DATA TABLE (LOCKED & UNTOUCHED for >= 768px)
          ============================================================ */}
      <div
        className="hidden md:block table-scroll"
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  style={{ width: col.width, textAlign: col.align || 'left' }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowKey ? rowKey(row) : rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map((col, colIndex) => {
                  const classes = [
                    col.strong ? 'cell-strong' : '',
                    col.mono ? 'mono' : '',
                    col.className || '',
                  ]
                    .filter(Boolean)
                    .join(' ')

                  return (
                    <td
                      key={colIndex}
                      className={classes || undefined}
                      style={{ textAlign: col.align || 'left' }}
                    >
                      {col.cell ? col.cell(row, rowIndex) : row[col.key]}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ============================================================
          MOBILE READABLE CARDS LIST (< 768px / md:hidden)
          Transforms wide tabular data into readable, thumb-friendly cards
          ============================================================ */}
      <div className="block md:hidden space-y-2.5">
        {rows.map((row, rowIndex) => {
          const key = rowKey ? rowKey(row) : rowIndex

          if (mobileCardRender) {
            return (
              <div
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'cursor-pointer active:scale-[0.99] transition' : ''}
              >
                {mobileCardRender(row, rowIndex)}
              </div>
            )
          }

          return (
            <div
              key={key}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`rounded-xl border border-[#DCE8F0] bg-white p-3.5 shadow-2xs transition ${
                onRowClick ? 'cursor-pointer active:scale-[0.99] active:bg-slate-50' : ''
              }`}
            >
              {/* Card Header: ID & Status / Top Badges */}
              <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] pb-2 mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] shrink-0">
                    {idCol.cell ? idCol.cell(row, rowIndex) : row[idCol.key || 'id']}
                  </span>
                  {row.status && (
                    <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-slate-200 text-[#42586E]">
                      {row.status}
                    </span>
                  )}
                </div>

                {row.priority && (
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      row.priority === 'CRITICAL'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : row.priority === 'HIGH'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {row.priority}
                  </span>
                )}
              </div>

              {/* Card Title */}
              <div className="text-sm font-semibold text-[#0C1E30] leading-snug">
                {titleCol.cell ? titleCol.cell(row, rowIndex) : row[titleCol.key || 'name']}
              </div>

              {/* Supporting Columns Micro-Grid */}
              {otherCols.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-[#F8FAFC] pt-2.5">
                  {otherCols.slice(0, 4).map((col, ci) => (
                    <div key={ci} className="min-w-0">
                      <span className="text-[10.5px] font-medium text-[#6E8294] block uppercase tracking-wider">
                        {col.header}
                      </span>
                      <div className="text-[#0C1E30] font-medium truncate mt-0.5">
                        {col.cell ? col.cell(row, rowIndex) : row[col.key]}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Tap Indicator */}
              {onRowClick && (
                <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#0284C7] font-medium">
                  <span>View details</span>
                  <ChevronRight size={14} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

/**
 * STATCARD — one big number with a label, used in the dashboard's top row.
 *
 * Usage:
 *   <StatCard label="Active Expeditions" value={3} icon={Compass}
 *             hint="2 planning" tone="ok" onClick={...} />
 *
 * `tone` changes the colour of the number:
 *   default (ice) | ok (green) | warn (amber) | alert (red)
 * We only use a colour when it MEANS something — a red number must always
 * mean "someone needs to look at this".
 */

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  onClick,
  pulse = false,
}) {
  const toneClass = tone ? `stat-value--${tone}` : ''

  const iconBg =
    tone === 'alert'
      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
      : tone === 'warn'
      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
      : tone === 'ok'
      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'

  /* If an onClick is given, render a real <button> so it is keyboard
     accessible; otherwise a plain <div>. */
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`card-tight ${onClick ? 'card-interactive' : ''} text-left w-full flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow">{label}</span>
          {Icon && (
            <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg} shadow-2xs`}>
              <Icon
                size={16}
                strokeWidth={2}
                className={pulse ? 'pulse' : ''}
              />
            </div>
          )}
        </div>

        <div className={`stat-value mt-2 ${toneClass}`}>{value}</div>
      </div>

      {hint && <div className="text-[11.5px] text-low mt-2 leading-snug">{hint}</div>}
    </Wrapper>
  )
}

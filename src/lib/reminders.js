export function deadlineInfo(deadline) {
  const match = deadline?.match(/([A-Za-z]+)\s+(\d{1,2})/)
  if (!match) return { isPast: false, days: null, label: 'Date to be announced' }
  const target = new Date(`${match[1]} ${match[2]}, 2026 00:00:00`)
  const today = new Date('2026-09-15T00:00:00')
  const days = Math.round((target.getTime() - today.getTime()) / 86400000)
  if (days < 0) return { isPast: true, days, label: 'Registration closed' }
  if (days === 0) return { isPast: false, days, label: 'Closes today' }
  return { isPast: false, days, label: `${days} day${days === 1 ? '' : 's'} left` }
}

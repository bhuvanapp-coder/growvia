function daysUntil(deadline) {
  const match = deadline?.match(/([A-Za-z]+)\s+(\d{1,2})/)
  if (!match) return 7
  const target = new Date(`${match[1]} ${match[2]}, 2026 00:00:00`)
  return Math.max(1, Math.round((target.getTime() - new Date('2026-09-15T00:00:00').getTime()) / 86400000))
}

function range(start, end) { return start === end ? `Day ${start}` : `Days ${start}–${end}` }

export function buildPreparationPlan(studentDNA, opportunity) {
  const days = daysUntil(opportunity.deadline)
  const missing = opportunity.missingSkills || opportunity.missing || ['the core event requirements']
  const current = opportunity.matchingSkills || opportunity.skills || studentDNA?.currentSkills || ['your existing strengths']
  const requirements = opportunity.requiredSkills || opportunity.skills || missing
  const first = missing[0] || requirements[0]
  const second = missing[1] || requirements[1] || first
  const plan = days <= 2
    ? [{ label: range(1, 1), title: `Learn the essentials of ${first}`, detail: `Use a focused primer and connect it to your ${current[0] || 'existing'} experience.` }, { label: range(2, days), title: 'Run a small mock challenge', detail: `Practice the event format using ${requirements.slice(0, 2).join(' and ')}.` }]
    : days <= 4
      ? [{ label: range(1, 1), title: `Learn ${first}`, detail: `Build the minimum vocabulary and setup needed for ${first}.` }, { label: range(2, 3), title: `Practice ${second}`, detail: `Complete one guided exercise using the event requirements: ${requirements.slice(0, 2).join(' and ')}.` }, { label: range(4, days), title: 'Mock challenge', detail: 'Time-box a small challenge, review the gaps, and prepare your questions.' }]
      : [{ label: range(1, 2), title: `Learn ${first}`, detail: `Start with the fundamentals and connect them to your ${current.slice(0, 2).join(' and ')} skills.` }, { label: range(3, Math.min(4, days - 2)), title: `Practice ${second}`, detail: `Complete a guided exercise using ${requirements.slice(0, 2).join(' and ')}.` }, { label: range(Math.min(5, days - 1), Math.max(5, days - 1)), title: 'Build a tiny proof of work', detail: `Make one small artifact that shows your progress in ${missing.slice(0, 2).join(' and ')}.` }, { label: `Final day`, title: 'Mock challenge + questions', detail: 'Rehearse the format, note what you still need to learn, and arrive with a clear first move.' }]
  return { daysAvailable: days, plan, focus: missing.slice(0, 3), requirements, currentSkills: current, source: 'demo roadmap' }
}

export async function generatePreparation(studentDNA, opportunity) {
  try {
    const response = await fetch('/api/prepare', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentDNA, opportunity }) })
    if (response.ok) return { ...(await response.json()), source: 'AI roadmap' }
  } catch {
    // The deterministic plan keeps the hackathon demo usable without an API.
  }
  return buildPreparationPlan(studentDNA, opportunity)
}

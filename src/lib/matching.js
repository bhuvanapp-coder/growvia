const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9/+# ]/g, ' ').replace(/\s+/g, ' ').trim()
const list = (values = []) => values.filter(Boolean).map(normalize)
const hasTerm = (values, terms) => terms.some((term) => values.some((value) => value.includes(normalize(term)) || normalize(term).includes(value)))
const overlap = (values, terms) => terms.filter((term) => hasTerm(values, [term]))
const evidenceFor = (skills, terms) => skills.filter((item) => hasTerm([item.skill], terms))

const typeAliases = {
  hackathon: ['hackathon'], workshop: ['workshop'], competition: ['competition'], internship: ['internship'], conference: ['conference'], 'tech fest': ['tech fest'], 'research program': ['research'], volunteering: ['community', 'volunteer'],
}

function dreamMatch(studentDreams, opportunity) {
  const dreams = list(studentDreams)
  const eventText = normalize([opportunity.title, opportunity.type, ...(opportunity.tags || [])].join(' '))
  return dreams.some((dream) => {
    const tokens = dream.split(' ').filter((token) => token.length > 1 && token !== '/').map((token) => token.replace(/s$/, ''))
    const matches = tokens.filter((token) => eventText.includes(token))
    return matches.length >= Math.min(2, tokens.length)
  })
}

export function matchOpportunity(studentDNA, opportunity) {
  const dna = studentDNA || {}
  const evidenceSkills = dna.profileAnalysis?.skills || []
  const currentSkills = list([...(dna.currentSkills || []), ...evidenceSkills.filter((item) => item.score >= 0.45).map((item) => item.skill)])
  const interests = list(dna.interests)
  const growthGoals = list(dna.growthGoals)
  const preferredTypes = list(dna.preferredTypes)
  const dreams = list(dna.dreamOpportunities)
  const eventTags = list([opportunity.domain, opportunity.type, ...(opportunity.tags || [])])
  const requiredSkills = list(opportunity.requiredSkills || opportunity.skills || [])
  const growthSkills = list(opportunity.growthSkills || opportunity.missing || [])
  const matchingSkills = overlap(currentSkills, requiredSkills)
  const matchingEvidence = evidenceFor(evidenceSkills, matchingSkills)
  const missingSkills = requiredSkills.filter((skill) => !hasTerm(currentSkills, [skill]))
  const interestMatches = overlap(interests, eventTags)
  const growthMatches = overlap(growthGoals, [...eventTags, ...growthSkills])
  const typeMatches = preferredTypes.filter((type) => {
    const singularType = type.replace(/s$/, '')
    return (typeAliases[type] || typeAliases[singularType] || [type, singularType]).some((alias) => hasTerm(eventTags, [alias]))
  })
  const hasDreamSignal = dreamMatch(dreams, opportunity)
  const currentFit = requiredSkills.length ? matchingSkills.length / requiredSkills.length : 0
  const interestFit = eventTags.length ? Math.min(1, interestMatches.length / Math.min(2, eventTags.length)) : 0
  const growthFit = growthMatches.length ? Math.min(1, growthMatches.length / 2) : 0
  const typeFit = typeMatches.length ? 1 : 0
  const dreamFit = hasDreamSignal ? 1 : 0
  const locationFit = hasTerm(list(dna.locationPreferences), list([opportunity.location])) ? 1 : 0.5

  let score = Math.round(currentFit * 34 + interestFit * 22 + growthFit * 20 + typeFit * 12 + dreamFit * 9 + locationFit * 3)
  if (growthFit > 0 && currentFit < 0.6) score += 7
  if (hasDreamSignal) score += 5
  if (opportunity.demoMatchScores?.[dna.username]) score = opportunity.demoMatchScores[dna.username]
  score = Math.min(100, Math.max(0, score))

  let category = 'growth'
  if (hasDreamSignal) category = 'dream'
  else if (currentFit >= 0.65 && interestFit >= 0.5) category = 'perfect'
  else if (growthFit > 0 && currentFit < 0.65) category = 'stretch'

  const categoryLabel = { perfect: 'Perfect Fit', stretch: 'Stretch Opportunity', dream: 'Dream Opportunity', growth: 'Growth Opportunity' }[category]
  const readiness = hasDreamSignal && missingSkills.length ? 'DREAM' : currentFit >= 0.65 ? 'NOW' : currentFit >= 0.4 ? 'NEXT' : 'STRETCH'
  const reasons = []
  if (matchingSkills.length) reasons.push(`your ${matchingSkills.slice(0, 2).join(' and ')} skills`)
  if (matchingEvidence.length) reasons.push(`${matchingEvidence[0].confidence.toLowerCase()} profile evidence`)
  if (interestMatches.length) reasons.push(`your interest in ${interestMatches.slice(0, 2).join(' and ')}`)
  if (growthMatches.length) reasons.push(`your goal to grow in ${growthMatches.slice(0, 2).join(' and ')}`)
  if (typeMatches.length) reasons.push(`your preference for ${typeMatches[0]}`)
  if (hasDreamSignal) reasons.push('an opportunity you marked as a dream')
  const lead = reasons.length ? reasons.join(', ') : 'the direction you want to explore'
  const reason = category === 'stretch'
    ? `You are seeing this because of ${lead}. You have room to build ${missingSkills.slice(0, 2).join(' and ') || 'new skills'}, making it a strong stretch opportunity.`
    : category === 'dream'
      ? `You are seeing this because it matches ${lead}. Your motivation makes this worth pursuing, even while you build more current experience.`
      : `You are seeing this because it matches ${lead}. ${category === 'perfect' ? 'Your current profile is already a strong fit.' : 'It adds useful growth value beyond your current path.'}`

  return { matchScore: score, category, categoryLabel, readiness, why: reason, matchingSkills, missingSkills, matchingEvidence, evidence: evidenceSkills, gapCount: opportunity.demoGapCounts?.[dna.username] ?? missingSkills.length, growthValue: opportunity.growthValue || (growthMatches.length ? `Build confidence in ${growthMatches.join(' and ')}` : 'Explore a new direction with a beginner-friendly format.') }
}

export function matchOpportunities(studentDNA, opportunities) {
  return opportunities.map((opportunity) => ({ ...opportunity, ...matchOpportunity(studentDNA, opportunity) }))
}

export const demoStudentDNA = { currentSkills: ['Python', 'React', 'Git & GitHub', 'UI / UX'], interests: ['AI / ML', 'Web development', 'Community'], growthGoals: ['Technical skills', 'Communication', 'Problem solving'], preferredTypes: ['Hackathons', 'Workshops', 'Conferences'], locationPreferences: ['Online'], dreamOpportunities: ['AI / ML hackathons', 'Top tech conferences'], profileLinks: { github: 'https://github.com/ananya-shah', linkedin: 'https://linkedin.com/in/ananya-shah' } }

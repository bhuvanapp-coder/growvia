const demoEvents = {
  ai: { title: 'Women in Tech AI Summit', description: 'A one-day summit connecting students with practical AI builders, mentors, and research communities.', domain: 'AI / ML', date: 'November 06, 2026', deadline: 'October 28, 2026', location: 'Mumbai · In person', eligibility: 'College students and early-career builders', teamSize: 'Individual or teams of 2–4', prize: 'Mentorship + hiring fast track', requiredSkills: ['Python', 'AI / ML', 'Curiosity'], registrationUrl: 'https://growvia.demo/register/ai-summit' },
  cyber: { title: 'Secure the Stack CTF', description: 'A beginner-friendly cybersecurity challenge with guided tracks for students.', domain: 'Cybersecurity', date: 'October 03, 2026', deadline: 'September 29, 2026', location: 'Online', eligibility: 'Students of any branch; beginner track available', teamSize: '1–4 members', prize: '₹50,000 + security mentorship', requiredSkills: ['Linux', 'Web security', 'Problem solving'], registrationUrl: 'https://growvia.demo/register/secure-stack' },
  pitch: { title: 'Pitch It! Student Venture Cup', description: 'A student pitch competition for ambitious ideas, early prototypes, and bold founders.', domain: 'Entrepreneurship', date: 'October 11, 2026', deadline: 'October 04, 2026', location: 'Bengaluru · In person', eligibility: 'Current college students with an early-stage idea', teamSize: '1–5 members', prize: '₹2,00,000 + incubation interview', requiredSkills: ['Storytelling', 'Communication', 'Market sizing'], registrationUrl: 'https://growvia.demo/register/pitch-it' },
}

export function demoExtraction(fileName = '') {
  const name = fileName.toLowerCase()
  const key = name.includes('cyber') || name.includes('ctf') || name.includes('security') ? 'cyber' : name.includes('pitch') || name.includes('startup') || name.includes('venture') ? 'pitch' : 'ai'
  return { ...demoEvents[key], source: 'demo extraction', sourceFile: fileName || `${key}-opportunity-poster.png` }
}

export async function extractPosterDetails(file) {
  if (!import.meta.env.VITE_EXTRACTION_ENDPOINT) return demoExtraction(file?.name)
  const payload = { fileName: file.name, mimeType: file.type }
  const response = await fetch(import.meta.env.VITE_EXTRACTION_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!response.ok) throw new Error('Extraction service failed')
  return response.json()
}

export function createOpportunityDNA(event) {
  const skills = event.requiredSkills || []
  const interests = [event.domain, ...(event.description || '').toLowerCase().includes('social') ? ['Social impact'] : []].filter(Boolean)
  return { technical: skills.filter((skill) => ['Python', 'JavaScript', 'React', 'Machine Learning', 'APIs', 'SQL', 'Git'].some((term) => skill.toLowerCase().includes(term.toLowerCase()))), experience: event.eligibility || 'Beginner-friendly', capabilities: ['Teamwork', 'Problem solving', ...(event.type === 'Hackathon' ? ['Pitching'] : [])], interests }
}

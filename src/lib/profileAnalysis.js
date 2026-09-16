const demoSkills = [
  { skill: 'React', selfReported: 'Intermediate', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: 0.9, sources: ['GitHub evidence', 'self assessment', 'LinkedIn evidence'] },
  { skill: 'Git', selfReported: 'Intermediate', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: 0.88, sources: ['GitHub evidence', 'self assessment', 'LinkedIn evidence'] },
  { skill: 'UI/UX', selfReported: 'Intermediate', github: 'Supporting', linkedin: 'Mentioned', confidence: 'High', score: 0.82, sources: ['self assessment', 'LinkedIn evidence'] },
  { skill: 'Python', selfReported: 'Beginner', github: 'Supporting', linkedin: 'Mentioned', confidence: 'Medium', score: 0.62, sources: ['GitHub evidence', 'self assessment', 'LinkedIn evidence'] },
  { skill: 'APIs', selfReported: 'Beginner', github: 'Supporting', linkedin: 'Not mentioned', confidence: 'Medium', score: 0.55, sources: ['GitHub evidence', 'self assessment'] },
  { skill: 'Machine Learning', selfReported: 'Beginner', github: 'One small project', linkedin: 'Not mentioned', confidence: 'Low', score: 0.32, sources: ['GitHub evidence', 'self assessment'] },
  { skill: 'Public speaking', selfReported: 'Beginner', github: 'No signal', linkedin: 'Not mentioned', confidence: 'Low', score: 0.25, sources: ['self assessment'] },
]

export const demoProfileLinks = {
  github: 'https://github.com/ananya-shah',
  linkedin: 'https://linkedin.com/in/ananya-shah',
}

export const demoProfileAnalysis = {
  mode: 'demo',
  analyzedAt: '2026-09-15T09:00:00.000Z',
  github: { publicRepos: 4, recentProjects: 2, languages: ['JavaScript', 'Python', 'CSS'], categories: ['Web apps', 'Hackathon builds'], collaboration: '2 collaborative projects' },
  linkedin: { education: 'B.Tech Computer Science', certifications: 2, experience: '1 campus product internship', activities: ['Women in tech', 'Hackathons'] },
  skills: demoSkills,
  dna: {
    technical: ['Web Development', 'React', 'Python', 'Git'],
    creative: ['UI/UX', 'Product Design'],
    experience: ['2 hackathon projects', '4 public projects', 'Team project experience'],
    strengths: ['Web development', 'Rapid prototyping', 'UI design'],
    developing: ['APIs', 'Machine Learning', 'Pitching'],
    interests: ['AI', 'Social impact', 'Women-focused technology'],
  },
}

export function analyzeProfile(profile = {}) {
  const links = { ...demoProfileLinks, ...(profile.profileLinks || {}) }
  return { ...demoProfileAnalysis, analyzedAt: new Date().toISOString(), links, mode: 'demo' }
}

export function profileSkills(profile) {
  return profile?.profileAnalysis?.skills || []
}

export function confidenceTone(confidence) {
  return { High: 'high', 'Medium-High': 'medium-high', Medium: 'medium', Low: 'low' }[confidence] || 'low'
}

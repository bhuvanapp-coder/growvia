const evidence = (skills, github, linkedin, dna) => ({
  mode: 'demo',
  analyzedAt: '2026-09-15T09:00:00.000Z',
  github,
  linkedin,
  skills,
  dna,
})

export const demoStudents = {
  aswathy: {
    username: 'aswathy', email: 'aswathy.demo@example.com', password: 'Aswathy@123', role: 'student', name: 'Aswathy', college: 'Christ College of Engineering', course: 'Computer Science and Engineering', year: '2nd Year', profileLinks: { github: 'https://github.com/aswathy-demo', linkedin: 'https://linkedin.com/in/aswathy-demo' },
    currentSkills: ['Communication', 'UI / UX', 'Web Development', 'Git & GitHub', 'JavaScript', 'React', 'Python'],
    interests: ['AI', 'Social Impact', 'Women in Technology', 'Hackathons', 'Product Design', 'Innovation'],
    growthGoals: ['Machine Learning', 'APIs', 'Backend Development', 'Communication'], preferredTypes: ['Hackathons', 'Competitions', 'Workshops'], locationPreferences: ['Online', 'Anywhere in India'], dreamOpportunities: ['AI for Social Good Hackathon'],
    projects: ['Luna - Women Safety / Social Impact', 'CropSight - AI / Agriculture', 'Notes But Not The Notes - AI / Education'], ambition: 'I want to participate in major AI and social-impact hackathons.', opportunityGap: ['Machine Learning', 'API Integration', 'Technical Pitching'],
    profileAnalysis: evidence([
      { skill: 'Communication', selfReported: 'Strong', github: 'Supporting', linkedin: 'Strong', confidence: 'High', score: .88, sources: ['LinkedIn evidence', 'self assessment'] },
      { skill: 'UI/UX', selfReported: 'Strong', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .9, sources: ['GitHub evidence', 'self assessment'] },
      { skill: 'Web Development', selfReported: 'Strong', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .9, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'Git', selfReported: 'Strong', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .92, sources: ['GitHub evidence', 'self assessment'] },
      { skill: 'React', selfReported: 'Intermediate', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .82, sources: ['GitHub evidence', 'self assessment'] },
      { skill: 'Python', selfReported: 'Intermediate', github: 'Supporting', linkedin: 'Mentioned', confidence: 'Medium-High', score: .68, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'Machine Learning', selfReported: 'Developing', github: 'One small project', linkedin: 'Not mentioned', confidence: 'Low', score: .3, sources: ['GitHub evidence'] },
      { skill: 'APIs', selfReported: 'Developing', github: 'Limited evidence', linkedin: 'Not mentioned', confidence: 'Low', score: .28, sources: ['self assessment'] },
    ], { publicRepos: 6, recentProjects: 3, languages: ['JavaScript', 'Python', 'CSS'], categories: ['Social impact', 'Hackathon builds'], collaboration: '3 collaborative projects', note: 'Mock GitHub evidence for demo only' }, { education: 'CSE student', certifications: 1, experience: 'Hackathon participant', activities: ['Women in technology', 'Teamwork', 'Communication'], note: 'Mock LinkedIn evidence for demo only' }, { technical: ['Web Development', 'React', 'Python', 'Git'], creative: ['UI/UX', 'Product Design'], experience: ['3 public projects', 'Hackathon participant', 'Team project experience'], strengths: ['Communication', 'Rapid prototyping', 'Social impact thinking'], developing: ['Machine Learning', 'APIs', 'Technical pitching'], interests: ['AI', 'Social impact', 'Women in technology'] }),
  },
  bhuvana: {
    username: 'bhuvana', email: 'bhuvana.demo@example.com', password: 'Bhuvana@123', role: 'student', name: 'Bhuvana', college: 'Christ College of Engineering', course: 'Computer Science and Engineering', year: '2nd Year', profileLinks: { github: 'https://github.com/bhuvana-demo', linkedin: 'https://linkedin.com/in/bhuvana-demo' },
    currentSkills: ['Python', 'Data Analysis', 'Problem Solving', 'Mathematics', 'Machine Learning', 'SQL', 'Java', 'Statistics'], interests: ['Machine Learning', 'Data Science', 'Research', 'AI', 'Healthcare Technology', 'Analytics'], growthGoals: ['Advanced ML', 'Technical Presentation', 'Research'], preferredTypes: ['Competitions', 'Research programs', 'Hackathons'], locationPreferences: ['Online', 'Anywhere in India'], dreamOpportunities: ['National AI & Data Science Challenge'], projects: ['Student Performance Predictor', 'Health Data Analysis Dashboard', 'Python Data Visualization Project'], ambition: 'I want to build a career around AI, data science and research.', opportunityGap: ['Advanced ML', 'Technical Presentation'],
    profileAnalysis: evidence([
      { skill: 'Python', selfReported: 'Strong', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .96, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'Data Analysis', selfReported: 'Strong', github: 'Strong', linkedin: 'Strong', confidence: 'High', score: .94, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'Problem Solving', selfReported: 'Strong', github: 'Supporting', linkedin: 'Mentioned', confidence: 'High', score: .85, sources: ['self assessment', 'LinkedIn evidence'] },
      { skill: 'Machine Learning', selfReported: 'Intermediate', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .86, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'SQL', selfReported: 'Intermediate', github: 'Supporting', linkedin: 'Not mentioned', confidence: 'Medium-High', score: .7, sources: ['GitHub evidence', 'self assessment'] },
      { skill: 'React', selfReported: 'Developing', github: 'No signal', linkedin: 'Not mentioned', confidence: 'Low', score: .22, sources: ['self assessment'] },
      { skill: 'Public Speaking', selfReported: 'Developing', github: 'No signal', linkedin: 'Not mentioned', confidence: 'Low', score: .2, sources: ['self assessment'] },
    ], { publicRepos: 5, recentProjects: 3, languages: ['Python', 'SQL'], categories: ['Data science', 'Jupyter projects'], collaboration: '1 collaborative project', note: 'Mock GitHub evidence for demo only' }, { education: 'CSE student', certifications: 2, experience: 'Academic project researcher', activities: ['Data Science interest', 'Research interest'], note: 'Mock LinkedIn evidence for demo only' }, { technical: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'], creative: ['Data Visualization'], experience: ['3 data projects', 'Academic research', 'Jupyter portfolio'], strengths: ['Statistical thinking', 'Problem solving', 'Research discipline'], developing: ['Advanced ML', 'Technical presentation'], interests: ['AI', 'Data science', 'Healthcare technology', 'Research'] }),
  },
  antony: {
    username: 'antony', email: 'antony.demo@example.com', password: 'Antony@123', role: 'student', name: 'Antony', college: 'Christ College of Engineering', course: 'Computer Science and Engineering', year: '2nd Year', profileLinks: { github: 'https://github.com/antony-demo', linkedin: 'https://linkedin.com/in/antony-demo' },
    currentSkills: ['Java', 'C', 'Algorithms', 'Problem Solving', 'Data Structures', 'Git', 'Competitive Programming', 'SQL'], interests: ['Competitive Programming', 'Software Development', 'Algorithms', 'Coding Challenges', 'Developer Tools', 'Hackathons'], growthGoals: ['Advanced Web Development', 'Product Pitching', 'Software Engineering'], preferredTypes: ['Competitions', 'Hackathons', 'Workshops'], locationPreferences: ['Online', 'Anywhere in India'], dreamOpportunities: ['National Software Engineering Challenge'], projects: ['Java Algorithm Visualizer', 'C-based Data Structures Toolkit', 'Competitive Programming Practice Platform'], ambition: 'I want to become a strong software developer and participate in coding and technology competitions.', opportunityGap: ['Advanced Web Development', 'Product Pitching'],
    profileAnalysis: evidence([
      { skill: 'Java', selfReported: 'Strong', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .95, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'C', selfReported: 'Strong', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .93, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'Algorithms', selfReported: 'Strong', github: 'Strong', linkedin: 'Strong', confidence: 'High', score: .97, sources: ['GitHub evidence', 'LinkedIn evidence'] },
      { skill: 'Problem Solving', selfReported: 'Strong', github: 'Supporting', linkedin: 'Mentioned', confidence: 'High', score: .9, sources: ['self assessment', 'LinkedIn evidence'] },
      { skill: 'Data Structures', selfReported: 'Intermediate', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .86, sources: ['GitHub evidence', 'self assessment'] },
      { skill: 'Git', selfReported: 'Intermediate', github: 'Strong', linkedin: 'Mentioned', confidence: 'High', score: .82, sources: ['GitHub evidence'] },
      { skill: 'React', selfReported: 'Developing', github: 'Limited evidence', linkedin: 'Not mentioned', confidence: 'Low', score: .22, sources: ['self assessment'] },
      { skill: 'Machine Learning', selfReported: 'Developing', github: 'No signal', linkedin: 'Not mentioned', confidence: 'Low', score: .18, sources: ['self assessment'] },
    ], { publicRepos: 7, recentProjects: 3, languages: ['Java', 'C', 'SQL'], categories: ['Developer tools', 'Competitive programming'], collaboration: '2 collaborative projects', note: 'Mock GitHub evidence for demo only' }, { education: 'CSE student', certifications: 1, experience: 'Coding competition participant', activities: ['Algorithms', 'Software development', 'Coding competitions'], note: 'Mock LinkedIn evidence for demo only' }, { technical: ['Java', 'C', 'Algorithms', 'Data Structures', 'Git'], creative: ['Developer tools'], experience: ['3 public projects', 'Coding competition participant', 'Practice platform builder'], strengths: ['Algorithmic thinking', 'Problem solving', 'Software fundamentals'], developing: ['Advanced web development', 'Product pitching'], interests: ['Competitive programming', 'Software development', 'Coding challenges'] }),
  },
}

export const demoStudentList = Object.values(demoStudents)

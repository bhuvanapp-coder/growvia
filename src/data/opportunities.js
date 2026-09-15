import { Flame, Heart, Sparkles, Zap } from 'lucide-react'

export const categoryMeta = {
  perfect: { label: 'Perfect fit', icon: Zap, className: 'perfect' },
  stretch: { label: 'Stretch opportunity', icon: Flame, className: 'stretch' },
  dream: { label: 'Dream opportunity', icon: Heart, className: 'dream' },
  growth: { label: 'Growth opportunity', icon: Sparkles, className: 'growth' },
}

export const opportunities = [
  { id: 1, title: 'Build for Bharat AI Hackathon', org: 'Microsoft Reactor', type: 'Hackathon', category: 'stretch', date: 'Oct 18–20, 2026', deadline: 'Oct 10', location: 'Online · India', score: 88, color: 'coral', tags: ['Python', 'AI/ML'], reason: 'You selected AI/ML as a growth goal and already know Python. This is a high-upside stretch into building real ML products.', skills: ['Python', 'React'], missing: ['Model APIs', 'Prompt design'] },
  { id: 2, title: 'CodeSprint Web Challenge', org: 'Devfolio', type: 'Hackathon', category: 'perfect', date: 'Sep 27–28, 2026', deadline: 'Sep 21', location: 'Bengaluru · Hybrid', score: 96, color: 'blue', tags: ['React', 'Web'], reason: 'A near-perfect match for your React and web development skills, with a team format you said you enjoy.', skills: ['React', 'JavaScript', 'Git'], missing: ['None'] },
  { id: 3, title: 'Women in Tech AI Summit', org: 'Google for Developers', type: 'Conference', category: 'dream', date: 'Nov 06, 2026', deadline: 'Oct 28', location: 'Mumbai · In person', score: 74, color: 'pink', tags: ['AI/ML', 'Community'], reason: 'You marked AI conferences as a dream opportunity. Your motivation matters here more than your current ML experience.', skills: ['Curiosity', 'Python'], missing: ['ML fundamentals'] },
  { id: 4, title: 'Secure the Stack CTF', org: 'Null Community', type: 'Competition', category: 'growth', date: 'Oct 03, 2026', deadline: 'Sep 29', location: 'Online', score: 68, color: 'green', tags: ['Cybersecurity', 'Teams'], reason: 'Cybersecurity is outside your current focus, but you want to grow your problem-solving skills. Start with the beginner track.', skills: ['Problem solving', 'Python'], missing: ['Linux', 'Web security'] },
  { id: 5, title: 'GenAI Product Workshop', org: 'Product School', type: 'Workshop', category: 'perfect', date: 'Sep 24, 2026', deadline: 'Sep 22', location: 'Online', score: 91, color: 'yellow', tags: ['GenAI', 'Product'], reason: 'It matches your interest in GenAI and your goal to turn technical skills into useful products.', skills: ['Python', 'Creativity'], missing: ['Product discovery'] },
  { id: 6, title: 'Pitch It! Student Venture Cup', org: 'IIM Bangalore', type: 'Competition', category: 'growth', date: 'Oct 11, 2026', deadline: 'Oct 04', location: 'Bengaluru · In person', score: 61, color: 'purple', tags: ['Entrepreneurship', 'Pitching'], reason: 'You want to improve communication and entrepreneurship. This gives you a safe first stage to practice both.', skills: ['Creativity'], missing: ['Storytelling', 'Market sizing'] },
]
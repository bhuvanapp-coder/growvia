import { ArrowLeft, ArrowRight, Check, Compass, Heart, MapPin, Sparkles, Target, Trophy } from 'lucide-react'
import { useState } from 'react'
import { saveOpportunityDNA } from '../lib/supabase'

const stepDefinitions = [
  { key: 'currentSkills', label: 'CURRENT SKILLS', title: 'What can you do today?', sub: 'Pick the skills you can confidently bring to an opportunity.', icon: Target, options: ['Python', 'JavaScript', 'React', 'C / C++', 'Django', 'AI / ML', 'Cybersecurity', 'UI / UX', 'Public speaking', 'Data analysis', 'Git & GitHub', 'Electronics'], min: 1 },
  { key: 'interests', label: 'INTERESTS', title: 'What pulls you in?', sub: 'Choose the spaces where you naturally lose track of time.', icon: Compass, options: ['AI / ML', 'Web development', 'App development', 'Entrepreneurship', 'Cybersecurity', 'Research', 'Design', 'Electronics', 'Community', 'Social impact'], min: 1 },
  { key: 'growthGoals', label: 'GROWTH GOALS', title: 'Who are you becoming?', sub: 'Select the skills you want to strengthen this semester.', icon: Sparkles, options: ['Technical skills', 'Communication', 'Leadership', 'Teamwork', 'Problem solving', 'Creativity', 'Entrepreneurship', 'Confidence'], min: 1 },
  { key: 'preferredTypes', label: 'OPPORTUNITY STYLE', title: 'How do you like to learn?', sub: 'We will tune your radar to the rooms you want to be in.', icon: Trophy, options: ['Hackathons', 'Workshops', 'Competitions', 'Internships', 'Conferences', 'Tech fests', 'Research programs', 'Volunteering'], min: 1 },
  { key: 'locationPreferences', label: 'LOCATION', title: 'Where should growth happen?', sub: 'You can always change this when your plans change.', icon: MapPin, options: ['Online', 'Local to me', 'Within my state', 'Anywhere in India'], min: 1, single: true },
  { key: 'dreamOpportunities', label: 'DREAM OPPORTUNITIES', title: 'What would make you say yes instantly?', sub: 'Name the opportunities you really want. Motivation counts here.', icon: Heart, options: ['AI / ML hackathons', 'Top tech conferences', 'Startup pitch competitions', 'Research internships', 'Global programs', 'Design showcases', 'Women in tech communities', 'Something unexpected'], min: 1 },
]

const initialProfile = stepDefinitions.reduce((profile, step) => ({ ...profile, [step.key]: [] }), {})

export function OnboardingPage({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [profile, setProfile] = useState(initialProfile)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const current = stepDefinitions[stepIndex]
  const Icon = current.icon
  const selected = profile[current.key]
  const progress = ((stepIndex + 1) / stepDefinitions.length) * 100

  const toggle = (option) => {
    setError('')
    setProfile((value) => ({ ...value, [current.key]: current.single ? [option] : value[current.key].includes(option) ? value[current.key].filter((item) => item !== option) : [...value[current.key], option] }))
  }

  const next = async () => {
    if (selected.length < current.min) {
      setError('Choose at least one option to continue.')
      return
    }
    if (stepIndex < stepDefinitions.length - 1) {
      setStepIndex((value) => value + 1)
      return
    }
    setSaving(true)
    const result = await saveOpportunityDNA({ ...profile, completedAt: new Date().toISOString(), version: 1 })
    setSaving(false)
    if (result.error) {
      setError('We could not save your profile. Check your connection and try again.')
      return
    }
    onComplete({ ...profile, completedAt: new Date().toISOString(), savedInDemoMode: result.demo })
  }

  return <div className="onboarding-page"><div className="onboarding-top"><div className="brand"><span className="brand-mark"><span /></span><span>grow<span>via</span></span></div><span>YOUR OPPORTUNITY DNA <b>{stepIndex + 1} / {stepDefinitions.length}</b></span></div><div className="onboarding-progress"><i style={{ width: `${progress}%` }} /></div><main className="onboarding-card"><div className="step-kicker"><span className="dna-orb"><Icon size={25} /></span><span>{current.label}</span></div><h1>{current.title}</h1><p>{current.sub}</p><div className="choice-grid">{current.options.map((option) => <button aria-pressed={selected.includes(option)} className={selected.includes(option) ? 'choice selected' : 'choice'} onClick={() => toggle(option)} key={option}>{selected.includes(option) && <Check size={15} />}{option}</button>)}</div>{error && <div className="validation-message">{error}</div>}<div className="onboarding-footer"><button className="text-button back-button" onClick={() => stepIndex === 0 ? onComplete(null) : setStepIndex((value) => value - 1)}><ArrowLeft size={15} />{stepIndex === 0 ? 'Back' : 'Previous'}</button><span>{selected.length} selected</span><button className="button dark-button" disabled={saving} onClick={next}>{saving ? 'Saving profile...' : stepIndex === stepDefinitions.length - 1 ? 'Open my dashboard' : 'Continue'}{!saving && <ArrowRight size={16} />}</button></div></main></div>
}

export { stepDefinitions }

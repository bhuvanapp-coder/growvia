import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Flame, Heart, Sparkles, Target, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { OpportunityCard } from '../components/OpportunityCard'

const lanes = [
  { key: 'perfect', label: 'Perfect Fit', kicker: 'READY TO SHINE', icon: Zap, tone: 'perfect', description: 'Opportunities where your current strengths already line up.' },
  { key: 'stretch', label: 'Stretch Opportunities', kicker: 'GROW INTO IT', icon: Flame, tone: 'stretch', description: 'A little outside your comfort zone, and exactly worth exploring.' },
  { key: 'dream', label: 'Dream Opportunities', kicker: 'WORTH THE LEAP', icon: Heart, tone: 'dream', description: 'The opportunities you told us would make you say yes.' },
  { key: 'growth', label: 'Growth Opportunities', kicker: 'BUILD NEXT', icon: Sparkles, tone: 'growth', description: 'New directions that compound into the person you want to become.' },
]

export function DashboardPage({ items, setPage, setSelected, reminders, toggleReminder, saved, toggleSaved }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 420); return () => window.clearTimeout(timer) }, [])
  const deadlines = [...items].sort((first, second) => first.deadline.localeCompare(second.deadline)).slice(0, 4)

  if (loading) return <div className="page-wrap dashboard-loading"><div className="loading-orbit"><Target size={23} /></div><h1>Calibrating your radar<span>...</span></h1><p>Finding opportunities that fit where you are going.</p><div className="loading-lines"><i /><i /><i /></div></div>

  return <div className="page-wrap dashboard-page">
    <section className="dashboard-intro"><div><div className="eyebrow"><span className="eyebrow-dot" />PERSONALIZED FOR ANANYA</div><h1>Your next move is closer<br />than you think <span>✦</span></h1><p className="lead">A focused view of opportunities matched to your skills, ambitions, and curiosity.</p></div><div className="dashboard-actions"><div className="radar-score"><span>RADAR HEALTH</span><strong>88%</strong><small>profile strength</small></div><button className="button secondary" onClick={() => setPage('Onboarding')}><Target size={15} /> Tune my DNA</button></div></section>
    <section className="dashboard-radar"><div className="dashboard-radar-copy"><div className="eyebrow light"><Sparkles size={14} /> YOUR WEEK IN OPPORTUNITIES</div><h2>Four ways to move<br /><em>forward this week.</em></h2><p>Not more noise. Just the next few doors that make sense.</p></div><div className="dashboard-radar-visual"><div className="radar-sweep" /><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" /><div className="radar-center"><span>12</span><small>fresh matches</small></div><i className="dashboard-dot dot-a" /><i className="dashboard-dot dot-b" /><i className="dashboard-dot dot-c" /></div><div className="radar-summary"><span><b>{items.length}</b> curated picks</span><span><b>{deadlines.length}</b> deadlines ahead</span></div></section>
    <div className="dashboard-lanes">{lanes.map((lane) => <RecommendationLane key={lane.key} lane={lane} items={items.filter((item) => item.category === lane.key)} setSelected={setSelected} reminders={reminders} toggleReminder={toggleReminder} saved={saved} toggleSaved={toggleSaved} />)}</div>
    <DeadlineRail items={deadlines} setSelected={setSelected} />
  </div>
}

function RecommendationLane({ lane, items, setSelected, reminders, toggleReminder, saved, toggleSaved }) { const Icon = lane.icon; return <section className={`recommendation-lane ${lane.tone}`}><div className="lane-header"><div className="lane-title"><span className="lane-icon"><Icon size={18} /></span><div><div className="eyebrow">{lane.kicker}</div><h2>{lane.label}</h2></div></div><span className="lane-count">{items.length.toString().padStart(2, '0')}</span></div><p className="lane-description">{lane.description}</p>{items.length ? <div className="lane-cards">{items.map((item) => <OpportunityCard key={item.id} item={item} onOpen={setSelected} reminder={reminders.includes(item.id)} onToggleReminder={toggleReminder} saved={saved.includes(item.id)} onToggleSaved={toggleSaved} />)}</div> : <div className="empty-lane"><CheckCircle2 size={19} /><span>Nothing here yet. Complete more of your DNA to unlock this lane.</span></div>}</section> }

function DeadlineRail({ items, setSelected }) { return <section className="deadline-rail"><div className="deadline-rail-heading"><div><div className="eyebrow"><Clock3 size={13} /> KEEP YOUR MOMENTUM</div><h2>Upcoming deadlines</h2></div><button className="text-button">Open calendar <ArrowUpRight size={15} /></button></div>{items.length ? <div className="deadline-grid">{items.map((item, index) => <button className="deadline-card" key={item.id} onClick={() => setSelected(item)}><div className={`deadline-date ${index === 0 ? 'urgent' : ''}`}><strong>{item.deadline.split(' ')[1]}</strong><span>{item.deadline.split(' ')[0]}</span></div><div className="deadline-copy"><strong>{item.title}</strong><span>{item.org} · {item.location}</span></div><span className="deadline-arrow"><ArrowUpRight size={16} /></span></button>)}</div> : <div className="dashboard-empty"><CalendarDays size={18} />No upcoming deadlines yet.</div>}</section> }

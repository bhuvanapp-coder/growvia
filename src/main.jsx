import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import { ArrowUpRight, CalendarDays, ChevronRight, Lightbulb } from 'lucide-react'
import { AppShell } from './components/AppShell'
import { OpportunityCard } from './components/OpportunityCard'
import { OpportunityDetails } from './components/OpportunityDetails'
import { opportunities } from './data/opportunities'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { OrganizerPage } from './pages/OrganizerPage'
import { DashboardPage } from './pages/DashboardPage'
import { isSupabaseConfigured } from './lib/supabase'
import { demoStudentDNA, matchOpportunities } from './lib/matching'
import './styles.css'
import './dashboard-responsive.css'
import './matching-ui.css'
import './organizer.css'

function App() {
  const [page, setPage] = useState('Landing')
  const [selected, setSelected] = useState(null)
  const [reminders, setReminders] = useState([])
  const [saved, setSaved] = useState([])
  const [dnaDone, setDnaDone] = useState(false)
  const [studentDNA, setStudentDNA] = useState(demoStudentDNA)
  const [query, setQuery] = useState('')
  const filtered = matchOpportunities(studentDNA, opportunities).filter((item) => `${item.title} ${item.type} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  const toggle = (setter, id) => setter((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const openStudent = () => setPage(dnaDone ? 'Dashboard' : 'Onboarding')

  if (page === 'Landing') return <LandingPage onStart={openStudent} onOrganizer={() => setPage('Organizer')} />
  if (page === 'Onboarding') return <OnboardingPage onComplete={(profile) => { if (profile) { setStudentDNA(profile); setDnaDone(true) }; setPage('Dashboard') }} />

  return <AppShell activePage={page} onNavigate={setPage} savedCount={saved.length}>
    {page === 'Organizer' ? <OrganizerPage onBack={() => setPage('Dashboard')} /> : page === 'Dashboard' ? <DashboardPage items={filtered} setPage={setPage} setSelected={setSelected} reminders={reminders} toggleReminder={(id) => toggle(setReminders, id)} saved={saved} toggleSaved={(id) => toggle(setSaved, id)} /> : <StudentView page={page} opportunities={filtered} query={query} setQuery={setQuery} setPage={setPage} setSelected={setSelected} reminders={reminders} toggleReminder={(id) => toggle(setReminders, id)} saved={saved} toggleSaved={(id) => toggle(setSaved, id)} />}
    {selected && <OpportunityDetails opportunity={selected} onClose={() => setSelected(null)} reminder={reminders.includes(selected.id)} onToggleReminder={() => toggle(setReminders, selected.id)} saved={saved.includes(selected.id)} onToggleSaved={() => toggle(setSaved, selected.id)} onPrepare={() => setSelected(null)} />}
  </AppShell>
}

function StudentView({ page, opportunities: items, query, setQuery, setPage, setSelected, reminders, toggleReminder, saved, toggleSaved }) {
  if (page !== 'Dashboard') return <div className="page-wrap"><section className="welcome-row browse-heading"><div><div className="eyebrow">YOUR OPPORTUNITY LIBRARY</div><h1>{page}</h1><p className="lead">Every option has a reason for being here.</p></div></section><label className="wide-search">Search by opportunity, type, or skill<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try AI, React, or hackathon" /></label><div className="browse-grid">{items.map((item) => <OpportunityCard key={item.id} item={item} onOpen={setSelected} reminder={reminders.includes(item.id)} onToggleReminder={toggleReminder} saved={saved.includes(item.id)} onToggleSaved={toggleSaved} />)}</div></div>
  return <div className="page-wrap"><section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" />Tuesday, September 15, 2026</div><h1>Good morning, Ananya <span>✦</span></h1><p className="lead">Here are a few opportunities that could move you forward.</p></div><button className="button secondary" onClick={() => setPage('Onboarding')}>Shape your Opportunity DNA</button></section><section className="radar-banner"><div className="radar-copy"><div className="eyebrow light">✦ YOUR OPPORTUNITY RADAR</div><h2>3 opportunities worth<br /><em>your attention</em> this week.</h2><p>Matched to where you are and where you want to go next.</p><button className="button light-button" onClick={() => setPage('Explore')}>Explore all matches <ArrowUpRight size={16} /></button></div><div className="radar-visual"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" /><div className="radar-center"><span>88</span><small>match</small></div></div><div className="radar-stat"><strong>12</strong><span>new this week</span><strong>04</strong><span>closing soon</span></div></section><div className="section-heading"><div><div className="eyebrow">CURATED FOR YOU</div><h2>Your next moves</h2></div><button className="text-button" onClick={() => setPage('Explore')}>View all <ArrowUpRight size={15} /></button></div><div className="recommendations">{items.slice(0, 4).map((item) => <OpportunityCard key={item.id} item={item} onOpen={setSelected} reminder={reminders.includes(item.id)} onToggleReminder={toggleReminder} saved={saved.includes(item.id)} onToggleSaved={toggleSaved} />)}</div><div className="lower-grid"><section><div className="section-heading compact"><div><div className="eyebrow">DON'T MISS OUT</div><h2>Upcoming deadlines</h2></div><button className="text-button">Calendar <CalendarDays size={15} /></button></div><div className="deadline-list">{items.slice(0, 3).map((item, index) => <div className="deadline" key={item.id}><div className={`date-block ${index === 0 ? 'urgent' : ''}`}><b>{item.deadline.split(' ')[1]}</b><span>{item.deadline.split(' ')[0]}</span></div><div><strong>{item.title}</strong><span>{item.org} · {item.location}</span></div><span className={index === 0 ? 'deadline-tag urgent-text' : 'deadline-tag'}>{index === 0 ? '6 days left' : `${index + 1} weeks`}</span></div>)}</div></section><section className="reflection-card"><div className="reflection-icon"><Lightbulb size={20} /></div><div className="eyebrow">YOUR GROWTH LOOP</div><h3>Small reflection,<br />smarter matches.</h3><p>Tell us about your last experience and GrowVia will tune your radar.</p><button className="button dark-button">Add a reflection <ArrowUpRight size={15} /></button></section></div><div className="connection-status">{isSupabaseConfigured ? 'Supabase connected' : 'Demo mode · add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect Supabase'}<ChevronRight size={13} /></div></div>
}

createRoot(document.getElementById('root')).render(<App />)

import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { AppShell } from './components/AppShell'
import { OpportunityDetails } from './components/OpportunityDetails'
import { PrepareModal } from './components/PrepareModal'
import { ReflectionModal } from './components/ReflectionModal'
import { InsightsModal } from './components/InsightsModal'
import { opportunities } from './data/opportunities'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DashboardPage } from './pages/DashboardPage'
import { DreamsPage } from './pages/DreamsPage'
import { HomePage } from './pages/HomePage'
import { ProfileAnalysisPage } from './pages/ProfileAnalysisPage'
import { AuthPage } from './pages/AuthPage'
import { OrganizerDashboard } from './pages/OrganizerDashboard'
import { loadReminderIds, removeReminder, saveReminder } from './lib/supabase'
import { demoStudentDNA, matchOpportunities } from './lib/matching'
import { demoProfileAnalysis, demoProfileLinks } from './lib/profileAnalysis'
import './styles.css'
import './dashboard-responsive.css'
import './matching-ui.css'
import './organizer.css'
import './prepare.css'
import './reminders.css'
import './reflection.css'
import './profile.css'
import './auth-organizer.css'
import './student-restructure.css'

function App() {
  const [page, setPage] = useState('Landing')
  const [session, setSession] = useState(null)
  const [publishedEvents, setPublishedEvents] = useState([])
  const [selected, setSelected] = useState(null)
  const [prepareTarget, setPrepareTarget] = useState(null)
  const [reflectionTarget, setReflectionTarget] = useState(null)
  const [insightTarget, setInsightTarget] = useState(null)
  const [reminderTarget, setReminderTarget] = useState(null)
  const [reminders, setReminders] = useState([])
  const [saved, setSaved] = useState([])
  const [studentDNA, setStudentDNA] = useState({ ...demoStudentDNA, profileAnalysis: demoProfileAnalysis })
  const [acceptedIds, setAcceptedIds] = useState([])
  const [rejectedIds, setRejectedIds] = useState([])
  const [dreamIds, setDreamIds] = useState([])
  const [attendedIds, setAttendedIds] = useState([7])
  const [feedbackIds, setFeedbackIds] = useState([])
  const [reminderBusy, setReminderBusy] = useState([])
  const [reminderNotice, setReminderNotice] = useState('')
  const publishedOpportunities = publishedEvents.map((event) => ({ ...event, org: event.organization || event.org || 'GrowVia organizer', type: event.eventType || event.type || 'Challenge', domain: event.domain || event.eventType || 'Student opportunity', tags: [...(event.requiredSkills || []), ...(event.preferredSkills || [])], skills: event.requiredSkills || [], requiredSkills: event.requiredSkills || [], missing: event.preferredSkills || [], color: 'coral', reason: 'A newly published opportunity matched to your current evidence and growth direction.' }))
  const allOpportunities = [...opportunities, ...publishedOpportunities]
  const filtered = matchOpportunities(studentDNA, allOpportunities)
  useEffect(() => { loadReminderIds().then((result) => { if (!result.error) setReminders(result.data) }) }, [])
  const toggle = (setter, id) => setter((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const toggleReminder = async (id) => {
    if (reminderBusy.includes(id)) return
    const opportunity = allOpportunities.find((item) => item.id === id)
    const removing = reminders.includes(id)
    setReminderNotice('')
    setReminderBusy((current) => [...current, id])
    setReminders((current) => removing ? current.filter((item) => item !== id) : [...current, id])
    const result = removing ? await removeReminder(id) : await saveReminder(opportunity)
    setReminderBusy((current) => current.filter((item) => item !== id))
    if (result.error) { setReminders((current) => removing ? [...current, id] : current.filter((item) => item !== id)); setReminderNotice('Reminder changes could not be saved. Please try again.') }
  }
  const authenticate = (account, needsOnboarding) => { setSession(account); if (account.role === 'student' && account.profile) setStudentDNA(account.profile); setPage(account.role === 'organizer' ? 'OrganizerDashboard' : needsOnboarding ? 'Onboarding' : 'Home') }
  const logout = () => { setSession(null); setPage('Landing') }
  const completeOnboarding = (profile) => { if (profile) setStudentDNA((current) => ({ ...current, ...profile, profileLinks: profile.profileLinks || current.profileLinks || demoProfileLinks, profileAnalysis: profile.profileAnalysis || current.profileAnalysis || demoProfileAnalysis })); setPage('Home') }

  if (page === 'Landing') return <LandingPage onStudent={() => setPage('StudentAuth')} onOrganizer={() => setPage('OrganizerAuth')} />
  if (page === 'StudentAuth') return <AuthPage role="student" onBack={() => setPage('Landing')} onAuthenticated={authenticate} />
  if (page === 'OrganizerAuth') return <AuthPage role="organizer" onBack={() => setPage('Landing')} onAuthenticated={authenticate} />
  if (page === 'OrganizerDashboard' && session?.role === 'organizer') return <OrganizerDashboard account={session} events={publishedEvents} setEvents={setPublishedEvents} onLogout={logout} />
  if (page === 'Onboarding') return <OnboardingPage onComplete={completeOnboarding} />

  const dreamMatch = () => Math.min(85, Math.max(42, Math.round((studentDNA.profileAnalysis?.skills || []).reduce((sum, skill) => sum + skill.score, 0) / Math.max(1, (studentDNA.profileAnalysis?.skills || []).length) * 100)))
  const openDream = (dream) => setSelected({ ...dream, category: 'dream', color: 'pink', org: 'Dream Board', domain: dream.tags.join(' · '), type: 'Grand opportunity', date: 'Target opportunity', deadline: 'Dec 31', location: 'Goal', requiredSkills: dream.gap, matchingSkills: [], missingSkills: dream.gap, matchScore: 62, readiness: 'DREAM', reason: 'You do not have to be ready today. This is a long-term target.' })
  return <AppShell activePage={page} studentName={session?.name} onNavigate={setPage} savedCount={saved.length} onLogout={logout}>
    {page === 'Home' && <HomePage items={filtered} accepted={acceptedIds} rejected={rejectedIds} reminders={reminders} onAccept={(id) => setAcceptedIds((current) => current.includes(id) ? current : [...current, id])} onReject={(id) => setRejectedIds((current) => current.includes(id) ? current : [...current, id])} onOpen={setSelected} onRequestReminder={setReminderTarget} />}
    {page === 'Dashboard' && <DashboardPage items={filtered} setPage={setPage} setSelected={setSelected} onReflect={setReflectionTarget} onInsights={setInsightTarget} reminders={reminders} reminderNotice={reminderNotice} userName={session?.name} attendedIds={attendedIds} acceptedIds={acceptedIds} feedbackIds={feedbackIds} />}
    {page === 'Dreams' && <DreamsPage dreams={dreamIds} currentMatch={dreamMatch} onToggleDream={(id) => setDreamIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} onPrepare={openDream} />}
    {page === 'Profile' && <ProfileAnalysisPage studentDNA={studentDNA} onUpdate={setStudentDNA} onNavigate={setPage} />}
    {selected && <OpportunityDetails opportunity={selected} onClose={() => setSelected(null)} reminder={reminders.includes(selected.id)} onToggleReminder={() => setReminderTarget(selected)} saved={saved.includes(selected.id)} onToggleSaved={() => toggle(setSaved, selected.id)} onPrepare={() => setPrepareTarget(selected)} onAttend={() => { setAttendedIds((current) => current.includes(selected.id) ? current : [...current, selected.id]); setSelected(null) }} />}
    {prepareTarget && <PrepareModal opportunity={prepareTarget} studentDNA={studentDNA} onClose={() => setPrepareTarget(null)} />}
    {reflectionTarget && <ReflectionModal opportunity={reflectionTarget} studentDNA={studentDNA} onClose={() => setReflectionTarget(null)} onComplete={(profile) => { setStudentDNA(profile); setFeedbackIds((current) => current.includes(reflectionTarget.id) ? current : [...current, reflectionTarget.id]); setAttendedIds((current) => current.includes(reflectionTarget.id) ? current : [...current, reflectionTarget.id]); setReflectionTarget(null) }} />}
    {reminderTarget && <ReminderConfirm opportunity={reminderTarget} onCancel={() => setReminderTarget(null)} onConfirm={() => { toggleReminder(reminderTarget.id); setReminderTarget(null) }} />}
    {insightTarget && <InsightsModal opportunity={insightTarget} onClose={() => setInsightTarget(null)} />}
  </AppShell>
}

function ReminderConfirm({ opportunity, onCancel, onConfirm }) { return <div className="modal-backdrop" onMouseDown={onCancel}><div className="reminder-confirm" onMouseDown={(event) => event.stopPropagation()}><div className="eyebrow"><CalendarDays size={14} /> CALENDAR REMINDER</div><h2>Add this deadline to your calendar?</h2><p>{opportunity.title}<br />Deadline: {opportunity.deadline}</p><div className="reminder-confirm-actions"><button className="button secondary" onClick={onCancel}>Cancel</button><button className="button dark-button" onClick={onConfirm}>Add Reminder</button></div></div></div> }

createRoot(document.getElementById('root')).render(<App />)

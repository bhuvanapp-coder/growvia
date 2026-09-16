import { BriefcaseBusiness, Check, Code2, Link2, RefreshCw, ShieldCheck, Sparkles, Trash2, UserRound } from 'lucide-react'
import { useState } from 'react'
import { analyzeProfile, confidenceTone, profileSkills } from '../lib/profileAnalysis'
import { saveOpportunityDNA } from '../lib/supabase'

const sourceLabel = { github: 'GitHub', linkedin: 'LinkedIn' }

export function ProfileAnalysisPage({ studentDNA, onUpdate, onNavigate }) {
  const [links, setLinks] = useState(studentDNA.profileLinks || {})
  const [draftSkill, setDraftSkill] = useState('')
  const [notice, setNotice] = useState('')
  const analysis = studentDNA.profileAnalysis
  const skills = profileSkills(studentDNA)

  const updateLinks = (key, value) => setLinks((current) => ({ ...current, [key]: value }))
  const analyze = async () => {
    const next = { ...studentDNA, profileLinks: links, profileAnalysis: analyzeProfile({ profileLinks: links }), analyzedAt: new Date().toISOString() }
    onUpdate(next)
    await saveOpportunityDNA(next)
    setNotice('Your Opportunity DNA was updated.')
  }
  const removeLink = (key) => updateLinks(key, '')
  const addSkill = () => {
    const value = draftSkill.trim()
    if (!value || (studentDNA.currentSkills || []).includes(value)) return
    onUpdate({ ...studentDNA, currentSkills: [...(studentDNA.currentSkills || []), value] })
    setDraftSkill('')
  }
  const removeSkill = (skill) => onUpdate({ ...studentDNA, currentSkills: (studentDNA.currentSkills || []).filter((item) => item !== skill) })

  return <div className="page-wrap profile-page">
    <section className="profile-heading"><div><div className="eyebrow"><UserRound size={13} /> STUDENT PROFILE</div><h1>Build Your Opportunity DNA</h1><p className="lead">Connect real-world evidence to discover what you are ready for next.</p></div><button className="button dark-button" onClick={analyze}><RefreshCw size={15} /> Re-analyze Profile</button></section>
    {notice && <div className="profile-notice"><Check size={16} />{notice}</div>}
    <section className="student-context panel"><div><div className="eyebrow"><UserRound size={13} /> STUDENT SNAPSHOT</div><h2>{studentDNA.name || 'Your'} Opportunity DNA</h2><p className="panel-copy">{studentDNA.college || 'Student profile'} · {studentDNA.course || 'Your learning path'} · {studentDNA.year || 'Current year'}</p></div><div className="student-context-grid"><div><strong>Ambition</strong><span>{studentDNA.ambition || 'Keep growing toward your next opportunity.'}</span></div><div><strong>Projects</strong><span>{(studentDNA.projects || []).join(' · ') || 'Add projects from your profile.'}</span></div></div></section>
    <section className="profile-connect panel"><div className="panel-heading"><div><div className="eyebrow"><Link2 size={13} /> PROFILE EVIDENCE</div><h2>Connect your profiles</h2></div><span className="demo-badge">DEMO ANALYSIS</span></div><p className="panel-copy">Your profiles are used only to improve your opportunity recommendations. These URLs and signals are realistic mock demo data; no real profile is queried. Private repositories and private LinkedIn information are never accessed.</p><div className="connect-grid"><ProfileLink icon={Code2} label="GitHub" value={links.github || ''} placeholder="https://github.com/username" connected={Boolean(links.github)} onChange={(value) => updateLinks('github', value)} onConnect={() => updateLinks('github', links.github || '')} onRemove={() => removeLink('github')} /><ProfileLink icon={BriefcaseBusiness} label="LinkedIn" value={links.linkedin || ''} placeholder="https://linkedin.com/in/username" connected={Boolean(links.linkedin)} onChange={(value) => updateLinks('linkedin', value)} onConnect={() => updateLinks('linkedin', links.linkedin || '')} onRemove={() => removeLink('linkedin')} /></div><div className="profile-actions"><button className="button dark-button" onClick={analyze}><Sparkles size={15} /> Analyze My Profile</button><small>Demo mode uses realistic, editable evidence so you can explore the full flow.</small></div></section>
    <section className="profile-grid"><div className="panel dna-panel"><div className="panel-heading"><div><div className="eyebrow"><Sparkles size={13} /> YOUR OPPORTUNITY DNA</div><h2>Evidence, not a verdict</h2></div></div><p className="panel-copy">Confidence reflects how much supporting evidence we found across your assessment, projects, profile, and activity.</p><div className="confidence-list">{skills.map((item) => <div className="confidence-item" key={item.skill}><div className="confidence-top"><strong>{item.skill}</strong><span>{item.confidence}</span></div><div className="confidence-bar"><i className={confidenceTone(item.confidence)} style={{ width: `${item.score * 100}%` }} /></div><small>{item.sources.join(' + ')}</small></div>)}</div></div><div className="panel"><div className="eyebrow"><ShieldCheck size={13} /> SELF ASSESSMENT</div><h2>Edit your skills</h2><p className="panel-copy">Keep your own voice in the profile. This is one signal, not a test score.</p><div className="editable-skills">{(studentDNA.currentSkills || []).map((skill) => <button key={skill} onClick={() => removeSkill(skill)} title={`Remove ${skill}`}>{skill}<Trash2 size={13} /></button>)}</div><div className="skill-add"><input value={draftSkill} onChange={(event) => setDraftSkill(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addSkill()} placeholder="Add a skill" /><button className="button secondary" onClick={addSkill}>Add</button></div></div></section>
    {analysis && <section className="panel dna-summary"><div className="panel-heading"><div><div className="eyebrow"><Sparkles size={13} /> OPPORTUNITY DNA UPDATE</div><h2>What your profile suggests</h2></div><span className="analysis-date">Updated {new Date(analysis.analyzedAt).toLocaleDateString()}</span></div><div className="dna-columns">{Object.entries(analysis.dna).map(([key, values]) => <div key={key}><h3>{key}</h3><div className="summary-tags">{values.map((value) => <span key={value}>{value}</span>)}</div></div>)}</div></section>}
    <p className="privacy-note"><ShieldCheck size={15} /> You control this data. Edit your links, remove a connection, or refresh your analysis whenever your experience changes.</p>
  </div>
}

function ProfileLink({ icon: Icon, label, value, placeholder, connected, onChange, onConnect, onRemove }) {
  return <div className={`profile-link ${connected ? 'connected' : ''}`}><div className="profile-link-top"><span className="profile-icon"><Icon size={18} /></span><strong>{label}</strong>{connected && <span className="connected-label"><Check size={12} /> Connected</span>}</div><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={`${label} profile URL`} /><div className="profile-link-actions">{connected ? <button className="text-button" onClick={onRemove}><Trash2 size={13} /> Remove {sourceLabel[label.toLowerCase()]}</button> : <button className="text-button" onClick={onConnect}>{label === 'GitHub' ? 'Connect GitHub' : 'Add LinkedIn'}</button>}<Link2 size={14} /></div></div>
}

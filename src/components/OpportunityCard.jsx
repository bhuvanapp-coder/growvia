import { ArrowUpRight, Bell, Bookmark, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { categoryMeta } from '../data/opportunities'

export function OpportunityCard({ item, onOpen, reminder, onToggleReminder, saved, onToggleSaved }) {
  const meta = categoryMeta[item.category]
  const Icon = meta.icon

  return <article className={`opportunity-card ${item.color}`}>
    <div className="card-top"><span className={`category-pill ${meta.className}`}><Icon size={13} />{meta.label}</span><button className="save-button" onClick={() => onToggleSaved(item.id)} aria-label="Save opportunity"><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button></div>
    <div className="org-name">{item.org} · {item.type}</div><h3>{item.title}</h3>
    <div className="match-row"><div className="match-score"><b>{item.score}%</b><span>match</span></div><div className="match-bar"><i style={{ width: `${item.score}%` }} /></div></div>
    <div className="meta-row"><span><CalendarDays size={14} />{item.date}</span><span><MapPin size={14} />{item.location}</span><span><CalendarDays size={14} />Register by {item.deadline}</span></div>
    <p className="reason"><Sparkles size={14} />{item.reason}</p>
    <div className="card-actions"><button className="text-button" onClick={() => onOpen(item)}>View details <ArrowUpRight size={14} /></button><button className={reminder ? 'remind-button on' : 'remind-button'} onClick={() => onToggleReminder(item.id)}><Bell size={14} />{reminder ? 'Reminded' : 'Remind me'}</button></div>
  </article>
}
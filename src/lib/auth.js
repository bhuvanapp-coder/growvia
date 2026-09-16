import { demoStudents } from '../data/demoStudents'

export const demoAccounts = {
  student: { email: 'student@demo.com', password: 'demo123', role: 'student', name: 'Ananya Shah', college: 'VIT University' },
  organizer: { email: 'organizer@demo.com', password: 'demo123', role: 'organizer', name: 'GrowVia Community' },
}

export function authenticate(role, email, password) {
  if (role === 'student') {
    const identifier = email.trim().toLowerCase()
    const student = Object.values(demoStudents).find((account) => account.username === identifier || account.email === identifier)
    if (student && student.password === password) return { ...student, demo: true, profile: student }
  }
  const account = demoAccounts[role]
  if (account && email.trim().toLowerCase() === account.email && password === account.password) return { ...account, demo: true }
  return null
}

export function createDemoAccount(role, details) {
  return { ...details, role, name: details.name || details.organization || 'GrowVia member', demo: true }
}

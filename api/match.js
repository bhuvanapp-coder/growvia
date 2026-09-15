export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ error: 'AI matching is not configured' })

  try {
    const { studentDNA, opportunity } = request.body || {}
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: 'You are GrowVia matching AI. Return JSON with matchScore (0-100), category (perfect, stretch, dream, growth), why, matchingSkills, missingSkills, and growthValue. Consider current skills, interests, growth goals, preferred opportunity types, and dream opportunities. A low current skill match can still be stretch, dream, or growth when desired growth aligns.' }, { role: 'user', content: JSON.stringify({ studentDNA, opportunity }) }],
      }),
    })
    if (!completion.ok) return response.status(502).json({ error: 'AI provider request failed' })
    const payload = await completion.json()
    return response.status(200).json(JSON.parse(payload.choices?.[0]?.message?.content || '{}'))
  } catch (error) {
    return response.status(500).json({ error: 'AI matching failed' })
  }
}

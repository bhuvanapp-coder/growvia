export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ error: 'AI preparation is not configured' })
  try {
    const { studentDNA, opportunity } = request.body || {}
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.3, response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: 'You are GrowVia preparation coach. Return JSON with daysAvailable, focus (array), requirements (array), and plan (array of objects with label, title, detail). Adapt the plan to the registration deadline. Use current skills, missing skills, event requirements, and time remaining. Keep it concrete and encouraging.' }, { role: 'user', content: JSON.stringify({ studentDNA, opportunity }) }],
      }),
    })
    if (!completion.ok) return response.status(502).json({ error: 'AI provider request failed' })
    const payload = await completion.json()
    return response.status(200).json(JSON.parse(payload.choices?.[0]?.message?.content || '{}'))
  } catch { return response.status(500).json({ error: 'Preparation generation failed' }) }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ error: 'AI extraction is not configured' })

  try {
    const { imageData, mimeType } = request.body || {}
    if (!imageData || !mimeType?.startsWith('image/')) return response.status(400).json({ error: 'An image poster is required' })
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: 'Extract event poster information. Return JSON with title, description, domain, date, deadline, location, eligibility, teamSize, prize, requiredSkills as an array, and registrationUrl. Use empty strings or arrays when a field is not visible. Never invent a registration URL.' }, { role: 'user', content: [{ type: 'text', text: 'Extract the opportunity details from this poster.' }, { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageData}` } }] }],
      }),
    })
    if (!completion.ok) return response.status(502).json({ error: 'AI provider request failed' })
    const payload = await completion.json()
    return response.status(200).json(JSON.parse(payload.choices?.[0]?.message?.content || '{}'))
  } catch {
    return response.status(500).json({ error: 'Poster extraction failed' })
  }
}

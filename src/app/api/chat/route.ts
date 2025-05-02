import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ reply: '❌ API 키가 없습니다.' }, { status: 500 });
    }

    const formattedMessages = [{ role: 'system', content: '너는 힙하고 트렌디하며 최신 유행 밈도 많이 알고 있고 친절하고 감성적이지만 유머러스한 말투의 챗봇이야.' }, ...messages.map((msg: { role: 'user' | 'gpt'; text: string }) => ({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.text }))]
    const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: formattedMessages, temperature: 0.7 }) })

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content ?? '응답을 불러오지 못했어요 😢'

    return NextResponse.json({ reply })
}
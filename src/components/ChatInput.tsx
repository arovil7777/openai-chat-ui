'use client'

import { useState } from 'react'

type Props = { onSend: (text: string) => void }

export default function ChatInput({ onSend }: Props) {
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput('')
    }

    return (
        <div className="w-full bg-white border-t px-4 py-2 sticky bottom-0">
            <div className="flex gap-2">
                <input type="text" placeholder="메시지를 입력하세요" className="flex-1 px-4 py-2 border rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-300" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
                <button onClick={handleSend} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm font-bold text-black">
                    전송
                </button>
            </div>
        </div>
    )
}
'use client';

import { useEffect, useState, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

export default function Chat() {
    const [messages, setMessages] = useState<{ role: 'user' | 'gpt'; text: string }[]>([]);
    const [loading, setLoading] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const sendMessage = async (text: string) => {
        const userMessage = { role: 'user' as const, text };
        const newMessages = [...messages, userMessage]
        setMessages(newMessages);
        setLoading(true)

        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ messages: newMessages }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        const gptMessage = { role: 'gpt', text: data.reply } as const;
        setMessages(prev => [...prev, gptMessage]);
        setLoading(false)
    }

    // 메시지가 추가될 때마다 스크롤 내려주기
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, loading])

    const handleScroll = () => {
        if (!scrollContainerRef.current) return

        const scrollTop = scrollContainerRef.current.scrollTop
        setIsScrolled(scrollTop > 10)
    }

    return (
        <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-gray-50 relative">
            <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
                {messages.map((msg, i) => (
                    <ChatBubble key={i} role={msg.role} text={msg.text} />
                ))}

                {loading && <ChatBubble role="gpt" text="..." />}

                <div ref={bottomRef} />
            </div>

            {isScrolled && (
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent pointer-events-none z-10" />
            )}
            <ChatInput onSend={sendMessage} />
        </div>
    )
}
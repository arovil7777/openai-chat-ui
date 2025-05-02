'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
    role: 'user' | 'gpt'
    text: string
};

export default function ChatBubble({ role, text }: Props) {
    const isUser = role === 'user';
    const now = new Date()
    const time = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })

    return (
        <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'} px-2`}>
            {!isUser && (
                <Image src="/gpt.png" alt="GPT Profile" width={32} height={32} className="rounded-full mr-2" />
            )}

            <div className="flex flex-col">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`inline-block px-4 py-2 text-sm shadow
                    whitespace-pre-wrap break-words ${isUser ? 'bg-yellow-300 text-black rounded-2xl rounded-br-none' : 'bg-white text text-gray-800 border rounded-2xl rounded-bl-none'}`}>
                    {text}
                </motion.div>
                <span className="text-[10px] text-gray-400 mt-1 self-end">{time}</span>
            </div>

            {isUser && (
                <Image src="/user.png" alt="User Profile" width={32} height={32} className="rounded-full ml-2" />
            )}
        </div>
    )
}
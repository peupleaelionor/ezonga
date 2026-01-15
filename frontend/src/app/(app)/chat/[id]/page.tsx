'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { Send } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

export default function ChatPage() {
  const params = useParams();
  const user = useAuthStore(state => state.user);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      auth: { token: localStorage.getItem('token') }
    });
    setSocket(newSocket);

    newSocket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => { newSocket.close(); };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Envoyer au backend pour sauvegarde
    socket?.emit('send_message', {
      senderId: user?.id,
      receiverId: params.id,
      content: input,
      room: params.id
    });
    
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-zinc-900 rounded-t-3xl border-t border-zinc-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-container">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${
              msg.senderId === user?.id ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="p-4 bg-zinc-950 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 focus:outline-none focus:border-emerald-500"
          placeholder="Tape ton message..."
        />
        <button type="submit" className="p-3 bg-emerald-600 rounded-full text-white hover:bg-emerald-500">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
'use client';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/lib/store';
import { messageAPI } from '@/lib/api';

export default function Chat() {
  const user = useAuthStore(state => state.user);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    // Initialiser Socket.IO
    socketRef.current = io('http://localhost:5000', {
      auth: { token: useAuthStore.getState().token }
    });

    socketRef.current.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Charger les conversations
    const loadConversations = async () => {
      try {
        const res = await messageAPI.getConversations();
        setConversations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadConversations();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  const selectConversation = async (otherUser: any) => {
    setSelectedUser(otherUser);
    try {
      const res = await messageAPI.getMessages(otherUser.id);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !socketRef.current) return;

    socketRef.current.emit('sendMessage', {
      receiverId: selectedUser.id,
      content: newMessage
    });

    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full">
      <div className="w-1/3 bg-zinc-900 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={`p-3 rounded-lg mb-2 cursor-pointer ${selectedUser?.id === conv.id ? 'bg-emerald-600' : 'bg-zinc-800'}`}
            onClick={() => selectConversation(conv)}
          >
            {conv.name}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-zinc-900 p-4 border-b border-zinc-800">
              <h3 className="text-lg font-bold">{selectedUser.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${msg.senderId === user?.id ? 'bg-emerald-600' : 'bg-zinc-800'}`}>
                    <p>{msg.content}</p>
                    <p className="text-xs opacity-70">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-zinc-800">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-l-xl focus:outline-none focus:border-emerald-500"
                  placeholder="Tapez votre message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 bg-emerald-600 rounded-r-xl hover:bg-emerald-500 transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  );
}
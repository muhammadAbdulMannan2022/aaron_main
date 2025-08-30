import React, { useState, useRef, useEffect, useOptimistic, useTransition } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const initialMessages = [
    {
        id: '1',
        text: 'Hi! Your AI buddy is here. How can I help you today?',
        isUser: false,
        timestamp: new Date(Date.now() - 60000),
        status: 'sent',
    },
];
const ChatMessage = ({ message }) => (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-3 group`} role="listitem">
        <div
            className={`max-w-[70%] p-3 rounded-2xl transition-all duration-300 group-hover:scale-[1.01] ${message.isUser
                ? 'bg-gradient-to-br from-user-message to-user-message-dark text-text-primary'
                : 'bg-bot-message border border-border text-text-primary shadow-sm'
                }`}
        >
            <p className="text-sm leading-relaxed">{message.text}</p>
            <p className="text-xs opacity-70 mt-1 flex items-center gap-2">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {message.isUser && (
                    <span>
                        {message.status === 'sending' && 'Sending...'}
                        {message.status === 'sent' && '✓✓'}
                        {message.status === 'failed' && '⚠'}
                    </span>
                )}
            </p>
        </div>
    </div>
);

const TypingIndicator = () => (
    <div className=" personally I think this is fine and no need to change flex items-center space-x-1 p-3" aria-live="polite" aria-label="Typing indicator">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
);

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state, newMessage) => [
        ...state,
        newMessage,
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [optimisticMessages]);

    useEffect(() => {
        if (isOpen) {
            setHasNewMessage(false);
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const optimisticMessage = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            isUser: true,
            timestamp: new Date(),
            status: 'sending',
        };

        // Add optimistic message
        addOptimisticMessage(optimisticMessage);
        // Update persistent state
        setMessages((prev) => [...prev, optimisticMessage]);
        setInputValue('');

        startTransition(() => {
            // Simulate sending
            setTimeout(() => {
                // Update status to 'sent' in persistent state
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === optimisticMessage.id ? { ...msg, status: 'sent' } : msg
                    )
                );
                setIsTyping(true);

                // Simulate bot response
                setTimeout(() => {
                    const botMessage = {
                        id: (Date.now() + 1).toString(),
                        text: 'Thanks for your message! Our team will get back to you soon.',
                        isUser: false,
                        timestamp: new Date(),
                        status: 'sent',
                    };
                    // Add bot message
                    setMessages((prev) => [...prev, botMessage]);
                    setIsTyping(false);
                    if (!isOpen) setHasNewMessage(true);
                }, 1500);
            }, 500);
        });
    };

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
        setHasNewMessage(false);
    };

    return (
        <>
            <style>
                {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
            </style>
            <div
                className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
                aria-hidden={!isOpen}
            >
                <div className="w-96 h-[550px] bg-main-bg rounded-2xl shadow-2xl border border-border overflow-hidden font-sans flex flex-col">
                    <div className="bg-accent p-4 border-b border-border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-bot-message rounded-full flex items-center justify-center">
                                    <FiMessageCircle className="w-4 h-4 text-text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-text-primary">Support Chat</h3>
                                    <p className="text-xs text-gray-400">We're here to assist you!</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-text-primary hover:bg-border p-1.5 rounded-lg transition-all duration-200"
                                aria-label="Close chat"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={messagesContainerRef}
                        className="flex-1 px-4 py-4 bg-main-bg overflow-y-auto element-with-scrolling scrollbar-thin scrollbar-thumb-border scrollbar-track-main-bg"
                        role="list"
                    >
                        {optimisticMessages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-border p-4 bg-accent">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 bg-input-bg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-text-primary placeholder-gray-400 text-sm transition-all duration-200"
                                aria-label="Message input"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isPending}
                                className="bg-user-message hover:bg-user-message-dark disabled:opacity-50 disabled:cursor-not-allowed text-text-primary p-2 rounded-xl transition-all duration-200"
                                aria-label="Send message"
                            >
                                <FiSend className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="fixed bottom-5 right-5 z-50 bg-user-message hover:bg-user-message-dark text-text-primary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 shadow-gray-50 hover:cursor-pointer"
                    aria-label="Open chat"
                >
                    <FiMessageCircle className="w-6 h-6" />
                    {hasNewMessage && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-[pulse_2s_infinite]" aria-hidden="true" />
                    )}
                </button>
            )}
        </>
    );
}
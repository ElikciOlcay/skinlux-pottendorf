"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ExternalLink, Gift, Euro, CreditCard } from "lucide-react";
import { LISA_KNOWLEDGE } from "@/lib/chat/knowledge-base";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const QUICK_REPLIES = [
    "Welche Behandlung passt zu mir?",
    "Was kostet eine Laser-Behandlung?",
    "Wie läuft ein HydraFacial ab?",
    "Kann ich einen Termin buchen?"
];

const SMART_ACTIONS = [
    { icon: Gift, label: "Gutschein kaufen", action: "voucher", color: "from-pink-500 to-rose-600" },
    { icon: Euro, label: "Preisliste", action: "prices", color: "from-purple-500 to-pink-600" },
    { icon: CreditCard, label: "Angebote", action: "offers", color: "from-blue-500 to-purple-600" }
];

const INITIAL_MESSAGE = "Hallo! 👋 Ich bin Lisa, Ihre persönliche Beauty-Beraterin bei SkinLux. Wie kann ich Ihnen heute helfen?";

// Types für Link-Formatierung
interface MessagePart {
    type: 'text' | 'link';
    content: string;
    href?: string;
    linkType?: 'url' | 'phone' | 'email';
}

// Funktion zum Erkennen und Formatieren von Links
function formatMessageWithLinks(text: string): MessagePart[] {
    // Regex für URLs
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\+43[^\s]+)|([\w._%+-]+@[\w.-]+\.[A-Za-z]{2,})/g;
    const parts: MessagePart[] = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
        // Text vor dem Link
        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                content: text.slice(lastIndex, match.index)
            });
        }

        // Der Link selbst
        const linkText = match[0];
        let href = linkText;
        let linkType: 'url' | 'phone' | 'email' = 'url';

        // Telefonnummer
        if (linkText.startsWith('+43')) {
            href = `tel:${linkText.replace(/\s/g, '')}`;
            linkType = 'phone';
        }
        // E-Mail
        else if (linkText.includes('@')) {
            href = `mailto:${linkText}`;
            linkType = 'email';
        }
        // URL ohne Protokoll
        else if (linkText.startsWith('www.')) {
            href = `https://${linkText}`;
        }
        // URL mit Protokoll bleibt unverändert

        parts.push({
            type: 'link',
            content: linkText,
            href: href,
            linkType: linkType
        });

        lastIndex = match.index + match[0].length;
    }

    // Restlicher Text
    if (lastIndex < text.length) {
        parts.push({
            type: 'text',
            content: text.slice(lastIndex)
        });
    }

    return parts;
}

// Funktion zum Kürzen von langen URLs für die Anzeige
function truncateUrl(url: string, maxLength: number = 40): string {
    if (url.length <= maxLength) return url;

    // Versuche, den Domainnamen zu extrahieren
    const domainMatch = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    if (domainMatch) {
        const domain = domainMatch[1];
        if (domain.length < maxLength - 3) {
            return domain + '...';
        }
    }

    // Falls immer noch zu lang, kürze von der Mitte
    const start = url.substring(0, maxLength / 2 - 2);
    const end = url.substring(url.length - maxLength / 2 + 2);
    return start + '...' + end;
}

// Funktion zum Formatieren von Text mit Bold-Syntax
function formatTextWithBold(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

// Komponente zum Rendern von formatierten Nachrichten
function MessageContent({ content }: { content: string }) {
    const parts = formatMessageWithLinks(content);

    return (
        <>
            {parts.map((part, index) => {
                if (part.type === 'text') {
                    return <span key={index}>{formatTextWithBold(part.content)}</span>;
                } else if (part.type === 'link') {
                    const isPhone = part.linkType === 'phone';
                    const isEmail = part.linkType === 'email';
                    const isLongUrl = !isPhone && !isEmail && part.content.length > 40;
                    const displayText = isLongUrl ? truncateUrl(part.content) : part.content;

                    return (
                        <a
                            key={index}
                            href={part.href}
                            target={isPhone || isEmail ? undefined : "_blank"}
                            rel={isPhone || isEmail ? undefined : "noopener noreferrer"}
                            className="inline-flex items-center gap-1 underline decoration-1 decoration-dashed underline-offset-2 hover:decoration-solid transition-all break-all"
                            style={{
                                color: 'inherit',
                                fontWeight: 600,
                                wordBreak: 'break-all'
                            }}
                            title={isLongUrl ? part.content : undefined}
                        >
                            {displayText}
                            {!isPhone && !isEmail && (
                                <ExternalLink className="w-3 h-3 inline-block flex-shrink-0" />
                            )}
                        </a>
                    );
                }
                return null;
            })}
        </>
    );
}

// Entfernt - Gutschein-Flow nicht mehr benötigt

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    // Helper für eindeutige Message IDs
    const generateMessageId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    const [messages, setMessages] = useState<Message[]>([
        {
            id: generateMessageId(),
            role: "assistant",
            content: INITIAL_MESSAGE,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async (message: string) => {
        if (!message.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: generateMessageId(),
            role: "user",
            content: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");

        // Entfernt - kein Voucher-Flow mehr

        // Normal chat flow
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    context: LISA_KNOWLEDGE
                }),
            });

            const data = await response.json();

            // Add assistant response
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an: +43 660 57 21 403",
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSmartAction = async (action: string) => {
        if (action === 'voucher') {
            // Verlinke zur Gutschein-Seite
            const voucherMessage: Message = {
                id: generateMessageId(),
                role: "assistant",
                content: "Toll, dass Sie einen Gutschein verschenken möchten! 🎁\n\n**Unsere Gutscheine:**\n• Gültig für alle Behandlungen\n• Schön verpackt oder als PDF\n• Sichere Zahlung per Überweisung\n\n👉 Besuchen Sie unsere Gutschein-Seite: https://bischofshofen.skinlux.at/gutscheine\n\nDort können Sie ganz einfach Ihren Wunschgutschein bestellen.\n\nGerne können Sie uns auch anrufen: +43 660 57 21 403",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, voucherMessage]);

        } else if (action === 'prices') {
            handleSend("Was sind die aktuellen Preise?");
        } else if (action === 'offers') {
            handleSend("Welche Angebote gibt es aktuell?");
        }
    };

    // Entfernt - keine Voucher-Funktionen mehr

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative">
                            <MessageCircle className="w-6 h-6" />
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-40 w-[380px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ height: "600px", maxHeight: "80vh" }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Lisa</h3>
                                        <p className="text-xs opacity-90">KI-Beauty-Beraterin</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pt-8 pb-6 space-y-4" style={{ height: "calc(100% - 200px)" }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-xl break-words overflow-hidden ${msg.role === "user"
                                            ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">
                                            <MessageContent content={msg.content} />
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 rounded-xl">
                                        <div className="flex gap-1">
                                            <motion.div
                                                className="w-2 h-2 bg-gray-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-gray-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-gray-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2 overflow-x-auto">
                                <div className="flex flex-wrap gap-2">
                                    {QUICK_REPLIES.map((reply) => (
                                        <button
                                            key={reply}
                                            onClick={() => handleSend(reply)}
                                            className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 whitespace-nowrap"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Entfernt - Voucher Amount Selection */}



                        {/* Smart Actions */}
                        {messages.length > 0 && (
                            <div className="px-4 pb-2">
                                <div className="flex gap-2 overflow-x-auto">
                                    {SMART_ACTIONS.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <button
                                                key={action.action}
                                                onClick={() => handleSmartAction(action.action)}
                                                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-full text-sm font-medium hover:shadow-lg transition-all whitespace-nowrap`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {action.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Entfernt - Cancel Button */}

                        {/* Input */}
                        <div className="p-4 border-t">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(inputValue);
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ihre Nachricht..."
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                    disabled={isTyping}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 
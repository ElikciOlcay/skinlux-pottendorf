"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Brain, ArrowRight, Phone, Mail, Globe } from "lucide-react";
import { LISA_KNOWLEDGE } from "@/lib/chat/knowledge-base";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

// Quiz-spezifische Interfaces
interface QuizAnswer {
    questionId: string;
    value: string;
    label: string;
}

interface QuizState {
    isActive: boolean;
    currentQuestion: number;
    answers: QuizAnswer[];
    isComplete: boolean;
}

interface Treatment {
    name: string;
    subtitle: string;
    description: string;
    benefits: string[];
    price: string;
    duration: string;
    bookingAction: string;
}

// Vereinfachte Quick Actions - nur die wichtigsten
const MAIN_ACTIONS = [
    { id: "quiz", label: "Hautanalyse-Quiz", icon: Brain, description: "Personalisierte Behandlungsempfehlung" },
    { id: "booking", label: "Termin buchen", icon: Phone, description: "Online-Terminbuchung" },
    { id: "info", label: "Behandlungsinfo", icon: Sparkles, description: "Alle Behandlungen im Überblick" }
];

const INITIAL_MESSAGE = "Hallo! 👋 Ich bin Lisa, Ihre persönliche Beauty-Beraterin bei SkinLux. Wie kann ich Ihnen heute helfen?";

// Types für Link-Formatierung
interface MessagePart {
    type: 'text' | 'link';
    content: string;
    href?: string;
    linkType?: 'url' | 'phone' | 'email';
}

// Utility function to detect mobile devices
const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Funktion zum Erkennen und Formatieren von Links
function formatMessageWithLinks(text: string): MessagePart[] {
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\+43[^\s]+)|([\w._%+-]+@[\w.-]+\.[A-Za-z]{2,})/g;
    const parts: MessagePart[] = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                content: text.slice(lastIndex, match.index)
            });
        }

        const linkText = match[0];
        let href = linkText;
        let linkType: 'url' | 'phone' | 'email' = 'url';

        if (linkText.startsWith('+43')) {
            href = `tel:${linkText.replace(/\s/g, '')}`;
            linkType = 'phone';
        } else if (linkText.includes('@')) {
            href = `mailto:${linkText}`;
            linkType = 'email';
        } else if (linkText.startsWith('www.')) {
            href = `https://${linkText}`;
        }

        parts.push({
            type: 'link',
            content: linkText,
            href: href,
            linkType: linkType
        });

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push({
            type: 'text',
            content: text.slice(lastIndex)
        });
    }

    return parts;
}

// Funktion zum Kürzen von langen URLs für die Anzeige
function truncateUrl(url: string, maxLength: number = 35): string {
    if (url.length <= maxLength) return url;

    const domainMatch = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    if (domainMatch) {
        const domain = domainMatch[1];
        if (domain.length < maxLength - 3) {
            return domain + '...';
        }
    }

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
                    const isLongUrl = !isPhone && !isEmail && part.content.length > 35;
                    const displayText = isLongUrl ? truncateUrl(part.content) : part.content;

                    return (
                        <a
                            key={index}
                            href={part.href}
                            target={isPhone || isEmail ? undefined : "_blank"}
                            rel={isPhone || isEmail ? undefined : "noopener noreferrer"}
                            className="inline-flex items-center gap-1 underline decoration-1 decoration-dashed underline-offset-2 hover:decoration-solid transition-all break-all font-medium"
                            style={{ color: 'inherit' }}
                            title={isLongUrl ? part.content : undefined}
                        >
                            {isPhone && <Phone className="w-3 h-3 inline-block flex-shrink-0" />}
                            {isEmail && <Mail className="w-3 h-3 inline-block flex-shrink-0" />}
                            {!isPhone && !isEmail && <Globe className="w-3 h-3 inline-block flex-shrink-0" />}
                            {displayText}
                        </a>
                    );
                }
                return null;
            })}
        </>
    );
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showActions, setShowActions] = useState(true);

    // Quiz State
    const [quizState, setQuizState] = useState<QuizState>({
        isActive: false,
        currentQuestion: 0,
        answers: [],
        isComplete: false
    });

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

    // Quiz-Empfehlungs-Engine
    const generateRecommendations = (answers: QuizAnswer[]): Treatment[] => {
        const answerMap = answers.reduce((acc, answer) => {
            acc[answer.questionId] = answer.value;
            return acc;
        }, {} as Record<string, string>);

        const allRecommendations = LISA_KNOWLEDGE.skinAnalysisQuiz.recommendations;
        const matchingRecommendations: { treatments: Treatment[], priority: number }[] = [];

        Object.values(allRecommendations).forEach(recommendation => {
            if (recommendation.condition(answerMap)) {
                matchingRecommendations.push({
                    treatments: recommendation.treatments,
                    priority: recommendation.priority
                });
            }
        });

        const sortedRecommendations = matchingRecommendations
            .sort((a, b) => a.priority - b.priority)
            .flatMap(rec => rec.treatments)
            .slice(0, 3);

        if (sortedRecommendations.length === 0) {
            return [LISA_KNOWLEDGE.skinAnalysisQuiz.defaultRecommendation];
        }

        return sortedRecommendations;
    };

    // Quiz starten
    const startQuiz = () => {
        setShowActions(false);
        setQuizState({
            isActive: true,
            currentQuestion: 0,
            answers: [],
            isComplete: false
        });

        const introMessage: Message = {
            id: generateMessageId(),
            role: "assistant",
            content: `${LISA_KNOWLEDGE.skinAnalysisQuiz.introduction}\n\n✨ Das Quiz dauert nur 2 Minuten und hilft mir, Ihnen die perfekte Behandlung zu empfehlen!`,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, introMessage]);
    };

    // Quiz-Antwort verarbeiten
    const handleQuizAnswer = (questionId: string, value: string, label: string) => {
        const newAnswer: QuizAnswer = { questionId, value, label };
        const updatedAnswers = [...quizState.answers, newAnswer];

        setQuizState(prev => ({
            ...prev,
            answers: updatedAnswers,
            currentQuestion: prev.currentQuestion + 1,
            isComplete: prev.currentQuestion + 1 >= LISA_KNOWLEDGE.skinAnalysisQuiz.questions.length
        }));

        const answerMessage: Message = {
            id: generateMessageId(),
            role: "user",
            content: label,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, answerMessage]);

        if (quizState.currentQuestion + 1 >= LISA_KNOWLEDGE.skinAnalysisQuiz.questions.length) {
            setTimeout(() => {
                generateAndShowRecommendations(updatedAnswers);
            }, 500);
        }
    };

    // Empfehlungen generieren und anzeigen
    const generateAndShowRecommendations = (answers: QuizAnswer[]) => {
        setIsTyping(true);

        setTimeout(() => {
            const recommendations = generateRecommendations(answers);

            let recommendationText = "**Perfekt! Basierend auf Ihren Antworten empfehle ich Ihnen:**\n\n";

            recommendations.forEach((treatment, index) => {
                recommendationText += `**${index + 1}. ${treatment.name}**\n`;
                recommendationText += `${treatment.subtitle}\n\n`;
                recommendationText += `${treatment.description}\n\n`;
                recommendationText += `✨ **Vorteile:**\n`;
                treatment.benefits.forEach(benefit => {
                    recommendationText += `• ${benefit}\n`;
                });
                recommendationText += `\n📅 **Dauer:** ${treatment.duration}\n`;
                recommendationText += `💰 **Preis:** ${treatment.price}\n\n`;

                if (index < recommendations.length - 1) {
                    recommendationText += "---\n\n";
                }
            });

            recommendationText += `\n🎯 **Nächste Schritte:**\n`;
            recommendationText += `• Online-Termin buchen: https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone\n`;
            recommendationText += `• Anrufen: +43 660 57 21 403\n\n`;
            recommendationText += `Haben Sie weitere Fragen? Ich helfe gerne weiter! 😊`;

            const recommendationMessage: Message = {
                id: generateMessageId(),
                role: "assistant",
                content: recommendationText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, recommendationMessage]);
            setIsTyping(false);
            setShowActions(true);

            // Quiz zurücksetzen
            setQuizState({
                isActive: false,
                currentQuestion: 0,
                answers: [],
                isComplete: false
            });
        }, 1500);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Entfernt: Auto-Focus für Mobile
    useEffect(() => {
        if (isOpen && inputRef.current && !isMobileDevice()) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async (message: string) => {
        if (!message.trim()) return;
        setShowActions(false);

        const userMessage: Message = {
            id: generateMessageId(),
            role: "user",
            content: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
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

            const assistantMessage: Message = {
                id: generateMessageId(),
                role: "assistant",
                content: data.message,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setShowActions(true);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: generateMessageId(),
                role: "assistant",
                content: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an: +43 660 57 21 403",
                timestamp: new Date()
            }]);
            setShowActions(true);
        } finally {
            setIsTyping(false);
        }
    };

    const handleMainAction = async (actionId: string) => {
        setShowActions(false);

        if (actionId === 'quiz') {
            startQuiz();
        } else if (actionId === 'booking') {
            const bookingMessage: Message = {
                id: generateMessageId(),
                role: "assistant",
                content: "**Termin online buchen** 📅\n\nSie können ganz einfach Ihren Wunschtermin online buchen:\n\n👉 **Online-Buchung:** https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone\n\n📞 **Oder anrufen:** +43 660 57 21 403\n\n**Verfügbare Behandlungen:**\n• Laser-Haarentfernung (Probebehandlung kostenlos)\n• HydraFacial® Premium-Behandlung\n• Signature Facials mit Circadia Professional\n\nWählen Sie einfach Ihre gewünschte Behandlung und Ihren Termin aus!",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, bookingMessage]);
            setTimeout(() => setShowActions(true), 1000);
        } else if (actionId === 'info') {
            handleSend("Welche Behandlungen bietet SkinLux an?");
        }
    };

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
                        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
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
                        className="fixed md:bottom-6 md:right-6 inset-0 md:inset-auto z-40 md:w-[400px] md:max-w-[90vw] w-full h-full md:h-[650px] md:max-h-[85vh] bg-white md:rounded-2xl md:shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Lisa</h3>
                                        <p className="text-sm opacity-90">Beauty-Beraterin</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user"
                                            ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-br-lg"
                                            : "bg-gray-50 text-gray-800 rounded-bl-lg"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            <MessageContent content={msg.content} />
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quiz UI */}
                            {quizState.isActive && !quizState.isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="max-w-[90%] bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 p-5 rounded-2xl rounded-bl-lg">
                                        {(() => {
                                            const currentQ = LISA_KNOWLEDGE.skinAnalysisQuiz.questions[quizState.currentQuestion];
                                            if (!currentQ) return null;

                                            return (
                                                <div>
                                                    {/* Progress Bar */}
                                                    <div className="mb-5">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <span className="text-xs text-gray-600 font-medium">
                                                                Frage {quizState.currentQuestion + 1} von {LISA_KNOWLEDGE.skinAnalysisQuiz.questions.length}
                                                            </span>
                                                            <span className="text-xs text-blue-600 font-semibold">
                                                                {Math.round(((quizState.currentQuestion + 1) / LISA_KNOWLEDGE.skinAnalysisQuiz.questions.length) * 100)}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                                style={{
                                                                    width: `${((quizState.currentQuestion + 1) / LISA_KNOWLEDGE.skinAnalysisQuiz.questions.length) * 100}%`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Question */}
                                                    <h3 className="text-sm font-medium text-gray-800 mb-4 leading-relaxed">
                                                        {currentQ.question}
                                                    </h3>

                                                    {/* Answer Options */}
                                                    <div className="space-y-3">
                                                        {currentQ.options.map((option, index) => (
                                                            <motion.button
                                                                key={option.value}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.1 }}
                                                                onClick={() => handleQuizAnswer(currentQ.id, option.value, option.label)}
                                                                className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all text-sm group shadow-sm hover:shadow-md"
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                                                                        {option.label}
                                                                    </span>
                                                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                                </div>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </motion.div>
                            )}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-lg">
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
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Main Actions - Cleaner Design */}
                        {showActions && !quizState.isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-4 pb-3"
                            >
                                <div className="grid grid-cols-1 gap-2">
                                    {MAIN_ACTIONS.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <motion.button
                                                key={action.id}
                                                onClick={() => handleMainAction(action.id)}
                                                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-left border border-gray-200 hover:border-gray-300 group"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-800 text-sm group-hover:text-gray-900">
                                                        {action.label}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {action.description}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t bg-gray-50">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(inputValue);
                                }}
                                className="flex gap-3"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={quizState.isActive ? "Quiz läuft - bitte wählen Sie eine Antwort oben" : "Nachricht schreiben..."}
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm bg-white"
                                    disabled={isTyping || quizState.isActive}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                />
                                <motion.button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping || quizState.isActive}
                                    className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-shadow"
                                    whileHover={{ scale: quizState.isActive ? 1 : 1.05 }}
                                    whileTap={{ scale: quizState.isActive ? 1 : 0.95 }}
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
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

// Gutschein-Flow States
interface VoucherFlow {
    step: 'amount' | 'name' | 'email' | 'phone' | 'message' | 'confirm' | 'complete' | null;
    data: {
        amount: number;
        senderName: string;
        senderEmail: string;
        senderPhone?: string;
        message?: string;
        code?: string;
        orderNumber?: string;
    };
}

interface BankDetailsCache {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "initial",
            role: "assistant",
            content: INITIAL_MESSAGE,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [voucherFlow, setVoucherFlow] = useState<VoucherFlow>({
        step: null,
        data: {
            amount: 0,
            senderName: '',
            senderEmail: '',
            senderPhone: '',
            message: ''
        }
    });
    const [isProcessingVoucher, setIsProcessingVoucher] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetailsCache | null>(null);
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

        // Lade Bankdaten beim Öffnen des Chats
        if (isOpen && !bankDetails) {
            fetch('/api/bank-details')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.bankDetails) {
                        setBankDetails({
                            bankName: data.bankDetails.bankName,
                            accountHolder: data.bankDetails.accountHolder,
                            iban: data.bankDetails.iban,
                            bic: data.bankDetails.bic
                        });
                    }
                })
                .catch(err => console.error('Error loading bank details:', err));
        }
    }, [isOpen, bankDetails]);

    const handleSend = async (message: string) => {
        if (!message.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");

        // Handle voucher flow steps
        // Abbruch-Check für alle Schritte
        if (voucherFlow.step && (message.toLowerCase() === 'abbrechen' || message.toLowerCase() === 'stop' || message.toLowerCase() === 'cancel')) {
            setVoucherFlow({
                step: null,
                data: {
                    amount: 0,
                    senderName: '',
                    senderEmail: '',
                    senderPhone: '',
                    message: ''
                }
            });
            const cancelMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Kein Problem! Der Gutschein-Vorgang wurde abgebrochen. Wie kann ich Ihnen sonst helfen? 😊",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, cancelMessage]);
            return;
        }

        if (voucherFlow.step === 'name') {
            setVoucherFlow({
                ...voucherFlow,
                step: 'email',
                data: { ...voucherFlow.data, senderName: message }
            });

            const emailPrompt: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Vielen Dank! Und Ihre E-Mail-Adresse? 📧",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, emailPrompt]);
            return;
        }

        if (voucherFlow.step === 'email') {
            // Validiere E-Mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(message)) {
                const errorMessage: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Das sieht nicht wie eine gültige E-Mail-Adresse aus. Bitte versuchen Sie es nochmal:",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
                return;
            }

            setVoucherFlow({
                ...voucherFlow,
                step: 'phone',
                data: { ...voucherFlow.data, senderEmail: message }
            });

            const phonePrompt: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Möchten Sie Ihre Telefonnummer angeben? 📱\n\n(Optional - geben Sie Ihre Nummer ein oder schreiben Sie 'nein')",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, phonePrompt]);
            return;
        }

        if (voucherFlow.step === 'phone') {
            if (message.toLowerCase() !== 'nein' && message.toLowerCase() !== 'weiter') {
                setVoucherFlow({
                    ...voucherFlow,
                    data: { ...voucherFlow.data, senderPhone: message }
                });
            }

            setVoucherFlow({
                ...voucherFlow,
                step: 'message'
            });

            const messagePrompt: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Möchten Sie eine persönliche Nachricht für den Empfänger hinzufügen? 💌\n\n(Optional - schreiben Sie Ihre Nachricht oder 'nein')",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, messagePrompt]);
            return;
        }

        if (voucherFlow.step === 'message') {
            if (message.toLowerCase() !== 'nein' && message.toLowerCase() !== 'weiter') {
                setVoucherFlow({
                    ...voucherFlow,
                    data: { ...voucherFlow.data, message: message }
                });
            }

            setVoucherFlow({
                ...voucherFlow,
                step: 'confirm'
            });

            const confirmMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: `Perfekt! Hier ist Ihre Zusammenfassung:\n\n💰 **Betrag:** ${voucherFlow.data.amount}€\n👤 **Name:** ${voucherFlow.data.senderName}\n📧 **E-Mail:** ${voucherFlow.data.senderEmail}${voucherFlow.data.senderPhone ? '\n📱 **Telefon:** ' + voucherFlow.data.senderPhone : ''}${voucherFlow.data.message ? '\n💌 **Nachricht:** ' + voucherFlow.data.message : ''}\n\nSoll ich den Gutschein jetzt erstellen? (ja/nein)`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, confirmMessage]);
            return;
        }

        if (voucherFlow.step === 'confirm') {
            if (message.toLowerCase() === 'ja' || message.toLowerCase() === 'yes') {
                // Zeige Processing-Nachricht
                const processingMsg: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Einen Moment bitte, ich erstelle Ihren Gutschein... ⏳",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, processingMsg]);

                await handleVoucherDetails();
            } else {
                setVoucherFlow({
                    step: null,
                    data: {
                        amount: 0,
                        senderName: '',
                        senderEmail: '',
                        senderPhone: '',
                        message: ''
                    }
                });
                const cancelMessage: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Kein Problem! Der Vorgang wurde abgebrochen. Wie kann ich Ihnen sonst helfen? 😊",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, cancelMessage]);
            }
            return;
        }

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
            // Starte Gutschein-Flow
            setVoucherFlow({
                ...voucherFlow,
                step: 'amount',
                data: {
                    amount: 0,
                    senderName: '',
                    senderEmail: '',
                    senderPhone: '',
                    message: ''
                }
            });

            const voucherMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Toll, dass Sie einen Gutschein verschenken möchten! 🎁\n\n**Unsere Gutscheine:**\n• Gültig für alle Behandlungen\n• 12 Monate Gültigkeit\n• Als PDF per E-Mail\n• Sichere Zahlung per Überweisung\n\nBitte wählen Sie einen Betrag:",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, voucherMessage]);

        } else if (action === 'prices') {
            handleSend("Was sind die aktuellen Preise?");
        } else if (action === 'offers') {
            handleSend("Welche Angebote gibt es aktuell?");
        }
    };

    const handleVoucherAmount = (amount: number) => {
        setVoucherFlow({
            ...voucherFlow,
            step: 'name',
            data: { ...voucherFlow.data, amount }
        });

        const confirmMessage: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: `Super! Ein ${amount}€ Gutschein. 💝\n\nWie ist Ihr vollständiger Name?`,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, confirmMessage]);
    };

    const handleVoucherDetails = async () => {
        if (!voucherFlow.data.senderName || !voucherFlow.data.senderEmail) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Bitte füllen Sie Name und E-Mail aus. 📝",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
            return;
        }

        // Validiere Betrag
        if (voucherFlow.data.amount < 25) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "Der Mindestbetrag für einen Gutschein beträgt 25€. 💰",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
            return;
        }

        setIsProcessingVoucher(true);

        try {
            // Generiere Gutschein-Code
            const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const voucherCode = `SLX${randomNum}`;

            // API-Aufruf mit korrekten Feldnamen
            const response = await fetch('/api/vouchers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: voucherFlow.data.amount,
                    sender_name: voucherFlow.data.senderName,
                    sender_email: voucherFlow.data.senderEmail,
                    sender_phone: voucherFlow.data.senderPhone || null,
                    message: voucherFlow.data.message || null,
                    code: voucherCode,
                    delivery_method: 'email'
                })
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Voucher API error:', result);
                throw new Error(result.error || 'Fehler beim Erstellen des Gutscheins');
            }

            if (result.success) {
                setVoucherFlow({
                    ...voucherFlow,
                    step: 'complete',
                    data: {
                        ...voucherFlow.data,
                        code: result.voucher.code,
                        orderNumber: result.orderNumber
                    }
                });

                // Verwende Bankdaten aus Cache oder Fallback
                const bankInfo = bankDetails || {
                    bankName: 'Sparkasse Pongau',
                    accountHolder: 'Skinlux Bischofshofen',
                    iban: 'AT00 0000 0000 0000 0000',
                    bic: 'SPALAT2G'
                };

                const successMessage: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: `✨ Ihr Gutschein wurde erfolgreich erstellt!\n\n🎁 **Gutschein-Code:** ${result.voucher.code}\n📧 **Bestellnummer:** ${result.orderNumber}\n💰 **Betrag:** ${voucherFlow.data.amount}€\n\n**So geht es weiter:**\n\n1️⃣ **E-Mail-Bestätigung**\nSie erhalten in wenigen Minuten eine E-Mail mit allen Details.\n\n2️⃣ **Bezahlung**\nÜberweisen Sie den Betrag auf folgendes Konto:\n\n• **Bank:** ${bankInfo.bankName}\n• **Kontoinhaber:** ${bankInfo.accountHolder}\n• **IBAN:** ${bankInfo.iban}\n• **BIC:** ${bankInfo.bic}\n• **Verwendungszweck:** ${result.orderNumber}\n\n⚠️ **Wichtig:** Geben Sie unbedingt die Bestellnummer als Verwendungszweck an!\n\n3️⃣ **Gutschein-Versand**\nNach Zahlungseingang erhalten Sie:\n• Eine Zahlungsbestätigung per E-Mail\n• Den digitalen Gutschein als PDF\n• Optional: Ausdruckbaren Gutschein für Geschenke\n\n4️⃣ **Gültigkeit**\nDer Gutschein ist 12 Monate gültig und kann für alle unsere Behandlungen eingelöst werden.\n\n📱 **Status verfolgen**\nSie können jederzeit anrufen und mit Ihrer Bestellnummer den Status erfragen.\n\n❓ **Fragen?**\nRufen Sie uns gerne an: +43 660 57 21 403\n\nVielen Dank für Ihr Vertrauen! 💕`,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, successMessage]);

                // Reset Voucher Flow nach erfolgreicher Erstellung
                setTimeout(() => {
                    setVoucherFlow({
                        step: null,
                        data: {
                            amount: 0,
                            senderName: '',
                            senderEmail: '',
                            senderPhone: '',
                            message: ''
                        }
                    });
                }, 2000);
            }
        } catch (error) {
            console.error('Voucher creation error:', error);
            const errorMsg = error instanceof Error ? error.message : 'Unbekannter Fehler';
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: `Es gab einen Fehler beim Erstellen des Gutscheins: ${errorMsg}\n\nBitte versuchen Sie es erneut oder rufen Sie uns an: +43 660 57 21 403`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsProcessingVoucher(false);
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

                        {/* Voucher Amount Selection */}
                        {voucherFlow.step === 'amount' && (
                            <div className="px-4 pb-4">
                                <div className="grid grid-cols-2 gap-2">
                                    {[50, 100, 150, 200].map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => handleVoucherAmount(amount)}
                                            className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                        >
                                            {amount}€
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Oder geben Sie unten einen anderen Betrag ein (min. 25€)
                                </p>
                            </div>
                        )}



                        {/* Smart Actions */}
                        {!voucherFlow.step && messages.length > 0 && (
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

                        {/* Cancel Button during Voucher Flow */}
                        {voucherFlow.step && voucherFlow.step !== 'complete' && (
                            <div className="px-4 pb-2">
                                <button
                                    onClick={() => {
                                        setVoucherFlow({
                                            step: null,
                                            data: {
                                                amount: 0,
                                                senderName: '',
                                                senderEmail: '',
                                                senderPhone: '',
                                                message: ''
                                            }
                                        });
                                        const cancelMessage: Message = {
                                            id: Date.now().toString(),
                                            role: "assistant",
                                            content: "Der Gutschein-Vorgang wurde abgebrochen. Wie kann ich Ihnen sonst helfen? 😊",
                                            timestamp: new Date()
                                        };
                                        setMessages(prev => [...prev, cancelMessage]);
                                    }}
                                    className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors"
                                >
                                    ❌ Vorgang abbrechen
                                </button>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // Prüfe ob Gutschein-Betrag eingegeben wird
                                    if (voucherFlow.step === 'amount' && !isNaN(Number(inputValue))) {
                                        const customAmount = Number(inputValue);
                                        if (customAmount >= 25 && customAmount <= 500) {
                                            handleVoucherAmount(customAmount);
                                            setInputValue("");
                                            return;
                                        } else if (customAmount < 25) {
                                            const errorMsg: Message = {
                                                id: Date.now().toString(),
                                                role: "assistant",
                                                content: "Der Mindestbetrag für einen Gutschein beträgt 25€. Bitte wählen Sie einen höheren Betrag:",
                                                timestamp: new Date()
                                            };
                                            setMessages(prev => [...prev, errorMsg]);
                                            setInputValue("");
                                            return;
                                        } else if (customAmount > 500) {
                                            const errorMsg: Message = {
                                                id: Date.now().toString(),
                                                role: "assistant",
                                                content: "Der Maximalbetrag für einen Online-Gutschein beträgt 500€. Für höhere Beträge kontaktieren Sie uns bitte direkt.",
                                                timestamp: new Date()
                                            };
                                            setMessages(prev => [...prev, errorMsg]);
                                            setInputValue("");
                                            return;
                                        }
                                    }
                                    handleSend(inputValue);
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={
                                        voucherFlow.step === 'amount' ? "Betrag eingeben (25-500€)..." :
                                            voucherFlow.step === 'name' ? "Ihr vollständiger Name..." :
                                                voucherFlow.step === 'email' ? "Ihre E-Mail-Adresse..." :
                                                    voucherFlow.step === 'phone' ? "Telefonnummer oder 'nein'..." :
                                                        voucherFlow.step === 'message' ? "Ihre Nachricht oder 'nein'..." :
                                                            voucherFlow.step === 'confirm' ? "Ja oder Nein..." :
                                                                "Ihre Nachricht..."
                                    }
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                    disabled={isTyping || voucherFlow.step === 'complete'}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping || isProcessingVoucher}
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
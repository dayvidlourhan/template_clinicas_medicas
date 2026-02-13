import React, { useState } from 'react';
import { X, Star, MapPin, Send } from 'lucide-react';
import { clinicConfig, getWhatsAppLink } from '../config/clinic';

const ReviewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [rating, setRating] = useState(0);
    const [step, setStep] = useState('rating'); // 'rating', 'google', 'feedback', 'success'
    const [comment, setComment] = useState('');

    const reset = () => {
        setRating(0);
        setStep('rating');
        setComment('');
        onClose();
    };

    const handleRating = (value) => {
        setRating(value);
        if (value >= 4) {
            setStep('google');
        } else {
            setStep('feedback');
        }
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();

        // 🚀 SMART FEATURE: Send negative feedback to SAC WhatsApp instead of losing it
        const text = `⚠️ FEEDBACK DE MELHORIA (${rating} Estrelas):\n"${comment}"\n\nEnviado pelo site.`;
        window.open(getWhatsAppLink(text), '_blank');

        setStep('success');
        setTimeout(() => {
            reset();
        }, 5000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative">

                {/* Close Button */}
                <button
                    onClick={reset}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 text-center">

                    {/* STEP 1: RATING */}
                    {step === 'rating' && (
                        <>
                            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2 font-display">Como foi sua experiência?</h3>
                            <p className="text-gray-500 mb-8">Sua opinião é muito importante para nós.</p>

                            <div className="flex justify-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => handleRating(star)}
                                        onMouseEnter={() => setRating(star)}
                                        onMouseLeave={() => setRating(0)}
                                        className="text-gray-200 hover:text-yellow-400 hover:scale-110 transition-all duration-200 focus:outline-none"
                                    >
                                        <Star
                                            size={42}
                                            fill={rating >= star ? "#fbbf24" : "none"}
                                            className={rating >= star ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* STEP 2: GOOGLE (4-5 Stars) */}
                    {step === 'google' && (
                        <div className="animate-in slide-in-from-right duration-300">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star size={32} fill="currentColor" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2 font-display">Ficamos muito felizes!</h3>
                            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                                Poderia nos ajudar avaliando também no Google? Leva menos de 1 minuto.
                            </p>

                            <a
                                href={clinicConfig.googleMapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={reset}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold shadow-lg transition-all transform hover:scale-105"
                            >
                                <MapPin size={20} />
                                Publicar no Google
                            </a>
                        </div>
                    )}

                    {/* STEP 3: FEEDBACK (1-3 Stars) */}
                    {step === 'feedback' && (
                        <div className="animate-in slide-in-from-right duration-300">
                            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2 font-display">Poxa, sentimos muito.</h3>
                            <p className="text-gray-500 mb-6">
                                O que podemos fazer para melhorar sua experiência na próxima vez?
                            </p>

                            <form onSubmit={handleFeedbackSubmit}>
                                <textarea
                                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none bg-gray-50 text-gray-700 text-sm mb-6"
                                    rows="4"
                                    placeholder="Conte-nos o que houve..."
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all"
                                >
                                    <Send size={18} />
                                    Falar com a Gerência
                                </button>
                            </form>
                        </div>
                    )}

                    {/* STEP 4: SUCCESS */}
                    {step === 'success' && (
                        <div className="animate-in zoom-in duration-300 py-8">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Send size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2 font-display">Obrigado pelo feedback!</h3>
                            <p className="text-gray-500">
                                Abrimos um canal direto no WhatsApp para resolver sua situação.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ReviewModal;

import React, { useEffect, useState } from 'react';
import { ArrowUp, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;

            setScrollProgress(scroll);
            setIsVisible(totalScroll > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group"
                >
                    {/* Ring Container relative */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full shadow-lg shadow-blue-900/10 cursor-pointer transition-transform hover:scale-110 active:scale-95 border border-blue-50">

                        {/* SVG Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                            {/* Background Track */}
                            <circle
                                cx="50"
                                cy="50"
                                r="46"
                                fill="none"
                                stroke="#EFF6FF" // blue-50
                                strokeWidth="8"
                            />
                            {/* Progress Stroke */}
                            <circle
                                cx="50"
                                cy="50"
                                r="46"
                                fill="none"
                                stroke="#2563EB" // blue-600
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="290" // 2 * PI * 46
                                strokeDashoffset={290 - (290 * scrollProgress)}
                                className="transition-all duration-100 ease-out"
                            />
                        </svg>

                        {/* Icon */}
                        <div className="relative z-10 text-blue-600 group-hover:text-blue-700 transition-colors">
                            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                        </div>

                        {/* Tooltip on Desktop */}
                        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
                            Voltar ao topo
                        </span>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollProgress;

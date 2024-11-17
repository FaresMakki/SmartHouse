'use client'

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface RandomWord {
    word: string;
    randomColor: string;
    randomFontSize: string;
    randomPosition: {
        top: string;
        left: string;
    };
    key: number;
}

export function HeroSection() {
    const backgroundWords = ["Smart", "Connected", "Efficient", "Automated", "Secure", "Home", "Internet", "Things"];
    const [randomizedWords, setRandomizedWords] = useState<RandomWord[]>([]);

    const generateRandomProperties = useCallback(() => {
        return backgroundWords.map((word) => ({
            word,
            randomColor: Math.random() > 0.8 ? "#FF8343" : "#D1D5DB",
            randomFontSize: `${Math.random() * (3 - 1.5) + 1.5}rem`,
            randomPosition: {
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
            },
            key: Math.random(),
        }));
    }, []);

    useEffect(() => {
        setRandomizedWords(generateRandomProperties());

        const intervalId = setInterval(() => {
            setRandomizedWords(generateRandomProperties());
        }, 5000);

        return () => clearInterval(intervalId);
    }, [generateRandomProperties]);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <AnimatePresence>
                    {randomizedWords.map(({ word, randomColor, randomFontSize, randomPosition, key }) => (
                        <motion.div
                            key={key}
                            className="absolute flex"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={randomPosition}
                        >
                            {[...word].map((letter, letterIndex) => (
                                <motion.span
                                    key={letterIndex}
                                    className="font-bold opacity-20"
                                    style={{
                                        color: randomColor,
                                        fontSize: randomFontSize,
                                        marginRight: "0.1em",
                                    }}
                                    initial={{ opacity: 0.4, y: 10 }}
                                    animate={{
                                        opacity: 0.4,
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: letterIndex * 0.1,
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Control Your <span className="text-accentOrange">Smart Home</span> with Ease
                </motion.h1>
                <motion.p
                    className="text-xl mb-8 text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Manage all your smart devices from one intuitive app
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button
                        className="bg-accentOrange text-white rounded-full px-8 py-6 text-lg font-semibold hover:bg-orange-500 transition-colors duration-200"
                    >
                        Get Started
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

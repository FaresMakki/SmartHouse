"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { use } from "react";

interface EmailConfirmationProps {
    params: { activationCode: string; userId: string };
}

export default function EmailConfirmation({ params }: EmailConfirmationProps) {
    const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
    const [countdown, setCountdown] = useState(5);
    const router = useRouter();
    // @ts-ignore
    const { activationCode, userId } = use(params);

    useEffect(() => {
        const verifyEmail = async () => {
            if (!activationCode || !userId) {
                console.error("Activation code or User ID is missing!");
                setVerificationStatus("error");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/user/verify/${activationCode}/${userId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    setVerificationStatus("success");
                } else {
                    setVerificationStatus("error");
                }
            } catch (error) {
                console.error("Error verifying email:", error);
                setVerificationStatus("error");
            }
        };

        verifyEmail();
    }, [activationCode, userId]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (verificationStatus === "success") {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(timer);
                        router.push("/home");
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [verificationStatus, router]);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
        >
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Email Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    {verificationStatus === "loading" && (
                        <motion.div initial="hidden" animate="visible" variants={iconVariants}>
                            <Loader2 className="w-16 h-16 mx-auto text-orange-500 animate-spin" />
                            <p className="mt-4 text-lg">Verifying your email...</p>
                        </motion.div>
                    )}
                    {verificationStatus === "success" && (
                        <motion.div initial="hidden" animate="visible" variants={iconVariants}>
                            <CheckCircle className="w-16 h-16 mx-auto text-orange-500" />
                            <h2 className="mt-4 text-xl font-semibold text-black">
                                Email Verified Successfully!
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Thank you for verifying your email. You will be redirected to the home page in {countdown} seconds.
                            </p>
                        </motion.div>
                    )}
                    {verificationStatus === "error" && (
                        <motion.div initial="hidden" animate="visible" variants={iconVariants}>
                            <XCircle className="w-16 h-16 mx-auto text-red-500" />
                            <h2 className="mt-4 text-xl font-semibold text-red-700 dark:text-red-400">Verification Failed</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                We couldn't verify your email. The link may have expired or is invalid.
                            </p>
                        </motion.div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    {verificationStatus === "error" && (
                        <Button onClick={() => handleNavigation("/auth/resend-verification")} className="mt-4 bg-orange-500 hover:bg-orange-400">
                            Resend Verification Email
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                    {verificationStatus === "success" && (
                        <Button onClick={() => handleNavigation("/home")} className="mt-4 bg-orange-500 hover:bg-orange-400">
                            Go to Home Page Now
                            <ArrowRight className="ml-2 h-4 w-4 " />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
}
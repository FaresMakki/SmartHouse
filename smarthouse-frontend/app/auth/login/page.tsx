"use client";
import React, {useState} from 'react';
import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {useTransition} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import Link from "next/link";
import {Navbar} from "@/components/navbarBack";
import {Card} from "@/components/ui/card";
import {useRouter} from 'next/navigation';
import {Footer} from "@/components/general-footer";


const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {email: "", password: ""},
    });

    const [isPending, startTransition] = useTransition();


    // @ts-ignore
    const onLogin = (data) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            fetch('http://localhost:3001/user/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    e_mail: data.email,
                    Password: data.password
                }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setSuccess("Login successful!");
                        router.push("/home"); // Redirect to homepage
                    } else {
                        setError(result.message || "Login failed");
                    }
                })
                .catch(error => setError("Network error, please try again later."));
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3001/user/auth/google';
    };


    return (
        <div className="min-h-screen text-black flex flex-col">
            <Navbar/>
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-md">
                    <Card className="p-8 shadow-lg border-none bg-white">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                            <p className="text-gray-500">Login to your Homely account</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="JohnDoe@example.com"
                                                    type="email"
                                                    disabled={isPending}
                                                    className="bg-gray-400/10 border-none"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="*******"
                                                    type="password"
                                                    disabled={isPending}
                                                    className="bg-gray-400/10 border-none"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <Link href="/auth/forgot-password"
                                          className="text-sm font-semibold text-accentOrange hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormError message={error}/>
                                <FormSuccess message={success}/>
                                <Button
                                    type="submit"
                                    className="rounded-full w-full bg-orange-500 text-white hover:bg-accentOrange/90 transition duration-200"
                                    disabled={isPending}
                                >
                                    {isPending ? "Logging in..." : "Log in"}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-full w-full mt-4 text-black border-gray-300 hover:bg-gray-50"
                                onClick={handleGoogleLogin}
                            >
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab"
                                     data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 488 512">
                                    <path fill="currentColor"
                                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Continue with Google
                            </Button>
                        </div>
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/register" className="text-accentOrange hover:underline font-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </Card>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default LoginForm;

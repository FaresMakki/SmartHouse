"use client";

import React, { useState, useEffect } from 'react';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import { Navbar } from "@/components/navbarBack";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {RegisterSchema} from "@/schemas";
import {Footer} from "@/components/general-footer";

interface Country {
    name: string;
    code: string;
    isoCode: string;
    dialling_code: string;
}


export default function RegisterPage() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            country: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false
        },
    });

    useEffect(() => {
        fetch('/countries.json')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error loading countries:', error));
    }, []);

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            try {
                const response = await fetch("http://localhost:3001/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        FirstName: values.firstName,
                        LastName: values.lastName,
                        Region: values.country,
                        PhoneNum: (values.phoneNumber).replace(/ /g,''),
                        e_mail: values.email,
                        Password: values.password,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                setSuccess(data.success || "Account created successfully!");
            } catch (error: any) {
                setError(error.message || "Failed to create account. Please try again.");
            }
        });
    };


    const handleGoogleRegister = () => {
        console.log('Google registration attempted');
    };

    const handleCountryChange = (value: string) => {
        const country = countries.find(c => c.code === value);
        setSelectedCountry(country || null);
        form.setValue('country', country ? country.name : '');
        form.setValue('phoneNumber', country ? country.dialling_code : '');
    };

    return (
        <div className="min-h-screen text-black flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-4 mt-10">
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-md">
                    <Card className="p-8 shadow-lg border-none bg-white">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                            <p className="text-gray-500">Register for your Homely account</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="John"
                                                        className="bg-gray-400/10 border-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Doe"
                                                        className="bg-gray-400/10 border-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="johndoe@example.com"
                                                    type="email"
                                                    className="bg-gray-400/10 border-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <Select onValueChange={handleCountryChange}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-gray-400/10 border-none">
                                                        <SelectValue placeholder="Select a country" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem key={`${country.code}-${country.isoCode}-${country.name}`} value={country.code}>
                                                                <div className="flex items-center">
                                                                    <span className="mr-2">{country.code}</span>
                                                                    {country.name}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>

                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Controller
                                                    name="phoneNumber"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            placeholder={selectedCountry ? `${selectedCountry.dialling_code} ` : "+1234567890"}
                                                            type="tel"
                                                            className="bg-gray-400/10 border-none"
                                                            value={field.value}
                                                            onChange={(e) => {
                                                                const diallingCode = selectedCountry?.dialling_code || '';
                                                                if (e.target.value.startsWith(diallingCode)) {
                                                                    field.onChange(e.target.value);
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                    placeholder="********"
                                                    type="password"
                                                    className="bg-gray-400/10 border-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="********"
                                                    type="password"
                                                    className="bg-gray-400/10 border-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="agreeToTerms"
                                    render={({field}) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className={"mt-[2px] ml-0.5"}
                                                />
                                            </FormControl>
                                            <div className="leading-none">
                                                <FormLabel>
                                                    I agree to the{' '}
                                                    <Link href="/terms" className="text-orange-500 font-semibold hover:underline">
                                                        terms of service
                                                    </Link>
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <Button
                                    type="submit"
                                    className="w-full bg-orange-500 rounded-full text-white hover:bg-orange-400 transition duration-200"
                                    disabled={isPending}
                                >
                                    {isPending ? "Creating Account..." : "Create Account"}
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
                                className="w-full rounded-full mt-4 text-black border-gray-300 hover:bg-gray-50"
                                onClick={handleGoogleRegister}
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
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-accentOrange hover:underline font-semibold">
                                Log in
                            </Link>
                        </p>
                    </Card>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
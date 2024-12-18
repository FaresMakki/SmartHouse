'use client'

// Import avatar placeholder

import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card"
import {Star} from 'lucide-react'
import {motion} from "framer-motion"

const reviews = [


    {
        name: "Sarah Lee",
        rating: 4,
        comment: "The app is great for managing all my smart devices. The interface is clean, user-friendly, and easy to navigate.",
        avatar: "/people/sarah.png"
    },
    {
        name: "Alex Johnson",
        rating: 5,
        comment: "Homely has completely changed how I interact with my smart home. From managing devices to creating schedules, everything is so straightforward. The app feels like a personal assistant, always reliable and intuitive. I can’t imagine going back to the old way of doing things!",
        avatar: "/people/alex.png"
    },

    {
        name: "Michael Brown",
        rating: 5,
        comment: "Homely seamlessly integrates all my devices, making my life so much easier. It's truly a game-changer!",
        avatar: "/people/michal.png"
    },
    {
        name: "Emily Davis",
        rating: 4,
        comment: "Adding new devices is so quick and simple with Homely. The app provides clear instructions at every step, ensuring that even less tech-savvy users can get their devices up and running in no time. I love how it automatically detects devices in the network—it’s a huge time-saver.",
        avatar: "/people/emily.png"
    },
    {
        name: "David Wilson",
        rating: 5,
        comment: "The energy management feature is fantastic—it’s helped me cut down on electricity costs significantly. The app tracks my energy usage in real-time and provides insights that are easy to understand. I’ve even been able to set up alerts for high usage periods, which has been super helpful in reducing waste.",
        avatar: "/people/david.png"
    },
    {
        name: "Sophia Martinez",
        rating: 4,
        comment: "The customer support team is very responsive and helpful. They made setting up my devices so much easier.",
        avatar: "/people/sophia.png"
    },
    {
        name: "James Taylor",
        rating: 5,
        comment: "The device compatibility is outstanding. Every gadget I’ve tried works flawlessly with Homely.",
        avatar: "/people/james.png"
    },
    {
        name: "Olivia Carter",
        rating: 5,
        comment: "Homely has made my smart home setup effortless. I especially appreciate the advanced customization options, like being able to schedule tasks based on specific triggers, such as time or motion detection. It’s clear that a lot of thought has gone into making this app user-friendly yet feature-rich.",
        avatar: "/people/olivia.png"
    },

]


export function CustomerReviews() {
    // Distribute reviews into 3 columns
    const columns = [
        reviews.slice(0, 3),
        reviews.slice(3, 5),
        reviews.slice(5)
    ]

    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col space-y-6">
                        {column.map((review, reviewIndex) => (
                            <motion.div
                                key={reviewIndex}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: (columnIndex * column.length + reviewIndex) * 0.1}}
                            >
                                <Card className="h-full">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex items-center mb-4">
                                            <Image
                                                src={review.avatar}
                                                alt={`${review.name}'s avatar`}
                                                className="rounded-full mr-4"
                                                width="50"
                                                height={"50"}
                                            />
                                            <div>
                                                <h3 className="font-semibold">{review.name}</h3>
                                                <div className="flex"
                                                     aria-label={`Rating: ${review.rating} out of 5 stars`}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${
                                                                i < review.rating ? "text-accentOrange fill-accentOrange" : "text-gray-300"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 flex-grow">{review.comment}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
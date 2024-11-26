'use client'

// Import avatar placeholder

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { motion } from "framer-motion"

const reviews = [
    {
        name: "Alex Johnson",
        rating: 5,
        comment: "Homely has transformed the way I interact with my smart home. Homely has transformed the way I interact with my smart home. It's intuitive and powerful! Homely has transformed the way I interact with my smart home. It's intuitive and powerful!",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "Sarah Lee",
        rating: 4,
        comment: "Great app for managing all my smart devices. The interface is clean and user-friendly. Great app for managing all my smart devices. The interface is clean and user-friendly.",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "Michael Brown",
        rating: 5,
        comment: "I love how Homely integrates all my devices seamlessly. It's a game-changer!",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "Emily Davis",
        rating: 4,
        comment: "Homely makes it so easy to create and manage routines. My home feels truly smart now.",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "David Wilson",
        rating: 5,
        comment: "The energy management features have helped me reduce my electricity bills significantly. The energy management features have helped me reduce my electricity bills significantly.",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "Sophia Martinez",
        rating: 4,
        comment: "I appreciate how responsive the customer support team is. They've been very helpful.",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "Sophia Martinez",
        rating: 4,
        comment: "I appreciate how responsive the customer support team is. They've been very helpful.",
        avatar: "/avatarPlaceholder.png"
    },
    {
        name: "James Taylor",
        rating: 5,
        comment: "The voice control integration is flawless. It feels like I'm living in the future! The voice control integration is flawless. It feels like I'm living in the future! The voice control integration is flawless. It feels like I'm living in the future!",
        avatar: "/avatarPlaceholder.png"
    }
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (columnIndex * column.length + reviewIndex) * 0.1 }}
                            >
                                <Card className="h-full">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex items-center mb-4">
                                            <Image
                                                src={review.avatar}
                                                alt={`${review.name}'s avatar`}
                                                className="rounded-full mr-4"
                                                width="30"
                                                height={"30"}
                                            />
                                            <div>
                                                <h3 className="font-semibold">{review.name}</h3>
                                                <div className="flex" aria-label={`Rating: ${review.rating} out of 5 stars`}>
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
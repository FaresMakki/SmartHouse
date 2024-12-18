import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const features = [
    {
        title: "Smart Lighting",
        description: "Control your home's ambiance from anywhere",
        image: "/full.jpeg",
        height: 200,
        width: 200,
        size: "col-span-1 row-span-1",
    },
    {
        title: "Climate Control",
        description: "Optimize your home's temperature for comfort and efficiency",
        image: "/climateControl.jpg",
        height: 200,
        width: 400,
        size: "col-span-2 row-span-1",
    },
    {
        title: "Security",
        description: "Keep your home safe with smart locks and cameras",
        image: "/Security.jpg",
        height: 400,
        width: 200,
        size: "col-span-2 row-span-2",
    },
    {
        title: "Energy Management",
        description: "Monitor and reduce your energy consumption",
        image: "/power.jpeg",
        height: 200,
        width: 200,
        size: "col-span-1 row-span-2",
    },

]

export function FeatureSection() {
    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Smart Home Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className={`overflow-hidden ${feature.size}`}>
                        <CardContent className="p-0 h-full relative">
                            <div className="relative w-full h-full">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    width={feature.width}
                                    height={feature.height}
                                    layout="responsive"
                                    objectFit="fill"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90">
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
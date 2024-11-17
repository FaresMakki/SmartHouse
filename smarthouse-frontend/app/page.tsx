import * as React from "react"
import {HeroSection} from "@/components/HeroSection";
import {FeatureSection} from "@/components/Features";
import {CustomerReviews} from "@/components/Reviews";
import {Footer} from "@/components/Footer";
import {Navbar} from "@/components/navbarLandingPage";


export default function LandingPage() {
    return (
        <div className="min-h-screen text-black">
            <Navbar />
            <HeroSection/>
            <FeatureSection/>
            <CustomerReviews/>
            <Footer/>
        </div>
    )
}


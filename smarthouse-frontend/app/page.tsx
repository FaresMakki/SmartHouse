import * as React from "react"
import {HeroSection} from "@/components/hero-section";
import {FeatureSection} from "@/components/features";
import {CustomerReviews} from "@/components/reviews";
import {Footer} from "@/components/footer";
import {Navbar} from "@/components/navbar-landing-page";


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


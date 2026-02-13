import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Specialties from '../components/Specialties';
import InstallmentSimulator from '../components/InstallmentSimulator';
import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

// Smart Features
import Insurances from '../components/Insurances';
import FastCheckin from '../components/FastCheckin';
import ScrollProgress from '../components/ScrollProgress';

function LandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans antialiased text-gray-900 overflow-x-hidden pb-24 lg:pb-0">
            <Header />
            <main>
                <Hero />

                {/* Section 2: About Us */}
                <AboutUs />

                {/* Section 3: Specialties */}
                <Specialties />

                {/* Feature 2: Treatment Installment Simulator */}
                <InstallmentSimulator />

                {/* Section 4: Our Doctors (Feature 1: Stories) */}
                <Doctors />

                {/* Section 5: Insurances (Smart Feature 4) */}
                <Insurances />

                {/* Section 6: Testimonials (Smart Feature 3) */}
                <Testimonials />

                {/* Section 7: Fast Check-in (Smart Feature 2) */}
                <FastCheckin />
            </main>

            {/* Section 6: Footer */}
            <Footer />

            <ScrollProgress />
        </div>
    );
}

export default LandingPage;

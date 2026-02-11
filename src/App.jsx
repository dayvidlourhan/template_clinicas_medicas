import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Specialties from './components/Specialties';
import Doctors from './components/Doctors';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900 overflow-x-hidden pb-24 lg:pb-0">
      <Header />
      <main>
        <Hero />

        {/* Section 2: About Us */}
        <AboutUs />

        {/* Section 3: Specialties */}
        <Specialties />

        {/* Section 4: Our Doctors */}
        <Doctors />

        {/* Section 5: Testimonials */}
        <Testimonials />
      </main>

      {/* Section 6: Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyCTA />
    </div>
  );
}

export default App;

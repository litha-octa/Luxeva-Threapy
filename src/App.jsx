import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Services from './components/Services/Services';
import Booking from './components/Booking/Booking';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Services />
      <Booking />
      <Testimonials />
      <Footer />
    </>
  );
}

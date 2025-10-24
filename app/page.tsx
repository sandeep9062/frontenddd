import Hero from "./components/home/Hero";
import Features from "./components/home/Features";

import Testimonials from "./components/home/Testimonials";

import PopupFormModal from "./components/PopupFormModal";
import WhyIndia from "./components/home/WhyIndia";
import Specialist from "./components/home/ConsultDentistOnline";
import FindTopDental from "./components/home/FindTopDental";
import BookAnAppointment from "./components/home/BookAnAppointment";
import Newsletter from "./components/NewsLetter";
import ExploreDentalEssential from "./components/home/ExploreDentalEssential";

export default function Home() {
  return (
    <>
      <section>
        <Hero />

        <WhyIndia />

        <Features />

        <Specialist />

        <FindTopDental />

        <BookAnAppointment />
        <ExploreDentalEssential />

        <Testimonials />
        <Newsletter />

        {/* <PopupFormModal /> */}
      </section>
    </>
  );
}

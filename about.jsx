import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <section className="min-h-screen py-12 bg-gray-50 flex flex-col lg:flex-row items-center justify-center">
      {/* Image Section */}
      <div
        className="lg:w-1/2 w-full px-6 lg:px-12 mb-10 lg:mb-0"
        data-aos="fade-right"
      >
        <img
          src="/hands.avif"
          alt="Mother holding a phone"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div
        className="lg:w-1/2 w-full px-6 lg:px-12 flex flex-col justify-center"
        data-aos="fade-left"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
          About Us
        </h2>
        <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-700">
          Empowering Lives
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We are committed to empowering individuals and communities by
          providing essential resources and support. Our mission is to uplift
          and create lasting change through education, healthcare, and welfare
          programs.
        </p>
        <p className="italic text-gray-500">Image from Freepik</p>

        {/* Contact Button */}
        <div className="mt-6" data-aos="zoom-in">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none">
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="w-full mt-12 lg:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full px-6 lg:px-12">
          {/* Call Us */}
          <div
            className="bg-orange-500 text-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-up"
          >
            <h4 className="font-semibold text-lg">CALL US</h4>
            <p className="mt-2">1 (234) 567-891</p>
            <p>1 (234) 987-654</p>
          </div>

          {/* Location */}
          <div
            className="bg-orange-500 text-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h4 className="font-semibold text-lg">LOCATION</h4>
            <p className="mt-2">121 Rock Street</p>
            <p>21 Avenue, New York, NY 92103-9000</p>
          </div>

          {/* Hours */}
          <div
            className="bg-orange-500 text-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h4 className="font-semibold text-lg">HOURS</h4>
            <p className="mt-2">Mon - Fri: 11 am - 8 pm</p>
            <p>Sat, Sun: 6 am - 8 pm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

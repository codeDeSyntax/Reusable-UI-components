import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import { CalendarIcon, MapPinIcon, UserGroupIcon } from "react-icons";
import { FaCalendar, FaMapPin } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const eventsData = [
  {
    id: 1,
    title: "Community Clean-Up Day",
    date: "September 20, 2024",
    venue: "City Park",
    sponsors: ["Local Business 1", "Local Business 2"],
    description:
      "Join us for a day of cleaning and beautifying our local park.",
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Charity Run for Health",
    date: "October 15, 2024",
    venue: "Downtown Square",
    sponsors: ["Health Co.", "Fitness Center"],
    description:
      "Participate in our charity run to promote health and wellness.",
    color: "bg-green-100",
  },
  {
    id: 3,
    title: "Food Drive",
    date: "November 10, 2024",
    venue: "Community Center",
    sponsors: ["Food Bank", "Local Grocery Store"],
    description: "Help us collect food donations for those in need.",
    color: "bg-yellow-100",
  },
];

const Events = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
          data-aos="fade-down"
        >
          Upcoming <span className="text-indigo-600">Events</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className={`${event.color} rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105`}
              data-aos="fade-up"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaCalendar className="h-5 w-5 mr-2" />
                  <p>{event.date}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapPin className="h-5 w-5 mr-2" />
                  <p>{event.venue}</p>
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                   <FaUserGroup className="h-5 w-5 mr-2" />
                    Sponsors:
                  </h3>
                  <ul className="list-disc pl-5">
                    {event.sponsors.map((sponsor, index) => (
                      <li key={index} className="text-gray-600">
                        {sponsor}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Register
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Donate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

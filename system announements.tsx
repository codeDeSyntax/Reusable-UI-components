import React from 'react';
import { Calendar, Clock, ArrowUpRight, Pin, Bell } from 'lucide-react';

// Types for our announcements
type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
  time: string;
  isPinned: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
};

const AnnouncementsPage = () => {
  // Sample announcements data
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "New Feature Release: Advanced Analytics Dashboard",
      content: "We're excited to announce the launch of our new analytics dashboard with improved visualization capabilities and real-time data processing.",
      date: "2024-03-24",
      time: "09:00 AM",
      isPinned: true,
      category: "Product Update",
      priority: "high"
    },
    {
      id: 2,
      title: "System Maintenance Schedule",
      content: "Scheduled maintenance will be performed on March 25th from 2 AM to 4 AM UTC. During this time, some services may be temporarily unavailable.",
      date: "2024-03-23",
      time: "03:30 PM",
      isPinned: true,
      category: "Maintenance",
      priority: "medium"
    },
    // Add more announcements as needed
  ];

  return (
    <div className="min-h-screen bg-dbackground p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8 space-y-4" data-aos="fade-down">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dtext">
            Announcements
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Stay updated with the latest news, updates, and important information about our system and services.
        </p>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative bg-daccent rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
          >
            {/* Priority Indicator */}
            <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
              announcement.priority === 'high' ? 'bg-red-500' :
              announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />

            {/* Pinned Indicator */}
            {announcement.isPinned && (
              <Pin className="absolute top-4 right-8 w-4 h-4 text-primary" />
            )}

            {/* Category Tag */}
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              {announcement.category}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-dtext mb-3 pr-8">
              {announcement.title}
            </h2>

            {/* Content */}
            <p className="text-gray-400 mb-6 line-clamp-3">
              {announcement.content}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(announcement.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {announcement.time}
                </div>
              </div>
              
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary hover:text-primary/80">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {announcements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center" data-aos="fade-up">
          <Bell className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-dtext mb-2">No Announcements Yet</h3>
          <p className="text-gray-400">Check back later for updates and announcements.</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;

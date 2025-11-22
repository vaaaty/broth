//GEMINI


import React from 'react';
import './LocalEventsCalendar.css';

/**
 * LocalEventsCalendar component (Full Page)
 * Promotes local farmers markets and community events.
 */
const LocalEventsCalendar = () => {
  const events = [
    {
      name: "Saturday Farmers Market",
      date: "Every Saturday 8AM-2PM",
      location: "City Center Square (1.5 km away)",
      vendors: 25,
      features: ["Fresh organic produce", "Live music", "Artisan food trucks", "Kids play area"],
      link: "#"
    },
    {
      name: "Local Craft Fair",
      date: "2nd Sunday of the Month, 10AM-4PM",
      location: "Community Hall",
      vendors: 40,
      features: ["Handmade jewelry", "Ceramics", "Local art", "Coffee stand"],
      link: "#"
    },
    {
      name: "Seasonal Produce Workshop",
      date: "Next Tuesday, 6PM-7:30PM",
      location: "Community Kitchen (Online Registration Required)",
      vendors: 1, // workshop
      features: ["Cooking demonstration", "Free recipe cards", "Tasting session"],
      link: "#"
    }
  ];

  return (
    <div className="local-events-page">
      <div className="page-header">
        <h1>🗓️ Local Events & Markets</h1>
        <p>Discover vibrant community gatherings and support local producers directly.</p>
      </div>

      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-header">
              <h2>{event.name}</h2>
              <span className="event-type">{event.vendors > 5 ? 'Market' : 'Workshop'}</span>
            </div>
            <p className="event-detail">📅 <strong>Date:</strong> {event.date}</p>
            <p className="event-detail">📍 <strong>Location:</strong> {event.location}</p>
            <p className="event-detail">🛍️ <strong>Vendors:</strong> {event.vendors} local businesses</p>
            <div className="event-features-section">
              <strong>Highlights:</strong>
              <div className="feature-tags">
                {event.features.map((feature, i) => (
                  <span key={i} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>
            <button className="view-details-btn">View Details / RSVP</button>
          </div>
        ))}
      </div>

      <div className="submit-event-section">
        <h3>Have an event to list?</h3>
        <p>If you're a local organizer, you can submit your event for promotion here.</p>
        <button className="submit-btn">Submit Event</button>
      </div>
    </div>
  );
};

export default LocalEventsCalendar;


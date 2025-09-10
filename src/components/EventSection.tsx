const events = [
  {
    title: "Open Mic Night 🎤",
    date: "September 5, 2025",
    time: "8:00 PM",
    location: "McEwen Hall",
    description: "Show off your talent or support your friends at this chill campus night.",
  },
  {
    title: "Club Fair 🌟",
    date: "September 7, 2025",
    time: "4:00 PM",
    location: "Medallion Plaza",
    description: "Meet every club on campus and sign up for the ones you vibe with.",
  },
  {
    title: "Sunset Yoga 🧘‍♀️",
    date: "September 10, 2025",
    time: "6:30 PM",
    location: "Lake Mary Nell",
    description: "Join us for a relaxing yoga session as the sun goes down.",
  },
];

export default function EventSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-700 mb-1">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Time:</strong> {event.time}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-600 mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
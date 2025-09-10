const clubs = [
  {
    name: "Outdoor Adventures 🥾",
    description: "Join fellow nature lovers for hikes, camping trips, and rock climbing.",
  },
  {
    name: "Elon Film Society 🎬",
    description: "Watch, discuss, and even create films with fellow movie buffs.",
  },
  {
    name: "Coding Club 👩‍💻",
    description: "Build cool projects, learn new skills, and meet other devs on campus.",
  },
];

export default function ClubsSection() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Clubs</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
            <p className="text-gray-700">{club.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
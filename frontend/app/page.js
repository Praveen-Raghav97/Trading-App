// pages/index.js
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

const mockEvents = [
  { id: 1, name: 'Match 1', date: '2025-03-15', odds: '1.5' },
  { id: 2, name: 'Match 2', date: '2025-03-16', odds: '2.0' },
  { id: 3, name: 'Match 3', date: '2025-03-17', odds: '1.8' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

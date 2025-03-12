"use client"

// components/EventCard.js
import { motion } from 'framer-motion';
import { useState } from 'react';

const EventCard = ({ event }) => {
  const [showModal, setShowModal] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');

  const handleTradeSubmit = async () => {
    if (!tradeAmount) return alert('Please enter a trade amount');
    setLoading(true);
    try {
      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, amount: tradeAmount })
      });
      if (!response.ok) throw new Error('Failed to place trade');
      alert('Trade placed successfully!');
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <motion.div 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
      className="border p-8 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition duration-300 ease-in-out flex flex-col justify-between hover:border-indigo-500 relative overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 1 }} 
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-0 right-0 w-24 h-24 bg-indigo-500 opacity-20 rounded-full blur-3xl"
      ></motion.div>
      <div>
        <h2 className="text-3xl text-black font-semibold mb-2">{event.name}</h2>
        <p className="text-gray-600 text-lg">Date: {event.date}</p>
        <p className="text-indigo-600 font-medium text-xl">Odds: {event.odds}</p>
      </div>
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
      >
        Place Trade
      </motion.button>
    </motion.div>

    {showModal && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-zinc-100 bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-md"
      >
        <motion.div 
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="bg-white rounded-2xl p-12 w-full max-w-lg shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-6 text-indigo-600">Place Your Trade</h2>
          <p className="text-xl text-black mb-3">Event: {event.name}</p>
          <p className="text-xl text-black mb-5">Odds: {event.odds}</p>
          <label className="block mb-3 text-black font-medium text-lg">Trade Amount</label>
          <input 
            type="number" 
            value={tradeAmount} 
            onChange={(e) => setTradeAmount(e.target.value)}
            placeholder="Enter amount" 
            className="w-full text-black p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
          />
          <div className="flex justify-end space-x-4 mt-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-lg"
            >
              Cancel
            </motion.button>
            <motion.button 
            onClick={handleTradeSubmit}
                disabled={loading}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-lg"
            >
              Confirm Trade
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </>
  );
};

export default EventCard;

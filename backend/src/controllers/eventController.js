// controllers/eventController.js

import Event from "../models/Event.js";


 const getLiveEvents = async (req, res) => {
  try {
    const liveEvents = await Event.find({ status: 'live' });
    res.status(200).json(liveEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 export default  getLiveEvents ;
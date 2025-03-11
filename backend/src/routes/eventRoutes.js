import express from 'express';
import getLiveEvents from '../controllers/eventController.js';


const router = express.Router();

router.get('/live', getLiveEvents);

export default  router;

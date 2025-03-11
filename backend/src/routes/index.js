import { Router } from 'express';
import IndexController from '../controllers';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app) {
    app.get('/', indexController.getIndex.bind(indexController));
}

export default router;
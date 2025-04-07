import { Router } from 'express';
import ContactController from './app/controllers/ContactController';
import CategorieController from './app/controllers/CategorieController';

const router = Router();

// root
router.get('/', (request, response) => response.send('Hello world'));

// contacts
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

// categories
router.get('/categories', CategorieController.index);
router.get('/categories/:id', CategorieController.show);
router.delete('/categories/:id', CategorieController.delete);
router.post('/categories', CategorieController.store);
router.put('/categories/:id', CategorieController.update);

export default router;

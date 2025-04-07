import { Request, Response } from 'express';
import CategoriesRepository from '../repositories/CategoriesRepository';
import { IOderBy } from '../../@types/IDatabase';
import { ICategory } from '../../@types/ICategory';

class CategorieController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.query as Record<'orderBy', IOderBy>;

    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const categorie = await CategoriesRepository.findById(id);
    if (!categorie) {
      return response.status(404).json({ error: 'Categorie not found' });
    }

    response.json(categorie);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body as Pick<ICategory, 'name'>;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categorieByName = await CategoriesRepository.findByName(name);

    if (categorieByName) {
      return response.status(400).json({ error: 'This name already exists' });
    }

    const contact = await CategoriesRepository.create({
      name,
    });

    response.json(contact);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body as Pick<ICategory, 'name'> as Pick<ICategory, 'name'>;

    const categorieExists = await CategoriesRepository.findById(id);

    if (!categorieExists) {
      return response.status(404).json({ error: 'Categorie not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categorieByName = await CategoriesRepository.findByName(name);

    if (categorieByName) {
      return response.status(400).json({ error: 'This name already exists' });
    }

    const contact = await CategoriesRepository.update(id, {
      name,
    });

    response.json(contact);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const categorieExists = await CategoriesRepository.findById(id);

    if (!categorieExists) {
      return response.status(404).json({ error: 'Categorie not found' });
    }

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new CategorieController();

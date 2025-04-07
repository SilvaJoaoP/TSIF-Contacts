import { Request, Response } from 'express';
import ContactsRepository from '../repositories/ContactsRepository';
import { IContactParams } from '../../@types/IDatabase';
import { IContact } from '../../@types/IContact';

class ContactController {
  async index(request: Request, response: Response) {
    const params = request.query as unknown as IContactParams;

    const contacts = await ContactsRepository.findAll(params);

    response.json(contacts);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request: Request, response: Response) {
    const { name, email, phone, category_id } = request.body as Omit<IContact, 'id'>;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);

      if (contactByEmail) {
        return response.status(400).json({ error: 'This e-mail already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body as Omit<IContact, 'id'>;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);

      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail already in use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new ContactController();

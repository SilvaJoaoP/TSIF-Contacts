import { IContact } from '../../@types/IContact';
import { IContactParams } from '../../@types/IDatabase';
import db from '../../database';

class ContactsRepository {
  async findAll({ name, orderBy }: IContactParams) {
    const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.name ILIKE CONCAT('%', $1::text, '%')
      ORDER BY contacts.name ${direction}
    `,
      [name],
    );

    return rows;
  }

  async findById(id: string) {
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1`,
      [id],
    );
    return row;
  }

  async findByEmail(email: string) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async create({ name, email, phone, category_id }: Omit<IContact, 'id'>) {
    const categoryIdValue = category_id || null;
    
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, phone, categoryIdValue],
    );

    return row;
  }

  async update(id: string, { name, email, phone, category_id }: Omit<IContact, 'id'>) {
    const [row] = await db.query(
      `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `,
      [name, email, phone, category_id, id],
    );

    return row;
  }

  async delete(id: string) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new ContactsRepository();

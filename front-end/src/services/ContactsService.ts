import { IContact } from "../@types/Contact";
import api from "../configs/api";

type orderBy = "ASC" | "DESC";

interface IGetContactsParams {
  name?: string;
  orderBy?: orderBy;
}

interface IContactParams {
  name: string;
  email: string;
  phone: string;
  category_id?: string;
}

class ContactsService {
  async getContacts(params: IGetContactsParams) {
    const response = await api.get<IContact[]>("/contacts", { params });
    return response.data;
  }

  async createContact(data: IContactParams) {
    const response = await api.post<IContact>("/contacts", data);
    return response.data;
  }

  async getContactById(id: string) {
    const response = await api.get<IContact>(`/contacts/${id}`);
    return response.data;
  }

  async updateContact(id: string, data: IContactParams) {
    const response = await api.put<IContact>(`/contacts/${id}`, data);
    return response.data;
  }
  async deleteContact(id: string) {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  }
}

export default new ContactsService();

export type { orderBy, IContactParams };

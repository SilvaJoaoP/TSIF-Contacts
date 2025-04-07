import { IContact } from "../../@types/Contact";

interface IContactCardProps {
  data: IContact;
  onDelete: (contact: IContact) => void;
}

export type { IContactCardProps };

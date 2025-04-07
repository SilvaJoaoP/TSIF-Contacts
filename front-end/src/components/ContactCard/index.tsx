import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import trash from "../../assets/icons/trash.svg";
import edit from "../../assets/icons/edit.svg";
import { IContactCardProps } from "./types";

export default function ContactCard({ data, onDelete }: IContactCardProps) {
  const navigate = useNavigate();
  
  const handleDelete = () => {
    onDelete(data);
  };
  
  const handleEdit = () => {
    navigate(`/contacts/edit/${data.id}`);
  };

  return (
    <div className={styles.contatcsCard}>
      <div>
        <div>
          <strong>{data.name}</strong>{" "}
          {data.category_name && <small>{data.category_name}</small>}
        </div>
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.phone}</span>}
      </div>
      <div>
        <img 
          src={edit} 
          alt="Editar" 
          onClick={handleEdit}
          style={{ cursor: 'pointer' }}
        />
        <img 
          src={trash} 
          alt="Excluir" 
          onClick={handleDelete}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

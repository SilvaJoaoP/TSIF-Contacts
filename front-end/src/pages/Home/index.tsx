import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import ContactCard from "../../components/ContactCard";
import { ContactsService } from "../../services";
import { IContact } from "../../@types/Contact";
import { Button, Input, Loader } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { orderBy } from "../../services/ContactsService";
import { useDebounceCallBack } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<orderBy>("ASC");

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contacts = await ContactsService.getContacts({
        name: search,
        orderBy,
      });
      setContacts(contacts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [search, orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleChangeSearch = useDebounceCallBack(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }
  );

  function handleToggleOrderBy() {
    setOrderBy((orderBy) => (orderBy === "ASC" ? "DESC" : "ASC"));
  }

  async function handleDeleteContact(contact: IContact) {
    if (
      !confirm(`Tem certeza que deseja excluir o contato "${contact.name}"?`)
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await ContactsService.deleteContact(contact.id);

      // Atualiza a lista removendo o contato excluído
      setContacts((prevContacts) =>
        prevContacts.filter((c) => c.id !== contact.id)
      );

      alert("Contato excluído com sucesso!");
    } catch (error: any) {
      console.error("Erro ao excluir contato:", error);

      if (error.response) {
        alert(
          `Erro ao excluir contato: ${
            error.response.data.error || "Erro desconhecido"
          }`
        );
      } else if (error.request) {
        alert("Erro de conexão com o servidor");
      } else {
        alert(`Erro ao excluir contato: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <section className={styles.contactsList}>
        <header>
          <Input
            placeholder="Buscar contato..."
            onChange={handleChangeSearch}
          />
          {search && (
            <p>
              Resultados encontrados para <strong>"{search}"</strong>.
            </p>
          )}
          <div>
            <button onClick={handleToggleOrderBy}>
              <strong>Nome</strong>
              <img data-order-by={orderBy} src={arrow} alt="Ordenar" />
            </button>
            <Button onClick={() => navigate("/contacts/create")}>
              Novo Contato
            </Button>
          </div>
        </header>
        {!contacts.length && (
          <p className={styles.emptyContacts}>Nenhum contato encontrado.</p>
        )}
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            data={contact}
            onDelete={handleDeleteContact}
          />
        ))}
      </section>
    </>
  );
}

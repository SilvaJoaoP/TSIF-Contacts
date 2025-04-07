import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Input, Loader } from "../../components";
import { ContactsService } from "../../services";
import { ICategory } from "../../@types/Category";
import { CategoriesService } from "../../services";
import { useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  category_id: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function CreateContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    category_id: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await CategoriesService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "É necessário informar o nome do contato!";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "É necessário informar o número do contato!";
      isValid = false;
    }

    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = "O e-mail informado é inválido!";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const contactData = {
        ...formData,
        category_id: formData.category_id || undefined,
      };

      console.log("Enviando dados:", contactData);

      const result = await ContactsService.createContact(contactData);
      console.log("Resultado da criação:", result);

      navigate("/");
    } catch (error: any) {
      console.error("Erro detalhado:", error);

      if (error.response) {
        // O servidor respondeu com um status de erro
        console.error("Dados do erro:", error.response.data);
        console.error("Status do erro:", error.response.status);
        alert(
          `Erro ao criar contato: ${
            error.response.data.error || "Erro desconhecido"
          }`
        );
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error("Sem resposta do servidor:", error.request);
        alert("Erro de conexão com o servidor");
      } else {
        // Erro ao configurar a requisição
        console.error("Mensagem de erro:", error.message);
        alert(`Erro ao criar contato: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div className={styles.container}>
        <h1>Criar Novo Contato</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome*</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome do contato"
            />
            {formErrors.name && (
              <p className={styles.errorText}>{formErrors.name}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail do contato"
            />
            {formErrors.email && (
              <p className={styles.errorText}>{formErrors.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone*</label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Telefone do contato"
            />
            {formErrors.phone && (
              <p className={styles.errorText}>{formErrors.phone}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category_id">Categoria</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Sem categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="button"
              onClick={() => navigate("/")}
              className={styles.cancelButton}
            >
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </div>
    </>
  );
}

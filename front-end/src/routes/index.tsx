import { Routes, Route } from "react-router-dom";
import { Home, CreateContact, EditContact } from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts/create" element={<CreateContact />} />
      <Route path="/contacts/edit/:id" element={<EditContact />} />
    </Routes>
  );
}

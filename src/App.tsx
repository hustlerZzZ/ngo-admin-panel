import Home from "./pages/Home.tsx";
import Blogs from "./pages/Blogs.tsx";
import Login from "./pages/Login.tsx";
import Settings from "./pages/Settings.tsx";
import Layout from "./components/Layout.tsx";
import ContactForms from "./pages/ContactForms.tsx";
import VolunteerForms from "./pages/VolunteerForms.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact-forms" element={<ContactForms />} />
          <Route path="volunteer-forms" element={<VolunteerForms />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

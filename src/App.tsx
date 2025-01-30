import Blogs from "./pages/Blogs.tsx";
import Login from "./pages/Login.tsx";
import Story from "./pages/Story.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import NewBlog from "./pages/NewBlog.tsx";
import NewStory from "./pages/NewStory.tsx";
import Settings from "./pages/Settings.tsx";
import Layout from "./components/Layout.tsx";
import AuthCheck from "./auth/AuthCheck.tsx";
import ContactForms from "./pages/ContactForms.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import VolunteerForms from "./pages/VolunteerForms.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthCheck>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="blogs" />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/create-new" element={<NewBlog />} />
              <Route path="stories/create-new" element={<NewStory />} />
              <Route path="contact-forms" element={<ContactForms />} />
              <Route path="stories" element={<Story />} />
              <Route path="volunteer-forms" element={<VolunteerForms />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </AuthCheck>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

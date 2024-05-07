import { Route, Routes } from "react-router-dom";
import "./global.css";
import Profile from "./_root/Profile";
import LoginForm from "./_auth/forms/LoginForm";
import RegistrationForm from "./_auth/forms/RegistrationForm";
import AuthLayout from "./_auth/AuthLayout";

function App() {
  return (
    <main className="h-screen">
      <Routes>
        {/* Public route */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Route>

        {/* Private route */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;

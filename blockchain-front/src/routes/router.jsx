import { Routes, Route } from "react-router-dom";
import Home from "../modules/Home";
import RegisterForm from "../modules/RegisterForm"; // para cultivos
import UserRegisterForm from "../modules/UserRegisterForm"; // nuevo formulario de usuario
import CO2Result from "../modules/Result";
import Dashboard from "../modules/Dashboard";
import Marketplace from "../modules/Marketplace";
import Explorer from "../modules/Explorer";
import MainLayout from "../Layouts/MainLayout";
import LoginForm from "../modules/LoginForm";

const AppRouter = () => {
    return (
        <Routes>
            {/* Pantallas públicas fuera de MainLayout */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro-usuario" element={<UserRegisterForm />} />

            {/* Rutas internas con MainLayout */}
            <Route path="/" element={<MainLayout />}>
                <Route path="registro" element={<RegisterForm />} /> {/* Cultivos */}
                <Route path="resultado" element={<CO2Result />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="mercado" element={<Marketplace />} />
                <Route path="explorador" element={<Explorer />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;

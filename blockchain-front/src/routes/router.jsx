import { Routes, Route } from "react-router-dom";
import LandingPage from "../modules/Home";
import RegisterForm from "../modules/RegisterForm";
import CO2Result from "../modules/Result";
import Dashboard from "../modules/Dashboard";
import Marketplace from "../modules/Marketplace";
import Explorer from "../modules/Explorer";
import MainLayout from "../Layouts/MainLayout";

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="registro" element={<RegisterForm />} />
                    <Route path="resultado" element={<CO2Result />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="mercado" element={<Marketplace />} />
                    <Route path="explorador" element={<Explorer />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;

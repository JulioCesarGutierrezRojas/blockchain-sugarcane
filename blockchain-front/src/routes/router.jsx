import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-light">
              <h1 className="text-4xl font-bold text-primary mb-4">
                ¡Bienvenida a Token CO₂ Caña! 🌿
              </h1>
              <p className="text-accent text-lg">
                Tailwind y React Router están funcionando correctamente.
              </p>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;

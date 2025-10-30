import { useState } from "react";

export default function RegisterFarm() {
  const [farm, setFarm] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    total_hectares: "",
    planting_date: "",
    expected_harvest_date: "",
    status: "active",
  });

  const handleChange = (e) => {
    setFarm({ ...farm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del cultivo:", farm);
    // Aquí luego irá tu llamada con Axios a /api/farms
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex justify-center items-center p-10">
      <div className="bg-[var(--color-surface)] p-10 rounded-3xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-[var(--color-primary)] text-center mb-8">
          Registrar Cultivo
        </h2>

        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label className="text-[var(--color-text-light)] text-sm">
              Nombre del cultivo
            </label>
            <input
              type="text"
              name="name"
              value={farm.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
              placeholder="Ej. Lote El Progreso"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="text-[var(--color-text-light)] text-sm">
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              value={farm.location}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
              placeholder="Ej. Veracruz, México"
              required
            />
          </div>

          <div>
            <label className="text-[var(--color-text-light)] text-sm">
              Latitud
            </label>
            <input
              type="number"
              step="0.000001"
              name="latitude"
              value={farm.latitude}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
              placeholder="Ej. 19.1738"
            />
          </div>

          <div>
            <label className="text-[var(--color-text-light)] text-sm">
              Longitud
            </label>
            <input
              type="number"
              step="0.000001"
              name="longitude"
              value={farm.longitude}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
              placeholder="Ej. -96.1342"
            />
          </div>

          <div>
            <label className="text-[var(--color-text-light)] text-sm">
              Hectáreas Totales
            </label>
            <input
              type="number"
              step="0.01"
              name="total_hectares"
              value={farm.total_hectares}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
              placeholder="Ej. 10.5"
              required
            />
          </div>

          <div>
            <label className="text-[var(--color-text-light)] text-sm">
              Fecha de Siembra
            </label>
            <input
              type="date"
              name="planting_date"
              value={farm.planting_date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-[var(--color-text-light)] text-sm">
              Fecha Estimada de Cosecha
            </label>
            <input
              type="date"
              name="expected_harvest_date"
              value={farm.expected_harvest_date}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
            />
          </div>

          <div>
            <label className="text-[var(--color-text-light)] text-sm">
              Estado
            </label>
            <select
              name="status"
              value={farm.status}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-[var(--color-border)] rounded-lg"
            >
              <option value="active">Activo</option>
              <option value="harvested">Cosechado</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          <div className="col-span-2 text-center mt-8">
            <button
              type="submit"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white px-8 py-3 rounded-xl shadow-lg"
            >
              Guardar Cultivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

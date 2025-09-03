import { useEffect, useState } from "react";
import "../styles/Technicians.css";

function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    icon: "👨‍🔧",
    experience: "",
  });

  useEffect(() => {
    // Técnicos por defecto
    const defaultTechnicians = [
      {
        name: "Juan El Vergas",
        specialty: "Reparación de Hardware",
        icon: "🔧",
        experience: "8 años",
      },
      {
        name: "Pedro Picapiedra",
        specialty: "Mantenimiento Preventivo",
        icon: "⚒️",
        experience: "5 años",
      },
      {
        name: "El Profe Wellington",
        specialty: "Diagnóstico Avanzado",
        icon: "👨‍🏫",
        experience: "12 años",
      },
    ];

    const storedTechs = JSON.parse(localStorage.getItem("technicians")) || [];
    const finalTechnicians =
      storedTechs.length > 0 ? storedTechs : defaultTechnicians;
    setTechnicians(finalTechnicians);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.specialty) return;
    const updated = [...technicians, form];
    setTechnicians(updated);
    localStorage.setItem("technicians", JSON.stringify(updated));
    setForm({ name: "", specialty: "", icon: "👨‍🔧", experience: "" });
  };

  return (
    <div className="technicians">
      <h2>Técnicos Disponibles</h2>
      <form onSubmit={handleAdd} className="technician-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          placeholder="Especialidad"
        />
        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experiencia"
        />
        <select name="icon" value={form.icon} onChange={handleChange}>
          <option>👨‍🔧</option>
          <option>🔧</option>
          <option>⚒️</option>
          <option>🧰</option>
          <option>🛠️</option>
        </select>
        <button type="submit">Agregar técnico</button>
      </form>
      <div className="technician-list">
        {technicians.length > 0 ? (
          technicians.map((tech, index) => (
            <div key={index} className="technician-card">
              <div className="technician-icon">{tech.icon}</div>
              <h3>{tech.name}</h3>
              <p className="specialty">Especialidad: {tech.specialty}</p>
              <p className="experience">Experiencia: {tech.experience}</p>
            </div>
          ))
        ) : (
          <div className="no-technicians">
            <p>No hay técnicos registrados</p>
            <p>Los técnicos se cargan automáticamente desde el sistema</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Technicians;

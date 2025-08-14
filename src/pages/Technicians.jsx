import { useEffect, useState } from "react";
import "../styles/Technicians.css";

function Technicians() {
  const [technicians, setTechnicians] = useState([]);

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

  return (
    <div className="technicians">
      <h2>Técnicos Disponibles</h2>
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

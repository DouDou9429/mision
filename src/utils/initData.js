export function initializeData() {
  const existingTechs = localStorage.getItem("technicians");
  const existingRepairs = localStorage.getItem("repairs");

  if (!existingTechs) {
    localStorage.setItem(
      "technicians",
      JSON.stringify([
        {
          name: "Carlos Gómez",
          specialty: "Electrónica",
          photo:
            "https://res.cloudinary.com/demo/image/upload/v1692123133/technician1.jpg",
        },
        {
          name: "Laura Méndez",
          specialty: "Software",
          photo:
            "https://res.cloudinary.com/demo/image/upload/v1692123133/technician2.jpg",
        },
        {
          name: "Pedro Ruiz",
          specialty: "Redes",
          photo:
            "https://res.cloudinary.com/demo/image/upload/v1692123133/technician3.jpg",
        },
      ])
    );
  }

  if (!existingRepairs) {
    localStorage.setItem(
      "repairs",
      JSON.stringify([
        {
          client: "Juan Pérez",
          device: "Laptop HP",
          issue: "No enciende",
          technician: "Carlos Gómez",
          status: "En proceso",
        },
        {
          client: "Ana Torres",
          device: "iPhone 12",
          issue: "Pantalla rota",
          technician: "Laura Méndez",
          status: "Pendiente",
        },
      ])
    );
  }
}

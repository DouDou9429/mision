const technicians = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    area: "Electrónica",
    specialty: "Cámaras IP",
    experience: "5 años",
    status: "Disponible",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech1.jpg",
  },
  {
    id: 2,
    name: "María López",
    area: "Informática",
    specialty: "Firmware",
    experience: "3 años",
    status: "En reparación",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech2.jpg",
  },
  {
    id: 3,
    name: "Luis Herrera",
    area: "Redes",
    specialty: "Configuración remota",
    experience: "6 años",
    status: "Disponible",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech3.jpg",
  },
  {
    id: 4,
    name: "Ana González",
    area: "Hardware",
    specialty: "Reemplazo de sensores",
    experience: "4 años",
    status: "En reparación",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech4.jpg",
  },
  {
    id: 5,
    name: "Santiago Pérez",
    area: "Seguridad",
    specialty: "CCTV analógico",
    experience: "2 años",
    status: "Disponible",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech5.jpg",
  },
  {
    id: 6,
    name: "Lucía Mendoza",
    area: "Electrónica",
    specialty: "Reparación de placas",
    experience: "7 años",
    status: "Reparación por terminar",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech6.jpg",
  },
  {
    id: 7,
    name: "Andrés Castro",
    area: "Programación",
    specialty: "Controladores",
    experience: "3 años",
    status: "Disponible",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech7.jpg",
  },
  {
    id: 8,
    name: "Natalia Duarte",
    area: "Redes",
    specialty: "Montaje de cámaras IP",
    experience: "4 años",
    status: "En reparación",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech8.jpg",
  },
  {
    id: 9,
    name: "Julián Ríos",
    area: "Firmware",
    specialty: "Actualización de software",
    experience: "6 años",
    status: "Disponible",
    image: "https://res.cloudinary.com/demo/image/upload/v1690000000/tech9.jpg",
  },
  {
    id: 10,
    name: "Paola Vargas",
    area: "Seguridad",
    specialty: "DVR y NVR",
    experience: "5 años",
    status: "Reparación por terminar",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1690000000/tech10.jpg",
  },
];

export const saveTechniciansToLocalStorage = () => {
  localStorage.setItem("technicians", JSON.stringify(technicians));
};

export const getTechniciansFromLocalStorage = () => {
  const data = localStorage.getItem("technicians");
  return data ? JSON.parse(data) : [];
};

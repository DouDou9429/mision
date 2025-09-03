import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import OrderRegistration from "./components/OrderRegistration";
import OrdersManagement from "./pages/OrdersManagement";
import Technicians from "./pages/Technicians";
import Login from "./pages/Login";
import PQRS from "./pages/PQRS";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import { useState, useEffect } from "react";
import "./styles/global.css";
import Swal from "sweetalert2";
import { useWorkOrders } from "./domain/useWorkOrder";

function App() {
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("user"); // "user" o "technician"

  const {data,loading, error} = useWorkOrders();

  useEffect(() => {
    // Cargar órdenes desde localStorage
    try {
      const storedOrders = localStorage.getItem("ordersData");
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        // Validar y asegurar que cada orden tenga los campos necesarios
        const validatedOrders = parsedOrders.map((order) => ({
          ...order,
          estado: order.estado || "Pendiente",
          fechaCreacion:
            order.fechaCreacion || new Date().toISOString().split("T")[0],
          fechaActualizacion:
            order.fechaActualizacion || new Date().toISOString().split("T")[0],
          fechaFinalizacion: order.fechaFinalizacion || null,
          observaciones: order.observaciones || null,
        }));
        setOrders(validatedOrders);
        localStorage.setItem("ordersData", JSON.stringify(validatedOrders));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
      // Limpiar localStorage si hay error
      localStorage.removeItem("ordersData");
    }

    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUserType = localStorage.getItem("userType");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setUserType(storedUserType || "user");
    }
  }, []);

  const addOrder = (orderData) => {}

  // const addOrder = (orderData) => {
  //   const newOrder = {
  //     ...orderData,
  //     id: Date.now(),
  //   };
  //   const updatedOrders = [...orders, newOrder];
  //   setOrders(updatedOrders);
  //   localStorage.setItem("ordersData", JSON.stringify(updatedOrders));
  // };

//   const addOrder = async (title) => {
//    const newOrder = {
//    ...orderData,
//      id: Date.now(),
//     };
//   try {
//     const result = await createWorkOrder(newOrder);
//     getWorkOrders();

//     // alerta con SweetAlert
//     Swal.fire({
//       title: "Orden de trabajo creada",
//       text: "La orden de trabajo se ha creado correctamente",
//       icon: "success",
//     });
//   } catch (error) {
//     // alerta de error
//     Swal.fire({
//       title: "Error",
//       text: "Ha ocurrido un error al crear la orden de trabajo",
//       icon: "error",
//     });
//   }
// };


  const updateOrderStatus = (orderIndex, newStatus, observations = null) => {
    const updatedOrders = [...orders];
    const orderToUpdate = updatedOrders[orderIndex];

    if (orderToUpdate) {
      orderToUpdate.estado = newStatus;
      orderToUpdate.fechaActualizacion = new Date().toISOString().split("T")[0];

      if (observations !== null) {
        orderToUpdate.observaciones = observations;
      }

      if (newStatus === "Completado") {
        orderToUpdate.fechaFinalizacion = new Date()
          .toISOString()
          .split("T")[0];
      }

      setOrders(updatedOrders);
      localStorage.setItem("ordersData", JSON.stringify(updatedOrders));

      const statusMessages = {
        Pendiente: "Estado actualizado a Pendiente",
        "En Curso": "Estado actualizado a En Curso",
        Completado:
          "Estado actualizado a Completado - Puede generar el reporte",
      };

      const message =
        observations !== null
          ? `${
              statusMessages[newStatus] || "Estado actualizado"
            } - Observaciones guardadas`
          : statusMessages[newStatus] || "Estado actualizado";

      alert(message);
    }
  };

  const deleteOrder = (orderIndex) => {
    const updatedOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(updatedOrders);
    localStorage.setItem("ordersData", JSON.stringify(updatedOrders));
  };

  const handleLogin = (username, password, type) => {
    // Permite acceso con cualquier dato

    if (username.trim() && password.trim()) {
      setIsAuthenticated(true);
      setUserType(type);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", type);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType("user");
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userType");
  };

  // Esta funcion depuramos datos del localStorage

  const clearLocalStorage = () => {
    localStorage.removeItem("ordersData");
    localStorage.removeItem("technicians");
    setOrders([]);
    console.log("LocalStorage cleared");
  };

  // Función para debuggear el estado actual
  const debugState = () => {
    console.log("Current orders:", orders);
    console.log("Is authenticated:", isAuthenticated);
    console.log("User type:", userType);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userType={userType}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onLogin={handleLogin}
                  isAuthenticated={isAuthenticated}
                />
              )
            }
          />
          <Route
            path="/orderRegistration"
            element={
              isAuthenticated ? (
                userType === "technician" ? (
                  <OrderRegistration addOrder={addOrder} />
                ) : (
                  <RestrictedAccess />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? (
                <OrdersManagement
                  orders={data}
                  updateOrderStatus={updateOrderStatus}
                  deleteOrder={deleteOrder}
                  userType={userType}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/technicians" element={<Technicians />} />
          <Route path="/pqrs" element={<PQRS />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

const RestrictedAccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column",
        gap: "2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "4rem" }}>🚫</div>
      <h1>Acceso Restringido</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px" }}>
        Solo los técnicos pueden acceder a la creación de órdenes. Los usuarios
        normales solo pueden visualizar el progreso de las órdenes existentes.
      </p>
      <button
        onClick={() => navigate("/orders")}
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "600",
        }}
      >
        📋 Ver Gestión de Órdenes
      </button>
    </div>
  );
};

export default App;

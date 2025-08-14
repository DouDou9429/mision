import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Technicians from "./pages/Technicians";
import Orders from "./pages/Orders";
import OrdersManagement from "./pages/OrdersManagement";
import { useEffect, useState } from "react";

const getOrdersData = () => {
  try {
    const data = localStorage.getItem("ordersData");
    if (!data) return [];

    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
      console.warn("ordersData no es un array, inicializando como array vacío");
      return [];
    }

    const validOrders = parsedData.filter(
      (order) =>
        order &&
        typeof order === "object" &&
        order.cliente &&
        order.telefono &&
        order.direccion &&
        order.equipo &&
        order.serial &&
        order.tecnico &&
        order.falla &&
        order.estado
    );

    if (validOrders.length !== parsedData.length) {
      console.warn(
        "Algunas órdenes no tenían la estructura correcta y fueron filtradas"
      );
    }

    return validOrders;
  } catch (error) {
    console.error("Error al cargar ordersData:", error);
    return [];
  }
};

function App() {
  const [ordersData, setOrdersData] = useState(getOrdersData());

  const addOrder = (orderData) => {
    setOrdersData([...ordersData, orderData]);
  };

  const updateOrderStatus = (orderIndex, newStatus) => {
    const updatedOrders = [...ordersData];
    updatedOrders[orderIndex].estado = newStatus;
    setOrdersData(updatedOrders);
  };

  const deleteOrder = (orderIndex) => {
    const updatedOrders = ordersData.filter((_, index) => index !== orderIndex);
    setOrdersData(updatedOrders);
  };

  useEffect(() => {
    try {
      localStorage.setItem("ordersData", JSON.stringify(ordersData));
    } catch (error) {
      console.error("Error al guardar ordersData:", error);
    }
  }, [ordersData]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/orderRegistration"
          element={<Orders addOrder={addOrder} />}
        />
        <Route
          path="/orders"
          element={
            <OrdersManagement
              ordersData={ordersData}
              updateOrderStatus={updateOrderStatus}
              deleteOrder={deleteOrder}
            />
          }
        />
        <Route path="/technicians" element={<Technicians />} />
      </Routes>
    </Router>
  );
}

export default App;

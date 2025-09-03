import React from "react";
import Order from "../components/Order";
import "../styles/OrdersManagement.css";

const OrdersManagement = ({
  orders,
  updateOrderStatus,
  deleteOrder,
  userType,
}) => {
  return (
    <div className="orders-management-container">
      <div className="orders-header">
        <h2>📋 Gestión de Órdenes</h2>
        <p>Administra y da seguimiento a todas las órdenes de reparación</p>
        {userType === "technician" ? (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 77, 255, 0.1))",
              border: "2px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            <h4 style={{ color: "#8b5cf6", margin: "0 0 10px 0" }}>
              🔧 Acceso de Técnico
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#e0e0e0" }}>
              Puedes actualizar estados y agregar observaciones detalladas del
              trabajo realizado.
            </p>
          </div>
        ) : (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            <h4 style={{ color: "#3b82f6", margin: "0 0 10px 0" }}>
              👤 Acceso de Usuario
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#e0e0e0" }}>
              Solo puedes visualizar el progreso de las órdenes. Los técnicos se
              encargan de las modificaciones.
            </p>
          </div>
        )}
      </div>

      <div className="orders-content">
        <Order
          orders={orders}
          updateOrderStatus={updateOrderStatus}
          deleteOrder={deleteOrder}
          userType={userType}
        />
      </div>
    </div>
  );
};

export default OrdersManagement;

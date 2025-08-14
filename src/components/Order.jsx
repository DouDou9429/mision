import React, { useState } from "react";
import styles from "../styles/Order.module.css";

const Order = ({ ordersData, updateOrderStatus, deleteOrder }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  const validOrdersData = Array.isArray(ordersData) ? ordersData : [];

  const handleUpdateStatus = (orderIndex) => {
    setSelectedOrderIndex(orderIndex);
    setShowStatusModal(true);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedOrderIndex !== null) {
      updateOrderStatus(selectedOrderIndex, newStatus);
      setShowStatusModal(false);
      setSelectedOrderIndex(null);
    }
  };

  const handleDeleteOrder = (orderIndex) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta orden?")) {
      deleteOrder(orderIndex);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completado":
        return "#28a745";
      case "En Curso":
        return "#ffc107";
      case "Pendiente":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  if (validOrdersData.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
        <h3>No hay órdenes registradas</h3>
        <p>Ve a "Registro de orden" para crear una nueva orden</p>
      </div>
    );
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Equipo</th>
            <th>Serial</th>
            <th>Falla</th>
            <th>Técnico asignado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {validOrdersData.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order?.cliente || "N/A"}</td>
              <td>{order?.telefono || "N/A"}</td>
              <td>{order?.direccion || "N/A"}</td>
              <td>{order?.equipo || "N/A"}</td>
              <td>{order?.serial || "N/A"}</td>
              <td>{order?.falla || "N/A"}</td>
              <td>{order?.tecnico || "N/A"}</td>
              <td>
                <span
                  style={{
                    backgroundColor: getStatusColor(order?.estado),
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {order?.estado || "Pendiente"}
                </span>
              </td>
              <td className={styles.actions}>
                <button
                  onClick={() => handleUpdateStatus(index)}
                  className={styles.updateButton}
                >
                  Actualizar estado
                </button>
                <button
                  onClick={() => handleDeleteOrder(index)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showStatusModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Actualizar Estado</h3>
            <p>Selecciona el nuevo estado para la orden:</p>
            <div className={styles.statusButtons}>
              <button
                onClick={() => handleStatusChange("Pendiente")}
                className={styles.statusButton}
                style={{ backgroundColor: "#dc3545" }}
              >
                Pendiente
              </button>
              <button
                onClick={() => handleStatusChange("En Curso")}
                className={styles.statusButton}
                style={{ backgroundColor: "#ffc107", color: "#000" }}
              >
                En Curso
              </button>
              <button
                onClick={() => handleStatusChange("Completado")}
                className={styles.statusButton}
                style={{ backgroundColor: "#28a745" }}
              >
                Completado
              </button>
            </div>
            <button
              onClick={() => setShowStatusModal(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;

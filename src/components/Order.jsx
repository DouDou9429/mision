import React, { useState } from "react";
import styles from "../styles/Order.module.css";
import MaintenanceReport from "./MaintenanceReport";

const Order = ({ orders, updateOrderStatus, deleteOrder, userType }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedOrderForReport, setSelectedOrderForReport] = useState(null);
  const [showObservationsModal, setShowObservationsModal] = useState(false);
  const [observations, setObservations] = useState("");

  const validOrders = Array.isArray(orders) ? orders : [];

  const handleUpdateStatus = (orderIndex) => {
    if (userType !== "technician") {
      alert("Solo los técnicos pueden actualizar el estado de las órdenes.");
      return;
    }
    setSelectedOrderIndex(orderIndex);
    setShowStatusModal(true);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedOrderIndex !== null && updateOrderStatus) {
      updateOrderStatus(selectedOrderIndex, newStatus);
      setShowStatusModal(false);
      setSelectedOrderIndex(null);
    }
  };

  const handleDeleteOrder = (orderIndex) => {
    if (userType !== "technician") {
      alert("Solo los técnicos pueden eliminar órdenes.");
      return;
    }
    if (window.confirm("¿Estás seguro de que quieres eliminar esta orden?")) {
      if (deleteOrder) {
        deleteOrder(orderIndex);
      }
    }
  };

  const handleGenerateReport = (order) => {
    if (order.estado === "Completado") {
      setSelectedOrderForReport(order);
      setShowReportModal(true);
    } else {
      alert("Solo se pueden generar reportes para órdenes completadas");
    }
  };

  const handleAddObservations = (orderIndex) => {
    if (userType !== "technician") {
      alert(
        "Solo los técnicos pueden agregar observaciones del trabajo realizado."
      );
      return;
    }
    setSelectedOrderIndex(orderIndex);
    setObservations(validOrders[orderIndex]?.observaciones || "");
    setShowObservationsModal(true);
  };

  const handleSaveObservations = () => {
    if (selectedOrderIndex !== null && updateOrderStatus) {
      const updatedOrders = [...validOrders];
      updatedOrders[selectedOrderIndex].observaciones = observations;

      // Aqui llamamos a la función de actualización
      updateOrderStatus(
        selectedOrderIndex,
        validOrders[selectedOrderIndex].estado,
        observations
      );

      setShowObservationsModal(false);
      setSelectedOrderIndex(null);
      setObservations("");
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completado":
        return "✅";
      case "En Curso":
        return "🔄";
      case "Pendiente":
        return "⏳";
      default:
        return "❓";
    }
  };

  if (validOrders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
        <h3>No hay órdenes registradas</h3>
        <p>Ve a "Registro de orden" para crear una nueva orden</p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(124, 77, 255, 0.1))",
          border: "2px solid rgba(0, 229, 255, 0.3)",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "25px",
          color: "#e0e0e0",
        }}
      >
        <h3
          style={{
            color: "#00e5ff",
            margin: "0 0 15px 0",
            textAlign: "center",
          }}
        >
          📋 Sistema de Gestión de Estados
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "24px" }}>⏳</span>
            <h4 style={{ margin: "10px 0 5px 0", color: "#ff6b6b" }}>
              Pendiente
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              Orden esperando ser atendida
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "24px" }}>🔄</span>
            <h4 style={{ margin: "10px 0 5px 0", color: "#ffd93d" }}>
              En Curso
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              Orden siendo trabajada
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "24px" }}>✅</span>
            <h4 style={{ margin: "10px 0 5px 0", color: "#6bcf7f" }}>
              Completado
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              Orden finalizada - Generar reporte
            </p>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            margin: "15px 0 0 0",
            fontSize: "0.9rem",
            opacity: "0.8",
          }}
        >
          💡 <strong>Instrucciones:</strong> Haga clic en "Actualizar estado"
          para cambiar el estado de una orden. Solo las órdenes completadas
          pueden generar reportes de mantenimiento.
        </p>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Equipo</th>
            <th>Serial</th>
            <th>Especialidad</th>
            <th>Falla</th>
            <th>Creación</th>
            <th>Técnico asignado</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Acciones</th>
            <th>Reporte</th>
          </tr>
        </thead>
        <tbody>
          {validOrders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order?.device.client.name || "N/A"}</td>
              <td>{order?.device.client.phone || "N/A"}</td>
              <td>{order?.device.client.address|| "N/A"}</td>
              <td>{order?.device.deviceType.name || "N/A"}</td>
              <td>{order?.device.serialNumber || "N/A"}</td>
              <td>
                <span
                  style={{
                    backgroundColor: "#e0e7ff",
                    color: "#3730a3",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  {order?.technician.specialty || "N/A"}
                </span>
              </td>
              <td>{order?.device.problem || "N/A"}</td>
              <td>{order?.createdAt || "-"}</td>
              <td>{order?.technician.name || "N/A"}</td>
              <td>
                <span
                  style={{
                    backgroundColor: getStatusColor(order?.status),
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                    minWidth: "100px",
                  }}
                >
                  {getStatusIcon(order?.status)} {order?.status || "Pendiente"}
                </span>
              </td>
              <td>{order?.notes || "N/A"}</td>
              {/* <td>
                {order?.status === "Completado" ? (
                  userType === "technician" ? (
                    <button
                      onClick={() => handleAddObservations(index)}
                      className={styles.observationsButton}
                      title="Agregar/Editar observaciones del trabajo realizado"
                    >
                      {order?.notes
                        ? "✏️ Editar Obs."
                        : "📝 Agregar Obs."}
                    </button>
                  ) : (
                    <span
                      style={{
                        color: order?.notes ? "#10b981" : "#9ca3af",
                        fontSize: "0.8rem",
                        fontWeight: order?.notes ? "600" : "400",
                      }}
                    >
                      {order?.notes
                        ? "✅ Con observaciones"
                        : "⏳ Sin observaciones"}
                    </span>
                  )
                ) : (
                  <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                    {order?.status === "En Curso"
                      ? "🔄 En proceso"
                      : "⏳ Pendiente"}
                  </span>
                )}
              </td> */}
              <td className={styles.actions}>
                {userType === "technician" ? (
                  <>
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
                  </>
                ) : (
                  <span
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                    }}
                  >
                    Solo visualización
                  </span>
                )}
              </td>
              <td className={styles.reportColumn}>
                {order?.estado === "Completado" ? (
                  <button
                    onClick={() => handleGenerateReport(order)}
                    className={styles.reportButton}
                    title="Generar reporte de mantenimiento"
                  >
                    📄 Generar Reporte
                  </button>
                ) : (
                  <span className={styles.disabledReport}>
                    {order?.estado === "En Curso"
                      ? "🔄 En proceso"
                      : "⏳ Pendiente"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showStatusModal && selectedOrderIndex !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>🔄 Actualizar Estado de la Orden</h3>
            <p>
              <strong>Orden #{selectedOrderIndex + 1}</strong> - Cliente:{" "}
              {validOrders[selectedOrderIndex]?.cliente}
            </p>
            <p>
              Estado actual:{" "}
              <span
                style={{
                  color: getStatusColor(
                    validOrders[selectedOrderIndex]?.estado
                  ),
                }}
              >
                {getStatusIcon(validOrders[selectedOrderIndex]?.estado)}{" "}
                {validOrders[selectedOrderIndex]?.estado || "Pendiente"}
              </span>
            </p>
            <p>Selecciona el nuevo estado:</p>
            <div className={styles.statusButtons}>
              <button
                onClick={() => handleStatusChange("Pendiente")}
                className={styles.statusButton}
                style={{ backgroundColor: "#dc3545" }}
                title="La orden está esperando ser atendida"
              >
                ⏳ Pendiente
              </button>
              <button
                onClick={() => handleStatusChange("En Curso")}
                className={styles.statusButton}
                style={{ backgroundColor: "#ffc107", color: "#000" }}
                title="La orden está siendo trabajada"
              >
                🔄 En Curso
              </button>
              <button
                onClick={() => handleStatusChange("Completado")}
                className={styles.statusButton}
                style={{ backgroundColor: "#28a745" }}
                title="La orden ha sido completada - Puede generar reporte"
              >
                ✅ Completado
              </button>
            </div>
            <button
              onClick={() => setShowStatusModal(false)}
              className={styles.cancelButton}
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      {showReportModal && selectedOrderForReport && (
        <MaintenanceReport
          order={selectedOrderForReport}
          onClose={() => {
            setShowReportModal(false);
            setSelectedOrderForReport(null);
          }}
        />
      )}

      {showObservationsModal && selectedOrderIndex !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>📝 Observaciones del Trabajo Realizado</h3>
            <p>
              <strong>Orden #{selectedOrderIndex + 1}</strong> - Cliente:{" "}
              {validOrders[selectedOrderIndex]?.cliente}
            </p>
            <p>
              <strong>Equipo:</strong> {validOrders[selectedOrderIndex]?.equipo}
            </p>
            <p>
              <strong>Especialidad:</strong>{" "}
              {validOrders[selectedOrderIndex]?.especialidad}
            </p>
            <div style={{ margin: "20px 0" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Describe detalladamente el trabajo realizado:
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ej: Se realizó mantenimiento preventivo, se limpió el sistema de ventilación, se actualizó el software, se reemplazó la batería, etc..."
                style={{
                  width: "100%",
                  minHeight: "150px",
                  padding: "15px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
            <div
              style={{ display: "flex", gap: "15px", justifyContent: "center" }}
            >
              <button
                onClick={handleSaveObservations}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                💾 Guardar Observaciones
              </button>
              <button
                onClick={() => {
                  setShowObservationsModal(false);
                  setSelectedOrderIndex(null);
                  setObservations("");
                }}
                style={{
                  background: "linear-gradient(135deg, #6b7280, #4b5563)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;

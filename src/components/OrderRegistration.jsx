import React, { useState, useEffect, useMemo } from "react";
import styles from "../styles/OrderRegistration.module.css";
import { createWorkOrder } from "../api/workOrders";

const OrderRegistration = ({ addOrder }) => {
  const [orderData, setOrderData] = useState({
    cliente: "",
    telefono: "",
    direccion: "",
    equipo: "",
    serial: "",
    especialidad: "",
    tecnico: "",
    falla: "",
    fechaCreacion: "",
  });

  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const storedTechnicians =
      JSON.parse(localStorage.getItem("technicians")) || [];
    setTechnicians(storedTechnicians);

    // Se establecio la  fecha actual
    const today = new Date().toISOString().split("T")[0];
    setOrderData((prev) => ({ ...prev, fechaCreacion: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    // Aqui validamos  que los campos requeridos estén llenos
    if (
      // !orderData.cliente ||
      !orderData.telefono ||
      !orderData.equipo ||
      !orderData.especialidad ||
      !orderData.falla
    ) {
      alert(
        "Por favor, complete todos los campos requeridos (Cliente, Teléfono, Equipo, Especialidad, Falla)"
      );
      return;
    }

    // const newOrder = {
    //   ...orderData,
    //   estado: "Pendiente",
    //   fechaCreacion:
    //     orderData.fechaCreacion || new Date().toISOString().split("T")[0],
    //   id: Date.now(),
    //   fechaActualizacion: new Date().toISOString().split("T")[0],
    // };

    // addOrder(newOrder);

    //funcion api

    const newOrder = {
      orderNumber:Date.now(),
     
      
      updatedAt:"2025-09-03 14:30:00",
      deviceId:3,
      technicianId:1,
      clientId:1,

    };

    try {

      //llamado a la api

      await createWorkOrder(newOrder)
      
    } catch (error) {
      console.log(error)
      
    }

    setOrderData({
      cliente: "",
      telefono: "",
      direccion: "",
      equipo: "",
      serial: "",
      especialidad: "",
      tecnico: "",
      falla: "",
      fechaCreacion: new Date().toISOString().split("T")[0],
    });

    alert("Orden creada exitosamente!");
  };

  const filteredTechnicians = useMemo(() => {
    if (!orderData.especialidad) return [];

    return technicians.filter((tech) =>
      tech.specialty
        .toLowerCase()
        .includes(orderData.especialidad.toLowerCase())
    );
  }, [orderData.especialidad, technicians]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.ordercontainer}>
        <h2 className={styles.formTitle}>📝 Registro de Orden</h2>

        <form onSubmit={handleSubmit} className={styles.orderForm}>
          <div className={styles.row}>
            <input
              type="text"
              name="cliente"
              value={orderData.cliente}
              onChange={handleChange}
              placeholder="Nombre del Cliente *"
              className={styles.name}
              required
            />
            <input
              type="tel"
              name="telefono"
              value={orderData.telefono}
              onChange={handleChange}
              placeholder="Teléfono *"
              className={styles.phoneNumber}
              required
            />
          </div>

          <input
            type="text"
            name="direccion"
            value={orderData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            className={styles.address}
          />

          <div className={styles.row}>
            <input
              type="text"
              name="equipo"
              value={orderData.equipo}
              onChange={handleChange}
              placeholder="Tipo de Equipo *"
              className={styles.device}
              required
            />
            <input
              type="text"
              name="serial"
              value={orderData.serial}
              onChange={handleChange}
              placeholder="Número de Serie"
              className={styles.serial}
            />
          </div>

          <div className={styles.row}>
            <select
              name="especialidad"
              value={orderData.especialidad}
              onChange={handleChange}
              className={styles.specialty}
              required
            >
              <option value="">Seleccionar Especialidad *</option>
              <option value="Hardware">🔧 Hardware</option>
              <option value="Software">💻 Software</option>
              <option value="Mantenimiento">🛠️ Mantenimiento</option>
              <option value="Diagnóstico">🔍 Diagnóstico</option>
              <option value="Reparación">⚡ Reparación</option>
              <option value="Instalación">📦 Instalación</option>
              <option value="Actualización">🔄 Actualización</option>
              <option value="Recuperación">💾 Recuperación de Datos</option>
              <option value="Redes">🌐 Redes</option>
              <option value="Seguridad">🔒 Seguridad</option>
            </select>
            <input
              type="date"
              name="fechaCreacion"
              value={orderData.fechaCreacion}
              onChange={handleChange}
              className={styles.date}
              required
            />
          </div>

          <div className={styles.row}>
            <select
              name="tecnico"
              value={orderData.tecnico}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Seleccionar Técnico *</option>
              {filteredTechnicians.length > 0 ? (
                filteredTechnicians.map((tech, index) => (
                  <option key={index} value={tech.name}>
                    {tech.icon} {tech.name} - {tech.specialty}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {orderData.especialidad
                    ? "No hay técnicos disponibles para esta especialidad"
                    : "Seleccione una especialidad primero"}
                </option>
              )}
            </select>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(59, 130, 246, 0.1)",
                border: "2px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "12px",
                padding: "15px 20px",
                color: "#3b82f6",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              {filteredTechnicians.length > 0
                ? `📋 ${filteredTechnicians.length} técnico(s) disponible(s)`
                : orderData.especialidad
                ? "⚠️ No hay técnicos para esta especialidad"
                : "💡 Seleccione una especialidad"}
            </div>
          </div>

          <textarea
            name="falla"
            value={orderData.falla}
            onChange={handleChange}
            placeholder="Descripción detallada de la Falla *"
            className={styles.textarea}
            required
          />

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitBtn}>
              📤 Crear Orden
            </button>
            <button type="reset" className={styles.resetBtn}>
              🔄 Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderRegistration;

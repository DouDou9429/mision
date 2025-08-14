import { Form } from "react-router-dom";
import styles from "../styles/OrderRegistration.module.css";
import { useState } from "react";

const OrderRegistration = ({addOrder}) => {

const [orderNameClient, setOrderNameClient] = useState("");
const [orderPhoneNumber, setOrderPhoneNumber] = useState("");
const [orderAddress, setOrderAddress] = useState("");
const [orderDevice, setOrderDevice] = useState("");
const [orderSerial, setOrderSerial] = useState("");
const [orderTechnician, setOrderTechnician] = useState("");
const [orderFailure, setOrderFailure] = useState("");

const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "cliente") {
        setOrderNameClient(value);
    }
    if (name === "telefono") {
        setOrderPhoneNumber(value);
    }
    if (name === "direccion") {
        setOrderAddress(value);
    }
    if (name === "equipo") {
        setOrderDevice(value);
    }
    if (name === "serial") {
        setOrderSerial(value);
    }
    if (name === "tecnico") {
        setOrderTechnician(value);
    }
    if (name === "falla") {
        setOrderFailure(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      cliente: orderNameClient,
      telefono: orderPhoneNumber,
      direccion: orderAddress,
      equipo: orderDevice,
      serial: orderSerial,
      tecnico: orderTechnician,
      falla: orderFailure,
      estado: "Pendiente"
      
    }

    addOrder(orderData);
    setOrderNameClient("");
    setOrderPhoneNumber("");
    setOrderAddress("");
    setOrderDevice("");
    setOrderSerial("");
    setOrderTechnician("");
    setOrderFailure("");
    alert("Orden registrada exitosamente");


  };


  return (
    <form onSubmit={handleSubmit} className={styles.ordercontainer}>
      <h2 className={styles.title}>Registro de orden</h2>
      <input
        type="text"
        name="cliente"
        value={orderNameClient}
        onChange={handleChange}
        placeholder="Nombre de cliente"
        className={styles.name}
      />
      <input
        type="number"
        name="telefono"
        value={orderPhoneNumber}
        onChange={handleChange}
        placeholder="Número de teléfono"
        className={styles.phoneNumber}
      />
      <input
        type="text"
        name="direccion"
        value={orderAddress}
        onChange={handleChange}
        placeholder="Dirección"
        className={styles.address}
      />
      <input
        type="text"
        name="equipo"
        value={orderDevice}
        onChange={handleChange}
        placeholder="Equipo"
        className={styles.device}
      />
      <input
        type="text"
        name="serial"
        value={orderSerial}
        onChange={handleChange}
        placeholder="Serial"
        className={styles.serial}
      />
      <input
        type="text"
        name="tecnico"
        value={orderTechnician}
        onChange={handleChange}
        placeholder="Técnico a asignar"
        className={styles.tecnico}
      />
      <textarea
        name="falla"
        id="falla"
        value={orderFailure}
        onChange={handleChange}
        placeholder="Descripción de falla"
      ></textarea>
      <div className={styles.buttonContainer}>
        <button type="submit">Crear orden</button>
      </div>
    </form>
  );
};

export default OrderRegistration;

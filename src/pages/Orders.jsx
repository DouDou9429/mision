import React from "react";
import OrderRegistration from "../components/OrderRegistration";
import styles from "../styles/Orders.module.css";

const Orders = ({ addOrder }) => {
  return (
    <div className={styles.container}>
      <OrderRegistration addOrder={addOrder} />
    </div>
  );
};

export default Orders;

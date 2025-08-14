import React from "react";
import Order from "../components/Order";

const OrdersManagement = ({ ordersData, updateOrderStatus, deleteOrder }) => {
  return (
    <div>
      <h2>Listado de órdenes</h2>
      <Order
        ordersData={ordersData}
        updateOrderStatus={updateOrderStatus}
        deleteOrder={deleteOrder}
      />
    </div>
  );
};

export default OrdersManagement;

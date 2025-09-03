import React, { useState, useEffect } from "react";
import "../styles/StatisticsDashboard.css";

const StatisticsDashboard = ({ ordersData, technicians }) => {
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [timeRange, setTimeRange] = useState("all");

  const totalOrders = ordersData.length;
  const completedOrders = ordersData.filter(
    (order) => order.estado === "Completado"
  ).length;
  const pendingOrders = ordersData.filter(
    (order) => order.estado === "Pendiente"
  ).length;
  const inProgressOrders = ordersData.filter(
    (order) => order.estado === "En Curso"
  ).length;

  const technicianStats = technicians.map((tech) => {
    const techOrders = ordersData.filter(
      (order) => order.tecnico === tech.name
    );
    const completed = techOrders.filter(
      (order) => order.estado === "Completado"
    ).length;
    const total = techOrders.length;
    const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      ...tech,
      totalOrders: total,
      completedOrders: completed,
      efficiency,
      orders: techOrders,
    };
  });

  const getFilteredOrders = () => {
    if (timeRange === "all") return ordersData;

    const now = new Date();
    const daysAgo = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365;
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    return ordersData.filter((order) => {
      if (!order.fechaCreacion) return false;
      const orderDate = new Date(order.fechaCreacion);
      return orderDate >= cutoffDate;
    });
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="statistics-dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard de Estadísticas</h2>
        <div className="dashboard-controls">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="all">Todo el tiempo</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="year">Último año</option>
          </select>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card total">
          <h3>Total de Órdenes</h3>
          <div className="stat-number">{filteredOrders.length}</div>
          <div className="stat-label">Órdenes registradas</div>
        </div>
        <div className="stat-card completed">
          <h3>Completadas</h3>
          <div className="stat-number">
            {filteredOrders.filter((o) => o.estado === "Completado").length}
          </div>
          <div className="stat-label">Trabajos finalizados</div>
        </div>
        <div className="stat-card pending">
          <h3>Pendientes</h3>
          <div className="stat-number">
            {filteredOrders.filter((o) => o.estado === "Pendiente").length}
          </div>
          <div className="stat-label">En espera</div>
        </div>
        <div className="stat-card in-progress">
          <h3>En Progreso</h3>
          <div className="stat-number">
            {filteredOrders.filter((o) => o.estado === "En Curso").length}
          </div>
          <div className="stat-label">Trabajando</div>
        </div>
      </div>

      <div className="technician-stats">
        <h3>📈 Rendimiento por Técnico</h3>
        <div className="tech-stats-grid">
          {technicianStats.map((tech, index) => (
            <div key={index} className="tech-stat-card">
              <div className="tech-header">
                <span className="tech-icon">{tech.icon}</span>
                <h4>{tech.name}</h4>
              </div>
              <div className="tech-metrics">
                <div className="metric">
                  <span className="metric-label">Total Órdenes:</span>
                  <span className="metric-value">{tech.totalOrders}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Completadas:</span>
                  <span className="metric-value completed">
                    {tech.completedOrders}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Eficiencia:</span>
                  <span className="metric-value efficiency">
                    {tech.efficiency}%
                  </span>
                </div>
              </div>
              <div className="tech-orders">
                <h5>Órdenes Recientes:</h5>
                <div className="recent-orders">
                  {tech.orders.slice(0, 3).map((order, orderIndex) => (
                    <div key={orderIndex} className="order-item">
                      <span className="order-client">{order.cliente}</span>
                      <span
                        className={`order-status ${order.estado
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.estado}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-chart">
        <h3>📊 Progreso General</h3>
        <div className="progress-bars">
          <div className="progress-item">
            <div className="progress-label">Completadas</div>
            <div className="progress-bar">
              <div
                className="progress-fill completed"
                style={{
                  width: `${
                    totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="progress-percentage">
              {totalOrders > 0
                ? Math.round((completedOrders / totalOrders) * 100)
                : 0}
              %
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">En Progreso</div>
            <div className="progress-bar">
              <div
                className="progress-fill in-progress"
                style={{
                  width: `${
                    totalOrders > 0 ? (inProgressOrders / totalOrders) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="progress-percentage">
              {totalOrders > 0
                ? Math.round((inProgressOrders / totalOrders) * 100)
                : 0}
              %
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Pendientes</div>
            <div className="progress-bar">
              <div
                className="progress-fill pending"
                style={{
                  width: `${
                    totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="progress-percentage">
              {totalOrders > 0
                ? Math.round((pendingOrders / totalOrders) * 100)
                : 0}
              %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;

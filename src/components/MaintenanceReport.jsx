import React from "react";

const MaintenanceReport = ({ order, onClose }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Formatear fechas de la orden
  const formatOrderDate = (dateString) => {
    if (!dateString) return "No especificada";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const generateDOCReport = () => {
    const reportContent = `
REPORTE DE MANTENIMIENTO Y REPARACIÓN
=====================================

Fecha del Reporte: ${formattedDate}
Hora del Reporte: ${formattedTime}

INFORMACIÓN DEL CLIENTE:
- Nombre: ${order.cliente}
- Teléfono: ${order.telefono}
- Dirección: ${order.direccion}

INFORMACIÓN DEL EQUIPO:
- Equipo: ${order.equipo}
- Número de Serie: ${order.serial || "No especificado"}

TÉCNICO RESPONSABLE:
- Nombre: ${order.tecnico || "No asignado"}

DESCRIPCIÓN DE LA FALLA:
${order.falla}

CRONOLOGÍA DEL TRABAJO:
- Fecha de creación de orden: ${formatOrderDate(order.fechaCreacion)}
- Fecha de inicio del trabajo: ${formatOrderDate(order.fechaActualizacion)}
- Fecha de finalización: ${formatOrderDate(order.fechaFinalizacion)}
- Estado final: ${order.estado}

TRABAJO REALIZADO:
• El equipo ha sido reparado y está funcionando correctamente.
• Se realizaron las pruebas necesarias para verificar el funcionamiento.
• Se completó la reparación según la descripción de la falla reportada.

OBSERVACIONES:
• Se recomienda realizar mantenimiento preventivo cada 6 meses.
• Se sugiere mantener el equipo en un ambiente adecuado para su funcionamiento.
• El cliente ha verificado que el equipo funciona correctamente.

FIRMAS:
_________________                    _________________
Técnico Responsable                  Cliente
${order.tecnico || "_________________"}                     ${order.cliente}

Fecha: ${formattedDate}
Hora: ${formattedTime}

Este documento certifica que el trabajo de mantenimiento y reparación ha sido completado satisfactoriamente.

--- FIN DEL REPORTE ---
    `;

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Reporte_Mantenimiento_${
      order.cliente
    }_${formattedDate.replace(/\//g, "-")}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("Reporte DOC generado y descargado exitosamente");
  };

  const generateHTMLReport = () => {
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reporte de Mantenimiento - ${order.cliente}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h3 {
            color: #007bff;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          .info-item {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
          }
          .info-item strong {
            color: #333;
          }
          .signature-section {
            margin-top: 40px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .signature-box {
            text-align: center;
            border-top: 1px solid #333;
            padding-top: 10px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>REPORTE DE MANTENIMIENTO Y REPARACIÓN</h1>
          <p><strong>Fecha:</strong> ${formattedDate} | <strong>Hora:</strong> ${formattedTime}</p>
        </div>

        <div class="section">
          <h3>INFORMACIÓN DEL CLIENTE</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Cliente:</strong> ${order.cliente}
            </div>
            <div class="info-item">
              <strong>Teléfono:</strong> ${order.telefono}
            </div>
            <div class="info-item">
              <strong>Dirección:</strong> ${
                order.direccion || "No especificada"
              }
            </div>
            <div class="info-item">
              <strong>Equipo:</strong> ${order.equipo}
            </div>
            <div class="info-item">
              <strong>Número de Serie:</strong> ${
                order.serial || "No especificado"
              }
            </div>
            <div class="info-item">
              <strong>Especialidad del Servicio:</strong> ${
                order.especialidad || "No especificada"
              }
            </div>
          </div>
        </div>

        <div class="section">
          <h3>INFORMACIÓN DEL EQUIPO</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Equipo:</strong> ${order.equipo}
            </div>
            <div class="info-item">
              <strong>Número de Serie:</strong> ${
                order.serial || "No especificado"
              }
            </div>
          </div>
        </div>

        <div class="section">
          <h3>TÉCNICO RESPONSABLE</h3>
          <div class="info-item">
            <strong>Nombre:</strong> ${order.tecnico || "No asignado"}
          </div>
        </div>

        <div class="section">
          <h3>DESCRIPCIÓN DE LA FALLA</h3>
          <p>${order.falla}</p>
        </div>

        <div class="section">
          <h3>TRABAJO REALIZADO</h3>
          <div class="work-details">
            ${
              order.observaciones
                ? `
              <div class="observations-section">
                <h4>Observaciones del Técnico:</h4>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; margin: 10px 0;">
                  ${order.observaciones}
                </p>
              </div>
            `
                : `
              <ul>
                <li>Diagnóstico del problema reportado</li>
                <li>Análisis técnico del equipo</li>
                <li>Reparación o mantenimiento realizado</li>
                <li>Pruebas de funcionamiento</li>
                <li>Verificación de la solución</li>
              </ul>
            `
            }
          </div>
        </div>

        <div class="section">
          <h3>CRONOLOGÍA DEL TRABAJO</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Fecha de creación de orden:</strong> ${formatOrderDate(
                order.fechaCreacion
              )}
            </div>
            <div class="info-item">
              <strong>Fecha de inicio del trabajo:</strong> ${formatOrderDate(
                order.fechaActualizacion
              )}
            </div>
            <div class="info-item">
              <strong>Fecha de finalización:</strong> ${formatOrderDate(
                order.fechaFinalizacion
              )}
            </div>
            <div class="info-item">
              <strong>Estado final:</strong> ${order.estado}
            </div>
          </div>
        </div>

        <div class="section">
          <h3>OBSERVACIONES</h3>
          <ul>
            <li>Se recomienda realizar mantenimiento preventivo cada 6 meses.</li>
            <li>Se sugiere mantener el equipo en un ambiente adecuado para su funcionamiento.</li>
            <li>El cliente ha verificado que el equipo funciona correctamente.</li>
          </ul>
        </div>

        <div class="signature-section">
          <div class="signature-box">
            <p>_________________</p>
            <strong>Técnico Responsable</strong><br>
            ${order.tecnico || "_________________"}
          </div>
          <div class="signature-box">
            <p>_________________</p>
            <strong>Cliente</strong><br>
            ${order.cliente}
          </div>
        </div>

        <div class="footer">
          <p>Este documento certifica que el trabajo de mantenimiento y reparación ha sido completado satisfactoriamente.</p>
          <p>Fecha: ${formattedDate} | Hora: ${formattedTime}</p>
        </div>

        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Imprimir Reporte
          </button>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(reportHTML);
    newWindow.document.close();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(41, 39, 39)",
          border: "2px solid white",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "450px",
          width: "90%",
          color: "white",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#17a2b8", marginTop: 0 }}>
          Generar Reporte de Mantenimiento
        </h3>
        <p>
          Selecciona el formato del reporte para{" "}
          <strong>{order.cliente}</strong>:
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={generateHTMLReport}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            📄 Generar HTML (Imprimible)
          </button>

          <button
            onClick={generateDOCReport}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            📝 Generar DOC
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "20px",
          }}
        >
          Cancelar
        </button>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: "0 0 10px 0" }}>
            <strong>El reporte incluirá:</strong>
          </p>
          <ul style={{ textAlign: "left", margin: "0", paddingLeft: "20px" }}>
            <li>Información completa del cliente</li>
            <li>Detalles del equipo reparado</li>
            <li>Descripción de la falla</li>
            <li>Trabajo realizado</li>
            <li>Fecha y hora de finalización</li>
            <li>Espacios para firmas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceReport;

export const getWorkOrders = async () => {
  try {
    // Petición GET al backend (Render)
    const response = await fetch(
      "https://mision3intermedio.onrender.com/api/work-orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Aquí podrías agregar más cabeceras si lo necesitas, como autorización
          // 'Authorization': 'Bearer TU_TOKEN'
        },
      }
    );

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("No se pudo obtener la información");
    }

    // Convertimos la respuesta a un objeto
    const result = await response.json();

    // Devolvemos los datos en una estructura { data: ... }
    return { data: result };
  } catch (error) {
    // Si ocurre un error, lo enviamos como una Promesa rechazada
    return Promise.reject(error);
  }
};

export const createWorkOrder = async (workOrder) => {
  try {
    const response = await fetch(
      "https://mision3intermedio.onrender.com/api/work-orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workOrder),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear la orden de trabajo");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWorkOrderbyId = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/work-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la orden de trabajo");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteWorkOrder = async (id) => {
  try {
    const response = await fetch(
      `https://mision3intermedio.onrender.com/api/work-orders/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la orden de trabajo");
    }

    return { data: { message: "Orden de trabajo eliminada exitosamente" } };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateWorkOrder = async (id, workOrder) => {
  try {
    const response = await fetch(
      `https://mision3intermedio.onrender.com/api/work-orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workOrder),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la orden de trabajo");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};





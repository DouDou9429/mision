import { useEffect, useState } from "react";
import { getWorkOrders } from "../api/workOrders";

export const useWorkOrders = () => {
  // creación de estados de la solicitud
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // llamado a mi función de API
  const getWorkOrdersFunct = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getWorkOrders();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkOrdersFunct();
  }, []);

  return { data, loading, error, getWorkOrdersFunct };
};

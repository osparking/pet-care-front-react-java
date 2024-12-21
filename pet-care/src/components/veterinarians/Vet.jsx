import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Vet = () => {
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { vetId } = useParams();
  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await getUserById(vetId);
      setVet(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };
  return <div>Vet</div>;
};

export default Vet;

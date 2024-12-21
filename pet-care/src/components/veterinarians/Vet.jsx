import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Vet = () => {
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { vetId } = useParams();

  return <div>Vet</div>;
};

export default Vet;

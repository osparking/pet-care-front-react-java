import React from "react";
import { getSpecializations } from "../user/UserService";

const VetSpecChart = () => {
  const [vetSpecials, setVetSpecials] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const readSpecials = async () => {
      try {
        // 수의사 전문분야 통계 읽기 - 서비스 함수 사용
        const response = await getSpecializations();
        const rawSpecials = response.data;
        console.log("전문분야: ", response.data);
      } catch (error) {
        console.error("전문분야 채취 오류:", error.message);
        setErrorMessage("전문분야 채취 오류:" + error.message);
      }
    };
  });

  return <div></div>;
};

export default VetSpecChart;

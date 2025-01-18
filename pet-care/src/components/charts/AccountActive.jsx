import React from "react";
import { getUserActivenessStat } from "../user/UserService";

const AccountActive = () => {
  const [accountData, setAccountData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAcccountTypeActStat = async () => {
      try {
        const result = await getUserActivenessStat();
        const userActivenessStat = result.data;
        console.log("before flat map: " + result.data);
        // 후단 근본 자료를 차트용 자료로 변형
        const accountData = Object.entries(userActivenessStat).flatMap(
          ([status, counts]) => [
            {
              name: "활성인 팻주인",
              value: status === "Enabled" ? counts.PATIENT : 0,
              color: "#d26161",
            },
            {
              name: "비활성 팻주인",
              value: status === "Enabled" ? 0 : counts.PATIENT,
              color: "#926262",
            },
            {
              name: "활성인 수의사",
              value: status === "Enabled" ? counts.VET : 0,
              color: "#2f6a32",
            },
            {
              name: "비활성 수의사",
              value: status === "Enabled" ? 0 : counts.VET,
              color: "#557a56",
            },
          ]
        );
        setAccountData(accountData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAcccountTypeActStat();
  }, []);

  return <div>AccountActive</div>;
};

export default AccountActive;

import React from "react";
import { getUserActivenessStat } from "../user/UserService";

const AccountActive = () => {
  const [accountData, setAccountData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAcccountTypeActStat  = async () => {
        try {
          const result = await getUserActivenessStat();
          const userActivenessStat = result.data;

        } catch (error) {
          setErrorMessage(error.message);
        }
      };
      getAcccountTypeActStat();      
  }, []);

  return <div>AccountActive</div>;
};

export default AccountActive;

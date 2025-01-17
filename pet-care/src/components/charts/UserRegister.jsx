import React, { useState } from "react";
import { getUserByMonthType } from "../user/UserService";

const UserRegister = () => {
  const [userStat, setUserStat] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getUserStat = async () => {
      try {
        const response = await getUserByMonthType();
        const userStat = await response.data;
        console.log("user stat:", userStat);
      } catch (err) {
        setErrorMessage(err.message)
      }
    };
    getUserStat();
  }, []);

  return <div>UserRegister</div>;
};

export default UserRegister;

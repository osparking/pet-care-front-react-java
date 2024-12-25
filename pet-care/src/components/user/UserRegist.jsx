import React from "react";

const UserRegist = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    userType: "",
    specialty: "",
  });
  return <div>UserRegist</div>;
};

export default UserRegist;

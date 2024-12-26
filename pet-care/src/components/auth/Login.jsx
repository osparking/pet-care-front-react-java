import React from "react";

const Login = () => {
  const [creden, setCreden] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCreden({ ...creden, [e.target.name]: e.target.value });
  };

  return <div>Login</div>;
};

export default Login;

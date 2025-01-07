import { useEffect, useState } from "react";

const useColorMapping = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setColors({
      "진료 중": rootStyle.getPropertyValue("--color-on-going"),
    });
  }, []);

  return colors;
};

export default use;

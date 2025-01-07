import { useEffect, useState } from "react";

const useColorMapping = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setColors({
      "진료 중": rootStyle.getPropertyValue("--color-on-going"),
      "임박함": rootStyle.getPropertyValue("--color-up-coming"),
      "완료됨": rootStyle.getPropertyValue("--color-completed"),
      "거부됨": rootStyle.getPropertyValue("--color-not-approved"),
      "취소됨": rootStyle.getPropertyValue("--color-cancelled"),
      "승인대기": rootStyle.getPropertyValue(
        "--color-waiting-for-approval"
      ),
      "보류 중": rootStyle.getPropertyValue("--color-pending"),
      "승인됨": rootStyle.getPropertyValue("--color-approved"),
      default: rootStyle.getPropertyValue("--color-default"),
    });
  }, []);

  return colors;
};

export default useColorMapping;

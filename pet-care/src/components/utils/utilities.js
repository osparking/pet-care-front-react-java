import { format } from "date-fns";
import { useEffect, useState } from "react";

export const useAlertWithTimeout = (
  initialVisibility = false,
  duration = 10000
) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => setIsVisible(false), duration);
    }
    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  return [isVisible, setIsVisible];
};

export const dateTimeFormatter = (date, time) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const formattedTime = format(time, "HH:mm");

  return { formattedDate, formattedTime };
};

export const UserType = {
  PATIENT: "PATIENT",
  VET: "VET",
};

export const generateColor = (specName) => {
  // 기본 값 부여
  if (typeof specName !== "string" || specName.length === 0) {
    return "#8884d8"; // 군청색
  }

}
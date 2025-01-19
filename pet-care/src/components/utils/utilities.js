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

  // 해쉬 코드 생성 - 전문분야 문자열을 근거로 함
  let hash = 0;
  for (let i = 0; i < hash.length; i++) {
    const char = specName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // 0 ~ 359 범위 중 하나의 값을 hue 로 사용
  // saturation: 70, lightness: 50 - HSL 축약어.
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;

}
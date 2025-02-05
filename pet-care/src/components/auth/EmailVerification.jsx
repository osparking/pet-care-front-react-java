import React, { useState } from "react";
import verifyEmail from "./AuthService";

const EmailVerification = () => {
  const [verifyMsg, setVerifyMsg] = useState("이메일 검증 중입니다...");
  const [alertType, setAlertType] = useState("alert-info");
  const [isProcessing, setIsProcessing] = useState(false);

  const verify_email = async (token) => {
    setIsProcessing(true);
    try {
      const response = verifyEmail(token);
      switch (response.message) {
        case "계정 활성화됨":
          setVerifyMsg("이메일 검증이 성공하여 로그인이 가능합니다.");
          setAlertType("alert-success");
          break;
        case "검증된 토큰":
          setVerifyMsg("이메일 검증이 이미 완료된 바 있습니다.");
          setAlertType("alert-info");
          break;
        default:
          setVerifyMsg("이메일 검증 중 오류가 발생하였습니다.");
          setAlertType("alert-danger");
          break;
      }
      /*
        TOKEN_EXPIRED = "토큰 기한 만료";
        */
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;

        if (message && message === "토큰 기한 만료 ") {
          setVerifyMsg("기한이 만료된 토큰입니다.");
          setAlertType("alert-warning");
        } else {
          console.error("message: ", message);
          setVerifyMsg("잘못된 이메일 검증 링크입니다.");
          setAlertType("alert-danger");
        }
      }
    }
  };

  return <div></div>;
};

export default EmailVerification;

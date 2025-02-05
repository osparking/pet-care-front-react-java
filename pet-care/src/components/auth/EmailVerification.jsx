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
          break;
      }
      /*
        TOKEN_VALIDATED = "계정 활성화됨";
        {TOKEN_VALI_ERROR = "토큰 검증 오류";
        TOKEN_EXPIRED = "토큰 기한 만료";
        TOKEN_IS_VALID = "토큰 아직 유용함";
        TOKEN_SAVED = "토큰 저장 성공";
        */
    } catch (error) {
      console.error("오류:", error);
    }
  };

  return <div></div>;
};

export default EmailVerification;

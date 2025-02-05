import React, { useState } from "react";

const EmailVerification = () => {
  const [verifyMsg, setVerifyMsg] = useState("이메일 검증 중입니다...");
  const [alertType, setAlertType] = useState("alert-info");
  const [isProcessing, setIsProcessing] = useState(false);

  return <div></div>;
};

export default EmailVerification;

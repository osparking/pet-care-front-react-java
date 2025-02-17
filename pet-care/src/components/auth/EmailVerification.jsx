import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProcessSpinner from "../common/ProcessSpinner";
import { resendEmail, verifyEmail } from "./AuthService";

const EmailVerification = () => {
  const [verifyMsg, setVerifyMsg] = useState("이메일 검증 중입니다...");
  const [alertType, setAlertType] = useState("alert-info");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [email, setEmail] = useState("");

  const requestResend = async () => {
    try {
      await resendEmail(email);
      setVerifyMsg("이메일 재 전송이 요청되었습니다.");
      setTokenExpired(false);
      setAlertType("alert-success");
    } catch (error) {
      setVerifyMsg("재 전송 요청 처리 오류 발생!");
      setAlertType("alert-danger");
    }
  };

  const verify_email = async (token) => {
    setIsProcessing(true);
    try {
      const response = await verifyEmail(token);

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
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        setEmail(error.response.data.data);
        setAlertType("alert-danger");
        if (message === "토큰 기한 만료") {
          setVerifyMsg("계정 등록 때 발급된 토큰이 만료되었습니다.");
          setAlertType("alert-warning");
          setTokenExpired(true);
        } else {
          setVerifyMsg(message);
        }
      } else {
        setVerifyMsg("서버 연결 오류가 발생하였습니다.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  var called = false;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      if (!called) {
        called = true;
        verify_email(token);
      }
    } else if (!token) {
      setVerifyMsg("토큰이 제출되지 않았습니다.");
      setAlertType("alert-danger");
    }
  }, []);

  return (
    <div className="d-flex justify-content-center mt-lg-5">
      {isProcessing ? (
        <ProcessSpinner message="요청을 처리 중이니 기다려 주십시오..." />
      ) : (
        <div className="col-12 col-md-6">
          <div className={`alert ${alertType}`} role="alert">
            {verifyMsg}&nbsp;&nbsp;
            {tokenExpired && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={requestResend}
              >
                토큰 재발급 요청
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;

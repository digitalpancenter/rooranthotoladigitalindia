import React, { useState } from "react";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";

const PasswordResetFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const goToOtp = (email) => {
    setEmail(email);
    setStep(2);
  };

  const goToReset = () => {
    setStep(3);
  };

  return (
    <>
      {step === 1 && <SendOtp onNext={goToOtp} />}
      {step === 2 && <VerifyOtp email={email} onVerified={goToReset} />}
      {step === 3 && <ResetPassword email={email} />}
    </>
  );
};

export default PasswordResetFlow;

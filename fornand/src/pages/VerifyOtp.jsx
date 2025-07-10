import React, { useState } from "react";
import axios from "axios";

const VerifyOtp = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/password-reset/verify-otp", {
        email,
        otp,
      });
      setMsg(res.data.message);
      onVerified();
    } catch (err) {
      setMsg(err.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify} className="bg-green-600 text-white w-full p-2 rounded">
        Verify
      </button>
      {msg && <p className="mt-2 text-center">{msg}</p>}
    </div>
  );
};

export default VerifyOtp;

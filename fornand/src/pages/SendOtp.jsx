import React, { useState } from "react";
import axios from "axios";

const SendOtp = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/password-reset/send-otp", { email });
      setMsg(res.data.message);
      onNext(email);
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to send OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-black rounded shadow">
      <h2 className="text-xl font-bold mb-4">Send OTP</h2>
      <input
        type="email"
        className="w-full border p-2 mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSend} className="bg-blue-600 text-white w-full p-2 rounded">
        Send OTP
      </button>
      {msg && <p className="mt-2 text-center">{msg}</p>}
    </div>
  );
};

export default SendOtp;

import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/password-reset/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2 mb-2"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border p-2 mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleReset} className="bg-purple-600 text-white w-full p-2 rounded">
        Reset Password
      </button>
      {msg && <p className="mt-2 text-center">{msg}</p>}
    </div>
  );
};

export default ResetPassword;

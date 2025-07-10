// Adminrommchats.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Adminrommchats = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    toEmail: "",
    message: "",
  });

  const [photo, setPhoto] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("toEmail", formData.toEmail);
      formDataToSend.append("message", formData.message);
      if (photo) formDataToSend.append("photo", photo);
      if (pdf) formDataToSend.append("pdf", pdf);

      const res = await fetch("http://localhost:5000/api/email/send-email", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();

      if (!res.ok || !result.success) throw new Error(result.error);

      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        toEmail: "",
        message: "",
      });
      setPhoto(null);
      setPdf(null);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("❌ Error sending email:", err);
      alert("❌ Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Inquiry Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
          <input name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile" className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
          <input name="toEmail" type="email" value={formData.toEmail} onChange={handleChange} required placeholder="Recipient Email" className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
          <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
          <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Message" className="w-full px-4 py-2 border border-gray-300 rounded text-black" />

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {isLoading ? "Please wait..." : "Send Message"}
          </button>
        </form>

        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
              <div className="text-green-500 text-5xl mb-4">✔️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-4">Your message has been sent to the recipient.</p>
              <button onClick={() => setShowSuccessModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminrommchats;

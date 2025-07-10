import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const Chats = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [photo, setPhoto] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // ✅ init navigate
  const token = localStorage.getItem("token"); // ✅ get token

  // ✅ Token protection
  useEffect(() => {
    if (!token) {
      navigate("/login"); // 🔒 redirect if not logged in
    }
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
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      if (photo) formDataToSend.append("photo", photo);
      if (pdf) formDataToSend.append("pdf", pdf);

      const res = await fetch("http://localhost:5000/api/email/send-email", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Email send failed");
      }

      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="Chats" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl relative">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Chat / Inquiry Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded text-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Mobile
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Upload Photo (JPEG/PNG)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Upload PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Send Message"}
            </button>
          </form>

          {/* ✅ Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <div className="text-green-500 text-5xl mb-4">✔️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Message Sent successfully.
                </h3>
                <p className="text-gray-600 mb-4">
                  You will receive the solution via email within 24 to 48 hours
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* 🔄 Loading Modal */}
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <div className="text-blue-500 text-4xl mb-4 animate-bounce">⏳</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Please wait...</h3>
                <p className="text-gray-600">Your message is being sent.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;

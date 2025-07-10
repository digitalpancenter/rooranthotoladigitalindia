import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    photo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("API error:", err);
        alert("Failed to load users");
      });
  }, [token]);

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      address: user.address || "",
      password: "", // Empty for security
      photo: user.photo || "",
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file); // base64 encode
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/api/auth/user/${editingUser}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("User updated successfully");
        setEditingUser(null);
        window.location.reload();
      })
      .catch((err) => alert("Failed to update user"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axios
      .delete(`http://localhost:5000/api/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("User deleted");
        window.location.reload();
      })
      .catch(() => alert("Failed to delete user"));
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <table className="min-w-full bg-white text-black rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Address</th>
            <th className="p-2">Password</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">
                {u.photo ? (
                  <img
                    src={u.photo}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.mobile || "-"}</td>
              <td className="p-2">{u.address || "-"}</td>
              <td className="p-2">{u.password || "-"}</td> {/* ⚠️ Use only for testing */}
              <td className="p-2">{u.role}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="text-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-red-600"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-4">Edit User</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-2 text-black"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 text-black"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Mobile"
            className="w-full p-2 mb-2 text-black"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 mb-2 text-black"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 text-black"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 mb-2 text-white"
            onChange={handlePhotoUpload}
          />
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Preview"
              className="w-16 h-16 rounded mb-2"
            />
          )}

          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;

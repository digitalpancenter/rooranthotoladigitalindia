import React, { useEffect, useState } from "react";

const AdminRoomAvailable = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    ownerName: "",
    textMessage: "",
    status: "active",
  });
  const [editId, setEditId] = useState(null);

  // Fetch all room data
  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/room-availability");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save or Update
  const handleSubmit = async () => {
    const url = editId
      ? `http://localhost:5000/api/room-availability/${editId}`
      : "http://localhost:5000/api/room-availability";

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchData();
      setForm({ ownerName: "", textMessage: "", status: "active" });
      setEditId(null);
    } else {
      alert("Error saving data");
    }
  };

  // Set edit
  const handleEdit = (item) => {
    setForm({
      ownerName: item.ownerName,
      textMessage: item.textMessage,
      status: item.status || "active",
    });
    setEditId(item._id);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this record?");
    if (!confirm) return;

    await fetch(`http://localhost:5000/api/room-availability/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-8 gap-10">
      {/* Left Input Form */}
      <div className="w-1/3 space-y-4">
        <h2 className="text-2xl font-bold">
          {editId ? "Edit Room Info" : "Add Room Info"}
        </h2>

        <input
          type="text"
          name="ownerName"
          value={form.ownerName}
          onChange={handleChange}
          placeholder="Owner Name"
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
        />

        <textarea
          name="textMessage"
          value={form.textMessage}
          onChange={handleChange}
          placeholder="Text Message"
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
        ></textarea>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="active">Activate</option>
          <option value="inactive">Deactivate</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      {/* Right Data List */}
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Room Entries</h2>

        {data.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 border border-gray-700 rounded p-4 relative"
          >
            <p>
              <strong>Owner:</strong> {item.ownerName}
            </p>
            <p>
              <strong>Message:</strong> {item.textMessage}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  item.status === "active" ? "text-green-400" : "text-red-400"
                }
              >
                {item.status}
              </span>
            </p>

            <div className="absolute top-2 right-2 flex gap-3">
              <button onClick={() => handleEdit(item)} className="text-yellow-400">
                ✏️
              </button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoomAvailable;

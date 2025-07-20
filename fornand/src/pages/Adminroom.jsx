import React from "react";
import { useNavigate } from "react-router-dom";

const AdminRoom = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Room Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoomButton
          label="All Room Users"
          onClick={() => navigate("/admin/all-users")}
        />

        <RoomButton
          label="Add Room User"
          onClick={() => navigate("/Signup")}
        />

        <RoomButton
          label="All Room Adminrommchats"
          onClick={() => navigate("/admin/Adminrommchats")}
        />

     <RoomButton
  label="All Room Rent"
  onClick={() => navigate("/admin/room-rents")}
/>

        <RoomButton
          label="Room Rent Handover"
          onClick={() => navigate("/admin/Adminroom-handover")}
        />

  <RoomButton
  label="Create Room Rent"
  onClick={() => navigate("/admin/room-confirmation")}
/>


      <RoomButton
       label="Room Available"
       onClick={() => navigate("/admin/room-available")}
     />


        <RoomButton
          label="Room Close"
          onClick={() => navigate("/admin/room-close")}
        />

        <RoomButton
          label="Add Room"
          onClick={() => navigate("/admin/room-add-new")}
        />
      </div>
    </div>
  );
};

const RoomButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-5 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
  >
    {label}
  </button>
);

export default AdminRoom;

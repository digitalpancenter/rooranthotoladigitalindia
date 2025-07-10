import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";


// Pages
import Hero from "./components/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Adminroomavailable from "./pages/Adminroom-available";
import AdminRoom from "./pages/Adminroom";
import AdminAllUsers from "./pages/AdminAllUsers";
import AdminRoomRents from "./pages/adminroom-rents";
import AdminProfile from "./pages/AdminProfile";
import AdminRoomConfirmation from "./pages/AdminRoomConfirmation";
import Adminroomhandover from "./pages/Adminroom-handover";
import Roomavailable from "./pages/room-available";
import RoomRents from "./pages/roomrents";
import RoomRanthandover from "./pages/roomranthandover";
import Rooms from "./pages/Rooms";
import UsersData from "./pages/usersdata";
import MyProfile from "./pages/MyProfile";
import RoomCheck from "./pages/roomcheck"; // ✅ Corrected import
import RoomClose from "./pages/RoomClose"; // 👈 make sure spelling is correct
import RetailerDashboard from "./pages/RetailerDashboard";
import RoomConfirmation from "./pages/RoomConfirmation";
import Chats from "./pages/chats";
import AdminRoomClose from "./pages/AdminRoomClose";
import Adminrommchats from "./pages/Adminrommchats";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetFlow from "./pages/PasswordResetFlow";




export default function App() {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<MainLayout><Hero /></MainLayout>} />
      <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/retailer" element={<MainLayout><RetailerDashboard /></MainLayout>} />
      <Route path="/rooms" element={<MainLayout><Rooms /></MainLayout>} />
      <Route path="/roomrents" element={<MainLayout><RoomRents /></MainLayout>} />
      <Route path="/usersdata" element={<MainLayout><UsersData /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><MyProfile /></MainLayout>} />
      <Route path="/roomranthandover" element={<MainLayout><RoomRanthandover /></MainLayout>} />
      <Route path="/room-available" element={<MainLayout><Roomavailable /></MainLayout>} />
      <Route path="/room-confirmation" element={<MainLayout><RoomConfirmation /></MainLayout>} />
      <Route path="/roomcheck" element={<MainLayout><RoomCheck /></MainLayout>} /> {/* ✅ Fixed */}
      <Route path="/roomclose" element={<MainLayout><RoomClose /></MainLayout>} />
      <Route path="/chats" element={<MainLayout><Chats /></MainLayout>} />
      <Route path="/SendOtp" element={<MainLayout><SendOtp /></MainLayout>} />
      <Route path="/VerifyOtp" element={<MainLayout><VerifyOtp /></MainLayout>} />
      <Route path="/ResetPassword" element={<MainLayout><ResetPassword /></MainLayout>} />
      <Route path="/PasswordResetFlow" element={<MainLayout><PasswordResetFlow /></MainLayout>} />


      {/* ✅ Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="room-available" element={<Adminroomavailable />} />
        <Route path="AdminAddUsers" element={<AdminRoom />} />
        <Route path="all-users" element={<AdminAllUsers />} />
        <Route path="room-rents" element={<AdminRoomRents />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="room-confirmation" element={<AdminRoomConfirmation />} />
        <Route path="Adminroom-handover" element={<Adminroomhandover />} />
        <Route path="Adminroom-handover" element={<AdminRoomClose />} />
        <Route path="create-room-rent" element={<div className="text-white p-10">Create Room Rent Page</div>} />
        <Route path="room-delete" element={<div className="text-white p-10">Room Delete Page</div>} />
      <Route path="room-close" element={<AdminRoomClose />} />
      <Route path="Adminrommchats" element={<Adminrommchats />} />

      </Route>

      {/* ❌ 404 Fallback */}
      <Route
        path="*"
        element={
          <MainLayout>
            <div className="text-center text-2xl font-bold text-red-500 mt-10">
              404 - Page Not Found
            </div>
          </MainLayout>
        }
      />
    </Routes>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import BookAppointment from "./components/appointment/BookAppointment";
import EmailVerification from "./components/auth/EmailVerification";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import RootLayout from "./components/layouts/RootLayout";
import UserDashboard from "./components/user/UserDashboard";
import UserRegist from "./components/user/UserRegist";
import UserUpdate from "./components/user/UserUpdate";
import Vet from "./components/veterinarians/Vet";
import VetListing from "./components/veterinarians/VetListing";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* 인증이 불필요한 루트 */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<VetListing />} />
        <Route path="/veterinarian/:vetId/veterinarian" element={<Vet />} />
        <Route path="/register-user" element={<UserRegist />} />
        <Route path="/email_verify" element={<EmailVerification />} />

        {/* 인증이 필요한 루트 */}
        <Route path="/dashboard/:userId/user" element={<UserDashboard />} />
        <Route path="/update-user/:userId" element={<UserUpdate />} />
        <Route
          path="/appointments/create/:recipientId/:senderId"
          element={<BookAppointment />}
        />
        {/* 관리자 전용 루트 */}
        <Route path="/dashboard/:userId/admin" element={<AdminDashboard />} />
      </Route>
    )
  );
  return (
    <main className="">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;

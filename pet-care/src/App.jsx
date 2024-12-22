import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import BookAppointment from "./components/appointment/BookAppointment";
import Home from "./components/home/Home";
import RootLayout from "./components/layouts/RootLayout";
import VetListing from "./components/veterinarians/VetListing";
import Vet from "./components/veterinarians/Vet";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/doctors" element={<VetListing />} />
        <Route
          path="/appointments/create/:recipientId"
          element={<BookAppointment />}
        />
        <Route path="/veterinarian/:vetId/veterinarian" element={<Vet />} />
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

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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/doctors" element={<VetListing />} />
        <Route
          path="/book-appointment/:recipientId/new-appointment"
          element={<BookAppointment />}
        />
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

// App.tsx

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { isAuthenticated, isAdmin } from "./Auth/auth";
import Navbar from "./Components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import DestinationMenu from "./Pages/DestinationMenu/DestinationMenu";
import DestinationDetails from "./Pages/DestinationDetails/DestinationDetails";

import Category from "./Pages/Admin/Category/Category";
import Destinations from "./Pages/Admin/Destination/Destination";
import Profile from "./Pages/Admin/Profile/Profile";
import AddUser from "./Pages/Admin/AddUser/AddUser";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/Destinations"
            element={
              <>
                <Navbar />
                <DestinationMenu />
              </>
            }
          />
          <Route
            path="/DestinationDetails"
            element={
              <>
                <Navbar />
                <DestinationDetails />
              </>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/Destinations" element={<DestinationMenu />} />
          <Route path="/DestinationDetails" element={<DestinationDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                isAuthenticated() && isAdmin() ? (
                  <Destinations />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/AddUser" element={<AddUser />} />
          </Route>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

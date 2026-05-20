import { Route, Routes } from "react-router-dom";
import Home from "./parent_components/Home";
import AddHotel from "./parent_components/AddHotel";
import EditProperty from "./parent_components/EditProperty";
import ViewBookings from "./parent_components/ViewBookings";
import SearchHotel from "./parent_components/SearchHotel";

import EditRoomPage from "./child_components/EditRoomPage";
import CustomerSignUp from "./parent_components/CustomerSignUp";
import OwnerDash from "./parent_components/OwnerDash";
import OwnerSignUp from "./parent_components/OwnerSignUp";
import Payment from "./parent_components/Payment";
import SignIn from "./parent_components/SignIn";
import UserProfile from "./parent_components/UserProfile";
import ViewHotel from "./parent_components/ViewHotel";

import AdminDash from "./parent_components/AdminDash";
import AdminSignUp from "./parent_components/AdminSignUp";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/ownerSignUp" element={<OwnerSignUp />} />
      <Route path="/customerSignUp" element={<CustomerSignUp />} />
      <Route path="/signIn" element={<SignIn />} />

      <Route path="/search" element={<SearchHotel />} />
      <Route path="/viewHotel/:hotelId" element={<ViewHotel />} />
      <Route path="/ownerdash" element={<OwnerDash />} />
      <Route path="/editroom/:id" element={<EditRoomPage />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/payment/:bookingId" element={<Payment />} />

      <Route path="/addHotel" element={<AddHotel />} />
      
      <Route path="/editProperty/:hotelId" element={<EditProperty />} />
      <Route path="/viewBookings/:hotelId" element={<ViewBookings />} />



      <Route path="/adminSignUp" element={<AdminSignUp/>} />
      <Route path="/admindash" element={<AdminDash />} />
    </Routes>
  );
};

export default Routing;

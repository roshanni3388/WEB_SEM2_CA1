// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Mycomponent/Pages/Home';
import DataHome from './Mycomponent/Pages/DataHome';
import ContactPage from './Mycomponent/Pages/ContactPage';
import AdminLogin from './Mycomponent/AdminPages/AdminLogin';
import AdminPanel from './Mycomponent/AdminPages/AdminPanel';
import DashBoard from './Mycomponent/AdminPages/DashBoard';
import Signup from './Mycomponent/UserPages/Signup';
import Login2 from './Mycomponent/UserPages/Login2';
import UserPanel from './Mycomponent/UserPages/UserPanel';
import UserChangePassword from './Mycomponent/UserPages/UserChangePassword';
import AdminChangePassword from './Mycomponent/AdminPages/AdminChangePassword';
import UserMyProfile from './Mycomponent/UserPages/UserMyProfile';
import UserUpdateProfile from './Mycomponent/UserPages/UserUpdateProfile';
import ViewAllUser from './Mycomponent/AdminPages/ViewAllUser';
import AddFlight from './Mycomponent/AdminPages/AddFlight';
import ViewAllFlights from './Mycomponent/AdminPages/ViewAllFlights';
import UpdateFlight from './Mycomponent/AdminPages/UpdateFlight';
import UserDashBoard from './Mycomponent/UserPages/UserDashBoard';
import ViewUserFlights from './Mycomponent/UserPages/ViewUserFlights';
import ViewFlightDetails from './Mycomponent/UserPages/ViewFlightDetails';
import BookFlights from './Mycomponent/UserPages/BookFlights';
import ViewUserBookings from './Mycomponent/UserPages/ViewUserBookings';
import ViewBookingDetails from './Mycomponent/UserPages/ViewBookingDetails';
import ViewAllBooking from './Mycomponent/AdminPages/ViewAllBooking';
import UserBookingDetails from './Mycomponent/AdminPages/UserBookingDetails';
import PaymentPage from './Mycomponent/UserPages/PaymentPage';
import ViewAllContactAndFeedback from './Mycomponent/AdminPages/ViewAllContactAndFeedback';
import FrontContactPage from './Mycomponent/Pages/FrontContactPage';
import FrontViewFlights from './Mycomponent/Pages/FrontViewFlights';
import AddDestination from './Mycomponent/AdminPages/AddDestination';
import ViewDestination from './Mycomponent/AdminPages/ViewDestination';
import FrontDestinationPage from './Mycomponent/Pages/FrontDestinationPage';
import UpdateDestination from './Mycomponent/AdminPages/UpdateDestination';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} >
      <Route index element={<DataHome />}  /> 
      <Route path="contact"  element={<FrontContactPage/>}  />
      <Route path="signup"  element={<Signup />}  />
      <Route path="login"  element={<Login2 />}  />
      <Route path="adminLogin"  element={<AdminLogin />}  />
      <Route path="frontViewFlights"  element={<FrontViewFlights/>}  />
      <Route path="frontDestinationPage" element={<FrontDestinationPage/>}  /> 
      </Route>

      <Route path="/" element={<AdminPanel />} >
      <Route path="dashBoard" element={<DashBoard />}  /> 
      <Route path="adminChangePassword" element={<AdminChangePassword />}  /> 
      <Route path="viewAllUser" element={<ViewAllUser/>}  /> 
      <Route path="addFlight" element={<AddFlight/>}  /> 
      <Route path="viewAllFlight" element={<ViewAllFlights/>}  /> 
      <Route path="updateFlight" element={<UpdateFlight/>}  /> 
      <Route path="viewAllBooking" element={<ViewAllBooking/>}  /> 
      <Route path="userBookingDetails" element={<UserBookingDetails/>}  /> 
      <Route path="viewAllContactAndFeedback" element={<ViewAllContactAndFeedback/>}  /> 
      <Route path="addDestination" element={<AddDestination/>}  /> 
      <Route path="viewDestination" element={<ViewDestination/>}  /> 
      <Route path="updateDestination" element={<UpdateDestination/>}  /> 
   

      </Route>
      <Route path="/" element={<UserPanel />} >
      <Route path="userdashBoard" element={<UserDashBoard />}  /> 
      <Route path="userChangePassword" element={<UserChangePassword/>}  /> 
      <Route path="userMyProfile" element={<UserMyProfile/>}  /> 
      <Route path="userUpdateProfile" element={<UserUpdateProfile/>}  /> 
      <Route path="viewUserFlights" element={<ViewUserFlights/>}  /> 
      <Route path="viewFlightDetails" element={<ViewFlightDetails/>}  /> 
      <Route path="bookFlights" element={<BookFlights/>}  /> 
      <Route path="viewUserBookings" element={<ViewUserBookings/>}  /> 
      <Route path="viewBookingDetails" element={<ViewBookingDetails/>}  /> 
      <Route path="paymentPage" element={<PaymentPage/>}  /> 
      <Route path="userContact" element={<ContactPage/>}  /> 
      <Route path="userDestinationPage" element={<FrontDestinationPage/>}  /> 
      </Route>
   
    </Routes>
  </div>
  );
}

export default App;






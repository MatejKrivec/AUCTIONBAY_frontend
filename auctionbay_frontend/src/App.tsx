import { useState } from 'react'

//import './App.css'

import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';

import Signup from './pages/AuthPages/Signup';
import Login from './pages/AuthPages/Login';
import ResetPassword from './pages/AuthPages/ResetPassword';

import InitPage from './components/InitPage';
import HomePage from './pages/Home/HomePage';
import MainAuctions from './pages/Home/MainAuctions';
import MainProfile from './pages/Home/MainProfile';

import AddAuction from './pages/Home/Auctions/AddAuction';
import AuctionDetails from './pages/Home/Auctions/AuctionDetails';
import AuctionItem from './pages/Home/Auctions/AuctionItem';
import EditAuction from './pages/Home/Auctions/EditAuction';

import Bidding from './pages/Home/Profile/Bidding';
import MyAuctions from './pages/Home/Profile/MyAuctions';
import Won from './pages/Home/Profile/Won';

import ChangePassword from './pages/Home/ProfileSettings/ChangePassword';
import ChangeProfilePicture from './pages/Home/ProfileSettings/ChangeProfilePicture';
import LogOut from './pages/Home/ProfileSettings/LogOut';
import ProfileSettings from './pages/Home/ProfileSettings/ProfileSettings';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitPage />}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />

        <Route path="/me" element={<MainProfile/>}>
        <Route path="/auctions" element={<MainAuctions/>} />
        <Route path="/me/auction" element={<AddAuction/>} />
        <Route path="/me/auction/:id" element={<EditAuction/>} />
        <Route path="/auctions/:id/bid" element={<AuctionDetails/>} />
        <Route path="/me/update-password" element={<ChangePassword />} />
        </Route>
        <Route path="/me/settings" element={<ProfileSettings/>}>
          <Route path="/me/settings/change-profile-picture" element={<ChangeProfilePicture/>} />
          <Route path="/me/log-out" element={<LogOut/>} />
        </Route>
      </Routes>
    </Router> 
  )
}
export default App

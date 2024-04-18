import { ReactNode, useEffect, useState } from 'react'

//import './App.css'

import { BrowserRouter as Router, Route,Routes, Link, Navigate } from 'react-router-dom';

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
        <Route path="/" element={<InitPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route  element={<RouteGuard children={<HomePage/>} />}>
          {/* Define nested routes here */}
          <Route path="/me" element={<HomePage />} />
          <Route path="auctions" element={<MainAuctions />} />
          <Route path="auction" element={<AddAuction handleCancelAddClick={() => {}} />} />
          <Route path="auction/:id" element={<EditAuction handleCancleEditClick={() => {}} />} />
          <Route path="auctions/:id/bid" element={<AuctionDetails />} />
          <Route path="update-password" element={<ChangePassword onClose={() => {}} />} />
          <Route path="settings" element={<ProfileSettings onClose={() => {}} />} >
            <Route path="change-profile-picture" element={<ChangeProfilePicture onClose={() => {}} />} />
            <Route path="log-out" element={<LogOut handleProfileSettingsClosee={() => {}} />} />
          </Route>
        </Route>

        {/* Redirect to login if not logged in */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function RouteGuard({ children }: { children: React.ReactNode }) {

  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default App;
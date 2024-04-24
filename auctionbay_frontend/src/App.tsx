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
import AuctionItem from './pages/Home/Auctions/MyAuctionItem';
import EditAuction from './pages/Home/Auctions/EditAuction';

import Bidding from './pages/Home/Profile/Bidding';
import MyAuctions from './pages/Home/Profile/MyAuctions';
import Won from './pages/Home/Profile/Won';

import ChangePassword from './pages/Home/ProfileSettings/ChangePassword';
import ChangeProfilePicture from './pages/Home/ProfileSettings/ChangeProfilePicture';
import LogOut from './pages/Home/ProfileSettings/LogOut';
import ProfileSettings from './pages/Home/ProfileSettings/ProfileSettings';
import ProtectedRoute from './ProtectedRoute';
//import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />


        <Route element={<RouteGuard  />}>
          <Route path="/me" element={<HomePage />} />
        </Route> 
        

      {
      /*
      <ProtectedRoute path="/me" component={HomePage} />
      
      <Route path='/me' element={<HomePage/>}></Route>

        <Route path='/me/auction' element={<AddAuction handleCancelAddClick={function (): void {
          throw new Error('Function not implemented.');
        } }/>}></Route>

        <Route path='/me/auction/:id' element={<EditAuction handleCancleEditClick={function (): void {
          throw new Error('Function not implemented.');
        } } imageKey={null} auctionId={null}/>}></Route>
        
        <Route path='/me/update-password' element={<ChangePassword onClose={function (): void {
          throw new Error('Function not implemented.');
        } }/>}></Route>
*/}  
      {/* <Route path='/auctions/:id/bid' element={<AuctionDetails auction={undefined} currentPrice={0} onClose={function (): void {
          throw new Error('Function not implemented.');
        } }/>}></Route>*/}  

        <Route path='/auctions' element={<MainAuctions/>}></Route>
      </Routes>
    </Router>
  );
}

function RouteGuard() {

  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{<HomePage></HomePage>}</>;
}

export default App;
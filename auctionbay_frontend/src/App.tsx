
import { BrowserRouter as Router, Route,Routes,  Navigate } from 'react-router-dom';

import Signup from './pages/AuthPages/Signup';
import Login from './pages/AuthPages/Login';
import ResetPassword from './pages/AuthPages/ResetPassword';

import InitPage from './components/InitPage';
import HomePage from './pages/Home/HomePage';
import MainAuctions from './pages/Home/MainAuctions';


import AddAuction from './pages/Home/Auctions/AddAuction';


import ChangePassword from './pages/Home/ProfileSettings/ChangePassword';

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
          <Route path="/me/auction" element={<AddAuction handleCancelAddClick={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
       {/*<Route path="/me/auction/:id" element={
            <EditAuction 
              handleCancleEditClick={() => {  }}
              imageKey={null} // or your actual image key
              auctionId={null} // or your actual auction ID
              auctionName=""
              auctionDescription=""
              auctionEndDate=""
            />} 
          /> */}   
          <Route path="/me/update-password" element={< ChangePassword onClose={function (): void {
            throw new Error('Function not implemented.');
          } }/>} />
        {/*<Route path="/auctions/:id/bid" element={<AuctionDetails auction={auction}  currentPrice={0} onClose={() => { /* handle close  */}  
          <Route path='/auctions' element={<MainAuctions/>}></Route>
        </Route>  

        
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
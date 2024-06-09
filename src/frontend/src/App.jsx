
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
;
import Home from './pages/Home/Home';
import DeleteZone from './pages/DeleteZon/DeleteZone';
import AddZone from './pages/AddZone/AddZone';
import UpdateZone from './pages/UpdateZone/UpdateZone';
import Register from './pages/Register/Register';
import Login from './pages/login/login';
import Admin from './pages/Admin/Admin';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import User from './pages/User/User.jsx';
import UpdateUser from './pages/UpdateUser/UpdateUser.jsx';
import Custom_time from './pages/Custome_Time/Custom_time.jsx';
import Eventpage from './pages/EventPage/Eventpage.jsx';


function App() {

  const ProtectRoute=({children})=>{
    const {user}=useContext(AuthContext)

    if(!user)
      {
        return <Navigate to="/login"/>
      }
    if(user.isAdmin){
      return children;
    }
    alert("Not Authorized");
    return <Navigate to="/"/>
      
  }

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addZone' element={<ProtectRoute><AddZone/></ProtectRoute>}/>
      <Route path='/updateZone' element={<ProtectRoute><UpdateZone/></ProtectRoute>}/>
      <Route path='/deleteZone' element={<ProtectRoute><DeleteZone/></ProtectRoute>}/>
      <Route path='/custom_time' element={<Custom_time/>}></Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/eventpage' element={<Eventpage/>}/>
      <Route path='/admin' element={<ProtectRoute><Admin/></ProtectRoute>}/>
      <Route path='/user' element={<ProtectRoute><User/></ProtectRoute>}/>
      <Route path='/updateuser/:userId' element={<ProtectRoute><UpdateUser/></ProtectRoute>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

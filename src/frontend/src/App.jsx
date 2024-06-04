
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
      <Route path='/addZone' element={<AddZone/>}/>
      <Route path='/updateZone' element={<UpdateZone/>}/>
      <Route path='/deleteZone' element={<DeleteZone/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<ProtectRoute><Admin/></ProtectRoute>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

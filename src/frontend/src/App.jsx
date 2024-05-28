
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


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addZone' element={<AddZone/>}/>
      <Route path='/updateZone' element={<UpdateZone/>}/>
      <Route path='/deleteZone' element={<DeleteZone/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App


import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Custom from './pages/custom/Custom';
import Home from './pages/Home/Home';
import Updatepage from './pages/Updatepage/Updatepage';


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/custom' element={<Custom/>}/>
      <Route path='/update' element={<Updatepage/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

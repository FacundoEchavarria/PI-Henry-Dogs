//Styles
import './App.css';
//Components
import CreatePage from './components/CreatePage/CreatePage';
import Detail from './components/Detail/Detail';
import EditDog from './components/EditDog/EditDog';
import Favorites from './components/Favorites/Favorites';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';



//Library components
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { useEffect } from 'react';



function App() {

  const Navigate = useNavigate();
  const location = useLocation()

  useEffect(() =>{
    Navigate('/')
  }, [])

  return (
    <div className="App">
      {location.pathname === '/' ? null : <NavBar/>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/edit' element={<EditDog/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
      {location.pathname === '/' ? null : <Footer/>}
    </div>
  );
}

export default App;

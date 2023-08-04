//Styles
import './App.css';
//Components
import Detail from './components/Detail/Detail';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';

//Library components
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import CreateDog from './components/CreateDog/CreateDog';



function App() {

  const Navigate = useNavigate();
  const location = useLocation()

  useEffect(() =>{
    Navigate('/')
  }, [])

  return (
    <div className="App">
      {location.pathname === '/' ? null : <NavBar/>}
      {location.pathname === '/' ? null : <Footer/>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<CreateDog/>}/>
      </Routes>
      
    </div>
  );
}

export default App;

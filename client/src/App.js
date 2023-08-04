//Styles
import './App.css';
//Components
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';

//Library components
import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import CreateDog from './components/CreateDog/CreateDog';



function App() {

  const Navigate = useNavigate()

  useEffect(() =>{
    Navigate('/')
  }, [])

  return (
    <div className="App">
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

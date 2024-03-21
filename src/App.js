import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';

function App() {
  return (
    <>
     <Routes>
      <Route path={'/'} element={<Login/>}></Route>
      <Route path={'/register'} element={<Register/>}></Route>
      <Route path={'/home'} element={<Homepage/>}></Route>
     </Routes>
    </>
  );
}

export default App;

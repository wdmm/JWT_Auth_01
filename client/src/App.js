import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './components/Main';
import Singup from './components/Signup';
import Login from './components/Signin'; 

function App() {
  const user = localStorage.getItem("JWTToken");
  return (
    <Routes>
      {user && <Route path='/' exact element={<Main/>} />}
      <Route path='/signup' exact element={<Singup/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/' exact element={<Navigate replace to="/login"/>} />
    </Routes>
  );
}

export default App;
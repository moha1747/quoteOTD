import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './static/home';
import Dashboard from'./client/Dashboard'
import Saved from './client/Saved';
import Login from './static/authentication/login'
import Register from './static/authentication/register'

function App() {
  return (
    <BrowserRouter>
<Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signin' element={<Login />} />
        <Route path='/auth/signup' element={<Register />} />
        <Route path='/client'  element={<Dashboard />} />
        <Route path='/client/saved' element={<Saved />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;

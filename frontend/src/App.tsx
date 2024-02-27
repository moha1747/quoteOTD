import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './static/authentication';
import Home from './static/home';
import Dashboard from'./client/Dashboard'
import Saved from './client/Saved';
function App() {
  return (
    <BrowserRouter>
<Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/app'  element={<Dashboard />} />
        <Route path='/app/saved' element={<Saved />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;

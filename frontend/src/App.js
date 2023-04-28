import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import {Route,Router,Routes} from 'react-router-dom'
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div >
      <Routes>
      <Route path='/'  Component={Login}/>
      <Route path='/signup'  Component={SignUp}/>
      <Route path='/dashboard'  Component={Dashboard}/>
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home'
import Attendence from './pages/attendence';
import ADAttendence from './pages/ADattendence'
import Profile from './pages/profile';
import Marks from './pages/marks';
import AuthPage from './pages/Auth';
import ADmarks from './pages/ADmarks';
import Approval from './pages/Happrove';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path="/auth"
              element={!user ? <AuthPage/> : <Navigate to="/" />}
            />
            <Route 
              path="/"
              element={user ? <Home/> : <Navigate to="/auth" />}
            />
            <Route 
              path="/attendence"
              element={user ? (user.type === 'Student' ? <Attendence/> : <ADAttendence/>) : <Navigate to="/auth" />}
            />
            <Route 
              path="/ADattendence"
              element={user ? (user.type === 'Staff' || user.type === 'HOD' ? <ADAttendence/> : <Attendence/>) : <Navigate to="/auth" />}
            />
            <Route 
              path="/ADmarks"
              element={user ? (user.type === 'Staff' || user.type === 'HOD' ? <ADmarks/> : <Marks/>) : <Navigate to="/auth" />}
            />
            <Route 
              path="/marks"
              element={user ? (user.type === 'Student' ? <Marks/> : <ADmarks/>) : <Navigate to="/auth" />}
            />
            <Route 
              path="/profile"
              element={user ? <Profile/> : <Navigate to="/auth" />}
            />   
            <Route 
              path="/approval"
              element={user ? ( user.type === 'HOD' ? <Approval/> : <Home/>) : <Navigate to="/auth" />}
            />         
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

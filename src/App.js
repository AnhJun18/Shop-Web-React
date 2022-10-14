import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TablePage from './pages/TablePage'
import ProfilePage from './pages/profile/ProfilePage';
import AdminBlankPage from './pages/AdminBlankPage';
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import useToken from './components/useToken';


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Router><LoginPage setToken={setToken} /></Router>
  }

  return (
        <Router>
            <Routes>
                <Route exact path='/' element={<DashboardPage/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />
                <Route exact path='/table' element={<TablePage/>} />
                <Route exact path='/blank-page' element={<AdminBlankPage/>} />
                <Route exact path='/product' element={<ProductPage/>} />
                <Route exact path='/register' element={<RegisterPage/>} />
                <Route exact path='/login' element={<LoginPage/>} />
            </Routes>  
        </Router>
    )
}

export default App;
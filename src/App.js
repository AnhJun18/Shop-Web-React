import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import DashboardPage from './pages/DashboardPage';
import TablePage from './pages/TablePage'
import ProfilePage from './pages/profile/ProfilePage';
import AdminBlankPage from './pages/AdminBlankPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
        <Router>
            <Routes>
                <Route exact path='/' element={<DashboardPage/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />
                <Route exact path='/table' element={<TablePage/>} />
                <Route exact path='/blank-page' element={<AdminBlankPage/>} />
                <Route exact path='/login' element={<LoginPage/>} />
                <Route exact path='/register' element={<RegisterPage/>} />
                <Route exact path='/product' element={<ProductPage/>} />
            </Routes>  
        </Router>
    )
}

export default App;

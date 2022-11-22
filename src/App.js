import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import { Route, Routes } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import TablePage from './pages/TablePage'
import ProfilePage from './pages/profile/ProfilePage';
import AdminBlankPage from './pages/AdminBlankPage';
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import LoginPage from "./pages/auth/LoginPage";
import { AuthContextProvider } from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ChoosingPage from "./pages/ChoosingPage";
import Management from "./pages/Management";
import Import from "./pages/ImportPage";
import Statistical from "./pages/StatisticalPage";
import CartPage from "./pages/CartPage";
import TheOrder from "./pages/TheOrderPage";
import InforUser from "./pages/InforUser";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPwsPage from "./pages/UserFogotPass";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./components/NotFound";

function App() {

  return (
          <AuthContextProvider>
            <Routes>
                <Route exact path='/' element={<DashboardPage/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />
                <Route exact path='/table' element={<TablePage/>} />
                <Route exact path='/blank-page' element={<AdminBlankPage/>} />
                <Route exact path='/product' element={<ProductPage/>} />
                <Route exact path='/customer' element={<CustomerPage/>} />
                <Route exact path='/login' element={<LoginPage/>} />
                <Route exact path='/register' element={<RegisterPage/>} />
                <Route exact path='/forgot-pass' element={<ForgotPwsPage/>} />
                <Route exact path='/change-pass' element={<ChangePassword/>} />
                <Route exact path='/home' element={<HomePage/>} />
                <Route exact path='/shop' element={<ShopPage/>} />
                <Route exact path='/shop/:id'  element={<ShopPage/>} />
                <Route exact path='/choosing' element={<ChoosingPage/>} />
                <Route exact path='/order' element={<Management/>} />
                <Route exact path='/import' element={<Import/>} />
                <Route exact path='/statistical' element={<Statistical/>} />
                <Route exact path='/theOrder' element={<TheOrder/>} />
                <Route exact path='/inforUser' element={<InforUser/>} />
 				<Route exact path='/cart' element={<CartPage/>} />
                <Route exact path='*' element={<NotFound/>} />
            </Routes>  
          </AuthContextProvider>
    )
}

export default App;
import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import {Route, Routes} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import TablePage from './pages/TablePage'
import ProfilePage from './pages/profile/ProfilePage';
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import LoginPage from "./pages/auth/LoginPage";
import {AuthContextProvider} from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ChoosingPage from "./pages/ChoosingPage";
import Management from "./pages/Management";
import Import from "./pages/ImportPage";
import Statistical from "./pages/StatisticalPage";
import CartPage from "./pages/CartPage";
import TheOrder from "./pages/TheOrderPage";
import NotFound from "./components/NotFound";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/auth/RegisterPage";
import InfoUser from "./pages/InfoUser";
import UserFogotPass from "./pages/UserFogotPass";
import jwt_decode from 'jwt-decode'
import ChangePassword from "./pages/ChangePassword";
import ChangePwsPage from "./pages/ChangePassword";
import SearchPage from "./pages/SearchPage";

function App() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const permission=(tokens?(jwt_decode(tokens?.data?.accessToken)?.authorities):null)
    return (
        <AuthContextProvider>
            <Routes>
                <Route path='/login' element={<LoginPage/>} />
                {permission === 'ROLE_ADMIN' ?
                    <>
                        <Route path='/' element={<DashboardPage/>} />
                        <Route path='/profile' element={<ProfilePage/>} />
                        <Route path='/table' element={<TablePage/>} />
                        <Route path='/order' element={<Management/>} />
                        <Route path='/category' element={<CategoryPage/>} />
                        <Route path='/product' element={<ProductPage/>} />
                        <Route path='/customer' element={<CustomerPage/>} />
                        <Route path='/import' element={<Import/>} />
                        <Route path='/statistical' element={<Statistical/>} />
                    </>
                    :(
                        <>
                            <Route path='/' element={<HomePage/>} />
                            <Route path='/home' element={<HomePage/>} />
                            <Route path='/register' element={<RegisterPage/>} />
                            <Route path='/profile' element={<InfoUser/>} />
                            <Route path='/forgot-pass' element={<UserFogotPass/>} />
                            <Route path='/change-pass/verify-code=:code' element={<ChangePwsPage/>} />
                            <Route path='/home' element={<HomePage/>} />
                            <Route path='/product/:id' element={<ChoosingPage/>} />
                            <Route path='/search'  element={<SearchPage/>} />
                            <Route path='/cart' element={<CartPage/>} />
                            <Route path='/theOrder' element={<TheOrder/>} />
                            <Route path='/home' element={<HomePage/>} />
                            <Route path='/' element={<HomePage/>} />
                            <Route path='/product/:id' element={<ChoosingPage/>} />
                            <Route path='/shop' element={<ShopPage/>}/>
                            <Route path='/shop/:id' element={<ShopPage/>}/>
                        </>)
                }
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </AuthContextProvider>
    )
}

export default App;
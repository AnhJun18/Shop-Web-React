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
                <Route exact path='/home' element={<HomePage/>} />
                <Route exact path='/shop' element={<ShopPage/>} />
                <Route exact path='/choosing' element={<ChoosingPage/>} />
                <Route exact path='/order' element={<Management/>} />
                <Route exact path='/import' element={<Import/>} />
                <Route exact path='/statistical' element={<Statistical/>} />
 				<Route exact path='/cart' element={<CartPage/>} />
            </Routes>  
          </AuthContextProvider>
    )
}

export default App;
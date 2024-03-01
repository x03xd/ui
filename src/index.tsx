import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Main';
import AuthLayout from './AuthLayout';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import Store from './Store';
import Lobby from './Lobby';
import Cart from './Cart';
import { AuthProvider } from './AuthenticationContext';
import { QueryParamsProvider } from './QueryParamsContext';
import MyAccount from './MyAccount';
import NarrowGrid from './NarrowGrid';
import EditProfile from './EditProfile';
import Transactions from './Transactions';
import ProtectedRoute from './ProtectedRoute';
import PasswordChange from './PasswordChange';
import NarrowGridWider from './NarrowGridWider';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <Router>
        <AuthProvider>
            <QueryParamsProvider>
                <Routes>

                    <Route element = {<App />}>
                        <Route path = "/" element = {<Main />} />
                        <Route path = "/s" element = {<Store />} />
                        <Route path="/l/:slug" element={<ProtectedRoute path="/l/:slug" element={<Lobby />} />} />
                        <Route path="/cart" element={<ProtectedRoute path="/cart" element={<Cart />} />} />
    
                        <Route element = {<NarrowGrid />}>
                            <Route path="/account" element={<ProtectedRoute path="/account" element={<MyAccount />} />} />
                            <Route path="/account/edit-profile" element={<ProtectedRoute path="/account/edit-profile" element={<EditProfile />} />} />
                        </Route>

                        <Route element = {<NarrowGridWider />}>
                            <Route path="/account/transactions" element={<ProtectedRoute path="/account/transactions" element={<Transactions />} />} />
                        </Route>
                    </Route>

                    <Route element = {<AuthLayout />} >
                            <Route path = "/login" element={<ProtectedRoute path="/login" element={<Login />} />} />
                            <Route path = "/login2" element={<ProtectedRoute path="/login2" element={<Login />} />} />
                            <Route path = "/registration" element={<ProtectedRoute path="/registration" element={<Register />} />} />
                        <Route path="/account/edit-profile/password" element={<ProtectedRoute path="/account/edit-profile/password" element={<PasswordChange />} />} />
                    </Route>

                </Routes>
            </QueryParamsProvider>
        </AuthProvider>
    </Router>
);


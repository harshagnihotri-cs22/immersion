import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store/store'; // Correct path to store
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../routes/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CartItemsProvider from '../Context/CartItemsProvider';
import WishItemsProvider from '../Context/WishItemsProvider';
import SearchProvider from '../Context/SearchProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from '../components/Checkout/Checkout';
import ItemView from '../routes/ItemView';
import CategoryView from '../routes/CategoryView';
import SearchView from '../routes/Search';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import Wishlist from '../components/Wishlist';
import Shop from '../components/Shop/Shop'; // Make sure you import Shop

function App() {
  return (
    <Provider store={store}> {/* Provide the Redux store */}
      <PersistGate loading={null} persistor={persistor}> {/* Persist Gate for data persistence */}
        <CartItemsProvider>
          <WishItemsProvider>
            <SearchProvider>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/account/me" element={<MyAccount />} />
                  <Route path="/account/manage" element={<ManageAccount />} />
                  <Route path="/account/login" element={<Login />} />
                  <Route path="/account/register" element={<Register />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/category/:id" element={<CategoryView />} />
                  <Route path="/item/men/:id" element={<ItemView />} />
                  <Route path="/item/women/:id" element={<ItemView />} />
                  <Route path="/item/kids/:id" element={<ItemView />} />
                  <Route path="/item/featured/:id" element={<ItemView />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/search/*" element={<SearchView />} />
                  <Route path="*" element={<Login />} /> {/* Catch-all route for unknown paths */}
                </Routes>
                <Footer />
              </Router>
            </SearchProvider>
          </WishItemsProvider>
        </CartItemsProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantDiscovery from './components/RestuarantDiscovery';
import RestaurantDetails from './components/RestuarantDetails';
import SavedRestaurants from './components/SavedRestaurants';
import SavedRestaurantDetails from './components/SavedRestuarantDetails';
import ProfilePage from './components/ProfilePage';
import { RestaurantProvider } from "./context/RestuarantContext";

const App = () => {
  return (
    <RestaurantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantDiscovery />} />
          <Route path="/restaurant-details" element={<RestaurantDetails />} />
          <Route path="/saved" element={<SavedRestaurants />} />
          <Route path="/saved-restaurant-details" element={<SavedRestaurantDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </RestaurantProvider>
  );
};

export default App;
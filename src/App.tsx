import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantDiscovery from './components/RestuarantDiscovery';
import RestaurantDetails from './components/RestuarantDetails';
import { RestaurantProvider } from "./context/RestuarantContext";

const App = () => {
  return (
    <RestaurantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantDiscovery />} />
          <Route path="/restaurant-details" element={<RestaurantDetails />} />
        </Routes>
      </Router>
    </RestaurantProvider>
  );
};

export default App;
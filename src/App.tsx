import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantDiscovery from './components/RestuarantDiscovery';
import RestaurantDetails from './components/RestuarantDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantDiscovery />} />
        <Route path="/restaurant-details" element={<RestaurantDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
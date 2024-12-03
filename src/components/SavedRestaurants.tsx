import React from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../context/RestuarantContext";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";

const SavedRestaurants = () => {
  const { restaurants } = useRestaurantContext();
  const navigate = useNavigate();

  const goToDetails = (restaurant: any) => {
    navigate(`/saved-restaurant-details`, { state: { restaurant } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-purple-500 to-purple-400 rounded-b-3xl p-6">
        <h1 className="text-white text-3xl font-bold">Saved Restaurants</h1>
      </header>

      {/* Saved Restaurants */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants
            .filter((restaurant) => restaurant.status === "accepted") // Only "accepted" restaurants
            .map((restaurant) => (
              <div
                key={restaurant.name}
                className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => goToDetails(restaurant)}
              >
                <img
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                  <p className="text-sm text-gray-500">{restaurant.distance}</p>
                  <p className="text-sm text-gray-500">{restaurant.likes}</p>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white p-4 flex justify-around items-center rounded-t-3xl shadow-lg">
        <button className="flex flex-col items-center text-gray-400" onClick={() => navigate("/")}>
          <FaSearch className="text-2xl" />
          <span className="text-xs">Discover</span>
        </button>
        <button className="flex flex-col items-center text-purple-500">
          <FaBookmark className="text-2xl" />
          <span className="text-xs">Saved</span>
        </button>
        <button className="flex flex-col items-center text-gray-400" onClick={() => navigate("/profile")}>
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default SavedRestaurants;
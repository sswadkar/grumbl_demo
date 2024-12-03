import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../context/RestuarantContext";

const RestaurantDiscovery = () => {
  const { restaurants, updateRestaurantStatus } = useRestaurantContext();
  const [refreshKey, setRefreshKey] = useState(0);
  const [flashClass, setFlashClass] = useState(""); // State to manage flash effect
  const navigate = useNavigate();

  const onSwipe = (direction: string, name: string) => {
    const status =
      direction === "left" ? "no" : direction === "right" ? "maybe" : undefined;

    if (status) {
      // Trigger the appropriate flash class
      if (direction === "left") {
        setFlashClass("flash-red");
      } else if (direction === "right") {
        setFlashClass("flash-yellow");
      }

      updateRestaurantStatus(name, status);

      // Remove the flash effect after 500ms
      setTimeout(() => {
        setFlashClass("");
      }, 1000);
    }

    setRefreshKey((prevKey) => prevKey + 1);
  };

  const onDoubleTap = (name: string) => {
    setFlashClass("flash-green"); // Trigger green flash
    updateRestaurantStatus(name, "accepted");

    // Remove the flash effect after 500ms
    setTimeout(() => {
      setFlashClass("");
    }, 500);
  };

  const goToDetails = (restaurant: any) => {
    navigate(`/restaurant-details`, { state: { restaurant } });
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 transition-all duration-500 ${flashClass}`} // Add flash class dynamically
    >
      {/* Header */}
      <header className="bg-gradient-to-b from-purple-500 to-purple-400 rounded-b-3xl p-6">
        <h1 className="text-white text-3xl font-bold">Discover</h1>
      </header>

      {/* Swipeable Cards */}
      <main className="flex-grow flex items-center justify-center px-6 py-4">
        <div className="w-full h-[75vh] lg:w-[50vh] relative" key={refreshKey}>
          {restaurants
            .filter((restaurant) => restaurant.status === "maybe") // Filter by status "maybe"
            .sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0)) // Sort by lastModified in reverse order
            .map((restaurant) => (
              <TinderCard
                className="absolute w-full h-full rounded-3xl shadow-lg overflow-hidden"
                key={restaurant.name}
                onSwipe={(dir) => onSwipe(dir, restaurant.name)}
                preventSwipe={["up"]}
              >
                <div
                  className="relative w-full h-full"
                  onDoubleClick={() => onDoubleTap(restaurant.name)}
                >
                  <img
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-b-3xl shadow-xl">
                    <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                    <p className="text-gray-500 text-sm">{restaurant.distance}</p>
                    <p className="text-gray-500 text-sm">{restaurant.likes}</p>
                    <button
                      className="mt-4 text-purple-500 font-semibold"
                      onClick={() => goToDetails(restaurant)}
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </TinderCard>
            ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white p-4 flex justify-around items-center rounded-t-3xl shadow-lg">
        <button className="flex flex-col items-center text-purple-500">
          <FaSearch className="text-2xl" />
          <span className="text-xs">Discover</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-400"
          onClick={() => navigate("/saved")}
        >
          <FaBookmark className="text-2xl" />
          <span className="text-xs">Saved</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-400"
          onClick={() => navigate("/profile")}
        >
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default RestaurantDiscovery;
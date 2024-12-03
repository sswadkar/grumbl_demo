import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Restaurant = {
  name: string;
  images: string[];
  distance: string;
  likes: string;
  tags: string[];
  description: string;
  reviews: string[];
  status: "no" | "maybe" | "accepted"; // Status for each restaurant
  lastModified: number; // Timestamp for last modification
};

const RestaurantDiscovery = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      name: "Frida Midtown",
      images: [
        "/images/cafeintermezzo.jpg",
        "/images/fridamidtown.avif",
        "/images/yuh.jpg",
      ],
      distance: "0.5 miles away",
      likes: "3 friends liked this place",
      tags: ["Mexican", "Casual", "Bar"],
      description:
        "Frida Midtown offers a vibrant atmosphere with delicious Mexican food and refreshing cocktails.",
      reviews: [
        "Great food and drinks!",
        "Loved the ambiance and the service was excellent.",
        "A bit pricey but worth it for special occasions.",
      ],
      status: "maybe",
      lastModified: -1, // Placeholder timestamp
    },
    {
      name: "Sushi Central",
      images: [
        "/images/cafeintermezzo.jpg",
        "/images/fridamidtown.avif",
        "/images/yuh.jpg",
      ],
      distance: "1.2 miles away",
      likes: "5 friends liked this place",
      tags: ["Japanese", "Casual", "Sushi"],
      description:
        "Sushi Central offers fresh sushi and a cozy atmosphere to enjoy authentic Japanese cuisine.",
      reviews: [
        "Absolutely loved the sushi rolls!",
        "Great value for the price.",
        "Service was a bit slow, but the food made up for it.",
      ],
      status: "maybe",
      lastModified: -1, // Placeholder timestamp
    },
    {
      name: "Pasta Bella",
      images: [
        "/images/cafeintermezzo.jpg",
        "/images/fridamidtown.avif",
        "/images/yuh.jpg",
      ],
      distance: "0.8 miles away",
      likes: "2 friends liked this place",
      tags: ["Italian", "Romantic", "Pasta"],
      description:
        "Pasta Bella offers handmade pasta and a romantic ambiance for a perfect dinner date.",
      reviews: [
        "The pasta was heavenly!",
        "Romantic vibe, great for a date night.",
        "A little expensive, but worth the splurge.",
      ],
      status: "maybe",
      lastModified: -1, // Placeholder timestamp
    },
  ]);

  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const onSwipe = (direction: string, name: string) => {
    setRestaurants((prevRestaurants) => {
      // Find the swiped restaurant
      const swipedRestaurant = prevRestaurants.find(
        (restaurant) => restaurant.name === name
      );
  
      if (!swipedRestaurant) {
        return prevRestaurants; // If not found, return the original list
      }
  
      // Update the restaurant's status and lastModified timestamp
      const updatedRestaurant = {
        ...swipedRestaurant,
        status:
          direction === "left"
            ? "no"
            : direction === "right"
            ? "maybe"
            : swipedRestaurant.status,
        lastModified: Date.now(), // Add timestamp for ordering
      };
  
      // Remove the swiped restaurant and add it to the end of the list
      const remainingRestaurants = prevRestaurants.filter(
        (restaurant) => restaurant.name !== name
      );

      if (updatedRestaurant.status == "no") {
        return remainingRestaurants;
      } else {
        return [...remainingRestaurants, updatedRestaurant];
      }
    });
  
    // Increment refreshKey to force refresh
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const onDoubleTap = (name: string) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.name === name ? { ...restaurant, status: "accepted" } : restaurant
      )
    );

    // Remove restaurants marked as "accepted"
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((restaurant) => restaurant.status !== "accepted")
    );
  };

  const goToDetails = (restaurant: any) => {
    navigate(`/restaurant-details`, { state: { restaurant } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-b from-purple-500 to-purple-400 rounded-b-3xl p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">Discover</h1>
          <div className="flex space-x-4">
            <button className="bg-white p-2 rounded-full shadow-md">
              <FaSearch className="text-purple-500" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <FaUser className="text-purple-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Swipeable Cards */}
      <main className="flex-grow flex items-center justify-center px-6 py-4">
        <div className="w-full max-w-md h-[75vh] relative" key={refreshKey}>
        {restaurants
            .sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0)) // Sort by lastModified in reverse order
            .map((restaurant) => (
            <TinderCard
              className="absolute w-full h-full rounded-3xl shadow-lg overflow-hidden"
              key={restaurant.name}
              onSwipe={(dir) => onSwipe(dir, restaurant.name)}
              preventSwipe={["up"]}
              onCardLeftScreen={() => console.log(`${restaurant.name} left the screen`)}
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
        <button className="flex flex-col items-center text-gray-400">
          <FaBookmark className="text-2xl" />
          <span className="text-xs">Saved</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default RestaurantDiscovery;
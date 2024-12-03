import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RestaurantDiscovery = () => {
  const [lastDirection, setLastDirection] = useState("");
  const navigate = useNavigate();

  const restaurants = [
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
      ]
    },
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
      ]
    },
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
      ]
    },
  ];

  const onSwipe = (direction: string, name: string) => {
    setLastDirection(direction);
    if (direction === "right") {
      console.log(`Saved ${name} to 'come back to it'.`);
    } else if (direction === "left") {
      console.log(`Dismissed ${name}.`);
    }
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
        <div className="w-full max-w-md h-[75vh] relative">
          {restaurants.map((restaurant, index) => (
            <TinderCard
              className="absolute w-full h-full rounded-3xl shadow-lg overflow-hidden"
              key={restaurant.name}
              onSwipe={(dir) => onSwipe(dir, restaurant.name)}
              onCardLeftScreen={() => console.log(`${restaurant.name} left the screen!`)}
              preventSwipe={["up"]}
            >
              <div className="relative w-full h-full">
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
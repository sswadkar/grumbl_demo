import React, { createContext, useState, useContext } from "react";

type Restaurant = {
  name: string;
  images: string[];
  distance: string;
  likes: string;
  tags: string[];
  description: string;
  reviews: string[];
  status: "no" | "maybe" | "accepted";
  lastModified: number;
};

type RestaurantContextType = {
  restaurants: Restaurant[];
  updateRestaurantStatus: (name: string, status: "no" | "maybe" | "accepted") => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const updateRestaurantStatus = (name: string, status: "no" | "maybe" | "accepted") => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.name === name
          ? { ...restaurant, status, lastModified: Date.now() }
          : restaurant
      )
    );
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, updateRestaurantStatus }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurantContext must be used within a RestaurantProvider");
  }
  return context;
};
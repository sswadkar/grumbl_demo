import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRestaurantContext } from "../context/RestuarantContext";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { restaurant } = state;
  const { updateRestaurantStatus } = useRestaurantContext();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Track which button is selected

  const fakeReviewData = [
    {
      user: "John Doe",
      timestamp: "2 hours ago",
      profilePic: "", // Empty profile pic placeholder
      review: "Great food and excellent service!",
    },
    {
      user: "Jane Smith",
      timestamp: "Yesterday",
      profilePic: "", // Empty profile pic placeholder
      review: "Loved the ambiance, but a bit pricey.",
    },
    {
      user: "Bruce Wayne",
      timestamp: "3 days ago",
      profilePic: "", // Empty profile pic placeholder
      review: "Perfect for a casual dinner.",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === restaurant.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? restaurant.images.length - 1 : prevIndex - 1
    );
  };

  const handleDecision = (status: "no" | "maybe" | "accepted") => {
    setSelectedStatus(status); // Set the selected status
    updateRestaurantStatus(restaurant.name, status);
    setTimeout(() => {
      navigate(-1); // Navigate back after animation
    }, 500); // Match animation duration
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <header className="relative">
        <div className="relative w-full h-80 overflow-hidden">
          <img
            src={restaurant.images[currentImageIndex]}
            alt={`${restaurant.name} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Navigation for Carousel */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-500 mb-4">{restaurant.distance}</p>
        <p className="text-gray-500 mb-4">{restaurant.likes}</p>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex space-x-2">
            {restaurant.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-700 mb-6">
          {restaurant.description || "No description available."}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleDecision("no")}
            className={`bg-red-500 text-white p-4 rounded-full shadow-md transform transition-transform duration-500 ${
              selectedStatus === "no" ? "scale-125" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={() => handleDecision("maybe")}
            className={`bg-yellow-500 text-white p-4 rounded-full shadow-md transform transition-transform duration-500 ${
              selectedStatus === "maybe" ? "scale-125" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14"
              />
            </svg>
          </button>
          <button
            onClick={() => handleDecision("accepted")}
            className={`bg-green-500 text-white p-4 rounded-full shadow-md transform transition-transform duration-500 ${
              selectedStatus === "accepted" ? "scale-125" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>
          <div className="space-y-4">
            {fakeReviewData.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="font-bold">{review.user}</p>
                  <p className="text-sm text-gray-500">{review.timestamp}</p>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetails;
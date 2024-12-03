import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRestaurantContext } from "../context/RestuarantContext";

const SavedRestaurantDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { restaurant } = state;
  const { updateRestaurantStatus } = useRestaurantContext();

  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState(restaurant.reviews || []);

  const handleAddReview = () => {
    if (newReview.trim()) {
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setNewReview("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="relative">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-60 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
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
      </header>

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        <p className="text-gray-500 mb-2">{restaurant.distance}</p>
        <p className="text-gray-500 mb-4">{restaurant.likes}</p>

        {/* Tags */}
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

        {/* Add Review */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Add a Review</h2>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Write your review here..."
          ></textarea>
          <button
            onClick={handleAddReview}
            className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-lg shadow-md"
          >
            Submit Review
          </button>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review: string, index: number) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md text-gray-700"
              >
                {review}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedRestaurantDetails;
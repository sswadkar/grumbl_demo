import React, { useState } from "react";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const [preferences, setPreferences] = useState<string[]>([
    "Mexican",
    "Japanese",
    "Italian",
  ]); // Initial preferences
  const [newPreference, setNewPreference] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([
    "Vegetarian",
    "Gluten-Free"
  ]); // Initial dietary restrictions
  const [newDietaryRestriction, setNewDietaryRestriction] = useState("");
  const navigate = useNavigate();

  // Fake Profile Information for Barry Allen
  const profileInfo = {
    name: "Barry Allen",
    email: "ballen@starlabs.org", // Private
    phone: "312-254-2000", // Private
    joined: "June 2018",
    location: "Central City",
    favoriteCuisine: "Italian",
    placesVisited: 45,
    recentReviews: [
      { place: "Frida Midtown", review: "Great food and atmosphere!" },
      { place: "Sushi Central", review: "Amazing sushi rolls!" },
      { place: "Pasta Bella", review: "Romantic vibe, perfect for dates!" },
    ],
  };

  const addPreference = () => {
    if (newPreference.trim() && !preferences.includes(newPreference)) {
      setPreferences([...preferences, newPreference]);
      setNewPreference("");
    }
  };

  const addDietaryRestriction = () => {
    if (
      newDietaryRestriction.trim() &&
      !dietaryRestrictions.includes(newDietaryRestriction)
    ) {
      setDietaryRestrictions([
        ...dietaryRestrictions,
        newDietaryRestriction,
      ]);
      setNewDietaryRestriction("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-purple-500 to-purple-400 p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-white text-3xl font-bold">Profile</h1>
      </header>

      {/* Profile Information */}
      <main className="flex-grow p-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> {profileInfo.name}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> <span className="italic">{profileInfo.email}</span>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> <span className="italic">{profileInfo.phone}</span>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Location:</strong> {profileInfo.location}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Joined:</strong> {profileInfo.joined}
          </p>
          <p className="text-gray-700">
            <strong>Favorite Cuisine:</strong> {profileInfo.favoriteCuisine}
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <p className="text-gray-700 mb-2">
            <strong>Total Places Visited:</strong> {profileInfo.placesVisited}
          </p>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Preferences</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {preferences.map((pref, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm"
              >
                {pref}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={newPreference}
              onChange={(e) => setNewPreference(e.target.value)}
              placeholder="Add a preference"
              className="flex-grow p-2 border rounded-lg focus:outline-none mr-4"
            />
            <button
              onClick={addPreference}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Dietary Restrictions</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {dietaryRestrictions.map((restriction, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm"
              >
                {restriction}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={newDietaryRestriction}
              onChange={(e) => setNewDietaryRestriction(e.target.value)}
              placeholder="Add a restriction"
              className="flex-grow p-2 border rounded-lg focus:outline-none mr-4"
            />
            <button
              onClick={addDietaryRestriction}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {profileInfo.recentReviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm text-gray-700"
              >
                <p className="font-bold">{review.place}</p>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white p-4 flex justify-around items-center rounded-t-3xl shadow-lg">
        <button className="flex flex-col items-center text-gray-400" onClick={() => navigate("/")}>
          <FaSearch className="text-2xl" />
          <span className="text-xs">Discover</span>
        </button>
        <button className="flex flex-col items-center text-gray-400" onClick={() => navigate("/saved")}>
          <FaBookmark className="text-2xl" />
          <span className="text-xs">Saved</span>
        </button>
        <button className="flex flex-col items-center text-purple-500" onClick={() => navigate("/profile")}>
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfilePage;
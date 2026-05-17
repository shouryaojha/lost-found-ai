import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

export default function AddItem() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/items", formData);

      toast.success("Item Added Successfully");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to add item"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-2xl"
      >

        <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Report Item
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            name="description"
            placeholder="Describe the item..."
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          >

            <option value="lost">
              Lost
            </option>

            <option value="found">
              Found
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            Submit Item
          </button>

        </div>

      </form>
    </div>
  );
}
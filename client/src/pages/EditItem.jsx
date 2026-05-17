import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

export default function EditItem() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
  });

  useEffect(() => {

    const fetchItem = async () => {

      try {

        const response = await API.get(`/items/${id}`);

        setFormData(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchItem();

  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(`/items/${id}`, formData);

      toast.success("Item Updated");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update failed"
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
          Edit Item
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white"
          />

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold"
          >
            Update Item
          </button>

        </div>

      </form>
    </div>
  );
}
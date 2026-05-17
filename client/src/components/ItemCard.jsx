import { Link } from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

export default function ItemCard({
  item,
  fetchItems,
}) {

  const currentUserId = localStorage.getItem("userId");

  const isOwner =
    currentUserId === item.owner?._id;

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/items/${item._id}`);

      toast.success("Item Deleted");

      fetchItems();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300 border border-gray-800">

      {/* TOP */}
      <div className="flex items-center justify-between mb-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            item.status === "lost"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {item.status.toUpperCase()}
        </span>

        <span className="text-gray-400 text-sm">
          {item.category}
        </span>

      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-yellow-400 mb-3">
        {item.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-300 mb-4">
        {item.description}
      </p>

      {/* AI SUMMARY */}
      {item.aiSummary && (
        <div className="bg-black p-4 rounded-xl mb-4 border border-yellow-400">

          <p className="text-yellow-400 font-semibold mb-2">
            🤖 AI Summary
          </p>

          <p className="text-gray-300 text-sm">
            {item.aiSummary}
          </p>

          <p className="mt-3 text-sm text-red-400">
            Urgency: {item.aiUrgency}
          </p>

          {/* AI TAGS */}
          {item.aiTags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">

              {item.aiTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-400 text-black px-2 py-1 rounded-lg text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}

            </div>
          )}

        </div>
      )}

      {/* DETAILS */}
      <div className="space-y-2 text-sm text-gray-400">

        <p>
          📍 {item.location}
        </p>

        <p>
          👤 {item.owner?.name}
        </p>

      </div>

      {/* OWNER ACTIONS */}
      {isOwner && (
        <div className="mt-6 flex gap-3">

          {/* EDIT */}
          <Link
            to={`/edit-item/${item._id}`}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
          >
            Edit
          </Link>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400 transition text-white font-semibold"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
}
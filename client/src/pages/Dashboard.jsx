import { useEffect, useState } from "react";

import API from "../services/api";

import ItemCard from "../components/ItemCard";

export default function Dashboard() {

  const [items, setItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const fetchItems = async () => {

    try {

      const response = await API.get("/items");

      setItems(response.data);

      setFilteredItems(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {

    let updated = items;

    // SEARCH
    if (search) {
      updated = updated.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // FILTER
    if (filter !== "all") {
      updated = updated.filter(
        (item) => item.status === filter
      );
    }

    setFilteredItems(updated);

  }, [search, filter, items]);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-yellow-400">
            Lost & Found Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Browse all reported lost and found items
          </p>

        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 p-4 rounded-xl bg-gray-900 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="p-4 rounded-xl bg-gray-900 text-white outline-none"
          >

            <option value="all">
              All
            </option>

            <option value="lost">
              Lost
            </option>

            <option value="found">
              Found
            </option>

          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-2xl">
            Loading items...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredItems.length === 0 && (
          <div className="bg-gray-900 rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              No Items Found
            </h2>

            <p className="text-gray-400">
              Try another search or add new items.
            </p>

          </div>
        )}

        {/* ITEMS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              fetchItems={fetchItems}
            />
          ))}

        </div>

      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <h1 className="text-6xl font-extrabold leading-tight">
              Smart
              <span className="text-yellow-400"> Lost & Found </span>
              Platform
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              AI-powered lost and found system for colleges,
              campuses, and organizations. Report lost items,
              discover found belongings, and get intelligent
              matching recommendations.
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
              >
                Get Started
              </Link>

              <Link
                to="/dashboard"
                className="border border-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
              >
                Explore Items
              </Link>

            </div>

          </div>

          {/* Right */}
          <div className="flex justify-center">

            <div className="bg-yellow-400 text-black p-10 rounded-3xl shadow-2xl w-[350px]">

              <h2 className="text-3xl font-bold mb-6">
                AI Features
              </h2>

              <ul className="space-y-4 text-lg font-medium">

                <li>🤖 Smart Item Matching</li>

                <li>📊 AI Analytics Dashboard</li>

                <li>🔍 Intelligent Search</li>

                <li>🧠 AI Item Summaries</li>

                <li>⚡ Real-time Recommendations</li>

              </ul>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
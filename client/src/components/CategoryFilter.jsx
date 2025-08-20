import { useState } from "react";

const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "React",
  "JavaScript",
  "Node.js",
  "Tailwind",
  "CSS",
  "Tutorials",
  "Live",
  "Podcasts",
];

export default function CategoryFilter({ onCategoryChange }) {
  const [active, setActive] = useState("All");

  const handleClick = (cat) => {
    setActive(cat);
    onCategoryChange(cat);
  };

  return (
    <div className="w-full border-b bg-white sticky top-4 z-40 overflow-x-auto">
      <div className="inline-flex gap-3 px-4 py-2 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`flex-shrink-0 px-4 py-1 rounded-full text-sm whitespace-nowrap transition
              ${
                active === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

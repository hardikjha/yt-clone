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
    onCategoryChange?.(cat);
  };

  return (
    <div className="w-full bg-white sticky top-14 z-40 border-b">
      <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition
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

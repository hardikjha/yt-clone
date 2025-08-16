import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="
            absolute top-full mt-2 left-1/2 -translate-x-1/2
            px-3 py-1 text-xs text-white bg-black rounded
            shadow-lg whitespace-nowrap text-center
            max-w-[90vw] z-50
          "
        >
          {text}
        </div>
      )}
    </div>
  );
}

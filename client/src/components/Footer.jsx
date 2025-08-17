export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 YouTube Clone, Made by Hardik Kumar</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <button className="hover:underline">About</button>
          <button className="hover:underline">Press</button>
          <button className="hover:underline">Contact</button>
          <button className="hover:underline">Terms</button>
          <button className="hover:underline">Privacy</button>
        </div>
      </div>
    </footer>
  );
}

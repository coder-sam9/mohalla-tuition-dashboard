export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center">
          <div className="relative">
            <button className="flex items-center space-x-2 text-gray-700 focus:outline-none">
              <span className="hidden md:block">Admin User</span>
              <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
                A
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

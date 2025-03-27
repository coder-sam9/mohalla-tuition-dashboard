import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Students', path: '/students', icon: '👨‍🎓' },
    { name: 'Attendance', path: '/attendance', icon: '📝' },
    { name: 'Marks', path: '/marks', icon: '📈' },
    { name: 'Reports', path: '/reports', icon: '📑' },
    { name: 'Users', path: '/users', icon: '👥' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-blue-700 text-white transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto
      `}>
        <div className="flex items-center justify-center h-16 px-4 border-b border-blue-600">
          <h1 className="text-xl font-bold">Tuition Dashboard</h1>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-md 
                  hover:bg-blue-600 hover:text-white 
                  ${location.pathname === item.path ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}

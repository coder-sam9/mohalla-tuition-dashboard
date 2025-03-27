import { useState } from 'react';
import { users } from '../../mocks/dummyData/users';
import { centers } from '../../mocks/dummyData/centers';

export default function UserManagement() {
  const [filter, setFilter] = useState({
    role: '',
    center: '',
    status: ''
  });
  
  const [mode, setMode] = useState('view'); // 'view' or 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Filter users based on selected filters
  const filteredUsers = users.filter(user => {
    if (filter.role && user.role !== filter.role) return false;
    if (filter.center && !user.centers.includes(filter.center)) return false;
    if (filter.status && user.status !== filter.status) return false;
    return true;
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddNewUser = () => {
    setSelectedUser(null);
    setMode('add');
  };
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setMode('edit');
  };
  
  const handleCancel = () => {
    setMode('view');
    setSelectedUser(null);
  };
  
  const handleSubmit = () => {
    // For demo purposes, just show an alert and toggle mode
    alert(mode === 'add' ? 'User added successfully!' : 'User updated successfully!');
    setMode('view');
    setSelectedUser(null);
  };
  
  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          
          {mode === 'view' && (
            <button
              type="button"
              onClick={handleAddNewUser}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New User
            </button>
          )}
        </div>
        
        {mode === 'view' && (
          <>
            {/* Filters */}
            <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:flex md:items-center md:justify-between">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      id="role"
                      name="role"
                      value={filter.role}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="incharge">Incharge</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="center" className="block text-sm font-medium text-gray-700">Center</label>
                    <select
                      id="center"
                      name="center"
                      value={filter.center}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Centers</option>
                      {centers.map(center => (
                        <option key={center.id} value={center.name}>{center.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={filter.status}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Users table */}
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Centers
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
                                {user.name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.centers.length > 2 
                              ? `${user.centers[0]}, ${user.centers[1]} +${user.centers.length - 2} more` 
                              : user.centers.join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            type="button" 
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            className="text-red-600 hover:text-red-900"
                          >
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        
        {/* Add/Edit User Form */}
        {(mode === 'add' || mode === 'edit') && (
          <div className="mt-4 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {mode === 'add' ? 'Add New User' : 'Edit User'}
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={selectedUser?.name || ''}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={selectedUser?.email || ''}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={selectedUser?.phone || ''}
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    id="role"
                    name="role"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    defaultValue={selectedUser?.role || 'incharge'}
                  >
                    <option value="admin">Admin</option>
                    <option value="incharge">Incharge</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="centerAssignments" className="block text-sm font-medium text-gray-700">Assigned Centers</label>
                  <select
                    id="centerAssignments"
                    name="centerAssignments"
                    multiple
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    defaultValue={selectedUser?.centers || []}
                  >
                    {centers.map(center => (
                      <option key={center.id} value={center.name}>{center.name}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple centers</p>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    defaultValue={selectedUser?.status || 'active'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                {mode === 'add' && (
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Set initial password"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {mode === 'add' ? 'Add User' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
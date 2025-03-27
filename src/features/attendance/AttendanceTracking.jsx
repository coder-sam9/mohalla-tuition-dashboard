import { useState } from 'react';
import { students } from '../../mocks/dummyData/students';
import { centers } from '../../mocks/dummyData/centers';
import { attendance } from '../../mocks/dummyData/attendance';

export default function AttendanceTracking() {
  const [filter, setFilter] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date
    center: '',
    class: ''
  });
  
  const [studentAttendance, setStudentAttendance] = useState(
    students.map(student => ({
      id: student.id,
      name: student.name,
      status: 'present',
      roll: student.roll,
      class: student.class,
      center: student.center
    }))
  );
  
  // Filter students based on selected filters
  const filteredStudents = studentAttendance.filter(student => {
    if (filter.center && student.center !== filter.center) return false;
    if (filter.class && student.class !== filter.class) return false;
    return true;
  });
  
  // Get unique classes for filter dropdown
  const classesList = [...new Set(students.map(s => s.class))];
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleAttendance = (studentId) => {
    setStudentAttendance(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: student.status === 'present' ? 'absent' : 'present' } 
          : student
      )
    );
  };
  
  const handleSubmitAttendance = () => {
    // For demo purposes, just show an alert
    alert('Attendance submitted successfully!');
  };

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance Tracking</h1>
        
        {/* Filters */}
        <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={filter.date}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                <select
                  id="class"
                  name="class"
                  value={filter.class}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Classes</option>
                  {classesList.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance Table */}
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Mark Attendance for {filter.date || 'Today'}
            </h3>
            <div>
              <button
                type="button"
                onClick={() => setStudentAttendance(prev => prev.map(s => ({ ...s, status: 'present' })))}
                className="mr-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Mark All Present
              </button>
              <button
                type="button"
                onClick={() => setStudentAttendance(prev => prev.map(s => ({ ...s, status: 'absent' })))}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Mark All Absent
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.roll}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.class}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => toggleAttendance(student.id)}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                          student.status === 'present' 
                            ? 'text-white bg-green-600 hover:bg-green-700' 
                            : 'text-white bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        {student.status === 'present' ? 'Present' : 'Absent'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-4 sm:px-6 flex justify-end">
            <button
              type="button"
              onClick={handleSubmitAttendance}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Attendance
            </button>
          </div>
        </div>
        
        {/* Attendance History */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Attendance Records</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Center
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Students
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.map((record) => {
                    const presentCount = record.students.filter(s => s.status === 'present').length;
                    return (
                      <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.center}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.students.length}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{presentCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                            View
                          </a>
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Export
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import { centers } from '../../mocks/dummyData/centers';
import { students } from '../../mocks/dummyData/students';
import { attendance } from '../../mocks/dummyData/attendance';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  // Calculate attendance percentage from mock data
  const totalAttendances = attendance.reduce((acc, curr) => {
    return acc + curr.students.length;
  }, 0);
  
  const totalPresent = attendance.reduce((acc, curr) => {
    return acc + curr.students.filter(s => s.status === 'present').length;
  }, 0);
  
  const attendancePercentage = Math.round((totalPresent / totalAttendances) * 100);
  
  const stats = [
    { name: 'Total Students', value: students.length, icon: '👨‍🎓', path: '/students' },
    { name: 'Total Centers', value: centers.length, icon: '🏫', path: '/centers' },
    { name: 'Active Students', value: students.filter(s => s.status === 'active').length, icon: '✅', path: '/students' },
    { name: 'Attendance Rate', value: `${attendancePercentage}%`, icon: '📝', path: '/attendance' },
  ];

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        {/* Welcome message */}
        <div className="py-4">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Welcome to Tuition Dashboard
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your tuition centers, students, attendance, and marks all in one place.
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-3xl">
                    {item.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {item.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Quick actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Student</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Register a new student in the system</p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/students/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Student
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Mark Attendance</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Record attendance for today's classes</p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/attendance/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Mark Attendance
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Generate Report</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Create attendance and performance reports</p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/reports"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Generate Report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
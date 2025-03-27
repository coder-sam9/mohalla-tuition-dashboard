import { useState } from 'react';
import { students } from '../../mocks/dummyData/students';
import { centers } from '../../mocks/dummyData/centers';
import { marks } from '../../mocks/dummyData/marks';

export default function MarksEntry() {
  const [filter, setFilter] = useState({
    center: '',
    class: '',
    subject: ''
  });
  
  const [mode, setMode] = useState('view'); // 'view' or 'add'
  
  // Filter students based on selected filters
  const filteredStudents = students.filter(student => {
    if (filter.center && student.center !== filter.center) return false;
    if (filter.class && student.class !== filter.class) return false;
    if (filter.subject && student.subject !== filter.subject) return false;
    return true;
  });
  
  // Get unique classes, subjects for filter dropdowns
  const classesList = [...new Set(students.map(s => s.class))];
  const subjectsList = [...new Set(students.map(s => s.subject))];
  
  // Get student marks
  const getStudentMarks = (studentId) => {
    return marks.filter(mark => mark.studentId === studentId);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddNewMarks = () => {
    // For demo purposes, just toggle the mode
    setMode('add');
  };
  
  const handleCancelAdd = () => {
    setMode('view');
  };
  
  const handleSubmitMarks = () => {
    // For demo purposes, just show an alert and toggle mode
    alert('Marks submitted successfully!');
    setMode('view');
  };
  
  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Marks Entry</h1>
          
          {mode === 'view' && (
            <button
              type="button"
              onClick={handleAddNewMarks}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New Marks
            </button>
          )}
        </div>
        
        {/* Filters */}
        <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={filter.subject}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Subjects</option>
                  {subjectsList.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {mode === 'view' ? (
          /* View Marks */
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Student Marks
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                View and manage marks for students
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marks.map((mark) => (
                    <tr key={mark.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{mark.studentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{mark.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{mark.testName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{mark.obtainedMarks}/{mark.maxMarks}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{mark.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Add Marks Form */
          <div className="mt-4 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Marks
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
                  <select
                    id="student"
                    name="student"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select Student</option>
                    {filteredStudents.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="testName" className="block text-sm font-medium text-gray-700">Test Name</label>
                  <input
                    type="text"
                    name="testName"
                    id="testName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g. Mid Term, Final Exam"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxMarks" className="block text-sm font-medium text-gray-700">Maximum Marks</label>
                  <input
                    type="number"
                    name="maxMarks"
                    id="maxMarks"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={100}
                  />
                </div>
                
                <div>
                  <label htmlFor="obtainedMarks" className="block text-sm font-medium text-gray-700">Obtained Marks</label>
                  <input
                    type="number"
                    name="obtainedMarks"
                    id="obtainedMarks"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="testDate" className="block text-sm font-medium text-gray-700">Test Date</label>
                  <input
                    type="date"
                    name="testDate"
                    id="testDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                  <textarea
                    name="remarks"
                    id="remarks"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Any additional notes about the test or student performance"
                  />
                </div>
              </div>
              
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitMarks}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Marks
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
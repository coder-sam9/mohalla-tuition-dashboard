import { useState } from 'react';
import { centers } from '../../mocks/dummyData/centers';
import { attendance } from '../../mocks/dummyData/attendance';
import { marks } from '../../mocks/dummyData/marks';

export default function ReportGeneration() {
  const [reportType, setReportType] = useState('attendance'); // 'attendance' or 'marks'
  const [filter, setFilter] = useState({
    center: '',
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0], // Today
    class: '',
    subject: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  // Get unique classes and subjects for filter dropdowns
  const classesList = [...new Set([].concat(...centers.map(c => c.classes)))];
  const subjectsList = [...new Set([].concat(...centers.map(c => c.subjects)))];
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleReportTypeChange = (type) => {
    setReportType(type);
    setReportGenerated(false);
  };
  
  const handleGenerateReport = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 1000);
  };
  
  const handleExportReport = (format) => {
    alert(`Report exported as ${format}`);
  };
  
  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Report Generation</h1>
        
        {/* Report Type Selection */}
        <div className="mt-4">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleReportTypeChange('attendance')}
              className={`px-4 py-2 font-medium text-sm rounded-md ${
                reportType === 'attendance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Attendance Report
            </button>
            <button
              type="button"
              onClick={() => handleReportTypeChange('marks')}
              className={`px-4 py-2 font-medium text-sm rounded-md ${
                reportType === 'marks'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Marks Report
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Report Filters</h3>
            <p className="mt-1 text-sm text-gray-500">
              {reportType === 'attendance' 
                ? 'Generate attendance reports based on selected criteria.' 
                : 'Generate marks reports based on selected criteria.'}
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filter.startDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filter.endDate}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
            
            {reportType === 'marks' && (
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
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
        
        {/* Report Results */}
        {reportGenerated && (
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {reportType === 'attendance' ? 'Attendance Report' : 'Marks Report'}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {filter.startDate} to {filter.endDate}
                    {filter.center && ` | ${filter.center}`}
                    {filter.class && ` | ${filter.class}`}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => handleExportReport('PDF')}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Export as PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportReport('CSV')}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Export as CSV
                  </button>
                </div>
              </div>
              
              {reportType === 'attendance' ? (
                /* Attendance Report */
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
                          Absent
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance %
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendance.map((record) => {
                        const totalStudents = record.students.length;
                        const presentCount = record.students.filter(s => s.status === 'present').length;
                        const absentCount = totalStudents - presentCount;
                        const attendancePercentage = Math.round((presentCount / totalStudents) * 100);
                        
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
                              <div className="text-sm font-medium text-gray-900">{totalStudents}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-green-600">{presentCount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-red-600">{absentCount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{attendancePercentage}%</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Marks Report */
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
                          Percentage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Evaluated By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {marks.map((mark) => {
                        const percentage = Math.round((mark.obtainedMarks / mark.maxMarks) * 100);
                        
                        return (
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
                              <div className={`text-sm font-medium ${
                                percentage >= 70 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {percentage}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{mark.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{mark.evaluatedBy}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
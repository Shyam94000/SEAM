import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
  const [authStats, setAuthStats] = useState({
    totalAttempts: 0,
    successfulAuth: 0,
    failedAuth: 0
  });
  const [userLogs, setUserLogs] = useState([]);
  const [selectedUserAadhar, setSelectedUserAadhar] = useState('');

  // Fetch authentication statistics
  const fetchAuthStats = async () => {
    try {
      const response = await axios.get('/api/auth-stats');
      setAuthStats(response.data);
    } catch (error) {
      console.error('Failed to fetch authentication stats', error);
    }
  };

  // Fetch user logs
  const fetchUserLogs = async () => {
    if (!selectedUserAadhar || selectedUserAadhar.length !== 12) return;

    try {
      const response = await axios.get(`/api/user-logs/${selectedUserAadhar}`);
      setUserLogs(response.data.logs);
    } catch (error) {
      console.error('Failed to fetch user logs', error);
    }
  };

  useEffect(() => {
    fetchAuthStats();
  }, []);

  const authChartData = [
    { name: 'Successful', value: authStats.successfulAuth },
    { name: 'Failed', value: authStats.failedAuth }
  ];

  const COLORS = ['#00C49F', '#FF6384'];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Authentication Statistics */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Authentication Overview</h2>
          <div className="flex justify-between mb-4">
            <div className="stat-box">
              <span className="text-gray-600">Total Attempts</span>
              <span className="text-2xl font-bold">{authStats.totalAttempts}</span>
            </div>
            <div className="stat-box">
              <span className="text-gray-600">Successful Auth</span>
              <span className="text-2xl font-bold text-green-600">{authStats.successfulAuth}</span>
            </div>
            <div className="stat-box">
              <span className="text-gray-600">Failed Auth</span>
              <span className="text-2xl font-bold text-red-600">{authStats.failedAuth}</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={authChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {authChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* User Logs Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">User Logs</h2>
          
          <div className="flex mb-4">
            <input 
              type="text" 
              placeholder="Enter Aadhar Number" 
              value={selectedUserAadhar}
              onChange={(e) => setSelectedUserAadhar(e.target.value)}
              className="flex-grow p-2 border rounded mr-2"
            />
            <button 
              onClick={fetchUserLogs}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Fetch Logs
            </button>
          </div>

          {/* Logs Table */}
          <div className="overflow-x-auto max-h-[500px] overflow-y-scroll">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Aadhar Number</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">IP Address</th>
                  <th className="border p-2">Timestamp</th>
                  <th className="border p-2">Image</th>
                </tr>
              </thead>
              <tbody>
                {userLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{log.Name}</td>
                    <td className="border p-2">{log.AadharNumber}</td>
                    <td className="border p-2">{log.Description}</td>
                    <td className="border p-2">{log.IPAddress}</td>
                    <td className="border p-2">
                      {new Date(log.Timestamp).toLocaleString()}
                    </td>
                    <td className="border p-2">
                      {log.Image && (
                        <img 
                          src={`data:image/jpeg;base64,${log.Image}`} 
                          alt="Log" 
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
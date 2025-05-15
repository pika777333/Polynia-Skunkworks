import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetricsView = () => {
  // Mock data for the sales history
  const recentSales = [
    { id: 1, customer: 'Acme Corp', amount: 12500, status: 'Closed', date: '2025-05-10' },
    { id: 2, customer: 'TechGiant Inc', amount: 28750, status: 'Pending', date: '2025-05-08' },
    { id: 3, customer: 'Global Services', amount: 8200, status: 'Closed', date: '2025-05-06' },
    { id: 4, customer: 'Innovative Solutions', amount: 17300, status: 'Lost', date: '2025-05-04' },
    { id: 5, customer: 'Premier Products', amount: 21500, status: 'Closed', date: '2025-05-01' },
    { id: 6, customer: 'NextGen Technologies', amount: 19800, status: 'Closed', date: '2025-04-28' },
    { id: 7, customer: 'Urban Retailers', amount: 14200, status: 'Pending', date: '2025-04-25' },
    { id: 8, customer: 'Healthcare Partners', amount: 32400, status: 'Closed', date: '2025-04-22' },
    { id: 9, customer: 'Educational Systems', amount: 9600, status: 'Lost', date: '2025-04-18' },
    { id: 10, customer: 'Transportation Group', amount: 18700, status: 'Closed', date: '2025-04-15' },
  ];

  const salesByCategory = [
    { name: 'Enterprise Solutions', value: 185000 },
    { name: 'Consulting Services', value: 124000 },
    { name: 'Software Licenses', value: 98000 },
    { name: 'Support Packages', value: 68000 },
    { name: 'Hardware', value: 12350 },
  ];

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Page Title */}
        <div className="col-span-12 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sales History</h2>
          <p className="text-gray-600">Review your recent sales transactions and performance</p>
        </div>
        
        {/* Sales Statistics */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm earworm-card p-4">
            <div className="text-center">
              <h3 className="text-gray-500 mb-2">Total Sales (YTD)</h3>
              <div className="text-3xl font-bold earworm-primary-text">$487,350</div>
              <div className="text-sm text-green-500 mt-1 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                +12% vs last year
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm earworm-card p-4">
            <div className="text-center">
              <h3 className="text-gray-500 mb-2">Monthly Average</h3>
              <div className="text-3xl font-bold earworm-primary-text">$78,250</div>
              <div className="text-sm text-green-500 mt-1 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                +8% vs last month
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm earworm-card p-4">
            <div className="text-center">
              <h3 className="text-gray-500 mb-2">Conversion Rate</h3>
              <div className="text-3xl font-bold earworm-primary-text">68%</div>
              <div className="text-sm text-red-500 mt-1 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
                -2% vs last month
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm earworm-card p-4">
            <div className="text-center">
              <h3 className="text-gray-500 mb-2">Avg Deal Size</h3>
              <div className="text-3xl font-bold earworm-primary-text">$18.4k</div>
              <div className="text-sm text-green-500 mt-1 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                +4% vs last month
              </div>
            </div>
          </div>
        </div>
        
        {/* Sales by Category */}
        <div className="col-span-8 bg-white rounded-lg shadow-sm earworm-card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Sales by Product Category</h2>
          </div>
          <div className="p-4" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesByCategory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: '#e1e1e1',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="value" name="Revenue" fill="#e83e8c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Sales Stats */}
        <div className="col-span-4 bg-white rounded-lg shadow-sm earworm-card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Performance Breakdown</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Closed Deals</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Lost Opportunities</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 mt-4">
                <h3 className="font-medium text-gray-800 mb-3">Monthly Targets</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Current Progress</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="earworm-gradient h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  $78,250 of $92,000 monthly target
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Sales */}
        <div className="col-span-12 bg-white rounded-lg shadow-sm earworm-card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${sale.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sale.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sale.status === 'Closed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                      <button className="text-indigo-600 hover:text-indigo-900">Analyze</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">42</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border border-indigo-500 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-600">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsView;

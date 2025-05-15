import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MetricsView = () => {
  // Mock data for the charts
  const performanceData = [
    { month: 'Jan', calls: 24, conversions: 8, rate: 33 },
    { month: 'Feb', calls: 31, conversions: 12, rate: 39 },
    { month: 'Mar', calls: 28, conversions: 11, rate: 39 },
    { month: 'Apr', calls: 33, conversions: 15, rate: 45 },
    { month: 'May', calls: 45, conversions: 22, rate: 49 },
    { month: 'Jun', calls: 42, conversions: 18, rate: 43 },
    { month: 'Jul', calls: 38, conversions: 17, rate: 45 },
  ];
  
  const improvementData = [
    { skill: 'Active Listening', before: 6.2, after: 8.4 },
    { skill: 'Pain Point Detection', before: 5.8, after: 8.1 },
    { skill: 'Objection Handling', before: 5.5, after: 7.9 },
    { skill: 'Budget Discussion', before: 4.9, after: 7.6 },
    { skill: 'Closing', before: 5.2, after: 7.8 },
  ];
  
  const recentSales = [
    { id: 1, customer: 'Acme Corp', amount: 12500, status: 'Closed', date: '2025-05-10' },
    { id: 2, customer: 'TechGiant Inc', amount: 28750, status: 'Pending', date: '2025-05-08' },
    { id: 3, customer: 'Global Services', amount: 8200, status: 'Closed', date: '2025-05-06' },
    { id: 4, customer: 'Innovative Solutions', amount: 17300, status: 'Lost', date: '2025-05-04' },
    { id: 5, customer: 'Premier Products', amount: 21500, status: 'Closed', date: '2025-05-01' },
  ];
  
  // Tab state
  const [activeTab, setActiveTab] = useState('performance');
  
  return (
    <div className="flex-1 p-6 overflow-auto">
      {/* Tabs */}
      <div className="flex mb-6 bg-white rounded-lg shadow-sm p-1">
        <button 
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${activeTab === 'performance' ? 'earworm-gradient text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button 
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${activeTab === 'history' ? 'earworm-gradient text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('history')}
        >
          Sales History
        </button>
        <button 
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${activeTab === 'improvement' ? 'earworm-gradient text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('improvement')}
        >
          Improvement Insights
        </button>
      </div>
      
      {/* Performance View */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Conversion Rate */}
          <div className="col-span-8 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Conversion Rate Over Time</h2>
            </div>
            <div className="p-4" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#e1e1e1',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="#6f42c1" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#e83e8c" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#20c997" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Performance Stats */}
          <div className="col-span-4 grid grid-rows-3 gap-6">
            <div className="row-span-1 bg-white rounded-lg shadow-sm earworm-card p-4 flex flex-col justify-center items-center">
              <h3 className="text-gray-500 mb-2">Conversion Rate</h3>
              <div className="text-4xl font-bold earworm-primary-text">45%</div>
              <div className="text-sm text-green-500 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                12% vs last month
              </div>
            </div>
            
            <div className="row-span-1 bg-white rounded-lg shadow-sm earworm-card p-4 flex flex-col justify-center items-center">
              <h3 className="text-gray-500 mb-2">Avg Deal Size</h3>
              <div className="text-4xl font-bold earworm-primary-text">$18.4k</div>
              <div className="text-sm text-green-500 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                8% vs last month
              </div>
            </div>
            
            <div className="row-span-1 bg-white rounded-lg shadow-sm earworm-card p-4 flex flex-col justify-center items-center">
              <h3 className="text-gray-500 mb-2">Calls to Close</h3>
              <div className="text-4xl font-bold earworm-primary-text">2.8</div>
              <div className="text-sm text-red-500 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
                0.2 vs last month
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="col-span-12 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Deal closed with Premier Products</p>
                    <p className="text-xs text-gray-500">May 12, 2025 at 3:24 PM</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">$21,500</span>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Meeting scheduled with TechGiant Inc</p>
                    <p className="text-xs text-gray-500">May 11, 2025 at 10:15 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">New call analyzed with Acme Corp</p>
                    <p className="text-xs text-gray-500">May 10, 2025 at 2:30 PM</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">High potential</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sales History View */}
      {activeTab === 'history' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Sales */}
          <div className="col-span-12 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Recent Sales</h2>
            </div>
            <div className="p-4">
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
          </div>
          
          {/* Sales Stats */}
          <div className="col-span-4 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Sales Stats</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sales (YTD)</span>
                  <span className="font-semibold">$487,350</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold">$78,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Month</span>
                  <span className="font-semibold">$64,100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold">68%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Types of Sales */}
          <div className="col-span-8 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Sales by Product Category</h2>
            </div>
            <div className="p-4" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Enterprise Solutions', value: 185000 },
                    { name: 'Consulting Services', value: 124000 },
                    { name: 'Software Licenses', value: 98000 },
                    { name: 'Support Packages', value: 68000 },
                    { name: 'Hardware', value: 12350 },
                  ]}
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
                  <Bar dataKey="value" fill="#e83e8c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Improvement Insights View */}
      {activeTab === 'improvement' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Skill Development */}
          <div className="col-span-8 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Skill Development</h2>
            </div>
            <div className="p-4" style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={improvementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis dataKey="skill" type="category" width={150} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#e1e1e1',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="before" name="Initial Rating" fill="#6f42c1" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="after" name="Current Rating" fill="#e83e8c" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Overall Improvement */}
          <div className="col-span-4 bg-white rounded-lg shadow-sm earworm-card overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Overall Improvement</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e83e8c"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="85"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold earworm-primary-text">70%</span>
                    <span className="text-gray-500 text-sm">Improvement</span>
                  </div>
                </div>
                
                <div className="space-y-4 w-full">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Overall Technique</span>
                      <span className="text-sm font-medium">8.2/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="earworm-gradient h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Customer Satisfaction</span>
                      <span className="text-sm font-medium">9.1/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="earworm-gradient h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sales Efficiency</span>
                      <span className="text-sm font-medium">7.8/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="earworm-gradient h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insights & Recommendations */}
          <div className="col-span-12 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Insights & Recommendations</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2">Key Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1 text-purple-700">
                    <li>Excellent active listening skills, consistently acknowledging customer pain points</li>
                    <li>Strong product knowledge, especially with technical features</li>
                    <li>Effective at building rapport early in conversations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Areas for Improvement</h3>
                  <ul className="list-disc pl-5 space-y-1 text-blue-700">
                    <li>Budget discussions could be introduced earlier in the conversation</li>
                    <li>More emphasis on ROI calculations would strengthen value propositions</li>
                    <li>Consider using more customer-specific examples during presentations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Next Steps</h3>
                  <ul className="list-disc pl-5 space-y-1 text-green-700">
                    <li>Join the "Negotiation Masterclass" workshop on May 25</li>
                    <li>Practice ROI calculators during your next 3 calls</li>
                    <li>Review successful case studies in your industry vertical</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsView;

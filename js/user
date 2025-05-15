import { useState } from 'react';

const UserProfile = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    title: 'Sales Manager',
    email: 'sarah.j@company.com',
    phone: '(555) 123-4567',
    region: 'Midwest',
    specialty: 'Enterprise Solutions',
    joined: '2022-03-15',
    avatarUrl: '',
    bio: 'Experienced sales professional with over 8 years in the technology sector. Specializing in enterprise solutions and SaaS offerings.',
    techniques: [
      { id: 1, name: 'SPIN Selling', proficiency: 85, favorite: true },
      { id: 2, name: 'Solution Selling', proficiency: 92, favorite: true },
      { id: 3, name: 'Consultative Selling', proficiency: 78, favorite: false },
      { id: 4, name: 'Challenger Sale', proficiency: 65, favorite: false },
      { id: 5, name: 'Value Selling', proficiency: 88, favorite: true },
    ],
    preferences: {
      notifications: true,
      emailReports: true,
      darkMode: false,
      dataSharing: true,
      autoAnalysis: true
    }
  });
  
  // Tab state
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle preference toggles
  const handleTogglePreference = (key) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        [key]: !userData.preferences[key]
      }
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({...formData});
    setIsEditing(false);
  };
  
  // Handle technique proficiency change
  const handleProficiencyChange = (id, value) => {
    setUserData({
      ...userData,
      techniques: userData.techniques.map(technique => 
        technique.id === id ? {...technique, proficiency: value} : technique
      )
    });
  };
  
  // Handle favorite toggle
  const handleFavoriteToggle = (id) => {
    setUserData({
      ...userData,
      techniques: userData.techniques.map(technique => 
        technique.id === id ? {...technique, favorite: !technique.favorite} : technique
      )
    });
  };
  
  return (
    <div className="flex-1 p-6 overflow-auto">
      {/* Tabs */}
      <div className="flex mb-6 bg-white rounded-lg shadow-sm p-1">
        <button 
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${activeTab === 'profile' ? 'earworm-gradient text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${activeTab === 'techniques' ? 'earworm-gradient text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('techniques')}
        >
          Sales Techniques
        </button>
        <button 
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${activeTab === 'settings' ? 'earworm-gradient text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      {/* Profile View */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="col-span-4 bg-white rounded-lg shadow-sm earworm-card overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
            <div className="px-6 pb-6">
              <div className="relative">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1">
                    <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                      <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-16 text-center">
                  <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                  <p className="text-sm text-gray-500">{userData.title}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">{userData.region} Region</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">Specialty: {userData.specialty}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">Joined {new Date(userData.joined).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  className="w-full py-2.5 rounded-lg text-white earworm-gradient font-medium"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Details or Edit Form */}
          <div className="col-span-8 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {isEditing ? 'Edit Profile' : 'Profile Details'}
              </h2>
            </div>
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                      <select
                        name="region"
                        id="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      >
                        <option value="Northeast">Northeast</option>
                        <option value="Southeast">Southeast</option>
                        <option value="Midwest">Midwest</option>
                        <option value="Southwest">Southwest</option>
                        <option value="West">West</option>
                        <option value="Northwest">Northwest</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                      <select
                        name="specialty"
                        id="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      >
                        <option value="Enterprise Solutions">Enterprise Solutions</option>
                        <option value="SMB">Small/Medium Business</option>
                        <option value="Government">Government</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Retail">Retail</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        id="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({...userData});
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white earworm-gradient"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">About Me</h3>
                  <p className="text-gray-700 mb-6">{userData.bio}</p>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Top Sales Techniques</h3>
                  <div className="space-y-4">
                    {userData.techniques
                      .filter(technique => technique.favorite)
                      .map(technique => (
                        <div key={technique.id} className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700">{technique.name}</span>
                              <span className="text-sm font-medium text-gray-700">{technique.proficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="earworm-gradient h-2 rounded-full" 
                                style={{ width: `${technique.proficiency}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-6 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">Completed sales training: "Advanced Negotiation Tactics"</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">Closed deal with Acme Corp worth $12,500</p>
                        <p className="text-xs text-gray-500">4 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">Analyzed 5 sales conversations with EARWORM</p>
                        <p className="text-xs text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Sales Techniques View */}
      {activeTab === 'techniques' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">My Sales Techniques</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {userData.techniques.map(technique => (
                  <div key={technique.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-800">{technique.name}</h3>
                        <button 
                          className="ml-2 focus:outline-none" 
                          onClick={() => handleFavoriteToggle(technique.id)}
                        >
                          <svg 
                            className={`w-5 h-5 ${technique.favorite ? 'text-yellow-500' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm font-medium px-3 py-1 bg-gray-200 rounded-full text-gray-700">
                        {technique.proficiency}% Proficiency
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={technique.proficiency}
                        onChange={(e) => handleProficiencyChange(technique.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {technique.name === 'SPIN Selling' && (
                      <div>
                        <p className="text-sm text-gray-700 mb-3">
                          SPIN Selling focuses on four types of questions: Situation, Problem, Implication, and Need-payoff.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="col-span-1 bg-white p-3 rounded border border-gray-200">
                            <h4 className="font-medium text-gray-800 mb-1">Situation Questions</h4>
                            <p className="text-xs text-gray-600">Gather facts, background information about the current situation</p>
                          </div>
                          <div className="col-span-1 bg-white p-3 rounded border border-gray-200">
                            <h4 className="font-medium text-gray-800 mb-1">Problem Questions</h4>
                            <p className="text-xs text-gray-600">Identify problems, difficulties, and dissatisfactions</p>
                          </div>
                          <div className="col-span-1 bg-white p-3 rounded border border-gray-200">
                            <h4 className="font-medium text-gray-800 mb-1">Implication Questions</h4>
                            <p className="text-xs text-gray-600">Discuss consequences of problems to create urgency</p>
                          </div>
                          <div className="col-span-1 bg-white p-3 rounded border border-gray-200">
                            <h4 className="font-medium text-gray-800 mb-1">Need-Payoff Questions</h4>
                            <p className="text-xs text-gray-600">Focus on solution value and get the prospect to explain benefits</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {technique.name === 'Solution Selling' && (
                      <div>
                        <p className="text-sm text-gray-700 mb-3">
                          Solution Selling focuses on addressing specific customer pain points with tailored solutions rather than pushing products.
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Pain-point identification</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Customized solution development</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Value articulation and ROI calculation</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {technique.name === 'Consultative Selling' && (
                      <p className="text-sm text-gray-700">
                        Consultative Selling positions you as a trusted advisor rather than a salesperson, focusing on building relationships and understanding customer needs before proposing solutions.
                      </p>
                    )}
                    
                    {technique.name === 'Challenger Sale' && (
                      <p className="text-sm text-gray-700">
                        The Challenger Sale approach is about teaching, tailoring, and taking control of the sales conversation. It involves challenging customer perspectives and offering unique insights.
                      </p>
                    )}
                    
                    {technique.name === 'Value Selling' && (
                      <p className="text-sm text-gray-700">
                        Value Selling focuses on communicating the monetary worth of benefits your solution provides, highlighting ROI and total cost of ownership rather than price points.
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="font-medium text-purple-800 mb-2">Recommended Resources</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span className="text-sm text-purple-700">
                      <a href="#" className="hover:underline">SPIN Selling by Neil Rackham</a>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm text-purple-700">
                      <a href="#" className="hover:underline">Value Selling Workshop (June 12)</a>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    <span className="text-sm text-purple-700">
                      <a href="#" className="hover:underline">ROI Calculator Templates</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings View */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 bg-white rounded-lg shadow-sm earworm-card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Application Settings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">Receive real-time updates and alerts</p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="notifications" 
                      id="notifications" 
                      checked={userData.preferences.notifications}
                      onChange={() => handleTogglePreference('notifications')}
                      className="sr-only"
                    />
                    <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.notifications ? 'transform translate-x-6 bg-pink-500' : ''}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Email Reports</h3>
                    <p className="text-sm text-gray-500 mt-1">Receive weekly performance reports via email</p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="emailReports" 
                      id="emailReports" 
                      checked={userData.preferences.emailReports}
                      onChange={() => handleTogglePreference('emailReports')}
                      className="sr-only"
                    />
                    <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.emailReports ? 'transform translate-x-6 bg-pink-500' : ''}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Dark Mode</h3>
                    <p className="text-sm text-gray-500 mt-1">Switch to dark theme for better visibility</p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="darkMode" 
                      id="darkMode" 
                      checked={userData.preferences.darkMode}
                      onChange={() => handleTogglePreference('darkMode')}
                      className="sr-only"
                    />
                    <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.darkMode ? 'transform translate-x-6 bg-pink-500' : ''}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Data Sharing</h3>
                    <p className="text-sm text-gray-500 mt-1">Share anonymized data to improve analysis</p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="dataSharing" 
                      id="dataSharing" 
                      checked={userData.preferences.dataSharing}
                      onChange={() => handleTogglePreference('dataSharing')}
                      className="sr-only"
                    />
                    <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.dataSharing ? 'transform translate-x-6 bg-pink-500' : ''}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Auto Analysis</h3>
                    <p className="text-sm text-gray-500 mt-1">Automatically analyze recordings when complete</p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="autoAnalysis" 
                      id="autoAnalysis" 
                      checked={userData.preferences.autoAnalysis}
                      onChange={() => handleTogglePreference('autoAnalysis')}
                      className="sr-only"
                    />
                    <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.autoAnalysis ? 'transform translate-x-6 bg-pink-500' : ''}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-base font-medium text-gray-800 mb-4">Security</h3>
                <div className="space-y-4">
                  <button className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <span>Change Password</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <button className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <span>Two-Factor Authentication</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <button className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <span>Session Management</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-base font-medium text-gray-800 mb-4">Account</h3>
                <div className="space-y-4">
                  <button className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <span>Export My Data</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                  <button className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50">
                    <span>Delete Account</span>
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

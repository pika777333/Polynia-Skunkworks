import React, { useState, useEffect } from 'react';

// User data for demonstration
const userData = {
  name: 'Sarah Johnson',
  title: 'Sales Manager',
  email: 'sarah.johnson@earworm.com',
  phone: '(555) 123-4567',
  region: 'Midwest',
  specialty: 'Enterprise Solutions',
  joined: '2022-03-15',
  bio: 'Experienced sales manager with over 8 years in B2B software sales. Specializing in enterprise solutions with a focus on client relationship management and team leadership.',
  achievements: [
    { title: 'Top Sales Q1 2025', description: 'Exceeded quarterly target by 28%', date: '2025-03-30' },
    { title: 'Customer Excellence Award', description: '98% client satisfaction rating', date: '2024-12-15' },
    { title: 'Deal of the Year', description: '$1.2M enterprise contract with GlobalTech', date: '2024-06-22' }
  ],
  stats: {
    deals: 78,
    closedValue: 1250000,
    winRate: 72,
    avgDealSize: 42000
  }
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Performance metrics for the profile
  const performanceCards = [
    {
      title: 'Deals Closed',
      value: profileData.stats.deals,
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Win Rate',
      value: `${profileData.stats.winRate}%`,
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      )
    },
    {
      title: 'Sales Volume',
      value: `$${(profileData.stats.closedValue / 1000000).toFixed(1)}M`,
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Avg. Deal Size',
      value: `$${(profileData.stats.avgDealSize / 1000).toFixed(1)}K`,
      icon: (
        <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    }
  ];
  
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Page Header */}
        <div className="col-span-12 mb-4">
          <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
          <p className="text-gray-600">View and manage your profile information</p>
        </div>
        
        {/* Main Profile Card */}
        <div className="col-span-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
          <div className="px-6 pb-6">
            <div className="relative">
              <div className="absolute -top-16 left-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                  <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                    <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-12 pl-32">
                <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.title}</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">{profileData.phone}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">{profileData.region} Region</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-700">Specialty: {profileData.specialty}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={handleEditClick}
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">About Me</h3>
              <p className="text-gray-700">{profileData.bio}</p>
            </div>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="col-span-4 space-y-6">
          {performanceCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <div className="mr-4">
                {card.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Achievements */}
        <div className="col-span-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="space-y-4">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start border-l-4 border-green-500 pl-4 py-2">
                <div>
                  <div className="font-medium text-gray-800">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(achievement.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call Analytics Summary */}
        <div className="col-span-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Analytics Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Average Sentiment Score</span>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium text-green-600">0.6</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Customer Talk Ratio</span>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600">65%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Question Rate</span>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
                <span className="text-sm font-medium text-purple-600">58%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Pain Point Identification</span>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <span className="text-sm font-medium text-pink-600">82%</span>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              View Detailed Analytics →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import React from 'react';
import type { Campaign } from '../types';
import { CampaignStatus, SocialPlatform } from '../types';
import { PLATFORM_ICONS } from '../constants';

interface DashboardPageProps {
  campaigns: Campaign[] | null;
  navigate: (page: string) => void;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-card p-4 rounded-lg shadow-md flex items-center">
    <div className={`rounded-full p-3 mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-text-secondary">{title}</p>
      <p className="text-2xl font-bold text-text">{value}</p>
    </div>
  </div>
);

const getStatusColor = (status: CampaignStatus) => {
    switch(status) {
        case CampaignStatus.Active: return 'bg-green-100 text-green-800';
        case CampaignStatus.Pending: return 'bg-yellow-100 text-yellow-800';
        case CampaignStatus.Completed: return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const DashboardPage: React.FC<DashboardPageProps> = ({ campaigns, navigate }) => {

  const totalBudget = campaigns?.reduce((sum, c) => sum + c.budget, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? '$0.00';
  const totalViews = campaigns?.reduce((sum, c) => sum + c.performance.views, 0).toLocaleString() ?? 0;
  const totalEngagements = campaigns?.reduce((sum, c) => sum + c.performance.engagements, 0).toLocaleString() ?? 0;
  const totalSales = campaigns?.reduce((sum, c) => sum + c.performance.sales, 0).toLocaleString() ?? 0;
  
  if (!campaigns) return <p>Loading...</p>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={() => navigate('create')} className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          <span>Create Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Spend" value={totalBudget} color="bg-blue-100 text-blue-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
        <StatCard title="Total Views" value={totalViews} color="bg-green-100 text-green-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} />
        <StatCard title="Total Engagements" value={totalEngagements} color="bg-purple-100 text-purple-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5 10m7 0l-2.5-2.5m0 0l-2.5 2.5M14 10L12 7.5" /></svg>} />
        <StatCard title="Total Sales" value={totalSales} color="bg-yellow-100 text-yellow-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
      </div>

      <div className="bg-card shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Your Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
        {campaigns.length === 0 ? (
          <p className="p-6 text-center text-text-secondary">You haven't created any campaigns yet.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-xl mr-3">{PLATFORM_ICONS[c.platform as SocialPlatform]}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-sm text-gray-500">{c.objective}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${c.budget.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Views: {c.performance.views.toLocaleString()}</div>
                    <div>Engagements: {c.performance.engagements.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{c.audience.ageRange.join('-')} yrs, {c.audience.gender}</div>
                    <div className="truncate w-40" title={c.audience.interests.join(', ')}>Interests: {c.audience.interests.join(', ')}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

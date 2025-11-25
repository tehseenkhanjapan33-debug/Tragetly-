
import React, { useState, useEffect, useCallback } from 'react';
import type { User, Campaign } from './types';
import { CampaignStatus } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import CreateCampaignPage from './components/CreateCampaignPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('tragetly-user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setPage('dashboard');
      }

      const storedCampaigns = localStorage.getItem('tragetly-campaigns');
      if (storedCampaigns) {
        setCampaigns(JSON.parse(storedCampaigns));
      } else {
        // Add mock data if no campaigns exist
        const mockCampaigns: Campaign[] = [
          {
            id: 'mock1',
            name: 'Summer Sale Kickoff',
            objective: 'Sales',
            platform: 'Instagram',
            mediaUrl: 'https://example.com/summer-sale',
            budget: 50.00,
            audience: { ageRange: [25, 45], gender: 'All', interests: ['fashion', 'shopping', 'summer'] },
            payment: { hash: '0xmockpaymenthash123', confirmed: true },
            status: CampaignStatus.Active,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            performance: { views: 15234, engagements: 1200, leads: 45, sales: 25, follows: 300 },
            userId: 'admin',
          },
          {
            id: 'mock2',
            name: 'New App Launch',
            objective: 'Downloads',
            platform: 'TikTok',
            mediaUrl: 'https://example.com/app-launch',
            budget: 120.00,
            audience: { ageRange: [18, 24], gender: 'All', interests: ['tech', 'apps', 'gaming'] },
            payment: { hash: '0xmockpaymenthash456', confirmed: true },
            status: CampaignStatus.Completed,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            performance: { views: 189456, engagements: 25000, leads: 2500, sales: 0, follows: 1200 },
            userId: 'admin',
          }
        ];
        setCampaigns(mockCampaigns);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tragetly-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tragetly-user');
    }
  }, [currentUser]);
  
  useEffect(() => {
    localStorage.setItem('tragetly-campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('landing');
  };

  const createCampaign = (campaign: Omit<Campaign, 'id' | 'userId' | 'createdAt' | 'performance' | 'status'>) => {
    if (!currentUser) return;
    
    const newCampaign: Campaign = {
      ...campaign,
      id: `camp_${Date.now()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      performance: { views: 0, engagements: 0, leads: 0, sales: 0, follows: 0 },
      status: CampaignStatus.Pending,
    };

    setCampaigns(prev => [...prev, newCampaign]);
    
    // Simulate payment confirmation and activation
    setTimeout(() => {
      setCampaigns(prev => prev.map(c => 
        c.id === newCampaign.id 
        ? { 
            ...c, 
            status: CampaignStatus.Active,
            performance: { // random performance data
              views: Math.floor(Math.random() * 10000) + 1000,
              engagements: Math.floor(Math.random() * 1000) + 100,
              leads: Math.floor(Math.random() * 50),
              sales: Math.floor(Math.random() * 20),
              follows: Math.floor(Math.random() * 200),
            } 
          } 
        : c
      ));
      alert('Payment confirmed! Your campaign is now active.');
    }, 3000);
    
    setPage('dashboard');
  };

  const renderPage = () => {
    switch(page) {
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      case 'dashboard':
        return <DashboardPage campaigns={campaigns.filter(c => currentUser && (currentUser.isAdmin || c.userId === currentUser.id))} navigate={setPage} />;
      case 'create':
        return <CreateCampaignPage createCampaign={createCampaign} currentUser={currentUser} navigate={setPage}/>;
      case 'landing':
      default:
        return <LandingPage navigate={setPage} isLoggedIn={!!currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} navigate={setPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

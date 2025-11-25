
import React, { useState } from 'react';
import type { Campaign, User } from '../types';
import { OBJECTIVES, PLATFORMS, GENDERS, USDT_WALLET } from '../constants';

interface CreateCampaignPageProps {
  createCampaign: (campaign: Omit<Campaign, 'id' | 'userId' | 'createdAt' | 'performance' | 'status'>) => void;
  currentUser: User | null;
  navigate: (page: string) => void;
}

const CreateCampaignPage: React.FC<CreateCampaignPageProps> = ({ createCampaign, currentUser, navigate }) => {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState(OBJECTIVES[0]);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [mediaUrl, setMediaUrl] = useState('');
  const [budget, setBudget] = useState(0.10);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [gender, setGender] = useState(GENDERS[0]);
  const [interests, setInterests] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (currentUser?.isAdmin === false && (!txHash || txHash.length < 10)) {
        setError('Please provide a valid transaction hash.');
        return;
    }
     if (currentUser?.isAdmin === false && budget < 0.10) {
        setError('Minimum budget is $0.10.');
        return;
    }

    const newCampaign = {
      name,
      objective,
      platform,
      mediaUrl,
      budget,
      audience: {
        ageRange,
        gender,
        interests: interests.split(',').map(i => i.trim()).filter(Boolean),
      },
      payment: {
        hash: txHash,
        confirmed: currentUser?.isAdmin || false,
      }
    };
    
    if (currentUser?.isAdmin) {
      newCampaign.payment.hash = `admin_creation_${Date.now()}`;
    }

    createCampaign(newCampaign);
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(USDT_WALLET)
        .then(() => alert('Wallet address copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
  }

  return (
    <div className="max-w-4xl mx-auto">
       <button onClick={() => navigate('dashboard')} className="text-primary hover:underline mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
        </button>
      <h1 className="text-3xl font-bold mb-6">Create New Campaign</h1>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campaign Details */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Campaign Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Media/Link URL</label>
              <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} required placeholder="https://" className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Objective</label>
              <select value={objective} onChange={e => setObjective(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                {OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Targeting */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Audience Targeting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Age Range: {ageRange[0]} - {ageRange[1]}</label>
               <div className="flex items-center space-x-4">
                  <span>{ageRange[0]}</span>
                  <input type="range" min="13" max={ageRange[1]} value={ageRange[0]} onChange={e => setAgeRange([+e.target.value, ageRange[1]])} className="w-full" />
               </div>
               <div className="flex items-center space-x-4">
                  <input type="range" min={ageRange[0]} max="100" value={ageRange[1]} onChange={e => setAgeRange([ageRange[0], +e.target.value])} className="w-full" />
                  <span>{ageRange[1]}</span>
               </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Interests</label>
              <input type="text" value={interests} onChange={e => setInterests(e.target.value)} placeholder="e.g. fashion, tech, gaming" className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
              <p className="text-xs text-text-secondary mt-1">Separate interests with a comma.</p>
            </div>
          </div>
        </div>

        {/* Budget & Payment */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">3. Budget & Payment</h2>
           <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-1">Budget (USDT)</label>
                <input type="number" value={budget} onChange={e => setBudget(parseFloat(e.target.value))} required min="0.10" step="0.01" className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                {currentUser?.isAdmin === false && <p className="text-xs text-text-secondary mt-1">Minimum $0.10</p>}
                 {currentUser?.isAdmin && <p className="text-xs text-green-600 mt-1">Admin account: No payment required.</p>}
            </div>
            {!currentUser?.isAdmin && (
            <>
                <div>
                    <label className="block text-sm font-medium mb-1">Send Payment To:</label>
                    <div className="flex items-center bg-gray-100 p-2 rounded-md">
                        <p className="text-sm font-mono break-all flex-grow">{USDT_WALLET}</p>
                        <button type="button" onClick={handleCopyToClipboard} className="ml-2 p-1 text-gray-500 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M4 3a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V3z" /></svg>
                        </button>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Transaction Hash</label>
                    <input type="text" value={txHash} onChange={e => setTxHash(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                    <p className="text-xs text-text-secondary mt-1">After sending payment, paste the transaction hash here to confirm.</p>
                </div>
            </>
            )}
           </div>
        </div>

        <button type="submit" className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-md text-lg hover:bg-green-600 transition">
          {currentUser?.isAdmin ? 'Create Campaign' : 'Confirm Payment & Launch'}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaignPage;

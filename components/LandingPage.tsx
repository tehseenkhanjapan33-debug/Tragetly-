import React from 'react';

interface LandingPageProps {
  navigate: (page: string) => void;
  isLoggedIn: boolean;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
const StepCard: React.FC<{ icon: React.ReactElement; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-card p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
        <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ navigate, isLoggedIn }) => {
  const handleCreateCampaign = () => {
    navigate(isLoggedIn ? 'create' : 'auth');
  };

  return (
    <div className="text-center">
      <div className="py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold text-text mb-4 leading-tight">
          Create Social Campaigns from <span className="text-primary">$0.10</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
          Launch targeted social media campaigns on major platforms with any budget.
          Our AI automatically finds the perfect audience for you.
        </p>
        <button 
          onClick={handleCreateCampaign} 
          className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg"
        >
          Create Your First Campaign
        </button>
      </div>

      <div className="py-16 bg-white rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           <StepCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
            title="1. Create"
            description="Define your campaign objective, select a platform, set your budget, and specify your target audience."
           />
           <StepCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            title="2. Pay"
            description="Complete a simple and secure USDT payment to our wallet and confirm with the transaction hash."
           />
           <StepCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title="3. Track"
            description="Monitor your campaign's performance in real-time through our intuitive dashboard."
           />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

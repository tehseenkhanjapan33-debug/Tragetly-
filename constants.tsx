import React from 'react';
import { CampaignObjective, SocialPlatform, Gender } from './types';

export const OBJECTIVES = Object.values(CampaignObjective);
export const PLATFORMS = Object.values(SocialPlatform);
export const GENDERS = Object.values(Gender);

export const USDT_WALLET = "0x5d8fe67ea5bd4e9f2a786f0784a7745c7677b317";

// Fix: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
export const PLATFORM_ICONS: { [key in SocialPlatform]: React.ReactElement } = {
  [SocialPlatform.Instagram]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  [SocialPlatform.Facebook]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  [SocialPlatform.TikTok]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.34-2.1-6.71.21-2.55 1.88-4.83 4.09-5.94.3-.15.63-.26.96-.32.01-3.46.01-6.92.01-10.38.15-2.34 1.86-4.44 4.12-5.15.48-.15.98-.24 1.48-.28z" />
    </svg>
  ),
  [SocialPlatform.YouTube]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.582 7.352a2.46 2.46 0 0 0-1.738-1.738C18.25 5.25 12 5.25 12 5.25s-6.25 0-7.844.364a2.46 2.46 0 0 0-1.738 1.738C2.053 8.947 2 12 2 12s.053 3.053.364 4.648a2.46 2.46 0 0 0 1.738 1.738C5.75 18.75 12 18.75 12 18.75s6.25 0 7.844-.364a2.46 2.46 0 0 0 1.738-1.738C21.947 15.053 22 12 22 12s-.053-3.053-.418-4.648zM9.75 15.125V8.875L15.417 12 9.75 15.125z" />
    </svg>
  ),
};

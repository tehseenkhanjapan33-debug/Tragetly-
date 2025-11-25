
export enum CampaignObjective {
  Views = 'Views',
  Shares = 'Shares',
  Comments = 'Comments',
  Downloads = 'Downloads',
  Leads = 'Leads',
  Sales = 'Sales',
  Follows = 'Follows',
}

export enum SocialPlatform {
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  All = 'All',
}

export enum CampaignStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
}

export interface Campaign {
  id: string;
  name: string;
  objective: CampaignObjective | string;
  platform: SocialPlatform | string;
  mediaUrl: string;
  budget: number;
  audience: {
    ageRange: [number, number];
    gender: Gender | string;
    interests: string[];
  };
  payment: {
    hash: string;
    confirmed: boolean;
  };
  status: CampaignStatus;
  createdAt: string;
  performance: {
    views: number;
    engagements: number;
    leads: number;
    sales: number;
    follows: number;
  };
  userId: string;
}

export interface User {
    id: string;
    email: string;
    isAdmin: boolean;
}

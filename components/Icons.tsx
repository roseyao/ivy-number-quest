import React from 'react';

interface IconProps {
    className?: string;
}

export const SparkleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2.5zM5.05 5.05a.75.75 0 011.06 0l1.062 1.06a.75.75 0 01-1.06 1.06L5.05 6.11a.75.75 0 010-1.06zM2.5 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012.5 10zM5.05 14.95a.75.75 0 010-1.06l1.06-1.062a.75.75 0 011.06 1.06L6.11 14.95a.75.75 0 01-1.06 0zM10 17.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM14.95 14.95a.75.75 0 01-1.06 0l-1.062-1.06a.75.75 0 111.06-1.06L14.95 13.89a.75.75 0 010 1.06zM17.5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM14.95 5.05a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.06-1.06L13.89 5.05a.75.75 0 011.06 0z" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

export const CrossIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);


export const MiniUnicornIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mini-mane" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="50%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
        </defs>
        <path d="M30,85 C10,85 10,60 30,50 L70,50 C90,50 90,75 70,85 Z" fill="#fff" stroke="#fbcfe8" strokeWidth="3" />
        <circle cx="70" cy="35" r="18" fill="#fff" stroke="#fbcfe8" strokeWidth="3" />
        <circle cx="76" cy="32" r="2" fill="#333" />
        <path d="M70,18 L73,5 L76,18 Z" fill="#fef08a" stroke="#facc15" strokeWidth="1" />
        <path d="M65,18 C55,10 45,25 45,35" fill="none" stroke="url(#mini-mane)" strokeWidth="8" strokeLinecap="round" />
        <rect x="35" y="82" width="10" height="15" rx="5" fill="#fff" stroke="#fbcfe8" strokeWidth="2" />
        <rect x="60" y="82" width="10" height="15" rx="5" fill="#fff" stroke="#fbcfe8" strokeWidth="2" />
    </svg>
);

export const BackIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

import React from 'react';

export const Unicorn: React.FC = () => (
  <div className="w-48 h-48 md:w-64 md:h-64 animate-bounce-slow">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="unicorn-horn" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#fef3c7', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#fde68a', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="unicorn-mane" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: '#f472b6', stopOpacity: 1}} />
          <stop offset="50%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#60a5fa', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      {/* Body */}
      <path d="M 60,150 C 20,150 20,100 60,80 L 140,80 C 180,80 180,130 140,150 Z" fill="#fff" stroke="#fce7f3" strokeWidth="4" />
      {/* Head */}
      <circle cx="140" cy="60" r="30" fill="#fff" stroke="#fce7f3" strokeWidth="4" />
      {/* Eye */}
      <circle cx="150" cy="55" r="4" fill="#333" />
      <circle cx="152" cy="53" r="1.5" fill="#fff" />
      {/* Ear */}
      <path d="M 120,35 C 125,20 135,20 140,35 Z" fill="#fff" stroke="#fce7f3" strokeWidth="3" />
      <path d="M 125,35 C 128,28 132,28 135,35 Z" fill="#fce7f3" />
      {/* Horn */}
      <path d="M 140,30 L 145,5 L 150,30 Z" fill="url(#unicorn-horn)" stroke="#fcd34d" strokeWidth="2" />
      {/* Mane */}
      <path d="M 130,30 C 110,20 90,40 90,60 C 90,80 100,90 115,85" fill="none" stroke="url(#unicorn-mane)" strokeWidth="12" strokeLinecap="round" />
      <path d="M 110,35 C 90,30 75,50 75,65" fill="none" stroke="url(#unicorn-mane)" strokeWidth="10" strokeLinecap="round" />
      {/* Legs */}
      <rect x="70" y="145" width="15" height="25" rx="7.5" fill="#fff" stroke="#fce7f3" strokeWidth="3" />
      <rect x="115" y="145" width="15" height="25" rx="7.5" fill="#fff" stroke="#fce7f3" strokeWidth="3" />
      {/* Tail */}
      <path d="M 50,130 C 20,140 10,110 30,90" fill="none" stroke="url(#unicorn-mane)" strokeWidth="10" strokeLinecap="round" />
       {/* Rainbow trail */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(-5%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translateY(0);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
          }
        `}
      </style>
    </svg>
  </div>
);

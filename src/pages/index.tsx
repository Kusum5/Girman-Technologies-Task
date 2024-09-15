import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      }
    }
  };
    
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Top Navigation Bar */}
      <header className="w-full p-4 bg-white shadow-md">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex item-center space-x-4">
            <img src="/logo1.png" alt="Logo" className="logo-img w-12 h-12" />
            <div className="flex flex-col">
              <div className="text-lg font-bold">Girman</div>
              <p className="text-sm">TECHNOLOGIES</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-blue-500 underline">SEARCH</a>
            <a href="https://girmantech.com" className="text-black">WEBSITE</a>
            <a href="https://www.linkedin.com/company/girmantech/posts/?feedView=all" className="text-black">LINKEDIN</a>
            <a href="mailto:contact@girmantech.com" className="text-black">CONTACT</a>
          </div>
        </div>
      </header>

<main className="flex flex-col items-center mt-16 px-4 w-full max-w-xl">  {/* Reduced mt value */}
  <div className="flex items-center space-x-4">
    <img src="/logo.png" alt="Logo" className="logo-img w-25 h-20"/>
    <h1 className="text-8xl font-semibold">Girman</h1>
  </div>
  <form className="flex text-justify items-center space-x-4 bg-white w-full p-2 rounded border">
          <img src="/magnifying-glass.png" alt="Search Icon" className="w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search"
          />
  </form>
</main>
</div>
  );
};

export default Home;

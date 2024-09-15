import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/search?query=${query}`);
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
              <div className="text-3xl font-bold">Girman</div>
              <p className="text-sm">TECHNOLOGIES</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="/" legacyBehavior><a className="text-blue-500 font-bold underline">SEARCH</a></Link>
            <Link href="https://girmantech.com" legacyBehavior><a className="text-black">WEBSITE</a></Link>
            <Link href="https://www.linkedin.com/company/girmantech/posts/?feedView=all" legacyBehavior><a className="text-black">LINKEDIN</a></Link>
            <Link href="mailto:contact@girmantech.com" legacyBehavior><a className="text-black">CONTACT</a></Link>
          </div>
         </div>
      </header>

    <main className="flex flex-col items-center w-full max-w-xl">  {/* Reduced mt value */}
      <div className="flex mt-16 items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="logo-img w-25 h-20"/>
        <h1 className="text-8xl mt-5 font-semibold">Girman</h1>
      </div>
    <form className="flex text-justify items-center space-x-4 bg-white mt-0  w-full p-2 rounded border">
        <img src="/magnifying-glass.png" alt="Search Icon" className="w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="w-full outline-none focus:ring-0 text-gray-500"
          />
  </form>
</main>
</div>
  );
} 
import { useRouter } from 'next/router';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

type User = {
  first_name: string;
  last_name: string;
  city: string;
  contact_number: string;
};

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>(query as string || '');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      fetch(`/api/users?query=${searchQuery}`)
        .then((res) => {
          if (!res.ok) throw new Error('No results found.');
          return res.json();
        })
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="w-full p-4 bg-white shadow-md">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex items-center space-x-4">
            <Image src="/logo1.png" width={130} height={130} alt="Logo" className="logo-img w-12 h-12" />
            <div className="flex flex-col">
              <div className="text-3xl font-bold">Girman</div>
              <p className="text-sm">TECHNOLOGIES</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 border-gray-300">
            <Image src="/magnifying-glass.png" width={10} height={10} alt="Search Icon" className="w-5 h-5" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="p-2 rounded w-80 text-gray-500"
            />
          </div>
        </div>
      </header>

      <div className="p-8 max-w-5xl mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="flex flex-col items-center">
            <Image src="/not-found.png" alt="Not found" width={130} height={130} className="w-64 mt-10" />
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card>
  <CardHeader>
    <Image src="/placeholder.png" width={60} height={60} alt="Placeholder Image" className="rounded-full object-cover opacity-100" />
    <h2 className="text-2xl">{user.first_name} {user.last_name}</h2>
    <div className="flex items-center space-x-2">
        <MapPinIcon className="w-5 h-5 text-gray-500" />
        <p className="text-gray-500 text-sm">{user.city}</p>
      </div>
  </CardHeader>
  <CardContent className="flex items-center justify-between">
    <div className="flex flex-col">
      <hr className=" border-gray-300 py-2 w-full" />
      <div className="flex items-center space-x-2">
        <PhoneIcon className="w-5 h-5 text-gray-500" />
        <p>{user.contact_number}</p>
      </div>
      <p className="text-gray-400 text-sm">Available on phone</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-black text-white p-2 rounded hover:bg-gray-700 transition-colors">
          Fetch Details
        </button>
      </DialogTrigger>

      {/* DialogContent */}
      <DialogContent className="bg-white text-black p-6 rounded-lg shadow-lg">
        <DialogTitle className="text-2xl font-bold">Fetch Details</DialogTitle>
        <p className="text-gray-400">Here are the details of the following employee.</p>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Location:</strong> {user.city}</p>
        <p><strong>Contact Number:</strong> {user.contact_number}</p>
        <p className='font-semibold'>Profile Image:</p>
        {/* Placeholder Image */}
        <Image
          src="/placeholder.png"
          alt="User Placeholder"
          width={220}
          height={220}
          className="mt-2"
        />

        {/* Close Button using DialogClose */}
        <DialogClose asChild>
          <button className="absolute bottom-4 right-4 border border-gray-300 px-2 w-16 h-10 rounded hover:bg-gray-100 transition-colors">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  </CardContent>
</Card>
  );
}

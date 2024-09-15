import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';

type User = {
  first_name: string;
  last_name: string;
  city: string;
  contact_number: string;
};

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>(query as string);
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      fetch(`/api/users?query=${query}`)
        .then((res) => {
          if (!res.ok) throw new Error('No results found');
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
  }, [query]);  
    
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
            <Image src="/logo1.png" alt="Logo" className="logo-img w-12 h-12" />
            <div className="flex flex-col">
              <div className="text-3xl font-bold">Girman</div>
              <p className="text-sm">TECHNOLOGIES</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 ">
          <Image src="/magnifying-glass.png" alt="Search Icon" className="w-5 h-5" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="p-2 rounded w-80 outline-none focus:ring-0 text-gray-500"
            />
          </div>
        </div>
      </header>

      <div className="p-8 max-w-5xl mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="flex flex-col items-center">
            <Image src="/not-found.png" alt="Not found" className="w-64 mt-10" />
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
    <Card className="border p-4">
      <CardHeader>{user.first_name} {user.last_name}</CardHeader>
      <CardContent>
        <p>City: {user.city}</p>
        <p>Contact: {user.contact_number}</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger>Fetch Details</DialogTrigger>
          <DialogContent>
            <DialogTitle>User Details</DialogTitle>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Contact:</strong> {user.contact_number}</p>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
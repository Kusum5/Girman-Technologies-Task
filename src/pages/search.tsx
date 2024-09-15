import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'; // Adjust imports according to Shadcn usage

const Search: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [details, setDetails] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      fetch(`/api/search?query=${query}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('No users found');
          }
          return res.json();
        })
        .then((data) => {
          setResults(data);
          setError(null);
        })
        .catch((err) => setError(err.message));
    }
  }, [query]);

  const handleFetchDetails = (user: any) => {
    setDetails(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container">
      <header>
        <form>
          <input 
            type="text" 
            value={query || ''} 
            readOnly
            placeholder="Search..." 
          />
        </form>
      </header>
      <main>
        {error ? (
          <p>{error}</p>
        ) : results.length > 0 ? (
          <div className="results">
            {results.map((user) => (
              <div key={user.contact_number} className="card">
                <img src="/placeholder-image.png" alt="User" />
                <h2>{user.first_name} {user.last_name}</h2>
                <p>City: {user.city}</p>
                <p>Contact: {user.contact_number}</p>
                <button onClick={() => handleFetchDetails(user)}>Fetch Details</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </main>

      {/* Dialog for user details */}
      {details && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle>
              {details.first_name} {details.last_name}
            </DialogTitle>
            <p>City: {details.city}</p>
            <p>Contact: {details.contact_number}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Search;
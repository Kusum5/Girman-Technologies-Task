// src/components/UserCard.tsx

import UserDetailsDialog from './UserDetailsDialog';

export default function UserCard({ user }) {
  return (
    <div className="border p-4">
      <img src="/placeholder.png" alt="User" className="w-24 h-24 mb-2" />
      <h3>{user.first_name} {user.last_name}</h3>
      <p>City: {user.city}</p>
      <p>Contact: {user.contact_number}</p>
      <UserDetailsDialog user={user} />
    </div>
  );
}

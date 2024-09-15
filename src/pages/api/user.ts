// src/pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../data/user_list.json';

type User = {
  first_name: string;
  last_name: string;
  city: string;
  contact_number: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<User[] | { message: string }>) {
  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ message: 'Invalid query parameter' });
  }

  const lowerCaseQuery = query.toLowerCase();  // Convert query to lowercase

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(lowerCaseQuery) ||  // Convert first_name to lowercase
    user.last_name.toLowerCase().includes(lowerCaseQuery)      // Convert last_name to lowercase
  );

  if (filteredUsers.length === 0) {
    return res.status(404).json({ message: 'No results found.' });
  }

  res.status(200).json(filteredUsers);
}

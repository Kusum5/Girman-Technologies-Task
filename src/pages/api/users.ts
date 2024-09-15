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

  const lowerCaseQuery = query.trim().toLowerCase();  // Ensure no leading/trailing spaces

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(lowerCaseQuery) ||
    user.last_name.toLowerCase().includes(lowerCaseQuery)
  );

  if (filteredUsers.length === 0) {
    return res.status(404).json({ message: 'No results found.' });
  }

  res.status(200).json(filteredUsers);
}


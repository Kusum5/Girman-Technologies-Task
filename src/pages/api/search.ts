import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../data/user_list.json'; // Assuming your JSON file is stored here

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const searchTerm = (query as string).toLowerCase();
  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm) || 
    user.last_name.toLowerCase().includes(searchTerm) || 
    user.city.toLowerCase().includes(searchTerm)
  );

  if (filteredUsers.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }

  return res.status(200).json(filteredUsers);
};

export default handler;


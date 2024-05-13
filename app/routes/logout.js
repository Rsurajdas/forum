import { json } from '@remix-run/node';
import { getUserFromSession, logoutUser } from '../utils/auth.server';

export const action = async ({ request }) => {
  const profileId = await getUserFromSession(request);

  if (request.method !== 'POST') {
    throw json({ message: 'Invalid Request method' }, { statusCode: 400 });
  }

  return await logoutUser(request, profileId);
};

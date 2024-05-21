import { formatDistanceToNow } from 'date-fns';

export const timeAgo = (date) => formatDistanceToNow(date, { addSuffix: true });

import type IUser from '@/types/IUser';

interface IComment {
    id: number;
    date: number; // unix timestamp in milliseconds.
    user: IUser;
    text: string;
    likes: number;
    iLikedIt: boolean;
}

export default IComment;
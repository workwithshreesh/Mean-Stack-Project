
export interface User{
    id: number;
    name: string;
    email: string;
    role: 'seller' | 'user';
    token: string;
}
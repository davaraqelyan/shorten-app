export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}
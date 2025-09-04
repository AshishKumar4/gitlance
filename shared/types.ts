export interface User {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  email: string;
  url: string;
}
export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  owner: string;
  isPrivate: boolean;
}
export interface RepoFile {
  type: 'file' | 'dir';
  name: string;
  path: string;
  content?: string;
  children?: RepoFile[];
}
export interface Commit {
  hash: string;
  message: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
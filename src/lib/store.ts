import { create } from 'zustand';
import type { User, Repository, RepoFile } from '../../shared/types';
interface AppState {
  user: User | null;
  repositories: Repository[];
  currentRepo: Repository | null;
  fileTree: RepoFile[] | null;
  setUser: (user: User) => void;
  setRepositories: (repos: Repository[]) => void;
  setCurrentRepo: (repo: Repository) => void;
  setFileTree: (tree: RepoFile[] | null) => void;
}
export const useStore = create<AppState>((set) => ({
  user: null,
  repositories: [],
  currentRepo: null,
  fileTree: null,
  setUser: (user) => set({ user }),
  setRepositories: (repos) => set({ repositories: repos }),
  setCurrentRepo: (repo) => set({ currentRepo: repo }),
  setFileTree: (tree) => set({ fileTree: tree }),
}));
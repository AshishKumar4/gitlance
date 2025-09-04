import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RepoFile } from "../../shared/types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function findFileByPath(files: RepoFile[], path: string): RepoFile | undefined {
  if (!path) {
    return undefined;
  }
  const pathParts = path.split('/').filter(p => p);
  let currentLevel: RepoFile[] | undefined = files;
  let foundFile: RepoFile | undefined = undefined;
  for (const part of pathParts) {
    if (!currentLevel) {
      return undefined;
    }
    foundFile = currentLevel.find(file => file.name === part);
    if (!foundFile) {
      return undefined;
    }
    currentLevel = foundFile.children;
  }
  return foundFile;
}
import React from 'react';
import { Commit } from '../../shared/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GitCommit } from 'lucide-react';
interface CommitCardProps {
  commit: Commit;
}
export const CommitCard: React.FC<CommitCardProps> = ({ commit }) => {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `on ${date.toLocaleDateString()}`;
    interval = seconds / 2592000;
    if (interval > 1) return `on ${date.toLocaleDateString()}`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} days ago`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;
    return `${Math.floor(seconds)} seconds ago`;
  };
  return (
    <div className="flex items-start space-x-4 p-4 border-b border-[rgb(34,39,46)] hover:bg-[rgb(34,39,46)]/50 transition-colors duration-200">
      <Avatar className="h-9 w-9">
        <AvatarImage src={commit.author.avatarUrl} alt={commit.author.name} />
        <AvatarFallback>{commit.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="text-base text-gray-200">{commit.message}</p>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <span className="font-semibold text-gray-300">{commit.author.name}</span>
          <span className="mx-1.5">committed {timeAgo(commit.date)}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent border-[rgb(34,39,46)] hover:bg-[rgb(34,39,46)]">
          <GitCommit className="w-3 h-3 mr-2" />
          {commit.hash.substring(0, 7)}
        </Button>
      </div>
    </div>
  );
};
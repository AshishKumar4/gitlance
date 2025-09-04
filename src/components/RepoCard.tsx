import React from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, Lock } from 'lucide-react';
import { Repository } from '../../shared/types';
import { Badge } from '@/components/ui/badge';
interface RepoCardProps {
  repo: Repository;
}
const languageColorMapping: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Shell: 'bg-green-500',
  Go: 'bg-cyan-500',
  CSS: 'bg-purple-500',
  Rust: 'bg-orange-500',
};
export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const langColor = languageColorMapping[repo.language] || 'bg-gray-500';
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };
  return (
    <Link to={`/${repo.owner}/${repo.name}`} className="block">
      <div className="h-full flex flex-col p-6 bg-[rgb(34,39,46)] border border-gray-700 rounded-lg hover:border-[rgb(88,166,255)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgb(88,166,255)]/10">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-[rgb(88,166,255)] hover:underline">{repo.name}</h3>
            {repo.isPrivate && <Badge variant="outline" className="border-yellow-400/50 text-yellow-300 text-xs"><Lock className="w-3 h-3 mr-1" /> Private</Badge>}
          </div>
          <p className="text-gray-400 text-sm mb-4">{repo.description}</p>
        </div>
        <div className="flex items-center text-sm text-gray-400 space-x-4 mt-auto">
          {repo.language && (
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-1.5 ${langColor}`}></span>
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" />
            <span>{repo.forks}</span>
          </div>
          <span>Updated {timeAgo(repo.updatedAt)}</span>
        </div>
      </div>
    </Link>
  );
};
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Commit } from '../../shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { CommitCard } from '@/components/CommitCard';
import { GitCommit, ArrowLeft } from 'lucide-react';
export const CommitsPage: React.FC = () => {
  const { username, repoName } = useParams<{ username: string; repoName: string }>();
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCommits = async () => {
      if (!username || !repoName) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/repos/${username}/${repoName}/commits`);
        if (response.ok) {
          const { data } = await response.json();
          setCommits(data);
        } else {
          console.error('Failed to fetch commits');
        }
      } catch (error) {
        console.error('Error fetching commits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommits();
  }, [username, repoName]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <Link to={`/${username}/${repoName}`} className="flex items-center text-sm text-[rgb(88,166,255)] hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to repository
        </Link>
        <div className="flex items-center space-x-2">
          <GitCommit className="w-6 h-6 text-gray-400" />
          <h1 className="text-3xl font-bold text-white">Commit History for {repoName}</h1>
        </div>
      </div>
      <div className="bg-[rgb(13,17,23)] border border-[rgb(34,39,46)] rounded-lg overflow-hidden">
        {loading ? (
          <CommitPageSkeleton />
        ) : (
          <div>
            {commits.map((commit) => (
              <CommitCard key={commit.hash} commit={commit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
const CommitPageSkeleton: React.FC = () => (
  <div className="p-4 space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    ))}
  </div>
);
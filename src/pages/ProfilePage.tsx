import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Repository } from '../../shared/types';
import { useStore } from '@/lib/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, MapPin, Mail, Link as LinkIcon, Plus } from 'lucide-react';
import { RepoCard } from '@/components/RepoCard';
import { Button } from '@/components/ui/button';
import { NewRepoDialog } from '@/components/NewRepoDialog';
export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user, repositories, setUser, setRepositories } = useStore();
  const [loading, setLoading] = useState(true);
  const [isNewRepoDialogOpen, setIsNewRepoDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${username}`);
        if (response.ok) {
          const { data } = await response.json();
          setUser(data.user);
          setRepositories(data.repos);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username, setUser, setRepositories]);
  if (loading) {
    return <ProfilePageSkeleton />;
  }
  if (!user) {
    return <div className="text-center py-20">User not found.</div>;
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-48 h-48 md:w-full md:h-auto md:max-w-xs border-4 border-[rgb(34,39,46)]">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center md:text-left w-full">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-xl text-gray-400">{user.username}</p>
                <p className="mt-4 text-gray-300">{user.bio}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4 mt-4 text-gray-400">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span><span className="font-bold text-white">{user.followers}</span> followers</span>
                  </div>
                  <span>·</span>
                  <div>
                    <span><span className="font-bold text-white">{user.following}</span> following</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-gray-400 text-sm">
                  {user.location && <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{user.location}</div>}
                  {user.email && <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{user.email}</div>}
                  {user.url && <div className="flex items-center"><LinkIcon className="w-4 h-4 mr-2" /><a href={user.url} className="text-[rgb(88,166,255)] hover:underline">{user.url}</a></div>}
                </div>
              </div>
            </div>
          </aside>
          <main className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Repositories</h2>
              <Button onClick={() => setIsNewRepoDialogOpen(true)} className="bg-[rgb(36,134,54)] hover:bg-[rgb(46,160,67)] text-white">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {repositories.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </main>
        </div>
      </div>
      <NewRepoDialog isOpen={isNewRepoDialogOpen} setIsOpen={setIsNewRepoDialogOpen} />
    </>
  );
};
const ProfilePageSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <Skeleton className="w-48 h-48 md:w-full md:h-auto md:max-w-xs rounded-full md:rounded-lg aspect-square mx-auto md:mx-0" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </aside>
      <main className="md:col-span-3">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-lg" />
          ))}
        </div>
      </main>
    </div>
  </div>
);
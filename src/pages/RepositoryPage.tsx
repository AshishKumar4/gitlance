import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Repository, RepoFile } from '../../shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { FileTree } from '@/components/FileTree';
import { CodeViewer } from '@/components/CodeViewer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PlaceholderContent } from '@/components/PlaceholderContent';
import { findFileByPath } from '@/lib/utils';
import { Star, GitFork, Eye, Code, GitCommit, AlertCircle, GitPullRequest } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export const RepositoryPage: React.FC = () => {
  const { username, repoName, '*': path = '' } = useParams<{ username: string; repoName: string; '*': string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRepo, fileTree, setCurrentRepo, setFileTree } = useStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!username || !repoName) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/repos/${username}/${repoName}`);
        if (response.ok) {
          const { data } = await response.json();
          setCurrentRepo(data.repo);
          setFileTree(data.fileTree);
        } else {
          console.error('Failed to fetch repository data');
        }
      } catch (error) {
        console.error('Error fetching repository data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username, repoName, setCurrentRepo, setFileTree]);
  const { currentFiles, selectedFile } = useMemo(() => {
    if (!fileTree) return { currentFiles: [], selectedFile: null };
    const foundItem = findFileByPath(fileTree, path);
    if (foundItem?.type === 'dir') {
      return { currentFiles: foundItem.children || [], selectedFile: null };
    }
    if (foundItem?.type === 'file') {
      const parentPath = path.substring(0, path.lastIndexOf('/'));
      const parentDir = findFileByPath(fileTree, parentPath);
      return { currentFiles: parentDir?.children || fileTree, selectedFile: foundItem };
    }
    const readmeFile = fileTree.find(f => f.name.toLowerCase() === 'readme.md');
    return { currentFiles: fileTree, selectedFile: path ? null : readmeFile || null };
  }, [fileTree, path]);
  const handleFileSelect = (file: RepoFile) => {
    const newPath = file.type === 'dir' ? `/tree/${file.path}` : `/blob/${file.path}`;
    navigate(`/${username}/${repoName}${newPath}`);
  };
  const handleTabChange = (value: string) => {
    if (value === 'commits') {
      navigate(`/${username}/${repoName}/commits`);
    } else if (value === 'code') {
      navigate(`/${username}/${repoName}`);
    }
  };
  const getCurrentTab = () => {
    if (location.pathname.endsWith('/commits')) return 'commits';
    if (location.pathname.includes('/issues')) return 'issues';
    if (location.pathname.includes('/pulls')) return 'pulls';
    return 'code';
  };
  if (loading) {
    return <RepositoryPageSkeleton />;
  }
  if (!currentRepo) {
    return <div className="text-center py-20">Repository not found.</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center justify-between mb-4">
        <Breadcrumbs username={username!} repoName={repoName!} path={path} />
        <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center"><Eye className="w-4 h-4 mr-1" /> Watch</div>
            <div className="flex items-center"><Star className="w-4 h-4 mr-1" /> {currentRepo.stars} Stars</div>
            <div className="flex items-center"><GitFork className="w-4 h-4 mr-1" /> {currentRepo.forks} Forks</div>
        </div>
      </div>
      <p className="text-gray-400 mb-6">{currentRepo.description}</p>
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="code"><Code className="w-4 h-4 mr-2"/>Code</TabsTrigger>
          <TabsTrigger value="commits"><GitCommit className="w-4 h-4 mr-2"/>Commits</TabsTrigger>
          <TabsTrigger value="issues"><AlertCircle className="w-4 h-4 mr-2"/>Issues</TabsTrigger>
          <TabsTrigger value="pulls"><GitPullRequest className="w-4 h-4 mr-2"/>Pull Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <FileTree files={currentFiles} onFileSelect={handleFileSelect} selectedPath={selectedFile?.path} />
            </div>
            <div className="lg:col-span-9">
              <CodeViewer selectedFile={selectedFile} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="issues">
          <PlaceholderContent 
            icon={AlertCircle}
            title="Welcome to Issues!"
            message="Issues are used to track tasks, enhancements, and bugs for projects on GitGlance. This feature is currently under construction."
          />
        </TabsContent>
        <TabsContent value="pulls">
          <PlaceholderContent 
            icon={GitPullRequest}
            title="There aren’t any open pull requests."
            message="Pull requests are a way to propose changes to the codebase. This feature is coming soon!"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
const RepositoryPageSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    <Skeleton className="h-7 w-1/3 mb-6" />
    <Skeleton className="h-5 w-2/3 mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-3">
        <Skeleton className="h-96 rounded-lg" />
      </div>
      <div className="lg:col-span-9">
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  </div>
);
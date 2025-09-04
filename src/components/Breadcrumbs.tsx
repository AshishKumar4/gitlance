import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
interface BreadcrumbsProps {
  username: string;
  repoName: string;
  path: string;
}
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ username, repoName, path }) => {
  const pathParts = path ? path.split('/').filter(p => p) : [];
  return (
    <nav className="flex items-center text-lg sm:text-xl text-gray-300 mb-4 flex-wrap">
      <Link to={`/${username}/${repoName}`} className="font-semibold text-[rgb(88,166,255)] hover:underline">
        {repoName}
      </Link>
      {pathParts.length > 0 && <span className="mx-1.5 text-gray-500">/</span>}
      {pathParts.map((part, index) => {
        const currentPath = pathParts.slice(0, index + 1).join('/');
        const isLast = index === pathParts.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="font-semibold text-white truncate">{part}</span>
            ) : (
              <Link to={`/${username}/${repoName}/tree/${currentPath}`} className="text-[rgb(88,166,255)] hover:underline">
                {part}
              </Link>
            )}
            {!isLast && <span className="mx-1.5 text-gray-500">/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
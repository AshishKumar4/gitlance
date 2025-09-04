import React, { useState } from 'react';
import { RepoFile } from '../../shared/types';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
interface FileTreeProps {
  files: RepoFile[];
  onFileSelect: (file: RepoFile) => void;
  selectedPath?: string;
}
const FileTreeItem: React.FC<{ 
  item: RepoFile; 
  onFileSelect: (file: RepoFile) => void; 
  level: number;
  selectedPath?: string;
}> = ({ item, onFileSelect, level, selectedPath }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDir = item.type === 'dir';
  const isSelected = item.path === selectedPath;
  const paddingLeft = `${level * 1.25}rem`;
  const handleToggle = () => {
    onFileSelect(item);
    if (isDir) {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div>
      <div
        className={cn(
          "flex items-center p-2 text-sm cursor-pointer hover:bg-[rgb(34,39,46)] rounded-md",
          isSelected && "bg-[rgb(34,39,46)] text-white"
        )}
        style={{ paddingLeft }}
        onClick={handleToggle}
      >
        {isDir ? (
          isOpen ? <ChevronDown className="w-4 h-4 mr-2 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
        ) : (
          <File className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
        )}
        {isDir && <Folder className={`w-4 h-4 mr-2 flex-shrink-0 ${isOpen ? 'text-blue-400' : 'text-gray-500'}`} />}
        <span className="truncate">{item.name}</span>
      </div>
      {isDir && isOpen && item.children && (
        <div>
          {item.children.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)).map(child => (
            <FileTreeItem key={child.path} item={child} onFileSelect={onFileSelect} level={level + 1} selectedPath={selectedPath} />
          ))}
        </div>
      )}
    </div>
  );
};
export const FileTree: React.FC<FileTreeProps> = ({ files, onFileSelect, selectedPath }) => {
  if (!files) return null;
  const sortedFiles = [...files].sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
  return (
    <div className="bg-[rgb(13,17,23)] border border-[rgb(34,39,46)] rounded-lg p-2">
      {sortedFiles.map(item => (
        <FileTreeItem key={item.path} item={item} onFileSelect={onFileSelect} level={0} selectedPath={selectedPath} />
      ))}
    </div>
  );
};
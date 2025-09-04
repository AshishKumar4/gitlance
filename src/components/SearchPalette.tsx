import React, { useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { File, User } from 'lucide-react';
import { MOCK_USER, MOCK_REPOSITORIES } from '../../shared/mock-data';
import { useNavigate } from 'react-router-dom';
interface SearchPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const SearchPalette: React.FC<SearchPaletteProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, setIsOpen]);
  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Users">
          <CommandItem onSelect={() => handleSelect(`/${MOCK_USER.username}`)}>
            <User className="mr-2 h-4 w-4" />
            <span>{MOCK_USER.name}</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Repositories">
          {MOCK_REPOSITORIES.map((repo) => (
            <CommandItem key={repo.id} onSelect={() => handleSelect(`/${repo.owner}/${repo.name}`)}>
              <File className="mr-2 h-4 w-4" />
              <span>{repo.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
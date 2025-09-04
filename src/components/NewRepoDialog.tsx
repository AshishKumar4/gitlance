import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Book, Lock, Globe } from 'lucide-react';
interface NewRepoDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const NewRepoDialog: React.FC<NewRepoDialogProps> = ({ isOpen, setIsOpen }) => {
  const [isPrivate, setIsPrivate] = React.useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] bg-[rgb(13,17,23)] border-[rgb(34,39,46)] text-gray-300">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create a new repository</DialogTitle>
          <DialogDescription>
            A repository contains all project files, including the revision history.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="my-awesome-project" className="col-span-3 bg-[rgb(13,17,23)] border-[rgb(34,39,46)] focus:ring-[rgb(88,166,255)]" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" placeholder="A short description of your project." className="col-span-3 bg-[rgb(13,17,23)] border-[rgb(34,39,46)] focus:ring-[rgb(88,166,255)]" />
          </div>
          <div className="flex items-center space-x-2 justify-end col-span-4">
            <div className="flex items-center space-x-2 mr-auto pl-[calc(25%+1rem)]">
              {isPrivate ? <Lock className="w-4 h-4 text-yellow-400" /> : <Globe className="w-4 h-4 text-green-400" />}
              <Label htmlFor="visibility-switch">{isPrivate ? 'Private' : 'Public'}</Label>
            </div>
            <Switch id="visibility-switch" checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="bg-transparent border-[rgb(34,39,46)] hover:bg-[rgb(34,39,46)]">Cancel</Button>
          <Button type="submit" onClick={() => setIsOpen(false)} className="bg-[rgb(36,134,54)] hover:bg-[rgb(46,160,67)] text-white">
            <Book className="w-4 h-4 mr-2" />
            Create repository
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
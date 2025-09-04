import React from 'react';
import { Button } from './ui/button';
interface PlaceholderContentProps {
  icon: React.ElementType;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}
export const PlaceholderContent: React.FC<PlaceholderContentProps> = ({
  icon: Icon,
  title,
  message,
  actionText,
  onAction,
}) => {
  return (
    <div className="text-center py-16 px-6 border-2 border-dashed border-[rgb(34,39,46)] rounded-lg mt-6">
      <div className="flex justify-center items-center mb-4">
        <Icon className="w-12 h-12 text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6">{message}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className="bg-[rgb(36,134,54)] hover:bg-[rgb(46,160,67)] text-white">
          {actionText}
        </Button>
      )}
    </div>
  );
};
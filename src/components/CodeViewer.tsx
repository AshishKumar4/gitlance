import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RepoFile } from '../../shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
interface CodeViewerProps {
  selectedFile: RepoFile | null;
}
const getLanguage = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'js': return 'javascript';
    case 'ts':
    case 'tsx': return 'typescript';
    case 'py': return 'python';
    case 'java': return 'java';
    case 'cs': return 'csharp';
    case 'php': return 'php';
    case 'cpp': return 'cpp';
    case 'c': return 'c';
    case 'h': return 'c';
    case 'go': return 'go';
    case 'rb': return 'ruby';
    case 'rs': return 'rust';
    case 'kt': return 'kotlin';
    case 'swift': return 'swift';
    case 'md': return 'markdown';
    case 'json': return 'json';
    case 'html': return 'html';
    case 'css': return 'css';
    case 'scss': return 'scss';
    case 'sh': return 'bash';
    case 'yml':
    case 'yaml': return 'yaml';
    case 'toml': return 'toml';
    default: return 'plaintext';
  }
};
export const CodeViewer: React.FC<CodeViewerProps> = ({ selectedFile }) => {
  if (!selectedFile || selectedFile.type !== 'file') {
    return (
      <Card className="bg-[rgb(13,17,23)] border-[rgb(34,39,46)] h-full flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
        <CardContent className="text-center text-gray-500 p-6">
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <p>Select a file to view its content</p>
        </CardContent>
      </Card>
    );
  }
  const language = getLanguage(selectedFile.name);
  return (
    <Card className="bg-[rgb(13,17,23)] border-[rgb(34,39,46)] overflow-hidden">
      <CardHeader className="bg-[rgb(34,39,46)] p-3 px-4 border-b border-[rgb(34,39,46)]">
        <CardTitle className="text-sm font-medium text-gray-300">{selectedFile.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-sm">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, background: 'rgb(13,17,23)', maxHeight: '70vh' }}
          codeTagProps={{ style: { fontFamily: '"JetBrains Mono", monospace' } }}
          showLineNumbers
        >
          {selectedFile.content || ''}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
};
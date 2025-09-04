import type { User, Repository, RepoFile, Commit } from './types';
export const MOCK_USER: User = {
  username: 'code-visionary',
  name: 'Alex Turing',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4', // A generic but cool avatar
  bio: 'Architecting the future, one line of code at a time. Passionate about serverless, AI, and elegant design.',
  followers: 2048,
  following: 128,
  location: 'The Cloud, Global',
  email: 'alex.turing@gitglance.dev',
  url: 'https://alex-turing.dev',
};
export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: '1',
    name: 'project-sentinel',
    description: 'A next-gen security monitoring tool built with Cloudflare Workers and Durable Objects.',
    language: 'TypeScript',
    stars: 1200,
    forks: 45,
    updatedAt: '2024-08-15T10:30:00Z',
    owner: 'code-visionary',
    isPrivate: false,
  },
  {
    id: '2',
    name: 'react-particle-motion',
    description: 'A performant React library for creating beautiful particle animations with Framer Motion.',
    language: 'TypeScript',
    stars: 850,
    forks: 32,
    updatedAt: '2024-08-10T18:00:00Z',
    owner: 'code-visionary',
    isPrivate: false,
  },
  {
    id: '3',
    name: 'dotfiles',
    description: 'My personal development environment configuration. ZSH, Neovim, and more.',
    language: 'Shell',
    stars: 300,
    forks: 15,
    updatedAt: '2024-08-01T11:00:00Z',
    owner: 'code-visionary',
    isPrivate: false,
  },
  {
    id: '4',
    name: 'serverless-graphql-gateway',
    description: 'A lightweight, scalable GraphQL gateway running on the edge.',
    language: 'Go',
    stars: 950,
    forks: 78,
    updatedAt: '2024-07-25T14:20:00Z',
    owner: 'code-visionary',
    isPrivate: false,
  },
  {
    id: '5',
    name: 'design-system-nova',
    description: 'A modern, accessible, and themeable React component library.',
    language: 'CSS',
    stars: 620,
    forks: 22,
    updatedAt: '2024-07-20T09:00:00Z',
    owner: 'code-visionary',
    isPrivate: false,
  },
  {
    id: '6',
    name: 'rust-cli-toolkit',
    description: 'A collection of utilities for building powerful command-line interfaces in Rust.',
    language: 'Rust',
    stars: 480,
    forks: 19,
    updatedAt: '2024-06-30T12:00:00Z',
    owner: 'code-visionary',
    isPrivate: true,
  },
];
export const MOCK_FILE_TREES: Record<string, RepoFile[]> = {
  'project-sentinel': [
    {
      type: 'dir',
      name: 'src',
      path: 'src',
      children: [
        { type: 'dir', name: 'components', path: 'src/components', children: [
            { type: 'file', name: 'Button.tsx', path: 'src/components/Button.tsx', content: 'export const Button = () => <button>Click Me</button>;' },
            { type: 'file', name: 'Card.tsx', path: 'src/components/Card.tsx', content: 'export const Card = ({ children }) => <div>{children}</div>;' },
        ]},
        { type: 'dir', name: 'hooks', path: 'src/hooks', children: [
            { type: 'file', name: 'useUser.ts', path: 'src/hooks/useUser.ts', content: 'import { useState } from "react"; export const useUser = () => useState(null);' },
        ]},
        { type: 'file', name: 'index.ts', path: 'src/index.ts', content: 'console.log("Hello, World!");' },
      ],
    },
    {
      type: 'file',
      name: 'README.md',
      path: 'README.md',
      content: '# Project Sentinel\n\nA next-gen security monitoring tool built with Cloudflare Workers and Durable Objects.\n\n## Features\n- Real-time threat detection\n- Edge-native architecture\n- Low-latency global monitoring',
    },
    { type: 'file', name: 'package.json', path: 'package.json', content: '{ "name": "project-sentinel", "version": "1.0.0" }' },
    { type: 'file', name: 'wrangler.toml', path: 'wrangler.toml', content: 'name = "project-sentinel"' },
  ],
  'react-particle-motion': [
    {
      type: 'dir',
      name: 'src',
      path: 'src',
      children: [
        { type: 'file', name: 'index.tsx', path: 'src/index.tsx', content: 'console.log("Particles!");' },
      ],
    },
    {
      type: 'file',
      name: 'README.md',
      path: 'README.md',
      content: '# React Particle Motion\n\nA performant React library for creating beautiful particle animations.',
    },
  ],
};
export const MOCK_COMMITS: Record<string, Commit[]> = {
  'project-sentinel': [
    {
      hash: 'a1b2c3d4',
      message: 'feat: Implement real-time threat detection engine',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-15T10:00:00Z',
    },
    {
      hash: 'e5f6g7h8',
      message: 'fix: Optimize durable object storage access',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-14T15:30:00Z',
    },
    {
      hash: 'i9j0k1l2',
      message: 'docs: Update README with setup instructions',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-13T09:00:00Z',
    },
    {
      hash: 'm3n4o5p6',
      message: 'refactor: Move API routes to separate modules',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-12T18:45:00Z',
    },
    {
      hash: 'q7r8s9t0',
      message: 'Initial commit',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-10T12:00:00Z',
    },
  ],
  'react-particle-motion': [
    {
      hash: 'u1v2w3x4',
      message: 'feat: Add support for custom particle shapes',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-10T17:00:00Z',
    },
    {
      hash: 'y5z6a7b8',
      message: 'perf: Improve rendering performance with WebGL',
      author: { name: 'Alex Turing', avatarUrl: MOCK_USER.avatarUrl },
      date: '2024-08-09T11:20:00Z',
    },
  ],
};
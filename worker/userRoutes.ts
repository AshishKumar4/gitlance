import { Hono } from "hono";
import { Env } from './core-utils';
import type { User, Repository, RepoFile, ApiResponse, Commit } from '../shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/users/:username', async (c) => {
        const { username } = c.req.param();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const user = await stub.getUser(username);
        const repos = await stub.getRepositoriesByUser(username);
        if (!user) {
            return c.json({ success: false, error: 'User not found' }, 404);
        }
        return c.json({ success: true, data: { user, repos } } satisfies ApiResponse<{ user: User; repos: Repository[] }>);
    });
    app.get('/api/repos/:username/:repoName', async (c) => {
        const { username, repoName } = c.req.param();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const repo = await stub.getRepository(username, repoName);
        const fileTree = await stub.getRepoFileTree(username, repoName);
        if (!repo) {
            return c.json({ success: false, error: 'Repository not found' }, 404);
        }
        return c.json({ success: true, data: { repo, fileTree } } satisfies ApiResponse<{ repo: Repository; fileTree: RepoFile[] | null }>);
    });
    app.get('/api/repos/:username/:repoName/commits', async (c) => {
        const { username, repoName } = c.req.param();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const commits = await stub.getRepoCommits(username, repoName);
        if (!commits) {
            return c.json({ success: false, error: 'Commits not found' }, 404);
        }
        return c.json({ success: true, data: commits } satisfies ApiResponse<Commit[]>);
    });
}
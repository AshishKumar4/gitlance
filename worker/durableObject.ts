import { DurableObject } from "cloudflare:workers";
import type { User, Repository, RepoFile, Commit } from '../shared/types';
import { MOCK_USER, MOCK_REPOSITORIES, MOCK_FILE_TREES, MOCK_COMMITS } from '../shared/mock-data';
// **DO NOT MODIFY THE CLASS NAME**
export class GlobalDurableObject extends DurableObject {
    async initializeData(): Promise<void> {
        const userExists = await this.ctx.storage.get("user:code-visionary");
        if (!userExists) {
            await this.ctx.storage.put("user:code-visionary", MOCK_USER);
            await this.ctx.storage.put("repos:code-visionary", MOCK_REPOSITORIES);
            for (const repoName in MOCK_FILE_TREES) {
                await this.ctx.storage.put(`tree:code-visionary:${repoName}`, MOCK_FILE_TREES[repoName]);
            }
            for (const repoName in MOCK_COMMITS) {
                await this.ctx.storage.put(`commits:code-visionary:${repoName}`, MOCK_COMMITS[repoName]);
            }
        }
    }
    async getUser(username: string): Promise<User | null> {
        await this.initializeData();
        if (username.toLowerCase() === 'code-visionary') {
            const user = await this.ctx.storage.get<User>("user:code-visionary");
            return user ?? null;
        }
        return null;
    }
    async getRepositoriesByUser(username: string): Promise<Repository[]> {
        await this.initializeData();
        if (username.toLowerCase() === 'code-visionary') {
            const repos = await this.ctx.storage.get<Repository[]>("repos:code-visionary");
            return repos || [];
        }
        return [];
    }
    async getRepository(username: string, repoName: string): Promise<Repository | null> {
        await this.initializeData();
        if (username.toLowerCase() === 'code-visionary') {
            const repos = await this.ctx.storage.get<Repository[]>("repos:code-visionary");
            return repos?.find(repo => repo.name.toLowerCase() === repoName.toLowerCase()) || null;
        }
        return null;
    }
    async getRepoFileTree(username: string, repoName: string): Promise<RepoFile[] | null> {
        await this.initializeData();
        if (username.toLowerCase() === 'code-visionary') {
            const tree = await this.ctx.storage.get<RepoFile[]>(`tree:code-visionary:${repoName.toLowerCase()}`);
            return tree ?? null;
        }
        return null;
    }
    async getRepoCommits(username: string, repoName: string): Promise<Commit[] | null> {
        await this.initializeData();
        if (username.toLowerCase() === 'code-visionary') {
            const commits = await this.ctx.storage.get<Commit[]>(`commits:code-visionary:${repoName.toLowerCase()}`);
            return commits ?? null;
        }
        return null;
    }
}
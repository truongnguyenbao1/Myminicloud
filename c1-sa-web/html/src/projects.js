/**
 * projects.js — Fetch & render GitHub repositories
 * MyMiniCloud is shown in the featured card (index.html), excluded here.
 */

const GITHUB_USERNAME = 'truongnguyenbao1';
const FEATURED_REPO   = 'myminicloud'; // excluded from the grid

async function fetchUserProfile() {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!res.ok) return;
        const user = await res.json();

        // Stats
        const repoEl     = document.getElementById('repo-count');
        const followerEl = document.getElementById('follower-count');
        if (repoEl)     repoEl.textContent     = user.public_repos;
        if (followerEl) followerEl.textContent = user.followers;

        // Bio (if available and different from default)
        if (user.bio) {
            const aboutP = document.querySelector('.about-content > p');
            if (aboutP) aboutP.textContent = user.bio;
        }
    } catch (err) {
        console.warn('Could not fetch GitHub profile:', err.message);
    }
}

async function fetchGitHubProjects() {
    const container = document.getElementById('github-projects');
    if (!container) return;

    fetchUserProfile();

    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const repos = await res.json();
        renderProjects(repos);
    } catch (err) {
        container.innerHTML = '<p style="color:var(--muted)">Không thể tải dự án từ GitHub.</p>';
        console.error('fetchGitHubProjects error:', err.message);
    }
}

function renderProjects(repos) {
    const container = document.getElementById('github-projects');
    if (!container) return;

    // Filter out the featured project and forks
    const filtered = repos.filter(
        r => r.name.toLowerCase() !== FEATURED_REPO && !r.fork
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p style="color:var(--muted)">Chưa có dự án nào khác.</p>';
        return;
    }

    container.innerHTML = '';

    filtered.forEach(repo => {
        const langTag = repo.language
            ? `<span class="tech-tag">${repo.language}</span>`
            : '';

        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Chưa có mô tả cho dự án này.'}</p>
            <div class="project-tech">
                ${langTag}
                <span class="tech-tag">⭐ ${repo.stargazers_count}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
                Xem trên GitHub
            </a>
        `;
        container.appendChild(card);
    });
}

// Init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
} else {
    fetchGitHubProjects();
}

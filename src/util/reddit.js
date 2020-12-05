import Post from 'src/model/post';

export default {
    /**
     * @param {string} [category] buying | selling | trading
     * @param {string} [region]
     * @param {string} [query]
     * @return {Post[]}
     */
    async fetchPosts(category, region, query) {
        const filters = [];
        if (category) filters.push(`flair:${category}`);
        if (region) filters.push(`title:[${region.toUpperCase()}`);
        if (query) filters.push(query);
        const q = filters.join(' ');

        const url = new URL('https://www.reddit.com/r/mechmarket/search/.json');
        url.searchParams.append('restrict_sr', 'on'); // restrict subreddit
        url.searchParams.append('sort', 'new'); // sort by latest
        url.searchParams.append('q', q);
        const res = await fetch(url.toString());
        const json = await res.json();
        const posts = json.data.children.map((thread) => thread.data);

        return await Promise.all(posts.map(Post.fromRedditPost));
    },
};
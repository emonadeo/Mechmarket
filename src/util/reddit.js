import analyser from './analyser';

class Post {
    /**
     * @param category {string}
     * @param author {string}
     * @param region {string}
     * @param have {string[]}
     * @param want {string[]}
     * @param href {string}
     * @param pictures {string[]}
     */
    constructor(category, author, region, have, want, href, pictures) {
        this.category = category;
        this.author = author;
        this.region = region;
        this.have = have;
        this.want = want;
        this.href = href;
        this.pictures = pictures;
    }

    get title() {
        switch (this.category.toLowerCase()) {
            case 'selling': {
                return this.have.join(', ');
            }
            case 'buying': {
                return this.want.join(', ');
            }
            case 'trading': {
                return `${this.have.join(', ')} <-> ${this.want.join(', ')}`;
            }
        }
    }

    /**
     * @param {Object} post
     * @return {Post}
     */
    static async fromRedditPost(post) {
        /**
         * @param {string} text
         * @returns {string}
         */
        function extractRegion(text) {
            return /\[\w+(-\w+)?]/.exec(text)[0].slice(1, -1);
        }

        /**
         * @param {string} text
         * @param {boolean} have
         * @returns {string[]}
         */
        function extractProducts(text, have) {
            return text
                .split('[H]')[1]
                .split('[W]')
                [have ? 0 : 1].split(',')
                .map((s) => s.trim());
        }

        return new Post(
            post.link_flair_text,
            post.author,
            extractRegion(post.title),
            extractProducts(post.title, true),
            extractProducts(post.title, false),
            post.url,
            await analyser.getPictures(post.selftext)
        );
    }
}

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

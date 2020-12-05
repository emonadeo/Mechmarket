import analyser from 'src/util/analyser';

/**
 * Represents a mechmarket entry
 */
export default class Post {
    /**
     * @param id {string}
     * @param category {string}
     * @param author {string}
     * @param region {string}
     * @param have {string[]}
     * @param want {string[]}
     * @param href {string}
     * @param pictures {string[]}
     */
    constructor(id, category, author, region, have, want, href, pictures) {
        this.id = id;
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
            post.id,
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

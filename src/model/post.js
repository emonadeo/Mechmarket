import showdown from 'showdown';
import imgur from 'src/util/imgur.js';
import { methods } from 'src/components/PaymentMethod.vue';

const md = new showdown.Converter({ tables: true, strikethrough: true, simplifiedAutoLink: true });

const paymentMethods = Object.keys(methods);

/**
 * Represents a mechmarket entry
 */
export default class Post {
    /**
     * @param {string} id
     * @param {string} category
     * @param {string} author
     * @param {Date} date
     * @param {string} region
     * @param {string} description
     * @param {string[]} have
     * @param {string[]} want
     * @param {string} href
     * @param {string[]} pictures
     */
    constructor(id, category, author, date, region, description, have, want, href, pictures) {
        this.id = id;
        this.category = category;
        this.author = author;
        this.date = date;
        this.region = region;
        this.description = md.makeHtml(description);
        this.have = have;
        this.want = want;
        this.pictures = pictures;
        this.href = href;
        this.haveProducts = this.have.filter((m) => paymentMethods.indexOf(m.toLowerCase()) === -1);
        this.wantProducts = this.want.filter((m) => paymentMethods.indexOf(m.toLowerCase()) === -1);
        this.havePaymentMethods = this.have.filter((m) => paymentMethods.indexOf(m.toLowerCase()) !== -1);
        this.wantPaymentMethods = this.want.filter((m) => paymentMethods.indexOf(m.toLowerCase()) !== -1);
    }

    get title() {
        switch (this.category) {
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

    get selling() {
        return this.category === 'selling';
    }

    get buying() {
        return this.category === 'buying';
    }

    get trading() {
        return this.category === 'trading';
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
                .map((s) => s.trim())
                .filter((s) => s.length !== 0);
        }

        /**
         * @param {string} str
         * @return string
         */
        function decode(str) {
            return str
                .replace(/&amp;/gi, '&') // Fix special characters
                .replace(/&(#x200B|nbsp);/gi, '') // Remove extra whitespace
                .replace(/:-/g, ':--'); // Fix tables
        }

        let pictures = [];

        try {
            pictures = await imgur.getPictures(post.selftext);
        } catch (e) {
            // Likely 423 Too many Requests.
            // CORS fails because the preflight OPTIONS request is also turned down with 423.
        }

        return new Post(
            post.id,
            post.link_flair_text.toLowerCase(),
            post.author,
            new Date(post.created_utc * 1000),
            extractRegion(post.title),
            decode(post.selftext),
            extractProducts(post.title, true),
            extractProducts(post.title, false),
            post.url,
            pictures
        );
    }
}

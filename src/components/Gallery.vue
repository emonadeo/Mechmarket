<template>
    <div class="gallery">
        <!-- fullscreen -->
        <div class="fullscreen surface" v-show="fullscreen">
            <div class="actions">
                <btn class="icon-button" @click="close()">
                    <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        />
                    </svg>
                </btn>
            </div>
            <div class="slider" ref="slider">
                <img v-for="picture in pictures" :src="picture" :alt="picture" />
            </div>
            <div class="footer">
                <span>{{ position }}</span>
                <span class="slash">/</span>
                <span>{{ pictures.length }}</span>
            </div>
        </div>
        <!-- grid -->
        <div class="grid">
            <masonry :cols="this.breakpoints" :gutter="'1rem'">
                <img
                    class="gallery-item"
                    v-for="(picture, index) in limit !== 0 ? pictures.slice(0, limit) : pictures"
                    :key="picture"
                    :src="picture"
                    :alt="picture"
                    @click="open(index)"
                />
            </masonry>
        </div>
        <!-- show hint if more than 4 images -->
        <p class="hint" v-if="limit && pictures.length > limit">
            + {{ pictures.length - limit }} more image{{ pictures.length !== limit + 1 ? 's' : '' }}
        </p>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';

export default {
    components: {
        Btn,
    },
    props: {
        pictures: Array,
        limit: Number,
    },
    data: (ctx) => ({
        fullscreen: false,
        position: -1,
        breakpoints: {
            default: ctx.cols(3),
            640: ctx.cols(2),
        },
    }),
    methods: {
        cols(max) {
            return this.pictures.length > max ? max : this.pictures.length;
        },
        open(picture) {
            if (this.fullscreen) return;
            this.fullscreen = true;
            this.$nextTick(() => {
                this.$refs.slider.scrollLeft = this.$refs.slider.clientWidth * picture;
                this.updatePosition();
            });
        },
        close() {
            if (!this.fullscreen) return;
            this.fullscreen = false;
        },
        updatePosition() {
            this.position = Math.round(this.$refs.slider.scrollLeft / this.$refs.slider.clientWidth + 1);
        },
    },
    mounted() {
        this.$refs.slider.addEventListener('scroll', this.updatePosition);
    },
};
</script>

<style lang="scss" scoped>
.gallery {
    .fullscreen {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        z-index: 100;

        svg {
            fill: var(--primary);
        }

        .actions,
        .footer {
            height: 2.5rem;
            display: flex;
            justify-content: flex-end;
        }

        .slider {
            flex: 1;
            display: flex;
            align-items: center;
            width: 100%;
            overflow-y: auto;
            scroll-snap-type: x mandatory;

            img {
                scroll-snap-align: center;
                width: 100%;
            }
        }

        .footer {
            padding: 0.5rem;

            .slash {
                color: var(--secondary);
            }

            span:not(:last-child) {
                margin-right: 0.5rem;
            }
        }
    }

    .grid {
        .gallery-item {
            border: 2px solid var(--secondary);
            display: block;
            width: 100%;

            &:not(:last-child) {
                margin-bottom: 1rem;
            }
        }
    }

    .hint {
        margin-top: 0.5rem;
        text-align: right;
        font-size: 0.75rem;
    }
}
</style>

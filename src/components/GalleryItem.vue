<template>
    <div class="gallery-item surface" :ref="src">
        <title-bar v-show="viewing === src">
            <btn class="icon-button" @click="close(src)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    />
                </svg>
            </btn>
        </title-bar>
        <div class="img-container">
            <img alt="picture" :src="src" @click="view(src)" />
        </div>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import TitleBar from 'src/components/TitleBar.vue';

export default {
    props: {
        src: String,
    },
    components: {
        Btn,
        TitleBar,
    },
    data: () => ({
        viewing: '',
    }),
    methods: {
        view(ref) {
            if (this.viewing !== '') return;
            this.$refs[ref].classList.add('fullscreen');
            this.viewing = ref;
        },
        close(ref) {
            if (this.viewing === '') return;
            this.$refs[ref].classList.remove('fullscreen');
            this.viewing = '';
        },
    },
};
</script>

<style lang="scss">
@use "src/styles/constants" as c;

.gallery-item {
    border: 2px solid var(--secondary);

    &.fullscreen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
    }

    .title-bar {
        display: flex;
        border-bottom: 1px solid var(--primary);

        svg {
            fill: var(--primary);
        }
    }

    img {
        display: block;
        width: 100%;
    }
}
</style>

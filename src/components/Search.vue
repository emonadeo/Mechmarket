<template>
    <div class="search">
        <textfield
            name="q"
            type="text"
            placeholder="Search"
            aria-label="Search"
            :value="$route.query.q"
            @focus.native="edit"
            @blur.native="unedit"
        />
        <btn v-show="$route.query.q" class="icon-button" :to="{ query: { ...$route.query, q: undefined } }">
            <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem">
                <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                />
            </svg>
        </btn>
        <btn v-show="editing" class="icon-button" type="submit">
            <svg viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
            </svg>
        </btn>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Textfield from 'src/components/Textfield.vue';

export default {
    components: {
        Btn,
        Textfield,
    },
    data: () => ({
        editing: false,
        timeout: 0,
    }),
    methods: {
        edit() {
            clearTimeout(this.timeout);
            this.editing = true;
        },
        unedit() {
            this.timeout = setTimeout(() => (this.editing = false), 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
@use 'sass:color';

.search {
    width: 100%;
    display: flex;

    .textfield {
        height: 100%;
        padding-left: 1rem;
        flex: 1;

        &::placeholder {
            opacity: 0.54;
        }
    }
}
</style>

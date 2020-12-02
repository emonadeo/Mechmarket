<template>
    <form class="search">
        <input name="q" type="text" placeholder="Search" @input="search" :value="$route.query.q" aria-label="Search" />
        <btn>-></btn>
    </form>
</template>

<script>
import Btn from 'src/components/Btn.vue';

export default {
    components: {
        Btn,
    },
    methods: {
        search(q) {
            this.$store.commit('updateQuery', q.target.value);
        },
    },
};
</script>

<style lang="scss" scoped>
@use 'sass:color';

.search {
    width: 100%;

    input {
        height: 100%;
        width: 100%;
        display: block;
        color: inherit;
        border: none;
        background-color: transparent;
        padding: 0.5rem 1rem;

        &::placeholder {
            color: var(--primary);
            opacity: 0.54;
        }
    }
}
</style>

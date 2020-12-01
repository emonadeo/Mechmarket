<template>
    <form class="search">
        <input
            name="q"
            type="text"
            placeholder="Search"
            @input="search"
            :value="$store.state.query"
            aria-label="Search"
        />
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
        padding: 0.5rem;

        &::placeholder {
            color: var(--primary);
            opacity: 0.54;
        }
    }
}
</style>

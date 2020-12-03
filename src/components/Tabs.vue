<template>
    <nav class="tabs">
        <router-link
            v-for="tab in tabs"
            class="tab"
            :key="tab"
            :to="{ name: to, params: { flair: tab.toLowerCase() }, query: $route.query }"
            :selected="$route.params.flair === tab.toLowerCase()"
        >
            {{ tab }}
        </router-link>
    </nav>
</template>

<script>
export default {
    props: {
        to: String,
        tabs: Array[String],
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/constants" as c;

.tabs {
    display: flex;

    .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: inherit;
        padding: 0.5rem;
        height: c.$height;

        &:not(:last-child) {
            border-right: c.$border;
        }

        &[selected] {
            font-weight: 700;
            background-color: var(--secondary);
        }
    }
}
</style>

<template>
    <nav class="tabs">
        <router-link
            v-for="tab in tabs"
            class="tab"
            :to="{ name: 'home', params: { flair: tab.toLowerCase() }, query: $route.query }"
            :selected="$route.params.flair === tab.toLowerCase()"
        >
            {{ tab }}
        </router-link>
    </nav>
</template>

<script>
export default {
    props: {
        tabs: Array[String],
    },
};
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    border-bottom: 1px solid var(--primary);

    .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: inherit;
        padding: 0.5rem;

        &:not(:last-child) {
            border-right: 1px solid var(--primary);
        }

        &[selected] {
            font-weight: 700;
            background-color: var(--secondary);
        }
    }
}
</style>

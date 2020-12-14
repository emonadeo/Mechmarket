<template>
    <nav class="tabs">
        <router-link
            v-for="tab in tabs"
            class="tab"
            :key="tab"
            :to="{ name: to, params: { category: tab.toLowerCase() }, query: $route.query }"
            :selected="$route.params.category === tab.toLowerCase()"
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
@use "src/styles/responsive" as r;

.tabs {
    display: flex;

    @include r.md {
        display: block;
    }

    .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: inherit;
        padding: 0 0.5rem;
        height: c.$height;

        @include r.md {
            justify-content: flex-start;
            padding: 0 0.5rem 0 2.5rem;
            border-left: 4px solid transparent !important;
            border-right: 4px solid transparent !important;
        }

        &:not(:last-child) {
            border-right: c.$border;

            @include r.md {
                border-right: none;
            }
        }

        &[selected] {
            background-color: var(--secondary);
            border-right-color: var(--primary) !important;
        }
    }
}
</style>

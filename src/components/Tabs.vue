<template>
    <nav class="tabs">
        <ul>
            <li v-for="tab in tabs" class="tab" :selected="$route.params.category === tab.toLowerCase()" :key="tab">
                <router-link
                    class="type-button"
                    :to="{ name: to, params: { category: tab.toLowerCase() }, query: $route.query }"
                >
                    {{ tab }}
                </router-link>
            </li>
        </ul>
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
@use "src/styles/color";
@use "src/styles/shape";
@use "src/styles/responsive" as r;

.tabs ul {
    display: flex;

    @include r.md {
        display: block;
    }

    .tab {
        flex: 1;
        border-radius: shape.$radius;

        &:not(:last-child) {
            margin: 0 0.5rem 0 0;
        }

        &:hover,
        &:focus {
            background-color: rgba(var(--primary), 0.15);
        }

        &[selected] {
            background-color: color.$primary;
            color: color.$on-primary;
        }

        @include r.md {
            justify-content: flex-start;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;

            &:not(:last-child) {
                margin: 0 0 0.25rem 0;
            }
        }

        a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: inherit;
            height: 2.5rem;

            @include r.md {
                padding: 0 0.5rem 0 2.5rem;
            }
        }
    }
}
</style>

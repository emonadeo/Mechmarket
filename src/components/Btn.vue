<template>
    <a v-if="href" class="btn" :href="href">
        <slot></slot>
    </a>
    <router-link v-else-if="to" class="btn" :to="to">
        <slot></slot>
    </router-link>
    <button v-else class="btn" :type="type" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        href: String,
        to: Object,
        type: {
            type: String,
            default: 'button',
        },
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/color";

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    border: none;
    background: transparent;
    padding: 0 1rem;
    outline: none;
    cursor: pointer;
    min-height: 2.25rem;
    text-decoration: none;

    &:hover {
        background-color: unset;
    }

    &[icon] {
        padding: 0;
        width: 2.25em;
        height: 2.25em;

        svg {
            height: 1.5em;
            width: 1.5em;
        }
    }

    &[inline] {
        display: inline;
        padding: 0;
        min-height: 0;

        &:hover {
            border-bottom: 1px solid;
        }
    }

    &[outline] {
        border: none;
    }
}
</style>

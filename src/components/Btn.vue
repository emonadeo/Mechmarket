<template>
    <a v-if="href" class="btn" :href="href">
        <slot></slot>
    </a>
    <button v-else class="btn" @click="$emit('click')" :type="type">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        href: String,
        type: {
            type: String,
            default: 'button',
        },
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/constants" as c;

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

    &:hover {
        background-color: var(--secondary);
    }

    &.icon-button {
        padding: 0;
        min-width: 2.25rem;
    }

    &.outline {
        border: c.$border;
    }
}
</style>

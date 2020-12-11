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
.btn {
    display: block;
    color: inherit;
    border: none;
    background: transparent;
    padding: 0.5rem 0.75rem;
    outline: none;
    cursor: pointer;

    &.icon-button {
        padding: 0.5rem;
    }
}
</style>

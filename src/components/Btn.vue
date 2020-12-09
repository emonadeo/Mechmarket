<template>
    <a class="btn" @click="$emit('click')" :type="type">
        <slot></slot>
    </a>
</template>

<script>
export default {
    props: ['type'],
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

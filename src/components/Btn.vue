<template>
    <button class="btn" @click="$emit('click')" :type="type">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: ['type'],
};
</script>

<style lang="scss" scoped>
.btn {
    color: inherit;
    border: none;
    background: transparent;
    padding: 0.5rem;
}
</style>

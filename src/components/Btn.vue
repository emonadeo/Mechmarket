<template>
    <button class="btn" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.btn {
    color: inherit;
    border: none;
    background: transparent;
    padding: 8px;
}
</style>

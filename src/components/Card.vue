<template>
    <div class="card surface">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Card',
};
</script>

<style scoped lang="scss">
@use 'src/styles/mixins';

.card {
    @include mixins.raised;

    display: flex;
    padding: 1rem;
    flex-direction: column;
}
</style>

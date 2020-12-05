<template>
    <div class="loading"><div class="surface">> loading...</div></div>
</template>

<style lang="scss" scoped>
@use "src/styles/constants" as c;

.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
        padding: 0.5rem 1rem;
        border: c.$border;
    }
}
</style>

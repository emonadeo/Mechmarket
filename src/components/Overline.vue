<template>
    <div class="overline">
        <h2>
            <slot></slot>
        </h2>
        <hr />
    </div>
</template>

<style lang="scss" scoped>
@use "src/styles/constants" as c;

.overline {
    display: flex;
    margin: 0 0 0.5rem 0;
    align-items: center;

    h2 {
        font-size: 0.75rem;
        margin: 0;
        font-weight: 500;
    }

    hr {
        flex: 1;
        margin: 0.375rem 0 0 0.75rem;
        border-left: none;
        border-bottom: none;
        border-top: c.$border-secondary;
        border-right: c.$border-secondary;
        height: 0.375rem;
        box-sizing: content-box;
    }
}
</style>

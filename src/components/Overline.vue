<template>
    <div class="overline">
        <span>
            <slot></slot>
        </span>
        <hr />
    </div>
</template>

<style lang="scss" scoped>
.overline {
    display: flex;
    margin: 0 0 0.5rem 0;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;

    hr {
        flex: 1;
        margin: 0.375rem 0 0 0.75rem;
        border-left: none;
        border-bottom: none;
        border-top: none;
        border-right: none;
        height: 0.375rem;
        box-sizing: content-box;
    }
}
</style>

<template>
    <a v-if="href" class="btn" :href="href" :selected="selected">
        <slot></slot>
    </a>
    <router-link v-else-if="to" class="btn" :to="to" :selected="selected">
        <slot></slot>
    </router-link>
    <button v-else class="btn" :type="type" :selected="selected" @click="$emit('click')">
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
        selected: Boolean,
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/color";
@use "src/styles/mixins";

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

    &:hover:not([outline]) {
        color: color.$primary;

        svg {
            fill: color.$primary;
        }
    }

    // icon variant
    &[icon] {
        padding: 0;

        &:not([inline]) {
            width: 2.25em;
            height: 2.25em;
        }

        svg {
            height: 1.5em;
            width: 1.5em;
        }
    }

    // inline variant
    &[inline] {
        padding: 0;
        min-height: 0;

        &:not([icon]) {
            display: inline;
        }

        &:hover:not([icon]) {
            border-bottom: 1px solid;
        }
    }

    // outlined variant
    &[outline] {
        @include mixins.interactive;
        background-color: color.$surface;
    }

    &[selected]:not([outline]) {
        background-color: rgba(var(--primary), 0.2);
    }
}
</style>

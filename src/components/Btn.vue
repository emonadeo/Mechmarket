<template>
    <a v-if="href" class="btn" :class="{ 'type-button': !inline }" :inline="inline" :href="href" :selected="selected">
        <slot></slot>
    </a>
    <router-link
        v-else-if="to"
        class="btn"
        :class="{ 'type-button': !inline }"
        :inline="inline"
        :to="to"
        :selected="selected"
    >
        <slot></slot>
    </router-link>
    <button
        v-else
        class="btn"
        :type="type"
        :class="{ 'type-button': !inline }"
        :selected="selected"
        :inline="inline"
        @click="$emit('click')"
    >
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
        inline: Boolean,
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

    transition-property: background-color;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;

    &:hover:not([outline]) {
        background-color: rgba(var(--primary), color.$alpha-hover);
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

    // icon variant
    &[icon] {
        padding: 0;
        border-radius: 50%;
        width: 2.25rem;
        height: 2.25rem;

        &[inline] {
            margin: -0.375em;
        }

        svg {
            height: 1.5rem;
            width: 1.5rem;
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

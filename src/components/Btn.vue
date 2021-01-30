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

<style lang="scss">
@use "src/styles/color";
@use "src/styles/shape";
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
        background-color: color.$hover;
    }

    // inline variant
    &[inline] {
        padding: 0;
        min-height: 0;

        &:not([icon]) {
            @include mixins.inline-interactive;

            display: inline;
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
        @include mixins.raised-interactive;
        background-color: color.$surface;
    }

    &[selected]:not([outline]) {
        background-color: rgba(var(--primary), 0.2);
    }

    &:not([outline]) {
        @include mixins.interactive;
    }
}
</style>

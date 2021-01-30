<template>
    <input
        class="textfield type-body1"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :aria-label="ariaLabel"
        @input="$emit('input', $event.target.value)"
    />
</template>

<script>
export default {
    props: ['name', 'type', 'placeholder', 'value', 'ariaLabel'],
};
</script>

<style lang="scss" scoped>
@use "src/styles/color";
@use "src/styles/typography";

input {
    width: 100%;
    display: block;
    color: inherit;
    border: none;
    background-color: transparent;
    height: 2.25rem;
    outline: none;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    opacity: 0.54;

    &:focus {
        border-color: color.$focus;
        opacity: 1;

        &::placeholder {
            opacity: 0.54;
        }
    }

    &::placeholder {
        color: inherit;
    }
}
</style>

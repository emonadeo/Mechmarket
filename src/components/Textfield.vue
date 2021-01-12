<template>
    <input
        class="textfield"
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
input {
    width: 100%;
    display: block;
    color: inherit;
    border: none;
    background-color: transparent;
    padding: 0.5rem;
    outline: none;

    &::placeholder {
        opacity: 0.54;
    }
}
</style>

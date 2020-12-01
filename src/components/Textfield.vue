<template>
    <div class="textfield">
        <input type="text" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" />
    </div>
</template>

<script>
export default {
    props: {
        placeholder: String,
        value: String,
    },
};
</script>

<style lang="scss" scoped>
@use 'sass:color';

.textfield {
    input {
        height: 100%;
        width: 100%;
        display: block;
        color: inherit;
        border: none;
        background-color: transparent;
        padding: 8px;

        &::placeholder {
            color: var(--primary);
            opacity: 0.54;
        }
    }
}
</style>

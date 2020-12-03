<template>
    <div class="search">
        <textfield
            name="q"
            type="text"
            placeholder="Search"
            aria-label="Search"
            :value="$route.query.q"
            @focus.native="editing = true"
            @blur.native="editing = false"
        />
        <btn v-show="editing">-></btn>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Textfield from 'src/components/Textfield.vue';

export default {
    components: {
        Btn,
        Textfield,
    },
    data: () => ({
        editing: false,
    }),
};
</script>

<style lang="scss" scoped>
@use 'sass:color';

.search {
    width: 100%;
    display: flex;

    .textfield {
        height: 100%;
        padding-left: 1rem;
        flex: 1;

        &::placeholder {
            color: var(--primary);
            opacity: 0.54;
        }
    }

    .btn {
        width: 2.5rem;
    }
}
</style>

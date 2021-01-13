<template>
    <div class="theme-picker">
        <btn outline @click="$store.dispatch('setTheme', $store.state.theme !== 'dark' ? 'dark' : 'light')">
            {{ $store.state.theme }}
        </btn>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';

export default {
    components: {
        Btn,
    },
};
</script>

<style lang="scss" scoped>
.theme-picker {
}
</style>

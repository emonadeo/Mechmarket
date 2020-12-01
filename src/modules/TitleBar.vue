<template>
    <div class="titlebar">
        <div class="control">
            <textfield placeholder="Search" v-model="search"></textfield>
            <btn @click="$store.dispatch('toggleTheme')">D</btn>
        </div>
        <nav class="tabs">
            <router-link class="tab" :to="{ name: 'selling' }" :selected="this.$route.name === 'selling'"
                >Selling</router-link
            >
            <router-link class="tab" :to="{ name: 'buying' }" :selected="this.$route.name === 'buying'"
                >Buying</router-link
            >
            <router-link class="tab" :to="{ name: 'trading' }" :selected="this.$route.name === 'trading'"
                >Trading</router-link
            >
        </nav>
    </div>
</template>

<script>
import Textfield from 'src/components/Textfield.vue';
import Btn from 'src/components/Btn.vue';

export default {
    components: {
        Textfield,
        Btn,
    },
    data: () => ({
        search: '',
    }),
};
</script>

<style lang="scss" scoped>
$width: 2.5rem;
$border: 1px solid var(--primary);

.titlebar {
    .control {
        border-bottom: $border;
        display: flex;
        height: $width;

        .textfield {
            flex: 1;
        }

        .btn {
            border-left: $border;
            width: $width;
            height: $width;
        }
    }

    .tabs {
        height: $width;
        display: flex;
        border-bottom: $border;

        .tab {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: inherit;

            &:not(:last-child) {
                border-right: $border;
            }

            &[selected] {
                background-color: var(--primary);
                color: var(--on-primary);
            }
        }
    }
}
</style>

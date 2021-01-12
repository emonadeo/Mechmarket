<template>
    <div class="region">
        <template v-for="(region, i) in cascade">
            <btn inline :to="{ name: 'posts', query: { ...$route.query, region: compile(i) } }">{{ region }}</btn>
            <span v-if="i + 1 < cascade.length"> &not; </span>
        </template>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';

export default {
    name: 'Region',
    props: {
        region: String,
    },
    components: {
        Btn,
    },
    computed: {
        cascade: function () {
            return this.region.split('-');
        },
    },
    methods: {
        compile(index) {
            return this.cascade.slice(0, index + 1).join('-');
        },
    },
};
</script>

<style scoped lang="scss">
.region {
}
</style>

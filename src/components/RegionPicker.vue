<template>
    <div class="region-picker">
        <!-- button -->
        <btn outline v-show="!editing" type="button" @click="edit">
            <div class="region-container">
                <template v-for="(region, i) in regions">
                    <span>{{ region }}</span>
                    <span v-if="i + 1 < regions.length"> &not; </span>
                </template>
            </div>
            <!-- global -->
            <div v-if="global">Region</div>
        </btn>
        <textfield
            v-show="editing"
            id="textfield"
            placeholder="US-NJ"
            v-model="region"
            @blur.native="unedit"
        ></textfield>
        <div v-show="editing" class="actions">
            <btn icon v-show="$route.query.region" :to="{ query: { ...$route.query, region: undefined } }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    />
                </svg>
            </btn>
            <btn icon :to="{ query: { ...$route.query, region } }">
                <svg viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                </svg>
            </btn>
        </div>
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
    data: (ctx) => ({
        region: ctx.$route.query.region?.toUpperCase(),
        editing: false,
        timeout: 0,
    }),
    computed: {
        regions() {
            return this.$route.query.region
                ?.toUpperCase()
                .split('-')
                .filter((s) => s && s !== '');
        },
        global() {
            return !this.regions || this.regions.length === 0;
        },
    },
    methods: {
        edit() {
            clearTimeout(this.timeout);
            this.editing = true;
            this.$nextTick(() => document.getElementById('textfield').focus());
        },
        unedit() {
            this.timeout = setTimeout(() => (this.editing = false), 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
.region-picker {
    position: relative;

    .region-container {
        display: block;
    }

    .actions {
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>

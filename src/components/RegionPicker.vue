<template>
    <div class="region-picker">
        <!-- button -->
        <btn v-show="!editing" type="button" @click="edit" :icon="global">
            <div class="region-container">
                <template v-for="(region, i) in regions">
                    <span>{{ region }}</span>
                    <span v-if="i + 1 < regions.length"> &not; </span>
                </template>
            </div>
            <!-- global -->
            <svg v-if="global" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                />
            </svg>
        </btn>
        <!-- input -->
        <div class="form" v-show="editing">
            <textfield
                id="textfield"
                name="region"
                placeholder="US-NJ"
                :value="region"
                @blur.native="unedit"
            ></textfield>
            <btn
                v-show="$route.query.region"
                class="icon-button"
                :to="{ query: { ...$route.query, region: undefined } }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                    />
                </svg>
            </btn>
            <btn class="icon-button" type="submit">
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
    data: () => ({
        editing: false,
        timeout: 0,
    }),
    computed: {
        region() {
            return this.$route.query.region?.toUpperCase();
        },
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
    .btn {
        .region-container {
            display: block;
        }
    }

    .form {
        width: clamp(10rem, 50vw, 20rem);
        display: flex;
        transition: max-width 2s ease-in-out;
    }
}
</style>

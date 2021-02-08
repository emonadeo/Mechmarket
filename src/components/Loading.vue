<template>
    <div class="loading">
        <svg width="36" height="36" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M40,20c-0,-11.046 -8.954,-20 -20,-20c-11.046,-0 -20,8.954 -20,20l20,-0l20,-0Z">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/styles/color';

.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

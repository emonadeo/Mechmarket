const scaleName = 'scale';
const themeName = 'theme';

export function getScale() {
    const scaleRaw = window.localStorage.getItem(scaleName);

    // default to 1
    if (!scaleRaw) return 1;

    const scale = parseInt(scaleRaw);

    // set minimum scale on mobile to 1
    if (!window.matchMedia('(min-width: 768px)').matches) {
        return Math.min(scale, 1);
    }

    return scale;
}

export function getTheme() {
    return (
        window.localStorage.getItem(themeName) ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') ||
        'light'
    );
}

export function setScale(scale) {
    window.localStorage.setItem(scaleName, scale);
}

export function setTheme(theme) {
    window.localStorage.setItem(themeName, theme);
}

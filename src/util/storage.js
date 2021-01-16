const sizeName = 'size';
const themeName = 'theme';

export function getSize() {
    if (!window.matchMedia('(min-width: 768px)').matches) {
        return 1;
    }
    const size = window.localStorage.getItem(sizeName);
    return size ? parseInt(size) : 1;
}

export function getTheme() {
    return (
        window.localStorage.getItem(themeName) ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') ||
        'light'
    );
}

export function setSize(size) {
    window.localStorage.setItem(sizeName, size);
}

export function setTheme(theme) {
    window.localStorage.setItem(themeName, theme);
}

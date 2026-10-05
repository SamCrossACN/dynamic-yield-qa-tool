import styles from '../styles/styles.scss?inline';

let styleSheet: HTMLStyleElement | null = null;

export function injectCSS(): void {
  styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

if (import.meta.hot) {
  import.meta.hot.accept('../styles/styles.scss?inline', (newModule) => {
    if (styleSheet && newModule) {
      styleSheet.textContent = (newModule as unknown as { default: string }).default;
    }
  });
}
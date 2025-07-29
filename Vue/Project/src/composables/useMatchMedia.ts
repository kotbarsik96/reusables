import { onMounted, onUnmounted, readonly, ref } from 'vue';

export function useMatchMedia(mediaQuery: string) {
  const _mediaQuery = mediaQuery.match(/^\(.+\)$/) ? mediaQuery : `(${mediaQuery})`;

  const _matches = ref(false);
  const matches = readonly(_matches);
  let media: MediaQueryList | undefined;

  onMounted(() => {
    media = window.matchMedia(_mediaQuery);
    media.onchange = onMediaChange;
    _matches.value = media.matches;
  });

  onUnmounted(() => {
    if (media) media.onchange = null;
  });

  function onMediaChange(e: MediaQueryListEvent) {
    if (!media) return;

    _matches.value = media.matches;
  }

  return {
    matches
  };
}

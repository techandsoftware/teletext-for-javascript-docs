<script setup>
// The badge markup is kept verbatim from Simple Analytics (they detect the link and its UTM codes,
// and the SVG must not be edited), so it is injected as raw HTML rather than as a Vue template,
// which would otherwise strip the SVG's embedded <style>.
import badge from './simple-analytics-badge.html?raw'

defineProps({
  // 'home' (layout-bottom on the home page), 'doc' (doc-after)
  variant: { type: String, required: true }
})
</script>

<template>
  <div class="sa-badge" :class="variant" v-html="badge" />
</template>

<style scoped>
.sa-badge {
  display: flex;
}

.sa-badge :deep(a) {
  display: block;
  line-height: 0;
  color: var(--vp-c-text-2);
  transition: color 0.25s, opacity 0.25s;
}

.sa-badge :deep(a:hover) {
  color: var(--vp-c-text-1);
}

/* 80% of the supplied 168x40, keeping the 210:50 proportions. The artwork is inset in its
   210-unit viewBox (starts at x=11, ends at x=200), so margins pull it flush with the
   text it lines up with. */
.sa-badge :deep(svg) {
  width: 134.4px;
  height: 32px;
}

/* Doc: right-aligned in the article column (moved under the aside when that's shown, see below) */
.sa-badge.doc {
  justify-content: flex-end;
  padding-top: 32px;
}

.sa-badge.doc :deep(svg) {
  margin-right: calc(134.4px * -10 / 210);
}

/* Home page: 70% size, and right edge aligned with the right-aligned hero text. This mirrors the
   VPHero container (max-width 1152px, centred, horizontal padding 24/48/64px at its breakpoints).
   The parent .Layout is a flex column, so auto margins would shrink-wrap and centre this box;
   instead it stays full width and the padding grows to centre a 1152px content area. */
.sa-badge.home {
  justify-content: flex-end;
  padding-block: 16px;
  padding-inline: max(24px, (100% - 1152px) / 2);
}

@media (min-width: 640px) {
  .sa-badge.home {
    padding-inline: max(48px, (100% - 1152px) / 2);
  }
}

@media (min-width: 960px) {
  .sa-badge.home {
    padding-inline: max(64px, (100% - 1152px) / 2);
  }
}

/* slightly transparent on the home page until hovered */
.sa-badge.home :deep(a) {
  opacity: 0.7;
}

.sa-badge.home :deep(a:hover) {
  opacity: 1;
}

.sa-badge.home :deep(svg) {
  width: 117.6px;
  height: 28px;
  margin-right: calc(117.6px * -10 / 210);
}

/* Follow VitePress's light/dark theme instead of the OS preference used by the SVG's own <style>.
   The extra class gives these rules higher specificity than the embedded ones. */
.sa-badge :deep(.sa-badge-logo),
.sa-badge :deep(.sa-badge-text) {
  fill: currentColor;
}

.sa-badge :deep(.sa-badge-background) {
  fill: transparent;
}
</style>

<style>
/* When VitePress shows the "On this page" aside (from 1280px on pages with .VPDoc.has-aside),
   move the doc badge across into the aside column, level with the end of the prev/next links.
   It's positioned against VitePress's .content (position: relative), whose right edge is where the
   aside column starts. Offsets mirror VitePress's CSS:
     left:   aside padding-left 32px + outline border 1px + outline padding-left 16px
     bottom: .content padding-bottom 128px
   Unscoped because it depends on VitePress's ancestor classes. */
@media (min-width: 1280px) {
  .VPDoc.has-aside .sa-badge.doc {
    position: absolute;
    left: calc(100% + 32px + 1px + 16px);
    bottom: 128px;
    /* above the aside's fixed, full-height container (which would otherwise swallow clicks) and
       its bottom fade curtain (z-index 10) */
    z-index: 11;
  }

  .VPDoc.has-aside .sa-badge.doc svg {
    margin-right: 0;
    margin-left: calc(134.4px * -11 / 210);
  }
}
</style>

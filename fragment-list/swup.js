import Swup from 'https://unpkg.com/swup@4?module';
import FragmentPlugin from 'https://www.unpkg.com/@swup/fragment-plugin@1?module';
import PreloadPlugin from 'https://www.unpkg.com/@swup/preload-plugin@3?module';

const base = document.querySelector('base')?.getAttribute('href') ?? '/';

const swup = new Swup({
  containers: ["#swup"],
  plugins: [
    new PreloadPlugin({ preloadVisibleLinks: true }),
    new FragmentPlugin({
      debug: true,
      rules: [
        {
          from: `${base}items(.*)`,
          to: `${base}items(.*)`,
          containers: ['#items'],
        }
      ]
    })
  ]
});

function setTransitionDelays() {
  document.querySelectorAll('.list_item').forEach((el, i) => {
    el.style.transitionDelay = i * 20 + 'ms';
  });
}
setTransitionDelays();
swup.hooks.on('page:view', setTransitionDelays)
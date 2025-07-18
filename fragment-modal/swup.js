import Swup from 'https://unpkg.com/swup@4?module';
import SwupParallelPlugin from 'https://unpkg.com/@swup/parallel-plugin@0?module';
import SwupPreloadPlugin from 'https://unpkg.com/@swup/preload-plugin@3?module';
import FragmentPlugin from 'https://www.unpkg.com/@swup/fragment-plugin@1?module';

const base = document.querySelector('base')?.getAttribute('href') ?? '/';

const swup = new Swup({
  containers: ["#swup"],
  plugins: [
    new SwupParallelPlugin(),
    new SwupPreloadPlugin({ preloadVisibleLinks: true }),
    new FragmentPlugin({
      debug: true,
      rules: [
        {
          from: base,
          to: `${base}detail-(.*)`,
          containers: ['#modal'],
          name: 'open-modal'
        },
        {
          from: `${base}detail-(.*)`,
          to: base,
          containers: ['#modal'],
          name: 'close-modal'
        },
        {
          from: `${base}detail-(.*)`,
          to: `${base}detail-(.*)`,
          containers: ['#detail']
        }
      ]
    })
  ]
});
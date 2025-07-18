import Swup from 'https://unpkg.com/swup@4?module';
import SwupParallelPlugin from 'https://unpkg.com/@swup/parallel-plugin@0?module';
import SwupPreloadPlugin from 'https://unpkg.com/@swup/preload-plugin@3?module';
import FragmentPlugin from 'https://www.unpkg.com/@swup/fragment-plugin@1?module';


const swup = new Swup({
  containers: ["#swup"],
  plugins: [
    new SwupParallelPlugin(), 
    new SwupPreloadPlugin({ preloadVisibleLinks: true }),
    new FragmentPlugin({
      debug: true,
      rules: [
        {
          from: '/',
          to: '/detail-(.*)',
          containers: ['#modal'],
          name: 'open-modal'
        },
        {
          from: '/detail-(.*)',
          to: '/',
          containers: ['#modal'],
          name: 'close-modal'
        },
        {
          from: '/detail-(.*)',
          to: '/detail-(.*)',
          containers: ['#detail']
        }
      ]
    })
  ]
});
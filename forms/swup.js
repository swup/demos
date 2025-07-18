console.clear();

import Swup from 'https://unpkg.com/swup@4?module';
import SwupFormsPlugin from 'https://unpkg.com/@swup/forms-plugin@3?module';
import SwupBodyClassPlugin from 'https://unpkg.com/@swup/body-class-plugin@3?module';

const swup = new Swup({
  containers: ["#swup"],
  plugins: [
    new SwupFormsPlugin(),
    new SwupBodyClassPlugin()
  ]
});

swup.hooks.on('page:view', () => {
  const el = document.querySelector('#q');
  if (el) {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
      el.innerText = q;
    }
  }
});
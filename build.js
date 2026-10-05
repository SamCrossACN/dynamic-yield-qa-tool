import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const userscriptHeader = `// ==UserScript==
// @name         Myer QA Tool
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Myer DY QA Tool
// @author       Sam Cross scross@thelumery.com
// @match        *.myer.com.au/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dynamicyield.com
// @grant        none
// ==/UserScript==`;

const watch = process.argv.includes('--watch');

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'TL_QA_Tool.user.js',
  format: 'iife',
  banner: { js: userscriptHeader },
  plugins: [sassPlugin({ type: 'css-text' })],
};

if (watch) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(config);
  console.log('Built TL_QA_Tool.user.js');
}

const unified = require('unified');
const createStream = require('unified-stream');
const stringify = require('remark-stringify');
const markdown = require('remark-parse');
const copyCodeMetaHashUp = require('./index');

const processor = unified()
  .use(markdown)
  .use(copyCodeMetaHashUp, { separator: '#' })
  .use(stringify);

process.stdin.pipe(createStream(processor)).pipe(process.stdout);


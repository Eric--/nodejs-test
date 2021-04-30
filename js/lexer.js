const { init, parse } = require('es-module-lexer');

(async () => {
  // either await init, or call parse asynchronously
  // this is necessary for the Web Assembly boot
  await init;

  const [imports, exports] = parse('export var p = 5');
  exports[0] === 'p';
})();

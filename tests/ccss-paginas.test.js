// Uso: node tests/ccss-paginas.test.js — cada página de actividades CCSS carga sus scripts y todos sus [data-gym] existen.
const assert = require('assert'), fs = require('fs'), path = require('path'), vm = require('vm');
const base = path.join(__dirname, '../actividades/2-bachillerato-ccss');
let n = 0;
fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).forEach((d) => {
  const qmd = fs.readFileSync(path.join(base, d.name, 'index.qmd'), 'utf8');
  const scripts = [...qmd.matchAll(/<script src="\.\.\/\.\.\/\.\.\/assets\/gym\/([^"]+)"/g)].map((m) => m[1]).filter((f) => f !== 'graficas.js');
  const ids = [...qmd.matchAll(/data-gym="([^"]+)"/g)].map((m) => m[1]);
  if (qmd.includes('id="mdx-app"')) {      // simulacro: debe cargar el motor y todos los generadores del catálogo
    const ctx = { console, Math, Number, Object, Array, JSON, String, Error, Promise, Map, Set, RegExp, parseInt, parseFloat, isFinite };
    ctx.globalThis = ctx; vm.createContext(ctx);
    scripts.forEach((f) => vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/gym', f), 'utf8'), ctx, { filename: f }));
    assert(ctx.MDExamCCSS && typeof ctx.MDExamCCSS.montar === 'function', d.name + ': falta MDExamCCSS');
    const sin = ctx.MDExamCCSS.CATALOGO.filter((t) => !t.listo).map((t) => t.id);
    assert.strictEqual(sin.length, 0, d.name + ': tipos sin generador cargado: ' + sin.join(', '));
    assert(typeof ctx.MDGym.normalTableCCSS === 'function', d.name + ': falta la tabla N(0,1)');
    n++;
    return;
  }
  if (!ids.length) { console.log('pendiente (sin módulos): ' + d.name); return; }
  const ctx = { console, Math, Number, Object, Array, JSON, String, Error, Promise, Map, Set, RegExp, parseInt, parseFloat, isFinite };
  ctx.globalThis = ctx; vm.createContext(ctx);
  scripts.forEach((f) => vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/gym', f), 'utf8'), ctx, { filename: f }));
  const G = ctx.MDGym;
  ids.forEach((id) => { assert(G.modules[id], d.name + ': módulo desconocido ' + id); n++; });
  assert.strictEqual(new Set(ids).size, ids.length, d.name + ': módulo repetido');
  // las páginas CCSS sólo usan módulos propios (cs-* o ccss-*), nunca los de Ciencias con su contenido fuera de currículo
  ids.forEach((id) => assert(/^(cs|ccss)-/.test(id), d.name + ': ' + id + ' no es un módulo CCSS'));
});
console.log('OK: ' + n + ' módulos montables en ' + fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).length + ' páginas');

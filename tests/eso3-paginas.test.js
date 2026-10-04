// Uso: node tests/eso3-paginas.test.js — cada página de actividades de 3º ESO carga sus scripts y todos sus [data-gym] existen y son de 3º ESO.
const assert = require('assert'), fs = require('fs'), path = require('path'), vm = require('vm');
const base = path.join(__dirname, '../actividades/3-eso');
let n = 0, paginas = 0;
const todos = new Set();
fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d\d-/.test(d.name)).forEach((d) => {
  const f = path.join(base, d.name, 'index.qmd');
  if (!fs.existsSync(f)) return;
  const qmd = fs.readFileSync(f, 'utf8');
  const scripts = [...qmd.matchAll(/<script src="\.\.\/\.\.\/\.\.\/assets\/gym\/([^"]+)"/g)].map((m) => m[1]);
  const ids = [...qmd.matchAll(/data-gym="([^"]+)"/g)].map((m) => m[1]);
  if (!ids.length) return;
  assert(scripts[0] === 'gym.js' && scripts[1] === 'eso3-base.js', d.name + ': deben cargarse gym.js y eso3-base.js primero');
  const ctx = { console, Math, Number, Object, Array, JSON, String, Error, Promise, Map, Set, RegExp, parseInt, parseFloat, isFinite };
  ctx.globalThis = ctx; vm.createContext(ctx);
  scripts.forEach((s) => { assert(fs.existsSync(path.join(__dirname, '../assets/gym', s)), d.name + ': falta ' + s); vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/gym', s), 'utf8'), ctx, { filename: s }); });
  const G = ctx.MDGym;
  ids.forEach((id) => { assert(G.modules[id], d.name + ': módulo desconocido ' + id); assert(/^eso3-/.test(id), d.name + ': ' + id + ' no es de 3º ESO'); assert(!todos.has(id), 'módulo repetido entre páginas: ' + id); todos.add(id); n++; });
  assert.strictEqual(new Set(ids).size, ids.length, d.name + ': módulo repetido');
  assert(/katex/.test(qmd) && /gym\.css/.test(qmd), d.name + ': faltan KaTeX o gym.css');
  paginas++;
});
// todos los módulos definidos se usan en alguna página
const G2 = require('../assets/gym/gym.js');
['eso3-base', 'eso3-numeros', 'eso3-algebra', 'eso3-geometria', 'eso3-funciones', 'eso3-estadistica'].forEach((f) => require('../assets/gym/' + f + '.js'));
Object.keys(G2.modules).forEach((id) => assert(todos.has(id), id + ': módulo sin página'));
assert.strictEqual(paginas, 14, 'deben ser 14 páginas');
console.log('OK: ' + n + ' módulos montables en ' + paginas + ' páginas de 3º ESO');

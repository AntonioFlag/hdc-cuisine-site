// Génère le site dans dist/ à partir des gabarits (src/) et du contenu (content/), modifiable via /admin.
// Aucune dépendance : node build.js
const fs = require('fs');
const path = require('path');

const root = __dirname;
const out = path.join(root, 'dist');
const data = {
  accueil: JSON.parse(fs.readFileSync(path.join(root, 'content/accueil.json'), 'utf8')),
  societe: JSON.parse(fs.readFileSync(path.join(root, 'content/societe.json'), 'utf8')),
  annee: String(new Date().getFullYear()),
};

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const get = (ctx, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), ctx);
const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);

function render(tpl, ctx) {
  // {{#each liste}}…{{/each}} et {{#if valeur}}…{{/if}} (non imbriqués du même type)
  tpl = tpl.replace(/\{\{#each ([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_, key, inner) =>
    (get(ctx, key) || []).map((item) => render(inner, { ...ctx, this: item })).join(''));
  tpl = tpl.replace(/\{\{#if ([\w.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, inner) =>
    isEmpty(get(ctx, key)) ? '' : render(inner, ctx));
  return tpl.replace(/\{\{(?:(br|todo):)?([\w.]+)\}\}/g, (_, mode, key) => {
    const v = get(ctx, key);
    if (mode === 'todo' && isEmpty(v)) return '<span class="todo">à compléter</span>';
    if (v !== undefined && typeof v === 'object') throw new Error(`{{${key}}} n'est pas un texte`);
    if (v === undefined) throw new Error(`Champ inconnu : {{${key}}}`);
    const s = esc(v);
    return mode === 'br' ? s.replace(/\n/g, '<br>') : s;
  });
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const f of fs.readdirSync(path.join(root, 'src'))) {
  const html = render(fs.readFileSync(path.join(root, 'src', f), 'utf8'), data);
  if (/\{\{/.test(html)) throw new Error(`Balise non traitée dans ${f}`);
  fs.writeFileSync(path.join(out, f), html);
}
for (const dir of ['admin', 'uploads']) fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
console.log('Site généré dans dist/');

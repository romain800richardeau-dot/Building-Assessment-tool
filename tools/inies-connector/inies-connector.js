#!/usr/bin/env node
/**
 * Connecteur INIES Webservice V4
 * Voir README.md pour la doc complète.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { IniesClient } = require('./soap-client');
const { mapIniesToFiche } = require('./mapping');

const ARGS = parseArgs(process.argv.slice(2));
const CMD = ARGS._[0];

function parseArgs(argv) {
    const out = { _: [] };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a.startsWith('--')) {
            const key = a.slice(2);
            const next = argv[i + 1];
            if (next && !next.startsWith('--')) { out[key] = next; i++; }
            else out[key] = true;
        } else {
            out._.push(a);
        }
    }
    return out;
}

function loadConfig() {
    const cfgPath = path.join(__dirname, 'config.json');
    if (!fs.existsSync(cfgPath)) {
        console.error('Erreur : config.json manquant. Copier config.example.json puis renseigner les credentials CSTB.');
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
}

function loadExistingFdes(outputFile) {
    const outPath = path.resolve(__dirname, outputFile);
    if (!fs.existsSync(outPath)) return { meta: {}, fdes: [] };
    const raw = fs.readFileSync(outPath, 'utf8');
    try {
        const fn = new Function('window', 'module', raw + '; return window.INIES_FDES;');
        const result = fn({}, { exports: {} });
        if (result && Array.isArray(result.fdes)) return result;
    } catch (e) {
        console.warn('Eval échoué :', e.message);
    }
    return { meta: {}, fdes: [] };
}

function writeFdesFile(outputFile, payload) {
    const outPath = path.resolve(__dirname, outputFile);
    const header = [
        '// ============================================================',
        '// INIES FDES — base unifiée',
        '// ============================================================',
        '// Sources :',
        '//   - Donatello : échantillon public (FDES DEC énergie)',
        '//   - INIES Webservice V4 : FDES individualisées avec décomposition A1-D',
        '//   - DEMO : FDES factices générées localement par le connecteur',
        '// Mise à jour : ' + new Date().toISOString().slice(0, 10),
        '// ============================================================',
        '',
        'const INIES_FDES = '
    ].join('\n');
    const footer = ';\n\nif (typeof window !== "undefined") { window.INIES_FDES = INIES_FDES; }\nif (typeof module !== "undefined" && module.exports) { module.exports = INIES_FDES; }\n';
    const json = JSON.stringify(payload);
    fs.writeFileSync(outPath, header + json + footer, 'utf8');
    console.log('Écrit : ' + outPath + ' (' + (fs.statSync(outPath).size / 1024).toFixed(1) + ' Ko)');
}

function mergeFdes(existing, fresh) {
    const map = new Map();
    existing.forEach(f => map.set(String(f.id), f));
    fresh.forEach(f => map.set(String(f.id), f));
    return Array.from(map.values());
}

async function cmdList(client, opts) {
    const list = await client.listFiches({
        filter: opts.filter || '',
        limit: parseInt(opts.limit, 10) || 50
    });
    console.log(list.length + ' FDES trouvées :');
    list.forEach(f => {
        const id = f.id || f.identifiant || '?';
        const name = (f.nom || f.name || '').slice(0, 80);
        console.log('  ' + String(id).padStart(8) + ' | ' + name);
    });
}

async function cmdFetch(client, opts) {
    if (!opts.id) { console.error('--id requis'); process.exit(1); }
    const raw = await client.getFicheDetail(opts.id);
    const fiche = mapIniesToFiche(raw);
    console.log(JSON.stringify(fiche, null, 2));
}

async function cmdUpdate(config, client, opts) {
    const existing = loadExistingFdes(config.outputFile);
    const existingIds = new Set((existing.fdes || []).map(f => String(f.id)));
    console.log('Base existante : ' + existingIds.size + ' FDES');

    const list = await client.listFiches({
        filter: opts.filter || '',
        limit: parseInt(opts.limit, 10) || 1000
    });
    console.log('Webservice : ' + list.length + ' FDES trouvées');

    const toFetch = opts.force ? list : list.filter(f => !existingIds.has(String(f.id || f.identifiant)));
    console.log('À récupérer : ' + toFetch.length);

    const fetched = [];
    for (let i = 0; i < toFetch.length; i++) {
        const f = toFetch[i];
        const id = f.id || f.identifiant;
        try {
            process.stdout.write('  [' + (i + 1) + '/' + toFetch.length + '] ' + id + ' ... ');
            const raw = await client.getFicheDetail(id);
            const fiche = mapIniesToFiche(raw);
            if (fiche) { fetched.push(fiche); process.stdout.write('OK\n'); }
            else process.stdout.write('SKIP\n');
        } catch (err) {
            process.stdout.write('FAIL ' + err.message + '\n');
        }
    }

    const merged = config.mergeWithExisting !== false ? mergeFdes(existing.fdes || [], fetched) : fetched;
    const payload = {
        meta: Object.assign({}, existing.meta || {}, {
            sources: ['Donatello', 'INIES V4'],
            lastUpdate: new Date().toISOString(),
            count: merged.length
        }),
        fdes: merged
    };
    writeFdesFile(config.outputFile, payload);
    console.log('Total final : ' + merged.length + ' FDES');
}

function cmdDemo(config) {
    console.log('Mode demo — génération de 5 FDES factices avec décomposition A1-D...');
    const sample = [
        { id: 'DEMO_001', name: 'Béton C25/30 (démo)', cat: ['Bâtiment', 'Gros œuvre', 'Béton', 'Béton armé', 'C25/30'],
          unit: 'm³', desc: '1 m³ de béton armé C25/30 mis en œuvre', organism: 'Démo (factice)', dvt: 100,
          eges: { A1: 245, A2: 12, A3: 78, A4: 8, A5: 5, B: 0, C1: 2.3, C2: 4.1, C3: 1.8, C4: 0.9, D: -15 } },
        { id: 'DEMO_002', name: 'Acier IPE 200 (démo)', cat: ['Bâtiment', 'Gros œuvre', 'Métaux', 'Acier', 'Profilé IPE'],
          unit: 'kg', desc: '1 kg dacier de construction laminé', organism: 'Démo (factice)', dvt: 100,
          eges: { A1: 1.85, A2: 0.08, A3: 0.45, A4: 0.05, A5: 0.02, B: 0, C1: 0.01, C2: 0.04, C3: 0.02, C4: 0, D: -1.1 } },
        { id: 'DEMO_003', name: 'Bois lamellé-collé (démo)', cat: ['Bâtiment', 'Gros œuvre', 'Bois', 'Lamellé-collé', 'Pin'],
          unit: 'm³', desc: '1 m³ de bois lamellé-collé pour structure', organism: 'Démo (factice)', dvt: 50,
          eges: { A1: 65, A2: 12, A3: 110, A4: 18, A5: 6, B: 0, C1: 2, C2: 8, C3: 5, C4: 1, D: -45 },
          biogenic: { storage: -780, packaging: 0.8 } },
        { id: 'DEMO_004', name: 'Isolant laine minérale (démo)', cat: ['Bâtiment', 'Second œuvre', 'Isolation', 'Laine minérale', 'Roche'],
          unit: 'm²', desc: '1 m² disolant laine de roche e=200mm R=5,7', organism: 'Démo (factice)', dvt: 50,
          eges: { A1: 6.2, A2: 0.4, A3: 1.8, A4: 0.3, A5: 0.2, B: 0, C1: 0.05, C2: 0.15, C3: 0.4, C4: 0.05, D: -0.3 } },
        { id: 'DEMO_005', name: 'Menuiserie alu DV (démo)', cat: ['Bâtiment', 'Second œuvre', 'Menuiseries', 'Alu', 'DV'],
          unit: 'm²', desc: '1 m² de fenêtre alu DV 4/16/4 Uw=1.4', organism: 'Démo (factice)', dvt: 30,
          eges: { A1: 145, A2: 6, A3: 28, A4: 3, A5: 2, B: 0, C1: 0.5, C2: 1.5, C3: 0.8, C4: 0.2, D: -38 } }
    ];

    const fdes = sample.map(s => {
        const eges = { A1:s.eges.A1, A2:s.eges.A2, A3:s.eges.A3, A4:s.eges.A4, A5:s.eges.A5,
                       B1:0, B2:0, B3:0, B4:0, B5:0, B6:0, B7:0,
                       C1:s.eges.C1, C2:s.eges.C2, C3:s.eges.C3, C4:s.eges.C4, D:s.eges.D };
        let total = 0;
        Object.values(eges).forEach(v => { if (typeof v === 'number') total += v; });
        eges.total = total;
        return {
            id: s.id, name: s.name, statut: '1', version: '1.0', declType: 'DEP',
            cat: s.cat, commercialRef: '', dvt: s.dvt,
            ufQty: 1, ufUnit: s.unit, ufDesc: s.desc,
            organism: s.organism, norme: 'NF EN 15804+A1 (factice)',
            eges: eges,
            biogenic: s.biogenic || { storage: null, packaging: null }
        };
    });

    const existing = loadExistingFdes(config.outputFile);
    const merged = mergeFdes(existing.fdes || [], fdes);
    writeFdesFile(config.outputFile, {
        meta: Object.assign({}, existing.meta || {}, { demo: true, count: merged.length, lastUpdate: new Date().toISOString() }),
        fdes: merged
    });
    console.log('Demo OK — ' + fdes.length + ' FDES factices ajoutées (total ' + merged.length + ').');
}

(async () => {
    if (!CMD || ['help', '--help', '-h'].includes(CMD)) {
        console.log('Usage : node inies-connector.js <list|fetch|update|demo> [options]');
        console.log('Voir README.md pour la doc complète.');
        process.exit(0);
    }

    if (CMD === 'demo') {
        const cfgPath = path.join(__dirname, 'config.json');
        const config = fs.existsSync(cfgPath)
            ? JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
            : { outputFile: '../../data/INIES_FDES.js', mergeWithExisting: true };
        cmdDemo(config);
        return;
    }

    const config = loadConfig();
    const client = new IniesClient(config);

    try {
        if (CMD === 'list') await cmdList(client, ARGS);
        else if (CMD === 'fetch') await cmdFetch(client, ARGS);
        else if (CMD === 'update') await cmdUpdate(config, client, ARGS);
        else { console.error('Commande inconnue : ' + CMD); process.exit(1); }
    } catch (err) {
        console.error('Erreur :', err.message);
        if (config.verbose) console.error(err.stack);
        process.exit(1);
    }
})();

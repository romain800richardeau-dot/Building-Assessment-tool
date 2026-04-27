/**
 * Mapping XML/JSON SOAP INIES V4 → schéma INIES_FDES.fdes[]
 *
 * À adapter selon le format réel renvoyé par le webservice.
 * Les champs sont basés sur la doc publique INIES et la structure
 * normée NF EN 15804+A1.
 */

'use strict';

/**
 * Phases EGES standard NF EN 15804
 */
const PHASES = ['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','B6','B7','C1','C2','C3','C4','D'];

/**
 * Convertir une valeur en nombre safe (null si absent ou non parsable)
 */
function toNum(v) {
    if (v === null || v === undefined || v === '') return null;
    if (typeof v === 'number') return isFinite(v) ? v : null;
    const s = String(v).replace(',', '.').trim();
    if (!s) return null;
    const n = parseFloat(s);
    return isFinite(n) ? n : null;
}

/**
 * Construire le tableau cat[] (5 niveaux) depuis l'arborescence INIES
 * @param {Object} xmlNode - noeud XML décodé contenant les info catégorie
 */
function extractCategories(xmlNode) {
    const cat = ['', '', '', '', ''];
    if (!xmlNode) return cat;
    // Selon le schéma INIES, les catégories peuvent être :
    // - Une chaîne "Bâtiment > Gros œuvre > Béton" à splitter
    // - Une liste imbriquée <Categorie><Niveau1>...<Niveau2>...
    const raw = xmlNode.categorie || xmlNode.Categorie || xmlNode.classification || '';
    if (typeof raw === 'string' && raw.indexOf('>') !== -1) {
        const parts = raw.split('>').map(s => s.trim()).filter(Boolean);
        for (let i = 0; i < Math.min(5, parts.length); i++) cat[i] = parts[i];
    } else if (Array.isArray(raw)) {
        for (let i = 0; i < Math.min(5, raw.length); i++) cat[i] = String(raw[i]).trim();
    } else {
        // Champs niveau1, niveau2, ...
        for (let i = 0; i < 5; i++) {
            const k = 'niveau' + (i + 1);
            if (xmlNode[k]) cat[i] = String(xmlNode[k]).trim();
        }
    }
    return cat;
}

/**
 * Extraire les valeurs EGES par phase depuis le noeud XML.
 * @param {Object} xmlNode - le noeud contenant les indicateurs ACV
 */
function extractEges(xmlNode) {
    const eges = {};
    PHASES.forEach(p => { eges[p] = null; });
    eges.total = null;

    if (!xmlNode) return eges;

    // Hypothèse 1 : chaque phase est un champ direct A1, A2, ...
    PHASES.forEach(p => {
        if (xmlNode[p] !== undefined) eges[p] = toNum(xmlNode[p]);
        else if (xmlNode['Phase' + p] !== undefined) eges[p] = toNum(xmlNode['Phase' + p]);
    });

    // Hypothèse 2 : indicateur GWP / Réchauffement climatique
    // Le webservice INIES renvoie souvent un tableau d'indicateurs avec un code (GWP, AP, EP...)
    // On cherche celui qui correspond au GWP / changement climatique total
    if (Array.isArray(xmlNode.indicateurs)) {
        const gwp = xmlNode.indicateurs.find(i => /GWP|R[ée]chauffement|Climat/i.test(i.code || i.nom || ''));
        if (gwp && Array.isArray(gwp.valeurs)) {
            gwp.valeurs.forEach(v => {
                const code = (v.phase || v.etape || '').toUpperCase().trim();
                if (PHASES.includes(code)) eges[code] = toNum(v.valeur || v.value);
            });
        }
    }

    // Calculer le total si non fourni
    if (eges.total === null) {
        let sum = 0, hasAny = false;
        PHASES.forEach(p => {
            if (typeof eges[p] === 'number') { sum += eges[p]; hasAny = true; }
        });
        if (hasAny) eges.total = sum;
    } else {
        eges.total = toNum(eges.total);
    }

    return eges;
}

/**
 * Extraire le carbone biogénique
 */
function extractBiogenic(xmlNode) {
    if (!xmlNode || !xmlNode.biogenique) return { storage: null, packaging: null };
    return {
        storage: toNum(xmlNode.biogenique.stockage || xmlNode.biogenique.storage),
        packaging: toNum(xmlNode.biogenique.emballage || xmlNode.biogenique.packaging)
    };
}

/**
 * Mappe une fiche INIES brute vers le schéma INIES_FDES.fdes[]
 * @param {Object} raw - objet décodé depuis la réponse SOAP
 * @returns {Object} fiche au format unifié
 */
function mapIniesToFiche(raw) {
    if (!raw) return null;

    const fiche = {
        id: String(raw.id || raw.identifiant || raw.code || ''),
        name: String(raw.nom || raw.name || raw.libelle || '').trim(),
        statut: String(raw.statut || raw.etat || '').trim(),
        version: String(raw.version || raw.numeroVersion || '').trim(),
        declType: String(raw.typeDeclaration || raw.type || 'DEP').trim(),
        cat: extractCategories(raw),
        commercialRef: String(raw.referenceCommerciale || raw.commercialRef || '').trim(),
        dvt: toNum(raw.dvt || raw.dureeVieTypique || raw.dureeVie) || 0,
        ufQty: toNum(raw.ufQty || raw.unite_quantite) || 1,
        ufUnit: String(raw.ufUnit || raw.unite || raw.unitFonctionnelle || '').trim(),
        ufDesc: String(raw.ufDesc || raw.descriptionUF || raw.description || '').trim(),
        organism: String(raw.organisme || raw.fabricant || raw.declarant || '').trim(),
        norme: String(raw.norme || raw.normeReference || 'NF EN 15804+A1').trim(),
        eges: extractEges(raw.eges || raw.indicateursACV || raw),
        biogenic: extractBiogenic(raw.biogenique ? raw : (raw.biogenique || null))
    };

    // Validation minimale
    if (!fiche.id || !fiche.name) return null;
    return fiche;
}

/**
 * Mappe une liste de fiches INIES en parallèle
 */
function mapIniesList(rawList) {
    if (!Array.isArray(rawList)) return [];
    return rawList
        .map(mapIniesToFiche)
        .filter(Boolean);
}

module.exports = {
    PHASES,
    toNum,
    extractCategories,
    extractEges,
    extractBiogenic,
    mapIniesToFiche,
    mapIniesList
};

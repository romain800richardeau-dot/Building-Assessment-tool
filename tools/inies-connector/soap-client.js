/**
 * Client SOAP pour le webservice INIES V4
 *
 * Encapsule l'authentification et les appels SOAP vers le CSTB.
 * Utilise la librairie 'soap' npm.
 */

'use strict';

const fs = require('fs');
const path = require('path');

let soap;
try { soap = require('soap'); }
catch (e) { console.warn('Lib soap non installée. Lancer : npm install'); }

class IniesClient {
    constructor(config) {
        this.config = config;
        this.client = null;
        this.lastCall = 0;
    }

    /**
     * Initialise le client SOAP avec authentification basique HTTP.
     */
    async connect() {
        if (this.client) return this.client;
        if (!soap) throw new Error('Lib soap manquante. Lancer : npm install dans tools/inies-connector');
        const wsdl = this.config.wsdlUrl || (this.config.endpoint + '?wsdl');
        const opts = {
            endpoint: this.config.endpoint,
            wsdl_options: {
                timeout: this.config.timeout || 30000
            }
        };
        if (this.config.verbose) console.log(`[soap] Connexion à ${wsdl}...`);
        this.client = await soap.createClientAsync(wsdl, opts);
        // Auth basique HTTP
        if (this.config.login && this.config.password) {
            this.client.setSecurity(new soap.BasicAuthSecurity(this.config.login, this.config.password));
        }
        if (this.config.verbose) console.log(`[soap] Connecté. Méthodes disponibles : ${Object.keys(this.client.describe() || {}).slice(0, 5).join(', ')}...`);
        return this.client;
    }

    /**
     * Respect du rate limit configuré.
     */
    async _throttle() {
        const now = Date.now();
        const wait = (this.config.rateLimit || 500) - (now - this.lastCall);
        if (wait > 0) await new Promise(r => setTimeout(r, wait));
        this.lastCall = Date.now();
    }

    /**
     * Appel SOAP générique avec retry.
     * @param {string} method - nom de la méthode SOAP
     * @param {Object} args - arguments
     */
    async call(method, args) {
        await this.connect();
        await this._throttle();
        const fn = this.client[method + 'Async'];
        if (typeof fn !== 'function') throw new Error(`Méthode SOAP introuvable : ${method}`);
        const retries = this.config.retryOnFail || 3;
        let lastErr;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const [result] = await fn.call(this.client, args);
                return result;
            } catch (err) {
                lastErr = err;
                if (this.config.verbose) console.warn(`[soap] ${method} attempt ${attempt}/${retries} failed: ${err.message}`);
                if (attempt < retries) await new Promise(r => setTimeout(r, 1000 * attempt));
            }
        }
        throw lastErr;
    }

    /**
     * Récupère la liste des FDES disponibles.
     * Méthode SOAP supposée : ListerFiches (à adapter au vrai schéma).
     */
    async listFiches(options = {}) {
        const args = {
            filtre: options.filter || '',
            categorie: options.category || '',
            offset: options.offset || 0,
            limit: options.limit || 100
        };
        const result = await this.call('ListerFiches', args);
        return Array.isArray(result.fiches) ? result.fiches : (result.return || []);
    }

    /**
     * Récupère le détail complet d'une FDES (avec phases A1-D).
     * Méthode SOAP supposée : ObtenirFicheDetail
     */
    async getFicheDetail(id) {
        const result = await this.call('ObtenirFicheDetail', { id: String(id) });
        return result.fiche || result.return || result;
    }

    /**
     * Recherche par mot-clé.
     */
    async search(keyword, options = {}) {
        return this.listFiches({ ...options, filter: keyword });
    }
}

module.exports = { IniesClient };

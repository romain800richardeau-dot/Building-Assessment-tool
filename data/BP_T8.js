window.BP_T8_HTML = `<div class="bp-fiche" data-theme="solaire-pv" id="bpFicheT8C1">
    <div class="bp-card ms-card">
        <div class="bp-card-header">
            <div class="ms-banner">
                <div class="ms-banner-num">
                    <small>Chapitre</small>
                    <strong>C.1</strong>
                </div>
                <div class="ms-banner-text">
                    <div class="ms-banner-eyebrow">Th&egrave;me 8 &mdash; Solaire photovolta&iuml;que &middot; Fiche 1 / 6</div>
                    <h3 class="ms-banner-title">Principe du photovolta&iuml;que et composants d&rsquo;une installation</h3>
                    <div class="ms-banner-sub">De l&rsquo;effet photo&eacute;lectrique &agrave; l&rsquo;injection r&eacute;seau : comprendre chaque maillon</div>
                </div>
            </div>
        </div>
        <div class="bp-card-content ms-content">

            <p class="ms-lede">Un module photovolta&iuml;que convertit la lumi&egrave;re en &eacute;lectricit&eacute; continue. Un onduleur la transforme en courant alternatif 230 V. Entre les deux, un ensemble de protections, de c&acirc;blages et de fixations conditionne la s&eacute;curit&eacute;, le rendement et la dur&eacute;e de vie de l&rsquo;installation. Ce chapitre d&eacute;taille le principe physique, passe en revue chaque composant et compare les technologies de modules disponibles en 2024-2025.</p>

            <div class="ms-intro bp-section">
                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                <h4>&Agrave; la fin de cette fiche, l&rsquo;apprenant doit savoir :</h4>
                <ul>
                    <li>expliquer le <strong>principe physique</strong> de la conversion photovolta&iuml;que (effet photo&eacute;lectrique, jonction P-N) ;</li>
                    <li>identifier les <strong>composants</strong> d&rsquo;une installation PV r&eacute;sidentielle ou tertiaire ;</li>
                    <li>distinguer les <strong>technologies de modules</strong> et leurs indicateurs de performance ;</li>
                    <li>conna&icirc;tre les <strong>ordres de grandeur</strong> de rendement, dur&eacute;e de vie et bilan carbone.</li>
                </ul>
            </div>

            <!-- ─── Chapitre I ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>Du photon &agrave; l&rsquo;&eacute;lectron</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Watt-cr&ecirc;te (Wc)</h6>
                        <p>Puissance &eacute;lectrique maximale d&rsquo;un module mesur&eacute;e en conditions standard de test (<strong>STC</strong> : 1 000 W/m&sup2;, 25 &deg;C cellule, AM 1,5). Un module r&eacute;sidentiel standard fait <strong>400 &agrave; 450 Wc</strong> sur environ 1,6 &agrave; 2 m&sup2;.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>L&rsquo;effet photo&eacute;lectrique a &eacute;t&eacute; d&eacute;couvert par <strong>Becquerel</strong> en 1839 et th&eacute;oris&eacute; par <strong>Einstein</strong> en 1905 (prix Nobel 1921).</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Le photovolta&iuml;que (PV) repose sur l&rsquo;<strong>effet photo&eacute;lectrique</strong>. Lorsqu&rsquo;un photon d&rsquo;&eacute;nergie suffisante frappe un mat&eacute;riau semi-conducteur dop&eacute;, il arrache un &eacute;lectron et g&eacute;n&egrave;re un courant &eacute;lectrique continu.</p>

                    <p>Les cellules commerciales utilisent essentiellement le <strong>silicium cristallin</strong> (monocristallin ou polycristallin), dop&eacute; en P (bore) d&rsquo;un c&ocirc;t&eacute; et en N (phosphore) de l&rsquo;autre pour cr&eacute;er une <strong>jonction P-N</strong>. Le champ &eacute;lectrique interne &agrave; cette jonction s&eacute;pare les charges photog&eacute;n&eacute;r&eacute;es et les canalise vers les &eacute;lectrodes.</p>

                    <p>La puissance d&rsquo;un module s&rsquo;exprime en <strong>watt-cr&ecirc;te</strong> (Wc), mesur&eacute;e dans des conditions standardis&eacute;es (STC). C&rsquo;est l&rsquo;unit&eacute; de r&eacute;f&eacute;rence pour dimensionner toute installation, comparer les devis et estimer la production annuelle.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>La jonction P-N, si&egrave;ge de la conversion photovolta&iuml;que</div>
                        <figure class="ms-doc-fig">
                            <img src="assets/images/t7/t7c1_01_jonction_pn.webp" alt="Sch&eacute;ma de fonctionnement d&rsquo;une jonction P-N dans une cellule photovolta&iuml;que" loading="lazy" decoding="async">
                            <figcaption>Le photon arrache un &eacute;lectron dans la zone de d&eacute;pl&eacute;tion de la jonction P-N ; le champ interne s&eacute;pare les charges.</figcaption>
                        </figure>
                        <p>Quand un photon p&eacute;n&egrave;tre dans le semi-conducteur, il lib&egrave;re un &eacute;lectron (couche N) et cr&eacute;e un &laquo; trou &raquo; (couche P). Le champ &eacute;lectrique interne &agrave; la jonction pousse l&rsquo;&eacute;lectron vers l&rsquo;&eacute;lectrode n&eacute;gative et le trou vers la positive, g&eacute;n&eacute;rant un courant continu exploitable.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre II ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>Les composants d&rsquo;une installation</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box">
                        <div class="ms-box-label">Notion cl&eacute;</div>
                        <h6>String</h6>
                        <p>S&eacute;rie de modules connect&eacute;s en s&eacute;rie. La tension de la cha&icirc;ne est la somme des tensions de chaque module. Un ombrage sur un seul module peut p&eacute;naliser toute la cha&icirc;ne (sauf avec micro-onduleurs ou optimiseurs).</p>
                    </div>
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>C&acirc;blage DC</h6>
                        <p>La tension continue dans les strings peut d&eacute;passer <strong>600 V</strong>. Un arc &eacute;lectrique DC ne s&rsquo;&eacute;teint pas spontan&eacute;ment : le respect des normes NF C 15-100 et UTE C 15-712 est imp&eacute;ratif.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Une installation photovolta&iuml;que raccord&eacute;e au r&eacute;seau comporte syst&eacute;matiquement les &eacute;l&eacute;ments suivants.</p>

                    <ol>
                        <li><strong>Modules (panneaux) photovolta&iuml;ques</strong> : &eacute;l&eacute;ments producteurs, assembl&eacute;s en s&eacute;rie pour former des strings.</li>
                        <li><strong>Onduleur</strong> (ou micro-onduleurs) : convertit le courant continu (DC) en courant alternatif (AC) 230 V / 50 Hz.</li>
                        <li><strong>Coffret de protection DC</strong> (parafoudre, sectionneur) et <strong>coffret AC</strong> (disjoncteur diff&eacute;rentiel, protections).</li>
                        <li><strong>Compteur de production</strong> et/ou de non-consommation, selon le mod&egrave;le &eacute;conomique (autoconsommation, vente totale, vente de surplus).</li>
                        <li><strong>Syst&egrave;me de fixation</strong> adapt&eacute; au support (bac acier, tuile, ardoise, membrane d&rsquo;&eacute;tanch&eacute;it&eacute;, toiture-terrasse).</li>
                        <li><strong>C&acirc;blage DC et AC</strong> dimensionn&eacute; selon NF C 15-100 et UTE C 15-712.</li>
                        <li><strong>Supervision</strong> (monitoring) pour suivre la production et d&eacute;tecter les anomalies.</li>
                    </ol>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Sch&eacute;ma d&rsquo;une installation PV raccord&eacute;e au r&eacute;seau</div>
                        <figure class="ms-doc-fig">
                            <img src="assets/images/t7/t7c1_04_schema_reseau.webp" alt="Sch&eacute;ma d&rsquo;une installation photovolta&iuml;que raccord&eacute;e : modules, protection DC, onduleur, protection AC, compteur, r&eacute;seau" loading="lazy" decoding="async">
                            <figcaption>Du module au r&eacute;seau : protection DC, onduleur, protection AC, compteur, consommateur et injection.</figcaption>
                        </figure>
                        <p>L&rsquo;&eacute;lectricit&eacute; continue produite par les modules traverse un coffret de protection DC, puis l&rsquo;onduleur qui la convertit en 230 V alternatif. Un coffret AC et un compteur &eacute;lectrique compl&egrave;tent la cha&icirc;ne avant l&rsquo;injection sur le r&eacute;seau ou la consommation locale.</p>
                    </div>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 3</span>Onduleur central vs micro-onduleurs</div>
                        <table>
                            <thead><tr><th>Crit&egrave;re</th><th>Onduleur central (string)</th><th>Micro-onduleurs</th></tr></thead>
                            <tbody>
                                <tr><td>Principe</td><td>Un onduleur g&egrave;re toute l&rsquo;installation</td><td>Un onduleur par module (250 &agrave; 400 W)</td></tr>
                                <tr><td>Co&ucirc;t</td><td>Plus faible</td><td>Plus &eacute;lev&eacute; (<span class="ms-hl">+20 &agrave; 40 %</span>)</td></tr>
                                <tr><td>Tol&eacute;rance aux ombrages</td><td>Faible (un panneau ombr&eacute; p&eacute;nalise toute la cha&icirc;ne)</td><td><strong>&Eacute;lev&eacute;e</strong> (chaque module ind&eacute;pendant)</td></tr>
                                <tr><td>Suivi</td><td>Global</td><td><strong>Par module</strong> (diagnostic fin)</td></tr>
                                <tr><td>Dur&eacute;e de vie</td><td>10-15 ans (remplacement &agrave; pr&eacute;voir)</td><td>20-25 ans (garantie constructeur longue)</td></tr>
                                <tr><td>S&eacute;curit&eacute; incendie</td><td>Tension DC &eacute;lev&eacute;e dans les strings</td><td>Tension DC limit&eacute;e par module</td></tr>
                            </tbody>
                        </table>
                        <p>Les micro-onduleurs sont particuli&egrave;rement pertinents d&egrave;s que la toiture pr&eacute;sente des <strong>ombrages partiels</strong> (chemin&eacute;e, arbre, velux), une <strong>orientation mixte</strong> (est + ouest) ou quand on souhaite un suivi fin par module. L&rsquo;onduleur central reste le choix &eacute;conomique pour une toiture homog&egrave;ne, bien expos&eacute;e, sans ombrage.</p>
                    </div>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 4</span>Le signal alternatif produit par l&rsquo;onduleur</div>
                        <figure class="ms-doc-fig">
                            <img src="assets/images/t7/t7c1_03_signal_ac.webp" alt="Courbe sinuso&iuml;dale montrant la valeur cr&ecirc;te, la valeur cr&ecirc;te &agrave; cr&ecirc;te et la moyenne liss&eacute;e d&rsquo;un signal AC" loading="lazy" decoding="async">
                            <figcaption>Signal AC 230 V / 50 Hz : valeur cr&ecirc;te (~325 V), valeur cr&ecirc;te &agrave; cr&ecirc;te (~650 V) et moyenne liss&eacute;e (230 V efficace).</figcaption>
                        </figure>
                        <p>Les modules produisent du <strong>courant continu</strong> (DC). L&rsquo;onduleur le convertit en courant alternatif sinuso&iuml;dal (AC) 230 V / 50 Hz. La tension de 230 V est une valeur <strong>efficace</strong> (RMS) : la valeur cr&ecirc;te r&eacute;elle atteint 325 V (230 &times; &radic;2). Cette conversion est indispensable pour alimenter les appareils domestiques et injecter sur le r&eacute;seau.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre III ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>Les technologies de modules</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Sur toiture inclin&eacute;e bien expos&eacute;e : environ <span class="ms-hl">0,175 kWc/m&sup2;</span>. Sur toiture plate avec ch&acirc;ssis : <span class="ms-hl">0,10 kWc/m&sup2;</span>.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Le silicium monocristallin repr&eacute;sente environ <span class="ms-hl">95 %</span> du march&eacute; r&eacute;sidentiel en 2024-2025. Technologies r&eacute;centes : TOPCon, PERC, HJT.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Trois grandes familles de modules coexistent.</p>

                    <h5>Silicium monocristallin</h5>
                    <p>Rendement <span class="ms-hl">20 &agrave; 22 %</span>, teinte noire uniforme, haute performance, dur&eacute;e de vie sup&eacute;rieure &agrave; 25-30 ans. C&rsquo;est la technologie dominante, port&eacute;e par les architectures cellulaires TOPCon, PERC et HJT.</p>

                    <h5>Silicium polycristallin</h5>
                    <p>En net recul. Rendement 15-18 %, autrefois moins cher, aujourd&rsquo;hui supplant&eacute; par le monocristallin dont les co&ucirc;ts de production ont fortement baiss&eacute;.</p>

                    <h5>Couches minces</h5>
                    <p>CdTe, CIGS, silicium amorphe : rendement plus faible (10-14 %) mais meilleur comportement en faible luminosit&eacute; et en chaleur. Cr&eacute;neau de niche pour les int&eacute;grations architecturales sp&eacute;cifiques (BIPV).</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 5</span>Principaux indicateurs techniques d&rsquo;un module</div>
                        <table>
                            <thead><tr><th>Indicateur</th><th>D&eacute;finition</th><th>Valeur typique (mono 2024)</th></tr></thead>
                            <tbody>
                                <tr><td>Puissance cr&ecirc;te (Wc)</td><td>Puissance max. en STC</td><td>400 &agrave; 450 Wc</td></tr>
                                <tr><td>Rendement (%)</td><td>Wc / surface du module</td><td>19-22 %</td></tr>
                                <tr><td>Coeff. de temp&eacute;rature</td><td>Perte de puissance par &deg;C au-del&agrave; de 25 &deg;C</td><td>&minus;0,3 &agrave; &minus;0,4 %/&deg;C</td></tr>
                                <tr><td>Garantie produit</td><td>D&eacute;faut de fabrication</td><td>10 &agrave; 25 ans</td></tr>
                                <tr><td>Garantie performance</td><td>Puissance minimale &agrave; 25 ans</td><td><span class="ms-hl">80 &agrave; 87 %</span> de Pnom</td></tr>
                                <tr><td>D&eacute;gradation annuelle</td><td>Perte de rendement par an</td><td>0,4 &agrave; 0,7 %/an</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 6</span>Courbes I/V d&rsquo;un module selon l&rsquo;ensoleillement</div>
                        <figure class="ms-doc-fig">
                            <img src="assets/images/t7/t7c1_02_courbes_iv.webp" alt="Courbes courant-tension (I/V) d&rsquo;un panneau solaire pour diff&eacute;rents niveaux d&rsquo;ensoleillement (200 &agrave; 1 000 W/m&sup2;)" loading="lazy" decoding="async">
                            <figcaption>Courbes I/V pour 200, 400, 600, 800 et 1 000 W/m&sup2;. Le point de puissance maximale (MPP) est marqu&eacute; sur chaque courbe.</figcaption>
                        </figure>
                        <p>Chaque courbe repr&eacute;sente le comportement &eacute;lectrique du module &agrave; un niveau d&rsquo;ensoleillement donn&eacute;. Deux grandeurs caract&eacute;ristiques d&eacute;limitent chaque courbe : &agrave; gauche, le <strong>courant de court-circuit I<sub>sc</sub></strong> (courant maximal, tension nulle) ; &agrave; droite, la <strong>tension en circuit ouvert V<sub>oc</sub></strong> (tension maximale, courant nul).</p>
                        <p>I<sub>sc</sub> est quasi <strong>proportionnel &agrave; l&rsquo;irradiance</strong> : &agrave; 200 W/m&sup2;, il vaut environ 1/5 de sa valeur &agrave; 1 000 W/m&sup2;. V<sub>oc</sub>, en revanche, <strong>varie peu</strong> avec l&rsquo;ensoleillement &mdash; c&rsquo;est une propri&eacute;t&eacute; intrins&egrave;que de la jonction P-N. En pratique, V<sub>oc</sub> est surtout sensible &agrave; la <strong>temp&eacute;rature</strong> : elle diminue d&rsquo;environ 0,3 %/&deg;C quand la cellule chauffe.</p>
                        <p>Entre ces deux extr&ecirc;mes se trouve le <strong>point de puissance maximale (MPP)</strong>, marqu&eacute; par un cercle sur chaque courbe. C&rsquo;est le couple (V, I) o&ugrave; le produit P = V &times; I est le plus &eacute;lev&eacute;. La zone <strong>U<sub>MPP</sub></strong> en bas du graphique montre que la tension optimale reste relativement stable quelle que soit l&rsquo;irradiance. L&rsquo;onduleur int&egrave;gre un algorithme <strong>MPPT</strong> (Maximum Power Point Tracking) qui ajuste en permanence la tension de fonctionnement pour rester au voisinage de ce point et extraire la puissance maximale disponible &agrave; chaque instant.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre IV ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>Stockage : batteries et alternatives</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Erreur fr&eacute;quente</div>
                        <h6>&laquo; Une batterie double les &eacute;conomies &raquo;</h6>
                        <p>Ajouter une batterie <strong>double souvent le co&ucirc;t</strong> d&rsquo;une petite installation sans doubler les &eacute;conomies. Privil&eacute;gier d&rsquo;abord l&rsquo;autoconsommation pilot&eacute;e (chauffe-eau, lave-linge, VE).</p>
                    </div>
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Co&ucirc;t install&eacute; d&rsquo;une batterie lithium-ion : <span class="ms-hl">800 &agrave; 1 200 &euro;/kWh</span> (2024-2025). Cycles : 4 000 &agrave; 8 000 selon la chimie.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Le stockage en batterie reste <strong>&eacute;conomiquement marginal</strong> en r&eacute;sidentiel raccord&eacute; en 2024-2026. Trois cas de figure justifient son installation.</p>

                    <ol>
                        <li><strong>Site isol&eacute;</strong> (non raccord&eacute; au r&eacute;seau) : le stockage est indispensable.</li>
                        <li><strong>Maximisation de l&rsquo;autoconsommation</strong> en site raccord&eacute; : d&eacute;calage de la production solaire vers les soir&eacute;es et matins. Rentabilit&eacute; encore d&eacute;licate.</li>
                        <li><strong>Backup coupure r&eacute;seau</strong> : fonction de secours.</li>
                    </ol>

                    <p>Les batteries lithium-ion dominent (Li-NMC, LFP). L&rsquo;<strong>eau chaude sanitaire</strong> et le <strong>ballon thermodynamique</strong> constituent d&rsquo;excellents &laquo; stockages thermiques &raquo; moins co&ucirc;teux pour valoriser le surplus solaire &mdash; &agrave; privil&eacute;gier avant d&rsquo;investir dans une batterie.</p>
                </div>
            </div>

            <!-- ─── Chapitre V ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Dur&eacute;e de vie, garanties, fin de vie</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Plus de <span class="ms-hl">95 %</span> du poids d&rsquo;un module cristallin est recyclable (verre, aluminium, cuivre, silicium). Fili&egrave;re : <strong>Soren</strong> (ex-PV CYCLE France).</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Empreinte carbone d&rsquo;un module silicium chinois : <span class="ms-hl">30 &agrave; 40 gCO&sup2;eq/kWh</span>. Module europ&eacute;en : 15 &agrave; 25 g. Mix FR : 55-80 g.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Dur&eacute;es de vie par composant</h5>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 7</span>Dur&eacute;e de vie des composants d&rsquo;une installation PV</div>
                        <table>
                            <thead><tr><th>Composant</th><th>Dur&eacute;e de vie</th><th>Remarque</th></tr></thead>
                            <tbody>
                                <tr><td>Modules</td><td><span class="ms-hl">25 &agrave; 30 ans</span></td><td>D&eacute;gradation 0,4-0,7 %/an</td></tr>
                                <tr><td>Onduleur central</td><td>10-15 ans</td><td>Remplacement &agrave; pr&eacute;voir en milieu de vie</td></tr>
                                <tr><td>Micro-onduleurs</td><td>20-25 ans</td><td>Garantie constructeur souvent longue</td></tr>
                                <tr><td>C&acirc;bles, connectiques, fixations</td><td>25-30 ans</td><td>Sous condition d&rsquo;entretien</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h5>Recyclage</h5>
                    <p>La fili&egrave;re fran&ccedil;aise est organis&eacute;e par <strong>Soren</strong> (ex-PV CYCLE France), &eacute;co-organisme agr&eacute;&eacute;. La collecte et le recyclage sont financ&eacute;s par l&rsquo;&eacute;co-contribution incluse &agrave; l&rsquo;achat. Le <strong>temps de retour &eacute;nerg&eacute;tique</strong> d&rsquo;une installation fran&ccedil;aise est de <span class="ms-hl">1 &agrave; 3 ans</span> selon la localisation et l&rsquo;origine des modules.</p>
                </div>
            </div>

            <!-- ─── Chapitre VI ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">VI. </span>Cadre fran&ccedil;ais et qualifications</span>
            </div>
            <div class="ms-body full">
                <div class="ms-main">
                    <p>L&rsquo;installation photovolta&iuml;que en France est encadr&eacute;e par un ensemble de normes, de qualifications et de proc&eacute;dures obligatoires.</p>

                    <ol>
                        <li><strong>Qualification RGE QualiPV</strong> : obligatoire pour b&eacute;n&eacute;ficier des aides (prime &agrave; l&rsquo;autoconsommation, obligation d&rsquo;achat). V&eacute;rifier la validit&eacute; sur france-renov.gouv.fr.</li>
                        <li><strong>Norme NF C 15-100</strong> : installations &eacute;lectriques basse tension.</li>
                        <li><strong>Guide UTE C 15-712-1 et -2</strong> : sp&eacute;cifique aux installations PV raccord&eacute;es au r&eacute;seau.</li>
                        <li><strong>Arr&ecirc;t&eacute; tarifaire</strong> : conditions d&rsquo;achat et prime &agrave; l&rsquo;autoconsommation, r&eacute;vis&eacute; trimestriellement par la CRE.</li>
                        <li><strong>Consuel</strong> : visite obligatoire de conformit&eacute; avant mise en service.</li>
                        <li><strong>Enedis</strong> : gestionnaire de r&eacute;seau pour le raccordement (convention CRAE ou CPS).</li>
                    </ol>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Bonne pratique</span>V&eacute;rifications avant r&eacute;ception</div>
                        <p>V&eacute;rifier que l&rsquo;installateur est <strong>RGE QualiPV en cours de validit&eacute;</strong> et qu&rsquo;il souscrit &agrave; une <strong>assurance d&eacute;cennale</strong> couvrant sp&eacute;cifiquement les travaux PV. Demander les <strong>proc&egrave;s-verbaux Consuel et Enedis</strong> &agrave; la remise des cl&eacute;s.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Synthèse ─── -->
            <div class="ms-retiens bp-section">
                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                <h4>Les points essentiels du chapitre</h4>
                <ul>
                    <li>Le photovolta&iuml;que convertit la lumi&egrave;re en &eacute;lectricit&eacute; continue via une <strong>jonction P-N</strong> semi-conductrice ; l&rsquo;<strong>onduleur</strong> la transforme en courant alternatif.</li>
                    <li>Une installation r&eacute;sidentielle d&eacute;livre environ <strong>0,175 kWc/m&sup2;</strong> sur toiture inclin&eacute;e et <strong>0,10 kWc/m&sup2;</strong> sur toiture plate.</li>
                    <li>Les <strong>modules monocristallins</strong> dominent (20-22 % de rendement), dur&eacute;e de vie de <strong>25-30 ans</strong>, d&eacute;gradation ~0,4-0,7 %/an.</li>
                    <li>Le choix entre <strong>onduleur central</strong> et <strong>micro-onduleurs</strong> d&eacute;pend des ombrages, de l&rsquo;orientation et du budget.</li>
                    <li>Le <strong>stockage batterie</strong> reste marginal en r&eacute;sidentiel raccord&eacute; ; privil&eacute;gier l&rsquo;<strong>autoconsommation pilot&eacute;e</strong> (chauffe-eau, VE).</li>
                    <li>La fili&egrave;re de recyclage (<strong>Soren</strong>) couvre <strong>95 %</strong> du poids d&rsquo;un module. Installateur <strong>RGE QualiPV</strong> obligatoire pour les aides.</li>
                </ul>
            </div>

            <div class="ms-vocab bp-section">
                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                <dl>
                    <dt>Watt-cr&ecirc;te (Wc)</dt><dd>Puissance maximale d&rsquo;un module en conditions standard de test (STC).</dd>
                    <dt>Onduleur</dt><dd>Convertisseur de courant continu (DC) en courant alternatif (AC) 230 V.</dd>
                    <dt>String</dt><dd>S&eacute;rie de modules connect&eacute;s en s&eacute;rie formant une cha&icirc;ne de tension.</dd>
                    <dt>Micro-onduleur</dt><dd>Onduleur individuel install&eacute; sous chaque module, ind&eacute;pendant du reste de la cha&icirc;ne.</dd>
                    <dt>Jonction P-N</dt><dd>Interface entre deux zones dop&eacute;es (P : bore, N : phosphore) d&rsquo;un semi-conducteur, si&egrave;ge de la conversion photovolta&iuml;que.</dd>
                    <dt>STC</dt><dd>Standard Test Conditions : 1 000 W/m&sup2;, 25 &deg;C cellule, AM 1,5.</dd>
                    <dt>Soren</dt><dd>&Eacute;co-organisme agr&eacute;&eacute; pour la collecte et le recyclage des modules PV en France.</dd>
                    <dt>RGE QualiPV</dt><dd>Qualification Reconnu Garant de l&rsquo;Environnement, sp&eacute;cialit&eacute; photovolta&iuml;que.</dd>
                </dl>
            </div>

            <div class="ms-sources bp-section">
                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>Fiches photovolta&iuml;que</em> (2022-2024) &middot; ADEME, <em>Le photovolta&iuml;que en 10 questions</em> (2023) &middot; photovoltaique.info &middot; Soren, <em>Rapport annuel de recyclage</em> &middot; Guide UTE C 15-712-1 et -2 &middot; CRE, <em>Arr&ecirc;t&eacute;s tarifaires</em> &middot; ADEME, <em>Empreinte carbone du PV en France</em>.
            </div>

        </div>
        <div class="bp-card-footer">
            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / Soren / CRE</span>
            <span>Fiche 1 / 6 &mdash; Avril 2026</span>
        </div>
    </div>
</div>

<div class="bp-fiche" data-theme="solaire-pv" id="bpFicheT8C2">
    <div class="bp-card ms-card">
        <div class="bp-card-header">
            <div class="ms-banner">
                <div class="ms-banner-num">
                    <small>Chapitre</small>
                    <strong>C.2</strong>
                </div>
                <div class="ms-banner-text">
                    <div class="ms-banner-eyebrow">Th&egrave;me 8 &mdash; Solaire photovolta&iuml;que &middot; Fiche 2 / 6</div>
                    <h3 class="ms-banner-title">&Eacute;tude d&rsquo;opportunit&eacute; : gisement, production, rentabilit&eacute;</h3>
                    <div class="ms-banner-sub">De l&rsquo;orientation de la toiture au temps de retour sur investissement</div>
                </div>
            </div>
        </div>
        <div class="bp-card-content ms-content">

            <p class="ms-lede">Installer des panneaux photovolta&iuml;ques sans conna&icirc;tre le gisement solaire de sa toiture revient &agrave; isoler sans conna&icirc;tre le U de ses parois. Ce chapitre d&eacute;roule les cinq &eacute;tapes d&rsquo;une &eacute;tude d&rsquo;opportunit&eacute; r&eacute;alisable avec des outils publics gratuits : orientation, inclinaison, surface utile, puissance installable, productible annuel et estimation de rentabilit&eacute;.</p>

            <div class="ms-intro bp-section">
                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                <h4>&Agrave; la fin de cette fiche, l&rsquo;apprenant doit savoir :</h4>
                <ul>
                    <li>&eacute;valuer le <strong>gisement solaire</strong> d&rsquo;une toiture avec des outils publics gratuits ;</li>
                    <li>quantifier la <strong>surface &eacute;quipable</strong>, la <strong>puissance</strong> et le <strong>productible</strong> ;</li>
                    <li>calculer un <strong>ordre de grandeur de rentabilit&eacute;</strong> selon le mod&egrave;le &eacute;conomique ;</li>
                    <li>identifier les <strong>points de vigilance</strong> avant d&rsquo;engager un projet.</li>
                </ul>
            </div>

            <!-- ─── Chapitre I ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>Un pr&eacute;alable : la r&eacute;novation globale</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>PV sur logement-passoire</h6>
                        <p>Ajouter du PV sur un logement mal isol&eacute; revient &agrave; <strong>compenser des pertes</strong> plut&ocirc;t qu&rsquo;&agrave; r&eacute;duire son impact r&eacute;el. Le PV vient <strong>apr&egrave;s</strong> l&rsquo;isolation et le chauffage performant.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Avant toute &eacute;tude PV, le bon r&eacute;flexe est de <strong>hi&eacute;rarchiser les travaux</strong>. L&rsquo;ADEME et le r&eacute;seau France R&eacute;nov&rsquo; rappellent que le photovolta&iuml;que doit s&rsquo;inscrire dans une d&eacute;marche de r&eacute;novation globale.</p>

                    <p>Les priorit&eacute;s restent, dans l&rsquo;ordre :</p>
                    <ol>
                        <li><strong>Isolation de l&rsquo;enveloppe</strong> (toiture en priorit&eacute;, R &ge; 7 m&sup2;&middot;K/W).</li>
                        <li><strong>&Eacute;tanch&eacute;it&eacute; &agrave; l&rsquo;air</strong> et ventilation performante.</li>
                        <li><strong>Remplacement du chauffage</strong> par un &eacute;quipement performant (PAC, po&ecirc;le b&ucirc;che, r&eacute;seau de chaleur).</li>
                        <li><strong>Production d&rsquo;&eacute;nergie renouvelable</strong> (PV) en compl&eacute;ment.</li>
                    </ol>
                </div>
            </div>

            <!-- ─── Chapitre II ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>D&eacute;terminer l&rsquo;orientation de la toiture</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Azimut et orientation</h6>
                        <p>L&rsquo;azimut est un angle mesur&eacute; depuis le nord, sens horaire. Sud = 180&deg;, est = 90&deg;, ouest = 270&deg;. En convention PV, l&rsquo;<strong>orientation</strong> = azimut &minus; 180&deg; : 0&deg; au sud, &minus;90&deg; &agrave; l&rsquo;est, +90&deg; &agrave; l&rsquo;ouest.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Outil de r&eacute;f&eacute;rence : <strong>G&eacute;oportail</strong> (<a href="https://www.geoportail.gouv.fr" target="_blank" rel="noopener">geoportail.gouv.fr</a>, IGN). Fonction &laquo; Mesures &rarr; Mesurer l&rsquo;azimut &raquo;.</p>
                    </div>
                    <div class="ms-doc" style="margin-top:12px;">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Mode op&eacute;ratoire &mdash; Mesurer l&rsquo;azimut</div>
                        <img src="assets/images/t7/t7c2_01_azimut_instructions.webp" alt="Instructions : Cliquer sur la cl&eacute; &rarr; Mesures &rarr; Mesurer l&rsquo;azimut" style="width:100%;border-radius:4px;" loading="lazy">
                        <p>Cliquer sur la cl&eacute; &rarr; <strong>Mesures &rarr; Mesurer l&rsquo;azimut</strong>. Tracer un trait perpendiculaire au fa&icirc;tage.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>L&rsquo;orientation du versant de toiture conditionne directement le productible annuel. La m&eacute;thode est simple avec G&eacute;oportail :</p>

                    <ol>
                        <li>Localiser le b&acirc;timent par son adresse.</li>
                        <li>Activer l&rsquo;outil <strong>Mesures &rarr; Mesurer l&rsquo;azimut</strong>.</li>
                        <li>Tracer un trait <strong>perpendiculaire au fa&icirc;tage</strong>, dans la direction vers laquelle le versant regarde. L&rsquo;outil retourne l&rsquo;azimut en degr&eacute;s.</li>
                    </ol>

                    <div class="ms-doc no-frame" style="clear:none;margin-top:12px;float:left;width:calc(100% - 280px);margin-right:16px;">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Exemple de mesure d&rsquo;azimut sur vue a&eacute;rienne</div>
                        <div style="border:1px solid #E2E8F0;background:#FAFBFC;border-radius:6px;padding:14px 18px;">
                            <img src="assets/images/t7/t7c2_02_azimut_geoportail.webp" alt="Capture G&eacute;oportail montrant un trait bleu sur une toiture avec mesure 288,33&deg;" style="width:100%;border-radius:4px;" loading="lazy">
                            <p style="margin-top:8px;">Le trait bleu est trac&eacute; perpendiculairement au fa&icirc;tage : l&rsquo;outil retourne l&rsquo;azimut en degr&eacute;s.</p>
                        </div>
                    </div>

                    <div class="ms-doc" style="clear:both;">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 3</span>Pertes annuelles par orientation</div>
                        <table>
                            <thead><tr><th>Orientation</th><th>Perte annuelle de productible</th></tr></thead>
                            <tbody>
                                <tr><td>Sud (180&deg;)</td><td><strong>0 %</strong> (r&eacute;f&eacute;rence)</td></tr>
                                <tr><td>Sud-Est / Sud-Ouest (&plusmn;45&deg;)</td><td>&minus;3 &agrave; &minus;5 %</td></tr>
                                <tr><td>Est / Ouest pur (&plusmn;90&deg;)</td><td><span class="ms-hl">&minus;15 &agrave; &minus;20 %</span></td></tr>
                                <tr><td>Nord-Est / Nord-Ouest</td><td>&minus;30 &agrave; &minus;40 %</td></tr>
                                <tr><td>Nord pur</td><td><span class="ms-hl">&minus;50 &agrave; &minus;60 %</span></td></tr>
                            </tbody>
                        </table>
                        <p>Une orientation <strong>est ou ouest</strong> reste &eacute;conomiquement viable. Une orientation <strong>nord</strong> est rarement pertinente, sauf toiture plate o&ugrave; l&rsquo;azimut importe peu gr&acirc;ce aux ch&acirc;ssis orient&eacute;s.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre III ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>Inclinaison et surface utile</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Inclinaison optimale en France m&eacute;tropolitaine : <span class="ms-hl">30 &agrave; 35&deg;</span>. La plage 20-45&deg; engendre moins de 3 % de pertes.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Tuiles canal du Sud-Est : 20-25&deg;. Ardoise bretonne : 40-45&deg;. Toiture plate : 0&deg; (ch&acirc;ssis inclin&eacute;s &agrave; 10&deg;).</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Inclinaison</h5>
                    <p>L&rsquo;inclinaison optimale est l&eacute;g&egrave;rement inf&eacute;rieure &agrave; la latitude du site. Elle se d&eacute;termine par la vue 3D de Google Maps, la connaissance architecturale r&eacute;gionale ou un inclinomètre.</p>

                    <div class="ms-doc no-frame" style="clear:none;margin-top:12px;float:left;width:calc(100% - 280px);margin-right:16px;">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 4</span>Inclinaison du versant et angle de r&eacute;ception du rayonnement</div>
                        <div style="border:1px solid #E2E8F0;background:#FAFBFC;border-radius:6px;padding:14px 18px;">
                            <img src="assets/images/t7/t7c2_03_inclinaison.webp" alt="Sch&eacute;ma : inclinaisons 0&deg;, 30&deg;, 60&deg;, 90&deg;" style="width:100%;border-radius:4px;" loading="lazy">
                            <p style="margin-top:8px;">L&rsquo;inclinaison optimale en France se situe entre <span class="ms-hl">30 et 35&deg;</span>. La plage 20-45&deg; n&rsquo;engendre que des pertes marginales (&lt; 3 %).</p>
                        </div>
                    </div>

                    <div class="ms-doc" style="clear:both;">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 5</span>Pertes annuelles par inclinaison (orientation sud)</div>
                        <table>
                            <thead><tr><th>Inclinaison</th><th>Perte annuelle</th></tr></thead>
                            <tbody>
                                <tr><td>0&deg; (plate)</td><td>&minus;10 &agrave; &minus;15 %</td></tr>
                                <tr><td>10&deg;</td><td>&minus;5 &agrave; &minus;8 %</td></tr>
                                <tr><td>20&deg; &agrave; 45&deg;</td><td>&lt; 3 % (plage optimale)</td></tr>
                                <tr><td>60&deg;</td><td>&minus;8 &agrave; &minus;12 %</td></tr>
                                <tr><td>90&deg; (vertical)</td><td><span class="ms-hl">&minus;30 &agrave; &minus;40 %</span></td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start;margin-top:18px;">
                        <div class="ms-doc" style="clear:none;margin-top:0;flex:0 0 380px;max-width:380px;">
                            <div class="ms-doc-head"><span class="ms-doc-num">Doc. 6</span>Mesure de la surface utile sur G&eacute;oportail</div>
                            <img src="assets/images/t7/t7c2_04_mesure_surface.webp" alt="Capture G&eacute;oportail montrant la mesure d&rsquo;une surface de toiture par polygone" style="width:100%;border-radius:4px;" loading="lazy">
                        </div>
                        <div style="flex:1;min-width:200px;">
                            <h5>Surface &eacute;quipable</h5>
                            <p>Sur G&eacute;oportail, utiliser l&rsquo;outil <strong>Mesurer une surface</strong>. S&eacute;lectionner la surface <strong>nette exploitable</strong>, c&rsquo;est-&agrave;-dire sans les chemin&eacute;es, gaines, lanterneaux, fen&ecirc;tres de toit, acrot&egrave;res ni zones ombr&eacute;es. Sur toiture inclin&eacute;e, laisser <strong>30 &agrave; 50 cm de marge</strong> par rapport aux bords. Sur toiture plate, pr&eacute;voir des all&eacute;es de circulation. Ces marges r&eacute;duisent la surface utile de <span class="ms-hl">10 &agrave; 20 %</span>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre IV ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>Puissance installable et productible annuel</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Toiture inclin&eacute;e : <strong>0,175 kWc/m&sup2;</strong>. Toiture plate : <strong>0,10 kWc/m&sup2;</strong>. Exemple : 30 m&sup2; inclin&eacute;s = <span class="ms-hl">5,25 kWc</span>.</p>
                    </div>
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Productible sp&eacute;cifique</h6>
                        <p>Production annuelle par kWc install&eacute;, en conditions r&eacute;elles de site. Exprim&eacute; en <strong>kWh/kWc/an</strong>.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Conversion surface &rarr; puissance</h5>
                    <p>Pour obtenir la puissance installable en kWc &agrave; partir de la surface utile de toiture :</p>

                    <div style="display:flex;flex-wrap:wrap;gap:14px;margin:12px 0 18px;">
                        <div style="flex:1;min-width:220px;background:#F1F5F9;border-left:4px solid #00A88A;border-radius:0 6px 6px 0;padding:12px 16px;">
                            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748B;margin-bottom:6px;">Toiture inclin&eacute;e</div>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:13px;color:#334155;font-weight:600;">Puissance</span>
                                <span style="font-size:13px;color:#64748B;">=</span>
                                <span style="font-size:13px;color:#334155;font-weight:600;">Surface</span>
                                <span style="font-size:13px;color:#64748B;">&times;</span>
                                <span style="background:#fff;border:2px solid #00A88A;border-radius:4px;padding:4px 12px;font-size:18px;font-weight:800;color:#1E293B;">0,175</span>
                            </div>
                            <div style="font-size:11px;color:#94A3B8;margin-top:6px;">kWc = m&sup2; &times; 0,175</div>
                        </div>
                        <div style="flex:1;min-width:220px;background:#F1F5F9;border-left:4px solid #059669;border-radius:0 6px 6px 0;padding:12px 16px;">
                            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748B;margin-bottom:6px;">Toiture plate (ch&acirc;ssis 10&deg;)</div>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:13px;color:#334155;font-weight:600;">Puissance</span>
                                <span style="font-size:13px;color:#64748B;">=</span>
                                <span style="font-size:13px;color:#334155;font-weight:600;">Surface</span>
                                <span style="font-size:13px;color:#64748B;">&times;</span>
                                <span style="background:#fff;border:2px solid #059669;border-radius:4px;padding:4px 12px;font-size:18px;font-weight:800;color:#1E293B;">0,10</span>
                            </div>
                            <div style="font-size:11px;color:#94A3B8;margin-top:6px;">kWc = m&sup2; &times; 0,10 (espacement inter-rang&eacute;es)</div>
                        </div>
                    </div>

                    <div style="display:flex;flex-wrap:wrap;gap:12px;margin:0 0 16px;">
                        <div style="flex:1;min-width:220px;background:#F8FAFC;border-radius:6px;padding:10px 14px;font-size:12.5px;color:#475569;line-height:1.65;">
                            <strong style="color:#00A88A;">Toiture inclin&eacute;e</strong> &mdash; la totalit&eacute; de la surface est recouverte de panneaux. Le coefficient provient du fait qu&rsquo;un panneau standard de <span class="ms-hl">1,6 m&sup2;</span> d&eacute;livre <span class="ms-hl">400 Wc</span>, soit 400 / 1&thinsp;600 &asymp; <strong>0,175 kWc/m&sup2;</strong> (rendement surfacique effectif de la couverture).
                        </div>
                        <div style="flex:1;min-width:220px;background:#F8FAFC;border-radius:6px;padding:10px 14px;font-size:12.5px;color:#475569;line-height:1.65;">
                            <strong style="color:#059669;">Toiture plate</strong> &mdash; les panneaux sont pos&eacute;s sur ch&acirc;ssis inclin&eacute;s &agrave; ~10&deg; pour capter davantage de rayonnement. L&rsquo;espacement n&eacute;cessaire entre rang&eacute;es (pour &eacute;viter les ombres port&eacute;es) r&eacute;duit le taux de couverture &agrave; <strong>0,10 kWc/m&sup2;</strong>.
                        </div>
                    </div>

                    <p style="font-size:13px;color:#475569;line-height:1.7;"><strong>Exemple</strong> : 30 m&sup2; utiles sur toiture inclin&eacute;e &rarr; 30 &times; 0,175 = <span class="ms-hl">5,25 kWc</span>. M&ecirc;me surface sur toiture plate &rarr; 30 &times; 0,10 = <strong>3 kWc</strong>.</p>

                    <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start;margin-top:18px;">
                        <div class="ms-doc" style="clear:none;margin-top:0;flex:0 0 280px;max-width:280px;">
                            <div class="ms-doc-head"><span class="ms-doc-num">Doc. 7</span>Ensoleillement annuel en France m&eacute;tropolitaine</div>
                            <img src="assets/images/t7/t7c2_05_ensoleillement_france.webp" alt="Carte de l&rsquo;ensoleillement annuel en France" style="width:100%;border-radius:4px;" loading="lazy">
                        </div>
                        <div style="flex:1;min-width:200px;">
                            <h5>Productible annuel</h5>
                            <p>Le productible se calcule avec des outils publics : <strong>PVGIS</strong> (Commission europ&eacute;enne), <strong>evaluer-mon-devis.photovoltaique.info</strong>, ou les <strong>cadastres solaires locaux</strong> (M&eacute;tropole de Lyon, COR, Ouest Lyonnais, CAVBS).</p>
                        </div>
                    </div>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 8</span>Productible sp&eacute;cifique par zone g&eacute;ographique (sud, 30&deg;)</div>
                        <table>
                            <thead><tr><th>Zone</th><th>Productible (kWh/kWc/an)</th></tr></thead>
                            <tbody>
                                <tr><td>Nord-Est (Lille, Strasbourg)</td><td>950 &agrave; 1 050</td></tr>
                                <tr><td>Centre (Paris, Lyon, Nantes)</td><td><span class="ms-hl">1 050 &agrave; 1 200</span></td></tr>
                                <tr><td>Sud-Ouest (Bordeaux, Toulouse)</td><td>1 200 &agrave; 1 300</td></tr>
                                <tr><td>M&eacute;diterran&eacute;e (Marseille, Montpellier)</td><td><span class="ms-hl">1 300 &agrave; 1 450</span></td></tr>
                            </tbody>
                        </table>
                        <p>Exemple Lyon, 5 kWc plein sud 30&deg; : productible ~1 150 kWh/kWc/an, soit une production annuelle d&rsquo;environ <strong>5 750 kWh/an</strong>.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre V ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Rentabilit&eacute; : ordre de grandeur</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">&Eacute;conomie</div>
                        <p>Installation 6 kWc en AuRA, autoconsommation simple + surplus : &eacute;conomie annuelle ~<span class="ms-hl">980 &euro;/an</span>. Temps de retour brut ~13 ans.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Avec autoconsommation pilot&eacute;e &agrave; 50 % (chauffe-eau, VE), le temps de retour chute &agrave; <span class="ms-hl">9-11 ans</span>.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>La rentabilit&eacute; d&eacute;pend de quatre variables : <strong>co&ucirc;t d&rsquo;investissement</strong>, <strong>production annuelle</strong>, <strong>valorisation du kWh produit</strong> et <strong>dur&eacute;e de vie</strong>.</p>

                    <div class="ms-doc no-frame" style="clear:none;margin-top:12px;float:left;width:calc(100% - 280px);margin-right:16px;">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 9</span>Co&ucirc;t d&rsquo;investissement install&eacute; TTC (TVA 10 %, 2024-2025)</div>
                        <div style="border:1px solid #E2E8F0;background:#FAFBFC;border-radius:6px;padding:14px 18px;overflow-x:auto;">
                        <table>
                            <thead><tr><th>Puissance</th><th>Co&ucirc;t install&eacute; TTC</th><th>Co&ucirc;t unitaire</th></tr></thead>
                            <tbody>
                                <tr><td>3 kWc</td><td>8 000 &agrave; 10 000 &euro;</td><td>2 700 &agrave; 3 300 &euro;/kWc</td></tr>
                                <tr><td>6 kWc</td><td>13 000 &agrave; 16 000 &euro;</td><td><span class="ms-hl">2 200 &agrave; 2 700 &euro;/kWc</span></td></tr>
                                <tr><td>9 kWc</td><td>17 000 &agrave; 21 000 &euro;</td><td>1 900 &agrave; 2 300 &euro;/kWc</td></tr>
                                <tr><td>36 kWc (petit tertiaire)</td><td>45 000 &agrave; 60 000 &euro;</td><td>1 250 &agrave; 1 700 &euro;/kWc</td></tr>
                            </tbody>
                        </table>
                        </div>
                    </div>

                    <h5 style="clear:both;">Valorisation du kWh</h5>
                    <p>Le kWh <strong>autoconsom&eacute;</strong> est valoris&eacute; au prix d&rsquo;achat au fournisseur, soit environ <strong>0,20 &agrave; 0,27 &euro;/kWh</strong> TTC en 2025. Le kWh <strong>inject&eacute;</strong> (surplus) est vendu au tarif d&rsquo;obligation d&rsquo;achat CRE, soit environ <strong>0,10 &agrave; 0,13 &euro;/kWh</strong> pour les installations &lt; 9 kWc. La <strong>prime &agrave; l&rsquo;autoconsommation</strong>, vers&eacute;e sur 5 ans, repr&eacute;sente 80 &agrave; 220 &euro;/kWc selon la puissance.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Exemple</span>Installation 6 kWc en Auvergne-Rh&ocirc;ne-Alpes</div>
                        <table>
                            <thead><tr><th>Poste</th><th>Valeur</th></tr></thead>
                            <tbody>
                                <tr><td>Co&ucirc;t</td><td>~14 000 &euro;</td></tr>
                                <tr><td>Prime autoconsommation</td><td>~1 200 &euro;</td></tr>
                                <tr><td>Production annuelle</td><td>~6 500 kWh/an</td></tr>
                                <tr><td>Autoconsommation naturelle (30 %)</td><td>~2 000 kWh &times; 0,22 &euro; = 440 &euro;/an</td></tr>
                                <tr><td>Surplus vendu (70 %)</td><td>~4 500 kWh &times; 0,12 &euro; = 540 &euro;/an</td></tr>
                                <tr><td><strong>&Eacute;conomie annuelle totale</strong></td><td><strong>~980 &euro;/an</strong></td></tr>
                                <tr><td><strong>Temps de retour brut</strong></td><td><strong>(14 000 &minus; 1 200) / 980 &asymp; 13 ans</strong></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre VI ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">VI. </span>Points de vigilance avant d&rsquo;engager</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>D&eacute;marchage abusif</h6>
                        <p>Ne jamais signer en pr&eacute;sence d&rsquo;un commercial le jour m&ecirc;me. Faire valider les devis par un <strong>conseiller France R&eacute;nov&rsquo;</strong> ind&eacute;pendant.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Avant de signer un devis, huit v&eacute;rifications incontournables :</p>
                    <ol>
                        <li><strong>Isolation de la toiture</strong> : profiter de l&rsquo;intervention pour isoler si ce n&rsquo;est pas d&eacute;j&agrave; fait.</li>
                        <li><strong>&Eacute;tat de la couverture</strong> : si la toiture a plus de 20 ans, refaire l&rsquo;&eacute;tanch&eacute;it&eacute; avant. D&eacute;monter puis remonter des panneaux co&ucirc;te cher.</li>
                        <li><strong>Ombrages</strong> : arbres, chemin&eacute;es, b&acirc;timents adjacents. Les mesurer &agrave; diff&eacute;rentes saisons.</li>
                        <li><strong>Structure de charpente</strong> : capacit&eacute; &agrave; supporter le poids suppl&eacute;mentaire (~15 &agrave; 20 kg/m&sup2;).</li>
                        <li><strong>Contraintes urbanistiques</strong> : monument historique, PLU, ABF dans un rayon de 500 m autour d&rsquo;un MH. Consulter la mairie et le CAUE.</li>
                        <li><strong>Raccordement Enedis</strong> : d&eacute;lai 3 &agrave; 6 mois, co&ucirc;t jusqu&rsquo;&agrave; ~1 500 &euro;.</li>
                        <li><strong>Devis multiples</strong> : comparer <strong>au moins 3 devis</strong> d&rsquo;installateurs RGE QualiPV.</li>
                        <li><strong>Assurance</strong> : v&eacute;rifier la couverture d&eacute;cennale sp&eacute;cifique PV et d&eacute;clarer &agrave; l&rsquo;assurance habitation.</li>
                    </ol>
                </div>
            </div>

            <!-- ─── Synthèse ─── -->
            <div class="ms-retiens bp-section">
                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                <h4>Les points essentiels du chapitre</h4>
                <ul>
                    <li>Le PV s&rsquo;inscrit <strong>apr&egrave;s</strong> l&rsquo;isolation et un chauffage performant dans la s&eacute;quence de r&eacute;novation.</li>
                    <li><strong>G&eacute;oportail</strong> suffit pour estimer gratuitement l&rsquo;orientation, l&rsquo;inclinaison et la surface utile d&rsquo;une toiture.</li>
                    <li>Conversion surface &rarr; puissance : <strong>0,175 kWc/m&sup2;</strong> (toiture inclin&eacute;e), <strong>0,10 kWc/m&sup2;</strong> (toiture plate).</li>
                    <li>Le productible sp&eacute;cifique varie de <strong>950</strong> (Nord-Est) &agrave; <strong>1 450 kWh/kWc/an</strong> (M&eacute;diterran&eacute;e).</li>
                    <li>Une installation <strong>6 kWc en AuRA</strong> co&ucirc;te 13-16 k&euro;, produit ~6 500 kWh/an et rentabilise en ~<strong>13 ans</strong> (autoconsommation simple) ou <strong>9-11 ans</strong> (pilot&eacute;e).</li>
                    <li>Toujours <strong>3 devis RGE QualiPV</strong>, v&eacute;rifier l&rsquo;&eacute;tat de couverture et les contraintes urbanistiques avant tout engagement.</li>
                </ul>
            </div>

            <div class="ms-vocab bp-section">
                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                <dl>
                    <dt>Azimut</dt><dd>Angle mesur&eacute; depuis le nord dans le sens horaire. Sud = 180&deg;.</dd>
                    <dt>Productible sp&eacute;cifique</dt><dd>Production annuelle par kWc install&eacute;, en kWh/kWc/an.</dd>
                    <dt>PVGIS</dt><dd>Outil gratuit de la Commission europ&eacute;enne pour estimer la production photovolta&iuml;que.</dd>
                    <dt>Cadastre solaire</dt><dd>Carte pr&eacute;calculant le potentiel solaire de chaque toiture d&rsquo;un territoire.</dd>
                    <dt>Obligation d&rsquo;achat</dt><dd>Contrat par lequel EDF OA ach&egrave;te l&rsquo;&eacute;lectricit&eacute; inject&eacute;e &agrave; un tarif fix&eacute; par la CRE pour 20 ans.</dd>
                    <dt>Prime &agrave; l&rsquo;autoconsommation</dt><dd>Aide vers&eacute;e sur 5 ans aux installations en autoconsommation avec injection du surplus.</dd>
                    <dt>ABF</dt><dd>Architecte des B&acirc;timents de France, consultation obligatoire aux abords d&rsquo;un monument historique.</dd>
                </dl>
            </div>

            <div class="ms-sources bp-section">
                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>&Eacute;valuation d&rsquo;opportunit&eacute; PV d&rsquo;une toiture</em> (2022-2024) &middot; G&eacute;oportail IGN &middot; PVGIS (Commission europ&eacute;enne) &middot; photovoltaique.info &middot; Cadastres solaires : Grand Lyon, COR, Ouest Lyonnais, CAVBS &middot; CRE, <em>Arr&ecirc;t&eacute;s tarifaires PV</em> &middot; ADEME, <em>Avis d&rsquo;expert PV r&eacute;sidentiel</em>.
            </div>

        </div>
        <div class="bp-card-footer">
            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / CRE / IGN</span>
            <span>Fiche 2 / 6 &mdash; Avril 2026</span>
        </div>
    </div>
</div>

<div class="bp-fiche" data-theme="solaire-pv" id="bpFicheT8C3">
    <div class="bp-card ms-card">
        <div class="bp-card-header">
            <div class="ms-banner">
                <div class="ms-banner-num">
                    <small>Chapitre</small>
                    <strong>C.3</strong>
                </div>
                <div class="ms-banner-text">
                    <div class="ms-banner-eyebrow">Th&egrave;me 8 &mdash; Solaire photovolta&iuml;que &middot; Fiche 3 / 6</div>
                    <h3 class="ms-banner-title">Autoconsommation, revente, int&eacute;gration au r&eacute;seau</h3>
                    <div class="ms-banner-sub">Mod&egrave;les &eacute;conomiques, d&eacute;marches administratives et fiscalit&eacute;</div>
                </div>
            </div>
        </div>
        <div class="bp-card-content ms-content">

            <p class="ms-lede">Produire de l&rsquo;&eacute;lectricit&eacute; solaire ne suffit pas : il faut d&eacute;cider qu&rsquo;en faire. Vendre la totalit&eacute;, consommer sur place, injecter le surplus &mdash; chaque mod&egrave;le a ses r&egrave;gles tarifaires, ses d&eacute;marches et sa logique &eacute;conomique. Ce chapitre d&eacute;taille les trois options, les leviers pour maximiser l&rsquo;autoconsommation, le parcours administratif complet et les r&egrave;gles fiscales applicables en r&eacute;sidentiel.</p>

            <div class="ms-intro bp-section">
                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                <h4>&Agrave; la fin de cette fiche, l&rsquo;apprenant doit savoir :</h4>
                <ul>
                    <li>distinguer les <strong>trois mod&egrave;les &eacute;conomiques</strong> d&rsquo;une installation PV raccord&eacute;e ;</li>
                    <li>comprendre le <strong>taux d&rsquo;autoconsommation</strong> et les leviers pour l&rsquo;augmenter ;</li>
                    <li>conna&icirc;tre les <strong>d&eacute;marches administratives</strong> de raccordement et de mise en service ;</li>
                    <li>identifier les <strong>r&egrave;gles fiscales et tarifaires</strong> applicables en r&eacute;sidentiel.</li>
                </ul>
            </div>

            <!-- ─── Chapitre I ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>Trois mod&egrave;les &eacute;conomiques</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Taux d&rsquo;autoconsommation vs autoproduction</h6>
                        <p><strong>Taux d&rsquo;autoconsommation</strong> = production autoconsom&eacute;e / production totale. <strong>Taux d&rsquo;autoproduction</strong> = production autoconsom&eacute;e / consommation totale. Un m&eacute;nage peut autoconsommer 100 % de sa production tout en ne couvrant que 20 % de ses besoins.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Une installation PV raccord&eacute;e au r&eacute;seau public fonctionne selon l&rsquo;une de ces trois logiques.</p>

                    <ol>
                        <li><strong>Vente totale</strong> : toute l&rsquo;&eacute;lectricit&eacute; produite est inject&eacute;e et vendue &agrave; un acheteur oblig&eacute; (EDF OA ou ELD) &agrave; un tarif fix&eacute; pour 20 ans. Le producteur ach&egrave;te son &eacute;lectricit&eacute; par ailleurs.</li>
                        <li><strong>Autoconsommation sans revente</strong> : l&rsquo;&eacute;lectricit&eacute; est consom&eacute;e sur place en priorit&eacute;. Le surplus est inject&eacute; gratuitement (don au gestionnaire).</li>
                        <li><strong>Autoconsommation avec vente de surplus</strong> : le mod&egrave;le dominant en r&eacute;sidentiel. L&rsquo;&eacute;lectricit&eacute; est consom&eacute;e en priorit&eacute; ; seul le surplus est vendu au tarif d&rsquo;obligation d&rsquo;achat CRE.</li>
                    </ol>

                    <p>Le mod&egrave;le <strong>autoconsommation + vente de surplus</strong> domine car il combine &eacute;conomies sur la facture, revenu compl&eacute;mentaire et prime &agrave; l&rsquo;investissement.</p>
                </div>
            </div>

            <!-- ─── Chapitre II ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>Le taux d&rsquo;autoconsommation naturel</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Taux d&rsquo;autoconsommation naturel moyen : <span class="ms-hl">25 &agrave; 35 %</span>. Avec pilotage actif (chauffe-eau + VE) : <span class="ms-hl">60 &agrave; 80 %</span>.</p>
                    </div>
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Erreur fr&eacute;quente</div>
                        <h6>Surdimensionnement</h6>
                        <p>Surdimensionner l&rsquo;installation par rapport &agrave; la consommation r&eacute;elle <strong>diminue m&eacute;caniquement</strong> le taux d&rsquo;autoconsommation et donc la rentabilit&eacute;.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Sans pilotage, un foyer standard autoconsomme environ 25 &agrave; 35 % de sa production PV. La production est maximale en milieu de journ&eacute;e, quand beaucoup de foyers sont absents ou consomment peu.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Taux d&rsquo;autoconsommation naturel par profil de foyer</div>
                        <table>
                            <thead><tr><th>Profil de foyer</th><th>Taux d&rsquo;autoconsommation</th></tr></thead>
                            <tbody>
                                <tr><td>Actifs absents en journ&eacute;e, sans pilotage</td><td>15 &agrave; 25 %</td></tr>
                                <tr><td>Famille, pr&eacute;sence partielle</td><td>25 &agrave; 35 %</td></tr>
                                <tr><td>Retrait&eacute;s, t&eacute;l&eacute;travail permanent</td><td>35 &agrave; 50 %</td></tr>
                                <tr><td>Chauffe-eau thermodynamique pilot&eacute; solaire</td><td><span class="ms-hl">50 &agrave; 65 %</span></td></tr>
                                <tr><td>Idem + v&eacute;hicule &eacute;lectrique recharg&eacute; en journ&eacute;e</td><td><span class="ms-hl">60 &agrave; 80 %</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre III ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>Les leviers pour augmenter l&rsquo;autoconsommation</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Un ballon thermodynamique de 250 L peut absorber <strong>2 &agrave; 4 kWh/jour</strong> de surplus solaire. C&rsquo;est le levier le plus rentable avant la batterie.</p>
                    </div>
                    <div class="ms-box">
                        <div class="ms-box-label">Notion cl&eacute;</div>
                        <h6>Routeur solaire</h6>
                        <p>Bo&icirc;tier domotique (MyLight, Ecojoko, Cozytouch, openEVSE) qui dirige automatiquement le surplus vers les charges pilotables selon un ordre de priorit&eacute;.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Avant d&rsquo;investir dans une batterie, plusieurs leviers simples et peu co&ucirc;teux permettent d&rsquo;augmenter le taux d&rsquo;autoconsommation.</p>

                    <ol>
                        <li><strong>Chauffe-eau pilot&eacute;</strong> : d&eacute;clencher la chauffe entre 11 h et 15 h, p&eacute;riode de production maximale.</li>
                        <li><strong>Programmation de l&rsquo;&eacute;lectrom&eacute;nager</strong> : lave-linge, lave-vaisselle, s&egrave;che-linge sur minuterie en milieu de journ&eacute;e.</li>
                        <li><strong>V&eacute;hicule &eacute;lectrique recharg&eacute; en journ&eacute;e</strong> : borne pilotable en exc&eacute;dent solaire.</li>
                        <li><strong>Pompe de piscine</strong> : bascule des cycles de filtration sur les heures solaires.</li>
                        <li><strong>Pilotage domotique</strong> : routeurs solaires pour une gestion automatique des priorit&eacute;s.</li>
                        <li><strong>Batterie stationnaire</strong> : dernier levier, en dernier recours &mdash; doublement du co&ucirc;t rarement compens&eacute; par le gain.</li>
                    </ol>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">M&eacute;thode</span>Hi&eacute;rarchie des investissements</div>
                        <p><strong>1)</strong> Dimensionner au plus pr&egrave;s des besoins r&eacute;els. <strong>2)</strong> Piloter le chauffe-eau et l&rsquo;&eacute;lectrom&eacute;nager en d&eacute;clenchement solaire. <strong>3)</strong> Ajouter un VE avec charge pilot&eacute;e si le profil s&rsquo;y pr&ecirc;te. <strong>4)</strong> Envisager la batterie seulement quand les leviers pr&eacute;c&eacute;dents sont satur&eacute;s.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre IV ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>Les d&eacute;marches administratives</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>D&eacute;lais</h6>
                        <p>Cycle complet DP &rarr; raccordement &rarr; mise en service : <span class="ms-hl">3 &agrave; 6 mois</span> en r&eacute;sidentiel, 6 &agrave; 12 mois en tertiaire (&gt; 36 kVA).</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Avant travaux</h5>
                    <p><strong>D&eacute;claration pr&eacute;alable de travaux (DP)</strong> en mairie : d&eacute;lai d&rsquo;instruction 1 mois, 2 mois si ABF. <strong>Consultation du PLU</strong> pour les r&egrave;gles d&rsquo;aspect. Signature d&rsquo;un contrat avec un installateur <strong>RGE QualiPV</strong>, condition imp&eacute;rative pour la prime et l&rsquo;obligation d&rsquo;achat.</p>

                    <h5>Raccordement Enedis</h5>
                    <p>Demande sur connect-racco.enedis.fr ou via l&rsquo;installateur. Proposition de raccordement (devis Enedis) retourn&eacute;e sous 6 &agrave; 8 semaines. Co&ucirc;t : <strong>0 &agrave; ~1 500 &euro;</strong> pour une maison individuelle. Deux types de conventions : <strong>CAE</strong> (sans vente) ou <strong>CRAE</strong> (avec vente de surplus).</p>

                    <h5>Mise en service</h5>
                    <ol>
                        <li><strong>Attestation Consuel</strong> : visite obligatoire de l&rsquo;installation &eacute;lectrique (~180 &euro; TTC).</li>
                        <li><strong>Mise en service Enedis</strong> : activation du compteur Linky en mode production.</li>
                        <li><strong>Contrat EDF OA</strong> (ou ELD) : obligation d&rsquo;achat pour 20 ans, tarif <strong>fig&eacute; &agrave; la date de d&eacute;p&ocirc;t</strong> de la demande compl&egrave;te.</li>
                    </ol>
                </div>
            </div>

            <!-- ─── Chapitre V ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Tarifs et prime &agrave; l&rsquo;autoconsommation</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Le prix de l&rsquo;&eacute;lectricit&eacute; au d&eacute;tail a augment&eacute; de <span class="ms-hl">+50 %</span> entre 2021 et 2024, rendant l&rsquo;autoconsommation directe de plus en plus rentable.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>La <strong>CRE</strong> publie chaque trimestre les tarifs d&rsquo;obligation d&rsquo;achat et le montant de la prime. Les valeurs sont <strong>fig&eacute;es &agrave; la date de d&eacute;p&ocirc;t</strong> de la demande compl&egrave;te et restent valables 20 ans.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Tarifs et primes 2024-2025 (autoconsommation + surplus)</div>
                        <table>
                            <thead><tr><th>Puissance</th><th>Tarif de surplus</th><th>Prime autoconso (sur 5 ans)</th></tr></thead>
                            <tbody>
                                <tr><td>&le; 3 kWc</td><td>~0,12-0,13 &euro;/kWh</td><td>~220 &euro;/kWc</td></tr>
                                <tr><td>3 &agrave; 9 kWc</td><td><span class="ms-hl">~0,10-0,12 &euro;/kWh</span></td><td>~160 &euro;/kWc</td></tr>
                                <tr><td>9 &agrave; 36 kWc</td><td>~0,06-0,08 &euro;/kWh</td><td>~190 &euro;/kWc</td></tr>
                                <tr><td>36 &agrave; 100 kWc</td><td>~0,06-0,07 &euro;/kWh</td><td>~100 &euro;/kWc</td></tr>
                            </tbody>
                        </table>
                        <p>En <strong>vente totale</strong>, le tarif est plus &eacute;lev&eacute; (~0,17-0,20 &euro;/kWh pour &lt; 9 kWc) mais sans prime &agrave; l&rsquo;autoconsommation. Ce mod&egrave;le redevient comp&eacute;titif quand le m&eacute;nage consomme tr&egrave;s peu en journ&eacute;e.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre VI ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">VI. </span>Fiscalit&eacute; et int&eacute;gration au r&eacute;seau</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Pour &le; 9 kWc en autoconsommation + surplus, la fiscalit&eacute; est simple : TVA r&eacute;duite, exon&eacute;ration d&rsquo;imp&ocirc;t sur les revenus (&le; 3 kWc), pas de taxes compl&eacute;mentaires.</p>
                    </div>
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Op&eacute;ration d&rsquo;autoconsommation collective (OAC)</h6>
                        <p>Mutualisation d&rsquo;une production PV entre plusieurs producteurs et consommateurs &agrave; l&rsquo;&eacute;chelle d&rsquo;un quartier. Rayon : 2 km (20 km en zone rurale). Cadre l&eacute;gal depuis 2017.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Fiscalit&eacute; r&eacute;sidentielle</h5>
                    <ul>
                        <li><strong>TVA</strong> : 10 % pour les installations <strong>&le; 3 kWc</strong> ; 20 % au-del&agrave;. &Eacute;volution annonc&eacute;e &agrave; 5,5 % pour &le; 9 kWc (2025-2026, &agrave; v&eacute;rifier).</li>
                        <li><strong>Imp&ocirc;t sur le revenu</strong> : revenus de surplus <strong>exon&eacute;r&eacute;s</strong> pour les installations &le; 3 kWc. Au-del&agrave;, BIC non professionnels.</li>
                        <li><strong>Taxe fonci&egrave;re</strong> : exon&eacute;ration possible sur d&eacute;lib&eacute;ration de la commune.</li>
                        <li><strong>CSPE / accises</strong> : pas de taxes sur l&rsquo;&eacute;lectricit&eacute; autoconsom&eacute;e.</li>
                    </ul>

                    <h5>Enjeux d&rsquo;int&eacute;gration au r&eacute;seau</h5>
                    <p>Le d&eacute;veloppement du PV distribu&eacute; cr&eacute;e des <strong>inversions de flux</strong> et des surtensions locales. Enedis investit dans le renforcement des postes HTA/BT (co&ucirc;ts socialis&eacute;s via le TURPE). En cas de d&eacute;faut r&eacute;seau, les onduleurs se d&eacute;connectent automatiquement (norme DIN VDE 0126-1-1, UTE C 15-712) : une installation PV <strong>sans batterie ne fonctionne pas</strong> en cas de coupure r&eacute;seau, m&ecirc;me en plein soleil.</p>
                </div>
            </div>

            <!-- ─── Synthèse ─── -->
            <div class="ms-retiens bp-section">
                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                <h4>Les points essentiels du chapitre</h4>
                <ul>
                    <li>Trois mod&egrave;les : <strong>vente totale</strong>, <strong>autoconsommation sans revente</strong>, <strong>autoconsommation avec vente de surplus</strong> (le plus courant).</li>
                    <li>Le taux d&rsquo;autoconsommation naturel est de <strong>25-35 %</strong> ; il monte &agrave; <strong>50-80 %</strong> avec pilotage actif (chauffe-eau, VE, &eacute;lectrom&eacute;nager).</li>
                    <li>Avant la batterie, activer tous les <strong>leviers de pilotage</strong> : meilleur rapport gain/co&ucirc;t.</li>
                    <li>D&eacute;marches : <strong>DP &rarr; raccordement Enedis &rarr; Consuel &rarr; mise en service &rarr; contrat EDF OA</strong>. Dur&eacute;e : 3-6 mois.</li>
                    <li>Les tarifs CRE sont r&eacute;vis&eacute;s trimestriellement et <strong>fig&eacute;s 20 ans</strong> &agrave; la date de d&eacute;p&ocirc;t du dossier complet.</li>
                    <li>Une installation PV <strong>sans batterie ne fonctionne pas</strong> en cas de coupure r&eacute;seau (protection de d&eacute;couplage).</li>
                </ul>
            </div>

            <div class="ms-vocab bp-section">
                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                <dl>
                    <dt>Taux d&rsquo;autoconsommation</dt><dd>Part de la production PV r&eacute;ellement consom&eacute;e sur place (production autoconsom&eacute;e / production totale).</dd>
                    <dt>Taux d&rsquo;autoproduction</dt><dd>Part de la consommation du foyer couverte par le PV (production autoconsom&eacute;e / consommation totale).</dd>
                    <dt>EDF OA</dt><dd>EDF Obligation d&rsquo;Achat, entit&eacute; qui ach&egrave;te l&rsquo;&eacute;lectricit&eacute; PV inject&eacute;e au tarif r&eacute;glement&eacute;.</dd>
                    <dt>CRE</dt><dd>Commission de r&eacute;gulation de l&rsquo;&eacute;nergie, fixe les tarifs d&rsquo;obligation d&rsquo;achat chaque trimestre.</dd>
                    <dt>Consuel</dt><dd>Organisme de contr&ocirc;le de conformit&eacute; des installations &eacute;lectriques, visite obligatoire avant mise en service.</dd>
                    <dt>CRAE</dt><dd>Convention de raccordement, d&rsquo;acc&egrave;s et d&rsquo;exploitation, sign&eacute;e avec Enedis pour les installations avec vente.</dd>
                    <dt>Routeur solaire</dt><dd>Bo&icirc;tier domotique dirigeant le surplus PV vers les charges pilotables par ordre de priorit&eacute;.</dd>
                    <dt>OAC</dt><dd>Op&eacute;ration d&rsquo;autoconsommation collective : mutualisation de la production PV entre voisins (rayon 2-20 km).</dd>
                </dl>
            </div>

            <div class="ms-sources bp-section">
                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>Fiches PV autoconsommation</em> (2022-2024) &middot; CRE, <em>Arr&ecirc;t&eacute;s tarifaires PV</em> &middot; photovoltaique.info &middot; Enedis, <em>Guide raccordement producteurs BT &le; 36 kVA</em> &middot; EDF OA, <em>Conditions g&eacute;n&eacute;rales d&rsquo;achat</em> &middot; ADEME, <em>Autoconsommation PV : guide pratique</em> &middot; Code de l&rsquo;&eacute;nergie, art. L. 315-1 et suivants.
            </div>

        </div>
        <div class="bp-card-footer">
            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / CRE / Enedis / EDF OA</span>
            <span>Fiche 3 / 6 &mdash; Avril 2026</span>
        </div>
    </div>
</div>

<div class="bp-fiche" data-theme="solaire-pv" id="bpFicheT8C4">
    <div class="bp-card ms-card">
        <div class="bp-card-header">
            <div class="ms-banner">
                <div class="ms-banner-num">
                    <small>Chapitre</small>
                    <strong>C.4</strong>
                </div>
                <div class="ms-banner-text">
                    <div class="ms-banner-eyebrow">Th&egrave;me 8 &mdash; Solaire photovolta&iuml;que &middot; Fiche 4 / 6</div>
                    <h3 class="ms-banner-title">PV en copropri&eacute;t&eacute; : montage, gouvernance, d&eacute;marches</h3>
                    <div class="ms-banner-sub">Propri&eacute;t&eacute; partag&eacute;e, d&eacute;cision collective et temps longs</div>
                </div>
            </div>
        </div>
        <div class="bp-card-content ms-content">

            <p class="ms-lede">En maison individuelle, d&eacute;cider d&rsquo;installer du PV rel&egrave;ve d&rsquo;un arbitrage personnel. En copropri&eacute;t&eacute;, tout se complique : propri&eacute;t&eacute; partag&eacute;e de la toiture, vote en assembl&eacute;e g&eacute;n&eacute;rale, r&eacute;partition de la valeur entre copropri&eacute;taires. Ce chapitre d&eacute;taille les trois montages juridiques, les &eacute;tapes d&rsquo;un projet collectif et les points de vigilance propres &agrave; l&rsquo;habitat collectif.</p>

            <div class="ms-intro bp-section">
                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                <h4>&Agrave; la fin de cette fiche, l&rsquo;apprenant doit savoir :</h4>
                <ul>
                    <li>expliquer les <strong>sp&eacute;cificit&eacute;s juridiques</strong> du PV en copropri&eacute;t&eacute; ;</li>
                    <li>distinguer les trois <strong>montages possibles</strong> (parties communes, ACC, tiers-investisseur) ;</li>
                    <li>d&eacute;rouler les <strong>&eacute;tapes</strong> d&rsquo;un projet collectif, du vote en AG &agrave; la mise en service ;</li>
                    <li>anticiper les <strong>points de vigilance</strong> propres &agrave; l&rsquo;habitat collectif.</li>
                </ul>
            </div>

            <!-- ─── Chapitre I ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>Pourquoi la copropri&eacute;t&eacute; est un cas particulier</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>Rotation des copropri&eacute;taires</h6>
                        <p>La dur&eacute;e d&rsquo;amortissement du PV (<span class="ms-hl">10-15 ans</span>) d&eacute;passe la dur&eacute;e moyenne de d&eacute;tention d&rsquo;un lot (8-10 ans). Pr&eacute;voir la cession des droits lors de la revente.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>La toiture est une <strong>partie commune</strong> par nature (article 3, loi du 10 juillet 1965).</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Le PV en copropri&eacute;t&eacute; cumule des difficult&eacute;s absentes en maison individuelle :</p>
                    <ol>
                        <li><strong>Propri&eacute;t&eacute; partag&eacute;e</strong> de la toiture : toute intervention n&eacute;cessite l&rsquo;accord du syndicat des copropri&eacute;taires.</li>
                        <li><strong>D&eacute;cision collective</strong> : vote en assembl&eacute;e g&eacute;n&eacute;rale, avec majorit&eacute; renforc&eacute;e selon le montage.</li>
                        <li><strong>R&eacute;partition de la valeur</strong> : qui b&eacute;n&eacute;ficie de la production ? Tous les copropri&eacute;taires ou seulement ceux qui cofinancent ?</li>
                        <li><strong>Gestion technique</strong> par le syndic, avec des comp&eacute;tences in&eacute;gales selon les cabinets.</li>
                    </ol>
                    <p>R&eacute;sultat : le taux d&rsquo;&eacute;quipement en PV des copropri&eacute;t&eacute;s fran&ccedil;aises reste <strong>nettement inf&eacute;rieur</strong> &agrave; celui des maisons individuelles, malgr&eacute; un gisement de toiture consid&eacute;rable.</p>
                </div>
            </div>

            <!-- ─── Chapitre II ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>Les trois montages juridiques</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>PMO</h6>
                        <p>Personne Morale Organisatrice : structure juridique qui agr&egrave;ge producteurs et consommateurs en ACC. Elle signe la convention Enedis, g&egrave;re la cl&eacute; de r&eacute;partition et reverse les flux financiers. Formes possibles : association loi 1901, coop&eacute;rative, SAS, SCIC.</p>
                    </div>
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Gisement de consommation des parties communes : <span class="ms-hl">5 000 &agrave; 15 000 kWh/an</span> pour une copropri&eacute;t&eacute; de 30 logements.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>PV pour les parties communes uniquement</h5>
                    <p>La copropri&eacute;t&eacute; installe des panneaux pour alimenter les parties communes : ascenseur, &eacute;clairage des circulations, ventilation du parking, chaufferie. L&rsquo;&eacute;lectricit&eacute; produite est autoconsom&eacute;e par le compteur des parties communes ; le surplus est revendu.</p>
                    <p>Le montage est <strong>simple juridiquement</strong> : travaux collectifs classiques, vote en AG &agrave; la majorit&eacute; de l&rsquo;article 24 (majorit&eacute; simple). Mais le gisement de consommation des parties communes est g&eacute;n&eacute;ralement faible, ce qui limite la puissance installable &agrave; <strong>3 &agrave; 9 kWc</strong>.</p>

                    <h5>Autoconsommation collective (ACC)</h5>
                    <p>Depuis la loi du 24 f&eacute;vrier 2017, producteurs et consommateurs li&eacute;s par une PMO peuvent partager l&rsquo;&eacute;lectricit&eacute; produite au sein d&rsquo;un p&eacute;rim&egrave;tre g&eacute;ographique restreint (<span class="ms-hl">2 km</span> en urbain, 20 km en rural, jusqu&rsquo;&agrave; 50 km sur d&eacute;rogation).</p>
                    <p>Les copropri&eacute;taires adh&eacute;rents partagent la production via une <strong>cl&eacute; de r&eacute;partition</strong> (statique ou dynamique). Chaque logement reste reli&eacute; &agrave; son propre fournisseur pour le compl&eacute;ment. Ce montage permet d&rsquo;exploiter un gisement de toiture plus important en couvrant les besoins des logements, pas seulement des parties communes.</p>

                    <h5>Tiers-investissement (bail de toiture)</h5>
                    <p>La copropri&eacute;t&eacute; <strong>loue sa toiture</strong> &agrave; un tiers-investisseur (entreprise sp&eacute;cialis&eacute;e, coop&eacute;rative citoyenne) qui finance, installe et exploite l&rsquo;installation pendant 20 &agrave; 30 ans.</p>
                    <p>Avantage : <strong>aucun investissement</strong> &agrave; la charge des copropri&eacute;taires. Limite : la copropri&eacute;t&eacute; ne b&eacute;n&eacute;ficie pas de l&rsquo;&eacute;lectricit&eacute; produite (vente totale au r&eacute;seau). Le bail peut &ecirc;tre combin&eacute; avec une clause de rachat &agrave; terme.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Comparatif des trois montages</div>
                        <table>
                            <thead><tr><th>Crit&egrave;re</th><th>Parties communes</th><th>ACC</th><th>Tiers-investissement</th></tr></thead>
                            <tbody>
                                <tr><td>Investissement copro</td><td>Oui</td><td>Oui</td><td><strong>Non</strong></td></tr>
                                <tr><td>B&eacute;n&eacute;fice &eacute;lectrique</td><td>Parties communes</td><td>Logements + PC</td><td>Aucun (loyer)</td></tr>
                                <tr><td>Complexit&eacute; juridique</td><td>Faible</td><td><span class="ms-hl">&Eacute;lev&eacute;e</span></td><td>Moyenne</td></tr>
                                <tr><td>Puissance typique</td><td>3-9 kWc</td><td>9-36 kWc</td><td>Variable</td></tr>
                                <tr><td>Majorit&eacute; AG</td><td>Art. 24</td><td>Art. 24 ou 25</td><td>Art. 25 ou 26</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre III ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>Les &eacute;tapes d&rsquo;un projet en copropri&eacute;t&eacute;</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>Dur&eacute;e du projet</h6>
                        <p>Un projet PV en copropri&eacute;t&eacute; dure en moyenne <span class="ms-hl">18 &agrave; 36 mois</span> entre la premi&egrave;re id&eacute;e et la mise en service, contre 3 &agrave; 6 mois en individuel.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Majorit&eacute;s requises : <strong>art. 24</strong> (simple) pour travaux d&rsquo;am&eacute;lioration &eacute;nerg&eacute;tique, <strong>art. 25</strong> (absolue) pour travaux lourds, <strong>art. 26</strong> (qualifi&eacute;e) pour bail emphyt&eacute;otique.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Phase d&rsquo;opportunit&eacute; (3 &agrave; 6 mois)</h5>
                    <ol>
                        <li>Identification du gisement par un <strong>conseil syndical motiv&eacute;</strong> ou un conseiller France R&eacute;nov&rsquo; / ALEC.</li>
                        <li>&Eacute;tude pr&eacute;alable : orientation, inclinaison, surface utile, &eacute;tat de la toiture, ombrages (cf. T8-C2).</li>
                        <li>Pr&eacute;sentation en conseil syndical, puis <strong>r&eacute;union d&rsquo;information</strong> ouverte &agrave; tous les copropri&eacute;taires.</li>
                    </ol>

                    <h5>Phase d&rsquo;&eacute;tude et de votes (6 &agrave; 12 mois)</h5>
                    <ol>
                        <li>Audit technique : devis pr&eacute;liminaires, contraintes urbanistiques, v&eacute;rification de la structure.</li>
                        <li><strong>Premier vote en AG</strong> pour autoriser l&rsquo;&eacute;tude approfondie et engager des honoraires (AMO, BE).</li>
                        <li>Choix du montage (parties communes / ACC / tiers-investisseur).</li>
                        <li>Appel d&rsquo;offres aupr&egrave;s de plusieurs installateurs <strong>RGE QualiPV</strong> ou op&eacute;rateurs ACC.</li>
                        <li><strong>Vote d&eacute;finitif en AG</strong> : autorisation de travaux et de financement.</li>
                    </ol>

                    <h5>Phase travaux et mise en service (3 &agrave; 6 mois)</h5>
                    <ol>
                        <li>D&eacute;p&ocirc;t de la d&eacute;claration pr&eacute;alable en mairie.</li>
                        <li>Demande de raccordement Enedis et, le cas &eacute;ch&eacute;ant, signature de la convention ACC.</li>
                        <li>Travaux, Consuel, mise en service.</li>
                        <li>Pour l&rsquo;ACC : activation de la cl&eacute; de r&eacute;partition, bascule des compteurs Linky, suivi des flux par la PMO.</li>
                    </ol>
                </div>
            </div>

            <!-- ─── Chapitre IV ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>R&eacute;partition de la valeur et financement</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>La cl&eacute; dynamique de r&eacute;partition am&eacute;liore l&rsquo;autoconsommation collective de <span class="ms-hl">10 &agrave; 20 %</span> par rapport &agrave; une cl&eacute; statique.</p>
                    </div>
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Cl&eacute; de r&eacute;partition</h6>
                        <p>R&egrave;gle qui d&eacute;finit comment la production PV est distribu&eacute;e entre les consommateurs d&rsquo;une ACC. <strong>Statique</strong> : fraction fixe (au prorata des tanti&egrave;mes). <strong>Dynamique</strong> : varie selon la consommation instantan&eacute;e de chaque membre.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>Parties communes</h5>
                    <p>Le revenu du PV (&eacute;conomies + vente de surplus + prime) vient en <strong>r&eacute;duction des charges g&eacute;n&eacute;rales</strong>, r&eacute;parties selon les tanti&egrave;mes habituels. Simple &agrave; g&eacute;rer, pas de convention particuli&egrave;re.</p>

                    <h5>ACC &mdash; cl&eacute; de r&eacute;partition</h5>
                    <p>La cl&eacute; statique attribue une fraction fixe &agrave; chaque membre, par exemple au prorata des tanti&egrave;mes. La cl&eacute; dynamique adapte la r&eacute;partition &agrave; la consommation instantan&eacute;e de chaque logement, maximisant l&rsquo;autoconsommation globale. La cl&eacute; dynamique donne de <strong>meilleurs r&eacute;sultats &eacute;conomiques</strong> mais n&eacute;cessite une gestion informatique plus complexe, factur&eacute;e par la PMO ou un op&eacute;rateur tiers.</p>

                    <h5>Financement</h5>
                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Sources de financement mobilisables</div>
                        <table>
                            <thead><tr><th>Source</th><th>D&eacute;tail</th></tr></thead>
                            <tbody>
                                <tr><td>Fonds propres</td><td>Provisions existantes de la copropri&eacute;t&eacute;</td></tr>
                                <tr><td>Emprunt collectif</td><td>&Eacute;co-PTZ copropri&eacute;t&eacute;s, Domofinance, Cr&eacute;dit Mutuel</td></tr>
                                <tr><td>MaPrimeR&eacute;nov&rsquo; Copropri&eacute;t&eacute;s</td><td>Soutien aux travaux &eacute;nerg&eacute;tiques ambitieux (bouquet)</td></tr>
                                <tr><td>Prime autoconsommation CRE</td><td>Vers&eacute;e sur 5 ans, m&ecirc;me logique qu&rsquo;en individuel</td></tr>
                                <tr><td>Aides r&eacute;gionales / d&eacute;partementales</td><td>Variables selon le territoire</td></tr>
                                <tr><td>Financement citoyen</td><td>Enercoop, &Eacute;nergie Partag&eacute;e, coop&eacute;ratives locales</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre V ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Points de vigilance</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>D&eacute;marchage abusif</h6>
                        <p>Les copropri&eacute;t&eacute;s sont cibl&eacute;es par des d&eacute;marchages agressifs (&laquo; bail de toiture gratuit &raquo;). Ne jamais signer en AG sous pression. Consulter un <strong>conseiller France R&eacute;nov&rsquo;</strong> ind&eacute;pendant.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <ol>
                        <li><strong>&Eacute;tat de la couverture</strong> : refaire l&rsquo;&eacute;tanch&eacute;it&eacute; avant l&rsquo;installation si la toiture a plus de 15-20 ans. D&eacute;monter puis reposer des panneaux co&ucirc;te tr&egrave;s cher.</li>
                        <li><strong>Assurance copropri&eacute;t&eacute;</strong> : v&eacute;rifier la couverture d&eacute;cennale sp&eacute;cifique PV et la garantie dommages-ouvrage.</li>
                        <li><strong>Charges &agrave; venir</strong> : provisionner d&egrave;s le d&eacute;part le remplacement des <strong>onduleurs &agrave; mi-vie</strong> (10-15 ans) et les petits entretiens.</li>
                        <li><strong>Monitoring collectif</strong> : installer un syst&egrave;me de supervision accessible au conseil syndical.</li>
                        <li><strong>Sortants et entrants</strong> : pr&eacute;voir contractuellement le sort des copropri&eacute;taires qui vendent leur lot (cession de droits, poursuite de l&rsquo;ACC par l&rsquo;acheteur).</li>
                        <li><strong>Syndic</strong> : s&rsquo;assurer que le syndic a les comp&eacute;tences ou accepte d&rsquo;&ecirc;tre assist&eacute; par un <strong>AMO sp&eacute;cialis&eacute;</strong>. Un syndic peu form&eacute; peut faire &eacute;chouer un projet pourtant vot&eacute;.</li>
                    </ol>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Bonne pratique</span>Combiner PV et r&eacute;novation &eacute;nerg&eacute;tique</div>
                        <p>Le PV gagne &agrave; s&rsquo;int&eacute;grer &agrave; un projet global de r&eacute;novation (ITE, isolation de toiture, changement du chauffage collectif). La copropri&eacute;t&eacute; mobilise alors <strong>MaPrimeR&eacute;nov&rsquo; Copropri&eacute;t&eacute;s</strong> et les aides CEE sur l&rsquo;ensemble du bouquet, et le PV b&eacute;n&eacute;ficie d&rsquo;une toiture r&eacute;nov&eacute;e et &eacute;tanche.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Synthèse ─── -->
            <div class="ms-retiens bp-section">
                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                <h4>Les points essentiels du chapitre</h4>
                <ul>
                    <li>La copropri&eacute;t&eacute; cumule <strong>propri&eacute;t&eacute; partag&eacute;e</strong>, <strong>d&eacute;cision collective</strong> et <strong>temps longs</strong>, rendant le PV plus complexe qu&rsquo;en maison individuelle.</li>
                    <li>Trois montages : <strong>PV parties communes</strong> (simple, gisement limit&eacute;), <strong>ACC</strong> (plus ambitieux, n&eacute;cessite une PMO), <strong>tiers-investissement</strong> (sans investissement mais sans b&eacute;n&eacute;fice &eacute;lectrique).</li>
                    <li>Un projet dure <strong>18-36 mois</strong> : anticiper, communiquer, informer r&eacute;guli&egrave;rement les copropri&eacute;taires.</li>
                    <li>Votes en AG selon l&rsquo;<strong>article 24, 25 ou 26</strong> selon le montage. V&eacute;rifier la majorit&eacute; requise avant de convoquer.</li>
                    <li>Privil&eacute;gier un <strong>syndic comp&eacute;tent</strong> et se faire assister par un <strong>AMO ou op&eacute;rateur ACC sp&eacute;cialis&eacute;</strong>.</li>
                </ul>
            </div>

            <div class="ms-vocab bp-section">
                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                <dl>
                    <dt>PMO</dt><dd>Personne Morale Organisatrice, structure juridique portant une op&eacute;ration d&rsquo;ACC.</dd>
                    <dt>ACC</dt><dd>Autoconsommation collective : partage de production PV entre plusieurs consommateurs via une PMO.</dd>
                    <dt>Cl&eacute; de r&eacute;partition</dt><dd>R&egrave;gle d&rsquo;allocation de la production entre les membres d&rsquo;une ACC (statique ou dynamique).</dd>
                    <dt>Article 24</dt><dd>Majorit&eacute; simple des pr&eacute;sents et repr&eacute;sent&eacute;s en AG de copropri&eacute;t&eacute;.</dd>
                    <dt>Article 25</dt><dd>Majorit&eacute; absolue de tous les copropri&eacute;taires (pr&eacute;sents ou non).</dd>
                    <dt>Article 26</dt><dd>Majorit&eacute; qualifi&eacute;e (2/3 des voix de tous les copropri&eacute;taires).</dd>
                    <dt>Bail de toiture</dt><dd>Contrat par lequel la copropri&eacute;t&eacute; loue sa toiture &agrave; un tiers-investisseur pour une exploitation PV.</dd>
                    <dt>AMO</dt><dd>Assistance &agrave; Ma&icirc;trise d&rsquo;Ouvrage : prestataire qui accompagne la copropri&eacute;t&eacute; dans le pilotage du projet.</dd>
                </dl>
            </div>

            <div class="ms-sources bp-section">
                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>PV en copropri&eacute;t&eacute; : guide pratique</em> &middot; Loi n&deg;65-557 du 10 juillet 1965 &middot; Code de l&rsquo;&eacute;nergie, art. L. 315-2 et s. &middot; Minist&egrave;re de la Transition &eacute;cologique, <em>Guide ACC</em> &middot; Enedis, <em>Guide de mise en &oelig;uvre ACC</em> &middot; ADEME, <em>Le PV en copropri&eacute;t&eacute;</em> &middot; France R&eacute;nov&rsquo; Copropri&eacute;t&eacute;s &middot; &Eacute;nergie Partag&eacute;e.
            </div>

        </div>
        <div class="bp-card-footer">
            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / Enedis / CRE</span>
            <span>Fiche 4 / 6 &mdash; Avril 2026</span>
        </div>
    </div>
</div>

<div class="bp-fiche" data-theme="solaire-pv" id="bpFicheT8C5">
    <div class="bp-card ms-card">
        <div class="bp-card-header">
            <div class="ms-banner">
                <div class="ms-banner-num">
                    <small>Chapitre</small>
                    <strong>C.5</strong>
                </div>
                <div class="ms-banner-text">
                    <div class="ms-banner-eyebrow">Th&egrave;me 8 &mdash; Solaire photovolta&iuml;que &middot; Fiche 5 / 6</div>
                    <h3 class="ms-banner-title">Solaire hybride et a&eacute;rovolta&iuml;que</h3>
                    <div class="ms-banner-sub">PV + thermique sur un m&ecirc;me panneau : promesses, limites et alternatives</div>
                </div>
            </div>
        </div>
        <div class="bp-card-content ms-content">

            <p class="ms-lede">Un panneau photovolta&iuml;que chauffe en fonctionnement : 60 &agrave; 75 &deg;C en &eacute;t&eacute;, soit une perte de rendement de 10 &agrave; 20 %. Les technologies hybrides proposent de r&eacute;cup&eacute;rer cette chaleur pour produire &agrave; la fois de l&rsquo;&eacute;lectricit&eacute; et de la chaleur utile. Ce chapitre passe en revue les trois familles de solutions, leur pertinence r&eacute;elle et les alternatives souvent plus robustes.</p>

            <div class="ms-intro bp-section">
                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                <h4>&Agrave; la fin de cette fiche, l&rsquo;apprenant doit savoir :</h4>
                <ul>
                    <li>distinguer <strong>PV classique</strong>, <strong>solaire thermique</strong>, <strong>hybride PV-T</strong> et <strong>a&eacute;rovolta&iuml;que</strong> ;</li>
                    <li>expliquer le <strong>principe de r&eacute;cup&eacute;ration de chaleur</strong> derri&egrave;re les panneaux ;</li>
                    <li>&eacute;valuer la <strong>pertinence &eacute;conomique et technique</strong> de chaque technologie ;</li>
                    <li>identifier les <strong>points de vigilance</strong> sp&eacute;cifiques (surchauffe, condensation, entretien).</li>
                </ul>
            </div>

            <!-- ─── Chapitre I ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>PV et thermique : deux logiques distinctes</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Solaire thermique</h6>
                        <p>Technologie qui produit de la <strong>chaleur</strong> via un absorbeur noir chauffant un fluide caloporteur, pour l&rsquo;ECS ou le plancher chauffant. Rendement optique : <span class="ms-hl">70-80 %</span>.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Rendement cellule PV : ~20 %. Rendement thermique : ~70-80 %. Les deux exploitent le m&ecirc;me rayonnement mais pour des usages diff&eacute;rents.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Le <strong>photovolta&iuml;que</strong> produit de l&rsquo;&eacute;lectricit&eacute; via l&rsquo;effet photo&eacute;lectrique sur un semi-conducteur (cf. T8-C1). Le <strong>solaire thermique</strong> produit de la chaleur via un absorbeur noir qui chauffe un fluide caloporteur, g&eacute;n&eacute;ralement utilis&eacute; pour l&rsquo;eau chaude sanitaire (ECS) ou le plancher chauffant.</p>
                    <p>Les modules hybrides cherchent &agrave; <strong>combiner les deux productions</strong> sur une m&ecirc;me surface, en exploitant le fait qu&rsquo;un panneau PV chauffe en fonctionnement et que cette chaleur, aujourd&rsquo;hui perdue, pourrait &ecirc;tre valoris&eacute;e.</p>
                </div>
            </div>

            <!-- ─── Chapitre II ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>Refroidir le PV augmente son rendement</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box cle">
                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                        <p>Coefficient de temp&eacute;rature des cellules PV : <span class="ms-hl">&minus;0,3 &agrave; &minus;0,4 %/&deg;C</span> au-del&agrave; de 25 &deg;C.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Un PV refroidi de 60 &agrave; 25 &deg;C gagne ~10-15 % de rendement instantan&eacute;. Sur l&rsquo;ann&eacute;e : <strong>3-7 %</strong> (la demande thermique n&rsquo;est pas toujours pr&eacute;sente).</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <p>Les cellules PV ont un coefficient de temp&eacute;rature n&eacute;gatif : leur rendement baisse quand la temp&eacute;rature de la cellule augmente. En &eacute;t&eacute;, la temp&eacute;rature de cellule atteint <strong>60 &agrave; 75 &deg;C</strong> sur une toiture bien expos&eacute;e, entra&icirc;nant une perte de <span class="ms-hl">10 &agrave; 20 %</span> par rapport au rendement nominal.</p>
                    <p>R&eacute;cup&eacute;rer la chaleur derri&egrave;re le panneau pr&eacute;sente donc un double int&eacute;r&ecirc;t : <strong>refroidir la cellule</strong> (gain de rendement &eacute;lectrique) et <strong>valoriser la chaleur</strong> sous forme d&rsquo;air chaud (a&eacute;rovolta&iuml;que) ou d&rsquo;eau chaude (hybride &agrave; fluide).</p>
                </div>
            </div>

            <!-- ─── Chapitre III ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>Les trois familles de solutions hybrides</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>A&eacute;rovolta&iuml;que</h6>
                        <p>Panneau PV &eacute;quip&eacute; de conduits &agrave; l&rsquo;arri&egrave;re r&eacute;cup&eacute;rant l&rsquo;air chaud pour le souffler dans le logement via une ventilation m&eacute;canique.</p>
                    </div>
                    <div class="ms-box def">
                        <div class="ms-box-label">D&eacute;finition</div>
                        <h6>Hybride PV-T &agrave; fluide</h6>
                        <p>&Eacute;changeur plaqu&eacute; au dos du panneau PV r&eacute;cup&eacute;rant la chaleur dans un fluide (eau glycol&eacute;e) pour alimenter un ballon d&rsquo;ECS ou un plancher chauffant basse temp&eacute;rature.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>A&eacute;rovolta&iuml;que (PV + air)</h5>
                    <p>Des conduits &agrave; l&rsquo;arri&egrave;re du panneau r&eacute;cup&egrave;rent l&rsquo;air chaud et l&rsquo;envoient dans le logement. Usage : pr&eacute;chauffage de l&rsquo;air neuf en hiver, ventilation rafra&icirc;chissante en &eacute;t&eacute;. Les fabricants annoncent un rendement thermique de 50-70 % ; les mesures ind&eacute;pendantes montrent plut&ocirc;t <span class="ms-hl">20-40 %</span> en rendement utile annuel. Co&ucirc;t : 1,5 &agrave; 2 fois le PV seul.</p>

                    <h5>Hybride PV-T &agrave; fluide (PV + eau)</h5>
                    <p>Un &eacute;changeur plaqu&eacute; au dos du panneau r&eacute;cup&egrave;re la chaleur dans un fluide (eau glycol&eacute;e) qui alimente un ballon d&rsquo;ECS ou un plancher chauffant basse temp&eacute;rature. Rendement thermique : 30-50 %. Co&ucirc;t : <strong>2 &agrave; 3 fois</strong> le PV seul, avec une int&eacute;gration plomberie complexe.</p>

                    <h5>Solaire combin&eacute; (PV + thermique s&eacute;par&eacute;)</h5>
                    <p>Installer s&eacute;par&eacute;ment des panneaux PV et des panneaux thermiques sur la m&ecirc;me toiture. Ce n&rsquo;est pas &agrave; proprement parler un syst&egrave;me hybride, mais c&rsquo;est souvent <strong>la solution la plus robuste</strong> : chaque fili&egrave;re est optimis&eacute;e pour son usage, sans compromis de conception.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Comparatif des technologies solaires</div>
                        <table>
                            <thead><tr><th>Technologie</th><th>&Eacute;lectricit&eacute;</th><th>Chaleur</th><th>Co&ucirc;t relatif</th><th>Pertinence</th></tr></thead>
                            <tbody>
                                <tr><td>PV classique</td><td>Oui</td><td>&mdash;</td><td>1,0</td><td>Majorit&eacute; des cas</td></tr>
                                <tr><td>Solaire thermique ECS</td><td>&mdash;</td><td>ECS</td><td>0,8</td><td>Fort besoin ECS, collectif</td></tr>
                                <tr><td>A&eacute;rovolta&iuml;que</td><td>Oui</td><td>Air chaud</td><td><span class="ms-hl">1,5-2,0</span></td><td>Rarement optimal</td></tr>
                                <tr><td>Hybride PV-T &agrave; fluide</td><td>Oui</td><td>Eau chaude</td><td><span class="ms-hl">2,0-3,0</span></td><td>Niche (surface limit&eacute;e + fort ECS)</td></tr>
                                <tr><td>PV + CET pilot&eacute;</td><td>Oui</td><td>ECS indirecte</td><td>1,1-1,3</td><td><strong>Solution robuste</strong></td></tr>
                                <tr><td>PV + thermique s&eacute;par&eacute;s</td><td>Oui</td><td>Oui</td><td>1,3-1,6</td><td>Toiture suffisante</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre IV ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>&Eacute;valuation critique</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>Pratiques commerciales</h6>
                        <p>L&rsquo;ADEME et la DGCCRF ont alert&eacute; &agrave; plusieurs reprises sur des <strong>surfacturations</strong> et des <strong>promesses trompeuses</strong> dans le segment a&eacute;rovolta&iuml;que r&eacute;sidentiel.</p>
                    </div>
                    <div class="ms-box repere">
                        <div class="ms-box-label">Rep&egrave;re</div>
                        <p>Hi&eacute;rarchie recommand&eacute;e en maison individuelle : isolation &rarr; chauffage performant &rarr; PV classique + CET &rarr; solaire thermique &rarr; hybride en dernier recours.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <h5>A&eacute;rovolta&iuml;que</h5>
                    <p>Le gain thermique r&eacute;el est <strong>modeste</strong> : les calories r&eacute;cup&eacute;rables sont maximales en &eacute;t&eacute; (quand le besoin est faible) et r&eacute;duites en hiver (quand le besoin est fort mais le rayonnement limit&eacute;). Le gain &eacute;lectrique li&eacute; au refroidissement reste de quelques pourcents au mieux. Le surco&ucirc;t est important face &agrave; un PV simple combin&eacute; &agrave; une VMC double flux ou un CET.</p>

                    <h5>Hybride PV-T &agrave; fluide</h5>
                    <p>Techniquement plus robuste car il valorise la chaleur dans un ballon d&rsquo;ECS (stockage tampon naturel). Mais la complexit&eacute; d&rsquo;int&eacute;gration (boucle hydraulique, &eacute;changeur, r&eacute;gulation, risques de gel et de surchauffe), le co&ucirc;t &eacute;lev&eacute; et le faible nombre de fabricants en font une <strong>niche technologique</strong>. Cas d&rsquo;usage pertinents : petit collectif ou tertiaire avec forte demande d&rsquo;ECS et surface de toiture limit&eacute;e.</p>

                    <div class="ms-doc">
                        <div class="ms-doc-head"><span class="ms-doc-num">Bonne pratique</span>Comparaison syst&eacute;matique avant tout projet hybride</div>
                        <p>Avant d&rsquo;engager un projet a&eacute;rovolta&iuml;que ou hybride, r&eacute;aliser une <strong>comparaison &eacute;conomique rigoureuse</strong> avec : (1) PV classique + chauffe-eau thermodynamique, (2) PV classique + VMC double flux, (3) isolation renforc&eacute;e. Dans la majorit&eacute; des maisons individuelles, ces alternatives sont <strong>plus rentables et plus p&eacute;rennes</strong>.</p>
                    </div>
                </div>
            </div>

            <!-- ─── Chapitre V ─── -->
            <div class="ms-chap bp-section">
                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Points de vigilance sp&eacute;cifiques</span>
            </div>
            <div class="ms-body">
                <aside class="ms-marge">
                    <div class="ms-box alerte">
                        <div class="ms-box-label">Alerte</div>
                        <h6>Dimensionnement</h6>
                        <p>&Eacute;viter les syst&egrave;mes surdimensionn&eacute;s avec des promesses de couverture 80-100 %. Un dimensionnement &agrave; <span class="ms-hl">30-50 %</span> est plus r&eacute;aliste en hybride r&eacute;sidentiel.</p>
                    </div>
                </aside>
                <div class="ms-main">
                    <ol>
                        <li><strong>Surchauffe estivale</strong> de la boucle thermique : pr&eacute;voir une &eacute;vacuation de chaleur (radiateur de dissipation, ballon de secours) ou une mise en stagnation contr&ocirc;l&eacute;e.</li>
                        <li><strong>Risque de condensation</strong> &agrave; l&rsquo;arri&egrave;re des panneaux a&eacute;rovolta&iuml;ques mal con&ccedil;us, pouvant d&eacute;grader la cellule &agrave; moyen terme.</li>
                        <li><strong>Entretien plus lourd</strong> : filtres, fluide, pression, sondes. Suivi plus fr&eacute;quent que le PV simple.</li>
                        <li><strong>Garantie et fili&egrave;re de r&eacute;paration</strong> : s&rsquo;assurer de la p&eacute;rennit&eacute; du fabricant avant d&rsquo;engager un investissement long.</li>
                        <li><strong>Couplage avec la VMC</strong> : en a&eacute;rovolta&iuml;que, v&eacute;rifier que le syst&egrave;me ne d&eacute;s&eacute;quilibre pas la ventilation du logement (d&eacute;bits, filtration, acoustique).</li>
                    </ol>
                </div>
            </div>

            <!-- ─── Synthèse ─── -->
            <div class="ms-retiens bp-section">
                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                <h4>Les points essentiels du chapitre</h4>
                <ul>
                    <li>Les technologies hybrides combinent <strong>production &eacute;lectrique et thermique</strong> sur une m&ecirc;me surface, en exploitant la chaleur dissip&eacute;e &agrave; l&rsquo;arri&egrave;re du module PV.</li>
                    <li>Trois familles : <strong>a&eacute;rovolta&iuml;que</strong> (PV + air), <strong>PV-T &agrave; fluide</strong> (PV + eau glycol&eacute;e), <strong>PV et thermique s&eacute;par&eacute;s</strong>.</li>
                    <li>L&rsquo;a&eacute;rovolta&iuml;que r&eacute;sidentiel a fait l&rsquo;objet de <strong>pratiques commerciales probl&eacute;matiques</strong> ; ses gains r&eacute;els sont souvent inf&eacute;rieurs aux promesses.</li>
                    <li>Dans la <strong>majorit&eacute; des maisons individuelles</strong>, la combinaison <strong>PV classique + CET pilot&eacute;</strong> est plus robuste, moins ch&egrave;re et plus p&eacute;renne.</li>
                    <li>Points de vigilance : <strong>surchauffe</strong>, <strong>entretien</strong>, <strong>p&eacute;rennit&eacute; du fabricant</strong>, dimensionnement r&eacute;aliste &agrave; 30-50 %.</li>
                </ul>
            </div>

            <div class="ms-vocab bp-section">
                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                <dl>
                    <dt>A&eacute;rovolta&iuml;que</dt><dd>Panneau PV r&eacute;cup&eacute;rant l&rsquo;air chaud &agrave; l&rsquo;arri&egrave;re pour le souffler dans le logement.</dd>
                    <dt>PV-T (hybride)</dt><dd>Panneau combinant cellules PV et &eacute;changeur thermique &agrave; fluide sur un m&ecirc;me module.</dd>
                    <dt>CET</dt><dd>Chauffe-eau thermodynamique : ballon d&rsquo;ECS &eacute;quip&eacute; d&rsquo;une pompe &agrave; chaleur int&eacute;gr&eacute;e.</dd>
                    <dt>Fluide caloporteur</dt><dd>Liquide (eau glycol&eacute;e) circulant dans un circuit ferm&eacute; pour transporter la chaleur.</dd>
                    <dt>Stagnation</dt><dd>&Eacute;tat d&rsquo;un circuit solaire thermique sans soutirage : le fluide surchauffe et peut se d&eacute;grader.</dd>
                    <dt>Coefficient de temp&eacute;rature</dt><dd>Variation du rendement PV par degr&eacute; C au-del&agrave; de 25 &deg;C (typiquement &minus;0,3 &agrave; &minus;0,4 %/&deg;C).</dd>
                </dl>
            </div>

            <div class="ms-sources bp-section">
                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>Solaire hybride et a&eacute;rovolta&iuml;que : analyse critique</em> (2023) &middot; ADEME, <em>Avis d&rsquo;expert syst&egrave;mes a&eacute;rovolta&iuml;ques</em> (2019-2022) &middot; photovoltaique.info &middot; DGCCRF &middot; CEA-INES &middot; IEA SHC Task 60 &middot; CSTB.
            </div>

        </div>
        <div class="bp-card-footer">
            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / CEA-INES / CSTB</span>
            <span>Fiche 5 / 6 &mdash; Avril 2026</span>
        </div>
    </div>
</div>

<div class="bp-fiche" data-theme="solaire-pv" id="bpFicheT8C6">
    <div class="bp-card ms-card">
        <div class="bp-card-header">
            <div class="ms-banner">
                <div class="ms-banner-num">
                    <small>Chapitre</small>
                    <strong>C.6</strong>
                </div>
                <div class="ms-banner-text">
                    <div class="ms-banner-eyebrow">Th&egrave;me 8 &mdash; Solaire photovolta&iuml;que &middot; Fiche 6 / 6</div>
                    <h3 class="ms-banner-title">Contribuer au d&eacute;veloppement de l&rsquo;&eacute;lectricit&eacute; renouvelable</h3>
                    <div class="ms-banner-sub">Au-del&agrave; de l&rsquo;installation personnelle : coop&eacute;ratives, fournisseurs verts, sobri&eacute;t&eacute;</div>
                </div>
            </div>
        </div>
        <div class="bp-card-content ms-content">

            <p class="ms-lede">Installer des panneaux solaires chez soi n&rsquo;est pas accessible &agrave; tous : locataires, copropri&eacute;t&eacute;s non &eacute;quipables, m&eacute;nages modestes, zones prot&eacute;g&eacute;es. Pourtant, chacun peut agir pour acc&eacute;l&eacute;rer la transition &eacute;nerg&eacute;tique. Ce chapitre pr&eacute;sente les leviers compl&eacute;mentaires : coop&eacute;ratives citoyennes, fournisseurs engag&eacute;s, soutien aux projets publics et sobri&eacute;t&eacute;.</p>

            <div class="ms-intro bp-section">
                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                <h4>&Agrave; la fin de cette fiche, l&rsquo;apprenant doit savoir :</h4>
                <ul>
                    <li>comprendre pourquoi <strong>investir dans une installation personnelle n&rsquo;est pas la seule voie</strong> ;</li>
                    <li>identifier les <strong>alternatives collectives et citoyennes</strong> pour soutenir les EnR ;</li>
                    <li>distinguer les <strong>fournisseurs d&rsquo;&eacute;lectricit&eacute; verte</strong> et leur degr&eacute; d&rsquo;engagement r&eacute;el ;</li>
                    <li>orienter les m&eacute;nages qui <strong>ne peuvent pas installer chez eux</strong> vers des leviers d&rsquo;action concrets.</li>
                </ul>
            </div>

            <!-- ===== CHAPITRE I ===== -->
            <div class="ms-chap bp-section">
                <div class="ms-chap-head bp-section-title"><span class="ms-toc-num" style="display:none;">I. </span>I. Tous les m&eacute;nages ne peuvent pas installer de PV</div>
                <div class="ms-body">
                    <div class="ms-marge">
                        <aside class="ms-aside ms-aside-repere">
                            <div class="ms-aside-title">Rep&egrave;re</div>
                            <p>En France, environ <span class="ms-hl">42 % des m&eacute;nages sont locataires</span> et n&rsquo;ont pas la possibilit&eacute; juridique d&rsquo;installer du PV. S&rsquo;y ajoutent les copropri&eacute;taires sans toiture exploitable, les zones class&eacute;es et les m&eacute;nages n&rsquo;ayant pas la capacit&eacute; financi&egrave;re d&rsquo;investir 8 &agrave; 20 k&euro;.</p>
                        </aside>
                    </div>
                    <div class="ms-main">
                        <p>Installer des panneaux solaires chez soi suppose plusieurs conditions rarement toutes r&eacute;unies :</p>
                        <ul>
                            <li><strong>&Ecirc;tre propri&eacute;taire</strong> &mdash; cela exclut environ 42 % des m&eacute;nages fran&ccedil;ais, locataires de leur logement.</li>
                            <li><strong>Disposer d&rsquo;une toiture</strong> orient&eacute;e et non ombrag&eacute;e &mdash; les appartements, certaines copropri&eacute;t&eacute;s non &eacute;quipables et les logements en zone prot&eacute;g&eacute;e sont exclus.</li>
                            <li><strong>Avoir la capacit&eacute; financi&egrave;re</strong> d&rsquo;investir <span class="ms-hl">8 &agrave; 20 k&euro;</span> &mdash; ce qui exclut une large part des m&eacute;nages modestes.</li>
                            <li><strong>Pr&eacute;voir une dur&eacute;e de r&eacute;sidence suffisante</strong> pour amortir l&rsquo;investissement &mdash; les m&eacute;nages en mobilit&eacute; sont p&eacute;nalis&eacute;s.</li>
                        </ul>
                        <p>Cons&eacute;quence : une grande partie de la population fran&ccedil;aise n&rsquo;a pas acc&egrave;s directement au PV r&eacute;sidentiel alors qu&rsquo;elle peut avoir envie de contribuer au d&eacute;veloppement des &eacute;nergies renouvelables. Heureusement, d&rsquo;autres leviers existent, accessibles &agrave; tous et cumulables entre eux.</p>
                    </div>
                </div>
            </div>

            <!-- ===== CHAPITRE II ===== -->
            <div class="ms-chap bp-section">
                <div class="ms-chap-head bp-section-title"><span class="ms-toc-num" style="display:none;">II. </span>II. Investir dans une coop&eacute;rative citoyenne d&rsquo;&eacute;nergie</div>
                <div class="ms-body">
                    <div class="ms-marge">
                        <aside class="ms-aside ms-aside-def">
                            <div class="ms-aside-title">D&eacute;finition</div>
                            <p><strong>Coop&eacute;rative citoyenne d&rsquo;&eacute;nergie</strong> &mdash; Soci&eacute;t&eacute; (SCIC, SAS coop&eacute;rative, SA coop&eacute;rative) dont le capital est d&eacute;tenu majoritairement par des <strong>citoyens du territoire</strong> et qui porte des projets de production d&rsquo;&eacute;nergie renouvelable. Gouvernance : une personne = une voix, ind&eacute;pendamment du nombre de parts d&eacute;tenues. Rentabilit&eacute; mod&eacute;r&eacute;e (<span class="ms-hl">2 &agrave; 4 % brut</span>), l&rsquo;objectif premier &eacute;tant l&rsquo;ancrage local et la transition &eacute;nerg&eacute;tique.</p>
                        </aside>
                        <aside class="ms-aside ms-aside-repere">
                            <div class="ms-aside-title">Rep&egrave;re</div>
                            <p>Le fonds <strong>&Eacute;nergie Partag&eacute;e Investissement (EPI)</strong> permet d&rsquo;investir &agrave; partir de <span class="ms-hl">100 &euro;</span> sur un portefeuille diversifi&eacute; de projets EnR (solaire, &eacute;olien, hydro&eacute;lectricit&eacute;, m&eacute;thanisation), avec des crit&egrave;res de s&eacute;lection rigoureux : gouvernance d&eacute;mocratique, ancrage local, finalit&eacute; non sp&eacute;culative.</p>
                        </aside>
                    </div>
                    <div class="ms-main">
                        <p>Des coop&eacute;ratives et soci&eacute;t&eacute;s citoyennes d&eacute;veloppent, financent et exploitent des installations EnR &agrave; l&rsquo;&eacute;chelle d&rsquo;un territoire : centrales PV sur toitures publiques, parcs solaires, &eacute;oliennes, hydro&eacute;lectricit&eacute;. Les citoyens peuvent y acheter des parts (typiquement <span class="ms-hl">100 &agrave; 500 &euro; la part</span>) et devenir coactionnaires des projets.</p>

                        <h5>&Eacute;nergie Partag&eacute;e</h5>
                        <p>R&eacute;seau national f&eacute;d&eacute;rant plusieurs centaines de projets citoyens. Le fonds EPI offre un point d&rsquo;entr&eacute;e simple et diversifi&eacute;, avec des crit&egrave;res de s&eacute;lection exigeants.</p>

                        <h5>Coop&eacute;ratives locales</h5>
                        <p>Partout en France, des coop&eacute;ratives locales portent des projets &agrave; taille humaine, souvent adoss&eacute;s &agrave; des toitures de b&acirc;timents publics (&eacute;coles, gymnases, mairies) : Centrales Villageoises, Enercoop Rh&ocirc;ne-Alpes, CVLO, Ombri&egrave;res Citoyennes, &Eacute;nergies Citoyennes Ouest Lyonnais, etc.</p>

                        <h5>Rentabilit&eacute; et fiscalit&eacute;</h5>
                        <p>Le rendement brut se situe entre 1 et 4 % selon les projets et leur maturit&eacute;. Le risque est mod&eacute;r&eacute; &agrave; significatif (projet industriel long, sensibilit&eacute; aux tarifs d&rsquo;achat). Les gains sont imposables dans la cat&eacute;gorie des revenus de capitaux mobiliers ; certaines formules permettent de r&eacute;investir les dividendes automatiquement.</p>

                        <div class="ms-doc" style="clear:both;">
                            <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Bonne pratique &mdash; investir localement</div>
                            <div style="border:1px solid #E2E8F0;background:#FAFBFC;border-radius:6px;padding:14px 18px;font-size:13px;line-height:1.7;color:#334155;">
                                <p style="margin:0;">Pour un m&eacute;nage qui ne peut pas installer de PV chez lui mais dispose d&rsquo;une petite &eacute;pargne, une <strong>part dans une coop&eacute;rative locale</strong> est un moyen concret et territorialis&eacute; de contribuer &agrave; la transition. Ce n&rsquo;est pas un placement financier classique : on investit pour le sens autant que pour le rendement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== CHAPITRE III ===== -->
            <div class="ms-chap bp-section">
                <div class="ms-chap-head bp-section-title"><span class="ms-toc-num" style="display:none;">III. </span>III. Choisir un fournisseur d&rsquo;&eacute;lectricit&eacute; r&eacute;ellement verte</div>
                <div class="ms-body">
                    <div class="ms-marge">
                        <aside class="ms-aside ms-aside-def">
                            <div class="ms-aside-title">D&eacute;finition</div>
                            <p><strong>Garantie d&rsquo;origine (GO)</strong> &mdash; Certificat attestant qu&rsquo;un MWh a &eacute;t&eacute; produit &agrave; partir d&rsquo;une source renouvelable. Un fournisseur peut acheter des GO <strong>s&eacute;par&eacute;ment</strong> de l&rsquo;&eacute;lectricit&eacute; physique consomm&eacute;e par ses clients : aucun MWh suppl&eacute;mentaire n&rsquo;est produit, aucun investissement nouveau n&rsquo;est d&eacute;clench&eacute;.</p>
                        </aside>
                        <aside class="ms-aside ms-aside-alerte">
                            <div class="ms-aside-title">Alerte</div>
                            <p>Une offre &laquo; verte &raquo; peut recouvrir des r&eacute;alit&eacute;s tr&egrave;s diff&eacute;rentes. V&eacute;rifier dans les conditions g&eacute;n&eacute;rales la <strong>tra&ccedil;abilit&eacute; de l&rsquo;approvisionnement</strong>, l&rsquo;origine des GO, et la politique d&rsquo;investissement du fournisseur. Un co&ucirc;t l&eacute;g&egrave;rement sup&eacute;rieur est souvent le signe d&rsquo;un engagement r&eacute;el.</p>
                        </aside>
                    </div>
                    <div class="ms-main">
                        <p>La lib&eacute;ralisation du march&eacute; de l&rsquo;&eacute;lectricit&eacute; en France permet &agrave; chaque consommateur de choisir son fournisseur. De nombreux fournisseurs proposent des offres &laquo; vertes &raquo;, mais le degr&eacute; d&rsquo;engagement r&eacute;el varie &eacute;norm&eacute;ment.</p>

                        <h5>Le m&eacute;canisme des garanties d&rsquo;origine</h5>
                        <p>Les garanties d&rsquo;origine sont des certificats qui attestent qu&rsquo;un MWh a &eacute;t&eacute; produit &agrave; partir d&rsquo;une source renouvelable. Un fournisseur peut acheter des GO s&eacute;par&eacute;ment de l&rsquo;&eacute;lectricit&eacute; physique, ce qui est l&eacute;gal mais parfois qualifi&eacute; de <em>greenwashing</em>. Deux niveaux d&rsquo;offres se distinguent :</p>
                        <ul>
                            <li><strong>Offre &laquo; verte &raquo; basique</strong> &mdash; GO achet&eacute;es &agrave; bas co&ucirc;t, souvent sur des barrages hydro&eacute;lectriques existants depuis des d&eacute;cennies. Pas d&rsquo;impact additionnel.</li>
                            <li><strong>Offre &laquo; verte &raquo; premium</strong> &mdash; le fournisseur s&rsquo;approvisionne directement aupr&egrave;s de producteurs EnR via des contrats long terme (PPA), finan&ccedil;ant indirectement de nouvelles capacit&eacute;s.</li>
                        </ul>

                        <h5>Fournisseurs v&eacute;ritablement engag&eacute;s</h5>
                        <p>L&rsquo;ADEME et des ONG (Greenpeace notamment) publient r&eacute;guli&egrave;rement un classement des fournisseurs selon l&rsquo;ambition r&eacute;elle de leurs offres vertes. Parmi les fournisseurs engag&eacute;s (2024) :</p>
                        <ul>
                            <li><strong>Enercoop</strong> &mdash; coop&eacute;rative, approvisionnement &agrave; 100 % aupr&egrave;s de producteurs EnR fran&ccedil;ais ind&eacute;pendants via contrats directs. Tarif plus &eacute;lev&eacute; mais impact r&eacute;el maximal.</li>
                            <li><strong>Ilek</strong> &mdash; &eacute;lectricit&eacute; issue de producteurs EnR identifi&eacute;s nomm&eacute;ment, essentiellement hydro&eacute;lectrique.</li>
                            <li><strong>Plan&egrave;te OUI</strong>, <strong>Urban Solar Energy</strong> et quelques autres fournisseurs &agrave; suivre selon les classements actualis&eacute;s.</li>
                        </ul>
                        <p>&Agrave; l&rsquo;inverse, les offres &laquo; vertes &raquo; des grands fournisseurs historiques restent souvent bas&eacute;es sur un simple achat de GO, sans engagement d&rsquo;investissement nouveau.</p>
                    </div>
                </div>
            </div>

            <!-- ===== CHAPITRE IV ===== -->
            <div class="ms-chap bp-section">
                <div class="ms-chap-head bp-section-title"><span class="ms-toc-num" style="display:none;">IV. </span>IV. Soutenir les projets EnR publics et collectifs</div>
                <div class="ms-body">
                    <div class="ms-marge">
                        <aside class="ms-aside ms-aside-repere">
                            <div class="ms-aside-title">Rep&egrave;re</div>
                            <p>La <strong>loi APER</strong> (10 mars 2023) oblige progressivement &agrave; &eacute;quiper les parkings &gt; 1 500 m&sup2; en PV et facilite le d&eacute;ploiement sur les b&acirc;timents publics. Elle constitue un levier r&eacute;glementaire majeur pour acc&eacute;l&eacute;rer les EnR au niveau local.</p>
                        </aside>
                    </div>
                    <div class="ms-main">
                        <h5>Participer aux enqu&ecirc;tes publiques</h5>
                        <p>Les projets EnR (parcs solaires au sol, &eacute;oliennes, m&eacute;thaniseurs) font l&rsquo;objet d&rsquo;enqu&ecirc;tes publiques et de concertations pr&eacute;alables. Y participer activement en soutien argument&eacute; contribue &agrave; faire aboutir des projets qui rencontrent souvent des oppositions.</p>

                        <h5>Promouvoir le PV sur les toitures publiques</h5>
                        <p>Interpeller sa municipalit&eacute;, sa communaut&eacute; de communes ou sa m&eacute;tropole pour &eacute;quiper les toitures publiques (&eacute;coles, gymnases, halles de march&eacute;, parkings) en photovolta&iuml;que. Plusieurs dispositifs facilitent ces projets : la loi APER, les SEM locales ou AMI port&eacute;s par les collectivit&eacute;s, et le co-investissement citoyen propos&eacute; par certaines communes.</p>

                        <h5>S&rsquo;impliquer dans une ALEC ou une ALTE</h5>
                        <p>Les agences locales de l&rsquo;&eacute;nergie et du climat (ALEC, ALTE, ALE) sont des relais op&eacute;rationnels du service public de la r&eacute;novation &eacute;nerg&eacute;tique, souvent structur&eacute;s en associations ou SPL. Devenir adh&eacute;rent, y participer comme b&eacute;n&eacute;vole ou intervenant, c&rsquo;est contribuer &agrave; la diffusion d&rsquo;une information fiable et ind&eacute;pendante sur les EnR et la sobri&eacute;t&eacute;. Cotisation annuelle typique : <span class="ms-hl">25 &agrave; 50 &euro;/an</span>.</p>
                    </div>
                </div>
            </div>

            <!-- ===== CHAPITRE V ===== -->
            <div class="ms-chap bp-section">
                <div class="ms-chap-head bp-section-title"><span class="ms-toc-num" style="display:none;">V. </span>V. La sobri&eacute;t&eacute; comme premier levier</div>
                <div class="ms-body">
                    <div class="ms-marge">
                        <aside class="ms-aside ms-aside-repere">
                            <div class="ms-aside-title">Rep&egrave;re</div>
                            <p>Un m&eacute;nage qui <strong>divise par deux sa consommation &eacute;lectrique</strong> par l&rsquo;efficacit&eacute; et la sobri&eacute;t&eacute; &eacute;conomise davantage d&rsquo;&eacute;missions CO&#8322; qu&rsquo;en installant 6 kWc de PV sur sa toiture, pour un co&ucirc;t bien inf&eacute;rieur. Hi&eacute;rarchie : <span class="ms-hl">sobri&eacute;t&eacute; &rarr; efficacit&eacute; &rarr; renouvelable</span>.</p>
                        </aside>
                    </div>
                    <div class="ms-main">
                        <p>Avant et au-del&agrave; de toute production, la sobri&eacute;t&eacute; reste le levier le plus efficace pour d&eacute;carboner son mode de vie :</p>
                        <ul>
                            <li><strong>R&eacute;duire ses consommations &eacute;lectriques</strong> &mdash; &eacute;clairage LED, appareils performants, extinction des veilles, pilotage du chauffage, am&eacute;lioration de l&rsquo;enveloppe.</li>
                            <li><strong>D&eacute;caler ses usages</strong> vers les heures de forte production EnR (jour pour le solaire, nuit pour l&rsquo;&eacute;olien selon les r&eacute;gions).</li>
                            <li><strong>Choisir un chauffage renouvelable</strong> &mdash; PAC, po&ecirc;le &agrave; b&ucirc;ches performant, r&eacute;seau de chaleur renouvelable, solaire thermique.</li>
                            <li><strong>Mobilit&eacute; bas-carbone</strong> &mdash; v&eacute;lo, transports en commun, covoiturage, v&eacute;hicule &eacute;lectrique recharg&eacute; sur les heures renouvelables.</li>
                        </ul>
                        <p>Les diff&eacute;rents leviers sont cumulatifs et compl&eacute;mentaires : un m&eacute;nage peut &agrave; la fois r&eacute;duire ses consommations, changer de fournisseur, prendre des parts en coop&eacute;rative et soutenir des projets locaux.</p>
                    </div>
                </div>
            </div>

            <!-- ===== CHAPITRE VI ===== -->
            <div class="ms-chap bp-section">
                <div class="ms-chap-head bp-section-title"><span class="ms-toc-num" style="display:none;">VI. </span>VI. Tableau synth&eacute;tique des leviers</div>
                <div class="ms-body">
                    <div class="ms-marge">
                        <aside class="ms-aside ms-aside-repere">
                            <div class="ms-aside-title">Rep&egrave;re</div>
                            <p>Tous ces leviers sont accessibles <strong>simultan&eacute;ment</strong>. Un m&eacute;nage locataire peut par exemple choisir Enercoop, prendre des parts dans une Centrale Villageoise et r&eacute;duire sa consommation de 30 %, sans poss&eacute;der un seul panneau.</p>
                        </aside>
                    </div>
                    <div class="ms-main">
                        <div class="ms-doc" style="clear:both;">
                            <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Comparaison synth&eacute;tique des leviers d&rsquo;action</div>
                            <div style="overflow-x:auto;">
                                <table style="width:100%;border-collapse:collapse;font-size:12.5px;line-height:1.6;">
                                    <thead>
                                        <tr style="background:#F1F5F9;font-weight:600;">
                                            <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #CBD5E1;">Levier</th>
                                            <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #CBD5E1;">Accessible &agrave;&hellip;</th>
                                            <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #CBD5E1;">Co&ucirc;t d&rsquo;entr&eacute;e</th>
                                            <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #CBD5E1;">Impact relatif</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Installation PV personnelle</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Propri&eacute;taires &eacute;quipables</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">8 &agrave; 20 k&euro;</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">&Eacute;lev&eacute; (si bien dimensionn&eacute;)</td>
                                        </tr>
                                        <tr style="background:#FAFBFC;">
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">PV en copropri&eacute;t&eacute;</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Copropri&eacute;taires</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">0 &agrave; quelques k&euro;/lot</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Moyen &agrave; &eacute;lev&eacute;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Parts en coop&eacute;rative citoyenne</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Tous</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;"><span class="ms-hl">100 &agrave; 500 &euro;/part</span></td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Moyen (cumul&eacute; &agrave; l&rsquo;&eacute;chelle du territoire)</td>
                                        </tr>
                                        <tr style="background:#FAFBFC;">
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Fournisseur &eacute;lectricit&eacute; vraiment verte</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Tous</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;"><span class="ms-hl">+5 &agrave; +15 %/an sur facture</span></td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Indirect mais r&eacute;el</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Soutien aux projets publics</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Tous</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Temps, voix</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Variable, souvent sous-estim&eacute;</td>
                                        </tr>
                                        <tr style="background:#FAFBFC;">
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;"><strong>Sobri&eacute;t&eacute; et efficacit&eacute;</strong></td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Tous</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Faible &agrave; nul</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;"><strong><span class="ms-hl">Maximal par euro investi</span></strong></td>
                                        </tr>
                                        <tr>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Adh&eacute;sion &agrave; une ALEC / ALTE</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Tous</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">25 &agrave; 50 &euro;/an</td>
                                            <td style="padding:7px 10px;border-bottom:1px solid #E2E8F0;">Diffus mais structurant</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== JE RETIENS ===== -->
            <div class="ms-retiens bp-section">
                <div class="ms-retiens-title bp-section-title">Je retiens</div>
                <ul>
                    <li>Tous les m&eacute;nages ne peuvent pas installer de PV chez eux : locataires, appartements, zones prot&eacute;g&eacute;es, m&eacute;nages modestes. D&rsquo;autres leviers existent, accessibles &agrave; tous.</li>
                    <li>Les <strong>coop&eacute;ratives citoyennes d&rsquo;&eacute;nergie</strong> (&Eacute;nergie Partag&eacute;e, Centrales Villageoises, Enercoop Rh&ocirc;ne-Alpes) permettent d&rsquo;investir &agrave; partir de 100 &agrave; 500 &euro; dans des projets EnR locaux et d&eacute;mocratiques.</li>
                    <li>Les <strong>fournisseurs d&rsquo;&eacute;lectricit&eacute; &laquo; verte &raquo;</strong> ne se valent pas : privil&eacute;gier ceux qui s&rsquo;approvisionnent en direct aupr&egrave;s de producteurs EnR (Enercoop, Ilek) plut&ocirc;t que ceux qui ach&egrave;tent de simples garanties d&rsquo;origine sans additionnalit&eacute;.</li>
                    <li>Soutenir les <strong>projets publics et collectifs</strong> : PV sur b&acirc;timents publics, participation aux enqu&ecirc;tes publiques, adh&eacute;sion &agrave; une ALEC/ALTE.</li>
                    <li>La <strong>sobri&eacute;t&eacute; et l&rsquo;efficacit&eacute;</strong> &eacute;nerg&eacute;tiques restent les leviers les plus efficaces par euro investi : hi&eacute;rarchie sobri&eacute;t&eacute; &rarr; efficacit&eacute; &rarr; renouvelable.</li>
                    <li>Les diff&eacute;rents leviers sont <strong>cumulatifs et compl&eacute;mentaires</strong> : un m&eacute;nage peut &agrave; la fois r&eacute;duire ses consommations, changer de fournisseur, prendre des parts en coop&eacute;rative et soutenir des projets locaux.</li>
                </ul>
            </div>

            <!-- ===== VOCABULAIRE ===== -->
            <div class="ms-vocab bp-section">
                <div class="ms-vocab-title bp-section-title">Vocabulaire</div>
                <dl>
                    <dt>Coop&eacute;rative citoyenne d&rsquo;&eacute;nergie</dt>
                    <dd>Soci&eacute;t&eacute; (SCIC, SAS coop&eacute;rative) dont le capital est d&eacute;tenu majoritairement par des citoyens du territoire, portant des projets EnR avec une gouvernance d&eacute;mocratique (une personne = une voix).</dd>
                    <dt>Garantie d&rsquo;origine (GO)</dt>
                    <dd>Certificat attestant qu&rsquo;un MWh a &eacute;t&eacute; produit &agrave; partir d&rsquo;une source renouvelable. Peut &ecirc;tre achet&eacute; s&eacute;par&eacute;ment de l&rsquo;&eacute;lectricit&eacute; physique, sans impact additionnel sur la production EnR.</dd>
                    <dt>Loi APER</dt>
                    <dd>Loi du 10 mars 2023 relative &agrave; l&rsquo;acc&eacute;l&eacute;ration de la production d&rsquo;&eacute;nergies renouvelables, imposant notamment l&rsquo;&eacute;quipement en PV des parkings &gt; 1 500 m&sup2;.</dd>
                    <dt>PPA (Power Purchase Agreement)</dt>
                    <dd>Contrat long terme d&rsquo;achat d&rsquo;&eacute;lectricit&eacute; entre un producteur EnR et un acheteur (fournisseur, entreprise), finan&ccedil;ant indirectement de nouvelles capacit&eacute;s de production.</dd>
                </dl>
            </div>

            <!-- ===== SOURCES ===== -->
            <div class="ms-sources bp-section">
                <div class="ms-sources-title bp-section-title">Sources et r&eacute;f&eacute;rences</div>
                <ul>
                    <li>ALEC Lyon / ALTE 69, <em>Contribuer au d&eacute;veloppement de l&rsquo;&eacute;lectricit&eacute; renouvelable</em> (fiche 2022-2024)</li>
                    <li>&Eacute;nergie Partag&eacute;e, energie-partagee.org</li>
                    <li>Enercoop, enercoop.fr et rapports d&rsquo;impact annuels</li>
                    <li>Greenpeace France, <em>Classement des fournisseurs d&rsquo;&eacute;lectricit&eacute; verte</em> (mise &agrave; jour r&eacute;guli&egrave;re)</li>
                    <li>ADEME, <em>Guide pratique &mdash; Consommer l&rsquo;&eacute;lectricit&eacute; autrement</em></li>
                    <li>Minist&egrave;re de la Transition &eacute;cologique, <em>Loi APER</em>, 10 mars 2023</li>
                    <li>Centrales Villageoises, centralesvillageoises.fr</li>
                    <li>Commission de R&eacute;gulation de l&rsquo;&Eacute;nergie, <em>Les garanties d&rsquo;origine</em></li>
                </ul>
                <p style="margin-top:10px;font-size:12px;color:#64748B;line-height:1.6;">Les classements de fournisseurs d&rsquo;&eacute;lectricit&eacute; verte &eacute;voluent d&rsquo;ann&eacute;e en ann&eacute;e. Se r&eacute;f&eacute;rer au dernier classement publi&eacute; (Greenpeace, ADEME, UFC-Que Choisir) avant de changer de contrat. Le secteur des coop&eacute;ratives citoyennes est en expansion : consulter &Eacute;nergie Partag&eacute;e pour une cartographie &agrave; jour.</p>
            </div>

        </div>
        <div class="bp-card-footer">
            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / Greenpeace / &Eacute;nergie Partag&eacute;e / CRE</span>
            <span>Fiche 6 / 6 &mdash; Avril 2026</span>
        </div>
    </div>
</div>`;

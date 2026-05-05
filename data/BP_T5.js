window.BP_T5_HTML = `<div class="bp-fiche" data-theme="pac" id="bpFicheT5C1">
                    <div class="bp-card ms-card">
                        <div class="bp-card-header">
                            <div class="ms-banner">
                                <div class="ms-banner-num">
                                    <small>Chapitre</small>
                                    <strong>C.1</strong>
                                </div>
                                <div class="ms-banner-text">
                                    <div class="ms-banner-eyebrow">Th&egrave;me 5 &mdash; Pompes &agrave; chaleur &middot; Fiche 1 / 4</div>
                                    <h3 class="ms-banner-title">Principe thermodynamique et COP</h3>
                                    <div class="ms-banner-sub">Comprendre le cycle frigorifique, les indicateurs de performance et les fluides</div>
                                </div>
                            </div>
                        </div>
                        <div class="bp-card-content ms-content">

                            <p class="ms-lede">Une pompe &agrave; chaleur ne cr&eacute;e pas d&rsquo;&eacute;nergie : elle en transporte d&rsquo;un milieu froid vers un milieu chaud, en consommant un peu d&rsquo;&eacute;lectricit&eacute;. Ce chapitre d&eacute;taille le cycle frigorifique &agrave; quatre composants, les indicateurs de performance (COP, SCOP, ETAS), l&rsquo;impact des r&eacute;gimes de temp&eacute;rature et le cadre r&eacute;glementaire des fluides frigorig&egrave;nes.</p>

                            <div class="ms-intro bp-section">
                                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                                <h4>&Agrave; la fin de cette fiche, le lecteur doit savoir :</h4>
                                <ul>
                                    <li>expliquer le <strong>principe thermodynamique</strong> d&rsquo;une PAC et le r&ocirc;le des quatre composants du cycle ;</li>
                                    <li>distinguer <strong>COP, SCOP, ETAS</strong> et savoir lire une fiche technique ;</li>
                                    <li>situer l&rsquo;impact des <strong>r&eacute;gimes de temp&eacute;rature</strong> et des &eacute;metteurs sur la performance r&eacute;elle ;</li>
                                    <li>conna&icirc;tre les <strong>fluides frigorig&egrave;nes</strong> utilis&eacute;s et le cadre r&eacute;glementaire F-Gas.</li>
                                </ul>
                            </div>

                            <!-- ─── Chapitre I ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>Qu&rsquo;est-ce qu&rsquo;une pompe &agrave; chaleur ?</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Pompe &agrave; chaleur</h6>
                                        <p>Machine thermodynamique qui pr&eacute;l&egrave;ve de la chaleur dans une <strong>source froide</strong> (air, sol, eau, air extrait) et la restitue &agrave; un niveau de temp&eacute;rature plus &eacute;lev&eacute; dans un <strong>puits chaud</strong> (air int&eacute;rieur, eau de chauffage, ECS).</p>
                                    </div>
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Pour <strong>1 kWh</strong> d&rsquo;&eacute;lectricit&eacute; consomm&eacute;, une PAC d&eacute;livre typiquement <span class="ms-hl">3 &agrave; 4 kWh</span> de chaleur utile, dont 2 &agrave; 3 kWh pr&eacute;lev&eacute;s gratuitement dans l&rsquo;environnement.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Une pompe &agrave; chaleur pr&eacute;l&egrave;ve de la chaleur dans un milieu dit &laquo; source froide &raquo; (air ext&eacute;rieur, sol, nappe, air extrait) pour la restituer, &agrave; un niveau de temp&eacute;rature plus &eacute;lev&eacute;, dans un milieu dit &laquo; puits chaud &raquo; (air int&eacute;rieur, eau de chauffage, eau sanitaire). Elle ne cr&eacute;e pas d&rsquo;&eacute;nergie : elle en <strong>transporte</strong> d&rsquo;un milieu &agrave; l&rsquo;autre, en consommant un peu d&rsquo;&eacute;lectricit&eacute; pour alimenter le compresseur.</p>

                                    <p>C&rsquo;est la m&ecirc;me machine, physiquement, qu&rsquo;un r&eacute;frig&eacute;rateur ou qu&rsquo;un climatiseur : seule change la finalit&eacute; d&rsquo;usage. Un r&eacute;frig&eacute;rateur refroidit son int&eacute;rieur et rejette la chaleur dans la pi&egrave;ce ; une PAC de chauffage refroidit l&rsquo;air ext&eacute;rieur et rejette la chaleur dans le logement. Une <strong>PAC r&eacute;versible</strong> permet d&rsquo;effectuer les deux cycles selon la saison.</p>

                                    <p>L&rsquo;int&eacute;r&ecirc;t majeur de la PAC est ce rapport entre &eacute;nergie restitu&eacute;e et &eacute;nergie consomm&eacute;e, appel&eacute; <strong>COP</strong> (Coefficient de Performance). C&rsquo;est la raison pour laquelle les PAC sont devenues le standard de la construction neuve (RE2020) et l&rsquo;outil central de la d&eacute;carbonation du chauffage r&eacute;sidentiel.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Sch&eacute;ma de principe : PAC air/air et PAC air/eau</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c1_01.webp" alt="Sch&eacute;ma de principe d&rsquo;une PAC air/air et d&rsquo;une PAC air/eau" loading="lazy" decoding="async">
                                            <figcaption>PAC air/air (soufflage direct) et PAC air/eau (radiateurs, plancher chauffant, ballon ECS).</figcaption>
                                        </figure>
                                        <p>La PAC air/air distribue la chaleur par soufflage direct dans les pi&egrave;ces via des unit&eacute;s int&eacute;rieures. La PAC air/eau alimente un circuit hydraulique raccord&eacute; &agrave; des radiateurs, un plancher chauffant ou un ballon d&rsquo;eau chaude sanitaire. Dans les deux cas, l&rsquo;unit&eacute; ext&eacute;rieure pr&eacute;l&egrave;ve les calories dans l&rsquo;air ext&eacute;rieur.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Chapitre II ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>Le cycle frigorifique &agrave; quatre composants</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Fluide frigorig&egrave;ne</h6>
                                        <p>Fluide parcourant le circuit ferm&eacute; de la PAC, dimensionn&eacute; pour s&rsquo;&eacute;vaporer &agrave; tr&egrave;s basse temp&eacute;rature et se condenser &agrave; haute temp&eacute;rature. C&rsquo;est le &laquo; sang &raquo; de la machine.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>Pour un COP de 3,5 : chaleur pr&eacute;lev&eacute;e &asymp; 2,5 kWh + &eacute;lectricit&eacute; 1,0 kWh = chaleur restitu&eacute;e <span class="ms-hl">3,5 kWh</span>.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Toute PAC repose sur un <strong>circuit ferm&eacute;</strong> parcouru par un fluide frigorig&egrave;ne qui alternativement s&rsquo;&eacute;vapore et se condense. Quatre composants jalonnent ce circuit.</p>

                                    <h5>L&rsquo;&eacute;vaporateur</h5>
                                    <p>&Agrave; l&rsquo;&eacute;vaporateur, le fluide arrive &agrave; basse pression et basse temp&eacute;rature, &agrave; l&rsquo;&eacute;tat liquide. Il est mis en contact avec la source froide via un &eacute;changeur. La source froide c&egrave;de sa chaleur au fluide, qui <strong>s&rsquo;&eacute;vapore</strong> &agrave; basse temp&eacute;rature (typiquement &minus;10 &agrave; +5 &deg;C c&ocirc;t&eacute; fluide).</p>

                                    <h5>Le compresseur</h5>
                                    <p>Le compresseur aspire la vapeur basse pression et la <strong>comprime</strong>. Cette compression &eacute;l&egrave;ve la pression (rapport 3 &agrave; 8) et la temp&eacute;rature (70&ndash;90 &deg;C en sortie). C&rsquo;est le <strong>seul poste consommateur</strong> d&rsquo;&eacute;lectricit&eacute; du cycle. La technologie <strong>Inverter</strong> adapte en continu la vitesse du compresseur aux besoins, &eacute;vitant les cycles marche/arr&ecirc;t qui d&eacute;gradent performance et endurance.</p>

                                    <h5>Le condenseur</h5>
                                    <p>Au condenseur, la vapeur haute pression et haute temp&eacute;rature est mise en contact avec le puits chaud. Le fluide c&egrave;de sa chaleur et <strong>se condense</strong> en repassant &agrave; l&rsquo;&eacute;tat liquide. La chaleur restitu&eacute;e &eacute;gale la chaleur pr&eacute;lev&eacute;e &agrave; l&rsquo;&eacute;vaporateur <strong>plus</strong> le travail fourni par le compresseur.</p>

                                    <h5>Le d&eacute;tendeur</h5>
                                    <p>Le d&eacute;tendeur ram&egrave;ne le fluide liquide haute pression &agrave; la basse pression de l&rsquo;&eacute;vaporateur. Cette d&eacute;tente abaisse brutalement la temp&eacute;rature du fluide, qui est alors pr&ecirc;t &agrave; recevoir &agrave; nouveau de la chaleur. Le cycle recommence.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Sch&eacute;ma de l&rsquo;&eacute;changeur thermique d&rsquo;une PAC</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c1_02.webp" alt="Sch&eacute;ma d&rsquo;un &eacute;changeur thermique de pompe &agrave; chaleur" loading="lazy" decoding="async">
                                            <figcaption>&Eacute;changeur thermique : flux chaud (rouge) et flux froid (bleu) se croisent pour transf&eacute;rer les calories.</figcaption>
                                        </figure>
                                        <p>L&rsquo;&eacute;changeur est le composant qui permet le transfert de chaleur entre le fluide frigorig&egrave;ne et le milieu ext&eacute;rieur (air ou eau). Un by-pass est obligatoire pour restreindre le fonctionnement hors p&eacute;riode de chauffe. Les filtres prot&egrave;gent l&rsquo;&eacute;changeur des impuret&eacute;s et maintiennent son rendement.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Chapitre III ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>COP, SCOP, ETAS : ne pas confondre</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Erreur fr&eacute;quente</div>
                                        <h6>Le pi&egrave;ge du COP en gros caract&egrave;res</h6>
                                        <p>Un fabricant affichant &laquo; COP 5,2 &raquo; communique sur la valeur A7/W35. Sur un b&acirc;timent r&eacute;el &agrave; 45&ndash;55 &deg;C et temp&eacute;ratures n&eacute;gatives, le SCOP sera plut&ocirc;t <span class="ms-hl">3,0 &agrave; 3,8</span>.</p>
                                    </div>
                                    <div class="ms-box">
                                        <div class="ms-box-label">Notion cl&eacute;</div>
                                        <h6>Zones climatiques SCOP</h6>
                                        <p>Le SCOP est calcul&eacute; pour trois zones europ&eacute;ennes : Ath&egrave;nes (chaud), <strong>Strasbourg</strong> (moyen, r&eacute;f&eacute;rence France) et Helsinki (froid).</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Plusieurs indicateurs de performance coexistent. Leurs d&eacute;finitions m&eacute;ritent d&rsquo;&ecirc;tre distingu&eacute;es avec rigueur.</p>

                                    <h5>Le COP &mdash; valeur instantan&eacute;e de laboratoire</h5>
                                    <p>Rapport entre la puissance thermique restitu&eacute;e et la puissance &eacute;lectrique consomm&eacute;e, mesur&eacute; &agrave; un instant donn&eacute; en conditions de test normalis&eacute;es (typiquement air ext&eacute;rieur +7 &deg;C, d&eacute;part eau +35 &deg;C pour une PAC air/eau basse temp&eacute;rature). Un COP de 4 signifie 4 kW de chaleur pour 1 kW d&rsquo;&eacute;lectricit&eacute;. Valeur affich&eacute;e en gros caract&egrave;res par les fabricants, mais <strong>non repr&eacute;sentative du fonctionnement r&eacute;el</strong>.</p>

                                    <h5>Le SCOP &mdash; valeur saisonni&egrave;re pond&eacute;r&eacute;e</h5>
                                    <p>Moyenne pond&eacute;r&eacute;e du COP sur l&rsquo;ensemble d&rsquo;une saison de chauffe type, int&eacute;grant la distribution des temp&eacute;ratures ext&eacute;rieures, les cycles marche/arr&ecirc;t, les phases de d&eacute;givrage et la consommation des auxiliaires. C&rsquo;est l&rsquo;<strong>indicateur le plus honn&ecirc;te</strong> pour comparer deux PAC.</p>

                                    <h5>L&rsquo;ETAS &mdash; indicateur r&eacute;glementaire</h5>
                                    <p>D&eacute;riv&eacute; du SCOP mais exprim&eacute; en pourcentage d&rsquo;&eacute;nergie primaire. Int&egrave;gre le facteur de conversion EP de l&rsquo;&eacute;lectricit&eacute; (2,3 en France). Impos&eacute; par le r&egrave;glement ErP et figurant sur l&rsquo;&eacute;tiquette &eacute;nergie. Pour les aides MaPrimeR&eacute;nov&rsquo; et CEE, seuil d&rsquo;&eacute;ligibilit&eacute; : <span class="ms-hl">ETAS &ge; 126 %</span> en basse temp&eacute;rature, &ge; 111 % en moyenne temp&eacute;rature.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 3</span>Comparaison des trois indicateurs de performance</div>
                                        <table>
                                            <thead><tr><th>Indicateur</th><th>Nature</th><th>Conditions</th><th>Usage</th></tr></thead>
                                            <tbody>
                                                <tr><td><strong>COP</strong></td><td>Instantan&eacute;</td><td>Conditions test normalis&eacute;es</td><td>Communication fabricant</td></tr>
                                                <tr><td><strong>SCOP</strong></td><td>Saisonnier</td><td>Climat de r&eacute;f&eacute;rence</td><td>Comparaison objective</td></tr>
                                                <tr><td><strong>ETAS</strong></td><td>Saisonnier + &eacute;nergie primaire</td><td>Climat + facteur EP</td><td>&Eacute;ligibilit&eacute; aides, &eacute;tiquette</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Chapitre IV ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>L&rsquo;impact des r&eacute;gimes de temp&eacute;rature</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Chaque <strong>1 &deg;C</strong> gagn&eacute; sur la temp&eacute;rature de d&eacute;part = <span class="ms-hl">2 &agrave; 2,5 %</span> de COP gagn&eacute;.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>Passer d&rsquo;un r&eacute;gime 35 &deg;C (plancher chauffant) &agrave; 55 &deg;C (radiateurs classiques) d&eacute;grade le COP de <span class="ms-hl">35 &agrave; 45 %</span>.</p>
                                    </div>
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>R&eacute;gulation climatique</h6>
                                        <p>Loi d&rsquo;eau qui abaisse automatiquement la temp&eacute;rature de d&eacute;part &agrave; mesure que la temp&eacute;rature ext&eacute;rieure monte. Indispensable pour optimiser le SCOP r&eacute;el.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>La performance d&rsquo;une PAC d&eacute;pend fortement de <strong>deux temp&eacute;ratures</strong> : celle de la source froide (subie) et celle du puits chaud (choisie via le dimensionnement des &eacute;metteurs). Plus l&rsquo;&eacute;cart entre les deux est grand, plus le compresseur travaille, et plus le COP chute.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 4</span>Performance selon le r&eacute;gime de temp&eacute;rature</div>
                                        <table>
                                            <thead><tr><th>R&eacute;gime d&eacute;part eau</th><th>&Eacute;metteur type</th><th>COP typique</th><th>SCOP</th></tr></thead>
                                            <tbody>
                                                <tr><td>30&ndash;35 &deg;C</td><td>Plancher chauffant</td><td>&asymp; 4,5</td><td>4,0&ndash;4,5</td></tr>
                                                <tr><td>40&ndash;45 &deg;C</td><td>Radiateurs BT dimensionn&eacute;s</td><td>&asymp; 3,8</td><td>3,3&ndash;3,8</td></tr>
                                                <tr><td>50&ndash;55 &deg;C</td><td>Radiateurs standard</td><td>&asymp; 3,0</td><td>2,7&ndash;3,0</td></tr>
                                                <tr><td>60&ndash;65 &deg;C</td><td>Radiateurs anciens non r&eacute;nov&eacute;s</td><td>&asymp; 2,3</td><td>2,0&ndash;2,3</td></tr>
                                                <tr><td>&gt; 65 &deg;C</td><td>Radiateurs sur-sollicit&eacute;s</td><td>limite</td><td>fonctionnement d&eacute;grad&eacute;</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <p>C&rsquo;est pour cette raison que la pose d&rsquo;une PAC sur un logement <strong>non r&eacute;nov&eacute;</strong> avec radiateurs &agrave; 70&ndash;75 &deg;C n&rsquo;a pas le m&ecirc;me int&eacute;r&ecirc;t que sur un logement BBC avec plancher chauffant. Le duo <strong>r&eacute;novation thermique + PAC</strong> est indissociable pour atteindre les performances annonc&eacute;es. Sans r&eacute;gulation climatique (loi d&rsquo;eau), la PAC fonctionne au r&eacute;gime maximal toute la saison et le SCOP r&eacute;el s&rsquo;effondre.</p>
                                </div>
                            </div>

                            <!-- ─── Chapitre V ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Les fluides frigorig&egrave;nes et le cadre F-Gas</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Alerte</div>
                                        <h6>Fuite = bombe carbone</h6>
                                        <p>Une fuite de 1 kg de R410A &eacute;quivaut &agrave; l&rsquo;&eacute;mission de <span class="ms-hl">2 tonnes de CO&sup2;</span>. Contr&ocirc;le annuel obligatoire au-del&agrave; de 2 kg de charge.</p>
                                    </div>
                                    <div class="ms-box">
                                        <div class="ms-box-label">Notion cl&eacute;</div>
                                        <h6>Attestation de capacit&eacute;</h6>
                                        <p>La manipulation des fluides frigorig&egrave;nes est r&eacute;serv&eacute;e aux techniciens titulaires de l&rsquo;attestation de capacit&eacute; (d&eacute;cret 2007-737).</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Le fluide frigorig&egrave;ne est le vecteur du cycle thermodynamique. Les propri&eacute;t&eacute;s qu&rsquo;on lui demande sont contradictoires : bouillir &agrave; basse temp&eacute;rature, se condenser &agrave; haute temp&eacute;rature, &ecirc;tre stable, non toxique, non inflammable et peu impactant pour l&rsquo;environnement.</p>

                                    <p>Historiquement, les <strong>CFC</strong> puis les <strong>HCFC</strong> (R22) ont &eacute;t&eacute; utilis&eacute;s, avant leur interdiction pour destruction de la couche d&rsquo;ozone (protocole de Montr&eacute;al, 1987). Ils ont &eacute;t&eacute; remplac&eacute;s par les <strong>HFC</strong> (R410A, R407C) qui n&rsquo;attaquent pas l&rsquo;ozone mais pr&eacute;sentent un fort pouvoir de r&eacute;chauffement global. Le <strong>r&egrave;glement F-Gas</strong> europ&eacute;en (n&deg; 517/2014, renforc&eacute; en 2024) impose une r&eacute;duction progressive des HFC &agrave; fort GWP.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 5</span>Fluides frigorig&egrave;nes : GWP et tendances</div>
                                        <table>
                                            <thead><tr><th>Fluide</th><th>GWP (kgCO&sup2;eq/kg)</th><th>Statut</th><th>Usage courant</th></tr></thead>
                                            <tbody>
                                                <tr><td><strong>R410A</strong></td><td><span class="ms-hl">2 088</span></td><td>Phase-down, restrictions</td><td>PAC install&eacute;es 2005&ndash;2020</td></tr>
                                                <tr><td><strong>R32</strong></td><td>675</td><td>Standard actuel</td><td>PAC neuves 2020&ndash;2025</td></tr>
                                                <tr><td><strong>R290</strong> (propane)</td><td><span class="ms-hl">3</span></td><td>Alternative &laquo; verte &raquo;</td><td>PAC monobloc r&eacute;centes</td></tr>
                                                <tr><td><strong>R744</strong> (CO&sup2;)</td><td>1</td><td>Niche, haute temp&eacute;rature</td><td>CET, ECS collective</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <p>Le <strong>R32</strong> s&rsquo;est impos&eacute; comme standard sur les PAC domestiques, avec un GWP environ trois fois plus bas que le R410A. Le <strong>R290</strong> (propane) est la tendance &eacute;mergente pour 2025&ndash;2030, avec un GWP quasi nul mais une contrainte d&rsquo;inflammabilit&eacute; imposant des pr&eacute;cautions de pose (distances de s&eacute;curit&eacute;, d&eacute;tecteurs).</p>
                                </div>
                            </div>

                            <!-- ─── Chapitre VI ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">VI. </span>&Eacute;nergie primaire et bilan carbone</span>
                            </div>
                            <div class="ms-body full">
                                <div class="ms-main">
                                    <p>Une PAC consomme de l&rsquo;&eacute;lectricit&eacute;, dont le facteur de conversion en &eacute;nergie primaire est de <strong>2,3</strong> en France (coefficient Cep de la RE2020). &Agrave; SCOP = 3, le ratio &eacute;nergie primaire / &eacute;nergie utile est de 2,3 / 3 &asymp; <strong>0,77</strong>, soit 23 % d&rsquo;&eacute;conomie d&rsquo;&eacute;nergie primaire par rapport &agrave; l&rsquo;effet Joule direct (ratio 2,3).</p>

                                    <p>Pour le bilan carbone, le calcul est plus favorable encore. Le contenu CO&sup2; moyen du kWh &eacute;lectrique fran&ccedil;ais se situe autour de 60&ndash;80 gCO&sup2;/kWh. Une PAC &agrave; SCOP 3,5 &eacute;met ainsi environ <span class="ms-hl">20 gCO&sup2;/kWh</span> thermique utile, &agrave; comparer &agrave; : gaz naturel en chaudi&egrave;re condensation &asymp; 230 gCO&sup2;/kWh, fioul en chaudi&egrave;re condensation &asymp; 320 gCO&sup2;/kWh, effet Joule direct &asymp; 70&ndash;80 gCO&sup2;/kWh. La PAC est aujourd&rsquo;hui la solution de chauffage domestique la plus <strong>bas carbone</strong> en France.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Nuance</span>L&rsquo;effet de pointe hivernale</div>
                                        <p>Le contenu CO&sup2; du kWh varie selon l&rsquo;heure et la saison. Lors des pointes de consommation hivernales, RTE sollicite des centrales &agrave; gaz ou &agrave; charbon en marginal, et le contenu CO&sup2; horaire peut d&eacute;passer <span class="ms-hl">200 gCO&sup2;/kWh</span>. Une PAC mal dimensionn&eacute;e qui sollicite sa r&eacute;sistance d&rsquo;appoint aux heures de pointe perd alors une partie de son avantage carbone. D&rsquo;o&ugrave; l&rsquo;importance du bon dimensionnement (voir T5-C3).</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Synthèse ─── -->
                            <div class="ms-retiens bp-section">
                                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                                <h4>Les points essentiels du chapitre</h4>
                                <ul>
                                    <li>Une PAC <strong>transporte</strong> de la chaleur de la source froide vers le puits chaud gr&acirc;ce &agrave; un cycle frigorifique &agrave; quatre composants : <strong>&eacute;vaporateur, compresseur, condenseur, d&eacute;tendeur</strong>.</li>
                                    <li>Le <strong>compresseur</strong> est le seul poste consommateur d&rsquo;&eacute;lectricit&eacute; ; la technologie <strong>Inverter</strong> est d&eacute;sormais le standard.</li>
                                    <li><strong>COP</strong> = valeur instantan&eacute;e en conditions de test ; <strong>SCOP</strong> = valeur saisonni&egrave;re pond&eacute;r&eacute;e ; <strong>ETAS</strong> = indicateur r&eacute;glementaire en &eacute;nergie primaire. Pour les aides : <strong>ETAS &ge; 126 %</strong> en basse temp&eacute;rature.</li>
                                    <li>Chaque 1 &deg;C gagn&eacute; sur la temp&eacute;rature de d&eacute;part = 2 &agrave; 2,5 % de COP gagn&eacute;. La <strong>r&eacute;novation thermique</strong> et le <strong>plancher chauffant</strong> sont les meilleurs alli&eacute;s d&rsquo;une PAC.</li>
                                    <li>Fluides : le <strong>R32</strong> est le standard actuel (GWP 675), le <strong>R290</strong> est la tendance 2025+. Le cadre <strong>F-Gas</strong> impose contr&ocirc;les et phase-down des HFC &agrave; fort GWP.</li>
                                    <li>Une PAC &agrave; SCOP 3,5 &eacute;met ~20 gCO&sup2;/kWh utile en France, soit <strong>dix fois moins</strong> qu&rsquo;une chaudi&egrave;re gaz condensation.</li>
                                </ul>
                            </div>

                            <div class="ms-vocab bp-section">
                                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                                <dl>
                                    <dt>PAC</dt><dd>Pompe &agrave; chaleur &mdash; machine thermodynamique de transfert de chaleur.</dd>
                                    <dt>COP</dt><dd>Coefficient de Performance &mdash; rapport puissance thermique / puissance &eacute;lectrique (instantan&eacute;).</dd>
                                    <dt>SCOP</dt><dd>Seasonal COP &mdash; moyenne saisonni&egrave;re pond&eacute;r&eacute;e du COP.</dd>
                                    <dt>ETAS</dt><dd>Efficacit&eacute; &Eacute;nerg&eacute;tique Saisonni&egrave;re &mdash; SCOP converti en &eacute;nergie primaire (%).</dd>
                                    <dt>Inverter</dt><dd>Technologie de compresseur &agrave; vitesse variable, &eacute;vitant les cycles marche/arr&ecirc;t.</dd>
                                    <dt>GWP</dt><dd>Global Warming Potential &mdash; pouvoir de r&eacute;chauffement global d&rsquo;un fluide (kgCO&sup2;eq/kg).</dd>
                                    <dt>F-Gas</dt><dd>R&egrave;glement europ&eacute;en n&deg; 517/2014 encadrant les gaz fluor&eacute;s &agrave; effet de serre.</dd>
                                    <dt>Loi d&rsquo;eau</dt><dd>Courbe de r&eacute;gulation ajustant la temp&eacute;rature de d&eacute;part en fonction de la temp&eacute;rature ext&eacute;rieure.</dd>
                                </dl>
                            </div>

                            <div class="ms-sources bp-section">
                                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>Pompes &agrave; chaleur et machines thermodynamiques</em> &middot; ADEME, <em>Les pompes &agrave; chaleur</em> &middot; R&egrave;glement F-Gas (UE) n&deg; 517/2014 et r&eacute;vision 2024 &middot; D&eacute;cret 2007-737 &middot; RE2020 &middot; Norme EN 14825 (calcul SCOP).
                            </div>

                        </div>
                        <div class="bp-card-footer">
                            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69</span>
                            <span>Fiche 1 / 4 &mdash; Avril 2026</span>
                        </div>
                    </div>
                </div>


                <div class="bp-fiche" data-theme="pac" id="bpFicheT5C2">
                    <div class="bp-card ms-card">
                        <div class="bp-card-header">
                            <div class="ms-banner">
                                <div class="ms-banner-num">
                                    <small>Chapitre</small>
                                    <strong>C.2</strong>
                                </div>
                                <div class="ms-banner-text">
                                    <div class="ms-banner-eyebrow">Th&egrave;me 5 &mdash; Pompes &agrave; chaleur &middot; Fiche 2 / 4</div>
                                    <h3 class="ms-banner-title">Typologies de PAC : air/air, air/eau, eau/eau, sol/eau</h3>
                                    <div class="ms-banner-sub">Choisir la bonne famille selon le contexte, le terrain et le budget</div>
                                </div>
                            </div>
                        </div>
                        <div class="bp-card-content ms-content">

                            <p class="ms-lede">Les pompes &agrave; chaleur se d&eacute;clinent en quatre grandes familles, d&eacute;sign&eacute;es par le couple source&nbsp;/&nbsp;puits : air/air, air/eau, eau/eau, sol/eau. Chacune pr&eacute;sente des avantages, des limites et des co&ucirc;ts tr&egrave;s diff&eacute;rents. Ce chapitre d&eacute;taille chaque typologie, ses conditions d&rsquo;emploi et propose un arbre de d&eacute;cision simplifi&eacute;.</p>

                            <div class="ms-intro bp-section">
                                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                                <h4>&Agrave; la fin de cette fiche, le lecteur doit savoir :</h4>
                                <ul>
                                    <li>distinguer les <strong>quatre grandes familles</strong> de PAC selon la source froide et le puits chaud ;</li>
                                    <li>comprendre les <strong>avantages et limites</strong> de chaque typologie (performance, co&ucirc;t, contraintes) ;</li>
                                    <li>orienter le choix selon le <strong>contexte</strong> (neuf, r&eacute;novation, terrain, usage) ;</li>
                                    <li>situer les <strong>configurations particuli&egrave;res</strong> (g&eacute;othermie, VMC thermodynamique, PAC haute temp&eacute;rature).</li>
                                </ul>
                            </div>

                            <!-- ─── Chapitre I ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">I. </span>Classifier les PAC : la double d&eacute;signation source / puits</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Couple source / puits</h6>
                                        <p>Le premier terme d&eacute;signe la <strong>source froide</strong> (milieu o&ugrave; la PAC pr&eacute;l&egrave;ve la chaleur), le second le <strong>puits chaud</strong> (milieu o&ugrave; elle la restitue). Exemple : air/eau = pr&eacute;l&egrave;vement dans l&rsquo;air, restitution dans l&rsquo;eau.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>Le choix repose sur <strong>cinq crit&egrave;res</strong> : ressource disponible, usage vis&eacute;, performance attendue, budget, contraintes r&eacute;glementaires.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Une PAC se d&eacute;signe par un couple source&nbsp;/&nbsp;puits indiquant d&rsquo;o&ugrave; elle pr&eacute;l&egrave;ve la chaleur et o&ugrave; elle la restitue :</p>
                                    <ul>
                                        <li><strong>air/air</strong> : pr&eacute;l&egrave;ve dans l&rsquo;air ext&eacute;rieur, restitue dans l&rsquo;air int&eacute;rieur ;</li>
                                        <li><strong>air/eau</strong> : pr&eacute;l&egrave;ve dans l&rsquo;air ext&eacute;rieur, restitue dans l&rsquo;eau du circuit de chauffage ;</li>
                                        <li><strong>eau/eau</strong> : pr&eacute;l&egrave;ve dans une eau (nappe, puits), restitue dans l&rsquo;eau de chauffage ;</li>
                                        <li><strong>sol/eau</strong> : pr&eacute;l&egrave;ve dans le sol (capteur enterr&eacute;), restitue dans l&rsquo;eau de chauffage.</li>
                                    </ul>
                                    <p>Deux autres familles existent mais restent marginales : la <strong>PAC sur air extrait</strong> (source = VMC) et les <strong>PAC gaz &agrave; absorption</strong> (cycle chimique entra&icirc;n&eacute; par un br&ucirc;leur gaz, sans compresseur &eacute;lectrique).</p>
                                </div>
                            </div>

                            <!-- ─── Chapitre II ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">II. </span>La PAC air/air : la plus simple</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Investissement le plus faible : monosplit &agrave; partir de <span class="ms-hl">1 500 &euro;</span> install&eacute;, multisplit 3 000&ndash;6 000 &euro;.</p>
                                    </div>
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Erreur fr&eacute;quente</div>
                                        <h6>Croire que la PAC air/air produit de l&rsquo;ECS</h6>
                                        <p>La PAC air/air ne se raccorde <strong>pas</strong> &agrave; un circuit d&rsquo;eau. Elle ne produit ni eau chaude sanitaire, ni chaleur rayonnante.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>Principe</h5>
                                    <p>La PAC air/air pr&eacute;l&egrave;ve la chaleur dans l&rsquo;air ext&eacute;rieur via une unit&eacute; ext&eacute;rieure (&eacute;vaporateur + compresseur) et la restitue dans l&rsquo;air int&eacute;rieur via une ou plusieurs unit&eacute;s int&eacute;rieures (condenseur). On parle de <strong>monosplit</strong> (une unit&eacute; int&eacute;rieure) ou de <strong>multisplit</strong> (bi-split, tri-split, jusqu&rsquo;&agrave; 4-5 unit&eacute;s). Les unit&eacute;s int&eacute;rieures peuvent &ecirc;tre murales, en console basse, en cassette plafond ou en gainable.</p>

                                    <h5>Avantages</h5>
                                    <p>Investissement le plus faible de toutes les PAC. Mise en &oelig;uvre rapide (un &agrave; deux jours). R&eacute;versibilit&eacute; native : chauffage l&rsquo;hiver, climatisation l&rsquo;&eacute;t&eacute; par simple inversion du cycle. Mod&egrave;les r&eacute;cents : SCOP de <span class="ms-hl">4,0 &agrave; 4,5</span>.</p>

                                    <h5>Limites</h5>
                                    <p>Pas de production d&rsquo;ECS. Pas de raccordement aux &eacute;metteurs hydrauliques existants. Niveau sonore de l&rsquo;unit&eacute; ext&eacute;rieure (45&ndash;55 dB(A)) probl&eacute;matique en mitoyennet&eacute;. Confort inf&eacute;rieur au chauffage rayonnant : courant d&rsquo;air, ass&egrave;chement, brassage de poussi&egrave;res.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Cas d&rsquo;usage</span>Quand la PAC air/air est pertinente</div>
                                        <p>Logement bien isol&eacute; <strong>sans r&eacute;seau hydraulique</strong> (appartement r&eacute;nov&eacute; sans radiateurs), en compl&eacute;ment d&rsquo;un po&ecirc;le &agrave; bois, dans un T2 ou T3 compact, ou en r&eacute;sidence secondaire &agrave; usage intermittent. Co&ucirc;t indicatif : monosplit 1 500&ndash;3 000 &euro;, multisplit 3 000&ndash;6 000 &euro;, gainable 4 000&ndash;10 000 &euro;.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Chapitre III ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">III. </span>La PAC air/eau : le standard de la r&eacute;novation</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">&Eacute;conomie</div>
                                        <p>Aides MaPrimeR&eacute;nov&rsquo; typiquement <span class="ms-hl">2 500 &agrave; 5 000 &euro;</span> + CEE + &eacute;co-PTZ.</p>
                                    </div>
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Monobloc vs bibloc</h6>
                                        <p><strong>Monobloc</strong> : toute l&rsquo;unit&eacute; frigorifique est dehors, seule de l&rsquo;eau circule &agrave; l&rsquo;int&eacute;rieur. <strong>Bibloc</strong> (split) : le fluide frigo fait la liaison entre unit&eacute; ext&eacute;rieure et module hydraulique int&eacute;rieur.</p>
                                    </div>
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Alerte</div>
                                        <h6>R&eacute;sistance d&rsquo;appoint</h6>
                                        <p>Si la r&eacute;sistance d&rsquo;appoint fonctionne plus de <strong>50&ndash;100 h/an</strong>, la PAC est sous-dimensionn&eacute;e ou le r&eacute;gime d&rsquo;&eacute;metteurs est trop chaud.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>Principe</h5>
                                    <p>La PAC air/eau pr&eacute;l&egrave;ve la chaleur dans l&rsquo;air ext&eacute;rieur mais la restitue dans l&rsquo;<strong>eau du circuit de chauffage</strong> &mdash; radiateurs, plancher chauffant ou ventilo-convecteurs. Elle remplace directement une chaudi&egrave;re en se raccordant sur le r&eacute;seau hydraulique existant. Beaucoup de mod&egrave;les assurent aussi la production d&rsquo;ECS via un ballon int&eacute;gr&eacute; ou s&eacute;par&eacute;.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Installation d&rsquo;une PAC air/eau en r&eacute;novation</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c2_01.webp" alt="Installation d&rsquo;une PAC air/eau en r&eacute;novation" loading="lazy" decoding="async">
                                            <figcaption>PAC air/eau : l&rsquo;unit&eacute; ext&eacute;rieure pr&eacute;l&egrave;ve les calories dans l&rsquo;air, le module int&eacute;rieur alimente le circuit hydraulique.</figcaption>
                                        </figure>
                                        <p>La PAC air/eau existe en deux architectures. La <strong>monobloc</strong> place toute l&rsquo;unit&eacute; frigorifique &agrave; l&rsquo;ext&eacute;rieur : seule de l&rsquo;eau circule dans le logement, ce qui simplifie la pose mais cr&eacute;e un risque de gel en cas de coupure prolong&eacute;e. La <strong>bibloc</strong> s&eacute;pare unit&eacute; ext&eacute;rieure et module hydraulique int&eacute;rieur, reli&eacute;s par une liaison frigorifique : pas de risque de gel, mais pose plus technique et co&ucirc;t sup&eacute;rieur.</p>
                                    </div>

                                    <h5>Performance</h5>
                                    <p>SCOP annonc&eacute; typiquement entre <span class="ms-hl">3,5 et 4,5</span> selon le r&eacute;gime d&rsquo;&eacute;metteurs et le climat. Sur un logement neuf avec plancher chauffant, un SCOP sup&eacute;rieur &agrave; 4 est la norme. En r&eacute;novation avec radiateurs haute temp&eacute;rature, il faut se contenter de 2,8&ndash;3,3.</p>

                                    <h5>Points forts et limites</h5>
                                    <p>Solution la plus polyvalente : remplace directement une chaudi&egrave;re, assure chauffage + ECS, s&rsquo;adapte &agrave; tous les &eacute;metteurs, b&eacute;n&eacute;ficie des aides maximales. En contrepartie : investissement important (<span class="ms-hl">8 000 &agrave; 16 000 &euro;</span> install&eacute;), dimensionnement critique, bruit de l&rsquo;unit&eacute; ext&eacute;rieure, et performance en chute sous &minus;5 &deg;C (d&eacute;givrage fr&eacute;quent).</p>
                                </div>
                            </div>

                            <!-- ─── Chapitre IV ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">IV. </span>La g&eacute;othermie r&eacute;sidentielle : eau/eau et sol/eau</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Temp&eacute;rature du sol &agrave; 10 m de profondeur : <span class="ms-hl">10&ndash;12 &deg;C</span> en permanence, quelle que soit la saison.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>La g&eacute;othermie devient pertinente d&egrave;s que les besoins d&eacute;passent <strong>15 000 kWh/an</strong>, que le terrain le permet et que l&rsquo;occupation est &gt; 15 ans.</p>
                                    </div>
                                    <div class="ms-box">
                                        <div class="ms-box-label">Notion cl&eacute;</div>
                                        <h6>G&eacute;ocooling</h6>
                                        <p>Rafra&icirc;chissement quasi gratuit par circulation directe du fluide glycol&eacute; dans les &eacute;metteurs, sans activer le compresseur. Possible uniquement en g&eacute;othermie.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Le sol et les eaux souterraines offrent une temp&eacute;rature remarquablement stable toute l&rsquo;ann&eacute;e : 10&ndash;12 &deg;C &agrave; partir de 10 m de profondeur. Source froide bien plus favorable que l&rsquo;air ext&eacute;rieur, elle permet aux PAC g&eacute;othermiques de conserver un <strong>SCOP &eacute;lev&eacute; et stable</strong>, souvent autour de <span class="ms-hl">4,5 &agrave; 5,5</span>.</p>

                                    <h5>Capteurs horizontaux (sol/eau)</h5>
                                    <p>R&eacute;seau de tubes en poly&eacute;thyl&egrave;ne enterr&eacute; &agrave; 60&ndash;120 cm de profondeur, sur une surface de 1,5 &agrave; 2 fois la surface habitable. Rempli d&rsquo;eau glycol&eacute;e en boucle ferm&eacute;e. Solution la moins ch&egrave;re des g&eacute;othermies (15 000&ndash;25 000 &euro;), mais immobilise une grande surface de terrain sans arbres profonds ni construction.</p>

                                    <h5>Sondes verticales (sol/eau)</h5>
                                    <p>Un ou plusieurs forages de 50 &agrave; 120 m de profondeur re&ccedil;oivent des sondes en double U. Id&eacute;al quand le terrain est petit ou arbor&eacute;. Exige un foreur qualifi&eacute; et une d&eacute;claration pr&eacute;alable DREAL (dossier BSS, cadre minier). Co&ucirc;t : <span class="ms-hl">20 000&ndash;35 000 &euro;</span> install&eacute;.</p>

                                    <h5>Nappe phr&eacute;atique (eau/eau)</h5>
                                    <p>Un forage pompe l&rsquo;eau d&rsquo;une nappe, la refroidit dans l&rsquo;&eacute;vaporateur, puis la restitue via un puits de rejet. COP le meilleur de tous (<span class="ms-hl">5 &agrave; 6</span>), mais contraintes lourdes : d&eacute;bit et qualit&eacute; d&rsquo;eau suffisants, autorisations administratives, risques de colmatage et de corrosion des &eacute;changeurs.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Sch&eacute;ma d&rsquo;une PAC air/eau coupl&eacute;e &agrave; un plancher chauffant</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c2_03.webp" alt="Sch&eacute;ma d&rsquo;une PAC coupl&eacute;e &agrave; un plancher chauffant" loading="lazy" decoding="async">
                                            <figcaption>PAC aliment&eacute;e en boucle ferm&eacute;e vers un plancher chauffant basse temp&eacute;rature.</figcaption>
                                        </figure>
                                        <p>Que la source soit a&eacute;rothermique ou g&eacute;othermique, le <strong>plancher chauffant basse temp&eacute;rature</strong> (30&ndash;35 &deg;C) est l&rsquo;&eacute;metteur qui optimise le COP de la PAC. La chaleur rayonnante assure un confort homog&egrave;ne sans brassage d&rsquo;air.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Chapitre V ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">V. </span>Configurations particuli&egrave;res</span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>VMC thermodynamique</h6>
                                        <p>Machine qui exploite l&rsquo;air extrait par la VMC (150&ndash;300 m&sup3;/h &agrave; 20 &deg;C) comme source froide pour produire de l&rsquo;ECS ou un appoint de chauffage. COP &gt; 3,5 stable toute l&rsquo;ann&eacute;e.</p>
                                    </div>
                                    <div class="ms-box">
                                        <div class="ms-box-label">Notion cl&eacute;</div>
                                        <h6>PAC haute temp&eacute;rature</h6>
                                        <p>Mod&egrave;les sp&eacute;cifiques (compresseur double &eacute;tage, fluide R1234ze) atteignant 70&ndash;80 &deg;C de d&eacute;part. Remplacement direct d&rsquo;une chaudi&egrave;re sans changer les radiateurs.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>PAC sur air extrait</h5>
                                    <p>Dans un logement BBC, l&rsquo;air extrait par la VMC constitue une source froide &agrave; temp&eacute;rature ambiante, constante et d&eacute;j&agrave; en circulation. Certaines machines exploitent cette ressource pour produire de l&rsquo;ECS (chauffe-eau thermodynamique sur air extrait) ou un appoint de chauffage par air puls&eacute;. Rendement stable (COP &gt; 3,5), mais <strong>puissance limit&eacute;e</strong> par le d&eacute;bit VMC : 500 &agrave; 1 500 W thermiques utiles.</p>

                                    <h5>PAC gaz &agrave; absorption</h5>
                                    <p>Le cycle frigorifique est entra&icirc;n&eacute; par un br&ucirc;leur gaz et une r&eacute;action chimique (couple ammoniac-eau ou eau-bromure de lithium). COP en &eacute;nergie primaire de 1,3&ndash;1,6. Solution compatible avec un r&eacute;seau gaz existant et pr&eacute;sentant un meilleur bilan en pointe hivernale. Marginale en r&eacute;sidentiel individuel, int&eacute;ressante en collectif gaz et tertiaire.</p>

                                    <h5>PAC haute temp&eacute;rature</h5>
                                    <p>Mod&egrave;les &agrave; compresseur double &eacute;tage permettant des temp&eacute;ratures de d&eacute;part de <strong>70&ndash;80 &deg;C</strong>. Adapt&eacute;s au remplacement direct d&rsquo;une chaudi&egrave;re dans un logement ancien non r&eacute;nov&eacute;, sans changer les radiateurs. SCOP logiquement plus bas (2,5&ndash;3,0), mais installation simple et sans travaux secondaires.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 3</span>Sch&eacute;ma de principe d&rsquo;une PAC air/eau</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c2_02.webp" alt="Sch&eacute;ma de principe d&rsquo;une PAC air/eau" loading="lazy" decoding="async">
                                            <figcaption>Circuit frigorifique simplifi&eacute; d&rsquo;une PAC air/eau avec liaison entre unit&eacute; ext&eacute;rieure et module hydraulique.</figcaption>
                                        </figure>
                                        <p>Le fluide frigorig&egrave;ne circule entre l&rsquo;unit&eacute; ext&eacute;rieure (o&ugrave; il s&rsquo;&eacute;vapore au contact de l&rsquo;air) et le module int&eacute;rieur (o&ugrave; il se condense pour chauffer l&rsquo;eau du circuit). Cette architecture bibloc est la plus courante en r&eacute;novation.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- ─── Chapitre VI ─── -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                                <span class="ms-chap-title bp-section-title"><span class="ms-toc-num">VI. </span>Tableau de synth&egrave;se et arbre de d&eacute;cision</span>
                            </div>
                            <div class="ms-body full">
                                <div class="ms-main">
                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 4</span>Comparatif des typologies de PAC</div>
                                        <table>
                                            <thead><tr><th>Typologie</th><th>SCOP typique</th><th>Investissement</th><th>ECS</th><th>Rafra&icirc;ch.</th><th>Terrain</th></tr></thead>
                                            <tbody>
                                                <tr><td>Air/air monosplit</td><td>4,0&ndash;4,5</td><td>1 500&ndash;3 000 &euro;</td><td>Non</td><td>Oui (natif)</td><td>Aucun</td></tr>
                                                <tr><td>Air/air multisplit</td><td>3,8&ndash;4,3</td><td>3 000&ndash;6 000 &euro;</td><td>Non</td><td>Oui</td><td>Aucun</td></tr>
                                                <tr><td>Air/eau basse T</td><td>3,8&ndash;4,5</td><td>8 000&ndash;16 000 &euro;</td><td>Oui</td><td>Oui (plancher)</td><td>Aucun</td></tr>
                                                <tr><td>Air/eau haute T</td><td>2,5&ndash;3,0</td><td>10 000&ndash;18 000 &euro;</td><td>Oui</td><td>Non</td><td>Aucun</td></tr>
                                                <tr><td>Sol/eau horizontal</td><td>4,0&ndash;5,0</td><td>15 000&ndash;25 000 &euro;</td><td>Oui</td><td>G&eacute;ocooling</td><td>Grand terrain</td></tr>
                                                <tr><td>Sol/eau vertical</td><td>4,5&ndash;5,5</td><td>20 000&ndash;35 000 &euro;</td><td>Oui</td><td>G&eacute;ocooling</td><td>Forage</td></tr>
                                                <tr><td>Eau/eau nappe</td><td>5,0&ndash;6,0</td><td>15 000&ndash;30 000 &euro;</td><td>Oui</td><td>G&eacute;ocooling</td><td>Nappe</td></tr>
                                                <tr><td>VMC thermodynamique</td><td>3,0&ndash;3,8</td><td>3 000&ndash;5 000 &euro;</td><td>Oui seul</td><td>Non</td><td>VMC existante</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <h5>Arbre de d&eacute;cision simplifi&eacute;</h5>
                                    <ul>
                                        <li>Logement neuf ou r&eacute;nov&eacute; lourd + terrain disponible &rarr; <strong>g&eacute;othermie</strong> si budget.</li>
                                        <li>Maison individuelle en r&eacute;novation standard &rarr; <strong>PAC air/eau basse temp&eacute;rature</strong> (solution majoritaire).</li>
                                        <li>Appartement bien isol&eacute; sans r&eacute;seau hydraulique &rarr; <strong>PAC air/air</strong>.</li>
                                        <li>Logement ancien non r&eacute;nov&eacute;, maintien des radiateurs &rarr; <strong>PAC air/eau haute temp&eacute;rature</strong>.</li>
                                        <li>BBC/passif avec VMC double flux &rarr; <strong>VMC thermodynamique</strong> pour l&rsquo;ECS + appoint marginal.</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- ─── Synthèse ─── -->
                            <div class="ms-retiens bp-section">
                                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                                <h4>Les points essentiels du chapitre</h4>
                                <ul>
                                    <li>Une PAC se d&eacute;signe par le couple <strong>source / puits</strong> : air/air, air/eau, eau/eau, sol/eau.</li>
                                    <li>La <strong>PAC air/air</strong> est la moins ch&egrave;re et la plus rapide &agrave; poser, r&eacute;versible nativement, mais ne produit ni ECS ni chaleur rayonnante.</li>
                                    <li>La <strong>PAC air/eau</strong> est le standard de la r&eacute;novation : remplace la chaudi&egrave;re, assure chauffage + ECS, b&eacute;n&eacute;ficie des aides maximales.</li>
                                    <li>Les PAC <strong>g&eacute;othermiques</strong> offrent les meilleurs SCOP (4,5&ndash;6) et un fonctionnement silencieux, au prix d&rsquo;un investissement &eacute;lev&eacute; et de contraintes de terrain.</li>
                                    <li>Les PAC <strong>haute temp&eacute;rature</strong> permettent le remplacement direct d&rsquo;une chaudi&egrave;re sans changer les radiateurs, avec un SCOP d&eacute;grad&eacute; (2,5&ndash;3,0).</li>
                                </ul>
                            </div>

                            <div class="ms-vocab bp-section">
                                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                                <dl>
                                    <dt>Monosplit</dt><dd>PAC air/air avec une seule unit&eacute; int&eacute;rieure.</dd>
                                    <dt>Multisplit</dt><dd>PAC air/air alimentant plusieurs unit&eacute;s int&eacute;rieures depuis une unit&eacute; ext&eacute;rieure.</dd>
                                    <dt>Monobloc</dt><dd>PAC air/eau dont toute la partie frigorifique est regroup&eacute;e dans l&rsquo;unit&eacute; ext&eacute;rieure ; seule de l&rsquo;eau entre dans le logement.</dd>
                                    <dt>Bibloc</dt><dd>PAC air/eau avec unit&eacute; ext&eacute;rieure et module hydraulique int&eacute;rieur reli&eacute;s par une liaison frigorifique.</dd>
                                    <dt>G&eacute;ocooling</dt><dd>Rafra&icirc;chissement passif par circulation directe du fluide g&eacute;othermique dans les &eacute;metteurs, sans compresseur.</dd>
                                    <dt>Sonde verticale</dt><dd>Forage de 50 &agrave; 120 m contenant un &eacute;changeur en double U pour capter la chaleur du sol en profondeur.</dd>
                                    <dt>Eau glycol&eacute;e</dt><dd>M&eacute;lange eau + antigel utilis&eacute; dans les capteurs g&eacute;othermiques pour &eacute;viter le gel du circuit.</dd>
                                </dl>
                            </div>

                            <div class="ms-sources bp-section">
                                <strong>Sources</strong> &mdash; ALEC Lyon / ALTE 69, <em>Pompes &agrave; chaleur et machines thermodynamiques</em> &middot; ADEME, <em>Les pompes &agrave; chaleur</em> &middot; BRGM, <em>Guide de la g&eacute;othermie de minime importance</em> &middot; D&eacute;cret 2015-15 &middot; Programme PACTE.
                            </div>

                        </div>
                        <div class="bp-card-footer">
                            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / BRGM</span>
                            <span>Fiche 2 / 4 &mdash; Avril 2026</span>
                        </div>
                    </div>
                </div>

                <div class="bp-fiche" data-theme="pac" id="bpFicheT5C3">
                    <div class="bp-card ms-card">
                        <div class="bp-card-header">
                            <div class="ms-banner">
                                <div class="ms-banner-num">
                                    <small>Chapitre</small>
                                    <strong>C.3</strong>
                                </div>
                                <div class="ms-banner-text">
                                    <div class="ms-banner-eyebrow">Th&egrave;me 5 &mdash; Pompes &agrave; chaleur &middot; Fiche 3 / 4</div>
                                    <h3 class="ms-banner-title">Dimensionnement, installation, points de vigilance</h3>
                                    <div class="ms-banner-sub">Dimensionner au juste, poser correctement, &eacute;viter les contre-performances</div>
                                </div>
                            </div>
                        </div>
                        <div class="bp-card-content ms-content">

                            <p class="ms-lede">Une PAC mal dimensionn&eacute;e ou mal pos&eacute;e peut consommer autant qu'un convecteur &eacute;lectrique. Ce chapitre d&eacute;taille les r&egrave;gles de dimensionnement (point de bivalence, puissance juste), les contraintes d'implantation (acoustique, hydraulique, &eacute;lectrique), les qualifications obligatoires et les causes les plus fr&eacute;quentes de contre-performance sur le parc install&eacute;.</p>

                            <div class="ms-intro bp-section">
                                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                                <h4>&Agrave; la fin de cette fiche, le lecteur doit savoir :</h4>
                                <ul>
                                    <li>comprendre les enjeux du <strong>dimensionnement</strong> d'une PAC et les risques du sur- comme du sous-dimensionnement ;</li>
                                    <li>ma&icirc;triser les <strong>points critiques</strong> d'installation : implantation, acoustique, hydraulique, &eacute;lectrique ;</li>
                                    <li>conna&icirc;tre les <strong>qualifications</strong> et obligations r&eacute;glementaires (RGE, QualiPAC, attestation fluides) ;</li>
                                    <li>identifier les <strong>causes de contre-performance</strong> les plus fr&eacute;quentes sur installations existantes.</li>
                                </ul>
                            </div>

                            <!-- Chapitre I -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">I. </span>Dimensionnement : le juste plut&ocirc;t que le gros
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Bivalence parall&egrave;le</h6>
                                        <p>Mode de fonctionnement o&ugrave; la PAC et la r&eacute;sistance d'appoint travaillent simultan&eacute;ment en dessous d'une temp&eacute;rature ext&eacute;rieure donn&eacute;e (le point de bivalence), g&eacute;n&eacute;ralement entre -5 et -2 &deg;C.</p>
                                    </div>
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Une PAC correctement dimensionn&eacute;e couvre <span class="ms-hl">85 &agrave; 90 %</span> des besoins annuels en &eacute;nergie de chauffage. La r&eacute;sistance d'appoint ne fonctionne que <span class="ms-hl">&lt; 100 h/an</span>.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Contrairement &agrave; une chaudi&egrave;re, pour laquelle un l&eacute;ger surdimensionnement est b&eacute;nin (on module &agrave; la baisse), une PAC surdimensionn&eacute;e <strong>cycle en permanence</strong> entre marche et arr&ecirc;t. Cela d&eacute;grade le rendement saisonnier et r&eacute;duit la dur&eacute;e de vie du compresseur. &Agrave; l'inverse, une PAC sous-dimensionn&eacute;e sollicite en permanence sa r&eacute;sistance d'appoint &eacute;lectrique, ruinant le b&eacute;n&eacute;fice &eacute;nerg&eacute;tique de l'installation.</p>

                                    <h5>Calcul des besoins : la temp&eacute;rature de base</h5>
                                    <p>Le point de d&eacute;part est l'&eacute;valuation des d&eacute;perditions du b&acirc;timent &agrave; la temp&eacute;rature de base (temp&eacute;rature ext&eacute;rieure minimale statistique du lieu, typiquement -7 &agrave; -12 &deg;C en France). On calcule, via un bilan thermique, la puissance maximale P(base) en kW :</p>
                                    <ol>
                                        <li>Logement r&eacute;nov&eacute; BBC : <span class="ms-hl">30-50 W/m&sup2;</span>, soit 3-5 kW pour 100 m&sup2;</li>
                                        <li>Logement post-RT2005 : 50-80 W/m&sup2;, soit 5-8 kW pour 100 m&sup2;</li>
                                        <li>Logement ancien non r&eacute;nov&eacute; : <span class="ms-hl">100-150 W/m&sup2;</span>, soit 10-15 kW pour 100 m&sup2;</li>
                                    </ol>

                                    <h5>Le point de bivalence</h5>
                                    <p>La puissance nominale d'une PAC air/eau <strong>chute avec la temp&eacute;rature ext&eacute;rieure</strong> : &agrave; A-7/W35, une PAC annonc&eacute;e 8 kW &agrave; A7/W35 ne d&eacute;livre plus que 5-6 kW. Dimensionner pour couvrir 100 % de P(base) par -10 &deg;C obligerait &agrave; prendre une machine surdimensionn&eacute;e pour la majorit&eacute; de la saison. La solution consiste &agrave; choisir un point de bivalence entre <span class="ms-hl">-5 et -2 &deg;C</span> : en dessous, la r&eacute;sistance d'appoint prend le relais en compl&eacute;ment de la PAC.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Dimensionnement type pour 100 m&sup2; r&eacute;nov&eacute;s</div>
                                        <table>
                                            <thead><tr><th>Param&egrave;tre</th><th>Valeur</th></tr></thead>
                                            <tbody>
                                                <tr><td>P(base) &agrave; -10 &deg;C</td><td>5 kW</td></tr>
                                                <tr><td>PAC air/eau nominale</td><td>7 kW</td></tr>
                                                <tr><td>Point de bivalence</td><td>-3 &deg;C</td></tr>
                                                <tr><td>R&eacute;sistance d'appoint</td><td>6 kW</td></tr>
                                                <tr><td>SCOP estim&eacute;</td><td>~4,0</td></tr>
                                                <tr><td>Consommation appoint</td><td>&lt; 200 kWh/an</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <h5>Les erreurs &agrave; &eacute;viter</h5>
                                    <p><strong>Surdimensionner &laquo; par s&eacute;curit&eacute; &raquo;</strong> est l'erreur la plus fr&eacute;quente et la plus co&ucirc;teuse. Une PAC 12 kW sur un besoin de 5 kW fonctionne en courts cycles (5 min marche, 10 min arr&ecirc;t) qui d&eacute;gradent le SCOP de <span class="ms-hl">20 &agrave; 40 %</span> et usent pr&eacute;matur&eacute;ment le compresseur.</p>
                                    <p><strong>Sous-dimensionner</strong> en comptant sur la r&eacute;sistance est une autre d&eacute;rive : si le point de bivalence est trop haut (+3 &deg;C), la r&eacute;sistance tourne 500-1 000 h/an et consomme 2 000-4 000 kWh, annulant le gain.</p>
                                    <p><strong>Se fier au DPE sans v&eacute;rifier le r&eacute;gime d'&eacute;metteurs</strong> : une PAC dimensionn&eacute;e pour radiateurs 65 &deg;C aura un SCOP r&eacute;el de 2,5, tr&egrave;s en de&ccedil;&agrave; des annonces constructeurs sur plancher chauffant.</p>
                                </div>
                            </div>

                            <!-- Chapitre II -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">II. </span>Implantation et acoustique
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Alerte</div>
                                        <h6>Cour int&eacute;rieure en copropri&eacute;t&eacute;</h6>
                                        <p>Les cours int&eacute;rieures amplifient les bruits par effet de bo&icirc;te. Un ventilateur PAC plac&eacute; en cour peut rendre inhabitables plusieurs appartements voisins. Toute installation en cour doit &ecirc;tre valid&eacute;e par une <strong>mesure acoustique</strong> et par l'assembl&eacute;e g&eacute;n&eacute;rale.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>&Eacute;mergence maximale autoris&eacute;e en zone r&eacute;sidentielle : <strong>+5 dB(A)</strong> le jour, <strong>+3 dB(A)</strong> la nuit.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>L'unit&eacute; ext&eacute;rieure : distances et bruit</h5>
                                    <p>L'unit&eacute; ext&eacute;rieure d'une PAC air/eau contient le compresseur et un ventilateur h&eacute;lice, qui &eacute;mettent typiquement <strong>45 &agrave; 60 dB(A) &agrave; 1 m</strong>. Le bruit d&eacute;cro&icirc;t en 1/d&sup2; mais se propage bien au-dessus des sols durs et par nuit calme. En zone mitoyenne, une installation mal plac&eacute;e peut g&eacute;n&eacute;rer des plaintes et des contentieux.</p>
                                    <p>R&egrave;gles d'implantation :</p>
                                    <ol>
                                        <li>Distance minimale de la limite de propri&eacute;t&eacute; : <strong>3-5 m</strong> recommand&eacute;s, jamais face &agrave; la chambre du voisin</li>
                                        <li>&Eacute;loignement des surfaces r&eacute;fl&eacute;chissantes (fa&ccedil;ade aveugle, angle de murs) qui renforcent le bruit</li>
                                        <li>Pose sur <strong>plots anti-vibratiles</strong>, jamais en fixation rigide sur fa&ccedil;ade ou dalle</li>
                                        <li>Capot acoustique ou &eacute;cran anti-bruit recommand&eacute; en zone dense</li>
                                    </ol>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Unit&eacute; ext&eacute;rieure d'une PAC air/eau</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c3_02.webp" alt="Unit&eacute; ext&eacute;rieure d'une PAC install&eacute;e en ext&eacute;rieur" loading="lazy" decoding="async">
                                            <figcaption>Unit&eacute; ext&eacute;rieure d'une PAC air/eau. L'implantation doit respecter les distances r&eacute;glementaires et les recommandations acoustiques.</figcaption>
                                        </figure>
                                    </div>

                                    <h5>Le module hydraulique int&eacute;rieur</h5>
                                    <p>Le module hydraulique (sur PAC bibloc) contient les pompes de circulation, la r&eacute;gulation, l'&eacute;changeur et le ballon tampon &eacute;ventuel. Il doit &ecirc;tre plac&eacute; dans un <strong>local technique ventil&eacute;</strong> ou un cellier, &agrave; l'abri du gel, avec acc&egrave;s pour maintenance. Pr&eacute;voir un siphon de sol pour les condensats et l'eau de purge.</p>
                                </div>
                            </div>

                            <!-- Chapitre III -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">III. </span>Hydraulique : ballon tampon et &eacute;quilibrage
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Ballon tampon</h6>
                                        <p>Volume d'eau (30 &agrave; 100 L) ins&eacute;r&eacute; entre la PAC et le circuit d'&eacute;metteurs. Il lisse les cycles courts : la PAC charge le tampon en continu, puis s'arr&ecirc;te pendant que le tampon se d&eacute;charge vers les &eacute;metteurs.</p>
                                    </div>
                                    <div class="ms-box">
                                        <div class="ms-box-label">Notion cl&eacute;</div>
                                        <h6>&Eacute;quilibrage hydraulique</h6>
                                        <p>R&eacute;glage des vannes de d&eacute;bit sur chaque radiateur pour r&eacute;partir uniform&eacute;ment la chaleur. Sur un r&eacute;seau mal &eacute;quilibr&eacute;, certains radiateurs surchauffent et d'autres restent froids, ce qui oblige &agrave; monter la temp&eacute;rature de d&eacute;part &mdash; avec chute du COP.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>Quand le ballon tampon est-il indispensable ?</h5>
                                    <p>Le ballon tampon devient n&eacute;cessaire dans plusieurs configurations :</p>
                                    <ol>
                                        <li>R&eacute;seau &agrave; <strong>faible volume d'eau</strong> (plancher chauffant court, ventilo-convecteurs seuls)</li>
                                        <li>Logement avec <strong>robinets thermostatiques</strong> sur tous les radiateurs (qui isolent hydrauliquement la PAC d&egrave;s que les consignes sont atteintes)</li>
                                        <li>PAC install&eacute;e avec un <strong>syst&egrave;me de zonage</strong> (vannes qui ferment certains circuits)</li>
                                        <li>PAC &agrave; <strong>d&eacute;givrage par inversion de cycle</strong> (le tampon fournit l'&eacute;nergie pour d&eacute;givrer sans refroidir les &eacute;metteurs)</li>
                                    </ol>

                                    <h5>Volume d'eau et d&eacute;bit minimum</h5>
                                    <p>Chaque PAC a un <strong>volume d'eau minimum</strong> garanti par le constructeur (souvent <span class="ms-hl">30-50 L</span> pour les PAC 8-12 kW) et un d&eacute;bit nominal &agrave; respecter. En dessous, les protections se d&eacute;clenchent et la PAC s'arr&ecirc;te en d&eacute;faut. L'installateur doit v&eacute;rifier ces deux crit&egrave;res avant mise en service.</p>
                                </div>
                            </div>

                            <!-- Chapitre IV -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">IV. </span>&Eacute;lectrique et r&eacute;gulation
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Une PAC 8-10 kW appelle <strong>3-4 kW</strong> au compresseur + 6-9 kW de r&eacute;sistance d'appoint. V&eacute;rifier la puissance souscrite au compteur Linky.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>Au-del&agrave; de 9 kVA monophas&eacute;, le passage en <strong>triphas&eacute;</strong> est souvent n&eacute;cessaire pour les PAC de forte puissance.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>Puissance souscrite et d&eacute;lestage</h5>
                                    <p>Lors du cumul PAC + r&eacute;sistance + usages domestiques (plaques induction, four, lave-linge), la puissance appel&eacute;e peut d&eacute;passer l'abonnement. Un <strong>d&eacute;lesteur</strong> coupe prioritairement l'appoint en cas de surcharge temporaire, ce qui est coh&eacute;rent avec sa vocation d'usage marginal.</p>

                                    <h5>Loi d'eau et programmation</h5>
                                    <p>La <strong>loi d'eau</strong> (r&eacute;gulation climatique) d&eacute;finit la temp&eacute;rature de d&eacute;part cible en fonction de la temp&eacute;rature ext&eacute;rieure. Une loi d'eau bien r&eacute;gl&eacute;e permet de descendre la temp&eacute;rature de d&eacute;part au maximum (gain de COP), d'&eacute;viter les oscillations et les cycles courts, et de maintenir une temp&eacute;rature int&eacute;rieure stable.</p>
                                    <p>La <strong>programmation horaire</strong> compl&egrave;te le dispositif : abaissement nocturne de 2-3 &deg;C, coupure en absence prolong&eacute;e, consigne hors-gel &agrave; 10-12 &deg;C. Attention : un abaissement trop profond peut conduire &agrave; une relance longue et &eacute;nergivore (fonctionnement prolong&eacute; en appoint r&eacute;sistif). Sur <strong>plancher chauffant</strong>, l'abaissement est g&eacute;n&eacute;ralement d&eacute;conseill&eacute; (inertie trop forte, pas de b&eacute;n&eacute;fice mesurable).</p>
                                </div>
                            </div>

                            <!-- Chapitre V -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">V. </span>Qualifications et obligations r&eacute;glementaires
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Attestation de capacit&eacute; fluides</h6>
                                        <p>Attestation d&eacute;livr&eacute;e aux entreprises par un organisme agr&eacute;&eacute; (r&egrave;glement F-Gas). Les techniciens doivent &ecirc;tre titulaires d'une attestation d'aptitude personnelle (cat. I &agrave; IV) pour manipuler les fluides frigorig&egrave;nes.</p>
                                    </div>
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Alerte</div>
                                        <p>Sans qualification <strong>RGE QualiPAC</strong>, le client ne peut pr&eacute;tendre &agrave; aucune aide publique : MaPrimeR&eacute;nov', CEE, &eacute;co-PTZ.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>RGE QualiPAC</h5>
                                    <p>Pour b&eacute;n&eacute;ficier des aides publiques, l'entreprise installatrice doit d&eacute;tenir la qualification <strong>RGE QualiPAC</strong> (Qualit'EnR). Elle implique un r&eacute;f&eacute;rent technique form&eacute;, des audits de chantiers p&eacute;riodiques, une assurance d&eacute;cennale couvrant l'installation et un renouvellement annuel. Pour la g&eacute;othermie, des qualifications sp&eacute;cifiques existent : <strong>QualiForage</strong> (sondes verticales) et <strong>QualiPAC Chauffage + ECS</strong>.</p>

                                    <h5>Contr&ocirc;les d'&eacute;tanch&eacute;it&eacute; p&eacute;riodiques</h5>
                                    <p>Depuis 2020, les installations contenant plus de <span class="ms-hl">5 tCO&sup2;eq de fluide</span> (soit environ 2,4 kg de R410A ou 7,4 kg de R32) sont soumises &agrave; un contr&ocirc;le annuel d'&eacute;tanch&eacute;it&eacute; obligatoire. La plupart des PAC r&eacute;sidentielles (&lt; 3 kg de R32) sont en dessous de ce seuil, mais un contr&ocirc;le volontaire tous les 2-3 ans reste une bonne pratique.</p>

                                    <h5>Entretien annuel</h5>
                                    <p>Bien que non encore obligatoire au m&ecirc;me titre que celui des chaudi&egrave;res, l'entretien annuel d'une PAC est vivement recommand&eacute; : nettoyage des filtres et &eacute;changeurs, contr&ocirc;le des pressions du circuit frigo, v&eacute;rification du d&eacute;bit d'eau, test de la r&eacute;gulation, mesure du SCOP si comptage possible. Co&ucirc;t typique : <span class="ms-hl">150-250 &euro;/an</span>.</p>
                                </div>
                            </div>

                            <!-- Chapitre VI -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">VI. </span>Causes principales de contre-performance
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p><span class="ms-hl">30 &agrave; 40 %</span> des PAC install&eacute;es depuis 2015 d&eacute;livrent un SCOP significativement inf&eacute;rieur &agrave; la valeur annonc&eacute;e (source : ADEME 2022).</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Une &eacute;tude de l'ADEME a mis en &eacute;vidence que les causes de contre-performance sont identifiables et &eacute;vitables :</p>
                                    <ol>
                                        <li><strong>Surdimensionnement</strong> : premi&egrave;re cause, conduisant aux cycles courts et &agrave; l'usure pr&eacute;matur&eacute;e. Fr&eacute;quent quand l'installateur se base sur la puissance de l'ancienne chaudi&egrave;re sans refaire le bilan thermique.</li>
                                        <li><strong>R&eacute;gime d'&eacute;metteurs inadapt&eacute;</strong> : PAC install&eacute;e sur radiateurs anciens 70 &deg;C sans r&eacute;novation thermique pr&eacute;alable. Le COP chute &agrave; 2,3-2,8 au lieu des 4+ attendus.</li>
                                        <li><strong>R&eacute;gulation mal param&eacute;tr&eacute;e</strong> : loi d'eau par d&eacute;faut (trop chaude), sonde ext&eacute;rieure non activ&eacute;e, robinets thermostatiques ferm&eacute;s. Quelques heures-conseils avec le fabricant permettent de r&eacute;cup&eacute;rer <span class="ms-hl">15-25 %</span> de performance.</li>
                                        <li><strong>Fuite de fluide</strong> : une charge qui baisse d&eacute;grade progressivement le COP. Non d&eacute;tectable sans contr&ocirc;le d&eacute;di&eacute;.</li>
                                        <li><strong>Encrassement de l'&eacute;changeur ext&eacute;rieur</strong> : feuilles, poussi&egrave;res, pollens. Nettoyage &agrave; la brosse souple ou au jet basse pression, 2 fois par an minimum.</li>
                                        <li><strong>D&eacute;givrage excessif</strong> : en climat humide &agrave; 0-5 &deg;C (vall&eacute;es, bord de mer), un mod&egrave;le adapt&eacute; au climat local est essentiel.</li>
                                    </ol>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 3</span>Unit&eacute; ext&eacute;rieure givr&eacute;e en fonctionnement</div>
                                        <figure class="ms-doc-fig sm">
                                            <img src="assets/images/t4/t4c3_01.webp" alt="Unit&eacute; ext&eacute;rieure d'une PAC avec formation de givre sur l'&eacute;changeur" loading="lazy" decoding="async">
                                            <figcaption>Formation de givre sur l'&eacute;changeur ext&eacute;rieur. Un d&eacute;givrage trop fr&eacute;quent ou trop long d&eacute;grade le SCOP saisonnier.</figcaption>
                                        </figure>
                                    </div>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Bonne pratique</span>La mise en service et le suivi</div>
                                        <p>Une <strong>mise en service formelle</strong> avec remise d'un rapport (temp&eacute;ratures, pressions, d&eacute;bits, r&eacute;glages loi d'eau) est la garantie d'une installation saine. Elle doit &ecirc;tre suivie d'une <strong>visite &agrave; un an</strong> pour ajuster les r&eacute;glages apr&egrave;s une premi&egrave;re saison compl&egrave;te. Ces deux rendez-vous doivent &ecirc;tre explicitement inscrits au devis.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Synth&egrave;se -->
                            <div class="ms-retiens bp-section">
                                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                                <h4>Les points essentiels du chapitre</h4>
                                <ul>
                                    <li><strong>Dimensionner au plus juste</strong>, pas &laquo; gros par s&eacute;curit&eacute; &raquo; : une PAC surdimensionn&eacute;e cycle, s'use et consomme plus qu'une PAC correctement calibr&eacute;e.</li>
                                    <li>Le <strong>point de bivalence</strong> (-3 &agrave; -5 &deg;C) permet &agrave; la r&eacute;sistance d'appoint de couvrir les quelques heures les plus froides, sans compromettre le SCOP annuel.</li>
                                    <li><strong>Acoustique</strong> : plots anti-vibratiles, distances aux voisins, arr&ecirc;t&eacute;s pr&eacute;fectoraux. Jamais en cour ferm&eacute;e sans &eacute;tude.</li>
                                    <li><strong>Ballon tampon</strong> souvent indispensable pour lisser les cycles ; &eacute;quilibrage hydraulique essentiel pour le COP.</li>
                                    <li><strong>Qualifications obligatoires</strong> pour les aides : RGE QualiPAC, attestation de capacit&eacute; fluides pour les manipulations de frigorig&egrave;ne.</li>
                                    <li><strong>30-40 % des installations</strong> sous-performent : surdimensionnement, r&eacute;gime trop chaud, r&eacute;gulation, encrassement.</li>
                                </ul>
                            </div>

                            <div class="ms-vocab bp-section">
                                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                                <dl>
                                    <dt>Bivalence parall&egrave;le</dt><dd>Mode de fonctionnement o&ugrave; PAC et appoint travaillent simultan&eacute;ment sous le point de bivalence.</dd>
                                    <dt>Point de bivalence</dt><dd>Temp&eacute;rature ext&eacute;rieure en dessous de laquelle l'appoint &eacute;lectrique compl&egrave;te la PAC.</dd>
                                    <dt>Ballon tampon</dt><dd>R&eacute;servoir d'eau intercal&eacute; entre la PAC et les &eacute;metteurs pour lisser les cycles de fonctionnement.</dd>
                                    <dt>Loi d'eau</dt><dd>Courbe de r&eacute;gulation qui d&eacute;finit la temp&eacute;rature de d&eacute;part en fonction de la temp&eacute;rature ext&eacute;rieure.</dd>
                                    <dt>QualiPAC</dt><dd>Qualification RGE d&eacute;livr&eacute;e par Qualit'EnR pour les installateurs de pompes &agrave; chaleur.</dd>
                                    <dt>D&eacute;lesteur</dt><dd>Dispositif &eacute;lectrique qui coupe certains circuits (appoint) pour &eacute;viter de d&eacute;passer la puissance souscrite.</dd>
                                    <dt>&Eacute;quilibrage hydraulique</dt><dd>R&eacute;glage des d&eacute;bits sur chaque &eacute;metteur pour r&eacute;partir uniform&eacute;ment la chaleur.</dd>
                                </dl>
                            </div>

                            <div class="ms-sources bp-section">
                                <strong>Sources</strong> &mdash; ADEME, <em>&Eacute;tude qualit&eacute; des installations PAC en r&eacute;sidentiel</em>, 2022 &middot; AFPAC, <em>Guide de l'installateur PAC r&eacute;sidentielle</em> &middot; Qualit'EnR, <em>R&eacute;f&eacute;rentiels QualiPAC et QualiForage</em> &middot; R&egrave;glement F-Gas (UE) n&deg; 517/2014 &middot; D&eacute;cret 2007-737 (attestation de capacit&eacute; fluides).
                            </div>

                        </div>
                        <div class="bp-card-footer">
                            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / AFPAC / Qualit'EnR</span>
                            <span>Fiche 3 / 4 &mdash; Avril 2026</span>
                        </div>
                    </div>
                </div>

                <div class="bp-fiche" data-theme="pac" id="bpFicheT5C4">
                    <div class="bp-card ms-card">
                        <div class="bp-card-header">
                            <div class="ms-banner">
                                <div class="ms-banner-num">
                                    <small>Chapitre</small>
                                    <strong>C.4</strong>
                                </div>
                                <div class="ms-banner-text">
                                    <div class="ms-banner-eyebrow">Th&egrave;me 5 &mdash; Pompes &agrave; chaleur &middot; Fiche 4 / 4</div>
                                    <h3 class="ms-banner-title">Rafra&icirc;chissement : brasseur, climatiseur, PAC r&eacute;versible</h3>
                                    <div class="ms-banner-sub">Hi&eacute;rarchie des solutions, du brasseur d'air au g&eacute;ocooling passif</div>
                                </div>
                            </div>
                        </div>
                        <div class="bp-card-content ms-content">

                            <p class="ms-lede">Le parc fran&ccedil;ais de climatiseurs a quintupl&eacute; en vingt ans. Pourtant, le bon r&eacute;flexe n'est pas de &laquo; choisir sa clim &raquo; mais d'appliquer une hi&eacute;rarchie : prot&eacute;ger le b&acirc;timent d'abord, rafra&icirc;chir passivement ensuite, climatiser en dernier recours. Ce chapitre compare les solutions du brasseur d'air au g&eacute;ocooling, en passant par le climatiseur mobile, le split r&eacute;versible et le plancher rafra&icirc;chissant.</p>

                            <div class="ms-intro bp-section">
                                <div class="ms-intro-label bp-section-title">Objectifs du chapitre</div>
                                <h4>&Agrave; la fin de cette fiche, le lecteur doit savoir :</h4>
                                <ul>
                                    <li>distinguer <strong>rafra&icirc;chissement passif</strong> et <strong>rafra&icirc;chissement actif</strong> et leurs usages respectifs ;</li>
                                    <li>comparer brasseur d'air, climatiseur mobile, split et PAC r&eacute;versible ;</li>
                                    <li>comprendre le <strong>bilan &eacute;nerg&eacute;tique et carbone</strong> de chaque solution ;</li>
                                    <li>conna&icirc;tre les <strong>bonnes pratiques</strong> pour limiter le recours &agrave; la climatisation active.</li>
                                </ul>
                            </div>

                            <!-- Chapitre I -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>I</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">I. </span>La demande de rafra&icirc;chissement : un enjeu r&eacute;cent et massif
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Le taux d'&eacute;quipement en climatisation du parc r&eacute;sidentiel fran&ccedil;ais est pass&eacute; de moins de 5 % en 2000 &agrave; environ <span class="ms-hl">25 %</span> en 2024.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <h6>Strat&eacute;gie hi&eacute;rarchis&eacute;e</h6>
                                        <p>1. Protection solaire &mdash; 2. Inertie + ventilation nocturne &mdash; 3. Brasseur d'air &mdash; 4. Rafra&icirc;chissement adiabatique &mdash; 5. Climatisation active (dernier recours).</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Le rafra&icirc;chissement estival est devenu en dix ans une pr&eacute;occupation de premier plan. Le changement climatique multiplie les vagues de chaleur (canicules de 2003, 2019, 2022, 2023), les logements tr&egrave;s isol&eacute;s sont plus sensibles aux apports internes et solaires, et les attentes de confort montent avec la g&eacute;n&eacute;ralisation du t&eacute;l&eacute;travail.</p>
                                    <p>En &eacute;t&eacute;, les pointes de consommation &eacute;lectrique li&eacute;es &agrave; la climatisation sont devenues comparables aux pointes hivernales dans certaines r&eacute;gions m&eacute;ridionales, avec un contenu carbone &eacute;lev&eacute; (centrales thermiques sollicit&eacute;es en marginal). La bonne approche consiste &agrave; &eacute;puiser les solutions passives avant de recourir &agrave; la climatisation active.</p>
                                </div>
                            </div>

                            <!-- Chapitre II -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>II</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">II. </span>Le brasseur d'air : premi&egrave;re ligne de d&eacute;fense
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>Effet sensoriel</h6>
                                        <p>Le brasseur ne refroidit pas l'air &mdash; il acc&eacute;l&egrave;re l'&eacute;vaporation de la sueur et les &eacute;changes convectifs, produisant une sensation de fra&icirc;cheur &eacute;quivalente &agrave; -2 &agrave; -4 &deg;C de temp&eacute;rature ressentie.</p>
                                    </div>
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">&Eacute;conomie</div>
                                        <p>Consommation annuelle d'un brasseur : <span class="ms-hl">15-40 kWh/an</span>. Contre 500-1 500 kWh/an pour une clim. Co&ucirc;t install&eacute; : 80-400 &euro;.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Le <strong>brasseur d'air</strong> (ventilateur de plafond ou sur pied) brasse l'air existant sans le refroidir. L'air en mouvement favorise l'&eacute;vaporation de la sueur, ce qui produit une sensation de fra&icirc;cheur de <strong>2 &agrave; 4 &deg;C</strong> en moins sur la temp&eacute;rature ressentie. L'efficacit&eacute; est maximale en pr&eacute;sence humaine et quasi nulle sans occupant : inutile de laisser tourner un brasseur dans une pi&egrave;ce vide.</p>
                                    <p>Un brasseur de plafond moderne (&agrave; pas long, moteur DC) consomme <span class="ms-hl">5 &agrave; 30 W</span>, &agrave; comparer aux 500-1 500 W d'un climatiseur. L'installation est simple : suspension de luminaire standard, interrupteur variateur. Les mod&egrave;les r&eacute;cents int&egrave;grent t&eacute;l&eacute;commande, minuterie et parfois un &laquo; winter mode &raquo; (inversion du sens de rotation pour brasser l'air chaud vers le bas en hiver).</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 1</span>Brasseur d'air de plafond &agrave; pales longues</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c4_01.webp" alt="Brasseur d'air de plafond &agrave; grandes pales, moteur DC" loading="lazy" decoding="async">
                                            <figcaption>Brasseur de plafond &agrave; pales longues. Consommation 5-30 W, sensation de -2 &agrave; -4 &deg;C sur la temp&eacute;rature ressentie.</figcaption>
                                        </figure>
                                    </div>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Bonne pratique</span>Associer brasseur et volets ferm&eacute;s</div>
                                        <p>Un brasseur seul ne suffit pas si la pi&egrave;ce est en pleine lumi&egrave;re. Commencer par <strong>fermer volets et stores</strong> d&egrave;s que le soleil frappe la fa&ccedil;ade. La combinaison &laquo; volets ferm&eacute;s le jour + ventilation nocturne forte + brasseur aux heures chaudes &raquo; permet de tenir <strong>jusqu'&agrave; 34-35 &deg;C ext&eacute;rieur</strong> sans climatisation dans un logement inertiel correctement prot&eacute;g&eacute;.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Chapitre III -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>III</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">III. </span>Le climatiseur mobile : la fausse bonne id&eacute;e
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Alerte</div>
                                        <h6>&Agrave; &eacute;viter si possible</h6>
                                        <p>Le climatiseur mobile est la pire solution en rapport performance/consommation. Si aucune alternative n'est possible (locataire, copropri&eacute;t&eacute; restrictive), privil&eacute;gier un mod&egrave;le <strong>bi-bloc mobile</strong> &agrave; unit&eacute; ext&eacute;rieure d&eacute;port&eacute;e.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Le <strong>climatiseur mobile monobloc</strong> est un appareil sur roulettes avec un cycle frigorifique complet et un tuyau d'&eacute;vacuation pass&eacute; par la fen&ecirc;tre entrouverte. Le principe para&icirc;t s&eacute;duisant (&laquo; pas d'installation, on le range l'hiver &raquo;) mais il comporte deux d&eacute;fauts physiques majeurs :</p>
                                    <ol>
                                        <li><strong>D&eacute;pression parasite</strong> : l'&eacute;vacuation de l'air chaud par le tuyau aspire de l'air chaud ext&eacute;rieur par toutes les infiltrations (fen&ecirc;tres, d&eacute;fauts d'&eacute;tanch&eacute;it&eacute;), annulant en partie l'effet de refroidissement. Le rendement effectif tombe &agrave; <span class="ms-hl">30-50 %</span> de celui annonc&eacute;.</li>
                                        <li><strong>Pont thermique de la fen&ecirc;tre</strong> : l'ouverture n&eacute;cessaire pour passer le tuyau laisse entrer l'air chaud directement dans la pi&egrave;ce.</li>
                                    </ol>
                                    <p>Son <strong>EER</strong> r&eacute;el est de l'ordre de 2-2,5, contre 4-5 pour un split. Il est par ailleurs bruyant (45-55 dB, compresseur dans la pi&egrave;ce) et encombrant. Co&ucirc;t : 200-700 &euro;, co&ucirc;t d'usage environ deux fois celui d'un split pour un confort moindre.</p>
                                </div>
                            </div>

                            <!-- Chapitre IV -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>IV</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">IV. </span>Le split r&eacute;versible et la PAC air/air
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box cle">
                                        <div class="ms-box-label">Chiffre-cl&eacute;</div>
                                        <p>Un split r&eacute;versible moderne affiche un SEER de <span class="ms-hl">5 &agrave; 7</span> : 5 &agrave; 7 kWh de froid pour 1 kWh &eacute;lectrique consomm&eacute;.</p>
                                    </div>
                                    <div class="ms-box repere">
                                        <div class="ms-box-label">Rep&egrave;re</div>
                                        <p>Co&ucirc;t install&eacute; : monosplit 1 500-3 000 &euro; &middot; multisplit 2-3 pi&egrave;ces 3 000-6 000 &euro; &middot; multisplit 4-5 pi&egrave;ces 5 000-9 000 &euro;.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <p>Le <strong>climatiseur split</strong> (ou PAC air/air en mode froid) se compose d'une unit&eacute; ext&eacute;rieure (compresseur + condenseur) et d'une unit&eacute; int&eacute;rieure (&eacute;vaporateur + ventilateur), reli&eacute;es par une liaison frigorifique cuivre. En mode froid, l'&eacute;vaporateur int&eacute;rieur absorbe la chaleur de la pi&egrave;ce ; le condenseur ext&eacute;rieur la rejette dans l'air.</p>
                                    <p>Les mod&egrave;les <strong>r&eacute;versibles</strong> &mdash; quasi-totalit&eacute; des splits vendus &mdash; inversent le cycle pour assurer le chauffage en hiver. C'est exactement une <strong>PAC air/air</strong> (voir T5-C2) : la m&ecirc;me machine fournit le chaud et le froid selon la saison.</p>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 2</span>Unit&eacute; ext&eacute;rieure d'un climatiseur split</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c4_02.webp" alt="Unit&eacute; ext&eacute;rieure d'un climatiseur split install&eacute;e en fa&ccedil;ade" loading="lazy" decoding="async">
                                            <figcaption>Unit&eacute; ext&eacute;rieure d'un split r&eacute;versible. La liaison frigorifique cuivre relie l'unit&eacute; int&eacute;rieure.</figcaption>
                                        </figure>
                                    </div>

                                    <h5>Bonnes pratiques de r&eacute;glage</h5>
                                    <p>Les erreurs de r&eacute;glage multiplient souvent par deux la consommation sans am&eacute;liorer le confort :</p>
                                    <ol>
                                        <li><strong>Ne pas descendre sous <span class="ms-hl">26 &deg;C</span> en consigne</strong> : c'est l'&eacute;cart avec l'ext&eacute;rieur qui importe au confort, pas la valeur absolue. Un int&eacute;rieur &agrave; 26-27 &deg;C est confortable quand il fait 33-35 &deg;C dehors.</li>
                                        <li>Fermer portes et fen&ecirc;tres pendant le fonctionnement.</li>
                                        <li>&Eacute;viter le mode &laquo; turbo &raquo; en continu (appel de puissance maximale, chute d'efficacit&eacute;).</li>
                                        <li>Nettoyer les filtres tous les 15 jours en usage intensif : un filtre encrass&eacute; chute le SEER de <span class="ms-hl">30 %</span>.</li>
                                        <li>Orienter les volets vers le haut en mode froid (l'air froid descend naturellement).</li>
                                    </ol>

                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 3</span>Unit&eacute; int&eacute;rieure murale d'un split r&eacute;versible</div>
                                        <figure class="ms-doc-fig">
                                            <img src="assets/images/t4/t4c4_03.webp" alt="Unit&eacute; int&eacute;rieure murale d'un climatiseur split r&eacute;versible" loading="lazy" decoding="async">
                                            <figcaption>Unit&eacute; int&eacute;rieure murale. Les filtres doivent &ecirc;tre nettoy&eacute;s tous les 15 jours en p&eacute;riode d'usage intensif.</figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <!-- Chapitre V -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>V</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">V. </span>PAC air/eau r&eacute;versible et plancher rafra&icirc;chissant
                                </span>
                            </div>
                            <div class="ms-body">
                                <aside class="ms-marge">
                                    <div class="ms-box def">
                                        <div class="ms-box-label">D&eacute;finition</div>
                                        <h6>G&eacute;ocooling passif</h6>
                                        <p>Sur une PAC g&eacute;othermique, le fluide de captage (12-15 &deg;C) circule directement dans le plancher sans solliciter le compresseur. La consommation se limite aux pompes de circulation &mdash; solution la plus &eacute;conome du march&eacute; r&eacute;sidentiel.</p>
                                    </div>
                                    <div class="ms-box alerte">
                                        <div class="ms-box-label">Alerte</div>
                                        <h6>Point de ros&eacute;e</h6>
                                        <p>Ne jamais descendre en dessous du point de ros&eacute;e dans le plancher (g&eacute;n&eacute;ralement 16-18 &deg;C en eau) sous peine de <strong>condensation sur la dalle</strong>, particuli&egrave;rement en pi&egrave;ces humides ou sous-sol.</p>
                                    </div>
                                </aside>
                                <div class="ms-main">
                                    <h5>Le plancher rafra&icirc;chissant</h5>
                                    <p>Une PAC air/eau r&eacute;versible peut assurer un rafra&icirc;chissement mod&eacute;r&eacute; en injectant de l'eau fra&icirc;che (16-18 &deg;C) dans le plancher chauffant. Ce mode n'a rien &agrave; voir avec une climatisation : on ne descend pas sous le point de ros&eacute;e, donc la temp&eacute;rature de pi&egrave;ce reste entre 24 et 28 &deg;C. Le gain ressenti est de <strong>2 &agrave; 3 &deg;C</strong>.</p>
                                    <p>Le confort est excellent : pas de courant d'air, pas de bruit, sensation douce de sol frais. L'investissement additionnel par rapport &agrave; une PAC air/eau classique est faible (quelques centaines d'euros pour la vanne d'inversion et la r&eacute;gulation). Limite : la puissance de refroidissement est plafonn&eacute;e &agrave; <span class="ms-hl">50-60 W/m&sup2;</span> &mdash; insuffisant seul en canicule s&eacute;v&egrave;re.</p>

                                    <h5>G&eacute;ocooling passif sur PAC g&eacute;othermique</h5>
                                    <p>Sur une PAC g&eacute;othermique (sol/eau, eau/eau), le g&eacute;ocooling passif consiste &agrave; faire circuler le fluide de captage (&agrave; 12-15 &deg;C) directement dans le plancher, sans activer le compresseur. La consommation se r&eacute;duit &agrave; celle des pompes de circulation. C'est la solution de rafra&icirc;chissement la plus &eacute;conome du march&eacute; r&eacute;sidentiel, &agrave; condition d'avoir d&eacute;j&agrave; investi dans une g&eacute;othermie.</p>
                                    <p>Co&ucirc;t additionnel : 300-1 000 &euro; sur PAC air/eau neuve, quasi nul sur PAC g&eacute;othermique bien con&ccedil;ue.</p>
                                </div>
                            </div>

                            <!-- Chapitre VI -->
                            <div class="ms-chap bp-section">
                                <span class="ms-chap-num"><small>&sect;</small><strong>VI</strong></span>
                                <span class="ms-chap-title bp-section-title">
                                    <span class="ms-toc-num">VI. </span>Comparatif synth&eacute;tique
                                </span>
                            </div>
                            <div class="ms-body full">
                                <div class="ms-main">
                                    <div class="ms-doc">
                                        <div class="ms-doc-head"><span class="ms-doc-num">Doc. 4</span>Comparatif des solutions de rafra&icirc;chissement</div>
                                        <table>
                                            <thead>
                                                <tr><th>Solution</th><th>Puissance &eacute;lec.</th><th>EER / SEER</th><th>Refroidit ?</th><th>Co&ucirc;t install&eacute;</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>Brasseur plafond</td><td>5-30 W</td><td>n/a (sensoriel)</td><td>Non</td><td>80-400 &euro;</td></tr>
                                                <tr><td>Brasseur sur pied</td><td>30-70 W</td><td>n/a</td><td>Non</td><td>20-150 &euro;</td></tr>
                                                <tr><td>Clim mobile monobloc</td><td>800-1 500 W</td><td>EER ~2-2,5</td><td>Oui (limit&eacute;)</td><td>200-700 &euro;</td></tr>
                                                <tr><td>Split monosplit r&eacute;versible</td><td>400-1 200 W</td><td>SEER 5-7</td><td>Oui</td><td>1 500-3 000 &euro;</td></tr>
                                                <tr><td>Multisplit r&eacute;versible</td><td>800-2 500 W</td><td>SEER 5-6</td><td>Oui</td><td>3 000-9 000 &euro;</td></tr>
                                                <tr><td>PAC air/eau + plancher</td><td>400-1 500 W</td><td>SEER ~4</td><td>Mod&eacute;r&eacute;ment</td><td>+300-1 000 &euro;</td></tr>
                                                <tr><td>G&eacute;othermie + g&eacute;ocooling</td><td>~100 W (pompes)</td><td>EER &gt;10</td><td>Mod&eacute;r&eacute;ment</td><td>Inclus</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <h5>Recommandations pratiques</h5>
                                    <p>Dans un logement <strong>bien prot&eacute;g&eacute;</strong> (volets, inertie, ventilation nocturne), un brasseur de plafond suffit pour la majorit&eacute; des &eacute;t&eacute;s fran&ccedil;ais, y compris lors de pics &agrave; 34-35 &deg;C. Dans un logement mal prot&eacute;g&eacute; ou expos&eacute; &agrave; des canicules r&eacute;currentes, un <strong>split mural r&eacute;versible</strong> (monosplit ou bi-split) offre le meilleur compromis performance/co&ucirc;t. En projet neuf ou r&eacute;novation lourde, privil&eacute;gier une <strong>PAC air/eau basse temp&eacute;rature avec plancher rafra&icirc;chissant</strong>, voire une g&eacute;othermie avec g&eacute;ocooling.</p>
                                </div>
                            </div>

                            <!-- Synth&egrave;se -->
                            <div class="ms-retiens bp-section">
                                <div class="ms-retiens-label bp-section-title">Je retiens</div>
                                <h4>Les points essentiels du chapitre</h4>
                                <ul>
                                    <li>Hi&eacute;rarchie du rafra&icirc;chissement : <strong>protection solaire &rarr; inertie &rarr; ventilation nocturne &rarr; brasseur &rarr; clim active</strong> en dernier recours.</li>
                                    <li>Un <strong>brasseur d'air</strong> consomme 15-40 kWh/an contre 500-1 500 pour une clim, et offre un confort suffisant jusqu'&agrave; 32-34 &deg;C.</li>
                                    <li>Le <strong>climatiseur mobile</strong> est la moins performante des solutions actives (EER ~2) et introduit des pertes parasites par la fen&ecirc;tre.</li>
                                    <li>Le <strong>split r&eacute;versible</strong> (= PAC air/air) offre le meilleur rapport performance/co&ucirc;t : SEER 5-7, double usage chaud/froid.</li>
                                    <li>Le <strong>plancher rafra&icirc;chissant</strong> offre un confort doux mais une puissance limit&eacute;e ; le <strong>g&eacute;ocooling passif</strong> est la solution la plus efficace &eacute;nerg&eacute;tiquement.</li>
                                    <li>R&egrave;gle d'or : <strong>consigne &agrave; 26-27 &deg;C</strong>. L'&eacute;cart avec l'ext&eacute;rieur importe plus que la valeur absolue.</li>
                                </ul>
                            </div>

                            <div class="ms-vocab bp-section">
                                <div class="ms-vocab-label bp-section-title">Vocabulaire du chapitre</div>
                                <dl>
                                    <dt>Brasseur d'air</dt><dd>Ventilateur (plafond ou pied) qui acc&eacute;l&egrave;re l'air ambiant sans le refroidir, produisant un effet de fra&icirc;cheur par &eacute;vaporation cutan&eacute;e.</dd>
                                    <dt>EER</dt><dd>Energy Efficiency Ratio : rapport entre la puissance frigorifique et la puissance &eacute;lectrique absorb&eacute;e, en conditions nominales.</dd>
                                    <dt>SEER</dt><dd>Seasonal EER : efficacit&eacute; frigorifique saisonni&egrave;re, &eacute;quivalent du SCOP en mode froid.</dd>
                                    <dt>Split</dt><dd>Syst&egrave;me de climatisation en deux parties (unit&eacute; int&eacute;rieure + unit&eacute; ext&eacute;rieure) reli&eacute;es par liaison frigorifique.</dd>
                                    <dt>G&eacute;ocooling</dt><dd>Rafra&icirc;chissement passif par circulation directe du fluide g&eacute;othermique dans le plancher, sans activer le compresseur.</dd>
                                    <dt>Point de ros&eacute;e</dt><dd>Temp&eacute;rature &agrave; laquelle l'humidit&eacute; de l'air condense sur une surface froide. Seuil &agrave; ne pas franchir en plancher rafra&icirc;chissant.</dd>
                                </dl>
                            </div>

                            <div class="ms-sources bp-section">
                                <strong>Sources</strong> &mdash; ADEME, <em>Se rafra&icirc;chir sans climatisation</em> &middot; ADEME, <em>Climatisation : guide des bonnes pratiques</em> &middot; ALEC Lyon / ALTE 69, <em>Brasseur ou climatiseur : quel rafra&icirc;chissement choisir ?</em>, 2023 &middot; Observ'ER, <em>Baromètre du parc de climatiseurs</em> &middot; Sant&eacute; publique France, <em>Recommandations canicule</em>.
                            </div>

                        </div>
                        <div class="bp-card-footer">
                            <span>Donn&eacute;es : ADEME / ALEC / ALTE 69 / Observ'ER</span>
                            <span>Fiche 4 / 4 &mdash; Avril 2026</span>
                        </div>
                    </div>
                </div>`;

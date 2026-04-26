const CREDIT_AIM_EN = {
    'Ene01': {
        aim: "To minimise the energy consumption and carbon emissions from regulated energy uses and to maximise the use of low carbon energy sources.",
        criteria: [
            { points: "Up to nine credits – Calculated energy performance compared to a baseline building", numbered: [
                { num: "1", text: "Calculate the overall Energy Performance Ratio (EPRINC) using:", subitems: [
                    { num: "1.a", text: "Option 1 – Performance improvement compared to local building regulations: There is a National Calculation Method (NCM) in the country of assessment that allows the design team to carry out a full energy performance analysis. See M2.1." },
                    { num: "1.b", text: "Option 2 – Performance improvement compared to ASHRAE baseline values: Energy performance analysis is carried out using an alternative approved software tool compared to relevant ASHRAE baseline values. See M2.2." },
                ]},
            ]},
            { points: "Up to three exemplary credits – Beyond zero net regulated carbon", numbered: [
                { num: "2", text: "The building has been modelled using option 1 or option 2 and the modelling results demonstrates that at least 100% of the building\'s regulated energy requirements are met by eligible low and zero carbon (LZC) technologies (see M3)." },
                { num: "3", text: "The number of BREEAM credits awarded is based on the percentage of the building\'s operational energy use that is met by LZC sources (see Table 27 below)." },
            ]},
        ],
        tables: [
            { title: "Table 26", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 26: Ene 01 EPRINC performance scale</div><table class=\"criteria-table\"><tbody><tr><th>BREEAM credits</th><th>EPR</th><th>Minimum standard – Fully fitted and Shell and core</th><th>Minimum standard – Shell only</th></tr><tr><td>1</td><td>≥ 0.1</td><td>-</td><td>-</td></tr><tr><td>2</td><td>≥ 0.2</td><td>-</td><td>-</td></tr><tr><td>3</td><td>≥ 0.3</td><td>-</td><td>-</td></tr><tr><td>4</td><td>≥ 0.4</td><td rowspan=\"2\">Excellent*</td><td rowspan=\"6\">Excellent***</td></tr><tr><td>5</td><td>≥ 0.5</td></tr><tr><td>6</td><td>≥ 0.6</td><td rowspan=\"4\">Outstanding**</td></tr><tr><td>7</td><td>≥ 0.7</td></tr><tr><td>8</td><td>≥ 0.8</td></tr><tr><td>9</td><td>≥ 0.9</td></tr><tr class=\"section-header\"><td colspan=\"4\">*Alternatively, shell and core and fully fitted buildings may meet the minimum OEPNC scores specified in Ene 02.<br><br>**Alternatively, shell and core and fully fitted buildings may meet the minimum OEPNC scores specified in Ene 02.<br><br>***Shell only buildings may adopt the fabric performance optimisation approach specified in Ene 04.</td></tr></tbody></table></div>" , after_num: "1" },
            { title: "Table 27", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 27: Exemplary credits for beyond net zero regulated carbon</div><table class=\"criteria-table\"><tbody><tr><th>BREEAM credits</th><th>Percentage of operational energy use that is met by LZC sources</th></tr><tr><td>1 exemplary</td><td>≥ 100% regulated energy use</td></tr><tr><td>2 exemplary</td><td>≥ 100% regulated energy use AND ≥ 50% unregulated energy use</td></tr><tr><td>3 exemplary</td><td>≥ 100 %regulatedenergy use AND ≥ 100 %unregulatedenergy use</td></tr></tbody></table></div>" , after_num: "3" },
        ]
    },
    'Ene02': {
        aim: "This issue encourages and rewards the use of detailed energy modelling to explore the impact of occupancy and use patterns, encourage design choices that mitigate risks relating to underperformance in use and generate a realistic prediction of operational energy consumption and carbon emissions in use to facilitate comparison with benchmarks.",
        criteria: [
            { points: "Up to five credits – Predictive energy modelling process", numbered: [] },
            { points: "One credit – Energy strategy", numbered: [
                { num: "1", text: "Define an energy strategy for the building at the concept design stage that describes qualitatively how the operational energy and carbon performance of the building will be minimised (see M1.1)." },
            ]},
            { points: "Three credits – Predictive energy modelling", numbered: [
                { num: "2", text: "Estimate unregulated energy uses and occupancy patterns for the building (see M1.2.1)." },
                { num: "3", text: "Construct a detailed energy model during the technical design stage and undertake sensitivity analysis and scenario modelling to explore the impact of key parameters and assumptions on energy consumption (see M1.2.2)." },
                { num: "4", text: "Predict annual operational energy consumption in use by fuel type for the building based on the scenario modelling. The modelling must be updated at the post-construction stage to account for any changes to the building specification (see M1.2.3 and M1.2.4)." },
            ]},
            { points: "One credit – Risk assessment and mitigation", numbered: [
                { num: "5", text: "Achieve the predictive energy modelling credits." },
                { num: "6", text: "Highlight any significant design, technical, and process risks that might prevent the buildings achieving energy performance target and indicate how these risks will be mitigated throughout the construction and commissioning process (see M1.3)." },
            ]},
            { points: "Up to seven credits – Predicted operational energy performance score", numbered: [
                { num: "7", text: "Achieve the predictive energy modelling credits." },
                { num: "8", text: "Credits are awarded based on the Operational Energy Performance score for New Construction (OEPNC) as shown in Table 28 below (see M2)." },
            ]},
            { points: "One exemplary credit – Disclosing an in-use energy performance target", numbered: [
                { num: "9", text: "An in-use energy performance target has been disclosed to stakeholders and been made publicly available prior to practical completion (see M3)." },
            ]},
            { points: "One exemplary credit – Third-party validation of predictive energy modelling", numbered: [
                { num: "10", text: "The predicted energy consumption modelling results have undergone third-party validation (see M4)." },
            ]},
            { points: "One exemplary credit – Preparing for in-use measurement of energy consumption", numbered: [
                { num: "11", text: "Achieve maximum available credits in Ene 03 Energy monitoring." },
                { num: "12", text: "The energy modelling outputs include a breakdown of the energy use by sub-meter that aligns with the energy monitoring strategy for the building." },
            ]},
            { points: "One exemplary credit – Commitment to measure energy consumption in-use", numbered: [
                { num: "13", text: "The client or building occupier commits funds to pay for the in-use energy consumption to be measured by a suitably qualified energy assessor once the building reaches the occupancy threshold (see M5)." },
                { num: "14", text: "No fossil fuels will be used by the building in operation (see M6)." },
            ]},
        ],
        tables: [
            { title: "Table 28", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 28: Credits awarded according to OEPNC</div><table class=\"criteria-table\"><tbody><tr><th>Operational energy performance score OEP</th><th>Number of credits</th><th>Minimum standard*</th></tr><tr><td>≥ 0.1429</td><td>1</td><td></td></tr><tr><td>≥ 0.2857</td><td>2</td><td></td></tr><tr><td>≥ 0.4286</td><td>3</td><td rowspan=\"2\">Excellent*</td></tr><tr><td>≥ 0.5714</td><td>4</td></tr><tr><td>≥ 0.7143</td><td>5</td><td rowspan=\"3\">Outstanding** AND No fossil fuels on- site( criterion 14)</td></tr><tr><td>≥ 0.8571</td><td>6</td></tr><tr><td>≥ 1.0</td><td>7</td></tr><tr><td colspan=\"3\">*Alternatively meet the minimum EPRINC score specified for Excellent in Ene 01. **Alternatively meet the minimum EPRINC score specified for Outstanding in Ene 01.</td></tr></tbody></table></div>" , after_num: "8" },
        ]
    },
    'Ene03': {
        aim: "To encourage installation of energy sub-metering to monitor operational energy consumption. To enable predicted and actual energy performance to be compared and to inform ongoing energy management.",
        criteria: [
            { points: "One credit – Energy monitoring by end-use", numbered: [
                { num: "1", text: "Identify the energy sources that will be used by the building and estimate the annual energy consumption for the following (see M1):", subitems: [
                    { num: "1.a", text: "Grid supply electricity" },
                    { num: "1.b", text: "Grid supply gas" },
                    { num: "1.c", text: "District heating" },
                    { num: "1.d", text: "District cooling" },
                    { num: "1.e", text: "Renewable electricity generated on-site." },
                ]},
                { num: "2", text: "Energy monitoring is installed that allows ≥ 90% of the estimated annual energy consumption for each energy source to be assigned to an end-use category (see M2)." },
                { num: "3", text: "Renewable electricity generated on-site and exported from the building must be separately monitored." },
                { num: "4", text: "There is an energy metering system appropriate for the size of the building:", subitems: [
                    { num: "4.a", text: "For buildings with a gross internal area ≥ 1000 m², the energy meters are connected to an energy monitoring and management system." },
                    { num: "4.b", text: "For buildings with a gross internal area < 1000 m², the energy meters are either:", subitems: [
                        { num: "4.b.i", text: "Connected to an appropriate energy monitoring and management system. OR" },
                        { num: "4.b.ii", text: "Are accessible meters with pulsed outputs or other open protocol communication outputs." },
                    ]},
                ]},
                { num: "5", text: "Those responsible for monitoring the building\'s energy consumption can clearly identify the end-use category covered by each meter." },
            ]},
            { points: "One credit – Energy monitoring for different occupiers and functional areas", numbered: [
                { num: "6", text: "Energy monitoring is installed that allows energy consumption to be assigned to separately tenanted or occupied areas and to relevant functional areas within the building (see M3)." },
                { num: "7", text: "There is an energy metering system appropriate for the size of the building:", subitems: [
                    { num: "7.a", text: "For buildings with a gross internal area ≥ 1000 m², the energy meters must be connected to an energy monitoring and management system." },
                    { num: "7.b", text: "For buildings with a gross internal area < 1000 m², the energy meters are either:", subitems: [
                        { num: "7.b.i", text: "Connected to an appropriate energy monitoring and management system. OR" },
                        { num: "7.b.ii", text: "Are accessible meters with pulsed outputs or other open protocol communication outputs." },
                    ]},
                ]},
                { num: "8", text: "Those responsible for monitoring the building\'s energy consumption can clearly identify the functional or occupier area covered by each meter." },
            ]},
        ]
    },
    'Ene04': {
        aim: "To encourage design measures that reduce energy demand and the installation of local low and zero carbon energy generation technologies to reduce carbon emissions.",
        criteria: [
            { points: "One credit – Building form optimisation", numbered: [
                { num: "1", text: "The project team carries out an analysis of the site and proposed development during the Concept Design stage to explore the effect of building form on energy demand (see M1)." },
                { num: "2", text: "Demonstrate that the analysis has informed the building design and will lead to a reduction in building energy consumption in use." },
            ]},
            { points: "Up to two credits – Fabric performance optimisation", numbered: [
                { num: "3", text: "The project team carries out an analysis of the proposed development to explore the impact of alternative fabric specifications on the building\'s demand for heating and cooling." },
            ]},
            { points: "One credit – 5% reduction in building energy demand", numbered: [
                { num: "4", text: "Achieve criterion 3." },
                { num: "5", text: "Implement fabric performance measures which reduce the overall building heating and cooling energy demand by ≥ 5% compared to minimum values set by building regulations." },
            ]},
            { points: "Two credits – 10% reduction in building energy demand", numbered: [
                { num: "6", text: "Achieve criterion 3." },
                { num: "7", text: "Implement fabric performance measures which reduce the overall building heating and cooling energy demand by ≥ 10% compared to minimum values set by building regulations." },
            ]},
            { points: "Two credits – Fabric performance has been optimised", numbered: [
                { num: "8", text: "Demonstrate that the fabric specification has minimised the demand for heating and cooling." },
            ]},
            { points: "Up to two credits – Low and zero carbon energy generation technologies", numbered: [] },
            { points: "One credit – Installation of LZC energy generation technologies", numbered: [
                { num: "9", text: "One or more eligible LZC energy generation technologies have been installed by competent installers." },
            ]},
            { points: "One credit – Meeting LZC energy generation targets", numbered: [
                { num: "10", text: "Achieve the 'Installation of LZC energy generation technologies' credit (criterion 9)." },
                { num: "11", text: "The energy generated by the installed LZC energy generation technologies meet the following targets:", subitems: [
                    { num: "11.a", text: "Where photovoltaic (PV) panels are the only LZC energy generation technology installed, the electricity generated must:", subitems: [
                        { num: "11.a.i", text: "Be equal to, or exceed, that generated by reference PV panels covering 50% of the ground floor area." },
                        { num: "11.a.ii", text: "Account for ≥ 60% of the building\'s annual electricity consumption." },
                    ]},
                    { num: "11.b", text: "Where only LZC energy generation technologies other than PV panels are installed, the energy generated must:", subitems: [
                        { num: "11.b.i", text: "Be equal to, or exceed, 137 kWh/year/m² of ground floor area." },
                        { num: "11.b.ii", text: "Meet ≥ 60% of the building\'s annual demand for the relevant energy source." },
                    ]},
                    { num: "11.c", text: "Where the installed LZC energy generation technologies include both PV panels and other LZC energy generation technologies, selected generation targets as listed in 11.a and 11.b should be used in conjunction scaled proportionally to the amount of electricity generated by each technology (see M3.4)." },
                ]},
            ]},
        ]
    },
    'Ene05': {
        aim: "To recognise and encourage the procurement of energy efficient equipment to minimise energy consumption and carbon emissions in operation.",
        criteria: [
            { points: "Up to five credits – Energy efficient equipment", numbered: [
                { num: "1", text: "Identify items of equipment in the project specification (in-scope equipment) that are users of unregulated energy (see M1)." },
                { num: "2", text: "Estimate the expected annual energy consumption by the in-scope equipment identified in criterion 1 (see M2)." },
                { num: "3", text: "Determine the ratio of in-scope unregulated energy use by equipment to regulated energy use to determine the number of credits available (see Table 30 below and M3)." },
                { num: "4", text: "Determine which in-scope equipment items are energy efficient (see M4)." },
            ]},
        ],
        tables: [
            { title: "Table 30", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 30: Energy efficient equipment credits available</div><table class=\"criteria-table\"><tbody><tr><th>In-scope unregulated energy use by equipment / regulated energy use (%)</th><th>credits available</th></tr><tr><td>No in- scope equipment OR Energy consumption of in- scope equipment is not significant</td><td>Issue filtered out</td></tr><tr><td>&lt; 10%</td><td>1</td></tr><tr><td>≥ 10% and &lt; 20%</td><td>2</td></tr><tr><td>≥ 20% and &lt; 30%</td><td>3</td></tr><tr><td>≥ 30% and &lt; 40%</td><td>4</td></tr><tr><td>≥ 40%</td><td>5</td></tr></tbody></table></div>" , after_num: "3" },
        ]
    },
    'Ene06': {
        aim: "To recognise and encourage the procurement of energy efficient systems to minimise energy and carbon emissions in operation.",
        criteria: [
            { points: "Up to nine credits – Energy efficient systems", numbered: [
                { num: "1", text: "Identify systems in the project specification (in-scope systems) that are users of unregulated energy (see M1)." },
                { num: "2", text: "Estimate the expected annual energy consumption by in-scope systems identified in criterion 1 (see M2)." },
                { num: "3", text: "Determine the ratio of in-scope unregulated energy used by systems to regulated energy use to determine the number of credits available (see Table 32 below and M3)." },
                { num: "4", text: "Determine in-scope systems that are energy efficient (see M4)." },
            ]},
        ],
        tables: [
            { title: "Table 32", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 32: Credits available</div><table class=\"criteria-table\"><tbody><tr><th>In-scope unregulated energy using systems / regulated energy use</th><th>credits available</th></tr><tr><td>No in- scope equipment OR Energy consumption of in- scope systems is not significant</td><td>Issue filtered out</td></tr><tr><td>&lt; 10%</td><td>1</td></tr><tr><td>≥ 10-20%</td><td>2</td></tr><tr><td>≥ 20-30%</td><td>3</td></tr><tr><td>≥ 30-40%</td><td>4</td></tr><tr><td>≥ 40-50%</td><td>5</td></tr><tr><td>≥ 50-60%</td><td>6</td></tr><tr><td>≥ 60-70%</td><td>7</td></tr><tr><td>≥ 70-80%</td><td>8</td></tr><tr><td>≥ 80%</td><td>9</td></tr></tbody></table></div>" , after_num: "3" },
        ]
    },
    'Ene07': {
        aim: "This issue recognises installed electrical building systems which have the capability to automatically modify their electricity consumption patterns in response to signals from the electricity supplier. This allows consumption patterns to be aligned with the availability of renewable energy and so reduce carbon emissions from grid supply electricity.",
        criteria: [
            { points: "Up to two credits – Flexible demand response", numbered: [
                { num: "1", text: "Identify installed systems present on-site and their flexible demand response capability." },
                { num: "2", text: "The number of credits awarded is based on the number of credits available and the percentage of flexible demand response points awarded (see Table 39)." },
            ]},
        ],
        tables: [
            { title: "Table 39", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 39: Number of credits awarded</div><table class=\"criteria-table\"><tbody><tr><th>points awarded</th><th>1 credit available</th><th>2 credits available</th></tr><tr><td>≥ 1% of available points</td><td>1 credit awarded</td><td>1 credit awarded</td></tr><tr><td>&gt; 33% of available points</td><td>1 credit awarded</td><td>2 credits awarded</td></tr></tbody></table></div>" , after_num: "2" },
        ]
    },
    'Ene08': {
        aim: "To encourage the installation of controls that facilitate energy efficient operation of HVAC systems in use.",
        criteria: [
            { points: "Up to two credits – Installed controls", numbered: [
                { num: "1", text: "Determine the number of installed controls points available based on the installed HVAC services and relevant system details." },
                { num: "2", text: "Determine the number of installed controls points achieved based on the functionality of the controls." },
                { num: "3", text: "The number of credits awarded is determined by the proportion of available installed controls points that are achieved (see Table 42 on the next page and M1)." },
            ]},
        ],
        tables: [
            { title: "Table 42", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 42: Credits for installed controls</div><table class=\"criteria-table\"><tbody><tr><th>Percentage of available installed control points achieved</th><th>Number of credits</th></tr><tr><td>&lt; 33%</td><td>0</td></tr><tr><td>≥ 33%</td><td>1</td></tr><tr><td>≥ 66%</td><td>2</td></tr></tbody></table></div>" , after_num: "3" },
        ]
    },
    'Hea01': {
        aim: "To ensure daylighting is considered at the design stage and ensure best practice in visual performance, visual comfort, and overall wellbeing for building occupants.",
        criteria: [
            { points: "One credit – Glare control", numbered: [
                { num: "2", text: "Identify areas at risk of glare using a glare control assessment. The glare control assessment also justifies any areas deemed not at risk of glare." },
                { num: "3", text: "Where risk has been identified within a relevant building area, a glare control strategy is used to design out the potential for glare (see M2)." },
                { num: "4", text: "The glare control strategy does not increase energy consumption used for lighting. This is achieved by:", subitems: [
                    { num: "4.a", text: "Maximising daylight levels in all weather (cloudy or sunny)." },
                    { num: "4.b", text: "Ensuring the use or location of shading does not conflict with the operation of lighting control systems." },
                ]},
            ]},
            { points: "Up to two credits – Daylighting", numbered: [
                { num: "5", text: "Daylighting criteria have been met using one of the options outlined in Table 13 on page 85 (see M3.2):", subitems: [
                    { num: "5.a", text: "The relevant building areas meet good practice average and minimum point daylight illuminance criteria as outlined in Table 13 on page 85." },
                    { num: "5.b", text: "The relevant building areas meet any level of recommendation using the daylight illuminance criteria in EN 17037:2018+A1:2021.(3)" },
                    { num: "5.c", text: "The relevant building areas achieve at least 'nominally accepted' daylight sufficiency as per IES LM-83-23.(4)" },
                ]},
            ]},
            { points: "One credit – Direct sunlight to windows", numbered: [
                { num: "6", text: "Achieve at least one credit for \'Daylighting\' (criterion 5)." },
                { num: "7", text: "All relevant units have at least one relevant area that receives at least 3 hours of direct sunlight at windows on equinox day (21 March or 21 September, as the average representation of annual conditions) assuming a cloudless sky (see M4)." },
            ]},
            { points: "One credit – View out", numbered: [
                { num: "8", text: "At least 95% of the floor area in 95% of spaces for each relevant building area are within the distances of a window or permanent opening that provides an adequate view out (see Definitions and M5), as outlined in Table 12 below." },
                { num: "9", text: "At least 75% of the floor area in 95% of spaces for each relevant building area can meet both of the following criteria:", subitems: [
                    { num: "9.a", text: "Horizontal sight angle ≥ 28° AND" },
                    { num: "9.b", text: "The landscape layer and at least one additional layer (sky or ground) are visible through a permanent opening (see M5.4)." },
                ]},
            ]},
            { points: "One exemplary credit – Evaluating glare from daylight", numbered: [
                { num: "10", text: "Achieve the credit for \'Glare control\' (criteria 2–4)." },
                { num: "11", text: "An evaluation has been undertaken to demonstrate compliance with either of the following and M6:", subitems: [
                    { num: "11.a", text: "The Daylight Glare Probability (DGP) does not exceed 0.40 over more than 5% of annual operating hours at all workstations in all relevant building areas." },
                    { num: "11.b", text: "Annual Sunlight Exposure ASE1000, 250 ≤ 10% of an occupied space. This means no more than 10% of the occupied space in all relevant building areas can receive a daylight illuminance of ≥ 1000 lux for ≥ 250 hours per year." },
                ]},
            ]},
            { points: "One exemplary credit – Daylighting", numbered: [
                { num: "12", text: "Daylighting criteria have been met using one of the following options:", subitems: [
                    { num: "12.a", text: "Relevant building areas meet exemplary criteria for average and minimum point daylight illuminance as outlined in Table 14 on page 87." },
                    { num: "12.b", text: "Relevant building areas meet the highest rating in EN 17037:2018+A1:2021 OR IES LM-83-23 and the relevant criteria in Table 14 on page 87." },
                ]},
            ]},
        ],
        tables: [
            { title: "Table 12", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 12: Window or opening size required as a percentage of surrounding wall area depending on the distance of the desk or work space to the window or opening</div><table class=\"criteria-table\"><tbody><tr><th>Distance from window to workspace or desk, X( in metres)</th><th>Window or opening size (as % of surrounding wall area)</th></tr><tr><td>X&lt;8</td><td>20%</td></tr><tr><td>8 ≤ X ≤ 11</td><td>25%</td></tr><tr><td>11 &lt; X ≤ 14</td><td>30%</td></tr><tr><td>X &gt; 14</td><td>35%</td></tr></tbody></table></div>" , after_num: "8" },
            { title: "Table 13", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 13: Space type and illuminance requirements – in Option 1 both criteria (average illuminance and minimum point illuminance) must be met</div><table class=\"criteria-table\"><tbody><tr><th rowspan=\"2\">Area type</th><th colspan=\"2\">Minimum area to comply</th><th colspan=\"2\">Option 1: Good practice criteria</th><th rowspan=\"2\">Option 2: EN 17037</th><th rowspan=\"2\">Option 3: IES LM- 83</th></tr><tr><td>1 credit</td><td>2 credits</td><td>Average daylight illuminance ( averaged over entire space)</td><td>Minimum daylight illuminance at worst lit point</td></tr><tr class=\"section-header\"><td colspan=\"7\">Education buildings (up to 2 credits available)</td></tr><tr><td>Preschools, schools, crèche –occupied spaces</td><td>-</td><td rowspan=\"2\">80%</td><td rowspan=\"2\">At least 300 lux for 2000 hours per year or more</td><td rowspan=\"2\">At least 90 lux for 2000 hours per year or more</td><td rowspan=\"2\">any level of recommendation using the daylight illuminance criteria in EN 17037</td><td rowspan=\"2\">at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr><td>Universities, colleges and higher education– occupied spaces</td><td>60%</td></tr><tr class=\"section-header\"><td colspan=\"7\">Residential institutions and Hospitality (1 credit available*)</td></tr><tr><td>Kitchens</td><td rowspan=\"2\">100%</td><td>-</td><td rowspan=\"2\">At least 100 lux for 3450 hours per year or more</td><td rowspan=\"2\">At least 30 lux for 3450 hours per year or more</td><td rowspan=\"3\">any level of recommendation using the daylight illuminance criteria in EN 17037</td><td rowspan=\"3\">at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr><td>Living rooms, dining rooms, studies ( including home offices)</td><td>-</td></tr><tr><td>Non- residential or communal occupied spaces</td><td>80%</td><td>-</td><td>At least 200 lux for 2650 hours per year or more</td><td>At least 60 lux for 2650 hours per year or more</td></tr><tr class=\"section-header\"><td colspan=\"7\">Residential (2 credits available**)</td></tr><tr><td>Kitchens</td><td>100%</td><td>-</td><td rowspan=\"2\">At least 100 lux for 3450 hours per year or more</td><td rowspan=\"2\">At least 30 lux for 3450 hours per year or more</td><td rowspan=\"2\">any level of recommendation using the daylight illuminance criteria in EN 17037</td><td rowspan=\"2\">at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr><td>Living rooms, dining rooms, studies ( including home offices)</td><td>100%</td><td>-</td></tr><tr class=\"section-header\"><td colspan=\"7\">Retail buildings (2 credits available**)</td></tr><tr><td>Sales areas</td><td>35%</td><td>-</td><td colspan=\"2\">At least 200 lux point daylight illuminances for 2650 hours per year or more</td><td rowspan=\"2\">any level of recommendation using the daylight illuminance criteria in EN 17037</td><td rowspan=\"2\">at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr><td>other occupied areas</td><td>80%</td><td>-</td><td>At least 200 lux for 2650 hours per year or more</td><td>At least 60 lux for 2650 hours per year or more</td></tr><tr class=\"section-header\"><td colspan=\"7\">Office buildings (2 credits)</td></tr><tr><td>All occupied spaces, unless indicated in Definitions on page 94</td><td>-</td><td>80%</td><td>At least 300 lux for 2000 hours per year or more</td><td>At least 90 lux for 2000 hours per year or more</td><td>any level of recommendation using the daylight illuminance criteria in EN 17037</td><td>at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr class=\"section-header\"><td colspan=\"7\">Healthcare buildings (2 credits available*)</td></tr><tr><td>Staff and public areas</td><td rowspan=\"2\">80%</td><td>-</td><td rowspan=\"2\">At least 300 lux for 2000 hours per year or more</td><td rowspan=\"2\">At least 90 lux for 2000 hours per year or more</td><td rowspan=\"4\">any level of recommendation using the daylight illuminance criteria in EN 17037</td><td rowspan=\"4\">at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr><td>Occupied patients\'areas ( dayrooms, wards) and consulting rooms</td><td>-</td></tr><tr><td>Staff and public areas</td><td>-</td><td rowspan=\"2\">80%</td><td rowspan=\"2\">At least 300 lux for 2650 hours per year or more</td><td rowspan=\"2\">At least 90 lux for 2650 hours per year or more</td></tr><tr><td>Occupied patients\'areas ( dayrooms, wards) and consulting rooms</td><td>-</td></tr><tr class=\"section-header\"><td colspan=\"7\">Industrial and all Other building types (1 credit available*)</td></tr><tr><td>Internal association or atrium area</td><td rowspan=\"3\">80%</td><td>-</td><td>At least 300 lux for 2650 hours per year or more</td><td>At least 210 lux for 2650 hours per year or more</td><td rowspan=\"3\">any level of recommendation using the daylight illuminance criteria in EN 17037</td><td rowspan=\"3\">at least 'nominally accepted' daylight sufficiency as per IES LM-83</td></tr><tr><td>Teaching, lecture and seminar spaces</td><td>-</td><td rowspan=\"2\">At least 300 lux for 2000 hours per year or more</td><td rowspan=\"2\">At least 90 lux for 2000 hours per year or more</td></tr><tr><td>All occupied spaces, unless indicated in Definitions on page 94</td><td>-</td></tr><tr class=\"section-header\"><td colspan=\"7\">Notes:  *Allspacesmustcomplytoachieve 1 credit.  **Eachspacecanbeawardedcreditsindependently.</td></tr></tbody></table></div>" , after_num: "5.a" },
            { title: "Table 14", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 14: Exemplary level illuminance value requirements (both criteria – average illuminance and minimum point illuminance –must be met for daylight illuminance method)</div><table class=\"criteria-table\"><tbody><tr><th>Area type</th><th>exemplary credits</th><th>Minimum relevant area to comply</th><th>Average daylight illuminance ( averaged over entire space)</th><th>Minimum daylight illuminance at worst lit point</th><th>EN 17037 OR IES LM- 83- 23</th></tr><tr><th colspan=\"6\">All building types (excluding retail – see below)</th></tr><tr><td>Multi- storey buildings Occupied spaces ( unless indicated below)</td><td rowspan=\"2\">1</td><td>80%</td><td>At least 300 lux for 2650 hours per year or more</td><td>At least 90 lux for 2650 hours per year or more</td><td>Highest rating in standard is met.</td></tr><tr><td>Single storey buildings Occupied spaces ( unless indicated below)</td><td>80%</td><td>At least 300 lux for 3000 hours per year or more</td><td>At least 120 lux for 3000 hours per year or more; or in spaces with glazed roofs( such as atria), at least 210 lux for 3000 hours per year or more</td><td>Highest rating in standard is met.</td></tr><tr><td colspan=\"6\">Retail</td></tr><tr><td>Retail buildings Sales areas</td><td rowspan=\"2\">1</td><td>50%</td><td colspan=\"2\">At least 300 lux point daylight illuminances for 2000 hours per year or more</td><td>Highest rating in standard is met.</td></tr><tr><td>Retail buildings Other occupied areas</td><td>80%</td><td>Select relevant criteria above for occupied spaces dependent on whether you are assessing a multi- storey or single storey building.</td><td></td><td>Highest rating in standard is met.</td></tr></tbody></table></div>" , after_num: "12.b" },
        ]
    },
    'Hea02': {
        aim: "To ensure artificial lighting and occupant controls are considered at the design stage to ensure best practice in visual performance, visual comfort, and overall wellbeing for building occupants.",
        criteria: [
            { points: "Prerequisite – Flicker", numbered: [
                { num: "1", text: "All lighting should be designed to minimise flicker and stroboscopic effects (see M1), including across their full dimming and colour tuning range if applicable. This is applicable to all internal and external lighting." },
            ]},
            { points: "One credit – Internal and external lighting", numbered: [
                { num: "2", text: "Internal lighting in all relevant areas of the building is designed to comply with all applicable recommendations in EN 12464- 1:2021(7) or an approved alternative national standard. Internal lighting should be appropriate to the tasks undertaken, accounting for building user concentration and comfort levels. This can be demonstrated through a lighting design strategy", subitems: [
                    { num: "2.a", text: "Illuminance levels and uniformity" },
                    { num: "2.b", text: "Glare limits" },
                    { num: "2.c", text: "Colour appearance (where standard recommendations exist)" },
                    { num: "2.d", text: "Colour rendering" },
                ]},
                { num: "3", text: "For areas where computer screens are regularly used, specific confirmation is required that the lighting has been designed to limit the potential for glare in accordance with a numerical glare limit specified within national best practice lighting guides. These should include:", subitems: [
                    { num: "3.a", text: "Limits to the luminance of the luminaires to avoid screen reflections. Manufacturers\' data for the luminaires should be sought to confirm this." },
                    { num: "3.b", text: "For uplighting, the recommendations refer to the luminance of the lit ceiling rather than the luminaire; a design team calculation is usually required to demonstrate this." },
                    { num: "3.c", text: "Recommendations for direct lighting, ceiling illuminance, and average wall illuminance." },
                ]},
                { num: "4", text: "All external lighting located within the construction zone is specified in accordance with EN 13201 series (parts 1 to 5)(8), (9), (10), (11), (12) and EN 12464-2:2024(13). External lighting should enable users to perform outdoor visual tasks efficiently and accurately, especially during the night. This can be demonstrated through a lighting design strategy that provides lighting parameters in accordance with national best practice lighting guides (see CN2 on page 99). Compliance criteria should include, as applicable for each type of application:", subitems: [
                    { num: "4.a", text: "Illuminance / luminance levels and uniformity" },
                    { num: "4.b", text: "Glare limits" },
                    { num: "4.c", text: "Colour rendering" },
                ]},
            ]},
            { points: "One credit – Zoning and occupant control", numbered: [
                { num: "5", text: "Internal lighting is zoned to allow for occupant control in accordance with the criteria below for relevant areas present within the building, as applicable:", subitems: [
                    { num: "5.a", text: "Workstations adjacent to windows or atria and other building areas are separately zoned and controlled" },
                    { num: "5.b", text: "In office areas where furniture layout is known: zones of no more than four workplaces" },
                    { num: "5.c", text: "Seminar and lecture rooms: zoned for presentation and audience areas" },
                    { num: "5.d", text: "Library spaces: separate zoning of stacks, reading and counter areas" },
                    { num: "5.e", text: "Teaching space or demonstration area" },
                    { num: "5.f", text: "Whiteboard or display screen" },
                    { num: "5.g", text: "Auditoria: zoning of seating areas, circulation space and lectern area." },
                    { num: "5.h", text: "Dining, restaurant, café areas: separate zoning of servery and seating or dining areas" },
                    { num: "5.i", text: "Retail: separate zoning of display and counter areas" },
                    { num: "5.j", text: "Bar areas: separate zoning of bar and seating areas" },
                    { num: "5.k", text: "Day rooms, waiting areas: zoning of seating and activity areas and circulation space with controls accessible to staff" },
                    { num: "5.l", text: "Hotel bedrooms: separate zoning of hallway, bathroom, desk and sleeping area (where present in the room)." },
                ]},
                { num: "6", text: "Areas used for teaching, seminar or lecture purposes have lighting controls specified in accordance with the size and use of the space, but a typical auditorium or lecture theatre with stepped seating and a formal lectern / demonstration / performance area would typically be expected to have lighting controls as follows:", subitems: [
                    { num: "6.a", text: "Full normal lighting (to allow for entry and exit, cleaning etc.)" },
                    { num: "6.b", text: "Demonstration area lighting off and audience area lighting reduced to a low level (for the purpose of line slide projection, but allowing enough light for the audience to take notes)" },
                    { num: "6.c", text: "All lighting off (for the projection of tone slides, colour slides, and for the purposes of visual demonstrations or performances)" },
                    { num: "6.d", text: "Separate localised lectern lighting." },
                ]},
                { num: "7", text: "Where automatic lighting controls are used for energy efficiency reasons, manual override must be provided." },
                { num: "8", text: "In addition, the building type criteria in Table 15 below (where relevant)." },
            ]},
            { points: "One exemplary credit – Lighting control", numbered: [
                { num: "9", text: "Lighting in each control zone within an occupied space can be manually dimmed by occupants down to no more than 20% of the maximum light output using lighting control interfaces positioned in accessible locations." },
                { num: "10", text: "Lighting in each control zone within an occupied space can be colour tuned over a correlated colour temperature range from 2700K or less to 4000K or more, with automatic controls set to limit the correlated colour temperature in the afternoon and evening to 2700K or less." },
            ]},
        ],
        tables: [
            { title: "Table 15", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 15: Building-specific zoning and control requirements</div><table class=\"criteria-table\"><tbody><tr><th>building type</th><th>Internal and external lighting requirements</th></tr><tr><td>Education buildings</td><td>Manual lighting controls are easily accessible for the teacher while teaching and on entering or leaving the teaching space. Manual lighting controls need only be provided for staff, not the children.</td></tr><tr><td>Law court buildings</td><td>Separate zoning is also provided for the following areas( as a minimum): 1. Judge\'sormagistrate\'sbench 2. Dock 3. Jury area  4. Public seating area.  Lighting control of the zones in the above spaces, and the court as a whole, cater for the following settings:  1. Full lighting( to allow cleaning etc.) 2. Normal lighting( for court sessions)  3. Dimmed( for the purpose of showing audio- visual evidence, but allowing enough light for note taking).</td></tr><tr><td>Internal areas excluded from the lighting zone requirements</td><td>The following internal areas are excluded from the lighting zone requirements: 1. Media and arts production spaces  2. Sports facilities( exercise spaces only, including hydrotherapy and physiotherapy areas).</td></tr></tbody></table></div>" , after_num: "8" },
        ]
    },
    'Hea03': {
        aim: "To ensure the non-visual effects of light are considered to promote positive impacts on psychology and physiology of the building occupants through a healthy circadian rhythm.",
        criteria: [
            { points: "One credit – Non-visual effects of light", numbered: [
                { num: "1", text: "Achieve at least one credit for \'Daylighting\' in Hea 01 Natural light." },
                { num: "2", text: "All relevant areas achieve one of the below, as applicable:", subitems: [
                    { num: "2.a", text: "Where occupant positions are known and fixed (see M1.1): All positions in all relevant building areas receive a vertical illuminance of at least 250 lux melanopic EDI at occupant eyes for at least four hours during the daytime (beginning by noon at the latest)." },
                    { num: "2.b", text: "Where occupant positions are unknown or variable (see M1.2): Cylindrical illuminance at eye height across each relevant building area corresponds to at least 250 lux melanopic EDI for at least four hours during the daytime (beginning by noon at the latest)." },
                ]},
                { num: "3", text: "Electric lighting systems and controls are in place to adjust the flux and spectral output of the emitted light over time (colour tuning) so that melanopic EDI at occupant eye level can be reduced in the afternoon and evening, as relevant for each type of application." },
                { num: "4", text: "For residential areas within a building, systems and controls are in place to ensure that no more than 10 lux melanopic EDI for a period of three hours before bedtime and no more than 1 lux melanopic EDI during sleep time are achieved at occupant eye level in all relevant building areas where residential occupancy type is expected (see Definitions)." },
            ]},
        ]
    },
    'Hea04': {
        aim: "To recognise and encourage a healthy internal environment with excellent indoor air quality.",
        criteria: [
            { points: "Prerequisite – No asbestos", numbered: [
                { num: "1", text: "There are no materials containing asbestos specified or used within the building." },
            ]},
            { points: "One credit – Indoor air quality plan", numbered: [
                { num: "2", text: "A site-specific indoor air quality plan has been produced in accordance with Guidance Note 6 (GN06). This plan informs the design, specification, and installation to maximise improvement of indoor air quality during occupation. The plan must consider the following:", subitems: [
                    { num: "2.a", text: "Removal of highly contaminating sources" },
                    { num: "2.b", text: "Dilution and control of other contaminant sources, including:", subitems: [
                        { num: "2.b.i", text: "Air quality requirements of specialist areas such as laboratories, where present" },
                    ]},
                    { num: "2.c", text: "Procedures for pre-occupancy flush out and purge ventilation" },
                    { num: "2.d", text: "Third party testing and analysis" },
                    { num: "2.e", text: "Maintaining indoor air quality in-use" },
                    { num: "2.f", text: "Any relevant local or national authority plans or policies (for example, Air Quality Management Areas or Local Air Quality Action Plans)" },
                ]},
            ]},
            { points: "One credit – Ventilation", numbered: [
                { num: "3", text: "Provide fresh air into the building in accordance with one of the best practice standards for ventilation listed below (for further guidance, see M1.1):", subitems: [
                    { num: "3.a", text: "ISO 17772-1:2017 Annex I" },
                    { num: "3.b", text: "EN 16798-1:2019 Annex B.3" },
                    { num: "3.c", text: "The national best practice standard for ventilation." },
                ]},
                { num: "4", text: "Ventilation pathways are designed to minimise the ingress and build-up of air pollutants inside the building (see M1.2)." },
                { num: "5", text: "Where present, HVAC systems must incorporate suitable filtration to minimise external air pollution, as defined in EN 16798- 3:2025 Section B.4.2.(17) The specified filters should achieve supply air classification of at least SUP 2. The level of filtration required is dependent on the quality of the outdoor air.", subitems: [
                    { num: "5.a", text: "Multiple-occupancy residential developments with central air conditioning systems can demonstrate compliance with filter class of F7 or ePM1 50%." },
                ]},
                { num: "6", text: "Occupied spaces have calibrated carbon dioxide (CO₂) or calibrated air quality sensors in specified areas, in line with M1.3 and:", subitems: [
                    { num: "6.a", text: "In mechanically ventilated buildings or spaces: sensors are linked to the mechanical ventilation system and provide demand-controlled ventilation to the space." },
                    { num: "6.b", text: "In naturally ventilated buildings or spaces: sensors either have the ability to alert the building owner or manager when CO₂ levels exceed the recommended set point, or are linked to controls with the ability to adjust the quantity of fresh air, i.e. automatic opening windows or roof vents." },
                    { num: "6.c", text: "The total number of sensors, and the net internal area of relevant areas covered by the sensors, is reported via the BREEAM Platform." },
                ]},
                { num: "7", text: "In countries or jurisdictions where smoking within buildings is not prohibited by law (see Definitions), a smoking ban covering all public and staff areas of the building is implemented, and \'No Smoking\' signs are located in appropriate areas clearly visible to all occupants (i.e. common areas, offices and building entrances)." },
            ]},
            { points: "Up to two credits – Emissions from construction products", numbered: [] },
            { points: "One credit", numbered: [
                { num: "8", text: "Three of the five product types meet the emission limits, testing requirements and any additional requirements listed in Table 17 and M2. Where wood-based products are not one of three selected product types, all wood-based products used for internal fixtures and fittings must be tested and classified as formaldehyde E1 class as a minimum (see CN2.2)." },
            ]},
            { points: "Two credits", numbered: [
                { num: "9", text: "All the product types meet the emission limits, testing requirements and any additional requirements listed in Table 17 and M2." },
            ]},
            { points: "One credit – Post-construction indoor air quality measurement", numbered: [
                { num: "10", text: "Criterion 2 has been achieved." },
                { num: "11", text: "The formaldehyde concentration in indoor air is measured post-construction (but pre-occupancy) and does not exceed" },
                { num: "100", text: "µg/m³, averaged over 30 minutes.(18)" },
                { num: "12", text: "The formaldehyde sampling and analysis is performed in accordance with ISO 16000-2(19) and ISO 16000-3(20) and" },
                { num: "13", text: "The total volatile organic compound (TVOC) concentration in indoor air is measured post-construction (but pre- occupancy) and does not exceed an 8-hour time-weighted average of 300 µg/m³.(21)" },
                { num: "14", text: "The TVOC sampling and analysis is performed in accordance with ISO 16000-5(22) and ISO 16000-6(23) or ISO 16017-1(24) and Methodology M3." },
                { num: "15", text: "Where levels are found to exceed these limits, the project team confirms the measures that have or will be undertaken in accordance with the recommendations of the IAQ plan to reduce the TVOC and formaldehyde levels to within the above limits." },
                { num: "16", text: "The measured concentration levels of formaldehyde (µg/m³) and TVOC (µg/m³) are reported via the BREEAM Platform." },
            ]},
            { points: "Up to two exemplary credits – Emissions from construction products", numbered: [] },
            { points: "One exemplary credit", numbered: [
                { num: "17", text: "At least four of the five product types listed in Table 18 on page 112 meet the emission limits, testing requirements and any additional requirements listed in Table 18 and M2." },
            ]},
            { points: "Two exemplary credits", numbered: [
                { num: "18", text: "All product types meet the emission limits, testing requirements and any additional requirements listed in Table 18 and M2." },
            ]},
        ],
        tables: [
            { title: "Table 17", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 17: Emission criteria by product type</div><table class=\"criteria-table\"><tbody><tr><th>Emission limit formaldehyde</th><th>Total volatile organic compounds ( TVOC)</th><th>Category 1 A and 1 B carcinogens</th><th>testing requirement</th></tr><tr class=\"section-header\"><td colspan=\"4\">Interior paints and coatings</td></tr><tr><td>≤ 0.06 mg/m³</td><td>≤ 1.0 mg/m³</td><td>≤ 0.001 mg/m³</td><td>EN 16402(25) or ISO 16000- 9(26) or CEN/TS 16516(27) or CDPHStandard Methodv 1.2(28) or ISO 16000- 10(29)( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"4\">Additional requirements for interior paints and coatings (see M2.3)</td></tr><tr class=\"section-header\"><td colspan=\"4\">Meet VOC content limits (Table 19 on page 116). Paints used in wet areas (e.g. bathrooms, kitchens, utility rooms) should protect against mould growth (see M2.3).</td></tr><tr><td>formaldehyde</td><td>Total volatile organic compounds ( TVOC) 3</td><td>Category 1 A and 1 B carcinogens</td><td></td></tr><tr class=\"section-header\"><td colspan=\"4\">Wood-based products (including wood flooring)</td></tr><tr><td>≤ 0. 06 mg/m³ ( Non- MDF) ≤ 0. 08 mg/m³ ( MDF)</td><td>≤ 1.0 mg/m³</td><td>≤ 0.001 mg/m³</td><td>ISO 16000- 9 or CEN/TS 16516 or CDPHStandard Methodv 1.2 or EN 717- 1( formaldehyde emissions only)( 30) or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"4\">Flooring materials (including floor levelling compounds and resin flooring)</td></tr><tr><td>≤ 0.06 mg/m³</td><td>≤ 1.0 mg/m³</td><td>≤ 0.001 mg/m³</td><td>ISO 10580(31) or ISO 16000- 9 or CEN/TS 16516  or CDPHStandard Methodv 1. 2 or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"4\">Ceiling materials, wall materials, acoustic insulation and thermal insulation materials</td></tr><tr><td>≤ 0.06 mg/m³</td><td>≤ 1.0 mg/m³</td><td>≤ 0.001 mg/m³</td><td>ISO 16000- 9 or CEN/TS 16516 or CDPHStandard Methodv 1. 2 or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"4\">Interior adhesives and sealants (including flooring adhesives)</td></tr><tr><td>≤ 0.06 mg/m³</td><td>≤ 1.0 mg/m³</td><td>≤ 0.001 mg/m³</td><td>EN 13999( Parts 1- 4)( 32)( 33)( 34)( 35) or ISO 16000- 9 or CEN/TS 16516 or CDPHStandard Methodv 1.  or  ISO 16000- 10( see CN2.5)</td></tr><tr><td colspan=\"4\" style=\"background:#f9fafb;font-size:11px;line-height:1.5;padding:10px 12px;color:#475569;\"><strong>Notes</strong><br>1. Compliance with emission limits shall be demonstrated after 28 days in an emission test chamber or earlier as stipulated by the relevant testing requirements standard. The emission rate obtained from the chamber test method must be extrapolated to predict what the concentration would be in the air of the theoretical model or reference room (as detailed in the respective testing standard) and this extrapolated concentration compared with the emission limit in this table.<br>2. The emission limits in this table apply to the finished product, i.e. after any coating or other treatment process has been applied.<br>3. Where test results for a product exceed the TVOC emission limit, compliance with the above requirements can still be achieved where the test results demonstrate an <em>R</em>-value ≤ 1 after 28 days.</td></tr></tbody></table></div>" , after_num: "9" },
            { title: "Table 18", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 18: Exemplary level emission criteria by product type</div><table class=\"criteria-table\"><tbody><tr><th>Emission limit Form­ aldeh­yde</th><th>Total volatile organic compounds ( TVOC) 3</th><th>Total semi- volatile organic compounds ( TSVOC)</th><th>Category 1 A and 1 B carcinogens</th><th>testing requirement</th></tr><tr class=\"section-header\"><td colspan=\"5\">Interior paints and coatings</td></tr><tr><td>≤ 0.01 mg/m³</td><td>≤ 0.3 mg/m³</td><td>≤ 0.1 mg/m³</td><td>≤ 0.001 mg/m³</td><td>EN 16402 or ISO 16000- 9 or CEN/TS 16516 or CDPH Standard Method v 1. 2 or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"5\">Additional requirements for interior paints and coatings (see M2.3)</td></tr><tr class=\"section-header\"><td colspan=\"5\">Meet VOC content limits (Table 19 on page 116). Paints used in wet areas (e.g. bathrooms, kitchens, utility rooms) should protect against mould growth (see M2.3).</td></tr><tr class=\"section-header\"><td colspan=\"5\">Wood-based products (including wood flooring)</td></tr><tr><td>≤ 0.01 mg/m³</td><td>≤ 0.3 mg/m³</td><td>≤ 0.1 mg/m³</td><td>≤ 0.001 mg/m³</td><td>ISO 16000- 9 or CEN/TS 16516 or CDPH Standard Method v 1. 2 or EN 717- 1( formaldehyde emissions only) or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"5\">Flooring materials (including floor levelling compounds and resin flooring)</td></tr><tr><td>≤ 0.01 mg/m³</td><td>≤ 0.3 mg/m³</td><td>≤ 0.1 mg/m³</td><td>≤ 0.001 mg/m³</td><td>ISO 10580 or ISO 16000- 9 or CEN/TS 16516 or CDPH Standard Method v 1. 2 or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"5\">Ceiling materials, wall materials, acoustic insulation and thermal insulation materials</td></tr><tr><td>≤ 0.01 mg/m³</td><td>≤ 0.3 mg/m³</td><td>≤ 0.1 mg/m³</td><td>≤ 0.001 mg/m³</td><td>ISO 16000- 9 or CEN/TS 16516 or CDPH Standard Method v 1. 2 or ISO 16000- 10( see CN2.5)</td></tr><tr class=\"section-header\"><td colspan=\"5\">Interior adhesives and sealants (including flooring adhesives)</td></tr><tr><td>≤ 0.01 mg/m³</td><td>≤ 0.3 mg/m³</td><td>≤ 0.1 mg/m³</td><td>≤ 0.001 mg/m³</td><td>EN 13999( Parts 1- 4) or ISO 16000- 9 or CEN/TS 16516 or CDPH Standard Method v1.2 or ISO 16000-10 (see CN2.5)</td></tr></tbody></table></div>" , after_num: "18" },
        ]
    },
    'Hea05': {
        aim: "To ensure the building can provide an appropriate level of thermal comfort.",
        criteria: [
            { points: "One credit – Thermal modelling – Current climate", numbered: [
                { num: "1", text: "Calculate thermal comfort in relevant occupied areas using full dynamic building simulation (see M1.2). Do this in accordance with an approved standard below taking full account of seasonal variations." },
                { num: "2", text: "The building is designed to meet thermal comfort criteria, using one of the following methodologies:", subitems: [
                    { num: "2.a", text: "Thermal comfort levels in occupied spaces meet the Category B requirements set out in Table A.1 of Annex A of ISO 7730:2005.(42)" },
                    { num: "2.b", text: "ANSI/ASHRAE Standard 55:2023." },
                    { num: "2.c", text: "Other appropriate industry standard (where this sets a higher or more appropriate requirement or level for the building type), see CN1.5." },
                ]},
                { num: "3", text: "When generated, report the PMV and PPD indices based on the above modelling via the BREEAM Platform (see CN1.3 and CN1.4)." },
                { num: "4", text: "Winter operative temperature ranges in occupied spaces are in accordance with the criteria set out in CIBSE Guide A Environmental design, OR other appropriate industry standard (where this sets a higher or more appropriate requirement or level for the building type)." },
                { num: "5", text: "The building is designed to limit the risk of overheating, using the adaptive comfort methodology in one of the following standards:", subitems: [
                    { num: "5.a", text: "ANSI/ASHRAE Standard 55:2023." },
                    { num: "5.b", text: "CIBSE TM59: Design methodology for the assessment of overheating risk in homes." },
                    { num: "5.c", text: "CIBSE TM52: The limits of thermal comfort: avoiding overheating in European buildings." },
                    { num: "5.d", text: "CIBSE Guide A." },
                    { num: "5.e", text: "Other appropriate national or local industry standard to achieve the same outcome (where this sets a higher or more appropriate requirement or level for the building type), see CN1.5." },
                ]},
            ]},
            { points: "One credit – Thermal modelling – Future climate", numbered: [
                { num: "6", text: "Criteria 1 to 5 are achieved." },
                { num: "7", text: "The thermal modelling shows that the relevant requirements set out in criterion 2 or 5 are achieved for a projected climate change environment (see M1.3)." },
                { num: "8", text: "Where criterion 7 above is not met, the project team shows how the building has been adapted, or designed to be easily adapted in future using passive design solutions to meet the requirements under criterion 7." },
                { num: "9", text: "For air-conditioned buildings, when generated, report the PMV and PPD indices based on the above modelling via the BREEAM Platform (see CN1.3 and CN1.4)." },
            ]},
            { points: "One credit – Thermal zoning and controls", numbered: [
                { num: "10", text: "Criteria 1 to 5 are achieved." },
                { num: "11", text: "The thermal modelling analysis (criteria 1 to 5) has informed the temperature control strategy for the building and its users." },
                { num: "12", text: "The strategy for proposed heating or cooling shows that it has addressed:", subitems: [
                    { num: "12.a", text: "Thermal zoning in the building and how building services will efficiently and appropriately heat or cool these areas." },
                    { num: "12.b", text: "The degree of user control required for these zones, appropriate for the end users, see M2.1. The strategy considers:", subitems: [
                        { num: "12.b.i", text: "User knowledge of building services." },
                        { num: "12.b.ii", text: "The level of control required based on occupancy type, patterns, and room functions (see M2.2)." },
                        { num: "12.b.iii", text: "How the user is likely to operate or interact with the heating or cooling systems." },
                        { num: "12.b.iv", text: "User expectations across seasons and degree of individual control." },
                    ]},
                    { num: "12.c", text: "Where there is more than one system, how the proposed systems will interact and interlock with each other and how this may affect the thermal comfort of the building occupants." },
                    { num: "12.d", text: "The need or otherwise, for an accessible user-activated manual override for any automatic systems." },
                ]},
            ]},
        ]
    },
    'Hea06': {
        aim: "To ensure the building provides an appropriate acoustic environment to enhance the comfort of building users.",
        criteria: [
            { points: "Prerequisite – Suitably qualified acoustician", numbered: [
                { num: "1", text: "A suitably qualified acoustician (SQA) is appointed by the client at the appropriate stage in the procurement process (but no later than completion of concept design) to provide early design advice on:", subitems: [
                    { num: "1.a", text: "External sources of noise impacting the chosen site." },
                    { num: "1.b", text: "Site layout and zoning of the building for good acoustics." },
                    { num: "1.c", text: "Acoustic requirements for users with special hearing and communication needs." },
                    { num: "1.d", text: "Acoustic treatment of different zones and façades." },
                ]},
            ]},
            { points: "One credit – Indoor ambient noise", numbered: [
                { num: "2", text: "All unoccupied spaces comply with the indoor ambient noise level targets as detailed in the more rigorous of criteria 2.a or", subitems: [
                    { num: "2.b", text: "below:" },
                    { num: "2.a", text: "Indoor ambient noise level targets within national building regulations or other appropriate good practice standards." },
                    { num: "2.b", text: "Where national building regulations or good practice standards do not exist for the building type or do not provide indoor ambient noise targets, the indoor ambient noise levels comply with \'good practice\' criteria levels outlined in Table 20 on the next page." },
                ]},
                { num: "3", text: "An SQA carries out ambient noise measurements to ensure that the relevant spaces achieve the required levels. Where the measurements identify that spaces do not meet the standards, remedial works are carried out and the measurements repeated to confirm that the levels are achieved prior to handover and occupation." },
                { num: "4", text: "Teaching and learning spaces with lightweight roofs and roof glazing demonstrate that the reverberant sound pressure levels in these rooms are not more than 25 dB above the appropriate limits given in Table 20 on the next page." },
            ]},
            { points: "One credit – Sound insulation", numbered: [
                { num: "5", text: "The sound insulation between acoustically sensitive rooms and other occupied areas comply with the privacy requirements, as detailed in the more rigorous of criteria 5.a or 5.b below:", subitems: [
                    { num: "5.a", text: "Sound insulation between acoustically sensitive rooms and other occupied areas comply with targets within national regulations or other appropriate good practice standards." },
                    { num: "5.b", text: "Where relevant national regulations or good practice standards do not exist for the building type or do not provide sound insulation performance targets, the sound insulation between acoustically sensitive rooms and other occupied areas complies with the following Speech Privacy Potential: Dw + LAeqT > 75." },
                    { num: "5.c", text: "Where privacy is viewed to be critical by the client or design team (e.g. doctor\'s consulting room, consulting room within a bank) or where the room is adjacent to a noisy space such as a music room, the area shall comply with an enhanced Speech Privacy Potential: Dw + LAeqT > 85." },
                ]},
                { num: "6", text: "The source and receive room sound pressure levels from which Dw is determined are measured in accordance with (EN) ISO 16283-1:2014+A1:2017 and rated in accordance with (EN) ISO 717-1:2020. Measurements by the SQA must be based on finished, but unfurnished rooms, accounting for, and to include the effect of, any carpets and acoustically absorbent ceilings specified." },
            ]},
            { points: "One credit – Reverberation times", numbered: [
                { num: "7", text: "Rooms or areas used for speech (including meeting rooms and rooms for public speaking) or rooms used for music performance and rehearsal, achieve reverberation times as detailed in the more rigorous of criteria 7.a OR 7.b and 7.c as", subitems: [
                    { num: "7.a", text: "Demonstrate that the reverberation time or equivalent absorption area for relevant spaces complies with targets within relevant national regulations or other appropriate good practice standards" },
                    { num: "7.b", text: "Where relevant national regulations or good practice standards do not require the control of reverberation time, achieve reverberation times compliant with Table 21 on the next page" },
                    { num: "7.c", text: "If relevant to the assessed building, all areas used for teaching, training and educational purposes achieve reverberation times compliant with Table 22 on the next page" },
                ]},
            ]},
            { points: "Up to four credits – Sound insulation", numbered: [
                { num: "8", text: "The building meets the acoustic performance standards and testing requirements as detailed in the more rigorous of EITHER:", subitems: [
                    { num: "8.a", text: "Airborne and impact sound insulation values comply with the performance improvement standards, as compared to the relevant national regulations outlined in Table 23 on the next page OR" },
                    { num: "8.b", text: "Airborne and impact sound insulation levels comply with the performance standards outlined in Table 24 on page 133 unless otherwise stated within these criteria." },
                ]},
                { num: "9", text: "A programme of pre-completion testing is carried out by the SQA EITHER:", subitems: [
                    { num: "9.a", text: "Based on the normal programme of testing described in the relevant national regulations for every group or sub- group of rooms for residential purposes; this must demonstrate that the performance standards detailed within this issue are achieved OR" },
                    { num: "9.b", text: "Where there are no relevant national regulations in place, or they require laboratory measurements to demonstrate compliance, the programme of on-site pre-completion testing must be carried out based on the \'Frequency of testing required\' guidance (see calculation procedures in Methodology on page 133) for every group or sub-group of rooms." },
                ]},
                { num: "10", text: "The number of credits awarded will depend on improvement to the national regulations determined according to Table 23 on the next page or Table 24 on page 133. Where commercial space is below the residential space, only airborne sound insulation tests will be required." },
            ]},
        ],
        tables: [
            { title: "Table 20", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 20: A selection of good practice indoor ambient noise level targets in unoccupied spaces</div><table class=\"criteria-table\"><tbody><tr><th>Function of area</th><th>Indoor ambient noise level*</th></tr><tr><td>General spaces (staffrooms, restrooms)</td><td>≤ 40 dB LAeqT</td></tr><tr><td>Single occupancy offices</td><td>≤ 40 dB LAeqT</td></tr><tr><td>Multiple occupancy offices</td><td>40–50 dB LAeqT</td></tr><tr><td>meeting rooms</td><td>35–40 dB LAeqT</td></tr><tr><td>Receptions</td><td>40–50 dB LAeqT</td></tr><tr><td>Spaces designed for speech, e. g. teaching, seminar or lecture rooms</td><td>≤ 35 dB LAeqT</td></tr><tr><td>Concert hall, theatre or auditoria</td><td>≤ 30 dB LAeqT</td></tr><tr><td>Informal café or canteen areas</td><td>≤ 50 dB LAeqT</td></tr><tr><td>Catering kitchens</td><td>≤ 50 dB LAeqT</td></tr><tr><td>Restaurant areas</td><td>40–55 dB LAeqT</td></tr><tr><td>Bars</td><td>40–45 dB LAeqT</td></tr><tr><td>Retail areas</td><td>50–55 dB LAeqT</td></tr><tr><td>Manual workshops</td><td>≤ 55 dB LAeqT</td></tr><tr><td>Sound recording studios</td><td>≤ 30 dB LAeqT</td></tr><tr><td>laboratories</td><td>≤ 40 dB LAeqT</td></tr><tr><td>Function of area</td><td>Indoor ambient noise level*</td></tr><tr><td>Sports halls or swimming pools</td><td>≤ 55 dB L</td></tr><tr><td>Library areas</td><td>40–50 dB L</td></tr><tr><td>Hotel bedrooms</td><td>&lt; 35 dB L</td></tr><tr class=\"section-header\"><td colspan=\"2\">* Where ranges of noise levels are specified and privacy is not deemed by the final occupier to be an issue, it is acceptable to disregard the lower limit of the range and consider the noise level criteria to be lower than or equal to the upper limit of the range.(45)</td></tr></tbody></table></div>" , after_num: "4" },
            { title: "Table 21", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 21: Guide to reverberation time, T, at 500 Hz in unoccupied rooms for speech and music</div><table class=\"criteria-table\"><tbody><tr><th>Room volume m³</th><th colspan=\"2\">Reverberationtime T* s</th></tr><tr><th></th><th>Speech</th><th>music</th></tr><tr><td>50</td><td>0.4</td><td>1.0</td></tr><tr><td>100</td><td>0.5</td><td>1.1</td></tr><tr><td>200</td><td>0.6</td><td>1.2</td></tr><tr><td>500</td><td>0.7</td><td>1.3</td></tr><tr><td>1000</td><td>0.9</td><td>1.5</td></tr><tr><td>2000</td><td>1.0</td><td>1.6</td></tr><tr class=\"section-header\"><td colspan=\"3\">* Where the reverberation times stated above or in the referenced documents are not appropriate for the type of space or building being assessed, the acoustician must confirm why this is the case. In addition, the acoustician must set alternative appropriate reverberation times at the design stage and provide these to demonstrate compliance.</td></tr></tbody></table></div>" , after_num: "7.b" },
            { title: "Table 22", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 22: Performance standards for reverberation in teaching and study spaces – mid-frequency reverberation time, Tmf, in</div><table class=\"criteria-table\"><tbody><tr><th>Type of room ( receiving room)</th><th>Tmf (seconds)*</th></tr><tr><td>Open plan Teaching areas Resource areas</td><td>&lt; 0. 8 &lt; 1. 0</td></tr><tr><td>Lecture rooms Small( fewer than 50 people) Large( more than 50 people)</td><td>&lt; 0. 8 &lt; 1. 0</td></tr><tr><td>recording studio</td><td>0.6–1.2</td></tr><tr><td>Control room for recording</td><td>&lt; 0.5</td></tr><tr><td>Libraries</td><td>&lt; 1.0</td></tr><tr><td>Audio-visual, video conference rooms</td><td>&lt; 0.8</td></tr><tr class=\"section-header\"><td colspan=\"2\">* Tmf is the arithmetic average of the reverberation times in the 500 Hz, 1 kHz and 2 kHz octave bands.(46)</td></tr></tbody></table></div>" , after_num: "7.c" },
            { title: "Table 23", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 23: Airborne and impact sound insulation performance improvement standards for national legislation or standards</div><table class=\"criteria-table\"><tbody><tr><th>Credits</th><th>Airborne sound insulation (dB)</th><th>Impact sound insulation (dB)</th></tr><tr><td></td><td>Separating walls and floors between units*</td><td>Separating floors between units</td></tr><tr><td>1</td><td>Insulation values are at least 3 dB higher</td><td>Insulation values are at least 3 dB lower</td></tr><tr><td>3</td><td>Insulation values are at least 5 dB higher</td><td>Insulation values are at least 5 dB lower</td></tr><tr><td>4</td><td>Insulation values are at least 8 dB higher</td><td>Insulation values are at least 8 dB lower</td></tr><tr class=\"section-header\"><td colspan=\"3\">Notes :  * Only habitable rooms with separating walls and floors need to be assessed (see M2). ** The index for impact sound insulation is typically based on transmitted impact sound; a lower value indicates better performance. If the national index is inverse, credits are based on equivalent performance improvement with SQA confirmation.</td></tr></tbody></table></div>" , after_num: "10" },
            { title: "Table 24", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 24: Performance standards for airborne and impact sound insulation levels</div><table class=\"criteria-table\"><tbody><tr><th>credits</th><th>Airborne sound insulation for DnT, w+Ctrd B( minimum values)</th><th>Impact sound insulation for L\'n T, wd B( maximum values)</th></tr><tr><th></th><th>Separating walls and floors between units*</th><th>Separating floors between units*</th></tr><tr><td>1</td><td>48</td><td>59</td></tr><tr><td>3</td><td>50</td><td>57</td></tr><tr><td>4</td><td>53</td><td>54</td></tr><tr class=\"section-header\"><td colspan=\"3\">* Only habitable rooms with separating walls and floors need to be assessed, see M2.</td></tr></tbody></table></div>" , after_num: "10" },
        ]
    },
    'Hea07': {
        aim: "To recognise measures that provide safe and secure access to the building.",
        criteria: [
            { points: "One credit – Safe access", numbered: [
                { num: "1", text: "Dedicated cycle lanes are provided which meet the following minimum width dimensions or suitable local design guidance:", subitems: [
                    { num: "1.a", text: "Where pedestrian and cycle routes are shared, the minimum total width of the combined path is 3.0 m." },
                    { num: "1.b", text: "Where the cycle lane is segregated from both the pedestrian route and roadway, the minimum width of the cycle path is 2.0 m and the pedestrian path is 1.5 m." },
                    { num: "1.c", text: "Where the cycle route forms a part of the roadway, the minimum width of the lane is 1.5 m." },
                ]},
                { num: "2", text: "Dedicated and safe footpaths are provided on and around the site providing suitable links for the following:", subitems: [
                    { num: "2.a", text: "The site entrance to the building entrance." },
                    { num: "2.b", text: "Car parks (where present) to the building entrance." },
                    { num: "2.c", text: "The building to outdoor space." },
                    { num: "2.d", text: "Connecting to off-site paths where applicable." },
                    { num: "2.e", text: "Local transport nodes and other off-site amenities (where present)." },
                ]},
                { num: "3", text: "Where provided, pedestrian drop-off areas are designed off, or adjoining, the access road and provide direct access to pedestrian footpaths." },
                { num: "4", text: "Delivery areas are not directly accessed through general parking areas and do not cross or share the following:", subitems: [
                    { num: "4.a", text: "Pedestrian and cyclist routes." },
                    { num: "4.b", text: "Outside amenity areas accessible to building users and the general public." },
                ]},
                { num: "5", text: "There is a dedicated parking or waiting area for goods vehicles with appropriate separation from the manoeuvring area and staff and visitor car parking." },
                { num: "6", text: "Parking and turning areas are designed for simple manoeuvring according to the type of delivery vehicle likely to access the site, thus avoiding the need for repeated shunting." },
            ]},
            { points: "One credit", numbered: [
                { num: "7", text: "The building is designed to be fit for purpose, appropriate and accessible by all potential users." },
                { num: "8", text: "An access strategy is developed in line with Checklist A3 on page 420. The access strategy addresses, as a minimum, access to and throughout the development for all users, with particular emphasis on the following:", subitems: [
                    { num: "8.a", text: "Users with disabilities; addressing and proposing design solutions that remove obstacles that define disability." },
                    { num: "8.b", text: "People of different age groups, genders, ethnicity, and mobility levels." },
                    { num: "8.c", text: "Parents with children (where appropriate to building use or type)." },
                ]},
                { num: "9", text: "Facilities are provided for future building occupants and users (see Definitions) including, where relevant, facilities that can be shared and are accessible to members of the public or community without gaining uncontrolled access to other parts of the building (unless security processes and procedures prohibit this)." },
            ]},
            { points: "Two credits", numbered: [
                { num: "10", text: "The designer must confirm that the assessed development ensures compliance with the Lifetime Homes checklist requirements (see Checklist A4 on page 421) by EITHER:", subitems: [
                    { num: "10.a", text: "Meeting national best practice standards or local legislation in place that cover (as a minimum) the Lifetime Homes checklist requirements." },
                    { num: "10.b", text: "Showing compliance against the Lifetime Homes checklist." },
                ]},
            ]},
            { points: "One exemplary credit – Security of site and building", numbered: [
                { num: "11", text: "A suitably qualified security specialist (SQSS) conducts an evidence-based security needs assessment (SNA) during or prior to Concept Design. The purpose of the SNA will be to identify attributes of the proposal, site and surroundings which may influence the approach to security for the development." },
                { num: "12", text: "The SQSS develops a set of security controls and recommendations for incorporation into the proposals. Those controls and recommendations shall directly relate to the threats and assets identified in the preceding SNA." },
                { num: "13", text: "The controls and recommendations shall be incorporated into proposals and implemented in the as-built development. Any deviation from those controls and recommendations shall be justified and agreed with the SQSS." },
            ]},
        ]
    },
    'Hea09': {
        aim: "To provide an external space which gives occupants privacy and a sense of wellbeing.",
        criteria: [
            { points: "One credit – Private space", numbered: [
                { num: "1", text: "The outdoor space (private or semi-private) must comply with the following requirements:", subitems: [
                    { num: "1.a", text: "Is of a size that allows all occupants to sit outside" },
                    { num: "1.b", text: "Is accessible for all occupants, including wheelchair users" },
                    { num: "1.c", text: "Is accessible only to occupants of designated dwellings." },
                ]},
                { num: "2", text: "The outdoor spaces need to be adjacent, or in close proximity to the dwellings and meet the minimum size requirements (see M1)." },
            ]},
        ]
    },
    'Hea10': {
        aim: "To reduce or negate the impact of a natural hazard on the building.",
        criteria: [
            { points: "One credit – Hazard risk assessment", numbered: [
                { num: "1", text: "A risk assessment is carried out at the outline proposal or Concept Design stage by an appropriate person, or persons, to identify any potential natural hazards in the development region." },
                { num: "2", text: "Where a potential hazard is identified, an appropriate person should identify and implement mitigation measures appropriate to the level of risk." },
            ]},
        ]
    },
    'Hea11': {
        aim: "To minimise risk of water contamination in building services and ensure clean, fresh sources of water for building users.",
        criteria: [
            { points: "One credit – Water quality", numbered: [
                { num: "1", text: "All water systems in the building comply with the applicable health and safety best practice guides or regulations to minimise the risk of microbial contamination, such as legionellosis." },
                { num: "2", text: "Where humidification is required, a failsafe humidification system is provided." },
                { num: "3", text: "Point-of-use water coolers supply fresh potable drinking water in permanently staffed areas, including the following areas where relevant:", subitems: [
                    { num: "3.a", text: "Staff kitchens." },
                    { num: "3.b", text: "Staff cafeterias." },
                    { num: "3.c", text: "Other suitable locations on each floor level." },
                ]},
                { num: "4", text: "Point-of-use water coolers supply fresh potable drinking water in public areas:", subitems: [
                    { num: "4.a", text: "If potable water is available in each bedroom, a point-of-use water cooler is accessible from all key public spaces." },
                    { num: "4.b", text: "If potable water is not available in each bedroom, a point-of-use water cooler is accessible from all key public spaces AND specified in public areas next to key access points (lifts and stairwells) to each bedroom floor or area." },
                ]},
            ]},
        ]
    },
    'Inn01': {
        aim: "To support innovation within the construction industry through the recognition of sustainability related benefits which are not rewarded by standard BREEAM issues.",
        criteria: [
            { points: "", numbered: [
                { num: "1", text: "Where the building demonstrates exemplary performance by meeting defined exemplary level performance criteria in one or more of the following BREEAM assessment issues:", subitems: [
                    { num: "1.a", text: "Man 03 Responsible construction" },
                    { num: "1.b", text: "Man 05 Aftercare" },
                    { num: "1.c", text: "Hea 01 Natural light" },
                    { num: "1.d", text: "Hea 02 Artificial light" },
                    { num: "1.e", text: "Hea 04 Indoor air quality" },
                    { num: "1.f", text: "Hea 07 Safe and accessible design" },
                    { num: "1.g", text: "Ene 01 Energy and carbon performance for regulated energy uses" },
                    { num: "1.h", text: "Ene 02 Prediction of operational energy and carbon" },
                    { num: "1.i", text: "Wat 01 Water consumption" },
                    { num: "1.j", text: "Wat 05 Prediction of operational water consumption" },
                    { num: "1.k", text: "Mat 01 Building life cycle assessment" },
                    { num: "1.l", text: "Mat 03 Responsible sourcing of construction products" },
                    { num: "1.m", text: "Wst 01 Construction waste management" },
                    { num: "1.n", text: "Wst 02 Recycled aggregates" },
                    { num: "1.o", text: "Wst 05 Adapting to climate change" },
                    { num: "1.p", text: "Lue 02 Ecological risks and opportunities" },
                    { num: "1.q", text: "Lue 04 Ecological change and enhancement" },
                ]},
                { num: "2", text: "One innovation credit can be awarded for each innovation application approved by BRE Global, where the building complies with the criteria defined within an approved innovation application form." },
            ]},
        ]
    },
    'Lue01': {
        aim: "To encourage the use of previously occupied or contaminated land and avoid land which has not been previously disturbed.",
        criteria: [
            { points: "Up to two credits – Previously occupied land", numbered: [
                { num: "1", text: "A percentage of the proposed development\'s footprint is on an area of land which has previously been occupied by industrial, commercial or domestic buildings or fixed surface infrastructure." },
            ]},
            { points: "One credit – Contaminated land", numbered: [
                { num: "2", text: "A contaminated land professional undertakes a site investigation, risk assessment and appraisal, using ISO 18400 or equivalent, which deems that land within the development footprint to be affected by contamination. This report identifies:", subitems: [
                    { num: "2.a", text: "The degree of contamination" },
                    { num: "2.b", text: "The contaminant sources or types" },
                    { num: "2.c", text: "The options for remediating sources of contamination which present an unacceptable risk." },
                ]},
                { num: "3", text: "The client or principal contractor confirms that a remediation strategy will be implemented, in line with the report." },
            ]},
        ],
        tables: [
            { title: "Table 87", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 87: Percentage of proposed development\'s footprint on previously developed land</div><table class=\"criteria-table\"><tbody><tr><th>Percentage of the proposed development\'s footprint on previously developed land</th><th>credits</th></tr><tr><td>75%</td><td>1</td></tr><tr><td>95%</td><td>2</td></tr></tbody></table></div>" , after_num: "1" },
        ]
    },
    'Lue02': {
        aim: "To determine the existing ecological value associated with the site, including surrounding areas, and the risks and opportunities for ecological protection and enhancement as part of the project.",
        criteria: [
            { points: "One exemplary credit – Wider site sustainability", numbered: [
                { num: "10", text: "Achieve criteria 4 to 5 (foundation route) or 6 to 9 (comprehensive route)." },
                { num: "11", text: "When determining the optimal ecological outcome for the site consider the wider site sustainability-related activities and the potential for ecosystem service-related benefits. For a list of the minimum areas for consideration, see M4." },
                { num: "12", text: "Incorporate at least one measure into the design that would demonstrate an ecosystem service related benefit." },
            ]},
        ],
        tables: [
            { title: "Table 88", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 88: Credits by assessment route (Lue 02)</div><table class=\"criteria-table\"><tbody><tr><th>Assessment criteria</th><th>foundation route</th><th>comprehensive route</th></tr><tr><td>Survey and evaluation</td><td rowspan=\"2\">1 credit</td><td>1 credit</td></tr><tr><td>Determining ecological outcomes</td><td>1 credit</td></tr><tr><td>Exemplary level: Wider site sustainability</td><td>1 exemplary credit</td><td>1 exemplary credit</td></tr></tbody></table></div>" },
        ]
    },
    'Lue03': {
        aim: "To avoid, or limit as far as possible, negative ecological impacts on the site and its zone of influence resulting from the project.",
        criteria: [
            { points: "Prerequisite – Ecological risks and opportunities", numbered: [
                { num: "1", text: "Whether a project is using the foundation route or the comprehensive route, the criteria in Lue 02 for \'Survey and evaluation\' and \'Determining ecological outcomes' must have been met to achieve any credits in this issue." },
            ]},
            { points: "Two credits – Implementation of measures on-site", numbered: [
                { num: "2", text: "For both routes, handover between the design and construction teams must be sufficiently structured and thorough to ensure that all planned ecological measures are communicated, understood, and adhered to throughout construction.", subitems: [
                    { num: "2.a", text: "For the comprehensive route only, an ecologist will have been in place throughout planning and design. If a new ecologist has been appointed for the construction and handover stages, there must be an additional handover between the two ecologists." },
                ]},
                { num: "3", text: "The measures required to achieve optimal ecological outcomes must be integrated with site preparation and construction processes. These must be measured and monitored throughout construction and handover as follows:", subitems: [
                    { num: "3.a", text: "Foundation route: The contractor must nominate a biodiversity champion with authority to influence site activities and to ensure the necessary measures are implemented." },
                    { num: "3.b", text: "Comprehensive route: An ecologist will have been appointed by the contractor to monitor and advise on the protection of site ecology as agreed. If this ecologist requires the input of an additional ecological specialist at any point (for example, an expert on a particular form of wildlife), the contractor must provide for such services as required." },
                ]},
            ]},
        ]
    },
    'Lue04': {
        aim: "To enhance ecological value of the area associated with the site in support of local, regional, and national priorities.",
        criteria: [
            { points: "Prerequisite – Managing negative impacts on ecology", numbered: [
                { num: "1", text: "Achieve criteria 2 and 3 in Lue 03." },
            ]},
            { points: "One credit – Ecological enhancement", numbered: [
                { num: "2", text: "Locally relevant ecological measures have been implemented that enhance the site\'s ecological value (see M2.1). The measures adopted are based on:", subitems: [
                    { num: "2.a", text: "Recommendations from recognised 'local' ecological expertise and specialist input and guidance." },
                    { num: "2.b", text: "Input from the project team in collaboration with representative stakeholders and data collated as part of 'Determining ecological outcomes' in Lue 02." },
                ]},
                { num: "3", text: "Measures have been implemented that enhance ecological value, which are based on input from the project team and SQE in collaboration with representative stakeholders and data collated as part of 'Determining ecological outcomes' in Lue 02. Measures are implemented in the following order:", subitems: [
                    { num: "3.a", text: "On-site, and where this is not feasible," },
                    { num: "3.b", text: "Outside of the site boundary, within the zone of influence." },
                ]},
                { num: "4", text: "Data collated are analysed and where potentially valuable, provided to the local environmental records centres nearest to, or relevant for, the site." },
                { num: "5", text: "Up to three credits are awarded based on the percentage biodiversity net gain achieved from the project based on the scale in Table 90 below. In addition, to achieve any credits there must be no residual effects on protected sites or irreplaceable habitats. This should be calculated using one of the following:", subitems: [
                    { num: "5.a", text: "Country specific biodiversity metric (see CN1), and where not available," },
                    { num: "5.b", text: "Global Biodiversity Metric (Ramboll)." },
                ]},
            ]},
            { points: "One credit – Urban Greening Factor", numbered: [
                { num: "6", text: "For urban sites, where an ecologist confirms that biodiversity net gain is not appropriate for the project, the Urban Greening Factor may be used as an alternative. A credit can be awarded based on the targets set out in Table 91." },
                { num: "7", text: "In addition to meeting the targets, the ecologist must also confirm that the vegetation specified to meet the targets provides ecological benefits. These can be the same measures as outlined in criterion 3, and must be based on input from the project team and SQE in collaboration with representative stakeholders and data collated as part of part of 'Determining ecological outcomes' in Lue 02." },
                { num: "8", text: "Where the baseline of the site already meets the target level, or a UGF has been set by a local authority, projects must increase the score by 0.1." },
            ]},
        ],
        tables: [
            { title: "Table 89", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 89: Credits by assessment route (Lue 04)</div><table class=\"criteria-table\"><tbody><tr><th>Assessment criteria</th><th>foundation route</th><th>comprehensive route</th></tr><tr><td>Ecological enhancement</td><td>1 credit</td><td>1 credit</td></tr><tr><td>Quantifying change in ecological value</td><td>Not applicable</td><td>up to 3 credits + 1 exemplary credit</td></tr><tr><td>Urban Greening Factor</td><td>Not applicable</td><td>1 credit</td></tr><tr><td>Total credits available</td><td>1 credit</td><td>4 credits + 1 exemplary</td></tr></tbody></table></div>" },
            { title: "Table 90", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 90: Credits awarded based on output from the Biodiversity Metric</div><table class=\"criteria-table\"><tbody><tr><th>Description</th><th>output from the Biodiversity Metric</th><th>Credits awarded</th><th>Additional requirements</th></tr><tr><td>No net loss</td><td>≥ 0%</td><td>1</td><td>The total area of habitat created or enhanced should cover at least 2.5% of the site area.</td></tr><tr><td rowspan=\"2\">net gain</td><td>≥ 5%</td><td>2</td><td rowspan=\"2\">The total area of habitat created or enhanced should cover at least 2.5% of the site area.</td></tr><tr><td>≥ 10%</td><td>3</td></tr><tr><td>Significant net gain</td><td>≥ 20%</td><td>3 + 1 exemplary</td><td>The total area of habitat created or enhanced should cover at least 10 %ofthesitearea.</td></tr></tbody></table></div>" , after_num: "5" },
            { title: "Table 91", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 91: Urban Greening Factor – Targets based on asset type</div><table class=\"criteria-table\"><tbody><tr><th>asset type</th><th>UGF</th></tr><tr><td>Residential (Including residential institutions)</td><td>0.6</td></tr><tr><td>Offices, retail, industrial, hospitality, culture &amp; entertainment, sports &amp; leisure</td><td>0.3</td></tr><tr><td>Community, education, healthcare, government services, transport hub</td><td>0.4</td></tr><tr><td>Daycare centre</td><td>0.6</td></tr><tr><td>If target is set by local authority</td><td>Targetset+ 0. 1 OR BREEAM target( whichever is higher)</td></tr></tbody></table></div>" , after_num: "6" },
        ]
    },
    'Lue05': {
        aim: "To secure ongoing monitoring, management and maintenance of the site and its habitats and ecological features, to ensure intended outcomes are realised for the long term.",
        criteria: [
            { points: "Prerequisite – Ecological change and enhancement", numbered: [
                { num: "1", text: "Achieve at least one credit in Lue 04." },
            ]},
            { points: "One credit – Handover to building owner or tenant", numbered: [
                { num: "2", text: "A section on ecology and biodiversity has been included as part of the information supplied to the tenant or building owner. This information must be in a separate document from the landscape and ecology management plan (which is covered by criterion 3) and:", subitems: [
                    { num: "2.a", text: "Inform the building owner or tenant about local ecological features and biodiversity associated with the site (see M1) including an 'as-built' biodiversity metric calculation (where relevant)." },
                    { num: "2.b", text: "Include detailed management and maintenance plans and relevant handover information to minimise loss of planting during establishment phase (see M1)." },
                ]},
            ]},
            { points: "One credit – Landscape and ecology management plan", numbered: [
                { num: "3", text: "A landscape and ecology management plan, or equivalent, has been developed by an ecologist. This will cover detailed plans for an initial 5-year establishment period and maintenance of the scheme, as well as an additional 25-year management strategy. The whole plan should cover a period of 30 years in total. The plan includes:", subitems: [
                    { num: "3.a", text: "Actions and responsibilities of relevant individuals before handover." },
                    { num: "3.b", text: "The ecological value and condition of the site at handover and how this is expected to develop and change over time." },
                    { num: "3.c", text: "Procedures to monitor and review the on-going implementation and effectiveness of measures, incorporating an adaptive management approach." },
                    { num: "3.d", text: "Risk register, including trigger for action and remedial measures with consideration on how these feed into monitoring requirements (see M2.4)." },
                    { num: "3.e", text: "Maintenance and management plans for the retained, enhanced and created habitats, as well as any features for protected species. This should include a detailed work schedule outlining relevant maintenance on a monthly basis for the first five years after completion." },
                    { num: "3.f", text: "Identifying opportunities for ongoing alignment with activities external to the asset." },
                    { num: "3.g", text: "Clearly defined responsibilities and competencies of those delivering the plan." },
                ]},
            ]},
        ],
        tables: [
            { title: "Table 93", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 93: Credits by assessment route (for Lue 05)</div><table class=\"criteria-table\"><tbody><tr><th>Assessment criteria</th><th>foundation route</th><th>comprehensive route</th></tr><tr><td>Handover to building owner or tenant</td><td rowspan=\"2\">1 credit</td><td>1 credit</td></tr><tr><td>Landscape and ecology management plan</td><td>1 credit</td></tr></tbody></table></div>" },
        ]
    },
    'Man01': {
        aim: "To recognise and encourage an integrated design process that optimises building performance resulting from robust stakeholder engagement.",
        criteria: [
            { points: "One credit – Project planning", numbered: [
                { num: "1", text: "A clear brief is developed prior to completion of the concept design, to include input from all design team members and this information is shared with all relevant parties. This clear briefing document sets out the particular ambitions for the project:", subitems: [
                    { num: "1.a", text: "Client requirements, e.g. internal environmental conditions required." },
                    { num: "1.b", text: "Sustainability objectives and targets, including BREEAM performance targets and any wider business or project sustainability objectives." },
                    { num: "1.c", text: "Timescales and budget." },
                    { num: "1.d", text: "List of consultees and professional appointments that may be required, e.g. suitably qualified acoustician (SQA) etc." },
                    { num: "1.e", text: "Constraints for the project, e.g. technical, legal, physical, environmental." },
                ]},
                { num: "2", text: "Prior to completion of the concept design, the project team (Client, Design Team and Principal Contractor (see M1 where not yet appointed)) meet specifically to discuss, identify and define the roles, responsibilities and contributions for each key phase of the project. When defining responsibilities, the following must be considered:", subitems: [
                    { num: "2.a", text: "Building user requirements." },
                    { num: "2.b", text: "Aims of the design and design strategy." },
                    { num: "2.c", text: "Particular installation and construction requirements and limitations." },
                    { num: "2.d", text: "Design and construction risk assessments, e.g. national health and safety regulations or best practice, legionella risk assessment." },
                    { num: "2.e", text: "Legislative requirements, e.g. local building regulations, heritage requirements." },
                    { num: "2.f", text: "Sustainability objectives for the project." },
                    { num: "2.g", text: "Ecological protection measures (where required)." },
                    { num: "2.h", text: "Procurement and supply chain – responsible and ethical sourcing." },
                    { num: "2.i", text: "Identifying and measuring project success in line with project brief objectives." },
                    { num: "2.j", text: "Building manager\'s or occupiers\' budget and technical expertise in maintaining any proposed systems." },
                    { num: "2.k", text: "Maintainability and adaptability of the proposals." },
                    { num: "2.l", text: "Requirements for the production of project and end user documentation." },
                    { num: "2.m", text: "Requirements for commissioning, training and aftercare support." },
                ]},
                { num: "3", text: "The project team demonstrate how the project delivery stakeholders\' contributions and their input in the design process have influenced the following:", subitems: [
                    { num: "3.a", text: "Initial Project Brief" },
                    { num: "3.b", text: "Project Execution Plan" },
                    { num: "3.c", text: "Communication Strategy" },
                    { num: "3.d", text: "Concept Design" },
                    { num: "3.e", text: "Final design (at post-construction)" },
                ]},
            ]},
            { points: "One credit – Stakeholder consultation", numbered: [
                { num: "4", text: "Prior to completion of the Concept Design, the design team consult with all interested parties on matters that covers the minimum consultation content (see M2)." },
                { num: "5", text: "The project must demonstrate concisely how the interested party contributions and outcomes of the consultation exercise have influenced or changed the initial project brief and concept design; and these changes were implemented within the final design at post-construction." },
                { num: "6", text: "Prior to completion of the detailed design (Technical Design or equivalent), consultation feedback has been given to, and received by, all relevant parties." },
            ]},
            { points: "One credit – BREEAM AP – Concept design", numbered: [
                { num: "7", text: "A BREEAM Advisory Professional (AP) has been appointed to facilitate the setting and achievement of BREEAM performance targets for the project. Their involvement must be early in the design process (see M3.2) to:", subitems: [
                    { num: "7.a", text: "Work with the project team, including the client, to consider the links between BREEAM issues and assist them in maximising the project\'s overall performance against BREEAM, from their appointment and throughout Concept Design." },
                    { num: "7.b", text: "Monitor progress against the agreed performance targets throughout all stages after their appointment where decisions critically impact BREEAM performance." },
                    { num: "7.c", text: "Proactively identify risks and opportunities related to the achievement of the agreed targets." },
                    { num: "7.d", text: "Provide feedback to the project team as appropriate, to support them in taking corrective actions and achieving their agreed performance targets." },
                    { num: "7.e", text: "Monitor and, where relevant, coordinate the generation of appropriate evidence by the project team." },
                ]},
                { num: "8", text: "The defined BREEAM performance targets have been formally agreed between the client and design or project team no later than the concept design work stage." },
                { num: "9", text: "To achieve this credit at the interim design stage assessment, the agreed BREEAM performance targets must be demonstrably achieved by the project design. This must be demonstrated via the BREEAM Assessor\'s design stage assessment report." },
            ]},
            { points: "One credit – BREEAM AP – Monitoring progress", numbered: [
                { num: "10", text: "Achieve the credit for BREEAM AP – Concept design (criteria 7 to 9)." },
                { num: "11", text: "A BREEAM Advisory Professional (AP) has been appointed to monitor progress against the agreed BREEAM performance targets throughout the design process and formally report progress to the client and design team. They must:", subitems: [
                    { num: "11.a", text: "Work with the project team, including the client, to consider the links between BREEAM issues and to assist them in maximising the project\'s overall performance against BREEAM throughout Developed Design." },
                    { num: "11.b", text: "Monitor progress against the performance targets agreed under criterion 8 throughout all stages where decisions critically impact the specification and tendering process and the BREEAM performance." },
                    { num: "11.c", text: "Proactively identify risks and opportunities related to the achievement of the targets agreed under criterion 8." },
                    { num: "11.d", text: "Provide feedback to the project team as appropriate, to support them in taking corrective actions and achieving their agreed performance targets." },
                    { num: "11.e", text: "Monitor and, where relevant, coordinate the generation of appropriate evidence by the project team." },
                ]},
                { num: "12", text: "The BREEAM AP – Design must attend key project and design team meetings during the concept design, developed design and technical design work stages. Reporting must be carried out during and prior to completion of each stage, as a minimum." },
            ]},
        ]
    },
    'Man02': {
        aim: "To deliver whole life value by encouraging life cycle costing and service life planning. This entails improving design, project specification, life-cycle maintenance and operation. Additionally, this issue emphasizes the importance of transparent capital cost reporting to promote economic sustainability.",
        criteria: [
            { points: "Two credits – Elemental LCC options appraisal", numbered: [
                { num: "1", text: "A competent person carries out an outline, entire asset elemental life cycle cost (LCC) options appraisal (at least two) at the Concept Design stage in line with ISO 15686-5:2017.(2)" },
                { num: "2", text: "The elemental LCC plan:", subitems: [
                    { num: "2.a", text: "Provides an indication of future replacement costs over a period of analysis as required by the client (e.g. 20, 30, 50 or 60 years)." },
                    { num: "2.b", text: "Includes service life, maintenance and operation cost estimates." },
                ]},
                { num: "3", text: "Demonstrate, using appropriate examples provided by the design team, how the elemental LCC plan has been used to influence building and systems design and specification to minimise life cycle costs and maximise critical value." },
            ]},
            { points: "One credit – Component level LCC options appraisal", numbered: [
                { num: "4", text: "A competent person develops a component level LCC options appraisal (at least two) by the end of Technical Design stage (equivalent to Process Stage 4) in line with ISO 15686-5:2017, and includes the following component types (where present):", subitems: [
                    { num: "4.a", text: "Envelope, e.g. cladding, windows, or roofing." },
                    { num: "4.b", text: "Services, e.g. heat source, cooling source or controls, also intelligent lighting controls against standard controls." },
                    { num: "4.c", text: "Finishes, e.g. walls, floors or ceilings." },
                    { num: "4.d", text: "External spaces, e.g. alternative hard landscaping, boundary protection." },
                ]},
                { num: "5", text: "Demonstrate, using appropriate examples provided by the design team, how the component level LCC options appraisal has been used to influence building and systems design, and specification to minimise life cycle costs and maximise critical value." },
            ]},
            { points: "One credit – Capital cost reporting", numbered: [
                { num: "6", text: "Report the capital cost for the building per unit of gross internal area (GIA)." },
            ]},
        ]
    },
    'Man03': {
        aim: "To encourage construction sites which are managed in an environmentally and socially considerate, responsible and accountable manner.",
        criteria: [
            { points: "Prerequisite – Legally harvested and traded site timber", numbered: [
                { num: "1", text: "All temporary site timber and timber-based products (excluding reused timber) used during the construction process of the project must be \'Legally harvested and traded timber\'." },
            ]},
            { points: "Prerequisite – Health and safety legislation", numbered: [
                { num: "2", text: "All national health and safety legislation and regulations for construction sites are considered and implemented during all phases of the project (see CN1 on page 58):", subitems: [
                    { num: "2.a", text: "The design of the asset; to minimise health and safety risks." },
                    { num: "2.b", text: "Pre-construction work planning and organisation; to collate health and safety information from all relevant stakeholders." },
                    { num: "2.c", text: "Site set-up; to implement health and safety features." },
                    { num: "2.d", text: "Construction; to manage, monitor and report on the health and safety of construction site staff. This should be summarised in a report." },
                ]},
            ]},
            { points: "One credit – Environmental management", numbered: [
                { num: "3", text: "All parties who manage the construction site at any stage must operate an environmental management system (EMS) covering their main operations. The EMS must be third-party certified to ISO 14001, EMAS (EU Eco-Management and Audit Scheme), or an equivalent standard." },
                { num: "4", text: "All parties who manage the construction site at any stage (for example, the principal contractor or demolition contractor) must implement best practice pollution prevention policies and procedures on site. To demonstrate compliance the project team should complete the checklist given in Table 11 on page 56 showing how the intent of every section (e.g. air quality) has been met, even if by different means than the actions suggested. For EU Taxonomy alignment, please refer to M5." },
            ]},
            { points: "One credit – BREEAM Advisory Professional – Site", numbered: [
                { num: "5", text: "The client must formally agree with the contractor the performance targets relating to the BREEAM certification that have been set for the project." },
                { num: "6", text: "A BREEAM AP must be involved in the project at an appropriate time and level to ensure that the agreed performance targets are met. Specifically, the AP must:", subitems: [
                    { num: "6.a", text: "Work with the project team, including the client, to help them maximize performance against the agreed targets throughout construction, handover and closeout. This support will include considering links between the criteria that need to be met across all project areas to be assessed by BREEAM (e.g., Management, Energy, Ecology etc), going beyond the design intent wherever possible." },
                    { num: "6.b", text: "Monitor progress against the agreed performance targets throughout all stages of the construction, paying particular attention wherever decisions are made that could critically impact the BREEAM performance, and keeping all records needed as evidence for the assessment." },
                    { num: "6.c", text: "Proactively identify risks and opportunities related to the procurement and construction processes and the achievement of the targets agreed under criterion 5." },
                    { num: "6.d", text: "Feedback promptly and regularly to the contractor and project team helping the project stay on track to meet its targets and supporting any necessary corrective actions." },
                    { num: "6.e", text: "Where appropriate, coordinate and help the project team to provide the assessor with the necessary evidence to achieve the credits." },
                ]},
                { num: "7", text: "To achieve this credit at the final post-construction stage of assessment, the submitted assessor\'s report must show that a BREEAM AP was appointed and that the agreed performance targets have been demonstrably achieved by the project." },
            ]},
            { points: "Up to two credits – Responsible construction management", numbered: [
                { num: "8", text: "For small-scale projects or single dwellings:", subitems: [
                    { num: "8.a", text: "The contractor must achieve items listed f, h, i, j and m (as listed within Table 10) to achieve one credit." },
                    { num: "8.b", text: "Where the contractor achieves those items checked as 'required for one credit (for standard projects)' in Table 10, the small-scale project or single dwelling may achieve two credits." },
                ]},
                { num: "9", text: "All buildings not defined as small-scale projects or single dwellings are considered to be standard projects and credits are awarded as follows:", subitems: [
                    { num: "9.a", text: "All items checked as 'required for one credit (for standard projects)' in Table 10 must be achieved for one credit to be awarded." },
                    { num: "9.b", text: "Projects achieving criterion 9.a plus six additional items in Table 10 may be awarded a second credit." },
                ]},
            ]},
            { points: "Up to two credits – Site monitoring", numbered: [
                { num: "10", text: "Assign responsibility for site monitoring to a named individual. This is a prerequisite for the award of any of the site monitoring credits set out below. The responsible individual must have the appropriate authority and experience to access the data required. They may be the BREEAM AP, where one has been appointed. They will be required to monitor, record and report on energy use, water consumption and transport data (where measured) resulting from all on-site construction processes (and dedicated off-site manufacturing) throughout the build programme. Report the project value." },
            ]},
            { points: "One credit – Monitoring utility consumption", numbered: [
                { num: "11", text: "Set targets at design stage for the site energy consumption in kWh (and where relevant, litres of fuel used) resulting from the use of construction plant, equipment (mobile and fixed), and site accommodation." },
                { num: "12", text: "Monitor and record data for the energy consumption described in criterion 11 and show that the consumption targets have been achieved." },
                { num: "13", text: "Report the total carbon dioxide emissions (total kgCO₂e) and energy consumption (electricity in kWh and litres of fuel) resulting from the construction process." },
                { num: "14", text: "Set targets at design stage for the potable water consumption (m³) arising from the use of construction plant, equipment (mobile and fixed), and site accommodation." },
                { num: "15", text: "Monitor and record data for the potable water consumption described in criterion 14 and show that the consumption targets have been achieved." },
                { num: "16", text: "Use the collated data to report the total net water consumption resulting from the construction process (m³), i.e. consumption minus any recycled water use." },
            ]},
            { points: "One credit – Monitoring transport of construction materials and waste", numbered: [
                { num: "17", text: "Set targets at design stage and monitor and record data relating to transport movements and other impacts resulting from delivery of the majority of construction materials to the site and removal of construction waste from the site (see M4). As a minimum this must cover:", subitems: [
                    { num: "17.a", text: "Transport of materials from the point of supply to the building site, including any transport, intermediate storage and distribution." },
                    { num: "17.b", text: "The scope of this monitoring must cover the materials used within the following as a minimum:", subitems: [
                        { num: "17.b.i", text: "Superstructure, as listed in Table 73 in Mat 03." },
                        { num: "17.b.ii", text: "Internal finishes, as listed in Table 74 in Mat 03." },
                        { num: "17.b.iii", text: "Substructure and hard landscaping, as listed in Table 75 in Mat 03." },
                        { num: "17.b.iv", text: "Core building services, as listed in Table 76 in Mat 03." },
                    ]},
                    { num: "17.c", text: "Transport of construction waste from the construction gate to waste disposal processing or the recovery centre gate. Monitoring must cover the construction waste groups outlined in the project\'s waste management plan." },
                ]},
                { num: "18", text: "Using the collated data, report separately for materials and waste, the total transport-related carbon dioxide emissions (kgCO₂e), plus the total distance travelled (km) and amount of fuel used (litres)." },
            ]},
            { points: "One exemplary credit – Responsible construction management", numbered: [
                { num: "19", text: "Achieve all items in Table 10." },
            ]},
        ],
        tables: [
            { title: "Table 10", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 10: Checklist of the required criteria to achieve credits for responsible construction management</div><table class=\"criteria-table\"><tbody><tr><th>Ref.</th><th>criteria</th><th>required for one credit (for standard projects)</th></tr><tr class=\"section-header\"><td colspan=\"3\">Risk evaluation and implementation</td></tr><tr class=\"section-header\"><td colspan=\"3\">The principal contractor evaluates the risks (on site and off site), plans and implements actions to minimise the identified risks, covering the following, as appropriate:</td></tr><tr class=\"section-header\"><td colspan=\"3\">Vehicle movement</td></tr><tr><td>a</td><td>Manage the construction site entrance to minimise the impacts (e.g. safety, disruption) arising from vehicles approaching and leaving the development footprint.</td><td class=\"check-cell\">✔</td></tr><tr><td>b</td><td>Ensure the development footprint is accessible for delivery vehicles fitted with safety features (e.g. side under run protection) to remove or limit the need for on-street loading or unloading. Where on-street loading is unavoidable, this should be appropriately managed.</td><td></td></tr><tr><td>c</td><td>Identify access routes to the development footprint, including for heavy vehicles to minimise traffic disruption and safety risks to others.</td><td></td></tr><tr class=\"section-header\"><td colspan=\"3\">Pollution management</td></tr><tr><td>d</td><td>Minimise the risks of air, land and water pollution (for EU Taxonomy compliance, see M5).</td><td class=\"check-cell\">✔</td></tr><tr><td>e</td><td>Minimise the risks of nuisance from vibration, light and noise pollution.</td><td class=\"check-cell\">✔</td></tr><tr class=\"section-header\"><td colspan=\"3\">Tidiness</td></tr><tr><td>f</td><td>Implement practices to ensure the development footprint is safe, clean and organised at all times. This includes, but is not limited to, facilities, materials and waste storage.</td><td class=\"check-cell\">✔</td></tr><tr><td>g</td><td>Ensure clear and safe access in and around the buildings at the point of handover.</td><td class=\"check-cell\">✔</td></tr><tr class=\"section-header\"><td colspan=\"3\">Health and wellbeing</td></tr><tr><td>h</td><td>Provide processes and equipment required to respond to medical emergencies.</td><td class=\"check-cell\">✔</td></tr><tr><td>i</td><td>Identify and implement initiatives to promote and maintain the health and wellbeing of all site operatives within the development footprint. This can involve site facilities, site management arrangements, staff policies etc.</td><td class=\"check-cell\">✔</td></tr><tr><td>j</td><td>Establish management practices and facilities encouraging equality, fair treatment and respect of all site operatives and visitors.</td><td class=\"check-cell\">✔</td></tr><tr><td>k</td><td>Provide secure, clean and organised facilities (e.g. welfare, changing and storage facilities) for site operatives within the development footprint.</td><td></td></tr><tr class=\"section-header\"><td colspan=\"3\">Security processes</td></tr><tr><td>l</td><td>Minimise risks of the site becoming a focus for antisocial behaviour in the local community (e.g. robust perimeter fencing, CCTV, avoid creating dark corners etc.).</td><td></td></tr><tr class=\"section-header\"><td colspan=\"3\">Training, awareness and feedback</td></tr><tr class=\"section-header\"><td colspan=\"3\">See Methodology M 3. The principal contractor is responsible for:</td></tr><tr><td>m</td><td>Minimising nuisance and intrusion on the lives of the local community, and engaging with the community and neighbourhood to ensure that any unavoidable impacts of construction are communicated regularly and sensitively.</td><td class=\"check-cell\">✔</td></tr><tr><td>n</td><td>Ensuring ongoing and up-to-date training is provided for personnel and visitors (covering items a to l, as appropriate.)</td><td></td></tr><tr><td>o</td><td>Ensuring all site operatives are trained for the tasks they are undertaking (including any site-specific considerations).</td><td></td></tr><tr><td>p</td><td>Promoting safety on and off-site by ensuring driving and operator training and safety awareness have been undertaken for any company vehicles (cars and vans), movable plant and equipment (such as dumpers, diggers, cranes), trucks, lorries or waste removal wagons whether owned, leased or hired by the principal contractor.</td><td></td></tr><tr class=\"section-header\"><td colspan=\"3\">Monitoring and reporting</td></tr><tr class=\"section-header\"><td colspan=\"3\">The principal contractor ensures:</td></tr><tr><td>q</td><td>Any vehicular accidents, incidents and near misses, on-site or in the vicinity of the site entrance and relating to site activities, are recorded, investigated and analysed and that learnings are incorporated in updated policies and training.</td><td></td></tr><tr><td>r</td><td>All visitor, workforce and community accidents, incidents and near misses are recorded and action is taken to reduce the likelihood of them reoccurring.</td><td class=\"check-cell\">✔</td></tr><tr><td>s</td><td>Processes are in place to facilitate collecting and recording feedback from the community and to address any concerns related to the development footprint.</td><td></td></tr></tbody></table></div>" , after_num: "19" },
            { title: "Table 11", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 11: Checklist of measures to minimise air and water pollution during construction works</div><table class=\"criteria-table\"><tbody><tr><th>Section and intent</th><th>Examples of actions</th></tr><tr><td>1. Pollution prevention planning To allow time to plan and prepare before work begins on site. This can significantly reduce the risk of a pollution incident.</td><td>Possible activities to consider before works begin on site:  — Review the site and site plans for possible sources of pollution, pollution pathways and vulnerable areas.  — Review any environmental information about the site such as ecology reports or site investigation reports and highlight potential issues. This could include site working restrictions relating to noise or deliveries.  — Identify:      — Potential pollutants      — The potential to cause pollution on site.      — All interested group si. e. regulators and neighbours.      — Surface waters and ground waters adjacent to the site.      — Drainage on site.  — Confirm any legislation that applies to the project.  — Plan appropriate control measures that are required.  — Designate a responsible person to monitor high risk activities and with sufficient authority to prevent them.</td></tr><tr><td>2. Noise and vibration  Minimise the impact of noise and vibration in the local community.</td><td>Measures may include where applicable:  — Planning the noisiest activities for times that will result in the least disturbance to the local community.  — Putting together a traffic management plan. — Use of barriers or deflectors for impact and blasting activities.  — Usingplantormachinerywithnoisecontrols measures–silencers, mufflers, acoustic covers. — Avoiding or minimising construction transport through community areas, use of one- way traffic to minimise reversing, agreed delivery times.</td></tr><tr><td>3. Air quality To prevent dust and other air pollution on site and in the local community.</td><td>This may include where applicable: — Minimising dust from materials or waste ensuring these are adequately protected, covered, or damped down.  — Reducing dust from vehicle movements through damping down roads, wheel washers, and road sweeping.  — Avoiding burning of materials on site. — Ensuring plant and vehicles are regularly maintained and meet necessary exhaust emission standards.</td></tr><tr><td>4. Watercourse pollution To prevent water pollution from on- site activities.</td><td>This may include where applicable:  — Marking up a plan identifying all watercourses and existing drains on site, any existing protection in place or protection measures required to capture, contain, and treat possible contaminants or run- off.  — Controls to prevent silt entering watercourses and drains including features such as cut- off trenches or vegetation corridors.  — Ensuring fuel, chemical and waste storage areas and activities such as cement mixing or washing out are located away from rivers, boreholes, gullies or other watercourses.  — Storing all chemicals and hazardous substances in a contained, bunded areas on an impermeable surface and ensuring all containers are free from damage and disposed of correctly.  — Training staff on the correct transfer and handling of fuels and chemicals, and emergency procedures. — Providing portable spill containment and clean- up equipment on site and training staff to use it.  — Where there is a risk to water quality, carrying out an assessment on the impact on water and developing a water use and protection management plan( for EU Taxonomy compliance, see M 5).</td></tr></tbody></table></div>" , after_num: "4" },
        ]
    },
    'Man04': {
        aim: "To encourage a properly planned handover and commissioning process that reflects the needs of the building occupants.",
        criteria: [
            { points: "One credit – Schedule and responsibilities", numbered: [
                { num: "1", text: "Prepare a schedule of commissioning and testing. The schedule identifies and includes a suitable timescale for commissioning and re-commissioning of all complex and non-complex building services and control systems and for testing and inspecting building fabric." },
                { num: "2", text: "The schedule must identify the appropriate standards that all commissioning activities will be conducted in accordance with. This will include national best practice commissioning codes or other appropriate standards, where applicable. See CN1." },
                { num: "3", text: "Where a building management system (BMS) is specified:", subitems: [
                    { num: "3.a", text: "Carry out commissioning of air and water systems when all control devices are installed, wired, and functional." },
                    { num: "3.b", text: "Include physical measurements of room temperatures, off-coil temperatures and other key parameters, as appropriate, in commissioning results." },
                    { num: "3.c", text: "The BMS or controls installation should be running in auto with satisfactory internal conditions prior to handover." },
                    { num: "3.d", text: "All BMS schematics and graphics (if BMS is present) are fully installed and functional to user interface prior to handover." },
                    { num: "3.e", text: "Fully train the occupier or facilities team in the operation of the system." },
                ]},
                { num: "4", text: "Appoint an appropriate project team member to monitor and programme pre-commissioning, commissioning and testing. Where necessary include re-commissioning activities on behalf of the client." },
                { num: "5", text: "The principal contractor accounts for the commissioning and testing programme, responsibilities and criteria within their budget and the main programme of works. The programme shall allow for the required time to complete all commissioning and testing activities prior to handover." },
            ]},
            { points: "One credit – Commissioning role", numbered: [
                { num: "6", text: "Achieve the schedule and responsibilities credit (criteria 1 to 5)." },
                { num: "7", text: "During the design stage, the client or the principal contractor appoints an appropriate project team member (see criterion 4), provided they are not involved in the general installation works for the building services systems, with responsibility for:", subitems: [
                    { num: "7.a", text: "Undertaking design reviews and giving advice that helps to streamline the commissioning process." },
                    { num: "7.b", text: "Providing commissioning management input to construction programming and during installation stages." },
                    { num: "7.c", text: "Management of commissioning, performance testing and handover or post-handover stages." },
                ]},
            ]},
            { points: "One credit – Envelope testing", numbered: [
                { num: "8", text: "Achieve the schedule and responsibilities credit (criteria 1 to 5)." },
                { num: "9", text: "Complete post-construction testing and inspection to quality-assure the integrity of the building fabric, including continuity of insulation, avoidance of thermal bridging and air leakage paths (this is through airtightness testing and a thermographic survey) (see M1). A suitably qualified professional undertakes the survey and testing in accordance with the appropriate standard (see M1.5). For EU Taxonomy alignment, please see M1.6." },
                { num: "10", text: "Rectify any defects identified during post-construction testing and inspection prior to building handover and close out. Any remedial work must meet the required performance characteristics for the building or element as defined at the design stage (see M1.4)." },
            ]},
            { points: "One credit – Handover", numbered: [
                { num: "11", text: "Prior to handover, develop two building or home user guides (see M2) for the following users:", subitems: [
                    { num: "11.a", text: "A non-technical user guide for distribution to the building occupiers." },
                    { num: "11.b", text: "A technical user guide for the premises facilities managers (may not be applicable to residential assessments with no shared or communal managed areas)." },
                ]},
                { num: "12", text: "Prepare two training schedules (see M3) timed appropriately around handover and proposed occupation plans for the following users:", subitems: [
                    { num: "12.a", text: "A non-technical training schedule for the building occupiers." },
                    { num: "12.b", text: "A technical training schedule for the premises facilities managers." },
                ]},
            ]},
        ]
    },
    'Man05': {
        aim: "To provide post-handover aftercare to the building owner or occupants during the first year of occupation to ensure the building operates and adapts, where relevant, in accordance with the design intent and operational demands.",
        criteria: [
            { points: "One credit – Aftercare support", numbered: [
                { num: "1", text: "Provide aftercare support to the building occupiers through having in place operational infrastructure and resources. This includes as a minimum:", subitems: [
                    { num: "1.a", text: "A meeting between the aftercare support team or individual, and the building occupier or management team (prior to initial occupation, or as soon as possible thereafter) to:", subitems: [
                        { num: "1.a.i", text: "Introduce the aftercare support available, including the content of the building user guide (where it exists) and training schedule." },
                        { num: "1.a.ii", text: "Present key information about features of the building including the design intent and how to use the building to ensure it operates as efficiently and effectively as possible." },
                    ]},
                    { num: "1.b", text: "On-site facilities management training including:", subitems: [
                        { num: "1.b.i", text: "A walkabout of the building." },
                        { num: "1.b.ii", text: "Introduction to and familiarisation with the building systems, their controls and how to operate them in accordance with the design intent and operational demands." },
                    ]},
                    { num: "1.c", text: "Provide initial aftercare support for at least the first month of building occupation, e.g. weekly attendance on-site, to support building users and management (the level of frequency will depend on the complexity of the building and building operations)." },
                    { num: "1.d", text: "Provide longer term aftercare support for occupiers for at least the first 12 months from occupation, e.g. a helpline, nominated individual or other appropriate system to support building users and management." },
                ]},
                { num: "2", text: "Establish operational infrastructure and resources to coordinate the collection and monitoring of energy and water consumption data for a minimum of 12 months, once the building is substantially occupied. This facilitates analysis of discrepancies between actual and predicted performance, with a view to adjusting systems and user behaviours accordingly (see M1)." },
            ]},
            { points: "One credit – In-use commissioning", numbered: [
                { num: "3", text: "Complete the following commissioning activities over a minimum 12-month period, once the building becomes substantially occupied:", subitems: [
                    { num: "3.a", text: "Complex systems: The specialist commissioning manager will:", subitems: [
                        { num: "3.a.i", text: "Identify changes made by the owner or operator that might have caused impaired or improved performance." },
                        { num: "3.a.ii", text: "Test all building services under full and part-load load conditions (see CN1)." },
                        { num: "3.a.iii", text: "Where applicable, carry out testing during periods of extreme (high or low) occupancy." },
                        { num: "3.a.iv", text: "Interview building occupants (where they are affected by the complex services) to identify problems or concerns regarding the effectiveness of the systems." },
                        { num: "3.a.v", text: "Compare sub-metered energy performance to the predicted energy performance." },
                        { num: "3.a.vi", text: "Identify inefficiencies and areas in need of improvement." },
                        { num: "3.a.vii", text: "Re-commission systems (following any work needed to serve revised loads) and incorporate any revisions in operating procedures into the operations and maintenance (O&M) manuals." },
                    ]},
                    { num: "3.b", text: "Simple systems: The external consultant, aftercare team, or facilities manager will:", subitems: [
                        { num: "3.b.i", text: "Review thermal comfort, ventilation, and lighting, at three, six and nine month intervals after initial occupation, either by measurement or occupant feedback." },
                        { num: "3.b.ii", text: "Identify deficiencies and areas in need of improvement." },
                        { num: "3.b.iii", text: "Re-commission systems and incorporate any relevant revisions in operating procedures into the O&M manuals." },
                    ]},
                ]},
            ]},
            { points: "One credit – Post-occupancy evaluation", numbered: [
                { num: "4", text: "The client or building occupier commits to carry out a post-occupancy evaluation (POE) exercise one year after the building is substantially occupied. This gains comprehensive in-use performance feedback (see criterion 5.b.v) and identifies gaps between design intent and in-use performance. The aim is to highlight any improvements or interventions that need to be made and to inform operational processes." },
                { num: "5", text: "An independent party carries out the POE covering:", subitems: [
                    { num: "5.a", text: "A review of the design intent and construction process (review of design, procurement, construction and handover processes)." },
                    { num: "5.b", text: "Feedback from a wide range of building users including facilities management on the design and environmental conditions of the building covering:", subitems: [
                        { num: "5.b.i", text: "Internal environmental conditions (light, noise, temperature, air quality)." },
                        { num: "5.b.ii", text: "Control, operation and maintenance." },
                        { num: "5.b.iii", text: "Facilities and amenities." },
                        { num: "5.b.iv", text: "Access and layout." },
                        { num: "5.b.v", text: "Energy and water consumption (see criterion 2 and M1)." },
                        { num: "5.b.vi", text: "Other relevant issues, where appropriate." },
                    ]},
                ]},
                { num: "6", text: "The independent party provides a report with lessons learned to the client and building occupiers." },
                { num: "7", text: "The client or building occupier commits funds to pay for the POE in advance. This requires an independent party to be appointed to carry out the POE as described in criterion 5." },
            ]},
            { points: "One exemplary credit – Zero carbon transition planning", numbered: [
                { num: "8", text: "Where net zero carbon benchmarks are not met for operational performance and fossil fuels are being used on-site, a competent person develops a Zero Carbon Transition Plan demonstrating how the asset will achieve net zero carbon in operation by 2050 at the latest (see M2)." },
            ]},
        ]
    },
    'Mat01': {
        aim: "To optimise the use of materials and reduce the environmental burden of construction products over the life cycle of the building.",
        criteria: [
            { points: "Two credits – Early design LCA and embodied carbon reporting", numbered: [
                { num: "1", text: "Carry out an early design phase LCA calculation from the materials that the project incorporates into the building. The LCA must:", subitems: [
                    { num: "1.a", text: "Meet the requirements for tools and scope given in M1." },
                    { num: "1.b", text: "Include relevant options appraisals, including a baseline assessment. There are no requirements to carry out a specific number of options appraisals for the project." },
                    { num: "1.c", text: "Be used as a basis for choosing design solutions and materials with the aim of achieving a low environmental impact. If an alternative solution with a lower environmental impact has not been chosen, then this must be justified." },
                ]},
                { num: "2", text: "From the early design LCA results (criterion 1), report the embodied carbon emissions from materials used in the building. Results must be reported using the BREEAM Platform. To ensure consistency follow the requirements in M2." },
            ]},
            { points: "One credit – Technical design LCA and embodied carbon reporting", numbered: [
                { num: "3", text: "Carry out a technical design phase LCA calculation from the materials that the project incorporates into the building. The LCA must:", subitems: [
                    { num: "3.a", text: "Meet the requirements for tools and scope given in M1." },
                    { num: "3.b", text: "Include at least one assessment showing the evolving design and specification at technical design." },
                ]},
                { num: "4", text: "From the technical design LCA results (criterion 3), report the embodied carbon emissions from materials used in the building. Results must be reported using the BREEAM Platform. To ensure consistency follow the requirements in M2." },
            ]},
            { points: "Two credits – Post-construction LCA and embodied carbon reporting", numbered: [
                { num: "5", text: "Carry out a post-construction phase LCA calculation from the materials that the project incorporates into the building. The LCA must:", subitems: [
                    { num: "5.a", text: "Meet the requirements for tools and scope given in M1." },
                    { num: "5.b", text: "Include as-built specification at post-construction." },
                ]},
                { num: "6", text: "From the post-construction LCA results (criterion 5), report the embodied carbon emissions from materials used in the building. Results must be reported using the BREEAM Platform. To ensure consistency follow the requirements in M2." },
                { num: "7", text: "For relevant assessment and building types, compare the calculated embodied carbon emissions (modules A1-A5, B1-B5, C1-C4) against the benchmark (see Table 68). The comparison against the benchmark must use the latest embodied carbon calculation available:", subitems: [
                    { num: "7.a", text: "For interim design stage assessment:", subitems: [
                        { num: "7.a.i", text: "Technical design LCA" },
                    ]},
                    { num: "7.b", text: "For final post-construction stage assessment:", subitems: [
                        { num: "7.b.i", text: "Post-construction LCA" },
                    ]},
                ]},
            ]},
            { points: "One exemplary credit – Third party verification", numbered: [
                { num: "8", text: "A suitably qualified third party verifies the building LCA work. The suitably qualified third party must:", subitems: [
                    { num: "8.a", text: "Produce a report describing how they have checked that the building LCA work accurately represents the designs under consideration during the:", subitems: [
                        { num: "8.a.i", text: "Early design phase, and" },
                        { num: "8.a.ii", text: "Technical design phase, and" },
                        { num: "8.a.iii", text: "Post-construction phase (only relevant if criteria 5 to 6 have been targeted)" },
                    ]},
                    { num: "8.b", text: "Itemise in the report the checks made for each LCA option. As a minimum, this must include the quality requirements shown in Table 69 in M3." },
                    { num: "8.c", text: "Include in the report details of their relevant skills and experience and a declaration of their third-party independence from the project client and design team." },
                ]},
                { num: "9", text: "Any recommendations in the third-party verification report must be resolved and evidenced." },
            ]},
            { points: "One exemplary credit – Embodied carbon public data disclosure", numbered: [
                { num: "10", text: "For each project phase where an LCA has been conducted, submit the LCA or carbon results and data to a relevant publicly available LCA or carbon database. If suitable local or national options are not available, submit to the Built" },
            ]},
        ],
        tables: [
            { title: "Table 68", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 68: Number of credits achieved for each benchmark band</div><table class=\"criteria-table\"><tbody><tr><th>benchmark band</th><th>credits</th></tr><tr><td>A</td><td>2 credits + 1 exemplary credit</td></tr><tr><td>B</td><td rowspan=\"2\">2 credits</td></tr><tr><td>C</td></tr><tr><td>D</td><td rowspan=\"2\">1 credit</td></tr><tr><td>E</td></tr><tr><td>F</td><td rowspan=\"2\">0 credits</td></tr><tr><td>G</td></tr><tr><td>Benchmark not applicable</td><td>Credits filtered out</td></tr></tbody></table></div>" , after_num: "7" },
        ]
    },
    'Mat02': {
        aim: "To encourage availability of robust and comparable data on the impacts of construction products through the provision of environmental product declarations (EPD).",
        criteria: [
            { points: "One credit – Product specification", numbered: [
                { num: "1", text: "Specify construction products with EPDs that achieve a total EPD points score of at least 20, according to M1." },
                { num: "2", text: "Enter the details of each EPD in the BREEAM Platform, including the material category classification. The EPD points score and the number of credits achieved will be calculated automatically." },
            ]},
        ]
    },
    'Mat03': {
        aim: "To ensure construction products that end up in the completed asset minimise negative environmental, economic, and social impacts across their supply chain.",
        criteria: [
            { points: "Prerequisite – Legally harvested and traded timber", numbered: [
                { num: "1", text: "All timber and timber-based products used on the project are Legally harvested and traded timber." },
            ]},
            { points: "One credit – Enabling sustainable procurement", numbered: [
                { num: "2", text: "A sustainable procurement plan must be used by the design team to guide specification towards sustainable construction products. The plan must:", subitems: [
                    { num: "2.a", text: "Be in place before the end of Concept Design." },
                    { num: "2.b", text: "Include sustainability aims, objectives, and strategic targets to guide procurement activities. Targets do not need to be achieved for the credit to be awarded at post-construction stage but justification must be provided for targets that are not achieved." },
                    { num: "2.c", text: "Include a requirement for assessing the potential to procure construction products locally. There must be a policy to procure construction products locally where possible." },
                    { num: "2.d", text: "Include details of procedures in place to check and verify the effective implementation of the sustainable procurement plan." },
                    { num: "2.e", text: "The documented policy and procedure must be disseminated to all relevant internal and external personnel, and included within the construction contract to ensure that they are enforceable on the assessed project." },
                    { num: "2.f", text: "Identify the risks and opportunities of procurement against a broad range of social, environmental, and economic issues following the process set out in ISO 20400:2017." },
                ]},
                { num: "3", text: "In the BREEAM Platform, use the Mat 03 calculator and follow M1 to determine the number of credits achieved for the construction products. Credits are awarded in proportion to the scope of the assessment – see M2 – and the number of points achieved, as set out in Table 72 below." },
            ]},
        ],
        tables: [
            { title: "Table 72", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 72: BREEAM credits available for each scope level and percentage of points achieved</div><table class=\"criteria-table\"><tbody><tr><th>credits achieved</th><th>Mat 03 minimum scope level</th><th>% of available points achieved</th></tr><tr><td>1 credit</td><td>Superstructure (see Table 73)</td><td>≥ 10%</td></tr><tr><td>2 credits</td><td rowspan=\"2\">As above, plus — Internal finishes( see Table 74) — Substructure and hard landscaping ( see Table 75)</td><td>≥ 20%</td></tr><tr><td>3 credits</td><td>≥ 30%</td></tr><tr><td>3 credits + 1 exemplary credit</td><td>As above, plus core building services (see Table 76)</td><td>≥ 50%</td></tr></tbody></table></div>" , after_num: "3" },
        ]
    },
    'Mat04': {
        aim: "To recognise and encourage adequate protection of exposed elements of the building and landscape, therefore minimising the frequency of replacement and maximising materials optimisation.",
        criteria: [
            { points: "One credit – Durability and resilience", numbered: [
                { num: "1", text: "Protection measures are incorporated into the building\'s design and construction to reduce damage to the building\'s fabric or materials in case of accidental or malicious damage occurring. These measures must provide protection against:", subitems: [
                    { num: "1.a", text: "Negative impacts of high user numbers in relevant areas of the building (e.g. corridors, lifts, stairs, doors etc.)." },
                    { num: "1.b", text: "Damage from any vehicle or trolley movements within 1 metre of the internal building fabric in storage, delivery, corridor and kitchen areas." },
                    { num: "1.c", text: "External building fabric damage by a vehicle. Protection where parking or manoeuvring areas are within 1 metre of the building façade and where delivery areas or routes are within 2 metres of the façade, i.e. specifying bollards or protection rails." },
                    { num: "1.d", text: "Potential malicious damage to building materials and finishes, in public and common areas where appropriate." },
                ]},
                { num: "2", text: "Key exposed building elements have been designed and specified to limit long and short term degradation due to environmental factors (see M3)." },
                { num: "3", text: "Produce an access to the roof and façade strategy for cost-effective cleaning, replacement and repair in the building\'s design." },
                { num: "4", text: "Design the roof and façade to prevent water damage, ingress and detrimental ponding." },
            ]},
        ]
    },
    'Mat05': {
        aim: "To recognise and encourage measures to optimise material efficiency to minimise the environmental impact of material use and waste without compromising on structural stability, durability or service life of the building.",
        criteria: [
            { points: "One credit – Material efficiency", numbered: [
                { num: "1", text: "At the Preparation and Brief and Concept Design stages, set targets and report on opportunities and methods to optimise the use of materials. This must be done for each of the following stages (see Table 81 on the next page):", subitems: [
                    { num: "1.a", text: "Preparation and Brief" },
                    { num: "1.b", text: "Concept Design" },
                    { num: "1.c", text: "Developed Design" },
                    { num: "1.d", text: "Technical Design" },
                    { num: "1.e", text: "Construction." },
                ]},
                { num: "2", text: "Develop and record the implementation of material efficiency, see Table 81 on the next page, during:", subitems: [
                    { num: "2.a", text: "Developed Design" },
                    { num: "2.b", text: "Technical Design" },
                    { num: "2.c", text: "Construction." },
                ]},
                { num: "3", text: "Report the targets and actual material efficiencies achieved." },
            ]},
        ]
    },
    'Pol01': {
        aim: "To reduce the impact of greenhouse gas emissions arising from the leakage of refrigerants used in heating and cooling systems in the building.",
        criteria: [
            { points: "Three credits – No refrigerant use", numbered: [
                { num: "1", text: "Where the building does not require the use of refrigerants within its installed plant or systems." },
            ]},
            { points: "Up to three credits – Buildings with systems that use refrigerants", numbered: [] },
            { points: "Prerequisite – Systems with refrigerants", numbered: [
                { num: "2", text: "All systems with electric compressors must comply with relevant safety standards for installing refrigerant systems (see M2.1)." },
                { num: "3", text: "The refrigerants used must have an ozone depletion potential of zero (see M2.2)." },
            ]},
            { points: "Up to two credits – Impact of refrigerant", numbered: [] },
            { points: "One credit", numbered: [
                { num: "4", text: "Systems using refrigerants (see M3) must have an average direct effect life cycle (DELC) carbon dioxide equivalent (CO₂e) emission rate of < 1000 kgCO₂e per kW of cooling or heating capacity." },
            ]},
            { points: "Two credits", numbered: [
                { num: "5", text: "Systems using refrigerants (see M3) must either:", subitems: [
                    { num: "5.a", text: "Have an average direct effect life cycle (DELC) carbon dioxide equivalent (CO₂e) emission rate of < 100 kgCO₂e per kW cooling or heating capacity." },
                    { num: "5.b", text: "Use a refrigerant with a global warming potential (GWP) of < 10 kgCO₂e/kg." },
                ]},
            ]},
            { points: "One credit – Leak detection", numbered: [
                { num: "6", text: "Systems using refrigerants are either:", subitems: [
                    { num: "6.a", text: "Hermetically sealed." },
                    { num: "6.b", text: "The refrigerant charge volume is < 500 tonnes of carbon dioxide equivalent (CO₂e)." },
                    { num: "6.c", text: "Use environmentally benign refrigerants (see M4.1)." },
                ]},
                { num: "7", text: "There must be either:", subitems: [
                    { num: "7.a", text: "A permanent automated refrigerant leak detection system that is capable of continuously monitoring for leaks." },
                    { num: "7.b", text: "An inbuilt automated diagnostic procedure for detecting leakage capable of continuously monitoring for leaks." },
                ]},
                { num: "8", text: "The leak detection system facilitates the isolation and containment of the remaining refrigerant charge in response to a leak detection incident." },
            ]},
        ]
    },
    'Pol02': {
        aim: "To contribute to a reduction in local air pollution through the use of no or low-emission combustion plant in the building.",
        criteria: [
            { points: "Up to three credits – No or low emission combustion plant", numbered: [] },
            { points: "Three credits – No installed combustion plant", numbered: [
                { num: "1", text: "Non-combustion systems supply all space heating and domestic hot water generation on-site." },
            ]},
            { points: "Up to two credits – Low-emission combustion plant", numbered: [
                { num: "2", text: "Emissions from all installed combustion plant that provide space heating or domestic hot water do not exceed the levels set in Table 95 below." },
            ]},
        ],
        tables: [
            { title: "Table 95", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 95: Credits awarded based on NOₓ emission levels (mg/kWh) by population density</div><table class=\"criteria-table\"><tbody><tr class=\"section-header\"><td colspan=\"4\">Maximum mg NOₓ/kWh fuel input in terms of gross calorific value (GCV)</td></tr><tr><th>1 credit( low population locations)</th><th>1 credit( high population locations)</th><th>2 credits( low population locations)</th><th>2 credits (high population locations)</th></tr><tr><td>56</td><td>27</td><td>27</td><td>24</td></tr></tbody></table></div>" , after_num: "2" },
        ]
    },
    'Pol03': {
        aim: "To avoid, reduce and delay the discharge of rainfall to public sewers and watercourses, thereby minimising the risk and impact of localised flooding on and off-site, watercourse pollution and other environmental damage.",
        criteria: [
            { points: "Prerequisite – Appropriate consultant", numbered: [
                { num: "1", text: "An appropriate consultant is appointed to carry out and demonstrate the development\'s compliance with all criteria." },
            ]},
            { points: "Up to two credits – Flood resilience", numbered: [] },
            { points: "Two credits – Low flood risk", numbered: [
                { num: "2", text: "A site-specific flood risk assessment (FRA) confirms the development is situated in a flood zone that is defined as having a low annual probability of flooding (in accordance with current best practice national planning guidance). The FRA must take all current and future sources of flooding into consideration (see M5)." },
            ]},
            { points: "One credit – Medium or high flood risk", numbered: [
                { num: "3", text: "A site-specific FRA, developed by an appropriate consultant, confirms the development is situated in a flood zone that is defined as having a medium or high annual probability of flooding and is not in a functional floodplain (in accordance with" },
                { num: "4", text: "To increase the resilience and resistance of the development to flooding, one of the following must be achieved:", subitems: [
                    { num: "4.a", text: "The ground level of the building and access to both the building and the site, are designed (or zoned) so they are at least 600 mm above the design flood level of the flood zone in which the assessed development is located (see M6) OR" },
                    { num: "4.b", text: "The final design of the building and the wider site reflects the recommendations made by an appropriate consultant." },
                ]},
            ]},
            { points: "Two credits – Surface water run-off", numbered: [] },
            { points: "Prerequisite for surface water run-off credits", numbered: [
                { num: "5", text: "Surface water run-off design solutions must be bespoke, i.e. they must take account of the specific site requirements and natural or man-made environment of and surrounding the site. The priority levels detailed in M7 must be followed, with justification given by the appropriate consultant where water is allowed to leave the site." },
            ]},
            { points: "One credit – Surface water run-off – Rate", numbered: [
                { num: "6", text: "For brownfield sites, drainage measures are specified so that the peak rate of run-off from the site to the watercourses (natural or municipal) shows a 30% improvement for the developed site compared with the pre-developed site. This should comply at the 1-year and 100-year return period events." },
                { num: "7", text: "For greenfield sites, drainage measures are specified so that the peak rate of run-off from the site to the watercourses (natural or municipal) is no greater for the developed site than it was for the pre-development site. This should comply at the 1-year and 100-year return period events." },
                { num: "8", text: "Relevant maintenance agreements for the ownership, long term operation and maintenance of all specified Sustainable Drainage Systems (SuDS) are in place." },
                { num: "9", text: "Calculations include an allowance for climate change. This should be made in accordance with current best practice planning guidance." },
            ]},
            { points: "One credit – Surface water run-off – Volume", numbered: [
                { num: "10", text: "Flooding of assessed buildings will not occur in the event of local drainage system failure (caused either by extreme rainfall or a lack of maintenance); AND" },
                { num: "11", text: "Specify drainage design measures that ensure post-development surface water run-off volume is no greater than the pre- development run-off volume. Show this with calculations for a 100-year 6-hour event adjusted for climate change, timing the event at the end of the development\'s expected life (see criterion 16 on the next page)." },
                { num: "12", text: "Any additional predicted volume of run-off for this event is prevented from leaving the site by using infiltration or other sustainable drainage system techniques." },
                { num: "13", text: "Justification from the appropriate consultant indicating why the above criteria cannot be achieved, i.e. where infiltration or other sustainable drainage system techniques are not technically viable options." },
                { num: "14", text: "Drainage design measures are specified to ensure that the post-development peak rate of run-off is reduced to the limiting discharge. The limiting discharge is defined as the highest flow rate from the following options:", subitems: [
                    { num: "14.a", text: "The pre-development 1-year peak flow rate; OR" },
                    { num: "14.b", text: "The mean annual flow rate Qbar; OR" },
                    { num: "14.c", text: "2 L/s/ha." },
                ]},
                { num: "15", text: "Relevant maintenance agreements for the ownership, long term operation and maintenance of all specified sustainable drainage systems are in place." },
                { num: "16", text: "For either option, above calculations must include an allowance for climate change; this should be made in accordance with current best practice planning guidance." },
            ]},
            { points: "Two credits – Surface water run-off – Single dwellings only", numbered: [] },
            { points: "Two credits – Surface water run-off – Single dwellings only", numbered: [
                { num: "17", text: "Either of the following criteria is met:", subitems: [
                    { num: "17.a", text: "There is a decrease in the impermeable area by 50% or more, from the pre-existing impermeable hard surfaces; OR" },
                    { num: "17.b", text: "Where all run-off from the roof for rainfall depths up to 5 mm from all new and existing parts of the building have been managed on site using source control methods." },
                ]},
            ]},
            { points: "One credit – Surface water run-off – Single dwellings only", numbered: [
                { num: "18", text: "Either of the following criteria is met:", subitems: [
                    { num: "18.a", text: "There is no increase in the impermeable surfaces as a result of the new construction; OR" },
                    { num: "18.b", text: "If there is an increase in the impermeable surfaces as a result of the new construction then the following must be met:", subitems: [
                        { num: "18.b.i", text: "Hard standing areas – where there is an extension or increase in the hardstanding areas and hence an increase in the total impermeable area as a result of the new construction, the hardstanding area must be permeable or be provided with on-site sustainable drainage systems to allow full infiltration of the additional volume, to achieve the same end result. The permeable hardstanding must include all pavements and public rights of way, car parks, driveways and private roads, but can exclude small garden paths which will drain onto a naturally permeable surface." },
                        { num: "18.b.ii", text: "Building (new-build or extension) – where there is an increase in building footprint, extending onto any previously permeable surfaces, the additional run-off caused by the area of the new-build or extension must be managed on site using an appropriate sustainable drainage system technique for rainfall depths up to 5 mm." },
                    ]},
                ]},
            ]},
            { points: "One credit – Minimising watercourse pollution", numbered: [
                { num: "19", text: "There is no discharge from the developed site for rainfall up to 5 mm (confirmed by the appropriate consultant)." },
                { num: "20", text: "In areas with a low-risk source of watercourse pollution, an appropriate level of pollution prevention treatment is provided, using appropriate sustainable drainage system techniques." },
                { num: "21", text: "Where there is a high risk of contamination or spillage of substances such as petrol and oil, separators (or an equivalent system) are installed in surface water drainage systems." },
                { num: "22", text: "Where the building has chemical or liquid gas storage areas, a means of containment is fitted to the site drainage system (i.e. shut-off valves) to prevent the escape of chemicals to natural watercourses (in the event of a spillage or bunding failure)." },
                { num: "23", text: "A comprehensive and up-to-date drainage plan of the site will be made available for the building or site occupiers." },
                { num: "24", text: "Relevant maintenance agreements for the ownership, long term operation and maintenance of all specified sustainable drainage systems must be in place." },
            ]},
        ]
    },
    'Pol04': {
        aim: "To ensure that lighting is concentrated in appropriate areas, minimise upward light, and reduce obtrusive light pollution. This aims to limit unnecessary energy consumption, minimise nuisance to neighbouring properties, and mitigate adverse impacts on transport systems and natural habitats.",
        criteria: [
            { points: "One credit – Reduction of light pollution", numbered: [
                { num: "1", text: "Light pollution has been eliminated through effective design that removes the need for artificial lighting at night. This does not adversely affect the safety and security of the site and its users." },
                { num: "2", text: "The lighting strategy has been designed to reduce obtrusive light. This includes both external lighting and internal lighting in spaces with glazed apertures." },
                { num: "3", text: "A curfew is established for all external lighting (except for safety and security lighting), which is automatically switched off between 23:00 and 07:00." },
                { num: "4", text: "Illuminated advertisements are designed to control brightness and minimise visual disturbance during nighttime hours." },
                { num: "5", text: "Lighting is designed to minimise impacts on nocturnal wildlife." },
            ]},
        ]
    },
    'Pol05': {
        aim: "To reduce the likelihood of noise arising from fixed installations on the new development affecting nearby noise-sensitive buildings.",
        criteria: [
            { points: "One credit – Noise level", numbered: [
                { num: "1", text: "Where there are, or will be, no noise-sensitive areas or buildings within an 800 m radius of the assessed site." },
                { num: "2", text: "Where the building does have noise-sensitive areas or buildings within an 800 m radius of the site, a noise impact assessment compliant with ISO 1996 series is commissioned. Noise levels must be measured or determined for:", subitems: [
                    { num: "2.a", text: "Existing background noise levels:", subitems: [
                        { num: "2.a.i", text: "At the nearest or most exposed noise-sensitive development to the proposed development or at a location where background conditions can be argued to be similar." },
                        { num: "2.a.ii", text: "Including existing plant on a building, where the assessed development is an extension to the building." },
                    ]},
                    { num: "2.b", text: "New noise level from the assessed building (see M1 and M2)." },
                ]},
                { num: "3", text: "The noise impact assessment must be carried out by a suitably qualified acoustic consultant holding a recognised acoustic qualification and membership of an appropriate professional body (see Definitions on page 403)." },
                { num: "4", text: "The noise level from the assessed building, as measured in the locality of the nearest or most exposed noise-sensitive development, must be at least 5 dB lower than the background noise throughout the day and night." },
                { num: "5", text: "Where the noise level from the proposed site or building is greater than the levels described in criterion 4, measures have been installed to attenuate the noise at its source to a level where it will comply with criterion 4." },
            ]},
        ]
    },
    'Tra01': {
        aim: "To enhance awareness of existing local transport and identify opportunities for sustainable transport improvements.",
        criteria: [
            { points: "Two credits – Transport assessment and travel plan", numbered: [
                { num: "1", text: "Conduct a site-specific transport assessment by the end of the Concept Design stage; see M1." },
                { num: "2", text: "Develop a site-specific travel plan following the transport assessment recommendations by the end of the Concept Design stage; see M3." },
                { num: "3", text: "Demonstrate that the travel plan can guide the appropriate implementation of sustainable transport measures during the design, construction, and occupancy stages and be supported by the building\'s management during operation." },
            ]},
        ]
    },
    'Tra02a': {
        aim: "To maximise the potential for people to choose public, active and lower-emission private transport by providing the site with convenient, sustainable options.",
        criteria: [
            { points: "Prerequisite – Transport assessment and travel plan", numbered: [
                { num: "1", text: "Complete a transport assessment and travel plan in line with Tra 01. If these documents are completed after Concept Design, they can still be used to meet this prerequisite." },
            ]},
            { points: "Up to 10 credits – Transport options implementation", numbered: [
                { num: "2", text: "Calculate the credits as follows:", subitems: [
                    { num: "2.a", text: "Refer to the score given in the Public Transport Accessibility Index (PTAI) as calculated in Tra 01. This score will be used to weight the points awarded in Tra 02." },
                    { num: "2.b", text: "Award points for the sustainable transport measures implemented in Tra 02, as per Table 48 on the next page." },
                    { num: "2.c", text: "Use Table 49 on page 226 to convert the number of points achieved for sustainable transport measures into credits, as weighted by the PTAI score." },
                ]},
            ]},
        ],
        tables: [
            { title: "Table 48", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 48: Summary of sustainable transport measures and points</div><table class=\"criteria-table\"><tbody><tr><th>option</th><th>sustainable transport measures</th><th>points</th></tr><tr class=\"section-header\"><td colspan=\"3\">Public transport measures</td></tr><tr><td>1</td><td>The existing PTAI calculated as per Tra 01 is worth one point if it is: a. ≥ 4 for rural location buildings, and further and higher education buildings. b. ≥ 8 for all other building types.</td><td>1</td></tr><tr><td>2</td><td>Improve the existing PTAI by at least 1.00  – any successful intervention receives the 3 full three points. For example:  — Negotiating with local public transport companies to increase service provision for the development. — Providing a diverted bus route, a new bus stop, or similar. — Providing a dedicated transport service, such as a bus route.</td><td>3</td></tr><tr><td>3</td><td>Provide up-to-date local public transport information in a convenient, accessible area 1 to help building users plan journeys by public transport.</td><td>1</td></tr><tr class=\"section-header\"><td colspan=\"3\">Private transport measures</td></tr><tr><td>4</td><td>Provide electric vehicle charging infrastructure, ≥ 7 kW EV charging points and associated cable routes, see M 1.</td><td>1 or 2</td></tr><tr><td>5</td><td>a. Set up a car sharing group or facility to promote car sharing among building 1 users. b. Actively market the car sharing scheme and provide communication channels that make it easy to join and use. c. Provide priority spaces for car sharers, allocating ≥ 5% of the total staff car parking capacity. d. Ensure that car share spaces are placed near the building entrance as the requirements of other types of priority parking (disabled, etc.) allow.</td><td>1</td></tr><tr class=\"section-header\"><td colspan=\"3\">Active travel measures</td></tr><tr><td>6</td><td>a. Engage with the local authority at the earliest (brief) stage to review public 2 cycle and pedestrian routes. b. Agree on possible improvements to the local active travel network that supplement existing plans and are relevant to the site/project. c. Select at least one such improvement and carry it out.</td><td>2</td></tr><tr><td>7</td><td>Install at least the minimum number of cycle storage spaces as set out in Table 53 (see 1 M2).</td><td>1</td></tr><tr><td>8</td><td>Having supplied cycle storage space as per Option 7 above, provide building users with at least two of the following facilities:  — Showers — Changing facilities — Lockers — Drying spaces. Wherefacilitiesarecombined–e. g. showersandchangingfacilities–itmustbepossible for different people to use the mat the same time if they are to count as more than one facility.</td><td>1</td></tr><tr><td>9</td><td>Existing amenities: Ensure at least three relevant amenity types within less than or equal to 500 mof proximity( see M 4).</td><td>1</td></tr><tr><td>10</td><td>New or enhanced amenities: Provide relevant and accessible new amenities within less than or equal to 500 mof the building entrance. These can be an enhanced existing amenity, or a new type of amenity( see M 4).</td><td>2 or 3</td></tr><tr class=\"section-header\"><td colspan=\"3\">Alternative transport measures</td></tr><tr><td>11</td><td>Carry ou tone site- specific improvement measure in line with the travel plan not listed as an option in Tra 02. Submit this for BRE review.</td><td>1 to 3</td></tr></tbody></table></div>" , after_num: "2.b" },
            { title: "Table 49", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 49: Credits awarded based on PTAI and the number of points achieved for sustainable transport measures</div><table class=\"criteria-table\"><tbody><tr class=\"section-header\"><td colspan=\"4\">number of points achieved for sustainable transport measures</td></tr><tr><th>PTAI &lt; 25</th><th>25 ≤ PTAI &lt; 40</th><th>PTAI ≥ 40</th></tr><tr><td>1</td><td>1</td><td></td><td>1</td></tr><tr><td>2</td><td></td><td>1</td><td>2</td></tr><tr><td>3</td><td>2</td><td></td><td>3</td></tr><tr><td>4</td><td></td><td>2</td><td>4</td></tr><tr><td>5</td><td>3</td><td></td><td>5</td></tr><tr><td>6</td><td>4</td><td>3</td><td>6</td></tr><tr><td>7</td><td>5</td><td></td><td>7</td></tr><tr><td>8</td><td>6</td><td>4</td><td>8</td></tr><tr><td>9</td><td>7</td><td>5</td><td>9</td></tr><tr><td>10 or more</td><td>8 or more</td><td>6 or more</td><td>10</td></tr></tbody></table></div>" , after_num: "2.c" },
        ]
    },
    'Tra02b': {
        aim: "To maximise the potential for people to choose public, active and lower-emission private transport by providing the site with convenient, sustainable options.",
        criteria: [
            { points: "Prerequisite – Transport assessment and travel plan", numbered: [
                { num: "1", text: "Complete a transport assessment and travel plan in line with Tra 01. If these documents are completed after Concept Design, they can still be used to meet this prerequisite." },
            ]},
            { points: "Up to eight credits – Transport options implementation", numbered: [
                { num: "2", text: "Calculate the credits as follows:", subitems: [
                    { num: "2.a", text: "Refer to the score given in the Public Transport Accessibility Index (PTAI) as calculated in Tra 01. This score will be used to weight the points awarded in Tra 02b." },
                    { num: "2.b", text: "Award points for the sustainable transport measures implemented in Tra 02b, as per Table 57 on the next page." },
                    { num: "2.c", text: "Use Table 58 on the next page to convert the number of points achieved for sustainable transport measures into credits, as weighted by the PTAI score." },
                ]},
            ]},
        ],
        tables: [
            { title: "Table 57", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 57: Summary of sustainable transport measures and points</div><table class=\"criteria-table\"><tbody><tr><th>option</th><th>sustainable transport measures</th><th>points</th></tr><tr><td colspan=\"3\">Public transport measures</td></tr><tr><td>1</td><td>The existing PTAI calculated as per Tra 01 is worth one point i fit is:  a. ≥ 4 for rural locations.  b. ≥ 8 for urban locations.</td><td>1</td></tr><tr><td>2</td><td>Improve the existing PTAI by at least 1. 00 –anysuccessfulinterventionreceivesthefull three points. For example: — Negotiating with local public transport companies to increase service provision for the development.  — Providing a diverted bus route, a new or enhanced bus stop, or other similar solutions.</td><td>3</td></tr><tr><td>3</td><td>Provide up-to-date local public transport information in a convenient, accessible area 1 to help building users plan journeys by public transport.</td><td>1</td></tr><tr><td colspan=\"3\">Private transport measures</td></tr><tr><td>4</td><td>Provide electric vehicle charging infrastructure (see M1).</td><td>1 or 2</td></tr><tr><td>5</td><td>Set up a car sharing group, a 'car club' where the members share the use of a locally based 2 fleet of vehicles.  a. The use of the vehicles must be charged on a 'pay-as-you-drive' basis.  b. The club must be introduced to residents in sales literature and during sales or open days.  c. Details of the scheme including costs and how to join should be provided to each dwelling.</td><td>2</td></tr><tr><td colspan=\"3\">Active travel measures</td></tr><tr><td>6</td><td>a. Engage with the local authority at the earliest (brief) stage to review public 2 cycle and pedestrian routes. b. Agree on possible improvements to the local active travel network that supplement existing plans and are relevant to the site/project. c. Select at least one such improvement and carry it out.</td><td>2</td></tr><tr><td>7</td><td>Install at least the minimum number of cycle storage spaces. This must be safe, secure, convenient, weather- proof and with easy and direct access. See M 2 and M 3.</td><td>1 or 2</td></tr><tr><td>8</td><td>Existing amenities: Ensure there are at least three relevant types of amenity within less or equal to 500 mof proximity( see M 4).</td><td>1 or 2</td></tr><tr><td>9</td><td>New or enhanced amenities: Provide relevant and accessible new amenities within less than or equal to 500 mof the building entrance. These can be an enhanced existing amenity, or a new amenity( see M 4).</td><td>2 or 3</td></tr><tr><td>10</td><td>Carry ou tone site- specific improvement measure in line with the travel plan that is not listed as an option in Tra 02 b. Submit this for BRE review.</td><td>1 to 3</td></tr></tbody></table></div>" , after_num: "2.b" },
            { title: "Table 58", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 58: Credits awarded based on PTAI and the number of points achieved for sustainable transport measures</div><table class=\"criteria-table\"><tbody><tr class=\"section-header\"><td colspan=\"4\">number of points achieved for sustainable transport measures</td></tr><tr><th>PTAI &lt; 25</th><th>25 ≤ PTAI &lt; 40</th><th>PTAI ≥ 40</th></tr><tr><td>1</td><td>1</td><td></td><td>1</td></tr><tr><td>2</td><td></td><td>1</td><td>2</td></tr><tr><td>3</td><td>2</td><td></td><td>3</td></tr><tr><td>4</td><td></td><td>2</td><td>4</td></tr><tr><td>5</td><td>3</td><td></td><td>5</td></tr><tr><td>6</td><td>4</td><td>3</td><td>6</td></tr><tr><td>7</td><td>5</td><td></td><td>7</td></tr><tr><td>8 or more</td><td>6 or more</td><td>4 or more</td><td>8</td></tr></tbody></table></div>" , after_num: "2.c" },
        ]
    },
    'Wat01': {
        aim: "To reduce the operational water consumption for sanitary uses in new buildings by installing water efficient components and rainwater collection and water recycling systems.",
        criteria: [
            { points: "", numbered: [
                { num: "1", text: "Determine the water efficiency of all in-scope water-consuming components." },
                { num: "2", text: "Determine the amount of recycled water expected from approved blackwater, greywater, and rainwater systems." },
                { num: "3", text: "The number of credits awarded is determined by the percentage improvement in potable water use in litres per person per day for the actual building compared to that of a baseline building are shown in Table 62 below." },
            ]},
        ],
        tables: [
            { title: "Table 62", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 62: Water consumption credits</div><table class=\"criteria-table\"><tbody><tr><th>Percentage improvement over baseline</th><th>number of credits</th></tr><tr><td>≥ 15%</td><td>1</td></tr><tr><td>≥ 30%</td><td>2</td></tr><tr><td>≥ 45%</td><td>3</td></tr><tr><td>≥ 60%</td><td>4</td></tr><tr><td>≥ 75%</td><td>5</td></tr><tr><td>≥ 85%</td><td>5 + 1 exemplary</td></tr></tbody></table></div>" , after_num: "3" },
        ]
    },
    'Wat02': {
        aim: "To encourage the installation of water sub-meters and leak detection to ensure water consumption can be monitored and managed in use.",
        criteria: [
            { points: "One credit – Water monitoring", numbered: [
                { num: "1", text: "A water meter with a pulsed or other open protocol output is installed on all potable water supplies entering the building." },
                { num: "2", text: "Water-consuming plant or building areas with significant water demand must be fitted with easily accessible sub-meters or have water monitoring equipment that is integral to the plant or area." },
                { num: "3", text: "There is a water monitoring system that is appropriate for the size of the building.", subitems: [
                    { num: "3.a", text: "For buildings with a gross internal area ≥ 1000 m², the water meters are connected to a monitoring and management system." },
                    { num: "3.b", text: "For buildings with a gross internal area < 1000 m², the water meters are either:", subitems: [
                        { num: "3.b.i", text: "Connected to an appropriate water monitoring and management system." },
                        { num: "3.b.ii", text: "Accessible meters with pulsed outputs or other open protocol communication outputs." },
                    ]},
                ]},
                { num: "4", text: "Those responsible for monitoring the building\'s water consumption must be able to clearly identify the water uses and areas covered by each meter." },
            ]},
        ]
    },
    'Wat03': {
        aim: "To reduce the impact of water leaks that may otherwise go undetected.",
        criteria: [
            { points: "One credit – Leak detection system", numbered: [
                { num: "1", text: "Install a leak detection system capable of detecting a major water leak:", subitems: [
                    { num: "1.a", text: "On the utilities\' water supply within the building, to detect any major leaks within the building." },
                    { num: "1.b", text: "Between the building and the utilities\' water supply, to detect any major leaks between the utilities\' supply and the building under assessment." },
                ]},
            ]},
            { points: "One credit – Flow control devices (all buildings except residential)", numbered: [
                { num: "2", text: "Flow control devices that regulate the supply of water to each WC area or facility according to demand are installed." },
            ]},
            { points: "One credit – Leak isolation (residential only)", numbered: [
                { num: "3", text: "Isolation valves are in an accessible place allowing for hot and cold water to be isolated by hand separately for the following supplies:", subitems: [
                    { num: "3.a", text: "Incoming supply to the dwelling" },
                    { num: "3.b", text: "Taps" },
                    { num: "3.c", text: "Showers" },
                    { num: "3.d", text: "Heating or hot water systems" },
                    { num: "3.e", text: "Appliances (e.g. dishwasher, washing machine etc.)" },
                ]},
                { num: "4", text: "The isolation valves must be clearly labelled." },
            ]},
        ]
    },
    'Wat04': {
        aim: "To recognise and encourage the procurement of water efficient equipment and systems for applications other than sanitary use in new buildings to reduce water consumption in operation.",
        criteria: [
            { points: "Up to three credits – Water efficient equipment and systems", numbered: [
                { num: "1", text: "Identify systems and equipment that use significant amounts of water for non-sanitary uses that are included in the project specification (see M1)." },
                { num: "2", text: "Determine the ratio of in-scope non-sanitary water consumption to sanitary water consumption to determine the number of credits available, see Table 65 below." },
                { num: "3", text: "Demonstrate installed non-sanitary water-using systems and equipment are water efficient (see M2)." },
                { num: "4", text: "Determine the number of credits awarded based on the percentage of non-sanitary water demands that are provided by water efficient equipment, see Table 66 below." },
            ]},
        ],
        tables: [
            { title: "Table 65", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 65: Credits available in Wat 04</div><table class=\"criteria-table\"><tbody><tr><th>In-scope non-sanitary water consumption / sanitary water consumption (%)</th><th>credits available</th></tr><tr><td>No in-scope equipment or systems OR 0 Water consumption of in-scope equipment and systems is not significant</td><td>0</td></tr><tr><td>&lt; 20%</td><td>1</td></tr><tr><td>≥ 20%</td><td>2</td></tr><tr><td>≥ 40%</td><td>3</td></tr></tbody></table></div>" , after_num: "2" },
            { title: "Table 66", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 66: Credits awarded in Wat 04</div><table class=\"criteria-table\"><tbody><tr><th>In-scope non-sanitary water consumption / sanitary water consumption (%)</th><th>credits available</th></tr><tr><td>5–20%</td><td>20%</td></tr><tr><td>&gt; 20–40%</td><td>40%</td></tr><tr><td>&gt; 40–60%</td><td>60%</td></tr><tr><td>&gt; 60–80%</td><td>80%</td></tr><tr><td>≥ 80%</td><td>100%</td></tr></tbody></table></div>" , after_num: "4" },
        ]
    },
    'Wat05': {
        aim: "This issue encourages and rewards estimating operational water consumption in use, the setting of a water performance target and commitment to measure operational water consumption in use.",
        criteria: [
            { points: "One credit – Predict operational water consumption", numbered: [
                { num: "1", text: "Estimate the annual operational water consumption for the building." },
            ]},
            { points: "One exemplary credit – Disclosing an in-use water performance target and commitment to measure", numbered: [
                { num: "2", text: "Achieve the credit for predicting operational water consumption." },
                { num: "3", text: "Achieve maximum available credits in Wat 02 Water monitoring." },
                { num: "4", text: "An in-use water performance target has been disclosed to stakeholders and been made publicly available prior to practical completion." },
                { num: "5", text: "The client or building occupier commits funds to pay for in-use water consumption measurement and reporting once the building is occupied. This requires a suitably qualified individual or organisation to be appointed and to measure and report on the actual in-use operational consumption." },
            ]},
        ]
    },
    'Wst01': {
        aim: "To promote resource efficiency via the effective and appropriate management of construction waste.",
        criteria: [
            { points: "One credit – Pre-demolition audit", numbered: [
                { num: "1", text: "Complete a pre-demolition audit of any existing buildings, structures or hard surfaces being considered for demolition. This must be used to determine whether refurbishment or reuse is feasible and, in the case of demolition, to maximise the recovery of material for subsequent high grade or value applications. The audit must cover the content of M1: Pre- demolition audit scope and:", subitems: [
                    { num: "1.a", text: "Be carried out at Concept Design stage by a competent person prior to strip-out or demolition works." },
                    { num: "1.b", text: "Guide the design, consider materials for reuse and set targets for waste management." },
                    { num: "1.c", text: "Engage all contractors in the process of maximising high-grade reuse and recycling opportunities." },
                ]},
                { num: "2", text: "Make reference to the audit in the resource management plan (RMP)." },
                { num: "3", text: "Compare actual waste arisings and waste management routes used with those forecast and investigate significant deviations from planned targets." },
            ]},
            { points: "Up to two credits – Construction resource efficiency", numbered: [] },
            { points: "One credit", numbered: [
                { num: "4", text: "Prepare a compliant resource management plan (see M2) covering:", subitems: [
                    { num: "4.a", text: "Non-hazardous waste materials (from on-site construction and dedicated off-site manufacture or fabrication), including demolition and excavation waste." },
                    { num: "4.b", text: "Accurate data records on waste arisings and waste management routes." },
                ]},
                { num: "5", text: "Set appropriate targets (see M3) for non-hazardous and hazardous waste produced on site in m³ of waste per 100 m² or tonnes of waste per 100 m²." },
                { num: "6", text: "Using the collated data, report the amount of waste generated per 100 m² (gross internal floor area) in m³ (where volume is actual volume of waste, not bulk volume) or tonnes from the construction process via the BREEAM Platform." },
            ]},
            { points: "One credit", numbered: [
                { num: "7", text: "Achieve criteria 1 to 6 (where applicable)." },
                { num: "8", text: "Procedures are in place for sorting, reusing and recycling construction waste into at least five defined waste groups (see Table 83 on page 311) either on site or off-site through a licensed external contractor." },
            ]},
            { points: "One credit – Diversion from landfill", numbered: [
                { num: "9", text: "A significant quantity of non-hazardous construction and demolition waste (where applicable) generated by the project has been diverted from landfill according to the figures within Table 82 below." },
                { num: "10", text: "Waste materials will be sorted into separate key waste groups (according to the waste streams generated by the scope of the works) either on site or off-site through a licensed contractor for recovery (see Table 83 on page 311 for information on waste groups)." },
            ]},
            { points: "One exemplary credit – Diversion from landfill", numbered: [
                { num: "11", text: "Achieve criteria 1 to 10 (where applicable)." },
                { num: "12", text: "The percentage of non-hazardous construction and demolition waste (if relevant) diverted from landfill meets or exceeds the exemplary level benchmark (in Table 82 above)." },
            ]},
        ],
        tables: [
            { title: "Table 82", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 82: BREEAM targets for diversion from landfill according to national construction and demolition (C&amp;D) waste recovery</div><table class=\"criteria-table\"><tbody><tr><th rowspan=\"2\">Type of waste</th><th rowspan=\"2\">National recovery rates*</th><th colspan=\"2\">BREEAM target rates for diversion from landfill</th></tr><tr><td>One credit</td><td>Exemplary level</td></tr><tr><td>Construction</td><td>&lt; 50% (by weight)*</td><td>≥ 60 %( by weight) OR ≥ 50 %( by volume)</td><td>≥ 75 %( by weight) OR ≥ 65 %( by volume)</td></tr><tr><td>Construction</td><td>≥ 50% (by weight)*</td><td>≥ 10 %improvementovernational rate( up to where 95 %oftotal waste created is diverted to landfill)</td><td>≥ 35 %improvementovernational rate( up to where 95 %oftotal waste created is diverted to landfill)</td></tr><tr><td>demolition</td><td>&lt; 60% (by weight)*</td><td>≥ 70 %( by weight) OR ≥ 60 %( by volume)</td><td>≥ 75 %( by weight) OR ≥ 65 %( by volume)</td></tr><tr><td>demolition</td><td>≥ 60% (by weight)*</td><td>≥ 10 %improvementovernational rate( up to where 95 %oftotal waste created is diverted from landfill)</td><td>≥ 95 %oftotalwastecreatedis diverted from landfill</td></tr><tr class=\"section-header\"><td colspan=\"4\">*Where the national waste recovery rate is reported for both construction and demolition waste together, the same target should be used for both types of waste. For the project to achieve the credit, both construction and demolition waste (reported separately) must meet the target.</td></tr></tbody></table></div>" , after_num: "12" },
        ]
    },
    'Wst02': {
        aim: "To recognise and encourage the use of recycled and secondary aggregates, thereby reducing the demand for virgin material and optimising material efficiency in construction.",
        criteria: [
            { points: "One credit – Recycled aggregates", numbered: [
                { num: "1", text: "At least 25% of the high grade aggregate uses (within the development) are provided by secondary or recycled aggregate. This percentage can be measured using either weight or volume." },
                { num: "2", text: "The recycled or secondary aggregates are EITHER", subitems: [
                    { num: "2.a", text: "Construction, demolition and excavation waste obtained on site or off-site OR" },
                    { num: "2.b", text: "Secondary aggregates." },
                ]},
            ]},
            { points: "One exemplary credit – Recycled aggregates", numbered: [
                { num: "3", text: "Where the total amount of recycled or secondary aggregate specified is greater than 50% (by weight or volume) of the total high grade aggregate specified for the project." },
                { num: "4", text: "The contributing recycled or secondary aggregate must not be transported more than 30 km by road transport." },
            ]},
        ]
    },
    'Wst03a': {
        aim: "To recognise and encourage the provision of dedicated storage facilities for a building\'s operational-related recyclable waste streams, so that this waste is diverted from landfill or incineration.",
        criteria: [
            { points: "One credit – Operational waste", numbered: [
                { num: "1", text: "Provide a dedicated space, identified by clear signage, for the segregation and storage of operational recyclable waste volumes generated by the assessed building or unit, its occupants and activities (see M1, M2, and M3). This space must be:", subitems: [
                    { num: "1.a", text: "Clearly labelled for long-term durability, to assist with segregation, storage and collection of the recyclable waste streams." },
                    { num: "1.b", text: "Accessible to building occupants or facilities operators for the deposit of materials and collections by waste management contractors." },
                    { num: "1.c", text: "Of a capacity appropriate to the building type, size, number of units (if relevant) and predicted volumes of waste that will arise from daily or weekly operational activities and occupancy rates." },
                ]},
                { num: "2", text: "Where the consistent generation in volume of the appropriate operational waste streams is likely to exist, e.g. large amounts of packaging or compostable waste generated by the building\'s use and operation, the following facilities are provided:", subitems: [
                    { num: "2.a", text: "Static waste compactors or balers; situated in a service area or dedicated waste management space." },
                    { num: "2.b", text: "Vessels for composting suitable organic waste resulting from the building\'s daily operation and use; OR adequate space for storing segregated food waste and compostable organic material prior to collection and delivery to an alternative composting facility." },
                    { num: "2.c", text: "Where organic waste is to be stored or composted on site, a tap is provided adjacent to or within the facility for cleaning and hygiene purposes." },
                ]},
                { num: "3", text: "Each dwelling has a provision of three internal storage containers, as follows:", subitems: [
                    { num: "3.a", text: "A minimum total capacity of 30 litres" },
                    { num: "3.b", text: "No individual container smaller than 7 litres" },
                    { num: "3.c", text: "All containers in a dedicated non-obstructive position" },
                    { num: "3.d", text: "The storage containers for recycling are provided in addition to non-recyclable waste storage." },
                ]},
                { num: "4", text: "Home composting facilities and a home composting information leaflet are provided within the kitchen area or communal space for each self-contained dwelling or bedsit." },
                { num: "5", text: "The above storage requirements (criterion 3 above) for self-contained dwellings or bedsits are met for every six bedrooms." },
                { num: "6", text: "The recyclable storage is located in a dedicated non-obstructive position in either:", subitems: [
                    { num: "6.a", text: "Communal kitchens OR" },
                    { num: "6.b", text: "Where there are no communal kitchens present, in a communal space such as communal lounges or utility areas." },
                ]},
                { num: "7", text: "Home composting facilities and a home composting information leaflet are provided within the kitchen area or communal space for each individual bedroom, bedsit, or communal kitchen." },
            ]},
        ]
    },
    'Wst03b': {
        aim: "To recognise and encourage the provision of dedicated storage facilities for operational-related household waste streams and so help to avoid waste being sent to landfill or incineration.",
        criteria: [
            { points: "One credit – Recycling", numbered: [
                { num: "1", text: "An adequate external space has been allocated to the storage of both recyclable and non-recyclable or non-compostable household waste (see M1 and M2). The space must be:", subitems: [
                    { num: "1.a", text: "At least the minimum recommended by the appropriate local authority OR" },
                    { num: "1.b", text: "Where there are no recommendations from the local authority, 100 litres of volume for a single bedroom dwelling and a further 70 litres for each additional bedroom" },
                    { num: "1.c", text: "Located on level hardstanding surface" },
                    { num: "1.d", text: "Accessible to the occupants of the house or block of flats." },
                ]},
                { num: "2", text: "Adequate internal space (including bins) has been allocated to the storage of recyclable household waste as follows:", subitems: [
                    { num: "2.a", text: "Where there is a recyclable waste collection scheme in the area that can be used by the residents EITHER of the following have been provided for the storage of recyclable household waste:", subitems: [
                        { num: "2.a.i", text: "A minimum of three individual internal bins each no smaller than 7 litres OR" },
                        { num: "2.a.ii", text: "A single bin of minimum capacity 35 litres (only allowable where the local collection collects a number of different waste groups within a single container)" },
                    ]},
                    { num: "2.b", text: "Where no recyclable waste collection scheme is in place at least five bins (each not smaller than 15 litres) have been provided for the storage of recyclable household waste" },
                    { num: "2.c", text: "The internal recycling bins should be located in a dedicated non-obstructive position. Free-standing recycling bins placed directly on the floor or in a cupboard do not comply. The bins could be in the kitchen (close to the non- recyclable waste bin) or located adjacent to the kitchen (i.e. within 10 m), e.g. in a utility room or connected garage." },
                ]},
            ]},
            { points: "One credit – Composting", numbered: [
                { num: "3", text: "Provision of adequate external facilities for the storage or composting of household compostable waste (see M3). The facilities must be:", subitems: [
                    { num: "3.a", text: "Located in a dedicated position and accessible to the dwelling occupants" },
                    { num: "3.b", text: "Accompanied by an information leaflet, delivered to each dwelling or communal kitchen. The leaflet must provide information on:", subitems: [
                        { num: "3.b.i", text: "How composting works and why it is important" },
                        { num: "3.b.ii", text: "The materials that can be composted (e.g. raw vegetable peelings and fruit, shredded paper, teabags, etc.)" },
                        { num: "3.b.iii", text: "Details of the operation and management plan for any communal composting scheme" },
                        { num: "3.b.iv", text: "Where adequate external composting facilities are provided, troubleshooting information, e.g. what to do if the compost gets too dry or too wet." },
                    ]},
                ]},
                { num: "4", text: "Adequate internal container space (large enough to hold at least a 7 litre container), for storing segregated compostable organic material (i.e. food waste), is provided in each dwelling kitchen or each communal kitchen. This can be one of the three internal storage bins mentioned in criterion 2.a on the previous page." },
                { num: "5", text: "Where adequate external facilities have not been provided with a composting container, compliance can be demonstrated where one of the following is applicable to all dwellings under assessment:", subitems: [
                    { num: "5.a", text: "An accessible local communal or community composting service, run by either a local authority or a private organisation" },
                    { num: "5.b", text: "A management plan, which is in place to ensure food or green waste is appropriately removed and delivered to an alternative composting facility" },
                    { num: "5.c", text: "A local authority or private organisation green or kitchen waste collection system." },
                ]},
                { num: "6", text: "For communal facilities at least one water outlet is provided for cleaning in and around the facility." },
            ]},
        ]
    },
    'Wst04': {
        aim: "To encourage the specification and fitting of finishes selected by the building occupant and therefore avoid unnecessary waste of materials.",
        criteria: [
            { points: "One credit – Speculative finishes", numbered: [
                { num: "1", text: "For tenanted office areas (where the future occupant is not known), prior to full fit-out works, carpets, other floor finishes and ceiling finishes have been installed in a show area only." },
                { num: "2", text: "Only install floor and ceiling finishes selected by the known occupant of a development. Alternatively, where the occupant is not known and only ceiling finishes and no carpets are installed, the building owner confirms that the first tenants will not be permitted to make substantial alterations to the ceiling finishes." },
                { num: "3", text: "For multiple dwellings (where the future occupant is not known), floor, kitchen and bathroom finishes have been installed in a show area only." },
                { num: "4", text: "For multiple dwellings, future occupants have selected (or agreed to) at least three of the specified floor, kitchen and bathroom finishes (see Definitions on the next page)." },
            ]},
        ]
    },
    'Wst05': {
        aim: "To recognise and encourage measures taken to mitigate the impact of extreme weather conditions arising from climate change over the lifespan of the building.",
        criteria: [
            { points: "One credit – Resilience of structure, fabric, building services and renewables installation", numbered: [
                { num: "1", text: "Conduct a climate change adaptation strategy appraisal using:", subitems: [
                    { num: "1.a", text: "A systematic risk assessment to identify the impact of expected extreme weather conditions arising from physical climate risks and climate change on the building and vulnerabilities over its projected life cycle. The assessment covers the installation of building services and renewable systems, as well as structural and fabric resilience aspects and includes (see M1):", subitems: [
                        { num: "1.a.i", text: "Hazard identification" },
                        { num: "1.a.ii", text: "Hazard assessment" },
                        { num: "1.a.iii", text: "Risk estimation" },
                        { num: "1.a.iv", text: "Risk evaluation" },
                        { num: "1.a.v", text: "Risk management." },
                    ]},
                ]},
                { num: "2", text: "Develop recommendations or solutions based on the climate change adaptation strategy appraisal, before or during Concept Design, that aim to mitigate the identified impact." },
                { num: "3", text: "Provide an update during Technical Design demonstrating how the recommendations or solutions proposed at Concept Design have been implemented where practical and cost effective. Omissions have been justified in writing by the assessor." },
            ]},
            { points: "One exemplary credit – Responding to climate change", numbered: [
                { num: "4", text: "Achieve criteria 1 to 3 above." },
                { num: "5", text: "Achieve the criteria or credits given in Table 84 below." },
            ]},
        ],
        tables: [
            { title: "Table 84", html: "<div class=\"breeam-table\"><div class=\"table-title\">Table 84: Criterion 5 requirements</div><table class=\"criteria-table\"><tbody><tr><th>Issue</th><th>requirements</th><th>Link to Wst 05 issue</th></tr><tr><td>Hea 05 Thermal comfort</td><td>Onecredit–Thermal modelling–Future climate</td><td>Prevent increasing risks of overheating.</td></tr><tr><td>Hea 10 Natural hazards</td><td>One credit</td><td>Reduce the risk of natural hazards which may be more severe due to climate change.</td></tr><tr><td>Ene 01 Energy and carbon performance for regulated energy uses</td><td>A minimum of six credits</td><td>Maximise energy efficiency to tackle likely energy demand and minimise resultant carbon emissions.</td></tr><tr><td>Wat 01 Water consumption</td><td>A minimum of three credits</td><td>Minimise water demand in periods of drought.</td></tr><tr><td>Mat 04 Durability and resilience</td><td>Criteria 2–4</td><td>Avoid increased risks of deterioration and higher maintenance demands.</td></tr><tr><td>Pol 03 Flood and surface water management</td><td>Flood resilience: a minimum of one credit Surface water run- off: two credits</td><td>Minimise the risks of increased flood risk and surface water run- off affecting the site or others.</td></tr></tbody></table></div>" , after_num: "5" },
        ]
    },
    'Wst06': {
        aim: "To minimize costs and use of materials due to future adaptations and to promote circular economy principles.",
        criteria: [
            { points: "One credit – Design for disassembly and adaptability – Recommendations", numbered: [
                { num: "1", text: "By the end of Concept Design, conduct a study to explore the disassembly and adaptation potential of different design scenarios (see M1)." },
                { num: "2", text: "By the end of Concept Design, develop solutions based on the study (criterion 1) that allow disassembly and adaptability (see M1)." },
            ]},
            { points: "One credit – Design for disassembly and adaptability – Implementation", numbered: [
                { num: "3", text: "Achieve criteria 1 and 2." },
                { num: "4", text: "During Technical Design, provide an update on the following (see M2):", subitems: [
                    { num: "4.a", text: "How the solutions proposed by Concept Design have been implemented where practical and cost effective. Omissions must be clearly justified." },
                    { num: "4.b", text: "Changes to the recommendations and solutions during the development of the Technical Design." },
                ]},
                { num: "5", text: "Produce a building design for disassembly and adaptability manual (see Definitions and M2) to communicate the disassembly and adaptability principles and characteristics to prospective owners or building operators." },
            ]},
        ]
    },
    'Ene09': {
        aim: "To provide a reduced energy means of drying clothes.",
        criteria: [
            { points: "One credit", numbered: [
                { num: "1", text: "For self-contained dwellings: an adequate internal or external space with posts and footings, or fixings capable of holding:\n1.a  One to two bedrooms: 4m+ of drying line\n1.b  Three or more bedrooms: 6m+ of drying line." },
                { num: "", text: "<strong>OR</strong>" },
                { num: "2", text: "Individual bedrooms: an adequate internal or external space with posts and footings, or fixings capable of holding:\n2.a  Two metres or more of drying line per bedroom for developments with up to 30 individual bedrooms; plus\n2.b  One metre of additional drying line for each bedroom over the 30 individual bedroom threshold." },
                { num: "", text: "<strong>AND</strong>" },
                { num: "3", text: "The space (internal or external) is secure." },
            ]},
        ],
    },
    'Tra02': {
        aim: "To encourage and reward projects that review the building's access to local services and where necessary enhance existing services, reducing the environmental, social and economic impacts resulting from multiple or extended building user journeys, including transport-related emissions and traffic congestion.",
        criteria: [
            { points: "One credit (except for multi-residential buildings where two credits are available)", numbered: [
                { num: "1", text: "Where a building is located within close proximity of, and accessible to, local amenities which are likely to be frequently required and used by building occupants, as outlined in Table 38." },
            ]},
        ],
    },
    'Tra03': {
        aim: "This issue is not applicable to BREEAM International Non-Domestic Refurbishment 2015.",
        criteria: [],
    },
    'Tra04': {
        aim: "To encourage change of use projects to consider the provision of car parking in order to promote the use of alternative means of transport other than the private car to and from the building, thereby helping to reduce transport-related emissions and traffic congestion associated with the building's operation.",
        criteria: [
            { points: "Up to two credits - Car parking capacity", numbered: [
                { num: "1", text: "The building's car parking capacity is compared to the maximum car parking capacity benchmarks in Table 39 and the relevant number of credits awarded.\nFor most building types, except those where stated, the benchmarks vary according to the building's public transport Accessibility Index (AI determined in accordance with BREEAM issue Tra 01 Sustainable transport solutions). Therefore, for these building types the AI must be determined prior to assessing this issue." },
            ]},
        ],
    },
    'Tra05': {
        aim: "To recognise the consideration given to accommodating a range of travel options for building users, thereby encouraging the reduction of reliance on forms of travel that have the highest environmental impact.",
        criteria: [
            { points: "One credit", numbered: [
                { num: "1", text: "A travel plan has been developed as part of the feasibility and design stages." },
                { num: "2", text: "A site-specific travel assessment or statement has been undertaken to ensure the travel plan is structured to meet the needs of the particular site and covers the following (as a minimum):\n2.a  Where relevant, existing travel patterns and opinions of existing building or site users towards cycling and walking so that constraints and opportunities can be identified\n2.b  Travel patterns and transport impact of future building users\n2.c  Current local environment for walkers and cyclists (accounting for visitors who may be accompanied by young children)\n2.d  Disabled access (accounting for varying levels of disability and visual impairment)\n2.e  Public transport links serving the site\n2.f  Current facilities for cyclists." },
                { num: "3", text: "The travel plan includes a package of measures to encourage the use of sustainable modes of transport and movement of people and goods during the building's operation and use." },
                { num: "4", text: "If the occupier is known, they must be involved in the development of the travel plan and they must confirm that the travel plan will be implemented post-refurbishment or fit-out and be supported by the building's management in operation." },
            ]},
        ],
    },
    'Mat06': {
        aim: "To recognise and encourage measures to optimise material efficiency in order to minimise the environmental impact of material use and waste without compromising on structural stability, durability or service life of the building.",
        criteria: [
            { points: "One credit", numbered: [
                { num: "1", text: "Opportunities have been identified, and appropriate measures investigated and implemented within the scope of refurbishment or fit-out works, to optimise the use of materials through building design, procurement, refurbishment, maintenance and end of life (see examples in Table 58 and Table 59)." },
                { num: "2", text: "The above is carried out by the design or construction team in consultation with the relevant parties at each of the following project work stages:\n2.a  Preparation and Brief\n2.b  Concept Design\n2.c  Developed Design\n2.d  Technical Design\n2.e  Construction." },
            ]},
        ],
    },
};

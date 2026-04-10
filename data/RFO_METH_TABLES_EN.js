const RFO_METH_TABLES_EN = {
    "Ene01": [
        {
            title: "Table 29: Assessment parts and applicable performance components and subcomponents",
            after_section: "M1",
            headers: ["Assessment part", "Applicable components", "Applicable subcomponents"],
            rows: [
                ["Part 1: Fabric and Structure", "Thermal conductance and infiltration", "Fabric (U-value)\nInfiltration rate (against heating and cooling)\nGlazing area"],
                ["Part 2: Core Services", "Heating", "% heat recovery\nEfficiency of heat generation\nHeating control factor\nEfficiency of heating distribution\nHeating pipework insulation"],
                ["", "Cooling", "Efficiency of cooling generation\nCooling control factor\nEfficiency of cooling distribution\nCooling pipework insulation"],
                ["", "Ventilation", "Fan efficiency\nDuct and air handling unit (AHU) leakage\nVentilation control factor"],
                ["", "Hot water", "Efficiency of hot water generation\nHot water control factor."],
                ["Part 3: Local Services", "Lighting", "Lighting efficiency\nLighting control factor"],
                ["", "Local heating, cooling, ventilation and hot water", "As above for core services, depending on scope of local provision for local cooling, heating, ventilation and hot water"]
            ]
        }
    ],
    "Ene05": [
        {
            "title": "TEWI Equation Terms",
            "after_section": "M1",
            "headers": ["Term", "Description"],
            "rows": [
                ["TEWI", "Total equivalent warming impact (kgCO₂e)"],
                ["GWP × L × n", "Impact of leakage losses"],
                ["GWP × m × (1 − αrec cov ery)", "Impact of recovery losses"],
                ["n × Eannual × β", "Impact of energy consumption"],
                ["GWP × mi × (1 − αi)", "Global warming potential of gas in the insulation (CO₂ related)"],
                ["GWP", "Global warming potential (CO₂ related)"],
                ["L", "Leakage (kg/yr)"],
                ["n", "System operating time (yr)"],
                ["m", "Refrigerant charge (kg)"],
                ["α", "Recovery or recycling factor between 0 and 1"],
                ["E", "Energy consumption (kWh/yr)"],
                ["β", "CO₂ emission (kg/kWh)"],
                ["mi", "Refrigerant charge in the insulation system (kg)"],
                ["αi", "Rate of gas recovered from the insulation at the end of life between 0 and 1"]
            ]
        }
    ],
    "Pol01": [
        {
            title: "Table 66: Default system operational design life values",
            after_section: "M1.1",
            headers: ["System type", "Default system operational design life values (years)"],
            rows: [
                ["Small and medium capacity chillers", "15"],
                ["Large capacity chillers", "20"],
                ["Unitary split", "15"],
                ["Variable Refrigerant Flow (VRF) system", "15"],
                ["All other systems", "10"],
                ["Notes:\nThese figures are based on those reported in LOT 6 for air-conditioning units and the British Refrigeration Association\'s (BRA) Guideline Methods of Calculating TEWI (2006).\n\nNote: The following should be considered when determining whether the system specified is defined as small or medium or large:\n\• Large capacity chiller: centrifugal compressor\n\• Medium capacity chiller: scroll or screw compressor\n\• Small capacity chiller: scroll compressor.", ""]
            ]
        },
        {
            title: "Table 67: Average annual leakage rates",
            after_section: "M1.1",
            headers: ["System type", "Annual leakage rate (% of charge per annum)"],
            rows: [
                ["Cold storage and display systems", ""],
                ["\ Integral cabinets", "3%"],
                ["\ Split or condensing units", "18%"],
                ["\ Centralised", "19%"],
                ["Air-conditioning systems", ""],
                ["\ Unitary split", "15%"],
                ["\ Small-scale chillers", "10%"],
                ["\ Medium or large chillers", "5%"],
                ["\ Heat pumps", "6%"],
                ["Notes:\nThese figures are based on those reported in LOT 6 for air-conditioning units and also Table 2 of the Market Transformation Programmes Briefing Note for Commercial Refrigeration no. 36, \'Direct Emission of Refrigerant Gases\' (version 1.2). The figures are based on the average of the leakage rates from the four separate studies reported in Table 2 (where a range is reported, the higher value was used).", ""]
            ]
        }
    ],
    "Pol02": [
        {
            title: "Table 70: Excess oxygen conversion factors",
            after_section: "M3",
            headers: ["% Excess O\₂", "Conversion (c)"],
            rows: [
                ["3%", "x 1.17"],
                ["6%", "x 1.40"],
                ["15%", "x 3.54"]
            ]
        },
        {
            title: "Table 71: Default factors - NOx Emissions from Grid Electricity",
            after_section: "M6",
            headers: ["Country list", "Default NOx Emission"],
            rows: [
                ["Austria, Belgium, Denmark, Finland, France, Iceland, Italy, Japan, Kazakhstan, Latvia, Monaco, Netherlands, Norway, Sweden", "250 mg/kWh"],
                ["Canada, Croatia, Germany, Hungary, Ireland, Liechtenstein, Lithuania, Portugal, Slovakia, Slovenia, Switzerland, USA", "650 mg/kWh"],
                ["Czech Republic, Estonia, New Zealand, Romania, Spain", "950 mg/kWh"],
                ["Australia, Belarus, Bulgaria, Greece, Poland, Russian Federation, Turkey, Ukraine", "2,500 mg/kWh"]
            ]
        }
    ,
        {
            title: "CHP Formula Terms",
            after_section: "M4",
            headers: ["Term", "Description"],
            rows: [
                ["<strong>X</strong>", "NO<sub>x</sub> emissions per unit of heat supplied (mg/kWh heat)"],
                ["<strong>A</strong>", "NO<sub>x</sub> emissions per unit of electricity generated (mg/kWh<sub>elec</sub>), i.e. the NO<sub>x</sub> emitted by the CHP system per unit of electricity generated. It is essential that this figure is obtained from the installer or supplier of the system and should be based on the system when operating at full load."],
                ["<strong>B</strong>", "NO<sub>x</sub> emissions per unit of electricity supplied from the grid (mg/kWh<sub>elec</sub>)"],
                ["<strong>C</strong>", "Heat to Electricity Ratio of the CHP scheme"],
                ["<strong>D</strong>", "Overall system efficiency (%). Enter the figure as a decimal, e.g. if the efficiency is 80%, then enter 0.8 into the calculation."]
            ]
        },
        {
            title: "Average NO\u2093 Formula Terms",
            after_section: "M5",
            headers: ["Term", "Description"],
            rows: [
                ["<strong>N\u2081</strong>", "NO<sub>x</sub> emissions rate for source 1"],
                ["<strong>N\u2082</strong>", "NO<sub>x</sub> emissions rate for source 2"],
                ["<strong>N<sub>n</sub></strong>", "NO<sub>x</sub> emissions rate for source n"],
                ["<strong>H<sub>T</sub></strong>", "Total heat output from all sources"],
                ["<strong>H\u2081</strong>", "Heat output from source 1"],
                ["<strong>H\u2082</strong>", "Heat output from source 2"],
                ["<strong>H<sub>n</sub></strong>", "Heat output from source n"]
            ]
        },
        {
            title: "Heat Pump Formula Terms",
            after_section: "M6",
            headers: ["Term", "Description"],
            rows: [
                ["<strong>M<sub>Heat</sub></strong>", "NO<sub>x</sub> emissions per unit of heat generated in mg/kWh<sub>Heat</sub>"],
                ["<strong>M<sub>Elec</sub></strong>", "NO<sub>x</sub> emissions from the respective grid electricity mg/kWh<sub>Elec</sub>"],
                ["<strong>W<sub>Elect</sub></strong>", "Total quantity of electricity consumed by heat pump kWh<sub>Elec</sub>"],
                ["<strong>W<sub>Heat</sub></strong>", "Total quantity of heat produced by heat pump kWh<sub>Heat</sub>"],
                ["<strong>EER</strong>", "Energy Efficiency Ratio (also referred to as Co-efficient of Performance)"]
            ]
        }
    ]
,
    "Wat01": [
        {
            "title": "Credit allocation by component level and greywater/rainwater system",
            "after_section": "M2",
            "headers": ["Overall Component level", "—", "Precipitation zones 1 and 2 (level 4)", "Precipitation zones 1 and 2 (level 5)", "Precipitation zone 3 (level 5)"],
            "rows": [
                ["Baseline", "0 credits", "1 credit", "2 credits", "1 credit"],
                ["Level 1", "1 credit", "2 credits", "3 credits", "2 credits"],
                ["Level 2", "2 credits", "3 credits", "4 credits", "3 credits"],
                ["Level 3 or 4", "3 credits", "4 credits", "5 credits", "4 credits"],
                ["Level 5", "4 credits", "", "5 credits", ""],
                ["Notes:\n1. An innovation credit for exemplary level performance can be awarded where the component specification achieves level 5 and > 95% of WC or urinal flushing demand is met using recycled non-potable water.\n2. Due to the use of the weightings, the overall component level achieved will not necessarily be a whole number, e.g. component level 4. Where this is the case the methodology will always round down to the nearest component level and therefore BREEAM credits level, e.g. if the component specification achieved is 3.6 credits, the actual number of credits awarded is 3 credits (the methodology will not round up to 4 credits because the performance specification for 4 credits has not been achieved).\n3. Where the assessed building development has multiple specifications for the same water-consuming component type, the number of fittings and component level achieved for each specification can be entered in the 'Other building type calculator'. Using this information, the calculator will determine the building\'s aggregated performance level for that component type.", "", "", "", ""]
            ]
        },
        {
            "title": "Table 43: Water efficient consumption levels by component type",
            "after_section": "M3",
            "headers": ["Component", "Base", "1", "2", "3", "4", "5", "Unit"],
            "rows": [
                ["WC", "6", "5", "4.5", "4", "3.75", "3", "Effective flush volume (litres)"],
                ["Wash hand basin taps", "12", "9", "7.50", "4.50", "3.75", "3", "litres/minute"],
                ["Showers", "14", "10", "8", "6", "4", "3.50", "litres/minute"],
                ["Baths", "200", "180", "160", "140", "120", "100", "litres"],
                ["Urinal (2 or more urinals)", "7.50", "6", "3", "1.50", "0.75", "0", "litres/bowl/hour"],
                ["Urinal (1 urinal only)", "10", "8", "4", "2", "1", "0", "litres/bowl/hour"],
                ["Greywater or rainwater system — Precipitation zone 1", "0", "0", "0", "25", "50", "75", "% of WC and urinal flushing demand met using recycled non-potable water"],
                ["Greywater or rainwater system — Precipitation zone 2", "0", "0", "0", "0", "25", "50", ""],
                ["Greywater or rainwater system — Precipitation zone 3", "0", "0", "0", "0", "0", "15", ""],
                ["Kitchen tap: kitchenette", "12", "10", "7.50", "5", "5", "5", "litres/minute"],
                ["Kitchen taps: restaurant (pre-rinse nozzles only)", "10.30", "9", "8.30", "7.30", "6.30", "6", "litres/minute"],
                ["Domestic sized dishwashers", "17", "13", "13", "12", "11", "10", "litres/cycle"],
                ["Domestic sized washing machines", "90", "60", "50", "40", "35", "30", "litres/use"],
                ["Waste disposal unit", "17", "17", "0", "0", "0", "0", "litres/min"],
                ["Commercial-sized dishwashers", "8", "7", "6", "5", "4", "3", "litres/rack"],
                ["Commercial or industrial sized washing machines", "14", "12", "10", "7.50", "5", "4.50", "litres/kg"]
            ]
        },
        {
            "title": "Table 44: Default performance factors for existing retained water-consuming components",
            "after_section": "M4",
            "headers": ["Terminal fitting type", "Specification", "Average usage"],
            "rows": [
                ["Showers", "Mixer - traditional mixer", "8 litres per minute"],
                ["", "Mixer - integrated power", "10 litres per minute"],
                ["", "Mixer - separate pump", "12 litres per minute"],
                ["", "Mixer - pressurised systems", "12 litres per minute"],
                ["", "Mixer - bath and shower mixers", "6 litres per minute"],
                ["", "Electric 7 - 7.9 kW", "3.5 litres per minute"],
                ["", "Electric 8 - 8.9 kW", "4 litres per minute"],
                ["", "Electric 9 - 9.9 kW", "4.6 litres per minute"],
                ["", "Electric 10 kW+", "5 litres per minute"],
                ["WCs", "Post 2001 installation", "6 litres"],
                ["", "1993 - 2001 installation", "7.5 litres"],
                ["", "Pre-1993 installation", "10 litres"],
                ["Taps", "Low pressure system (as defined in EN 200:2008)", "7.5 litres per minute per tap"],
                ["", "High pressure system (as defined in EN 200:2008)", "12 litres per minute per tap"],
                ["Baths", "Undersized bath - 1600 mm length", "165 litres - volume to overflow"],
                ["", "Corner bath", "140 litres - volume to overflow"],
                ["", "Shower bath", "250 litres - volume to overflow"],
                ["", "Standard bath", "225 litres - volume to overflow"],
                ["", "Roll top bath", "205 litres - volume to overflow"],
                ["", "Whirlpool spa baths", "225 litres - volume to overflow"]
            ]
        },
        {
            "title": "Table 45: Water-consuming components - data requirements",
            "after_section": "M5",
            "headers": ["Domestic component", "Data requirements"],
            "rows": [
                ["WCs", "Actual maximum or, where dual flush, effective flush volume in litres/use."],
                ["Urinals", "Flush volume in litres/use for single use flush urinals. For cistern fed systems, the flushing frequency/hour and cistern capacity in litres."],
                ["Taps", "Flow rate of each tap, at full flow rate in litres per minute measured at a dynamic pressure:\nFor high pressure (Type 1) taps - 3 \u00b1 0.2 bar (0.3 \u00b1 0.02 MPa) OR\nFor low pressure (Type 2) taps - 0.1 \u00b1 0.02 bar (0.01 \u00b1 0.002 MPa)\n(EN 200:2008, sanitary tapware, single taps and combination taps for supply systems of type 1 and 2. General technical specifications)\nThis includes any reductions achieved with flow restrictions."],
                ["Showers", "Flow rate of each shower at the outlet using cold water (\u2264 30\u00b0C), in litres per minute measured at a dynamic pressure:\n3 \u00b1 0.2 bar (0.3 \u00b1 0.02 MPa) for high pressure (Type 1) supply systems\nOR\n0.1 \u00b1 0.05 bar (0.01 \u00b1 0.005 MPa) for low pressure (Type 2) supply systems\n(EN 1112:2008, Sanitary tapware. Shower outlets for sanitary tapware for water supply systems type 1 and 2. General technical specifications)."],
                ["Kitchen taps", "Maximum flow rate litres/minute."],
                ["Baths", "Capacity to overflow in litres. Taps on baths should not be included in the calculation, as the water consumption from bath taps is taken account of in the use factor for baths. The calculation of water consumption for baths will assume 40% of the capacity to the overflow. This is to reflect that:\n\u2014 Users tend not to fill the bath to overflow, and\n\u2014 The displacement effect the user has on the actual volume of water required for a bath."],
                ["Dishwasher", "Litres/cycle for domestic applications or appliances or litres/rack for commercial applications or appliances."],
                ["Washing machine", "Litres/use for domestic applications (for a typical wash cycle) or appliances, or litres/kg for commercial applications or appliances, e.g. in hotels."],
                ["Waste disposal unit", "Flow rate in litres/minute."]
            ]
        }
    ]
,
    "Mat01": [
        {
            "title": "Table 49: Allocating points for elements",
            "after_section": "M2.3",
            "headers": ["Percentage of element reused in situ", "0", "≤ 25%", "≤ 50%", "≤ 75%", "> 75%", "100%"],
            "rows": [
                ["", "Unweighted Points", "", "", "", "", ""],
                ["≥ 95%", "5", "5", "5", "5", "5", "5"],
                ["≥ 75%", "4", "4.2", "4.4", "4.6", "4.8", "5"],
                ["≥ 50%", "3", "3.4", "3.8", "4.2", "4.6", "5"],
                ["≥ 25%", "2", "2.6", "3.2", "3.8", "4.4", "5"],
                ["< 25%", "1", "1.8", "2.6", "3.4", "4.2", "5"],
                ["0", "0", "1", "2", "3", "4", "5"],
                ["Note: Column headers represent the percentage of newly specified materials with robust environmental performance information.", "", "", "", "", "", ""]
            ]
        },
        {
            "title": "Table 50: Example calculation of the percentage available points achieved",
            "after_section": "M2.4",
            "headers": ["Assessment part", "Element description", "Weighting (a)", "Applicable elements (b)", "Maximum Mat 01 points available (c) = (a) x (b) x 5", "Unweighted points achieved per element using Table 49 (d)", "Weighted Points (e) = (a) x (d)"],
            "rows": [
                ["Part 1: Fabric and structure", "External walls (envelope, structure and finishes)", "1", "1", "5", "3", "3"],
                ["", "External windows and roof lights", "1", "1", "5", "3", "3"],
                ["", "Structural frame (vertical)", "1", "1", "5", "5", "5"],
                ["", "Basements or retaining walls (including excavations)", "0.5", "1", "2.5", "5", "2.5"],
                ["", "Upper floors (including horizontal structure)", "1", "1", "5", "5", "5"],
                ["", "Roof (including coverings)", "0.5", "1", "2.5", "3", "1.5"],
                ["", "Stairs", "0.5", "1", "2.5", "5", "2.5"],
                ["", "External shading devices, access structures etc.", "0.5", "1", "2.5", "1", "0.5"],
                ["", "Ground or lowest floor", "0.5", "1", "2.5", "5", "2.5"],
                ["Parts 2 and 3", "Heat source, space heating, air-conditioning and ventilation", "1", "0", "0", "0", "0"],
                ["", "Communication, security and control systems", "0.5", "0", "0", "0", "0"],
                ["", "Electrical installations", "0.5", "0", "0", "0", "0"],
                ["", "Fire and lightning protection", "0.5", "0", "0", "0", "0"],
                ["", "Lift and conveyor installations or systems", "0.5", "0", "0", "0", "0"],
                ["", "Water and waste installations", "0.5", "0", "0", "0", "0"],
                ["", "Sanitary installations", "0.25", "0", "0", "0", "0"],
                ["Part 4: Interior design", "Internal floor finishes (including access floors)", "1", "0", "0", "0", "0"],
                ["", "Internal ceiling finishes (including suspended or access ceilings)", "0.5", "0", "0", "0", "0"],
                ["", "Internal walls and partitions", "0.5", "0", "0", "0", "0"],
                ["", "Internal walls finishes", "0.5", "0", "0", "0", "0"],
                ["", "Internal windows", "0.5", "0", "0", "0", "0"],
                ["", "Internal doors", "0.25", "0", "0", "0", "0"],
                ["", "Furniture (desks, chairs, display cabinets, shelving)", "0.25", "0", "0", "0", "0"],
                ["", "Fittings (shop fittings, railings, screens, gutters, vents, air grilles)", "0.25", "0", "0", "0", "0"],
                ["Hard landscaping and boundary protection", "Hard landscaping (roads, paths and pavings)", "0.5", "0", "0", "0", "0"],
                ["", "Boundary protection (fencing, railings and walls)", "0.25", "0", "0", "0", "0"],
                ["Maximum available points (f) = Sum (c)", "", "", "", "32.5", "", ""],
                ["Total points achieved (g) = Sum (e)", "", "", "", "", "", "25.5"],
                ["Percentage of available points achieved (h) = (g)/(f) x 100", "", "", "", "", "", "78%"]
            ]
        }
    ]
,
    "Mat03": [
        {
            title: "Table 52: Location, use and material categories",
            after_section: "M2.1",
            headers: ["Location, use and material categories", "Material categories"],
            rows: [
                ["1. External wall (e.g. bricks, blocks)", "1. Timber or timber-based products (TBP)"],
                ["2. External wall finishes (plastering, cladding, render, dry lining, wall coverings etc.)", "2. Concrete or cementitious (plaster, mortar, screed etc.)"],
                ["3. Insulation", "3. Metal"],
                ["4. Roof (structure)", "4. Stone or aggregate"],
                ["5. Roof finishes (e.g. tiles, cladding systems, etc.)", "5. Clay-based (pavers, blocks, bricks)"],
                ["6. Upper floors (mezzanines)", "6. Gypsum"],
                ["7. Floor (structure)", "7. Glass"],
                ["8. Flooring finishes (including coatings)", "8. Plastic, polymer, resin, paint, chemicals and bituminous"],
                ["9. Internal partitions or walls (structure)", "9. Animal fibre or skin, cellulose fibre"],
                ["10. Internal partitions or walls (finishes, wall coverings)", "10. Other."],
                ["11. Ceiling (structure)", ""],
                ["12. Ceiling finishes (including coatings)", ""],
                ["13. External or internal doors and windows", ""],
                ["14. Staircases or ramps", ""],
                ["15. Fittings (shop fittings, railings, screens, gutters, vents, air grilles)", ""],
                ["16. Furniture (desks, chairs, display cabinets, shelving)", ""],
                ["17. Building services (equipment, distribution systems)", ""],
                ["18. Hard landscaping", ""],
                ["19. Other.", ""]
            ]
        },
        {
            title: "Table 53: Example calculation for Route 1",
            after_section: "M2.3",
            headers: ["Location/use category", "Material category", "RSCS point score", "Average point score*", "RSM point score allocation**"],
            rows: [
                ["Door/window", "Timber or TBP 1", "4", "5", "4"],
                ["", "Timber or TBP 2", "6", "", ""],
                ["Floor", "Timber or TBP 1", "3", "4", ""],
                ["", "Timber or TBP 2", "5", "", ""],
                ["External wall", "Timber or TBP 1", "6", "6.5", ""],
                ["", "Timber or TBP 2", "7", "", ""],
                ["Door/window", "Metal product 1", "5", "5", "2"],
                ["Ceiling", "Metal product 1", "3", "2.5", ""],
                ["", "Metal product 2", "2", "", ""],
                ["Structure primary and secondary", "Concrete or cementitious product 1", "3", "2", "2"],
                ["", "Concrete or cementitious product 2", "2", "", ""],
                ["", "Concrete or cementitious product 3", "1", "", ""],
                ["Internal partition", "Concrete or cementitious product 1", "4", "5.5", ""],
                ["", "Concrete or cementitious product 2", "7", "", ""],
                ["Structure primary and secondary", "Clay-based product 1", "3", "4", "4"],
                ["", "Clay-based product 2", "5", "", ""],
                ["Roof", "Clay-based product 1", "8", "8", ""]
            ]
        },
        {
            title: "Table 54: Example point allocation and award of credits",
            after_section: "M2.3",
            headers: ["Material category", "Point scores achieved", "Maximum point score", "% available points achieved", "Credits achieved"],
            rows: [
                ["Timber/timber-based product", "4", "10", "30%", "1"],
                ["Metal", "2", "10", "", ""],
                ["Concrete/cementitious", "2", "10", "", ""],
                ["Clay-based", "4", "10", "", ""],
                ["<strong>Total score</strong>", "<strong>12</strong>", "<strong>40</strong>", "", ""]
            ]
        },
        {
            title: "Table 55: Example calculation for single material category (Route 2)",
            after_section: "M3",
            headers: ["Material category", "RSCS point score (A)", "Quantity m\u00b3, L, Kg (B)", "Point score weighted (C)", "Max. point score (D)", "% total score (G)"],
            rows: [
                ["<strong>Door/window</strong>", "", "", "", "", ""],
                ["Timber/TBP 1", "4", "100", "400", "1000", ""],
                ["Timber/TBP 2", "6", "50", "300", "500", ""],
                ["Total Scores", "", "", "<strong>(E) 700</strong>", "<strong>(F) 1500</strong>", "46.7%"],
                ["<strong>Floor</strong>", "", "", "", "", ""],
                ["Timber/TBP 1", "3", "100", "300", "1000", ""],
                ["Timber/TBP 2", "5", "200", "1000", "2000", ""],
                ["Total Scores", "", "", "<strong>(E) 1300</strong>", "<strong>(F) 3000</strong>", "43.3%"],
                ["<strong>External wall</strong>", "", "", "", "", ""],
                ["Timber/TBP 1", "6", "300", "1800", "3000", ""],
                ["Timber/TBP 2", "7", "200", "1400", "2000", ""],
                ["Total Scores", "", "", "<strong>(E) 3200</strong>", "<strong>(F) 5000</strong>", "64%"],
                ["<strong>Average % total score (H)</strong>", "", "", "", "", "<strong>51.3%</strong>"],
                ["<strong>RSM score (I)</strong>", "", "", "", "", "<strong>5.13</strong>"]
            ]
        },
        {
            title: "Table 56: Example credit calculation for combination of routes",
            after_section: "M4",
            headers: ["Material category", "RSCS point score", "Maximum point score", "% available points", "Credits achieved"],
            rows: [
                ["Timber/timber-based product (route 2)", "5.13", "10", "32.83%", "1"],
                ["Metal (route 1)", "2", "10", "", ""],
                ["Concrete/cementitious (route 1)", "2", "10", "", ""],
                ["Clay-based (route 1)", "4", "10", "", ""],
                ["<strong>Total score</strong>", "<strong>13.13</strong>", "<strong>40</strong>", "", ""]
            ]
        }
    ],
    "Wst01": [
        {
            title: "Table 62: Calculating the percentage of available points achieved",
            after_section: "M1",
            headers: ["Options for reuse or direct recycling", "(a) Points awarded", "(b) Max pts/material", "(c) Present? 1=Yes 0=No", "(d) Available pts", "(e) Points achieved"],
            rows: [
                ["<strong>Inert materials (excl. soil)</strong>", "", "", "", "", ""],
                ["On-site reuse in original form (bricks, roof tiles, paving slabs, kerbs, cills)", "3", "3", "", "", ""],
                ["Off-site reuse in original form", "2", "\u2013", "", "", ""],
                ["<strong>New and used metal materials</strong>", "", "", "", "", ""],
                ["On-site reuse of metal material in original form", "3", "3", "", "", ""],
                ["Off-site reuse of metal material in original form", "2", "\u2013", "", "", ""],
                ["<strong>Composite materials</strong>", "", "", "", "", ""],
                ["On-site reuse in original form", "3", "3", "", "", ""],
                ["Off-site reuse in original form", "2", "\u2013", "", "", ""],
                ["<strong>Plasterboard (offcuts, unused or undamaged)</strong>", "", "", "", "", ""],
                ["On-site reuse in original form", "3", "3", "", "", ""],
                ["Off-site reuse on other construction/refurbishment projects", "2", "\u2013", "", "", ""],
                ["Off-site reuse (community scheme, surplus trading, charities)", "2", "\u2013", "", "", ""],
                ["Manufacturer take-back schemes", "2", "\u2013", "", "", ""],
                ["<strong>Furniture</strong>", "", "", "", "", ""],
                ["On-site reuse in original form", "3", "3", "", "", ""],
                ["Off-site reuse (community schemes, charities, schools)", "2", "\u2013", "", "", ""],
                ["<strong>Timber products (sawn soft/hard wood only)</strong>", "", "", "", "", ""],
                ["On-site reuse of timber on the project", "3", "3", "", "", ""],
                ["Off-site reuse via another project or community reuse scheme", "2", "\u2013", "", "", ""],
                ["<strong>Mineral fibre ceiling panels and tiles</strong>", "", "", "", "", ""],
                ["Off-site reuse in other projects, community schemes, charities", "2", "2", "", "", ""],
                ["Off-site recycling via manufacturer for closed loop recycling", "1", "\u2013", "", "", ""],
                ["<strong>Vinyl floor coverings</strong>", "", "", "", "", ""],
                ["Off-site direct recycling via manufacturer for closed loop recycling", "1", "1", "", "", ""],
                ["<strong>Used carpet tiles (good reusable condition)</strong>", "", "", "", "", ""],
                ["On-site reuse in original form", "3", "3", "", "", ""],
                ["Off-site direct reuse on other projects, community schemes, charities", "2", "\u2013", "", "", ""],
                ["Direct recycling via manufacturer for closed loop recycling", "1", "\u2013", "", "", ""],
                ["<strong>Packaging materials (timber, cardboard & plastic)</strong>", "", "", "", "", ""],
                ["Repatriation of wooden pallets from product suppliers for direct reuse", "2", "2", "", "", ""],
                ["<strong>Insulation board (foam board: EPS, XPS, ISO, COMP.)</strong>", "", "", "", "", ""],
                ["Off-site reuse on other projects, community schemes, charities", "2", "2", "", "", ""],
                ["Resale via surplus construction material trading companies", "2", "\u2013", "", "", ""],
                ["Collection by manufacturer for closed loop recycling", "1", "\u2013", "", "", ""],
                ["<strong>Fixtures and fittings</strong>", "", "", "", "", ""],
                ["On-site reuse in original form (sinks, doors, gates)", "3", "3", "", "", ""],
                ["Off-site reuse in original form (sinks, doors, gates)", "2", "\u2013", "", "", ""],
                ["<strong>Maximum available points (f) = Sum of (d)</strong>", "", "", "", "", ""],
                ["<strong>Total points achieved (g) = Sum of (e)</strong>", "", "", "", "", ""],
                ["<strong>% available points achieved (h) = ((g)/(f)) \u00d7 100</strong>", "", "", "", "", ""]
            ]
        }
    ]
};

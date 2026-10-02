// LandslideShield NER — Realistic Operational Mock Data Service
// Formatted for seamless future replacement with FastAPI & MongoDB backends

export const NER_STATES = [
  'All States',
  'Sikkim',
  'Assam',
  'Meghalaya',
  'Mizoram',
  'Arunachal Pradesh',
  'Nagaland',
  'Manipur',
  'Tripura'
];

export const INITIAL_RISK_ZONES = [
  {
    id: 'ES-042',
    name: 'East Sikkim — Zone ES-042',
    shortName: 'East Sikkim Corridor',
    state: 'Sikkim',
    lat: 27.3389,
    lng: 88.6065,
    riskScore: 87,
    riskLevel: 'CRITICAL',
    confidence: 86,
    riskTrend: 'Increasing',
    previousScore: 69,
    changePercent: '+14%',
    telemetry: {
      rainfall24h: 82, // mm
      soilMoisture: 78, // %
      slopeAngle: 34, // degrees
      temperature: 22, // °C
      windSpeed: 18, // km/h
      rainfall3Day: 176, // mm
      historicalEvents: 14,
      geology: 'Precambrian Gneiss & Mica Schist',
      drainageCondition: 'Obstructed roadside chutes'
    },
    drivers: [
      { name: 'Rainfall (24h Accumulation)', current: '82 mm', normal: '15–25 mm', weight: 92, contribution: '32%' },
      { name: 'Soil Moisture Saturation', current: '78%', normal: '35–45%', weight: 85, contribution: '26%' },
      { name: 'Terrain & Slope Angle', current: '34°', normal: '< 20°', weight: 75, contribution: '18%' },
      { name: 'Historical Landslide Activity', current: '14 Recorded Events', normal: '< 3 Events', weight: 65, contribution: '13%' },
      { name: 'Field Evidence (Surface Cracks)', current: 'Verified FR-2041', normal: 'No fissures', weight: 80, contribution: '11%' }
    ],
    aiExplanation:
      'Current conditions indicate elevated landslide risk. Recent rainfall has increased soil saturation while the selected zone contains steep terrain and historical landslide activity. A field report submitted 34 minutes ago provides additional evidence of slope instability.',
    impact: {
      roadsCount: 2,
      roadNames: ['NH-10 (Sevoke–Gangtok)', 'Singtam–Dikchu Link Road'],
      villagesCount: 3,
      villageNames: ['Martam Village', 'Singtam North Hamlet', 'Rangpo Outpost'],
      bridgesCount: 1,
      bridgeNames: ['Teesta Valley Span #4'],
      hospitalsCount: 1,
      schoolsCount: 4,
      populationExposed: 2450,
      priorityAssessment: 'High operational priority due to potential connectivity disruption along the primary lifeline corridor.'
    },
    riskTrend24h: [42, 48, 55, 61, 69, 78, 87],
    forecast12h: [87, 89, 88, 84]
  },
  {
    id: 'MZ-014',
    name: 'Mizoram Central — Zone MZ-014',
    shortName: 'Aizawl–Lunglei Ridge',
    state: 'Mizoram',
    lat: 23.7271,
    lng: 92.7176,
    riskScore: 81,
    riskLevel: 'HIGH',
    confidence: 83,
    riskTrend: 'Increasing',
    previousScore: 74,
    changePercent: '+7%',
    telemetry: {
      rainfall24h: 74,
      soilMoisture: 72,
      slopeAngle: 31,
      temperature: 24,
      windSpeed: 14,
      rainfall3Day: 152,
      historicalEvents: 9,
      geology: 'Surma Group Sandstone / Shale',
      drainageCondition: 'Partial siltation'
    },
    drivers: [
      { name: 'Rainfall (24h Accumulation)', current: '74 mm', normal: '15–25 mm', weight: 82, contribution: '29%' },
      { name: 'Soil Moisture Saturation', current: '72%', normal: '35–45%', weight: 78, contribution: '25%' },
      { name: 'Terrain & Slope Angle', current: '31°', normal: '< 20°', weight: 70, contribution: '20%' },
      { name: 'Historical Landslide Activity', current: '9 Events', normal: '< 3 Events', weight: 60, contribution: '14%' },
      { name: 'Field Evidence', current: 'Citizen Report FR-2038', normal: 'Stable', weight: 65, contribution: '12%' }
    ],
    aiExplanation:
      'Steep slope profile coupled with sustained multi-day precipitation has reduced shear strength across the Aizawl western slope. Roadway subsidence noted along NH-54 bypass.',
    impact: {
      roadsCount: 1,
      roadNames: ['NH-54 (Aizawl–Thenzawl Corridor)'],
      villagesCount: 2,
      villageNames: ['Durtlang Suburb', 'Sihphir Settlement'],
      bridgesCount: 0,
      bridgeNames: [],
      hospitalsCount: 1,
      schoolsCount: 2,
      populationExposed: 1820,
      priorityAssessment: 'Priority 2: Potential isolation of inter-district transport.'
    },
    riskTrend24h: [38, 44, 52, 60, 68, 74, 81],
    forecast12h: [81, 83, 80, 75]
  },
  {
    id: 'MG-008',
    name: 'Meghalaya Plateau — Zone MG-008',
    shortName: 'Cherrapunji–Mawkdok Scarp',
    state: 'Meghalaya',
    lat: 25.2986,
    lng: 91.7167,
    riskScore: 76,
    riskLevel: 'HIGH',
    confidence: 85,
    riskTrend: 'Stable',
    previousScore: 75,
    changePercent: '+1%',
    telemetry: {
      rainfall24h: 110,
      soilMoisture: 84,
      slopeAngle: 28,
      temperature: 19,
      windSpeed: 24,
      rainfall3Day: 240,
      historicalEvents: 18,
      geology: 'Limestone & Sandstone Karst Escarpment',
      drainageCondition: 'High volume surface runoff'
    },
    drivers: [
      { name: 'Rainfall (24h Accumulation)', current: '110 mm', normal: '40–60 mm', weight: 90, contribution: '38%' },
      { name: 'Soil Moisture Saturation', current: '84%', normal: '40–50%', weight: 88, contribution: '27%' },
      { name: 'Terrain & Slope Angle', current: '28°', normal: '< 20°', weight: 62, contribution: '16%' },
      { name: 'Historical Landslide Activity', current: '18 Events', normal: '< 5 Events', weight: 70, contribution: '12%' },
      { name: 'Field Evidence', current: 'Minor rock debris on verge', normal: 'Clear', weight: 45, contribution: '7%' }
    ],
    aiExplanation:
      'Extreme rainfall intensity characteristic of the southern Meghalaya scarp. Rapid runoff observed with risk of boulder rolls and shallow debris slides at cliff cuttings.',
    impact: {
      roadsCount: 1,
      roadNames: ['SH-5 (Shillong–Sohra Highway)'],
      villagesCount: 2,
      villageNames: ['Laitryngew Village', 'Mawkdok Crossing'],
      bridgesCount: 1,
      bridgeNames: ['Duwan Sing Gorge Bridge'],
      hospitalsCount: 0,
      schoolsCount: 1,
      populationExposed: 940,
      priorityAssessment: 'Priority 3: Heavy tourist and supply traffic vulnerability.'
    },
    riskTrend24h: [50, 58, 64, 70, 72, 75, 76],
    forecast12h: [76, 75, 71, 67]
  },
  {
    id: 'AS-021',
    name: 'Assam Hills — Zone AS-021',
    shortName: 'Dima Hasao Haflong Incline',
    state: 'Assam',
    lat: 25.1764,
    lng: 93.0232,
    riskScore: 68,
    riskLevel: 'WATCH',
    confidence: 81,
    riskTrend: 'Increasing',
    previousScore: 54,
    changePercent: '+14%',
    telemetry: {
      rainfall24h: 58,
      soilMoisture: 65,
      slopeAngle: 25,
      temperature: 26,
      windSpeed: 12,
      rainfall3Day: 110,
      historicalEvents: 11,
      geology: 'Barail Formation Shales',
      drainageCondition: 'Culvert blockages detected'
    },
    drivers: [
      { name: 'Rainfall (24h Accumulation)', current: '58 mm', normal: '20 mm', weight: 70, contribution: '30%' },
      { name: 'Soil Moisture Saturation', current: '65%', normal: '40%', weight: 65, contribution: '24%' },
      { name: 'Terrain & Slope Angle', current: '25°', normal: '< 15°', weight: 58, contribution: '20%' },
      { name: 'Historical Landslide Activity', current: '11 Events', normal: '< 4 Events', weight: 64, contribution: '16%' },
      { name: 'Field Evidence', current: 'Water ponding near track', normal: 'Dry', weight: 50, contribution: '10%' }
    ],
    aiExplanation:
      'Soil saturation is approaching critical threshold for soft shale cuttings along the hill railway and highway alignment. Precautionary monitoring in effect.',
    impact: {
      roadsCount: 1,
      roadNames: ['NH-27 (Lumding–Haflong Expressway)'],
      villagesCount: 2,
      villageNames: ['Jatinga Settlement', 'Lower Haflong Basti'],
      bridgesCount: 1,
      bridgeNames: ['Diyung River Viaduct'],
      hospitalsCount: 1,
      schoolsCount: 2,
      populationExposed: 1400,
      priorityAssessment: 'Critical railway and arterial route connecting Barak Valley.'
    },
    riskTrend24h: [32, 38, 42, 48, 54, 61, 68],
    forecast12h: [68, 71, 70, 65]
  },
  {
    id: 'AR-011',
    name: 'Arunachal West — Zone AR-011',
    shortName: 'Tawang–Sela Pass Slopes',
    state: 'Arunachal Pradesh',
    lat: 27.5861,
    lng: 91.8656,
    riskScore: 72,
    riskLevel: 'HIGH',
    confidence: 84,
    riskTrend: 'Increasing',
    previousScore: 63,
    changePercent: '+9%',
    telemetry: {
      rainfall24h: 46,
      soilMoisture: 68,
      slopeAngle: 38,
      temperature: 12,
      windSpeed: 28,
      rainfall3Day: 98,
      historicalEvents: 8,
      geology: 'High-grade Gneiss with glacial moraine',
      drainageCondition: 'Meltwater seepage'
    },
    drivers: [
      { name: 'Terrain & Slope Angle', current: '38°', normal: '< 20°', weight: 88, contribution: '32%' },
      { name: 'Soil Moisture Saturation', current: '68%', normal: '35%', weight: 72, contribution: '24%' },
      { name: 'Rainfall & Meltwater', current: '46 mm', normal: '15 mm', weight: 68, contribution: '22%' },
      { name: 'Historical Landslide Activity', current: '8 Events', normal: '< 2 Events', weight: 55, contribution: '12%' },
      { name: 'Field Evidence', current: 'Minor scree slide at Km 48', normal: 'Stable', weight: 60, contribution: '10%' }
    ],
    aiExplanation:
      'Very steep terrain with loose glacial scree. Seepage from recent rain and snowmelt is lubricating the bedding planes above border defense route.',
    impact: {
      roadsCount: 1,
      roadNames: ['NH-13 (Balipara–Charduar–Tawang)'],
      villagesCount: 1,
      villageNames: ['Jaswantgarh Outpost'],
      bridgesCount: 1,
      bridgeNames: ['Nuranang Stream Culvert'],
      hospitalsCount: 0,
      schoolsCount: 0,
      populationExposed: 620,
      priorityAssessment: 'Strategic high-altitude corridor with limited detour options.'
    },
    riskTrend24h: [40, 45, 52, 58, 63, 67, 72],
    forecast12h: [72, 74, 73, 69]
  },
  {
    id: 'NL-009',
    name: 'Nagaland Central — Zone NL-009',
    shortName: 'Kohima–Zubza Crest',
    state: 'Nagaland',
    lat: 25.6747,
    lng: 94.1106,
    riskScore: 59,
    riskLevel: 'WATCH',
    confidence: 80,
    riskTrend: 'Stable',
    previousScore: 58,
    changePercent: '+1%',
    telemetry: {
      rainfall24h: 38,
      soilMoisture: 58,
      slopeAngle: 27,
      temperature: 21,
      windSpeed: 10,
      rainfall3Day: 84,
      historicalEvents: 7,
      geology: 'Disang Group Mudstone',
      drainageCondition: 'Eroded natural channels'
    },
    drivers: [
      { name: 'Soil Moisture Saturation', current: '58%', normal: '35%', weight: 62, contribution: '28%' },
      { name: 'Rainfall (24h Accumulation)', current: '38 mm', normal: '20 mm', weight: 58, contribution: '26%' },
      { name: 'Terrain & Slope Angle', current: '27°', normal: '< 18°', weight: 60, contribution: '22%' },
      { name: 'Historical Landslide Activity', current: '7 Events', normal: '< 3 Events', weight: 52, contribution: '14%' },
      { name: 'Field Evidence', current: 'No major movement reported', normal: 'Stable', weight: 30, contribution: '10%' }
    ],
    aiExplanation:
      'Disang shales are prone to swelling and subsidence. Moderate risk of creeping slope failures along terrace farming edges and roadside retaining walls.',
    impact: {
      roadsCount: 1,
      roadNames: ['NH-29 (Dimapur–Kohima Lifeline)'],
      villagesCount: 2,
      villageNames: ['Zubza Town', 'Peducha Sector'],
      bridgesCount: 0,
      bridgeNames: [],
      hospitalsCount: 1,
      schoolsCount: 1,
      populationExposed: 1100,
      priorityAssessment: 'Main supply lifeline into Nagaland and Manipur.'
    },
    riskTrend24h: [45, 48, 52, 55, 58, 59, 59],
    forecast12h: [59, 61, 58, 55]
  },
  {
    id: 'MN-015',
    name: 'Manipur North — Zone MN-015',
    shortName: 'Senapati Hill Highway',
    state: 'Manipur',
    lat: 25.2677,
    lng: 94.0205,
    riskScore: 54,
    riskLevel: 'WATCH',
    confidence: 79,
    riskTrend: 'Stable',
    previousScore: 52,
    changePercent: '+2%',
    telemetry: {
      rainfall24h: 32,
      soilMoisture: 52,
      slopeAngle: 24,
      temperature: 23,
      windSpeed: 11,
      rainfall3Day: 70,
      historicalEvents: 6,
      geology: 'Tertiary Sandstone / Siltstone',
      drainageCondition: 'Moderate capacity'
    },
    drivers: [
      { name: 'Soil Moisture Saturation', current: '52%', normal: '35%', weight: 56, contribution: '29%' },
      { name: 'Terrain & Slope Angle', current: '24°', normal: '< 18°', weight: 54, contribution: '25%' },
      { name: 'Rainfall (24h Accumulation)', current: '32 mm', normal: '20 mm', weight: 50, contribution: '23%' },
      { name: 'Historical Landslide Activity', current: '6 Events', normal: '< 3 Events', weight: 48, contribution: '13%' },
      { name: 'Field Evidence', current: 'Stable', normal: 'Stable', weight: 25, contribution: '10%' }
    ],
    aiExplanation:
      'Minor slope creeping observed along cut slopes. Heavy vehicles advised to proceed with caution near Maram bend.',
    impact: {
      roadsCount: 1,
      roadNames: ['NH-102 / NH-2 (Imphal–Kohima Route)'],
      villagesCount: 1,
      villageNames: ['Maram Bazaar'],
      bridgesCount: 1,
      bridgeNames: ['Iril Tributary Crossing'],
      hospitalsCount: 0,
      schoolsCount: 1,
      populationExposed: 780,
      priorityAssessment: 'Essential interstate freight corridor.'
    },
    riskTrend24h: [42, 44, 46, 49, 52, 53, 54],
    forecast12h: [54, 55, 52, 49]
  },
  {
    id: 'TR-004',
    name: 'Tripura North — Zone TR-004',
    shortName: 'Jampui Hills Range',
    state: 'Tripura',
    lat: 23.9512,
    lng: 92.2741,
    riskScore: 38,
    riskLevel: 'LOW',
    confidence: 88,
    riskTrend: 'Decreasing',
    previousScore: 44,
    changePercent: '-6%',
    telemetry: {
      rainfall24h: 12,
      soilMoisture: 38,
      slopeAngle: 18,
      temperature: 28,
      windSpeed: 9,
      rainfall3Day: 35,
      historicalEvents: 3,
      geology: 'Tipam Sandstone Formation',
      drainageCondition: 'Unobstructed natural runoff'
    },
    drivers: [
      { name: 'Terrain & Slope Angle', current: '18°', normal: '< 20°', weight: 40, contribution: '30%' },
      { name: 'Soil Moisture Saturation', current: '38%', normal: '35%', weight: 38, contribution: '28%' },
      { name: 'Rainfall (24h Accumulation)', current: '12 mm', normal: '15 mm', weight: 30, contribution: '20%' },
      { name: 'Historical Landslide Activity', current: '3 Events', normal: '< 2 Events', weight: 25, contribution: '12%' },
      { name: 'Field Evidence', current: 'All slopes stable', normal: 'Stable', weight: 15, contribution: '10%' }
    ],
    aiExplanation:
      'Environmental telemetry indicates low risk state. Dense canopy cover and moderate slope angles provide high natural stability under current meteorological conditions.',
    impact: {
      roadsCount: 1,
      roadNames: ['SH-8 (Kanchanpur–Vanghmun)'],
      villagesCount: 1,
      villageNames: ['Vanghmun Village'],
      bridgesCount: 0,
      bridgeNames: [],
      hospitalsCount: 0,
      schoolsCount: 1,
      populationExposed: 450,
      priorityAssessment: 'Low operational concern. Routine periodic sweep.'
    },
    riskTrend24h: [45, 44, 42, 40, 39, 38, 38],
    forecast12h: [38, 37, 35, 34]
  }
];

export const INITIAL_ROADS = [
  {
    id: 'RD-01',
    name: 'NH-10 (Sevoke–Gangtok Highway)',
    state: 'Sikkim / West Bengal',
    sector: 'Rangpo–Singtam Sector (Km 38–46)',
    lengthKm: 52,
    status: 'BLOCKED',
    vulnerabilityScore: 94,
    affectedZoneId: 'ES-042',
    detourRoute: 'Via Lava–Algarah–Rongli Pass (Add +4.5 hours)',
    description: 'Active slope subsidence and continuous debris roll near 29th Mile. Road cleared for heavy machinery only.',
    clearanceEta: '4 to 6 Hours (Weather Permitting)'
  },
  {
    id: 'RD-02',
    name: 'NH-54 (Aizawl–Thenzawl Corridor)',
    state: 'Mizoram',
    sector: 'Durtlang Ridge Pass (Km 14–22)',
    lengthKm: 88,
    status: 'BLOCKED',
    vulnerabilityScore: 88,
    affectedZoneId: 'MZ-014',
    detourRoute: 'Bypass via Sairang Road (Restricted to light vehicles)',
    description: 'Roadbed cracked across 60-meter stretch with active mudflow covering both lanes.',
    clearanceEta: '8 Hours'
  },
  {
    id: 'RD-03',
    name: 'NH-29 (Dimapur–Kohima Highway)',
    state: 'Nagaland',
    sector: 'Pakala Pahar / Zubza Cutting',
    lengthKm: 74,
    status: 'RESTRICTED',
    vulnerabilityScore: 78,
    affectedZoneId: 'NL-009',
    detourRoute: 'Peducha to 7th Mile Bypass',
    description: 'One-way controlled convoy movement due to rockfall mitigation netting repair.',
    clearanceEta: 'Ongoing Monitoring'
  },
  {
    id: 'RD-04',
    name: 'SH-5 (Shillong–Cherrapunji Highway)',
    state: 'Meghalaya',
    sector: 'Mawkdok Dympep Valley Scarp',
    lengthKm: 54,
    status: 'RESTRICTED',
    vulnerabilityScore: 75,
    affectedZoneId: 'MG-008',
    detourRoute: 'No viable heavy vehicle detour',
    description: 'Dense fog and partial boulder obstruction on downhill carriageway. Heavy commercial transit prohibited.',
    clearanceEta: '2 Hours'
  },
  {
    id: 'RD-05',
    name: 'NH-13 (Trans-Arunachal Highway)',
    state: 'Arunachal Pradesh',
    sector: 'Bhalukpong–Tenga Valley (Km 62)',
    lengthKm: 140,
    status: 'RESTRICTED',
    vulnerabilityScore: 72,
    affectedZoneId: 'AR-011',
    detourRoute: 'Orang–Kalaktang road (Single lane)',
    description: 'Scree avalanche cleared to single lane. BRO heavy dozers stationed on standby.',
    clearanceEta: 'Single Lane Active'
  },
  {
    id: 'RD-06',
    name: 'NH-102 (Imphal–Moreh Border Highway)',
    state: 'Manipur',
    sector: 'Lokchao Bridge Approach',
    lengthKm: 110,
    status: 'RESTRICTED',
    vulnerabilityScore: 68,
    affectedZoneId: 'MN-015',
    detourRoute: 'None (Border Lifeline)',
    description: 'Slumping of embankment on river side. Speed capped at 20 km/h with weight restriction 16T.',
    clearanceEta: 'Structural Review Underway'
  },
  {
    id: 'RD-07',
    name: 'NH-27 (Lumding–Haflong Hill Section)',
    state: 'Assam',
    sector: 'Jatinga Lampu Cutting',
    lengthKm: 95,
    status: 'CAUTION',
    vulnerabilityScore: 64,
    affectedZoneId: 'AS-021',
    detourRoute: 'Old Haflong Road',
    description: 'Water seepage accumulating on shoulder drains. PWD patrol deployed.',
    clearanceEta: 'Open with Caution'
  },
  {
    id: 'RD-08',
    name: 'SH-8 (Jampui Ridge Highway)',
    state: 'Tripura',
    sector: 'Vanghmun Hill Track',
    lengthKm: 42,
    status: 'OPEN',
    vulnerabilityScore: 28,
    affectedZoneId: 'TR-004',
    detourRoute: 'Standard alignment',
    description: 'Clear road surface. Routine sensors recording nominal stability.',
    clearanceEta: 'Normal Operations'
  }
];

export const INITIAL_FIELD_REPORTS = [
  {
    id: 'FR-2041',
    location: 'East Sikkim (Zone ES-042)',
    sector: 'Singtam–Dikchu Link Km 4.2',
    reportedBy: 'Field Officer T. Dorjee',
    role: 'State Disaster Management Authority (SDMA)',
    contact: '+91 94340-XXXXX',
    type: 'Slope Crack',
    timestamp: '12 min ago',
    risk: 'Critical',
    status: 'Verified',
    gps: '27.3389° N, 88.6065° E',
    description: 'Noticed continuous longitudinal fissure extending approximately 45 meters along the upper roadside embankment. Soil saturation is visible with brown runoff seeping through lower toe wall.',
    aiImageAssessment: 'Visible surface cracks and shear displacement detected along the roadside slope profile.',
    aiConfidence: 82,
    riskBefore: 69,
    riskAfter: 87,
    imagePlaceholder: 'slope-fissure-45m'
  },
  {
    id: 'FR-2038',
    location: 'Mizoram Central (Zone MZ-014)',
    sector: 'Aizawl North Bypass Km 9',
    reportedBy: 'Citizen R. Lalthanzuala',
    role: 'Verified Community Warden',
    contact: '+91 98623-XXXXX',
    type: 'Road Blockage',
    timestamp: '31 min ago',
    risk: 'High',
    status: 'Pending',
    gps: '23.7271° N, 92.7176° E',
    description: 'Mud and loose boulders descended from retaining wall cut. Two commercial trucks stranded. No casualties reported.',
    aiImageAssessment: 'Debris blockage covering 100% of eastbound lane. Soil slurry depth estimated 0.6m.',
    aiConfidence: 79,
    riskBefore: 74,
    riskAfter: 81,
    imagePlaceholder: 'debris-block-lane'
  },
  {
    id: 'FR-2035',
    location: 'Meghalaya (Zone MG-008)',
    sector: 'Mawkdok Scarp Mile 18',
    reportedBy: 'PWD Patrol Officer H. Lyngdoh',
    role: 'Meghalaya PWD Roads',
    contact: '+91 94361-XXXXX',
    type: 'Rockfall Debris',
    timestamp: '1 hr ago',
    risk: 'Watch',
    status: 'Action Assigned',
    gps: '25.2986° N, 91.7167° E',
    description: 'Shallow sandstone fragments dislodged during heavy cloudburst. Safety catch-fence held 80% of volume.',
    aiImageAssessment: 'Rockfall containment intact. Minor spillover on emergency shoulder.',
    aiConfidence: 88,
    riskBefore: 75,
    riskAfter: 76,
    imagePlaceholder: 'catch-fence-rock'
  },
  {
    id: 'FR-2031',
    location: 'Assam Hills (Zone AS-021)',
    sector: 'Jatinga Rail-Road Crossing',
    reportedBy: 'Local Volunteer S. Kemprai',
    role: 'Aapda Mitra Volunteer',
    contact: '+91 97060-XXXXX',
    type: 'Debris & Drainage Overflow',
    timestamp: '2 hrs ago',
    risk: 'Watch',
    status: 'Verified',
    gps: '25.1764° N, 93.0232° E',
    description: 'Choked concrete culvert causing water to spill over road formation. Softening embankment footing.',
    aiImageAssessment: 'Hydraulic overflow detected on roadway sub-base.',
    aiConfidence: 76,
    riskBefore: 54,
    riskAfter: 68,
    imagePlaceholder: 'culvert-choke'
  },
  {
    id: 'FR-2028',
    location: 'Arunachal Pradesh (Zone AR-011)',
    sector: 'Sela Pass Approach Km 72',
    reportedBy: 'BRO Junior Engineer V. Sharma',
    role: 'Border Roads Organisation',
    contact: '+91 94191-XXXXX',
    type: 'Slope Crack',
    timestamp: '3 hrs ago',
    risk: 'High',
    status: 'Verified',
    gps: '27.5861° N, 91.8656° E',
    description: 'Hairline tension cracks emerging 15m uphill from culvert headwall following freeze-thaw and precipitation.',
    aiImageAssessment: 'Tension crack signature along crest line.',
    aiConfidence: 84,
    riskBefore: 63,
    riskAfter: 72,
    imagePlaceholder: 'tension-crest'
  }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-1092',
    zoneId: 'ES-042',
    location: 'East Sikkim (Zone ES-042)',
    level: 'CRITICAL',
    title: 'CRITICAL LANDSLIDE WARNING: ES-042 Corridor',
    summary: 'Risk score elevated from 69 → 87 (+14%). Heavy precipitation & active 45m slope crack verified.',
    impact: '2 roads (NH-10), 3 villages (Martam, Singtam North), 1 bridge. ~2,450 people exposed.',
    channels: ['SMS Broadcast (2,450 sent)', 'Disaster App Push', 'CAP Siren Gateway', 'District Collectorate Alert'],
    timestamp: '12 minutes ago',
    active: true
  },
  {
    id: 'ALT-1090',
    zoneId: 'MZ-014',
    location: 'Mizoram Central (Zone MZ-014)',
    level: 'HIGH',
    title: 'HIGH RISK ADVISORY: Aizawl–Thenzawl Corridor',
    summary: 'Risk score increased to 81. Continuous saturation with road blockage at Km 9.',
    impact: 'NH-54 blocked, 2 settlements at risk. Traffic diversion via Sairang.',
    channels: ['SMS (1,820 sent)', 'Police Dispatch', 'State Transport Dept'],
    timestamp: '34 minutes ago',
    active: true
  },
  {
    id: 'ALT-1087',
    zoneId: 'MG-008',
    location: 'Meghalaya Plateau (Zone MG-008)',
    level: 'HIGH',
    title: 'PRECIPITATION SURGE ADVISORY: Sohra Scarp',
    summary: 'Rainfall crossed 110 mm/24h. Slope saturation at 84%. Rockfall hazard elevated.',
    impact: 'SH-5 tourist route restricted. Commercial transport paused.',
    channels: ['Police Checkpost Siren', 'PWD Dispatch', 'Push Alert'],
    timestamp: '1 hour ago',
    active: true
  },
  {
    id: 'ALT-1084',
    zoneId: 'AR-011',
    location: 'Arunachal West (Zone AR-011)',
    level: 'HIGH',
    title: 'HIGH ALTITUDE SLOPE ALERT: Sela Incline',
    summary: 'Risk score reached 72. Tension cracks detected on defense lifeline NH-13.',
    impact: 'Single lane convoy protocol in effect.',
    channels: ['BRO Internal Net', 'Civil Admin Push'],
    timestamp: '3 hours ago',
    active: false
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: 'INC-401',
    title: 'Critical Slope Instability & NH-10 Disruption',
    zoneId: 'ES-042',
    location: 'East Sikkim — Zone ES-042',
    priority: 'Critical',
    assignedTeam: 'SDRF Team Alpha (Gangtok Quick Response)',
    teamLead: 'Capt. R. P. Chettri (SDRF)',
    status: 'IN PROGRESS',
    updated: '8 min ago',
    infrastructure: ['NH-10 (Km 42)', 'Singtam North Water Main', 'Teesta Footbridge'],
    recommendedActions: [
      'Establish 300m safety cordon around Km 42 fissure',
      'Halt all non-emergency transit on NH-10 and divert to Lava route',
      'Deploy portable inclinometer pegs across upper crack zone',
      'Pre-position heavy earth-moving equipment at Singtam depot'
    ],
    timeline: [
      { time: '13:05', event: 'Rainfall telemetry crossed critical threshold (82 mm/24h)' },
      { time: '13:11', event: 'Field report FR-2041 received from Officer T. Dorjee' },
      { time: '13:14', event: 'AI Reassessment recalculates Risk Score: 69 → 87 (CRITICAL)' },
      { time: '13:16', event: 'Critical Alert ALT-1092 issued via SMS, App Push & State CAP Gateway' },
      { time: '13:21', event: 'SDRF Team Alpha dispatched from Gangtok Central Depot' },
      { time: '13:35', event: 'Field verification team arrived at site; traffic diverted' }
    ]
  },
  {
    id: 'INC-402',
    title: 'Aizawl North Bypass Roadbed Subsidence',
    zoneId: 'MZ-014',
    location: 'Mizoram Central — Zone MZ-014',
    priority: 'High',
    assignedTeam: 'Mizoram PWD Quick Response Wing',
    teamLead: 'Er. Zonunmawia (PWD)',
    status: 'ASSIGNED',
    updated: '24 min ago',
    infrastructure: ['NH-54 Bypass', 'Durtlang HT Power Pylon #14'],
    recommendedActions: [
      'Erect physical barriers at Km 9 turnoff',
      'Assess tension crack depth with ground probe',
      'Clear mud slurry to protect high-tension pylon foundation'
    ],
    timeline: [
      { time: '12:45', event: 'Telemetry flagged saturation surge (72%)' },
      { time: '13:08', event: 'Citizen report FR-2038 received' },
      { time: '13:15', event: 'AI confirmed high-probability debris runout' },
      { time: '13:25', event: 'PWD team assigned and en route with loader' }
    ]
  },
  {
    id: 'INC-403',
    title: 'Mawkdok Gorge Rockfall Catchment Clearance',
    zoneId: 'MG-008',
    location: 'Meghalaya Plateau — Zone MG-008',
    priority: 'Medium',
    assignedTeam: 'Sohra PWD Maintenance Depot',
    teamLead: 'Insp. B. Marbaniang',
    status: 'VERIFIED',
    updated: '52 min ago',
    infrastructure: ['SH-5 Corridor', 'Duwan Sing Bridge Viewpoint'],
    recommendedActions: [
      'Empty catchment net basin before next rainfall peak',
      'Maintain one-way escort for local passenger vehicles'
    ],
    timeline: [
      { time: '11:30', event: 'Rainfall intensity reached 25 mm/h peak' },
      { time: '12:10', event: 'Rockfall report FR-2035 logged by PWD patrol' },
      { time: '12:40', event: 'Netting structural inspection completed' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    type: 'critical',
    title: 'Critical Risk Escalation: East Sikkim',
    message: 'Zone ES-042 risk score reached 87 (+14%). Immediate operational attention recommended.',
    time: '8 min ago',
    unread: true,
    zoneId: 'ES-042'
  },
  {
    id: 'NOTIF-02',
    type: 'info',
    title: 'New Field Verification Submitted',
    message: 'Field Officer T. Dorjee confirmed 45m slope crack on NH-10 corridor.',
    time: '12 min ago',
    unread: true,
    reportId: 'FR-2041'
  },
  {
    id: 'NOTIF-03',
    type: 'warning',
    title: 'Road Restriction Active',
    message: 'NH-10 Sevoke–Gangtok traffic closed at Km 38. Diverted to Lava route.',
    time: '16 min ago',
    unread: true,
    roadId: 'RD-01'
  },
  {
    id: 'NOTIF-04',
    type: 'success',
    title: 'Response Team Alpha Deployed',
    message: 'SDRF Unit arrived on scene at Singtam for geotechnical stabilization.',
    time: '22 min ago',
    unread: false,
    incidentId: 'INC-401'
  }
];

// Interactive Demo Scenario steps (#32, #33, #46)
export const DEMO_SCENARIO_STEPS = [
  {
    step: 0,
    title: 'Baseline Monitoring',
    riskScore: 42,
    riskLevel: 'WATCH',
    rainfall24h: 30,
    soilMoisture: 45,
    fieldReportStatus: 'None',
    alertStatus: 'Advisory',
    responseStatus: 'Routine Standby',
    description: 'Initial state: East Sikkim is under normal seasonal watch with moderate rainfall.'
  },
  {
    step: 1,
    title: 'Heavy Rainfall Onset',
    riskScore: 57,
    riskLevel: 'WATCH',
    rainfall24h: 58,
    soilMoisture: 56,
    fieldReportStatus: 'Rain telemetry surge',
    alertStatus: 'Pre-Alert',
    responseStatus: 'Alert Level Raised',
    description: 'Intense precipitation detected: 24h rainfall rises to 58 mm. Soil starts saturating.'
  },
  {
    step: 2,
    title: 'Soil Moisture Saturation Surge',
    riskScore: 69,
    riskLevel: 'HIGH',
    rainfall24h: 74,
    soilMoisture: 72,
    fieldReportStatus: 'Surface runoff alert',
    alertStatus: 'High Risk Advisory',
    responseStatus: 'PWD on Standby',
    description: 'Continuous downpour increases soil moisture to 72%. Shear strength degraded on steep slopes.'
  },
  {
    step: 3,
    title: 'Field Officer Submits Slope Crack Report',
    riskScore: 81,
    riskLevel: 'HIGH',
    rainfall24h: 82,
    soilMoisture: 78,
    fieldReportStatus: 'FR-2041 Submitted (45m Fissure)',
    alertStatus: 'Escalation Notice',
    responseStatus: 'Pre-Deployment Order',
    description: 'Officer T. Dorjee uploads geotagged photo of 45m tension fissure along NH-10 roadbed.'
  },
  {
    step: 4,
    title: 'AI Multi-Factor Recalculation',
    riskScore: 87,
    riskLevel: 'CRITICAL',
    rainfall24h: 82,
    soilMoisture: 78,
    fieldReportStatus: 'Verified (AI Confidence 86%)',
    alertStatus: 'Critical Warning Ready',
    responseStatus: 'Immediate Action Required',
    description: 'AI model fuses rainfall, soil moisture, 34° slope and field evidence. Risk jumps to 87 (CRITICAL). 2 roads & 3 villages impacted.'
  },
  {
    step: 5,
    title: 'Early Warning Alert Dispatched',
    riskScore: 87,
    riskLevel: 'CRITICAL',
    rainfall24h: 82,
    soilMoisture: 78,
    fieldReportStatus: 'Verified',
    alertStatus: 'ALT-1092 Broadcast via SMS/Push',
    responseStatus: 'Public & Authorities Notified',
    description: 'Early warning dispatched to 2,450 residents, district collectorate, and border police.'
  },
  {
    step: 6,
    title: 'SDRF Response Team Alpha Assigned',
    riskScore: 87,
    riskLevel: 'CRITICAL',
    rainfall24h: 82,
    soilMoisture: 78,
    fieldReportStatus: 'Verified',
    alertStatus: 'Active Broadcast',
    responseStatus: 'Team Alpha In Progress',
    description: 'SDRF Quick Response Unit deployed to Singtam. NH-10 traffic diverted to prevent casualties.'
  },
  {
    step: 7,
    title: 'Field Stabilized & Conditions Easing',
    riskScore: 64,
    riskLevel: 'WATCH',
    rainfall24h: 42,
    soilMoisture: 60,
    fieldReportStatus: 'Mitigation Netting Anchored',
    alertStatus: 'All-Clear Advisory',
    responseStatus: 'Resolved / Monitoring',
    description: 'Controlled drainage relief cut. Rainfall ceases. Risk lowers to 64 as conditions stabilize.'
  }
];

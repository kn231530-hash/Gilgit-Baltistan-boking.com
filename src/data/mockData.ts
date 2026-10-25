import { RegionInfo, RouteItem, JeepItem, MountainPassStatus, StayItem, ProductItem, LocalExpertItem } from '../types';

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1WDHrQC9Y1-4UeZ_lqj8t17--erpPR6yG2G0CD5zRb79Lk6CgwvESznZ5PTlIlcxXSU50nImnkyCdJp7fxkh05otAZEfcQav4JaNT2R4RLKtGIVF6v8fW8EYKuX38_e6pvqBn6MkBQwNflTyjsv6Te9FJ6jsrEQioCGtK-NgQyCTmxeD90VWzwW6IZ8nl3EMa9MpjrkUsqt4hVE3NjmQtos1iHvMudjDLS2sNQ0k5x6BV9p6jiP9QB_2g';

export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHZlfIfvo_ZKfpUDNHVIGTwJ7cOmrdRBnawDjmHO5Ta8pd2GllPDG1tJtbQKkGPFLkiKLD0P1jeIUm_6a8UBgJE540_DEUatYpdqD-MU9TYyZg1THVHkyNLpOuJOywdVXD9LPhPezJBp7nV0k_6hJ9iGih4ym3GQqoTBGqtvgoGkFQPbYj3AjNgelZOPUCVkK6zb43d_xG92MYxoVnhmmiNlwpnikrIBO1HqYz97tZGhOzjT94HEKP';

export const HERO_MOUNTAIN_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYgKaI68VA0_3DMiocGa8LvJddwSM_CKZAZ6S2wweFoDQS6eXPLTzvKOBb-ySgZHBEDtslSZ8uIersqLml698H2kbHTqJ8F-YhDA-2DRf2GkjTGPHfvhwEBu8XPHsTCBlqUl0tjfyUlUjAklruyOd6AgorN0RFFcDTYcucr8cTpVefan4OZIhplb5pVU0az4AAARTaNqo6oKyXRnGdC4_VmPZvM9B6Y9IZbdzgmjnTRa_7F6j-bJCQ';

export const REGIONS: RegionInfo[] = [
  { id: 'all', name: 'All GB', tagline: 'Karakoram, Himalayas & Hindu Kush', weather: 'Dry Roads', temp: '16°C', condition: 'Sunny' },
  { id: 'hunza', name: 'Hunza Valley', tagline: 'Karimabad, Aliabad & Gojal', weather: 'Clear Sky', temp: '18°C', condition: 'Clear' },
  { id: 'skardu', name: 'Skardu', tagline: 'Deosai, Shigar & Lower Kachura', weather: 'Crisp & Sunny', temp: '14°C', condition: 'Sunny' },
  { id: 'gilgit', name: 'Gilgit City', tagline: 'Provincial Capital Hub', weather: 'Pleasant', temp: '21°C', condition: 'Clear' },
  { id: 'ghizer', name: 'Ghizer', tagline: 'Phander & Khalti Lake', weather: 'Cool Breeze', temp: '15°C', condition: 'Partly Cloudy' },
  { id: 'astore', name: 'Astore', tagline: 'Rama Meadow & Deosai Gateway', weather: 'Cold Nights', temp: '12°C', condition: 'Crisp' },
  { id: 'nagar', name: 'Nagar', tagline: 'Minapin & Hopper Glacier', weather: 'Fresh Alpine', temp: '16°C', condition: 'Clear' },
  { id: 'diamer', name: 'Diamer', tagline: 'Chilas & Babusar Base', weather: 'Warm Valley', temp: '23°C', condition: 'Sunny' },
];

export const SCHEDULED_ROUTES: RouteItem[] = [
  {
    id: 'route-1',
    title: 'Islamabad to Gilgit Central',
    from: 'Islamabad',
    to: 'Gilgit Central',
    routeVia: 'Via KKH Babusar Pass • 14h 30m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAteTjKN9T3RmxrTE2rNbnRRFEOAWi39oJieSls6FWfDldCwK0bpotiCjf6h4yjhoifdlxPth-tcNkd6rhW7IBHCYWyrhvLC7_U2wdyoU_7lyJlDiUrYO_fx4XKqRRRVrRts5uoEPuW_h8TyEBvZjZ9y_rUww32zx3lC1Eb3KQbJTXlY37_jxwn1kUnRRPvyZGrxgPREUMeTBIm9IguwpKuxlMIVfXdkHf3jCD1joQwa-8GdYLZgOkP',
    pricePerSeat: 4500,
    departureTime: 'Dep: 07:00 PM',
    duration: '14h 30m',
    frequency: 'Daily regulated',
    seatsLeft: 12,
    rating: 4.8,
    reviewsCount: 342,
    tags: ['NATCO & Faisal Executive', 'Popular'],
    amenities: ['Starlink Wi-Fi', '220V Outlets', 'Recliner Seats', 'Onboard Host'],
    operator: 'NATCO & Faisal Executive'
  },
  {
    id: 'route-2',
    title: 'Silk Route Hiace Express',
    from: 'Gilgit Bus Stand',
    to: 'Hunza Karimabad',
    routeVia: 'KKH Asphalt Carpet • Scenic river views',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH9mFPqpBJwm9m6fIr_37lcjkw5ULqv34TzFOlSwonTNfqE4J7KKVBoq5zgNmRuu3EJ7wiJqWrfBO-_Ae36JNycsxTZfX1nvzXbVHeOX7vl_wjBDx-29mMjLNoOZbrV-GjcsuFKSaLrluVXZ7BD3eeR09qhyRG_d9uBu-zrdL-1rhxNSwOC7Fpt3-YD1QckUVJXb1SbwiFz8m9G9iRCtYAqtxdbbdpwgHHmeixa-Q4bEZJREZNn_s6',
    pricePerSeat: 800,
    departureTime: 'Departures Hourly',
    duration: '2h 15m duration',
    frequency: 'High Frequency',
    rating: 4.9,
    reviewsCount: 198,
    tags: ['High Freq', 'Fast Direct'],
    amenities: ['AC & Wi-Fi', '1 Bag incl.', 'Punctual Dispatch'],
    operator: 'Silk Route Transport Guild'
  },
  {
    id: 'route-3',
    title: 'Executive Coaster Transit',
    from: 'Islamabad / Rawalpindi',
    to: 'Hunza / Aliabad',
    routeVia: 'Includes Karakoram Highway stops & tea',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH9mFPqpBJwm9m6fIr_37lcjkw5ULqv34TzFOlSwonTNfqE4J7KKVBoq5zgNmRuu3EJ7wiJqWrfBO-_Ae36JNycsxTZfX1nvzXbVHeOX7vl_wjBDx-29mMjLNoOZbrV-GjcsuFKSaLrluVXZ7BD3eeR09qhyRG_d9uBu-zrdL-1rhxNSwOC7Fpt3-YD1QckUVJXb1SbwiFz8m9G9iRCtYAqtxdbbdpwgHHmeixa-Q4bEZJREZNn_s6',
    pricePerSeat: 4500,
    departureTime: 'Daily 7:00 AM',
    duration: '16h',
    frequency: 'Morning Express',
    seatsLeft: 8,
    rating: 4.7,
    reviewsCount: 215,
    tags: ['AC & Wi-Fi', 'Executive'],
    amenities: ['Tea stop Chilas', 'Reclining seats', 'Charging ports'],
    operator: 'Karakoram Luxury Line'
  }
];

export const JEEP_FLEET: JeepItem[] = [
  {
    id: 'jeep-1',
    title: 'Toyota Land Cruiser Prado TZ',
    region: 'Skardu • Deosai Plains • Khaplu Valley',
    routesCovered: 'Deosai High Plateau, Sheosar Lake, Shigar Fort',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM1FsOldIvi1qmKLVlDTgH-YFlxWna9WMf2QtbMqSV68bYPS1itVLWeYTu7uR8c7oZoCCYU7KV0wvnIjatwXQYdoRCsTv4W1xbj1fN9WXbUzHvqms_nlVat1kE0D5kV1aSQRjQegepvT9G2w_OKl7qn4CnYE2Ez54Pr8cJocqP50go7QCMTb9uYJailUkt4ioWfP_bqdJg4U8glm980aSyPoVHjtpsQYdGiZ6dJj4IycPcHEOlvW2p',
    pricePerDay: 18500,
    driverName: 'Ustad Karim Skardu',
    driverExperience: '14 Yrs Snow & River Crossings',
    driverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkkLjaZAH8Taf1DbrjSxOvQidA8MPwinaKcnsXcB0FhhoLvrs67z9npfpsw-05Bqno2R-0L9Impknek0OUA3QgCWG9szY6CQZXGAU1HtoynHMgmBhLKv6fPzZ3OM-tAjVJu2eqHiCkcrQmFIiEAZW-rlBckiwKlCHVow-mHKe8JnWQwdymcHZUH-WlVdvtl1bleQS_ttWDO8K5MNh3r01fM9qZCSkJSwgzIDXRpsqYId0bhIMXz9o5',
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Deosai & Shigar Certified',
    seats: 5,
    luggage: '4 Large',
    acType: 'Dual AC',
    hasRoofRack: true,
    fuelPolicy: 'Fuel as Used (Start full / return full)',
    tagline: 'Vetted mountain driver, high-clearance off-road setup'
  },
  {
    id: 'jeep-2',
    title: 'Willys 4x4 Mountain Cruiser',
    region: 'Hunza • Passu Cones • Khunjerab',
    routesCovered: 'Attabad Lake, Hopper Glacier & Khunjerab Pass',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHjwHk9nkk89VKdRcJ1uxvAH1qWZBt11o4-at_0frmPj4hgLBlzPZFIbzm0XYDEnLsBmyh_KR9nbBoNWFyCGLguD351_LEX-NnbITTIoVZGRXSJIa5VnIXnUNlL-FmulvNk0GKsHw2do8KUQzZVqbKe-_ZvIsnZMTJMsITDI8hY2Y1NII4Sw04pr81W8gsCUWPSdw84gfdLMkhgT_2v35ZOLWK_gPL6cxASb_YObOKF-AeCx26VVem',
    pricePerDay: 12000,
    driverName: 'Jamshed Ali (Hunza)',
    driverExperience: 'Attabad Lake & Hopper Glacier Expert',
    rating: 4.95,
    reviewsCount: 72,
    badge: 'Classic Open Safari',
    seats: 6,
    luggage: '3 Bags',
    acType: 'Open Alpine Air',
    hasRoofRack: false,
    fuelPolicy: 'Inclusive of Driver & Routine Passes',
    tagline: '360° Panoramic Open View for Photography'
  },
  {
    id: 'jeep-3',
    title: 'Toyota Hilux Revo 4x4',
    region: 'K2 Basecamp Gateway • Shigar • Askole',
    routesCovered: 'Extreme rocky moraines, deep riverbeds & expedition haulage',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIuX15Hq827P4SMBeK7-8cTNCgAB2TCCbz_5F2vf208vrO8t4VRBVWw0J4S7Rc9FmSUYrcASy17-u6vsAmI3dQGi4B3k-3iAoqkSrSWX3-SVTu3qCP98B3k8HkBI8JA7n7tbu4qWzI3o0vkbaXEpzpH6CqW5jBQx-Y61n-tHMfIprQE64HNUXgCxrpcSdRTZ5_ZiHHNNokFnSkgBG0-EGc3pkex2GWViDj3vRtZJLWNP13JQEd7M3F',
    pricePerDay: 22000,
    driverName: 'Senior Expedition Driver',
    driverExperience: '18 Yrs Karakoram Highway & Trek Convoys',
    rating: 4.85,
    reviewsCount: 56,
    badge: 'Heavy Duty Expedition',
    seats: 5,
    luggage: '800kg Bed Cargo',
    acType: 'Climate Control',
    hasRoofRack: true,
    fuelPolicy: 'Base package with verified receipt reconciliation',
    tagline: 'Equipped with heavy duty winch, high air snorkel, and satellite radio'
  }
];

export const MOUNTAIN_PASS_STATUSES: MountainPassStatus[] = [
  {
    id: 'pass-1',
    title: 'Naran ➔ Chilas via Babusar Pass',
    subtitle: 'Est. 4.5 hrs • 4,173m Elevation',
    elevation: '4,173m',
    status: 'Open',
    conditionNote: 'Smooth flow • Daylight transit recommended',
    type: 'pass'
  },
  {
    id: 'pass-2',
    title: 'Gilgit ➔ Karimabad (KKH N-35)',
    subtitle: 'Est. 2 hrs • Asphalt Carpet',
    elevation: '2,400m',
    status: 'Clear',
    conditionNote: 'Ideal drive • All vehicle types cleared',
    type: 'highway'
  },
  {
    id: 'pass-3',
    title: 'Jaglot ➔ Skardu S-1 Highway',
    subtitle: 'Est. 4 hrs • Astak Gorge widening',
    elevation: '2,200m',
    status: 'Slow Move',
    conditionNote: 'Single lane at km 42 • Minor gravel section',
    type: 'highway'
  },
  {
    id: 'pass-4',
    title: 'Passu ➔ Khunjerab China Border',
    subtitle: 'Est. 3 hrs • 4,693m Zero Point',
    elevation: '4,693m',
    status: 'Open',
    conditionNote: 'Snow chains optional • Freezing temperatures at top',
    type: 'border'
  }
];

export const STAYS_LIST: StayItem[] = [
  {
    id: 'stay-1',
    title: 'Luxus Hunza Resort',
    location: 'Attabad Lakefront, Gojal Hunza',
    region: 'hunza',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDKmHswWHWmSBTTnn7V1WJgkeOS3e81bOeGSYdW_9mYh5j6K-Dp0E7SVFQvJdZgljT5AALWiIkiStYN-cJohF64c6SaOkiBmM9m1zvk5oPuEjoi8M2NZwzzmW11iJ02cR2wWTgcKrxtCk27Oj6QtbXnVmhJoCFPRQw4n9pLUYBC2dQqcmUEPtoxEipCfjXAiMSo_FPcUu2OD7vxq5zqirhXQAbDPgm4Gew9XIWs3IyTHT9T1FKRGlL',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDKmHswWHWmSBTTnn7V1WJgkeOS3e81bOeGSYdW_9mYh5j6K-Dp0E7SVFQvJdZgljT5AALWiIkiStYN-cJohF64c6SaOkiBmM9m1zvk5oPuEjoi8M2NZwzzmW11iJ02cR2wWTgcKrxtCk27Oj6QtbXnVmhJoCFPRQw4n9pLUYBC2dQqcmUEPtoxEipCfjXAiMSo_FPcUu2OD7vxq5zqirhXQAbDPgm4Gew9XIWs3IyTHT9T1FKRGlL',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDllojAEzphWOHgfHyin0_UzDS-yVAiMg9NUm2O-EzsWJOjAME1T9XB3VyUb1XT6POdJBBPYGUm7jnALySYk1OXiZKmQy894nwlv2XQjYlQFSueHfYB03C116psuZ43wbPk8KZW_ad4lFB0Y8hw8ko2hQtpcenVbSdMDTO1GaFY6y_s6R4kEuVFKTg1L5-NLltZxoj2G39JZFlrmzBcoo4JC_jgCEPX7tA6TOgoh586HgebMb9Zzuws'
    ],
    pricePerNight: 28000,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Lakefront Luxury',
    badgeType: 'luxury',
    highDemand: true,
    amenities: ['Lake Balcony', 'Room Heater', 'Free Wi-Fi', '24/7 Generator', 'Breakfast Included'],
    tagNote: 'Taxes & Lake View Fee incl.',
    description: 'Perched gracefully on the vibrant turquoise Attabad Lake shoreline in Gojal Hunza. Floor-to-ceiling glass panoramic view of jagged Karakoram pinnacles with heated suites and private sun deck over the alpine water.'
  },
  {
    id: 'stay-2',
    title: 'Shangrila Resort Skardu',
    location: 'Lower Kachura Lake, Skardu',
    region: 'skardu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTRQrD_ux0fetVp6ZgHBGyU8RaIBfIIQBir6DJHmNAhgnVHkgNZjhpg2x9nkcjQA340xIJkTf45b-Y-D2NG5hn0bVjynRLPwZy_m_XI6LNfYiUb-L7ns5IP_DE8u0snZTVGdorpTgVBxEJAw83WQsnLY2LwDc-fjsx3fX7cZYt3ocHiLhpS609PKe68zT8Cwa09HG57Nvr3Vr2yjb8B_xE66LVzmPJ3QhI865zB_tDcvt77VkS7u6N',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTRQrD_ux0fetVp6ZgHBGyU8RaIBfIIQBir6DJHmNAhgnVHkgNZjhpg2x9nkcjQA340xIJkTf45b-Y-D2NG5hn0bVjynRLPwZy_m_XI6LNfYiUb-L7ns5IP_DE8u0snZTVGdorpTgVBxEJAw83WQsnLY2LwDc-fjsx3fX7cZYt3ocHiLhpS609PKe68zT8Cwa09HG57Nvr3Vr2yjb8B_xE66LVzmPJ3QhI865zB_tDcvt77VkS7u6N'
    ],
    pricePerNight: 24500,
    rating: 4.8,
    reviewsCount: 98,
    badge: 'Heritage Resort',
    badgeType: 'heritage',
    amenities: ['Pagoda Mountain View', 'Airport Shuttle', 'Organic Garden', 'Central Heating'],
    tagNote: 'Shuttle included on 2+ nights',
    description: 'Famous Tibetan-inspired resort encircling the heart-shaped Lower Kachura Lake. Known as "Heaven on Earth" in Baltistan, boasting organic apple orchards and traditional hospitality.'
  },
  {
    id: 'stay-3',
    title: 'Rakaposhi View Camp & Cottages',
    location: 'Minapin Nagar Valley',
    region: 'nagar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATYizf1qCd8wF4vFyk3JcaVo8hIuZFaT-OtTQYGktm1q58l_dIldq_I1zGrXKEAKVmA-NgJZTaHOKxG0qPc1Mcs8y4dIDOomseUgDlrpOxEMfTJV2TZRH762JeHBbmzje3a_ZmScpuLM2WkA-6IdCE0wxxzQSh8lHMdOtZlfcFBt9XWBhA5x1lyDkXl-hFLE2w5aHZBmJ-ULxcQeBs2rCL04qa5vbai29o1np5BnMV31vcXZyUNwWJ',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATYizf1qCd8wF4vFyk3JcaVo8hIuZFaT-OtTQYGktm1q58l_dIldq_I1zGrXKEAKVmA-NgJZTaHOKxG0qPc1Mcs8y4dIDOomseUgDlrpOxEMfTJV2TZRH762JeHBbmzje3a_ZmScpuLM2WkA-6IdCE0wxxzQSh8lHMdOtZlfcFBt9XWBhA5x1lyDkXl-hFLE2w5aHZBmJ-ULxcQeBs2rCL04qa5vbai29o1np5BnMV31vcXZyUNwWJ'
    ],
    pricePerNight: 7500,
    rating: 4.7,
    reviewsCount: 65,
    badge: 'Budget Friendly & Cozy',
    badgeType: 'budget',
    amenities: ['Wood Bukhari Heating', 'Night Bonfires', 'Authentic Local Meals', 'Basecamp Trek Guide'],
    tagNote: 'Campfire wood & tea incl.',
    description: 'Cosy alpine wooden cottages directly looking up at the monumental North Face of Mount Rakaposhi (7,788m). Delicious Chapshuro, herbal teas, and campfire stargazing.'
  },
  {
    id: 'stay-4',
    title: 'Serena Gilgit Heritage Suite',
    location: 'Gilgit City Center',
    region: 'gilgit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRSue9NjCzYFR4xYVcVJ2cvykWF2luQm6Wi_IMirE2CAVOjux_HfC0nG3TwtRunfrm5x_NrT_kFu-zm4AXXJn4ggpww_2Qm-TFq8hBm_zvKgdhmE3W53KiHIutro5vwJV-z6RMq1ufhn1PqFaB93i8bcnQtNA4N2ukB-af9S6jWyACyqZzwPOL1smnALVEOEOYEyxirUsMRGHdczlR6hq4NLhmHadnE5b3H3WPEIVVPeGRNUuPHdTt',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRSue9NjCzYFR4xYVcVJ2cvykWF2luQm6Wi_IMirE2CAVOjux_HfC0nG3TwtRunfrm5x_NrT_kFu-zm4AXXJn4ggpww_2Qm-TFq8hBm_zvKgdhmE3W53KiHIutro5vwJV-z6RMq1ufhn1PqFaB93i8bcnQtNA4N2ukB-af9S6jWyACyqZzwPOL1smnALVEOEOYEyxirUsMRGHdczlR6hq4NLhmHadnE5b3H3WPEIVVPeGRNUuPHdTt'
    ],
    pricePerNight: 22000,
    rating: 4.8,
    reviewsCount: 110,
    badge: 'Executive Heritage',
    badgeType: 'heritage',
    amenities: ['Breakfast Buffet', 'Lush Rose Gardens', '24/7 Security', 'Airport Meet & Greet'],
    tagNote: 'City Center oasis with mountain views',
    description: 'Premier 5-star standard hotel surrounded by manicured gardens, overlooking the Jutial valley and snow-clad peaks.'
  }
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Hunza Organic Sun-Dried Apricots (1 Kg)',
    seller: 'Mountain Harvest Hunza',
    category: 'dry-fruits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnmuPmXgM3BmgqymfmsfQyImTXL6iw5BWbYYcv2PGgvi2G96jtIMLCikLwf3odENQ9vECAkYz3qeO7paXMWzb99kfDrsv_y23mkO1knJ3m0-98xLB1m56SEzX9FSY8W4SIexL7uBNTP-cRXB-M1w6z-yidNmAm9ANrBYdGz3mi2UbhZb9wm_AWzI6kryRMKJjQtXYPQBf2k2QD5NqmYq60vIPivMBy7cQp2qdV3m_Rn5cG2TOEZGUK',
    price: 1450,
    originalPrice: 1800,
    unit: '1kg sealed harvest pack',
    rating: 4.9,
    reviewsCount: 128,
    badge: '-20% OFF',
    stockNote: 'Only 5 left in Karimabad',
    isOrganic: true
  },
  {
    id: 'prod-2',
    title: 'Karakoram Walnut Kernels (Akhrot Giri) 1 Kg',
    seller: 'Gilgit Dry Fruit Market',
    category: 'dry-fruits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPsDuzUnfM3to3F1qFyoQXPgoFvW7yaexzwXDznemcYU8-DIsXk_wmOSN1GAGVKg1xJEockO8R1mjah19ZheImh7UJggSkYB_JyhhbIX3ti1IJzaeFJVcz-3R8Trwdo2jaf41K3hIUibxVZDUvPqq5McoXB8HU2JFX9945EVup41N_0j454V-THVUuHGJQo0mVEHsOWmk7CtHfV-t-PYyzyZRk_z6FR7FJo8dcUslZ0WUsGqPVX0fZ',
    price: 2100,
    unit: 'Vacuum Sealed Pack',
    rating: 4.8,
    reviewsCount: 94,
    badge: 'Batch 2024',
    stockNote: 'Fresh Autumn Crop',
    isOrganic: true
  },
  {
    id: 'prod-3',
    title: 'Authentic Handmade Chitrali/Hunza Woolen Pakol Cap',
    seller: 'Chitral & Nagar Guild',
    category: 'shawls',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC-cFC0viihoa6DTD9rFBgmwXCy8HmTm_MYDNUGGox5-VXHNNv2vuNo7_KM2HwaTDm0drIn1aUOEmoAas1zdghKkhtb_sGmXH83I44lo-GD44t251XVt3G7tujeo8nqURkvsH1uHo2Tz2n4n14yz4OzMI4v6vt08bkUvf-G9iX_GcMprzKxXlo-s0h04arZo32gBmCf7_k37uI7CkYpdm5pea7xSpGMHONShNR7jgM-ErvPE2iInPl',
    price: 1850,
    unit: 'Natural Beige Wool',
    rating: 5.0,
    reviewsCount: 62,
    badge: 'Handspun',
    stockNote: '100% Pure Sheep Wool',
    isArtisan: true
  },
  {
    id: 'prod-4',
    title: 'Raw Mountain Blossom Honey (Sidr & Berry) 500g',
    seller: 'Deosai Apiaries',
    category: 'honey',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzRC1qThBLjY5O0iypEVj0CcVMWpSABbsEtsUk6Ndz6AJGvY9YtvJp3N9DNnkY2Q3bZlLfp-tLOoPFGGWMNhACN6XJ-5-xZoB_G1voeVz2R3BzqaH9g9o74nQGHoJC8YXgSRC1m4sxTZ0ESQYsYgeqpzKPM902W2_dzV_7LWhs3lJL_JXG6L7lL2pNU6NIIxAwgdHodWfNL0y17OXOtYNiahdzjA-W12f0kA0Y0K-leuYfAn1PFvoP',
    price: 2200,
    unit: '500g Glass Jar',
    rating: 4.9,
    reviewsCount: 81,
    badge: 'Unpasteurized',
    stockNote: 'High Altitude Wild Flora',
    isOrganic: true
  },
  {
    id: 'prod-5',
    title: 'Skardu Aquamarine Raw Gemstone Pendant',
    seller: 'Shigar Gems & Minerals',
    category: 'gemstones',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj-TK36o0sHNV7B3h1TrxClaefGoPaIZ22VRQx_s2Lwm2LxhqbSWLVScDLAEmmz1yNRR7LIvB5FDeU7dJY-VCHAfMBLd2RyPTKheWDuMtd9rGIEoNYuAmVCNSfZ3i6EYmaybo5FoErpAmQ8akmsj2xA_W3DJ4LWuRDnRRFnW2GBDjezeWWFxqM0oPMB0MVvlKSUH4ZU3PsFUNbHQwT06YgSdXZhf_00n5m8XDCmZ_EFEU0u7G6SnUl',
    price: 6500,
    unit: 'Unique Specimen',
    rating: 5.0,
    reviewsCount: 19,
    badge: 'Certified Gem',
    stockNote: 'Natural Unheated • 925 Silver',
    isArtisan: true
  },
  {
    id: 'prod-6',
    title: '20000mAh Power Bank (Cold Camping Tech)',
    seller: 'Karakoram Trek & Tech',
    category: 'tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDER9GK0_oq-mFNyL1K27JsEI3G-qx6FWy_D3wmJPXM8D6IHvcM2DfupbyIMCkTFeWdkoDJLLRIkADq6OFrJdz7z3LOX-UWzgOGjLjQkF5lInl1a6Y1msUrFKrtOhfIZqH9Uy5Stk9uuXGOuV1pLUKRYfGn1LYLAUjOmNLWRy-QMm8RJUBqJH1Sh6snGg0exedfYvj8_5X77cdHr6_GswNsxmUJvKlR2oi8qwuECvHBXQFX00SGKw96',
    price: 4800,
    unit: '1 Year Warranty',
    rating: 4.7,
    reviewsCount: 45,
    badge: '-20°C Certified',
    stockNote: 'Fast 65W PD • Flashlight',
    isArtisan: false
  }
];

export const LOCAL_EXPERTS: LocalExpertItem[] = [
  {
    id: 'expert-1',
    name: 'Juglot 4x4 Roadside Rescue',
    title: 'Brake, engine, & towing support on KKH',
    category: 'roadside',
    serviceType: 'Emergency 4x4 & Towing',
    location: 'Juglot KKH Junction',
    phone: '+925811001122',
    rating: 4.9,
    status: '24/7 Available',
    is24x7: true,
    verified: true,
    specialty: 'High-altitude radiator boils, broken axles & heavy winch recovery',
    icon: 'car_repair'
  },
  {
    id: 'expert-2',
    name: 'Rashid Balti • K2 Trek Lead',
    title: 'High altitude guide • Baltoro & Concordia',
    category: 'guide',
    serviceType: 'Licensed Mountain Guide',
    location: 'Skardu Base Office',
    phone: '+925815002233',
    rating: 4.95,
    status: 'Licensed Guide',
    verified: true,
    specialty: 'Concordia, K2 Basecamp, Gondogoro La pass & high-altitude acclimatization',
    icon: 'hiking'
  },
  {
    id: 'expert-3',
    name: 'Karim Electric & Solar',
    title: 'Inverter, wiring & emergency backup',
    category: 'electrical',
    serviceType: 'Solar & Heating Tech',
    location: 'Gilgit City / Hunza',
    phone: '+925811003344',
    rating: 4.85,
    status: 'Active Field Unit',
    verified: true,
    specialty: 'Sub-zero battery management, diesel generator sync, winter hotel wiring',
    icon: 'bolt'
  },
  {
    id: 'expert-4',
    name: 'Hunza Alpine Medical & Oxygen Desk',
    title: 'Portable O2 tanks, pulse oximetry, mountain medics',
    category: 'medical',
    serviceType: 'High Altitude Medical Team',
    location: 'Aliabad Hunza',
    phone: '+925813004455',
    rating: 5.0,
    status: '24/7 Emergency',
    is24x7: true,
    verified: true,
    specialty: 'Acute Mountain Sickness (AMS), emergency oxygen delivery, first responder',
    icon: 'medical_services'
  },
  {
    id: 'expert-5',
    name: 'Skardu Anti-Freeze Plumbing Solutions',
    title: 'Frozen water pipe thawing, geyser installation & insulated lines',
    category: 'plumbing',
    serviceType: 'Winterized Plumbing',
    location: 'Skardu Bazaar',
    phone: '+925815006677',
    rating: 4.8,
    status: 'On-Call',
    verified: true,
    specialty: 'Electric pipe tracing cables, Bukhari boiler heating loops, burst pipe sealing',
    icon: 'plumbing'
  }
];

export const ALPINE_MAP_CHECKPOINTS = [
  { id: 'cp-1', name: 'Babusar Top (4,173m)', type: 'pass', status: 'Open', desc: 'Highest point on Babusar road. Tea stalls & emergency clinic available.' },
  { id: 'cp-2', name: 'Chilas Junction', type: 'fuel', status: 'Operational', desc: 'PSO fuel station, 24/7 puncture repair and ATM available.' },
  { id: 'cp-3', name: 'Juglot KKH/Skardu Confluence', type: 'mechanic', status: '24/7 Ready', desc: 'Towing cranes, 4x4 spare parts, mountain mechanic depot.' },
  { id: 'cp-4', name: 'Rakaposhi Viewpoint (Ghizer/Nagar)', type: 'scenic', status: 'Open', desc: 'Cafe, clean restrooms, photo terrace.' },
  { id: 'cp-5', name: 'Attabad Lake Tunnel & Boat Slipway', type: 'water', status: 'Open', desc: 'Jet ski, speed boat transfers and luxury glamping access.' },
  { id: 'cp-6', name: 'Khunjerab Pass (4,693m)', type: 'border', status: 'Daylight Open', desc: 'World’s highest ATM, Pakistan-China friendship gate.' },
  { id: 'cp-7', name: 'Astak Gorge (Skardu Road S-1)', type: 'roadwork', status: 'Single Lane', desc: 'GB Works Department active clearing team.' },
];

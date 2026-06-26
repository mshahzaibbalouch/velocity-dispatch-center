// data/fleet.js

export const routes = {
  bosan_road: [
    [30.1575, 71.5249],
    [30.152, 71.518],
    [30.1465, 71.511],
    [30.141, 71.504],
    [30.1355, 71.497],
    [30.13, 71.49],
    [30.1245, 71.483],
    [30.119, 71.476],
  ],
  bwp_highway: [
    [30.1575, 71.5249],
    [30.14, 71.54],
    [30.12, 71.555],
    [30.09, 71.57],
    [30.06, 71.585],
    [30.02, 71.6],
    [29.98, 71.615],
    [29.94, 71.628],
  ],
  bwp_chowk_inner: [
    [30.195, 71.485],
    [30.188, 71.492],
    [30.181, 71.499],
    [30.174, 71.506],
    [30.167, 71.513],
    [30.16, 71.52],
  ],
  vihari_chowk: [
    [30.1575, 71.5249],
    [30.165, 71.535],
    [30.172, 71.545],
    [30.18, 71.555],
    [30.187, 71.565],
    [30.194, 71.575],
    [30.201, 71.585],
  ],
  khanewal_highway: [
    [30.1575, 71.5249],
    [30.17, 71.56],
    [30.185, 71.595],
    [30.2, 71.63],
    [30.22, 71.67],
    [30.24, 71.71],
    [30.26, 71.75],
    [30.29, 71.79],
  ],
  muzaffargarh_highway: [
    [30.1575, 71.5249],
    [30.145, 71.51],
    [30.13, 71.49],
    [30.11, 71.465],
    [30.09, 71.44],
    [30.07, 71.415],
    [30.05, 71.39],
    [30.03, 71.365],
  ],
  inner_hussain_agahi: [
    [30.198, 71.478],
    [30.195, 71.485],
    [30.192, 71.492],
    [30.189, 71.499],
    [30.186, 71.506],
    [30.183, 71.513],
    [30.18, 71.52],
    [30.177, 71.527],
  ],
  inner_cantt: [
    [30.21, 71.51],
    [30.205, 71.518],
    [30.2, 71.526],
    [30.195, 71.534],
    [30.19, 71.542],
    [30.185, 71.55],
    [30.18, 71.558],
  ],
  inner_new_multan: [
    [30.13, 71.56],
    [30.137, 71.552],
    [30.144, 71.544],
    [30.151, 71.536],
    [30.158, 71.528],
    [30.165, 71.52],
  ],
  inner_gulgasht: [
    [30.175, 71.505],
    [30.17, 71.512],
    [30.165, 71.519],
    [30.16, 71.526],
    [30.155, 71.533],
    [30.15, 71.54],
  ],
};

// inner
export const routeMeta = {
  bosan_road: { speed: 30 },
  bwp_highway: { speed: 60 },
  bwp_chowk_inner: { speed: 30 },
  vihari_chowk: { speed: 30 },
  khanewal_highway: { speed: 60 },
  muzaffargarh_highway: { speed: 60 },
  inner_hussain_agahi: { speed: 30 },
  inner_cantt: { speed: 30 },
  inner_new_multan: { speed: 30 },
  inner_gulgasht: { speed: 30 },
};

export const drivers = [
  // BOSAN ROAD - 5 online
  {
    id: "d1",
    route: "bosan_road",
    stepIndex: 0,
    status: "online",
    name: "Driver 1",
  },
  {
    id: "d2",
    route: "bosan_road",
    stepIndex: 2,
    status: "online",
    name: "Driver 2",
  },
  {
    id: "d3",
    route: "bosan_road",
    stepIndex: 4,
    status: "online",
    name: "Driver 3",
  },
  {
    id: "d4",
    route: "bosan_road",
    stepIndex: 6,
    status: "online",
    name: "Driver 4",
  },
  {
    id: "d5",
    route: "bosan_road",
    stepIndex: 1,
    status: "online",
    name: "Driver 5",
  },

  // BWP HIGHWAY - 4 online
  {
    id: "d6",
    route: "bwp_highway",
    stepIndex: 0,
    status: "online",
    name: "Driver 6",
  },
  {
    id: "d7",
    route: "bwp_highway",
    stepIndex: 2,
    status: "online",
    name: "Driver 7",
  },
  {
    id: "d8",
    route: "bwp_highway",
    stepIndex: 4,
    status: "online",
    name: "Driver 8",
  },
  {
    id: "d9",
    route: "bwp_highway",
    stepIndex: 6,
    status: "online",
    name: "Driver 9",
  },

  // VIHARI CHOWK - 3 online
  {
    id: "d10",
    route: "vihari_chowk",
    stepIndex: 0,
    status: "online",
    name: "Driver 10",
  },
  {
    id: "d11",
    route: "vihari_chowk",
    stepIndex: 2,
    status: "online",
    name: "Driver 11",
  },
  {
    id: "d12",
    route: "vihari_chowk",
    stepIndex: 4,
    status: "online",
    name: "Driver 12",
  },

  // KHANEWAL HIGHWAY - 3 online
  {
    id: "d13",
    route: "khanewal_highway",
    stepIndex: 0,
    status: "online",
    name: "Driver 13",
  },
  {
    id: "d14",
    route: "khanewal_highway",
    stepIndex: 3,
    status: "online",
    name: "Driver 14",
  },
  {
    id: "d15",
    route: "khanewal_highway",
    stepIndex: 5,
    status: "online",
    name: "Driver 15",
  },

  // MUZAFFARGARH HIGHWAY - 3 online
  {
    id: "d16",
    route: "muzaffargarh_highway",
    stepIndex: 0,
    status: "online",
    name: "Driver 16",
  },
  {
    id: "d17",
    route: "muzaffargarh_highway",
    stepIndex: 2,
    status: "online",
    name: "Driver 17",
  },
  {
    id: "d18",
    route: "muzaffargarh_highway",
    stepIndex: 5,
    status: "online",
    name: "Driver 18",
  },

  // BWP CHOWK INNER - 3 online
  {
    id: "d19",
    route: "bwp_chowk_inner",
    stepIndex: 0,
    status: "online",
    name: "Driver 19",
  },
  {
    id: "d20",
    route: "bwp_chowk_inner",
    stepIndex: 2,
    status: "online",
    name: "Driver 20",
  },
  {
    id: "d21",
    route: "bwp_chowk_inner",
    stepIndex: 4,
    status: "online",
    name: "Driver 21",
  },

  // INNER HUSSAIN AGAHI - 3 online
  {
    id: "d22",
    route: "inner_hussain_agahi",
    stepIndex: 0,
    status: "online",
    name: "Driver 22",
  },
  {
    id: "d23",
    route: "inner_hussain_agahi",
    stepIndex: 3,
    status: "online",
    name: "Driver 23",
  },
  {
    id: "d24",
    route: "inner_hussain_agahi",
    stepIndex: 6,
    status: "online",
    name: "Driver 24",
  },

  // INNER CANTT - 3 online
  {
    id: "d25",
    route: "inner_cantt",
    stepIndex: 0,
    status: "online",
    name: "Driver 25",
  },
  {
    id: "d26",
    route: "inner_cantt",
    stepIndex: 2,
    status: "online",
    name: "Driver 26",
  },
  {
    id: "d27",
    route: "inner_cantt",
    stepIndex: 4,
    status: "online",
    name: "Driver 27",
  },

  // INNER NEW MULTAN - 2 online
  {
    id: "d28",
    route: "inner_new_multan",
    stepIndex: 0,
    status: "online",
    name: "Driver 28",
  },
  {
    id: "d29",
    route: "inner_new_multan",
    stepIndex: 3,
    status: "online",
    name: "Driver 29",
  },

  // INNER GULGASHT - 2 online
  {
    id: "d30",
    route: "inner_gulgasht",
    stepIndex: 0,
    status: "online",
    name: "Driver 30",
  },
  {
    id: "d31",
    route: "inner_gulgasht",
    stepIndex: 3,
    status: "online",
    name: "Driver 31",
  },

  // OFFLINE - scattered off-road
  { id: "d32", lat: 30.178, lng: 71.558, status: "offline", name: "Driver 32" },
  { id: "d33", lat: 30.132, lng: 71.482, status: "offline", name: "Driver 33" },
  { id: "d34", lat: 30.205, lng: 71.502, status: "offline", name: "Driver 34" },
  { id: "d35", lat: 30.143, lng: 71.555, status: "offline", name: "Driver 35" },
  { id: "d36", lat: 30.188, lng: 71.475, status: "offline", name: "Driver 36" },
  { id: "d37", lat: 30.165, lng: 71.49, status: "offline", name: "Driver 37" },
  { id: "d38", lat: 30.22, lng: 71.53, status: "offline", name: "Driver 38" },
  { id: "d39", lat: 30.11, lng: 71.51, status: "offline", name: "Driver 39" },
  { id: "d40", lat: 30.195, lng: 71.568, status: "offline", name: "Driver 40" },
  { id: "d41", lat: 30.125, lng: 71.478, status: "offline", name: "Driver 41" },
  { id: "d42", lat: 30.21, lng: 71.495, status: "offline", name: "Driver 42" },
  { id: "d43", lat: 30.148, lng: 71.562, status: "offline", name: "Driver 43" },
  { id: "d44", lat: 30.172, lng: 71.483, status: "offline", name: "Driver 44" },
  { id: "d45", lat: 30.202, lng: 71.545, status: "offline", name: "Driver 45" },
  { id: "d46", lat: 30.138, lng: 71.508, status: "offline", name: "Driver 46" },
  { id: "d47", lat: 30.183, lng: 71.562, status: "offline", name: "Driver 47" },
  { id: "d48", lat: 30.155, lng: 71.485, status: "offline", name: "Driver 48" },
  { id: "d49", lat: 30.215, lng: 71.515, status: "offline", name: "Driver 49" },
  { id: "d50", lat: 30.128, lng: 71.548, status: "offline", name: "Driver 50" },
];

export const passengers = [
  { id: "p1", lat: 30.22, lng: 71.53, status: "online", name: "Passenger 1" },
  { id: "p2", lat: 30.11, lng: 71.51, status: "online", name: "Passenger 2" },
  { id: "p3", lat: 30.195, lng: 71.568, status: "online", name: "Passenger 3" },
  { id: "p4", lat: 30.125, lng: 71.478, status: "online", name: "Passenger 4" },
  { id: "p5", lat: 30.21, lng: 71.495, status: "online", name: "Passenger 5" },
  { id: "p6", lat: 30.148, lng: 71.562, status: "online", name: "Passenger 6" },
  { id: "p7", lat: 30.172, lng: 71.483, status: "online", name: "Passenger 7" },
  { id: "p8", lat: 30.202, lng: 71.545, status: "online", name: "Passenger 8" },
  { id: "p9", lat: 30.138, lng: 71.508, status: "online", name: "Passenger 9" },
  {
    id: "p10",
    lat: 30.183,
    lng: 71.562,
    status: "online",
    name: "Passenger 10",
  },
  {
    id: "p11",
    lat: 30.215,
    lng: 71.515,
    status: "online",
    name: "Passenger 11",
  },
  {
    id: "p12",
    lat: 30.128,
    lng: 71.548,
    status: "online",
    name: "Passenger 12",
  },
];

export const fleetStats = {
  online: 31,
  offline: 19,
  avgPickupTime: "4.2 min",
  fleetCapacity: 75,
};

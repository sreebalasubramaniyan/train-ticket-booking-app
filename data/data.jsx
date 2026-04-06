export const stations = [
  "New Delhi",
  "Howrah",
  "Mumbai CSMT",
  "Chennai Egmore",
  "Kolkata",
  "Kanpur",
  "Lucknow",
  "Bengaluru",
  "Secunderabad",
  "Ahmedabad",
];
const baseRoutes = [
  ["Chennai Egmore", "Mumbai CSMT"],
  ["New Delhi", "Chennai Egmore"],
  ["Mumbai CSMT", "Bengaluru"],
  ["Kolkata", "New Delhi"],
  ["Ahmedabad", "Mumbai CSMT"],
  ["Secunderabad", "Chennai Egmore"],
  ["Howrah", "Kanpur"],
  ["Lucknow", "Kolkata"],
  ["Bengaluru", "New Delhi"],
  ["Mumbai CSMT", "Secunderabad"],
  ["Chennai Egmore", "Bengaluru"],
  ["Mumbai CSMT", "Kolkata"],
  ["Ahmedabad", "New Delhi"],
  ["Howrah", "Mumbai CSMT"],
  ["Secunderabad", "Bengaluru"],
  ["Lucknow", "New Delhi"],
  ["Kanpur", "Mumbai CSMT"],
  ["Chennai Egmore", "Howrah"],
  ["Bengaluru", "Kolkata"],
  ["Ahmedabad", "Chennai Egmore"],
];
const trainNames = [
  "Rajdhani Express",
  "Shatabdi Express",
  "Duronto Express",
  "Garib Rath",
  "Superfast Express",
  "Jan Shatabdi",
  "Intercity Express",
  "Humsafar Express",
  "Tejas Express",
  "Double Decker Express",
  "Mail Express",
  "SF Express",

  // 🔥 Added more realistic names
  "Uday Express",
  "Antyodaya Express",
  "Sampark Kranti Express",
  "Vande Bharat Express",
  "Yuva Express",
  "Jan Nayak Express",
  "Holiday Special",
  "Festival Special",
  "Passenger Express",
  "MEMU Express",
  "DEMU Express",
  "AC Superfast Express",
  "Night Express",
  "Day Express",
  "Fast Passenger",
  "City Express",
  "Coastal Express",
  "Hill Express",
  "Central Express",
  "Eastern Express",
  "Western Express",
  "Southern Express",
  "Northern Express",
];

const routes = [
  ...baseRoutes,
  ...baseRoutes.map(([from, to]) => [to, from]),
];
// realistic train number generator (like 12xxx, 22xxx, 16xxx etc.)
const getTrainNumber = () => {
  const prefixes = [12, 16, 22, 11, 15, 18];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(100 + Math.random() * 900); // 3 digits
  return `${prefix}${suffix}`;
};

const getTime = (baseHour) => {
  const hour = (baseHour + Math.floor(Math.random() * 5)) % 24;
  const min = Math.floor(Math.random() * 60);
  return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

const getDuration = () => {
  const h = 8 + Math.floor(Math.random() * 25);
  const m = Math.floor(Math.random() * 60);
  return `${h}h ${m}m`;
};

const getClasses = () => [
  {
    class: "1A",
    available: Math.floor(Math.random() * 50),
    price: 1400 + Math.floor(Math.random() * 600),
  },
  {
    class: "2A",
    available: Math.floor(Math.random() * 60),
    price: 800 + Math.floor(Math.random() * 400),
  },
  {
    class: "3A",
    available: Math.floor(Math.random() * 80),
    price: 500 + Math.floor(Math.random() * 300),
  },
  {
    class: "SL",
    available: Math.floor(Math.random() * 120),
    price: 250 + Math.floor(Math.random() * 200),
  },
];

export const trains = [];

let trainCount = 0;

// ensure 100 trains (10 routes × 10 each)
routes.forEach((route, routeIndex) => {
  for (let i = 0; i < 10; i++) {
    const name =
      trainNames[(routeIndex + i) % trainNames.length] +
      ` (${route[0]} - ${route[1]})`;

    trains.push({
      name,
      number: getTrainNumber(),
      from: route[0],
      to: route[1],
      via: [`Junction ${((routeIndex + i) % 5) + 1}`],
      departure: getTime(5 + i),
      arrival: getTime(10 + i),
      duration: getDuration(),
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      classes: getClasses(),
    });

    trainCount++;
  }
});
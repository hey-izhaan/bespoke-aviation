import type { ImageMetadata } from "astro";
import kingAirExterior from "../assets/fleet/beech-king-air-200-gt/beech-king-air-200-gt-01.avif";
import kingAirCabin from "../assets/fleet/beech-king-air-200-gt/king-air-interior-2.avif";
import pc12Exterior from "../assets/fleet/pilatus-pc-12/Pilatus_PC-12-45.avif";
import pc12Cabin from "../assets/fleet/pilatus-pc-12/PC12_Interior_rearV2_press.avif";
import mustangExterior from "../assets/fleet/citation-mustang/citation-mustang-01.avif";
import mustangCabin from "../assets/fleet/citation-mustang/citation-mustang-02.avif";
import m2Exterior from "../assets/fleet/citation-m2/citation-m2-01.avif";
import m2Cabin from "../assets/fleet/citation-m2/citation-m2-02.avif";
import cj2Exterior from "../assets/fleet/citation-cj2/citation-cj2-01.avif";
import cj2Cabin from "../assets/fleet/citation-cj2/citation-cj2-02.avif";
import hawker400xpExterior from "../assets/fleet/hawker-400xp/hawker-400xp-exterior.png";
import hawker400xpCabin from "../assets/fleet/hawker-400xp/hawker-400xp-cabin.png";
import cj3Exterior from "../assets/fleet/citation-cj3/citation-cj3-01.avif";
import cj3Cabin from "../assets/fleet/citation-cj3/citation-cj3-02.avif";
import xlsExterior from "../assets/fleet/citation-xls/citation-xls-01.avif";
import xlsCabin from "../assets/fleet/citation-xls/citation-xls-02.avif";
import pc24Exterior from "../assets/fleet/pilatus-pc-24/PC-24_NorthCarolina.avif";
import pc24Cabin from "../assets/fleet/pilatus-pc-24/PC-24_Cabin_4.avif";
import phenomExterior from "../assets/fleet/embraer-phenom-300/embraer-phenom-300-01.avif";
import phenomCabin from "../assets/fleet/embraer-phenom-300/embraer-phenom-300-02.avif";
import legacyExterior from "../assets/fleet/embraer-legacy-600-650/embraer-legacy-600-650-01.avif";
import legacyCabin from "../assets/fleet/embraer-legacy-600-650/interior_07.avif";
import challengerExterior from "../assets/fleet/bombardier-challenger-605/bombardier-challenger-605-01.avif";
import challengerCabin from "../assets/fleet/bombardier-challenger-605/bombardier-challenger-605-02.avif";
import globalExterior from "../assets/fleet/bombardier-global-express/bombardier-global-express-01.avif";
import globalCabin from "../assets/fleet/bombardier-global-express/bombardier-global-express-02.avif";
import falconExterior from "../assets/fleet/dassault-falcon-7x/dassault-falcon-7x-01.avif";
import falconCabin from "../assets/fleet/dassault-falcon-7x/dassault-falcon-7x-02.avif";
import g550Exterior from "../assets/fleet/gulfstream-g550/gulfstream-g550-01.avif";
import g550Cabin from "../assets/fleet/gulfstream-g550/gulfstream-g550-02.avif";

export interface AircraftImage {
  src: ImageMetadata;
  alt: string;
}

export interface Aircraft {
  name: string;
  type: string;
  passengers: number;
  images: [AircraftImage, AircraftImage];
  performance?: {
    title: string;
    metrics: Array<{ label: string; value: string }>;
  };
}

const mainPerformance = (
  seats: number,
  maximumCruiseSpeed: string,
  maximumRange: string,
  serviceCeiling: string,
  takeOffDistance: string,
  landingDistance: string,
  maximumRateOfClimb: string,
) => ({
  title: "Main performance",
  metrics: [
    { label: "Seats", value: `Up to ${seats} passengers` },
    { label: "Maximum cruise speed", value: maximumCruiseSpeed },
    { label: "Maximum range", value: maximumRange },
    { label: "Service ceiling", value: serviceCeiling },
    { label: "Take-off distance", value: takeOffDistance },
    { label: "Landing distance", value: landingDistance },
    { label: "Maximum rate of climb", value: maximumRateOfClimb },
  ],
});

export const aircraft: Aircraft[] = [
  { name: "Beech King Air 200 GT", type: "Turboprop", passengers: 7, images: [
    { src: kingAirExterior, alt: "Beech King Air 200 GT exterior" },
    { src: kingAirCabin, alt: "Beech King Air 200 GT cabin" },
  ], performance: mainPerformance(7, "289 knots", "1,580 nautical miles", "35,000 ft", "5,018 ft", "2,845 ft", "2,450 ft/min") },
  { name: "Pilatus PC-12", type: "Turboprop", passengers: 8, images: [
    { src: pc12Exterior, alt: "Pilatus PC-12 exterior" },
    { src: pc12Cabin, alt: "Pilatus PC-12 cabin" },
  ], performance: mainPerformance(8, "290 knots", "1,803 nautical miles", "30,000 ft", "2,485 ft", "2,170 ft", "1,925 ft/min") },
  { name: "Citation Mustang", type: "Very light jet", passengers: 4, images: [
    { src: mustangExterior, alt: "Citation Mustang exterior" },
    { src: mustangCabin, alt: "Citation Mustang cabin" },
  ], performance: mainPerformance(4, "340 knots", "1,343 nautical miles", "41,000 ft", "3,110 ft", "2,392 ft", "3,010 ft/min") },
  { name: "Citation M2", type: "Very light jet", passengers: 5, images: [
    { src: m2Exterior, alt: "Citation M2 exterior" },
    { src: m2Cabin, alt: "Citation M2 cabin" },
  ], performance: mainPerformance(5, "404 knots", "1,550 nautical miles", "41,000 ft", "3,210 ft", "2,590 ft", "3,698 ft/min") },
  { name: "Citation CJ2", type: "Light jet", passengers: 6, images: [
    { src: cj2Exterior, alt: "Citation CJ2 exterior" },
    { src: cj2Cabin, alt: "Citation CJ2 cabin" },
  ], performance: mainPerformance(6, "413 knots", "1,613 nautical miles", "45,000 ft", "3,420 ft", "2,790 ft", "3,200 ft/min") },
  { name: "Hawker 400XP", type: "Light jet", passengers: 7, images: [
    { src: hawker400xpExterior, alt: "Hawker 400XP exterior" },
    { src: hawker400xpCabin, alt: "Hawker 400XP cabin" },
  ], performance: mainPerformance(7, "450 knots", "1,470 nautical miles", "45,000 ft", "4,820 ft", "4,520 ft", "4,000 ft/min") },
  { name: "Citation CJ3", type: "Light jet", passengers: 7, images: [
    { src: cj3Exterior, alt: "Citation CJ3 exterior" },
    { src: cj3Cabin, alt: "Citation CJ3 cabin" },
  ], performance: mainPerformance(7, "417 knots", "2,040 nautical miles", "45,000 ft", "3,490 ft", "2,770 ft", "3,854 ft/min") },
  { name: "Citation XLS", type: "Super light jet", passengers: 9, images: [
    { src: xlsExterior, alt: "Citation XLS exterior" },
    { src: xlsCabin, alt: "Citation XLS cabin" },
  ], performance: mainPerformance(9, "431 knots (798 km/h / 496 mph)", "1,796 nautical miles (3,326 km)", "45,000 ft", "3,560 ft (1,085 m)", "2,739 ft (835 m)", "3,500 ft/min") },
  { name: "Pilatus PC-24", type: "Super light jet", passengers: 8, images: [
    { src: pc24Exterior, alt: "Pilatus PC-24 exterior" },
    { src: pc24Cabin, alt: "Pilatus PC-24 cabin" },
  ], performance: mainPerformance(8, "440 knots", "2,040 nautical miles", "45,000 ft", "3,090 ft", "2,410 ft", "3,960 ft/min") },
  { name: "Phenom 300", type: "Super light jet", passengers: 9, images: [
    { src: phenomExterior, alt: "Phenom 300 exterior" },
    { src: phenomCabin, alt: "Phenom 300 cabin" },
  ], performance: mainPerformance(9, "464 knots", "2,010 nautical miles", "45,000 ft", "3,209 ft", "2,212 ft", "4,083 ft/min") },
  { name: "Embraer Legacy 600/650", type: "Heavy jet", passengers: 13, images: [
    { src: legacyExterior, alt: "Embraer Legacy 600/650 exterior" },
    { src: legacyCabin, alt: "Embraer Legacy 600/650 cabin" },
  ], performance: mainPerformance(13, "455 knots", "3,900 nautical miles", "41,000 ft", "5,741 ft", "3,021 ft", "3,300 ft/min") },
  { name: "Bombardier Challenger 605", type: "Heavy jet", passengers: 10, images: [
    { src: challengerExterior, alt: "Bombardier Challenger 605 exterior" },
    { src: challengerCabin, alt: "Bombardier Challenger 605 cabin" },
  ], performance: mainPerformance(10, "459 knots", "4,000 nautical miles", "41,000 ft", "5,840 ft", "2,739 ft", "4,240 ft/min") },
  { name: "Bombardier Global Express", type: "Ultra long range", passengers: 14, images: [
    { src: globalExterior, alt: "Bombardier Global Express exterior" },
    { src: globalCabin, alt: "Bombardier Global Express cabin" },
  ], performance: mainPerformance(14, "499 knots", "6,500 nautical miles", "51,000 ft", "5,820 ft", "2,670 ft", "3,800 ft/min") },
  { name: "Dassault Falcon 7X", type: "Ultra long range", passengers: 14, images: [
    { src: falconExterior, alt: "Dassault Falcon 7X exterior" },
    { src: falconCabin, alt: "Dassault Falcon 7X cabin" },
  ], performance: mainPerformance(14, "497 knots", "5,950 nautical miles", "51,000 ft", "5,710 ft", "2,070 ft", "3,500 ft/min") },
  { name: "Gulfstream G550", type: "Ultra long range", passengers: 16, images: [
    { src: g550Exterior, alt: "Gulfstream G550 exterior" },
    { src: g550Cabin, alt: "Gulfstream G550 cabin" },
  ], performance: mainPerformance(16, "488 knots", "6,750 nautical miles", "51,000 ft", "5,910 ft", "2,770 ft", "3,570 ft/min") },
];

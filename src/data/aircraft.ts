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
}

export const aircraft: Aircraft[] = [
  { name: "Beech King Air 200 GT", type: "Turboprop", passengers: 7, images: [
    { src: kingAirExterior, alt: "Beech King Air 200 GT exterior" },
    { src: kingAirCabin, alt: "Beech King Air 200 GT cabin" },
  ] },
  { name: "Pilatus PC-12", type: "Turboprop", passengers: 8, images: [
    { src: pc12Exterior, alt: "Pilatus PC-12 exterior" },
    { src: pc12Cabin, alt: "Pilatus PC-12 cabin" },
  ] },
  { name: "Citation Mustang", type: "Very light jet", passengers: 4, images: [
    { src: mustangExterior, alt: "Citation Mustang exterior" },
    { src: mustangCabin, alt: "Citation Mustang cabin" },
  ] },
  { name: "Citation M2", type: "Very light jet", passengers: 5, images: [
    { src: m2Exterior, alt: "Citation M2 exterior" },
    { src: m2Cabin, alt: "Citation M2 cabin" },
  ] },
  { name: "Citation CJ2", type: "Light jet", passengers: 6, images: [
    { src: cj2Exterior, alt: "Citation CJ2 exterior" },
    { src: cj2Cabin, alt: "Citation CJ2 cabin" },
  ] },
  { name: "Citation CJ3+", type: "Light jet", passengers: 7, images: [
    { src: cj3Exterior, alt: "Citation CJ3+ exterior" },
    { src: cj3Cabin, alt: "Citation CJ3+ cabin" },
  ] },
  { name: "Citation XLS+", type: "Midsize jet", passengers: 9, images: [
    { src: xlsExterior, alt: "Citation XLS+ exterior" },
    { src: xlsCabin, alt: "Citation XLS+ cabin" },
  ] },
  { name: "Pilatus PC-24", type: "Light jet", passengers: 8, images: [
    { src: pc24Exterior, alt: "Pilatus PC-24 exterior" },
    { src: pc24Cabin, alt: "Pilatus PC-24 cabin" },
  ] },
  { name: "Embraer Phenom 300", type: "Super light jet", passengers: 9, images: [
    { src: phenomExterior, alt: "Embraer Phenom 300 exterior" },
    { src: phenomCabin, alt: "Embraer Phenom 300 cabin" },
  ] },
  { name: "Embraer Legacy 600/650", type: "Heavy jet", passengers: 13, images: [
    { src: legacyExterior, alt: "Embraer Legacy 600/650 exterior" },
    { src: legacyCabin, alt: "Embraer Legacy 600/650 cabin" },
  ] },
  { name: "Bombardier Challenger 605", type: "Heavy jet", passengers: 10, images: [
    { src: challengerExterior, alt: "Bombardier Challenger 605 exterior" },
    { src: challengerCabin, alt: "Bombardier Challenger 605 cabin" },
  ] },
  { name: "Bombardier Global Express", type: "Ultra long range", passengers: 14, images: [
    { src: globalExterior, alt: "Bombardier Global Express exterior" },
    { src: globalCabin, alt: "Bombardier Global Express cabin" },
  ] },
  { name: "Dassault Falcon 7X", type: "Ultra long range", passengers: 14, images: [
    { src: falconExterior, alt: "Dassault Falcon 7X exterior" },
    { src: falconCabin, alt: "Dassault Falcon 7X cabin" },
  ] },
  { name: "Gulfstream G550", type: "Ultra long range", passengers: 16, images: [
    { src: g550Exterior, alt: "Gulfstream G550 exterior" },
    { src: g550Cabin, alt: "Gulfstream G550 cabin" },
  ] },
];

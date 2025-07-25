"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  ArrowLeft,
  MapPin,
  Search,
  Globe,
  Sparkles,
  TrendingUp,
  Sun,
  CloudRain,
  Snowflake,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  visibility: number
  sys: {
    country: string
  }
}

interface ForecastData {
  list: Array<{
    dt: number
    main: {
      temp: number
      humidity: number
    }
    weather: Array<{
      main: string
      description: string
    }>
    dt_txt: string
  }>
}

interface Country {
  name: string
  code: string
  flag: string
  continent: string
  cities: string[]
}

// Chart colors from second palette
const COLORS = ["#00809d", "#fcecdd", "#ff7601", "#f3a26d"]

// Comprehensive world countries and cities data
const WORLD_COUNTRIES: Country[] = [
  {
    name: "Afghanistan",
    code: "AF",
    flag: "🇦🇫",
    continent: "Asia",
    cities: [
      "Kabul",
      "Kandahar",
      "Herat",
      "Mazar-i-Sharif",
      "Kunduz",
      "Jalalabad",
      "Lashkar Gah",
      "Taloqan",
      "Khost",
      "Ghazni",
    ],
  },
  {
    name: "Albania",
    code: "AL",
    flag: "🇦🇱",
    continent: "Europe",
    cities: ["Tirana", "Durrës", "Vlorë", "Elbasan", "Shkodër", "Fier", "Korçë", "Berat", "Lushnjë", "Kavajë"],
  },
  {
    name: "Algeria",
    code: "DZ",
    flag: "🇩🇿",
    continent: "Africa",
    cities: [
      "Algiers",
      "Oran",
      "Constantine",
      "Annaba",
      "Blida",
      "Batna",
      "Djelfa",
      "Sétif",
      "Sidi Bel Abbès",
      "Biskra",
    ],
  },
  {
    name: "Argentina",
    code: "AR",
    flag: "🇦🇷",
    continent: "South America",
    cities: [
      "Buenos Aires",
      "Córdoba",
      "Rosario",
      "Mendoza",
      "Tucumán",
      "La Plata",
      "Mar del Plata",
      "Salta",
      "Santa Fe",
      "San Juan",
    ],
  },
  {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    continent: "Oceania",
    cities: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
      "Newcastle",
      "Canberra",
      "Sunshine Coast",
      "Wollongong",
      "Hobart",
      "Geelong",
      "Townsville",
      "Cairns",
      "Darwin",
      "Toowoomba",
      "Ballarat",
      "Bendigo",
      "Albury",
      "Launceston",
      "Mackay",
      "Rockhampton",
      "Bunbury",
      "Bundaberg",
      "Coffs Harbour",
      "Wagga Wagga",
      "Hervey Bay",
      "Mildura",
      "Shepparton",
      "Port Macquarie",
    ],
  },
  {
    name: "Austria",
    code: "AT",
    flag: "🇦🇹",
    continent: "Europe",
    cities: [
      "Vienna",
      "Graz",
      "Linz",
      "Salzburg",
      "Innsbruck",
      "Klagenfurt",
      "Villach",
      "Wels",
      "Sankt Pölten",
      "Dornbirn",
    ],
  },
  {
    name: "Bangladesh",
    code: "BD",
    flag: "🇧🇩",
    continent: "Asia",
    cities: [
      "Dhaka",
      "Chittagong",
      "Khulna",
      "Rajshahi",
      "Sylhet",
      "Barisal",
      "Rangpur",
      "Comilla",
      "Narayanganj",
      "Gazipur",
    ],
  },
  {
    name: "Belgium",
    code: "BE",
    flag: "🇧🇪",
    continent: "Europe",
    cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur", "Leuven", "Mons", "Aalst"],
  },
  {
    name: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    continent: "South America",
    cities: [
      "São Paulo",
      "Rio de Janeiro",
      "Brasília",
      "Salvador",
      "Fortaleza",
      "Belo Horizonte",
      "Manaus",
      "Curitiba",
      "Recife",
      "Goiânia",
      "Belém",
      "Porto Alegre",
      "Guarulhos",
      "Campinas",
      "São Luís",
      "São Gonçalo",
      "Maceió",
      "Duque de Caxias",
      "Nova Iguaçu",
      "Teresina",
    ],
  },
  {
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    continent: "North America",
    cities: [
      "Toronto",
      "Montreal",
      "Vancouver",
      "Calgary",
      "Edmonton",
      "Ottawa",
      "Winnipeg",
      "Quebec City",
      "Hamilton",
      "Kitchener",
      "London",
      "Victoria",
      "Halifax",
      "Oshawa",
      "Windsor",
      "Saskatoon",
      "St. Catharines",
      "Regina",
      "Sherbrooke",
      "Barrie",
      "Kelowna",
      "Abbotsford",
      "Kingston",
      "Sudbury",
      "Saguenay",
      "Trois-Rivières",
      "Guelph",
      "Cambridge",
      "Whitby",
      "Coquitlam",
    ],
  },
  {
    name: "Chile",
    code: "CL",
    flag: "🇨🇱",
    continent: "South America",
    cities: [
      "Santiago",
      "Valparaíso",
      "Concepción",
      "La Serena",
      "Antofagasta",
      "Temuco",
      "Rancagua",
      "Talca",
      "Arica",
      "Chillán",
    ],
  },
  {
    name: "China",
    code: "CN",
    flag: "🇨🇳",
    continent: "Asia",
    cities: [
      "Beijing",
      "Shanghai",
      "Guangzhou",
      "Shenzhen",
      "Tianjin",
      "Wuhan",
      "Dongguan",
      "Chengdu",
      "Nanjing",
      "Chongqing",
      "Xi'an",
      "Shenyang",
      "Hangzhou",
      "Harbin",
      "Suzhou",
      "Qingdao",
      "Dalian",
      "Zhengzhou",
      "Shantou",
      "Jinan",
      "Changchun",
      "Kunming",
      "Changsha",
      "Taiyuan",
      "Xiamen",
      "Hefei",
      "Shijiazhuang",
      "Ürümqi",
      "Zibo",
      "Yantai",
    ],
  },
  {
    name: "Colombia",
    code: "CO",
    flag: "🇨🇴",
    continent: "South America",
    cities: [
      "Bogotá",
      "Medellín",
      "Cali",
      "Barranquilla",
      "Cartagena",
      "Cúcuta",
      "Bucaramanga",
      "Pereira",
      "Santa Marta",
      "Ibagué",
    ],
  },
  {
    name: "Czech Republic",
    code: "CZ",
    flag: "🇨🇿",
    continent: "Europe",
    cities: [
      "Prague",
      "Brno",
      "Ostrava",
      "Plzen",
      "Liberec",
      "Olomouc",
      "Ústí nad Labem",
      "České Budějovice",
      "Hradec Králové",
      "Pardubice",
    ],
  },
  {
    name: "Denmark",
    code: "DK",
    flag: "🇩🇰",
    continent: "Europe",
    cities: [
      "Copenhagen",
      "Aarhus",
      "Odense",
      "Aalborg",
      "Esbjerg",
      "Randers",
      "Kolding",
      "Horsens",
      "Vejle",
      "Roskilde",
    ],
  },
  {
    name: "Egypt",
    code: "EG",
    flag: "🇪🇬",
    continent: "Africa",
    cities: [
      "Cairo",
      "Alexandria",
      "Giza",
      "Shubra El Kheima",
      "Port Said",
      "Suez",
      "Luxor",
      "Mansoura",
      "El Mahalla El Kubra",
      "Tanta",
    ],
  },
  {
    name: "Finland",
    code: "FI",
    flag: "🇫🇮",
    continent: "Europe",
    cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Pori"],
  },
  {
    name: "France",
    code: "FR",
    flag: "🇫🇷",
    continent: "Europe",
    cities: [
      "Paris",
      "Marseille",
      "Lyon",
      "Toulouse",
      "Nice",
      "Nantes",
      "Strasbourg",
      "Montpellier",
      "Bordeaux",
      "Lille",
      "Rennes",
      "Reims",
      "Le Havre",
      "Saint-Étienne",
      "Toulon",
      "Angers",
      "Grenoble",
      "Dijon",
      "Nîmes",
      "Aix-en-Provence",
      "Saint-Quentin-en-Yvelines",
      "Brest",
      "Le Mans",
      "Amiens",
      "Tours",
      "Limoges",
      "Clermont-Ferrand",
      "Villeurbanne",
      "Besançon",
      "Orléans",
    ],
  },
  {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    continent: "Europe",
    cities: [
      "Berlin",
      "Hamburg",
      "Munich",
      "Cologne",
      "Frankfurt",
      "Stuttgart",
      "Düsseldorf",
      "Dortmund",
      "Essen",
      "Leipzig",
      "Bremen",
      "Dresden",
      "Hanover",
      "Nuremberg",
      "Duisburg",
      "Bochum",
      "Wuppertal",
      "Bielefeld",
      "Bonn",
      "Münster",
      "Karlsruhe",
      "Mannheim",
      "Augsburg",
      "Wiesbaden",
      "Gelsenkirchen",
      "Mönchengladbach",
      "Braunschweig",
      "Chemnitz",
      "Kiel",
      "Aachen",
    ],
  },
  {
    name: "Greece",
    code: "GR",
    flag: "🇬🇷",
    continent: "Europe",
    cities: [
      "Athens",
      "Thessaloniki",
      "Patras",
      "Piraeus",
      "Larissa",
      "Heraklion",
      "Peristeri",
      "Kallithea",
      "Acharnes",
      "Kalamaria",
    ],
  },
  {
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    continent: "Asia",
    cities: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Ahmedabad",
      "Chennai",
      "Kolkata",
      "Surat",
      "Pune",
      "Jaipur",
      "Lucknow",
      "Kanpur",
      "Nagpur",
      "Indore",
      "Thane",
      "Bhopal",
      "Visakhapatnam",
      "Pimpri-Chinchwad",
      "Patna",
      "Vadodara",
      "Ghaziabad",
      "Ludhiana",
      "Agra",
      "Nashik",
      "Faridabad",
      "Meerut",
      "Rajkot",
      "Kalyan-Dombivli",
      "Vasai-Virar",
      "Varanasi",
      "Srinagar",
      "Dhanbad",
      "Jodhpur",
      "Amritsar",
      "Raipur",
      "Allahabad",
      "Coimbatore",
      "Jabalpur",
      "Gwalior",
      "Vijayawada",
    ],
  },
  {
    name: "Indonesia",
    code: "ID",
    flag: "🇮🇩",
    continent: "Asia",
    cities: [
      "Jakarta",
      "Surabaya",
      "Bandung",
      "Bekasi",
      "Medan",
      "Tangerang",
      "Depok",
      "Semarang",
      "Palembang",
      "Makassar",
      "South Tangerang",
      "Batam",
      "Bogor",
      "Pekanbaru",
      "Bandar Lampung",
      "Padang",
      "Malang",
      "Denpasar",
      "Samarinda",
      "Tasikmalaya",
    ],
  },
  {
    name: "Iran",
    code: "IR",
    flag: "🇮🇷",
    continent: "Asia",
    cities: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz", "Tabriz", "Qom", "Ahvaz", "Kermanshah", "Urmia"],
  },
  {
    name: "Iraq",
    code: "IQ",
    flag: "🇮🇶",
    continent: "Asia",
    cities: ["Baghdad", "Basra", "Mosul", "Erbil", "Najaf", "Karbala", "Nasiriyah", "Amarah", "Duhok", "Ramadi"],
  },
  {
    name: "Ireland",
    code: "IE",
    flag: "🇮🇪",
    continent: "Europe",
    cities: ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk", "Swords", "Bray", "Navan"],
  },
  {
    name: "Israel",
    code: "IL",
    flag: "🇮🇱",
    continent: "Asia",
    cities: [
      "Jerusalem",
      "Tel Aviv",
      "Haifa",
      "Rishon LeZion",
      "Petah Tikva",
      "Ashdod",
      "Netanya",
      "Beer Sheva",
      "Holon",
      "Bnei Brak",
    ],
  },
  {
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    continent: "Europe",
    cities: [
      "Rome",
      "Milan",
      "Naples",
      "Turin",
      "Palermo",
      "Genoa",
      "Bologna",
      "Florence",
      "Bari",
      "Catania",
      "Venice",
      "Verona",
      "Messina",
      "Padua",
      "Trieste",
      "Taranto",
      "Brescia",
      "Prato",
      "Parma",
      "Modena",
      "Reggio Calabria",
      "Reggio Emilia",
      "Perugia",
      "Livorno",
      "Ravenna",
      "Cagliari",
      "Foggia",
      "Rimini",
      "Salerno",
      "Ferrara",
    ],
  },
  {
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    continent: "Asia",
    cities: [
      "Tokyo",
      "Yokohama",
      "Osaka",
      "Nagoya",
      "Sapporo",
      "Fukuoka",
      "Kobe",
      "Kawasaki",
      "Kyoto",
      "Saitama",
      "Hiroshima",
      "Sendai",
      "Kitakyushu",
      "Chiba",
      "Sakai",
      "Niigata",
      "Hamamatsu",
      "Okayama",
      "Sagamihara",
      "Shizuoka",
      "Kumamoto",
      "Kagoshima",
      "Matsuyama",
      "Kanazawa",
      "Utsunomiya",
      "Matsudo",
      "Kawaguchi",
      "Takatsuki",
      "Suita",
      "Toyama",
    ],
  },
  {
    name: "Jordan",
    code: "JO",
    flag: "🇯🇴",
    continent: "Asia",
    cities: ["Amman", "Zarqa", "Irbid", "Russeifa", "Wadi as-Sir", "Aqaba", "Madaba", "As-Salt", "Mafraq", "Jerash"],
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    flag: "🇰🇿",
    continent: "Asia",
    cities: [
      "Almaty",
      "Nur-Sultan",
      "Shymkent",
      "Aktobe",
      "Taraz",
      "Pavlodar",
      "Ust-Kamenogorsk",
      "Karaganda",
      "Atyrau",
      "Kostanay",
    ],
  },
  {
    name: "Kenya",
    code: "KE",
    flag: "🇰🇪",
    continent: "Africa",
    cities: ["Nairobi", "Mombasa", "Nakuru", "Eldoret", "Kisumu", "Thika", "Malindi", "Kitale", "Garissa", "Kakamega"],
  },
  {
    name: "South Korea",
    code: "KR",
    flag: "🇰🇷",
    continent: "Asia",
    cities: [
      "Seoul",
      "Busan",
      "Incheon",
      "Daegu",
      "Daejeon",
      "Gwangju",
      "Suwon",
      "Ulsan",
      "Changwon",
      "Goyang",
      "Yongin",
      "Seongnam",
      "Bucheon",
      "Cheongju",
      "Ansan",
      "Jeonju",
      "Anyang",
      "Cheonan",
      "Pohang",
      "Uijeongbu",
    ],
  },
  {
    name: "Kuwait",
    code: "KW",
    flag: "🇰🇼",
    continent: "Asia",
    cities: [
      "Kuwait City",
      "Al Ahmadi",
      "Hawalli",
      "As Salimiyah",
      "Sabah as Salim",
      "Al Farwaniyah",
      "Al Fahahil",
      "Ar Riqqah",
      "Ar Rabiyah",
      "Ash Shamiyah",
    ],
  },
  {
    name: "Lebanon",
    code: "LB",
    flag: "🇱🇧",
    continent: "Asia",
    cities: ["Beirut", "Tripoli", "Sidon", "Tyre", "Nabatieh", "Jounieh", "Zahle", "Baalbek", "Byblos", "Aley"],
  },
  {
    name: "Malaysia",
    code: "MY",
    flag: "🇲🇾",
    continent: "Asia",
    cities: [
      "Kuala Lumpur",
      "George Town",
      "Ipoh",
      "Shah Alam",
      "Petaling Jaya",
      "Johor Bahru",
      "Seremban",
      "Kuala Terengganu",
      "Kota Kinabalu",
      "Klang",
      "Kajang",
      "Alor Setar",
      "Malacca City",
      "Tawau",
      "Ampang Jaya",
      "Miri",
      "Sandakan",
      "Kuching",
      "Sepang",
      "Sungai Petani",
    ],
  },
  {
    name: "Mexico",
    code: "MX",
    flag: "🇲🇽",
    continent: "North America",
    cities: [
      "Mexico City",
      "Guadalajara",
      "Monterrey",
      "Puebla",
      "Tijuana",
      "León",
      "Juárez",
      "Torreón",
      "Querétaro",
      "San Luis Potosí",
      "Mérida",
      "Mexicali",
      "Aguascalientes",
      "Acapulco",
      "Cuernavaca",
      "Saltillo",
      "Villahermosa",
      "Culiacán",
      "Oaxaca",
      "Tampico",
    ],
  },
  {
    name: "Morocco",
    code: "MA",
    flag: "🇲🇦",
    continent: "Africa",
    cities: ["Casablanca", "Rabat", "Fez", "Marrakech", "Agadir", "Tangier", "Meknes", "Oujda", "Kenitra", "Tetouan"],
  },
  {
    name: "Netherlands",
    code: "NL",
    flag: "🇳🇱",
    continent: "Europe",
    cities: [
      "Amsterdam",
      "Rotterdam",
      "The Hague",
      "Utrecht",
      "Eindhoven",
      "Tilburg",
      "Groningen",
      "Almere",
      "Breda",
      "Nijmegen",
      "Enschede",
      "Haarlem",
      "Arnhem",
      "Zaanstad",
      "Amersfoort",
      "Apeldoorn",
      "s-Hertogenbosch",
      "Hoofddorp",
      "Maastricht",
      "Leiden",
    ],
  },
  {
    name: "New Zealand",
    code: "NZ",
    flag: "🇳🇿",
    continent: "Oceania",
    cities: [
      "Auckland",
      "Wellington",
      "Christchurch",
      "Hamilton",
      "Tauranga",
      "Napier-Hastings",
      "Dunedin",
      "Palmerston North",
      "Nelson",
      "Rotorua",
      "New Plymouth",
      "Whangarei",
      "Invercargill",
      "Whanganui",
      "Gisborne",
      "Timaru",
      "Oamaru",
      "Blenheim",
      "Pukekohe",
      "Masterton",
    ],
  },
  {
    name: "Nigeria",
    code: "NG",
    flag: "🇳🇬",
    continent: "Africa",
    cities: [
      "Lagos",
      "Kano",
      "Ibadan",
      "Abuja",
      "Port Harcourt",
      "Benin City",
      "Maiduguri",
      "Zaria",
      "Aba",
      "Jos",
      "Ilorin",
      "Oyo",
      "Enugu",
      "Abeokuta",
      "Kaduna",
      "Ogbomoso",
      "Sokoto",
      "Osogbo",
      "Katsina",
      "Bauchi",
    ],
  },
  {
    name: "Norway",
    code: "NO",
    flag: "🇳🇴",
    continent: "Europe",
    cities: [
      "Oslo",
      "Bergen",
      "Stavanger",
      "Trondheim",
      "Drammen",
      "Fredrikstad",
      "Kristiansand",
      "Sandnes",
      "Tromsø",
      "Sarpsborg",
    ],
  },
  {
    name: "Pakistan",
    code: "PK",
    flag: "🇵🇰",
    continent: "Asia",
    cities: [
      "Karachi",
      "Lahore",
      "Faisalabad",
      "Rawalpindi",
      "Gujranwala",
      "Peshawar",
      "Multan",
      "Hyderabad",
      "Islamabad",
      "Quetta",
      "Bahawalpur",
      "Sargodha",
      "Sialkot",
      "Sukkur",
      "Larkana",
      "Sheikhupura",
      "Mirpur Khas",
      "Rahim Yar Khan",
      "Jhang",
      "Gujrat",
    ],
  },
  {
    name: "Peru",
    code: "PE",
    flag: "🇵🇪",
    continent: "South America",
    cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Iquitos", "Cusco", "Chimbote", "Huancayo", "Tacna"],
  },
  {
    name: "Philippines",
    code: "PH",
    flag: "🇵🇭",
    continent: "Asia",
    cities: [
      "Manila",
      "Quezon City",
      "Caloocan",
      "Davao",
      "Cebu City",
      "Zamboanga",
      "Antipolo",
      "Pasig",
      "Taguig",
      "Valenzuela",
      "Dasmariñas",
      "Calamba",
      "Parañaque",
      "Las Piñas",
      "Makati",
      "Muntinlupa",
      "Baguio",
      "San Jose del Monte",
      "Bacoor",
      "Marikina",
    ],
  },
  {
    name: "Poland",
    code: "PL",
    flag: "🇵🇱",
    continent: "Europe",
    cities: [
      "Warsaw",
      "Kraków",
      "Łódź",
      "Wrocław",
      "Poznań",
      "Gdańsk",
      "Szczecin",
      "Bydgoszcz",
      "Lublin",
      "Katowice",
      "Białystok",
      "Gdynia",
      "Częstochowa",
      "Radom",
      "Sosnowiec",
      "Toruń",
      "Kielce",
      "Gliwice",
      "Zabrze",
      "Bytom",
    ],
  },
  {
    name: "Portugal",
    code: "PT",
    flag: "🇵🇹",
    continent: "Europe",
    cities: [
      "Lisbon",
      "Porto",
      "Vila Nova de Gaia",
      "Amadora",
      "Braga",
      "Funchal",
      "Coimbra",
      "Setúbal",
      "Almada",
      "Agualva-Cacém",
    ],
  },
  {
    name: "Qatar",
    code: "QA",
    flag: "🇶🇦",
    continent: "Asia",
    cities: [
      "Doha",
      "Al Rayyan",
      "Umm Salal",
      "Al Wakrah",
      "Al Khor",
      "Ash Shamal",
      "Dukhan",
      "Mesaieed",
      "Al Wukair",
      "Al Ghuwariyah",
    ],
  },
  {
    name: "Romania",
    code: "RO",
    flag: "🇷🇴",
    continent: "Europe",
    cities: [
      "Bucharest",
      "Cluj-Napoca",
      "Timișoara",
      "Iași",
      "Constanța",
      "Craiova",
      "Brașov",
      "Galați",
      "Ploiești",
      "Oradea",
    ],
  },
  {
    name: "Russia",
    code: "RU",
    flag: "🇷🇺",
    continent: "Europe/Asia",
    cities: [
      "Moscow",
      "Saint Petersburg",
      "Novosibirsk",
      "Yekaterinburg",
      "Nizhny Novgorod",
      "Kazan",
      "Chelyabinsk",
      "Omsk",
      "Samara",
      "Rostov-on-Don",
      "Ufa",
      "Krasnoyarsk",
      "Perm",
      "Voronezh",
      "Volgograd",
      "Krasnodar",
      "Saratov",
      "Tyumen",
      "Tolyatti",
      "Izhevsk",
    ],
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    flag: "🇸🇦",
    continent: "Asia",
    cities: [
      "Riyadh",
      "Jeddah",
      "Mecca",
      "Medina",
      "Dammam",
      "Khobar",
      "Tabuk",
      "Buraidah",
      "Khamis Mushait",
      "Hail",
      "Hafar Al-Batin",
      "Jubail",
      "Dhahran",
      "Taif",
      "Najran",
      "Yanbu",
      "Al Qatif",
      "Abha",
      "Sakaka",
      "Jizan",
    ],
  },
  {
    name: "Singapore",
    code: "SG",
    flag: "🇸🇬",
    continent: "Asia",
    cities: [
      "Singapore",
      "Jurong West",
      "Woodlands",
      "Tampines",
      "Sengkang",
      "Hougang",
      "Yishun",
      "Bedok",
      "Ang Mo Kio",
      "Toa Payoh",
    ],
  },
  {
    name: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    continent: "Africa",
    cities: [
      "Johannesburg",
      "Cape Town",
      "Durban",
      "Pretoria",
      "Port Elizabeth",
      "Pietermaritzburg",
      "Benoni",
      "Tembisa",
      "East London",
      "Vereeniging",
      "Bloemfontein",
      "Boksburg",
      "Welkom",
      "Newcastle",
      "Krugersdorp",
      "Diepsloot",
      "Botshabelo",
      "Brakpan",
      "Witbank",
      "Richards Bay",
    ],
  },
  {
    name: "Spain",
    code: "ES",
    flag: "🇪🇸",
    continent: "Europe",
    cities: [
      "Madrid",
      "Barcelona",
      "Valencia",
      "Seville",
      "Zaragoza",
      "Málaga",
      "Murcia",
      "Palma",
      "Las Palmas",
      "Bilbao",
      "Alicante",
      "Córdoba",
      "Valladolid",
      "Vigo",
      "Gijón",
      "L'Hospitalet de Llobregat",
      "A Coruña",
      "Vitoria-Gasteiz",
      "Granada",
      "Elche",
      "Oviedo",
      "Badalona",
      "Cartagena",
      "Terrassa",
      "Jerez de la Frontera",
      "Sabadell",
      "Santa Cruz de Tenerife",
      "Pamplona",
      "Almería",
      "Fuenlabrada",
    ],
  },
  {
    name: "Sri Lanka",
    code: "LK",
    flag: "🇱🇰",
    continent: "Asia",
    cities: [
      "Colombo",
      "Dehiwala-Mount Lavinia",
      "Moratuwa",
      "Sri Jayawardenepura Kotte",
      "Negombo",
      "Kandy",
      "Kalmunai",
      "Galle",
      "Trincomalee",
      "Batticaloa",
    ],
  },
  {
    name: "Sweden",
    code: "SE",
    flag: "🇸🇪",
    continent: "Europe",
    cities: [
      "Stockholm",
      "Gothenburg",
      "Malmö",
      "Uppsala",
      "Västerås",
      "Örebro",
      "Linköping",
      "Helsingborg",
      "Jönköping",
      "Norrköping",
    ],
  },
  {
    name: "Switzerland",
    code: "CH",
    flag: "🇨🇭",
    continent: "Europe",
    cities: [
      "Zurich",
      "Geneva",
      "Basel",
      "Lausanne",
      "Bern",
      "Winterthur",
      "Lucerne",
      "St. Gallen",
      "Lugano",
      "Biel/Bienne",
    ],
  },
  {
    name: "Syria",
    code: "SY",
    flag: "🇸🇾",
    continent: "Asia",
    cities: [
      "Damascus",
      "Aleppo",
      "Homs",
      "Latakia",
      "Hama",
      "Deir ez-Zor",
      "Raqqa",
      "Daraa",
      "Al-Hasakah",
      "Qamishli",
    ],
  },
  {
    name: "Taiwan",
    code: "TW",
    flag: "🇹🇼",
    continent: "Asia",
    cities: [
      "Taipei",
      "Kaohsiung",
      "Taichung",
      "Tainan",
      "Taoyuan",
      "Hsinchu",
      "Keelung",
      "Chiayi",
      "Changhua",
      "Yunlin",
    ],
  },
  {
    name: "Thailand",
    code: "TH",
    flag: "🇹🇭",
    continent: "Asia",
    cities: [
      "Bangkok",
      "Nonthaburi",
      "Pak Kret",
      "Hat Yai",
      "Chiang Mai",
      "Phuket",
      "Pattaya",
      "Udon Thani",
      "Surat Thani",
      "Khon Kaen",
      "Nakhon Ratchasima",
      "Chiang Rai",
      "Lampang",
      "Songkhla",
      "Rayong",
      "Phitsanulok",
      "Samut Prakan",
      "Nakhon Si Thammarat",
      "Ubon Ratchathani",
      "Sakon Nakhon",
    ],
  },
  {
    name: "Turkey",
    code: "TR",
    flag: "🇹🇷",
    continent: "Europe/Asia",
    cities: [
      "Istanbul",
      "Ankara",
      "Izmir",
      "Bursa",
      "Adana",
      "Gaziantep",
      "Konya",
      "Antalya",
      "Kayseri",
      "Mersin",
      "Eskişehir",
      "Diyarbakır",
      "Samsun",
      "Denizli",
      "Şanlıurfa",
      "Adapazarı",
      "Malatya",
      "Kahramanmaraş",
      "Erzurum",
      "Van",
    ],
  },
  {
    name: "Ukraine",
    code: "UA",
    flag: "🇺🇦",
    continent: "Europe",
    cities: [
      "Kyiv",
      "Kharkiv",
      "Odesa",
      "Dnipro",
      "Donetsk",
      "Zaporizhzhia",
      "Lviv",
      "Kryvyi Rih",
      "Mykolaiv",
      "Mariupol",
      "Luhansk",
      "Vinnytsia",
      "Makiivka",
      "Sevastopol",
      "Simferopol",
      "Kherson",
      "Poltava",
      "Chernihiv",
      "Cherkasy",
      "Sumy",
    ],
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    continent: "Asia",
    cities: [
      "Dubai",
      "Abu Dhabi",
      "Sharjah",
      "Al Ain",
      "Ajman",
      "Ras Al Khaimah",
      "Fujairah",
      "Umm Al Quwain",
      "Khor Fakkan",
      "Dibba Al-Fujairah",
    ],
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    continent: "Europe",
    cities: [
      "London",
      "Birmingham",
      "Manchester",
      "Glasgow",
      "Liverpool",
      "Leeds",
      "Sheffield",
      "Edinburgh",
      "Bristol",
      "Cardiff",
      "Leicester",
      "Coventry",
      "Bradford",
      "Belfast",
      "Nottingham",
      "Kingston upon Hull",
      "Newcastle upon Tyne",
      "Stoke-on-Trent",
      "Southampton",
      "Derby",
      "Portsmouth",
      "Brighton",
      "Plymouth",
      "Northampton",
      "Reading",
      "Luton",
      "Wolverhampton",
      "Bolton",
      "Bournemouth",
      "Norwich",
    ],
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    continent: "North America",
    cities: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
      "Austin",
      "Jacksonville",
      "Fort Worth",
      "Columbus",
      "Charlotte",
      "San Francisco",
      "Indianapolis",
      "Seattle",
      "Denver",
      "Washington DC",
      "Boston",
      "El Paso",
      "Nashville",
      "Detroit",
      "Oklahoma City",
      "Portland",
      "Las Vegas",
      "Memphis",
      "Louisville",
      "Baltimore",
      "Milwaukee",
      "Albuquerque",
      "Tucson",
      "Fresno",
      "Sacramento",
      "Kansas City",
      "Mesa",
      "Atlanta",
      "Omaha",
      "Colorado Springs",
      "Raleigh",
      "Miami",
      "Oakland",
      "Minneapolis",
      "Tulsa",
      "Cleveland",
      "Wichita",
      "Arlington",
      "New Orleans",
      "Bakersfield",
      "Tampa",
    ],
  },
  {
    name: "Uruguay",
    code: "UY",
    flag: "🇺🇾",
    continent: "South America",
    cities: [
      "Montevideo",
      "Salto",
      "Paysandú",
      "Las Piedras",
      "Rivera",
      "Maldonado",
      "Tacuarembó",
      "Melo",
      "Mercedes",
      "Artigas",
    ],
  },
  {
    name: "Venezuela",
    code: "VE",
    flag: "🇻🇪",
    continent: "South America",
    cities: [
      "Caracas",
      "Maracaibo",
      "Valencia",
      "Barquisimeto",
      "Maracay",
      "Ciudad Guayana",
      "San Cristóbal",
      "Maturín",
      "Ciudad Bolívar",
      "Cumana",
    ],
  },
  {
    name: "Vietnam",
    code: "VN",
    flag: "🇻🇳",
    continent: "Asia",
    cities: [
      "Ho Chi Minh City",
      "Hanoi",
      "Haiphong",
      "Da Nang",
      "Bien Hoa",
      "Hue",
      "Nha Trang",
      "Can Tho",
      "Rach Gia",
      "Qui Nhon",
      "Vung Tau",
      "Nam Dinh",
      "Phan Thiet",
      "Long Xuyen",
      "Ha Long",
      "Thai Nguyen",
      "Thanh Hoa",
      "Buon Ma Thuot",
      "My Tho",
      "Vinh",
    ],
  },
  {
    name: "Yemen",
    code: "YE",
    flag: "🇾🇪",
    continent: "Asia",
    cities: ["Sana'a", "Aden", "Taiz", "Al Hudaydah", "Mukalla", "Ibb", "Dhamar", "Amran", "Saada", "Sayyan"],
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    flag: "🇿🇼",
    continent: "Africa",
    cities: [
      "Harare",
      "Bulawayo",
      "Chitungwiza",
      "Mutare",
      "Epworth",
      "Gweru",
      "Kwekwe",
      "Kadoma",
      "Masvingo",
      "Chinhoyi",
    ],
  },
]

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [countrySearch, setCountrySearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showCountries, setShowCountries] = useState(false)
  const [showCities, setShowCities] = useState(false)

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true)
    setError("")

    try {
      console.log("Fetching weather data for:", cityName)

      // Fetch current weather
      const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`)
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json()
        throw new Error(errorData.error || "Weather data not found")
      }
      const weather = await weatherResponse.json()
      setWeatherData(weather)

      // Fetch forecast
      const forecastResponse = await fetch(`/api/weather/forecast?city=${encodeURIComponent(cityName)}`)
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json()
        throw new Error(errorData.error || "Forecast data not found")
      }
      const forecast = await forecastResponse.json()
      setForecastData(forecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setSelectedCity("")
    setWeatherData(null)
    setForecastData(null)
    setError("")
    setShowCountries(false)
    setShowCities(true)
    setCountrySearch("")
    setCitySearch("")
  }

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName)
    setShowCities(false)
    fetchWeatherData(cityName)
  }

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    return WORLD_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        country.continent.toLowerCase().includes(countrySearch.toLowerCase()),
    )
  }, [countrySearch])

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!selectedCountry) return []
    return selectedCountry.cities.filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
  }, [selectedCountry, citySearch])

  // Group countries by continent
  const countriesByContinent = useMemo(() => {
    const grouped = filteredCountries.reduce(
      (acc, country) => {
        if (!acc[country.continent]) {
          acc[country.continent] = []
        }
        acc[country.continent].push(country)
        return acc
      },
      {} as Record<string, Country[]>,
    )

    // Sort continents and countries within each continent
    const sortedGrouped: Record<string, Country[]> = {}
    Object.keys(grouped)
      .sort()
      .forEach((continent) => {
        sortedGrouped[continent] = grouped[continent].sort((a, b) => a.name.localeCompare(b.name))
      })

    return sortedGrouped
  }, [filteredCountries])

  // Process forecast data for charts
  const temperatureData =
    forecastData?.list.slice(0, 8).map((item, index) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
    })) || []

  const weatherConditions =
    forecastData?.list.slice(0, 8).reduce(
      (acc, item) => {
        const condition = item.weather[0].main
        acc[condition] = (acc[condition] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const pieData = Object.entries(weatherConditions).map(([name, value]) => ({ name, value }))

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "snow":
        return <Snowflake className="h-6 w-6 text-blue-300" />
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbee] via-[#fdfbee] to-[#57b4ba]/20">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm" className="hover:bg-[#57b4ba]/10">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-[#57b4ba] to-[#015551] rounded-xl">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-[#015551] to-[#57b4ba] bg-clip-text text-transparent">
                    Global Weather Analytics
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Globe className="h-3 w-3" />
                    <span>Worldwide Coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#57b4ba]/20 to-[#015551]/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-[#015551]" />
            <span className="text-sm font-medium text-[#015551]">Real-time Global Weather Data</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#015551] via-[#57b4ba] to-[#fe4f2d] bg-clip-text text-transparent mb-4">
            Explore Weather Worldwide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover real-time weather conditions and forecasts for cities across the globe with beautiful, interactive
            visualizations
          </p>
        </div>

        {/* Location Selection */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Country Selection */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#57b4ba]/10 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Globe className="h-6 w-6 mr-3 text-[#57b4ba]" />
                Select Country
                <Badge variant="secondary" className="ml-auto bg-[#57b4ba]/20 text-[#015551]">
                  {WORLD_COUNTRIES.length} Countries
                </Badge>
              </CardTitle>
              <CardDescription>Choose from countries worldwide, organized by continent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search countries or continents..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  onFocus={() => setShowCountries(true)}
                  className="pl-10 border-2 border-[#57b4ba]/30 focus:border-[#57b4ba] rounded-xl"
                />
              </div>

              {selectedCountry ? (
                <div className="p-4 bg-gradient-to-r from-[#57b4ba] to-[#015551] rounded-xl text-white">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedCountry.name}</h3>
                      <p className="text-[#57b4ba]/80 text-sm">{selectedCountry.continent}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-0">
                      {selectedCountry.cities.length} Cities
                    </Badge>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowCountries(!showCountries)}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-[#57b4ba]/50 hover:border-[#57b4ba] hover:bg-[#57b4ba]/10 rounded-xl"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Choose a Country
                </Button>
              )}

              {showCountries && (
                <div className="max-h-96 overflow-y-auto space-y-4 border-2 border-[#57b4ba]/30 rounded-xl p-4 bg-white/50">
                  {Object.entries(countriesByContinent).map(([continent, countries]) => (
                    <div key={continent}>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                        <div className="w-2 h-2 bg-[#57b4ba] rounded-full mr-2"></div>
                        {continent}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => handleCountrySelect(country)}
                            className="flex items-center space-x-3 p-3 hover:bg-[#57b4ba]/10 rounded-lg transition-all duration-200 text-left group"
                          >
                            <span className="text-xl group-hover:scale-110 transition-transform">{country.flag}</span>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 group-hover:text-[#015551]">
                                {country.name}
                              </span>
                              <div className="text-xs text-gray-500">{country.cities.length} cities</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* City Selection */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#015551]/10 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <MapPin className="h-6 w-6 mr-3 text-[#015551]" />
                Select City
                {selectedCountry && (
                  <Badge variant="secondary" className="ml-auto bg-[#015551]/20 text-[#015551]">
                    {selectedCountry.cities.length} Cities
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {selectedCountry ? `Choose a city in ${selectedCountry.name}` : "Select a country first"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCountry ? (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cities..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      onFocus={() => setShowCities(true)}
                      className="pl-10 border-2 border-[#015551]/30 focus:border-[#015551] rounded-xl"
                    />
                  </div>

                  {selectedCity ? (
                    <div className="p-4 bg-gradient-to-r from-[#015551] to-[#fe4f2d] rounded-xl text-white">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-6 w-6" />
                        <div>
                          <h3 className="font-semibold text-lg">{selectedCity}</h3>
                          <p className="text-[#015551]/20 text-sm">{selectedCountry.name}</p>
                        </div>
                        {weatherData && (
                          <div className="ml-auto text-right">
                            <div className="text-2xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
                            <div className="text-[#015551]/20 text-sm capitalize">
                              {weatherData.weather[0].description}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowCities(!showCities)}
                      variant="outline"
                      className="w-full h-12 border-2 border-dashed border-[#015551]/50 hover:border-[#015551] hover:bg-[#015551]/10 rounded-xl"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Choose a City
                    </Button>
                  )}

                  {showCities && (
                    <div className="max-h-96 overflow-y-auto border-2 border-[#015551]/30 rounded-xl p-4 bg-white/50">
                      <div className="grid grid-cols-1 gap-2">
                        {filteredCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => handleCitySelect(city)}
                            className="flex items-center space-x-3 p-3 hover:bg-[#015551]/10 rounded-lg transition-all duration-200 text-left group"
                          >
                            <div className="w-2 h-2 bg-[#015551] rounded-full group-hover:scale-150 transition-transform"></div>
                            <span className="font-medium text-gray-900 group-hover:text-[#015551]">{city}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Please select a country first to view available cities</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-[#57b4ba]/10 to-[#015551]/10">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#57b4ba]"></div>
                  <span className="text-lg font-medium text-[#015551]">Loading weather data...</span>
                </div>
                <p className="text-[#57b4ba] mt-2">Fetching real-time data from {selectedCity}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-[#fe4f2d]/10 to-red-50">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 text-[#fe4f2d]">
                  <Cloud className="h-6 w-6" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {weatherData && (
          <>
            {/* Current Weather Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#fdfbee] to-[#fe4f2d]/20 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Thermometer className="h-4 w-4 mr-2" />
                    Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#fe4f2d]">{Math.round(weatherData.main.temp)}°C</div>
                      <div className="text-sm text-[#fe4f2d]/70">
                        Feels like {Math.round(weatherData.main.feels_like)}°C
                      </div>
                    </div>
                    <div className="p-3 bg-[#fe4f2d]/20 rounded-full">
                      <Thermometer className="h-8 w-8 text-[#fe4f2d]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#fdfbee] to-[#57b4ba]/20 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Droplets className="h-4 w-4 mr-2" />
                    Humidity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#57b4ba]">{weatherData.main.humidity}%</div>
                      <div className="text-sm text-[#57b4ba]/70">Relative humidity</div>
                    </div>
                    <div className="p-3 bg-[#57b4ba]/20 rounded-full">
                      <Droplets className="h-8 w-8 text-[#57b4ba]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#fdfbee] to-[#015551]/20 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Wind className="h-4 w-4 mr-2" />
                    Wind Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#015551]">{weatherData.wind.speed} m/s</div>
                      <div className="text-sm text-[#015551]/70">Wind speed</div>
                    </div>
                    <div className="p-3 bg-[#015551]/20 rounded-full">
                      <Wind className="h-8 w-8 text-[#015551]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#fdfbee] to-[#fe4f2d]/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Visibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#fe4f2d]">
                        {(weatherData.visibility / 1000).toFixed(1)} km
                      </div>
                      <div className="text-sm text-[#fe4f2d]/70">Visibility range</div>
                    </div>
                    <div className="p-3 bg-[#fe4f2d]/20 rounded-full">
                      <Eye className="h-8 w-8 text-[#fe4f2d]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Weather Summary */}
            <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-[#015551] via-[#57b4ba] to-[#fe4f2d] text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  {getWeatherIcon(weatherData.weather[0].main)}
                  <span className="ml-3">
                    Current Weather in {weatherData.name}, {weatherData.sys.country}
                  </span>
                </CardTitle>
                <CardDescription className="text-[#fdfbee] text-lg">
                  {weatherData.weather[0].description.charAt(0).toUpperCase() +
                    weatherData.weather[0].description.slice(1)}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Charts */}
            {forecastData && (
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#fcecdd]/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-[#00809d]" />
                      Temperature Forecast
                    </CardTitle>
                    <CardDescription>Next 24 hours temperature trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={temperatureData}>
                        <defs>
                          <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00809d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#00809d" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fcecdd" />
                        <XAxis dataKey="time" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="temperature"
                          stroke="#00809d"
                          strokeWidth={3}
                          fill="url(#temperatureGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#f3a26d]/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets className="h-5 w-5 mr-2 text-[#ff7601]" />
                      Humidity Levels
                    </CardTitle>
                    <CardDescription>Humidity percentage over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={temperatureData}>
                        <defs>
                          <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff7601" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ff7601" stopOpacity={0.3} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fcecdd" />
                        <XAxis dataKey="time" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Bar dataKey="humidity" fill="url(#humidityGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Weather Conditions Distribution */}
            {pieData.length > 0 && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-[#fcecdd]/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cloud className="h-5 w-5 mr-2 text-[#00809d]" />
                    Weather Conditions Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of weather conditions in the forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Footer Stats */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-[#015551] to-[#57b4ba] text-white">
          <CardContent className="py-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#fdfbee]">{WORLD_COUNTRIES.length}</div>
                <div className="text-[#fdfbee]/80">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#fdfbee]">
                  {WORLD_COUNTRIES.reduce((total, country) => total + country.cities.length, 0)}
                </div>
                <div className="text-[#fdfbee]/80">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#fdfbee]">7</div>
                <div className="text-[#fdfbee]/80">Continents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#fdfbee]">24/7</div>
                <div className="text-[#fdfbee]/80">Live Data</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

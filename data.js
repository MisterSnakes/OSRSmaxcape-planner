/* Skill icons from Lucide (lucide.dev), ISC License */
const ICONS={"attack":"<path d=\"m11 19-6-6\" /> <path d=\"m5 21-2-2\" /> <path d=\"m8 16-4 4\" /> <path d=\"M9.5 17.5 21 6V3h-3L6.5 14.5\" />","strength":"<path d=\"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z\" /> <path d=\"m2.5 21.5 1.4-1.4\" /> <path d=\"m20.1 3.9 1.4-1.4\" /> <path d=\"M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z\" /> <path d=\"m9.6 14.4 4.8-4.8\" />","defence":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />","ranged":"<circle cx=\"12\" cy=\"12\" r=\"10\" /> <circle cx=\"12\" cy=\"12\" r=\"6\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" />","magic":"<path d=\"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72\" /> <path d=\"m14 7 3 3\" /> <path d=\"M5 6v4\" /> <path d=\"M19 14v4\" /> <path d=\"M10 2v2\" /> <path d=\"M7 8H3\" /> <path d=\"M21 16h-4\" /> <path d=\"M11 3H9\" />","prayer":"<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />","runecraft":"<path d=\"M10.5 3 8 9l4 13 4-13-2.5-6\" /> <path d=\"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z\" /> <path d=\"M2 9h20\" />","hitpoints":"<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />","crafting":"<circle cx=\"6\" cy=\"6\" r=\"3\" /> <path d=\"M8.12 8.12 12 12\" /> <path d=\"M20 4 8.12 15.88\" /> <circle cx=\"6\" cy=\"18\" r=\"3\" /> <path d=\"M14.8 14.8 20 20\" />","mining":"<path d=\"m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999\" /> <path d=\"M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024\" /> <path d=\"M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069\" /> <path d=\"M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z\" />","smithing":"<path d=\"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9\" /> <path d=\"m18 15 4-4\" /> <path d=\"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5\" />","fishing":"<path d=\"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z\" /> <path d=\"M18 12v.5\" /> <path d=\"M16 17.93a9.77 9.77 0 0 1 0-11.86\" /> <path d=\"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33\" /> <path d=\"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4\" /> <path d=\"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98\" />","cooking":"<path d=\"M2 12h20\" /> <path d=\"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8\" /> <path d=\"m4 8 16-4\" /> <path d=\"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8\" />","firemaking":"<path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\" />","woodcutting":"<path d=\"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z\" /> <path d=\"M12 22v-3\" />","agility":"<path d=\"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z\" /> <path d=\"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z\" /> <path d=\"M16 17h4\" /> <path d=\"M4 13h4\" />","herblore":"<path d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2\" /> <path d=\"M6.453 15h11.094\" /> <path d=\"M8.5 2h7\" />","thieving":"<path d=\"M18 11c-1.5 0-2.5.5-3 2\" /> <path d=\"M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z\" /> <path d=\"M6 11c1.5 0 2.5.5 3 2\" />","fletching":"<path d=\"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z\" /> <path d=\"M16 8 2 22\" /> <path d=\"M17.5 15H9\" />","slayer":"<path d=\"m12.5 17-.5-1-.5 1h1z\" /> <path d=\"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z\" /> <circle cx=\"15\" cy=\"12\" r=\"1\" /> <circle cx=\"9\" cy=\"12\" r=\"1\" />","farming":"<path d=\"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3\" /> <path d=\"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4\" /> <path d=\"M5 21h14\" />","construction":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />","hunter":"<circle cx=\"11\" cy=\"4\" r=\"2\" /> <circle cx=\"18\" cy=\"8\" r=\"2\" /> <circle cx=\"20\" cy=\"16\" r=\"2\" /> <path d=\"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z\" />","sailing":"<path d=\"M10 2v15\" /> <path d=\"M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z\" /> <path d=\"M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z\" />"};
const XP99=13034431;
const XPTBL=(function(){const a=[0,0];let pts=0;for(let l=1;l<99;l++){pts+=Math.floor(l+300*Math.pow(2,l/7));a[l+1]=Math.floor(pts/4);}return a;})();
ICONS.combat='<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>';
const COMBAT=["attack","strength","defence","ranged","magic","hitpoints"];
const COMBAT_RATE=300000;
// name, color, kind, rate(for skill), method
const SKILLS={
  attack:{name:"Attack",color:"#d0493c",kind:"combat"},
  strength:{name:"Strength",color:"#3fa45b",kind:"combat"},
  defence:{name:"Defence",color:"#5dade2",kind:"combat"},
  ranged:{name:"Ranged",color:"#3c9b4a",kind:"combat"},
  magic:{name:"Magic",color:"#6b7fe0",kind:"combat"},
  hitpoints:{name:"Hitpoints",color:"#e05a5a",kind:"combat"},
  prayer:{name:"Prayer",color:"#e8cf52",kind:"skill",rate:500000,method:"Gilded / Wrath altar"},
  runecraft:{name:"Runecraft",color:"#8a7bf0",kind:"skill",rate:45000,method:"Guardians of the Rift"},
  crafting:{name:"Crafting",color:"#c98a5a",kind:"skill",rate:280000,method:"Gems / d'hide / glass"},
  mining:{name:"Mining",color:"#7fa0b5",kind:"skill",rate:125000,method:"Volcanic Mine / MLM"},
  smithing:{name:"Smithing",color:"#9aa6b2",kind:"skill",rate:300000,method:"Blast Furnace / Foundry"},
  fishing:{name:"Fishing",color:"#4fb6e8",kind:"skill",rate:50000,method:"Tempoross / barbarian"},
  cooking:{name:"Cooking",color:"#d06a4a",kind:"skill",rate:600000,method:"1t karambwans / wines"},
  firemaking:{name:"Firemaking",color:"#ef8a3c",kind:"skill",rate:300000,method:"Wintertodt"},
  woodcutting:{name:"Woodcutting",color:"#5fae54",kind:"skill",rate:100000,method:"Redwoods / 2t teaks"},
  agility:{name:"Agility",color:"#46c79a",kind:"skill",rate:65000,method:"Hallowed Sepulchre"},
  herblore:{name:"Herblore",color:"#8cc63f",kind:"skill",rate:450000,method:"Best-value potions"},
  thieving:{name:"Thieving",color:"#cf6bd6",kind:"skill",rate:260000,method:"Pyramid Plunder"},
  fletching:{name:"Fletching",color:"#b0c050",kind:"skill",rate:800000,method:"Darts / bow stringing"},
  slayer:{name:"Slayer",color:"#e0594d",kind:"skill",rate:48000,method:"Tasks + cannon (carries combat)"},
  farming:{name:"Farming",color:"#6abf69",kind:"skill",rate:300000,method:"Tree / herb runs"},
  construction:{name:"Construction",color:"#cf9a5c",kind:"skill",rate:650000,method:"Mahogany tables + butler"},
  hunter:{name:"Hunter",color:"#b8894f",kind:"skill",rate:220000,method:"Birdhouses / chinchompas"},
  sailing:{name:"Sailing",color:"#2f93d6",kind:"skill",rate:140000,method:"Barracuda Trials"}
};
const ORDER=Object.keys(SKILLS);
const SCHED=ORDER.filter(k=>SKILLS[k].kind==="skill");
const METHODS={
 prayer:[["Gilded altar (dragon bones)",500000],["Gilded altar (superior bones)",700000],["Ensouled heads",600000],["Chaos altar (cheaper)",450000]],
 runecraft:[["Guardians of the Rift",45000],["Blood runes",48000],["ZMI / Ourania",50000],["Soul runes",42000]],
 crafting:[["Dragonhide bodies",300000],["Battlestaves",450000],["Glassblowing",250000],["Gem cutting",200000]],
 mining:[["3-tick iron/granite",95000],["Volcanic Mine",120000],["Motherlode Mine (AFK)",70000],["Amethyst (AFK)",30000]],
 smithing:[["Blast Furnace (gold)",320000],["Blast Furnace (addy/rune)",240000],["Giants' Foundry",180000]],
 fishing:[["Barbarian (3t, AFK)",55000],["Barbarian (1.5t)",90000],["Tempoross",40000],["Minnows / Aerial",35000]],
 cooking:[["Karambwans (relaxed)",350000],["1-tick karambwans",800000],["Wines (1t)",450000]],
 firemaking:[["Wintertodt (+loot)",280000],["Burning logs (line)",350000],["Forestry campfire",300000]],
 woodcutting:[["Redwoods (AFK)",80000],["2-tick teaks",160000],["Sulliuscep",100000],["Forestry events",120000]],
 agility:[["Hallowed Sepulchre",70000],["Ardougne rooftop",55000],["Pollnivneach rooftop",50000]],
 herblore:[["Super/divine potions",450000],["Prayer/Sara brews",350000],["Mastering Mixology",200000]],
 thieving:[["Pyramid Plunder",300000],["Blackjacking",270000],["Vyres (Darkmeyer)",250000],["Artefacts (GP)",180000]],
 fletching:[["Bow stringing (magic)",800000],["Dragon darts",1000000],["Broad arrows",500000],["Amethyst bolts (AFK)",300000]],
 slayer:[["Efficient + cannon",50000],["Max XP tasks",55000],["Relaxed / AFK",35000]],
 farming:[["Tree + fruit-tree runs",400000],["Hardwood + tree runs",350000],["Herb runs",300000]],
 construction:[["Mahogany tables",750000],["Oak larders (cheap)",350000],["Mahogany Homes",280000]],
 hunter:[["Black chinchompas",260000],["Red chinchompas",200000],["Maniacal monkeys",140000],["Birdhouses (passive)",100000]],
 sailing:[["Barracuda Trials",160000],["Sea Charting / courier",110000],["Shipwreck Salvaging (AFK)",80000]],
 combat:[["NMZ (afk)",300000],["NMZ (overloads/flicking)",520000],["Chinning - maniacal monkeys",750000],["Sand crabs / ammonite (afk)",90000]]
};
/* Rough gp-per-XP estimates per method; methods not listed are treated as free (gathering / profit). Estimates, not live prices. */
const COST={
 "Gilded altar (dragon bones)":11,"Gilded altar (superior bones)":25,"Ensouled heads":5,"Chaos altar (cheaper)":6,
 "Dragonhide bodies":3,"Battlestaves":2,"Glassblowing":1.5,"Gem cutting":2,
 "Blast Furnace (gold)":1,"Blast Furnace (addy/rune)":2,"Giants' Foundry":1,
 "Karambwans (relaxed)":1,"1-tick karambwans":1,"Wines (1t)":0.5,
 "Super/divine potions":5,"Prayer/Sara brews":4,"Mastering Mixology":1,
 "Dragon darts":3,"Bow stringing (magic)":1,"Broad arrows":1,"Amethyst bolts (AFK)":1.5,
 "Tree + fruit-tree runs":0.5,"Hardwood + tree runs":0.5,"Herb runs":0.3,
 "Mahogany tables":11,"Oak larders (cheap)":1,"Mahogany Homes":1.5
};
const DEFAULT_XP={attack:0,strength:0,defence:0,ranged:0,magic:0,hitpoints:1154,prayer:0,runecraft:0,crafting:0,mining:0,smithing:0,fishing:0,cooking:0,firemaking:0,woodcutting:0,agility:0,herblore:0,thieving:0,fletching:0,slayer:0,farming:0,construction:0,hunter:0,sailing:0};
const IMG={};ORDER.forEach(k=>IMG[k]="https://oldschool.runescape.wiki/images/"+SKILLS[k].name+"_icon.png");

const LOG={
  slayer:[["Abyssal whip / dagger"],["Occult necklace \u2014 Thermy"],["Kraken tentacle + trident"],["Dragon boots"],["Imbued heart"],["Cerberus crystals"],["Brimstone ring / Hydra leather"]],
  runecraft:[["Raiments of the Eye \u2014 full set","prio"],["Abyssal needle \u2192 Colossal pouch"],["Abyssal lantern"],["Catalytic talisman"],["Abyssal dyes \u00d73"],["Abyssal protector pet","rng"]],
  thieving:[["Pharaoh's sceptre \u2014 Plunder"],["Rogue's equipment (full)"]],
  fishing:[["Tome of water \u2014 Tempoross","prio"],["Fish barrel"],["Dragon harpoon"],["Big harpoonfish"],["Angler's outfit"],["Heron pet","rng"]],
  woodcutting:[["Lumberjack outfit"],["Forestry kit + secateurs"],["Sturdy beehive + log basket"],["Beaver pet","rng"]],
  agility:[["Ring of endurance \u2014 Sepulchre","prio"],["Graceful recolor (marks)"],["Strange old lockpick"],["Giant squirrel pet","rng"]],
  firemaking:[["Pyromancer outfit \u2014 Wintertodt","prio"],["Tome of fire"],["Dragon axe"],["Phoenix pet","rng"]],
  smithing:[["Smiths' outfit \u2014 Foundry","prio"],["Colossal blade"],["Kovac's grog"]],
  sailing:[["Sea Charting 100% (+2.5% keg)","prio"],["Barracuda Trial outfit"],["Sailing pet","rng"]],
  mining:[["Prospector outfit \u2014 MLM","prio"],["Golden nugget gear"],["Rock golem pet","rng"]],
  cooking:[["Cooking cape perks"],["Rocky pet","rng"]],
  hunter:[["Larupia/graahk/kyatt outfits"],["Herbiboar items"],["Baby chinchompa pet","rng"]],
  crafting:[["Crafting outfit pieces"]]
};
const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

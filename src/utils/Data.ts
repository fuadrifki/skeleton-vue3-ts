export const Characteristicts = [
  {
    id: "SYM-551",
    name: "Munculnya ruam",
  },
  {
    id: "SYM-552",
    name: "Kulit kering",
  },
  {
    id: "SYM-553",
    name: "Iritasi",
  },
  {
    id: "SYM-554",
    name: "Luka lepuh pada area kulit yang bersentuhan dengan zat iritan kimia",
  },
  {
    id: "SYM-555",
    name: "Kemerahan dan bengkak",
  },
  {
    id: "SYM-556",
    name:
      "Muncul ketika kulit bersentuhan dengan alergen seperti bahan kimia, kosmetik, cat kuku, sarung tangan lateks, protein, atau perhiasan",
  },
  {
    id: "SYM-557",
    name: "Kulit merah",
  },
  {
    id: "SYM-558",
    name: "Gatal",
  },
  {
    id: "SYM-559",
    name: "Kering",
  },
  {
    id: "SYM-560",
    name: "Bersisik",
  },
];

export const Diseases = [
  {
    id: "DIS-1001",
    name: "Iritan",
    characteristict_id: ["SYM-551", "SYM-552", "SYM-553", "SYM-554"],
  },
  {
    id: "DIS-1002",
    name: "Alergi",
    characteristict_id: ["SYM-555", "SYM-556"],
  },
  {
    id: "DIS-1003",
    name: "Atopik (eksim kering)",
    characteristict_id: ["SYM-557", "SYM-558", "SYM-559", "SYM-560"],
  },
];

export interface RuleInterface {
  id: string,
  name: string,
  isTrue: string,
  isFalse: string
}
export let Rule: Array<RuleInterface> = [];
for (let i = 0; i < Diseases.length; i++) {
  if (i !== Diseases.length - 1)
    Rule.push({
      ...Diseases[i],
      isTrue: Diseases[i].characteristict_id[0],
      isFalse: Diseases[i + 1].id,
    });
  else
    Rule.push({
      ...Diseases[i],
      isTrue: Diseases[i].characteristict_id[0],
      isFalse: "End",
    });

  for (let j = 0; j < Diseases[i].characteristict_id.length; j++) {
    for (let k = 0; k < Characteristicts.length; k++) {
      if (Diseases[i].characteristict_id[j] === Characteristicts[k].id)
        if (j !== Diseases[i].characteristict_id.length - 1)
          Rule.push({
            ...Characteristicts[k],
            isTrue: Diseases[i].characteristict_id[j + 1],
            isFalse: Diseases[i].characteristict_id[j + 1],
          });
        else
          Rule.push({ ...Characteristicts[k], isTrue: "End", isFalse: "End" });
    }
  }
}

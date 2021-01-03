
export const Characteristicts = [
    {
        id: 1,
        name: 'Munculnya ruam',
    },
    {
        id: 2,
        name: 'Kulit kering',
    },
    {
        id: 3,
        name: 'Iritasi',
    },
    {
        id: 4,
        name: 'Luka lepuh pada area kulit yang bersentuhan dengan zat iritan kimia',
    },
    {
        id: 5,
        name: 'Kemerahan dan bengkak',
    },
    {
        id: 6,
        name: 'Muncul ketika kulit bersentuhan dengan alergen seperti bahan kimia, kosmetik, cat kuku, sarung tangan lateks, protein, atau perhiasan',
    },
    {
        id: 7,
        name: 'Kulit merah',
    },
    {
        id: 8,
        name: 'Gatal',
    },
    {
        id: 9,
        name: 'Kering',
    },
    {
        id: 10,
        name: 'Bersisik',
    },
];

export const Diseases = [
    {
        id: 1,
        name: 'Iritan',
        characteristict_id: [1, 2, 3, 4],
    },
    {
        id: 2,
        name: 'Alergi',
        characteristict_id: [5, 6],
    },
    {
        id: 3,
        name: 'Atopik (eksim kering)',
        characteristict_id: [7, 8, 9, 10],
    },
];

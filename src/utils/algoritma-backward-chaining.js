const io = require("console-read-write");

const diseases = [
 {
   id: 1,
   name: "Iritan",
   characteristict: [
     {
       id: 1,
       name: "Munculnya ruam",
     },
     {
       id: 2,
       name: "Kulit kering",
     },
     {
       id: 3,
       name: "Iritasi",
     },
     {
       id: 4,
       name:
         "Luka lepuh pada area kulit yang bersentuhan dengan zat iritan kimia",
     },
   ],
 },
 {
   id: 2,
   name: "Alergi",
   characteristict: [
     {
       id: 5,
       name: "Kemerahan dan bengkak",
     },
     {
       id: 6,
       name:
         "Muncul ketika kulit bersentuhan dengan alergen seperti bahan kimia, kosmetik, cat kuku, sarung tangan lateks, protein, atau perhiasan",
     },
   ],
 },
 {
   id: 3,
   name: "Atopik (eksim kering)",
   characteristict: [
     {
       id: 7,
       name: "Kulit merah",
     },
     {
       id: 8,
       name: "Gatal",
     },
     {
       id: 9,
       name: "Kering",
     },
     {
       id: 10,
       name: "Bersisik",
     },
   ],
 },
];
async function diagnosa(e) {
 // Laporan Semua Data Pasien
 let data = [];

 for (let n = 1; n <= e; n++) {
   io.write(`\n\nPemeriksaan Pasien ke-${n}`);
   let temp = {
     name: "",
     characteristict: [],
     persentase: "",
   };
   for (let i = 0; i < diseases.length; i++) {
     io.write(`\nApakah anda mengalami sakit ${diseases[i].name} ?`);
     const inputDiseases = await io.read();
     if (inputDiseases.toLowerCase() === "ya") {
       temp.name = diseases[i].name;
     }
     if (temp.name !== "") {
       for (let j = 0; j < diseases[i].characteristict.length; j++) {
         io.write(
           `Apakah anda mengalami gejala ${diseases[i].characteristict[
             j
           ].name.toLowerCase()} ?`
         );
         const inputCharacteristict = await io.read();
         if (inputCharacteristict.toLowerCase() === "ya") {
           temp.characteristict.push(diseases[i].characteristict[j].name);
         }
       }
       temp.persentase = Math.round(
         (temp.characteristict.length / diseases[i].characteristict.length) *
           100
       );
       data.push(temp);
       break;
     }
   }
 }

 io.write(`\n\n----- HASIL DIAGNOSA DARI ${e} DATA -----\n`);
 for (let y = 0; y < data.length; y++) {
   io.write(`>> Pasien ke ${y + 1}`);
   io.write(`Nama penyakit     : ${data[y].name}`);
   io.write("Ciri-ciri         :");
   for (let z = 0; z < data[y].characteristict.length; z++) {
     io.write(`  ${z + 1}. ${data[y].characteristict[z]}`);
   }
   io.write(`Persentase        : ${data[y].persentase}%`);
   io.write(
     `Diagnosa (sesuai) : ${data[y].persentase >= 50 ? "Ya" : "Tidak"}`
   );
   io.write("\n");
 }

 let persentase = {
   true: [],
   false: [],
 };
 for (let x = 0; x < data.length; x++) {
   if (data[x].persentase >= 50) persentase.true.push(data[x]);
   else persentase.false.push(data[x]);
 }
 io.write(
   `\n\n----- HASIL DIAGNOSA SESUAI SEBANYAK ${Math.round(
     (persentase.true.length / data.length) * 100
   )}% DAN TIDAK SESUAI SEBANYAK ${Math.round(
     (persentase.false.length / data.length) * 100
   )}% DARI ${e} DATA -----\n`
 );
}

async function main() {
 io.write("------ SISTEM PAKAR PENYAKIT KULIT ------");
 io.write("----- Jawab dengan 'Ya' atau 'Tidak' -----");

 let isNumber = false;
 while (!isNumber) {
   io.write("\nMasukkan jumlah data yang akan di diagnosa:");
   const total = await io.read();
   const toNumber = !isNaN(parseFloat(total)) && isFinite(total);
   if (toNumber) {
     if (Number(total) > 0) {
       isNumber = true;
       diagnosa(Number(total));
     } else io.write("Jumlah data minimal 1!");
   } else io.write("Jumlah data harus angka!");
 }
}

main();
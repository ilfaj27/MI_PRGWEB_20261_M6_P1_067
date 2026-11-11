export function hitungBMI(beratKg, tinggiCm) {
    const m = tinggiCm / 100;
    const bmi = beratKg / (m * m);

    let kategori;
    if (bmi < 18.5) kategori = "Berat badan kurang";
    else if (bmi < 25) kategori = "Normal";
    else if (bmi < 30) kategori = "Berat badan berlebih";
    else kategori = "Obesitas";

    return { bmi: bmi.toFixed(1), kategori };
}
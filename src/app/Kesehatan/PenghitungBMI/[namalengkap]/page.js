"use client";

import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { hitungBMI } from "@/app/lib/bmi";
import Link from "next/link";


export default function Page() {
    const params = useParams();
    const nama = decodeURIComponent(params.namalengkap).replaceAll("-", " ");

    const [berat, setBerat] = useState("");
    const [tinggi, setTinggi] = useState("");
    const [hasil, setHasil] = useState(null);

    const warna = {
        "Berat badan kurang": "blue",
        "Normal": "green",
        "Berat badan berlebih": "yellow",
        "Obesitas": "red"
    };

    function handleSubmit(e) {
        e.preventDefault();
        setHasil(hitungBMI(Number.parseFloat(berat), Number.parseFloat(tinggi)));
    }
    
    return (
        <main style={{ maxWidth: 360, margin: "40px auto", padding: "0 16px" }}>
            <h1>Halo, {nama}</h1>
            <p>Silakan masukkan berat badan dan tinggi kamu!</p>

            <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gap: 12, marginTop: 16 }}
            >
                <label>
                    <label htmlFor="berat">Berat (kg)</label>
                    <input
                        type="number"
                        step="any"
                        min="1"
                        value={berat}
                        onChange={(e) => setBerat(e.target.value)}
                        required
                        style={{ display: "block", width: "100%", padding: 6 }}
                    />
                </label>

                <label>
                    <label htmlFor="berat">Tinggi (cm)</label>
                    <input
                        type="number"
                        step="any"
                        min="1"
                        value={tinggi}
                        onChange={(e) => setTinggi(e.target.value)}
                        required
                        style={{ display: "block", width: "100%", padding: 6 }}
                    />
                </label>

                <button type="submit" style={{ padding: 8 }}>
                    Hitung
                </button>
                <button type="button" style={{ padding: 8 }} onClick={() => {
                    setBerat("");
                    setTinggi("");
                    setHasil(null);
                }}>
                    Reset
                </button>
            </form>

            {hasil && (
                <p style={{ marginTop: 16, color: warna[hasil.kategori] }}>
                    BMI Kamu: <strong>{hasil.bmi}</strong> - ({hasil.kategori})
                </p>
            )}

            <Link href="/" style={{ display: "inline-block", marginTop: 16, color: "blue", textDecoration: "underline" }}>
                Bukan kamu? Ganti nama
            </Link>
        </main>
    );
}    
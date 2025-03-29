import { useState } from "react";

interface FormData {
    KOD_AKWIZYTORA: string;
    Akw_tabela: string;
    Akw_tabela_stara: string;
    sortowanie: string;
    NAZWA: string;
}

const SessionHandler = () => {
    const [formData, setFormData] = useState < FormData > ({
        KOD_AKWIZYTORA: "",
        Akw_tabela: "",
        Akw_tabela_stara: "",
        sortowanie: "",
        NAZWA: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        Object.keys(formData).forEach((key) => {
            localStorage.setItem(key, formData[key as keyof FormData]);
        });

        console.log("Dane zapisane w localStorage:", formData);

        try {
            const response = await fetch("/api/dane", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("Odpowiedź z API:", result);
        } catch (error) {
            console.error("Błąd podczas wysyłania danych:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="KOD_AKWIZYTORA" placeholder="Kod akwizytora" onChange={handleChange} />
            <input type="text" name="Akw_tabela" placeholder="Akw tabela" onChange={handleChange} />
            <input type="text" name="Akw_tabela_stara" placeholder="Akw tabela stara" onChange={handleChange} />
            <input type="text" name="sortowanie" placeholder="Sortowanie" onChange={handleChange} />
            <input type="text" name="NAZWA" placeholder="Nazwa" onChange={handleChange} />
            <button type="submit">Zapisz</button>
        </form>
    );
};

export default SessionHandler;

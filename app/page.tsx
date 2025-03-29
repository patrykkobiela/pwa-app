"use client";
import { useEffect } from "react";
import Mycomponent from "./Mycomponent";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker zarejestrowany!");
      });
    }
  }, []);

  return (
    <div>
      <h1>Witaj w PWA!!!</h1>
      <Mycomponent />
    </div>
  );
}

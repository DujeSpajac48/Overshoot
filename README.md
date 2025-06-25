# OverShoot 🏋️‍♂️

**OverShoot** 

---

##  sta radi 

-  **brisanje blokova i dana u tjednu**
- **Spremanje blokova u lokalnu bazu podataka (SQLite)**
- **spremanje informacija o svakom bloku**
-  **prikaz broja svih blokova**
-  **prikaz dana u tjednu unutar svakog bloka**
-  **prikaz broja dana u svakom tjednu**
- **Navigacija: svaki blok vodi na svoj tjedan i svoje dane**
- **Navigacija: svaki dan vodi na svoj trening**

---

## ❌  Neradi :(

- ❌ **Spremanje treninga unutar dana**  
  (Problem s integracijom SQLite baze za treninge – potrebno ispraviti strukturu tablice i upite)

- ❌ **Login**  
  (Nije implementiran backend/autentikacija – oxcekivano)

---

## Tehnologije

- **React Native** (Expo)
- **Redux** za upravljanje stanjima
- **SQLite** za lokalno spremanje podataka
- **React Navigation** za višeslojnu navigaciju
- **Animacije su kresale apk, to ce ic kad proradi baza**

---

## Sta triba dodat

-  Dovršiti spremanje i prikaz treninga unutar svakog dana
-  Implementirati autentikaciju korisnika (Login/Register)
-   mozda dodat sinkronizaciju s oblakom (Supabase/Firebase)
-   daleko daleko  Statistika napretka po blokovima i tjednima
-  dodat dark/light mode

---

## kako pokrenit

+ skinit expo go na mobitel (lakse), ili emulator

```bash
git clone https://github.com/dujespajic/overshoot.git
cd overshoot
npm install
npx expo start

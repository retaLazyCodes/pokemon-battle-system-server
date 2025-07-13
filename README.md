# 🧩 Pokedex API

Una pequeña API en Node.js que actúa como **proxy local** de la PokéAPI, guardando datos en SQLite para evitar bans y límites de uso.
Incluye scripts para scrapear Pokémon y movimientos, y expone endpoints básicos con Express para consumir desde el frontend de forma simple y rápida.

---

## 📂 **Estructura del proyecto**

| Carpeta/Archivo | Descripción |
|-----------------|-------------|
| `/src/db` | Configura y exporta la conexión SQLite (`better-sqlite3`). |
| `/src/models` | Acceso a datos: solo consultas SELECT a la base SQLite local. |
| `/src/controllers` | Resuelven las peticiones: reciben parámetros, ejecutan las consultas y devuelven la respuesta formateada. |
| `/src/routes` | Define rutas Express y las vincula a los controladores. |
| `/src/tasks` | Scripts de scraping para poblar la base: `seedPokemon.js`, `seedMoves.js`, etc. |
| `server.js` | Inicia Express, registra rutas y configura middlewares. |
---

## 🚀 **Cómo correr el proyecto**

### 1️⃣ Instala dependencias
```bash
npm install
```

### 2️⃣ Poblar la base de datos (scraping)

#### Poblar Pokémon
```bash
npm run seed:pokemon
```

#### Poblar Movimientos
```bash
npm run seed:moves
```

Estos scripts consultan la [PokéAPI](https://pokeapi.co/) y guardan resultados localmente en un archivo `pokedex.db`.

### 3️⃣ Corre el servidor
```bash
node server.js
```

Tu servidor Express quedará disponible en:  
```
http://localhost:3000
```

---


## 🧩 **Stack**

- **Node.js** + **Express.js**
- **better-sqlite3** para persistencia local
- **node-fetch** para requests HTTP
- **chalk** para logs amigables en consola

---


## 📜 **Licencia**

Este proyecto está bajo la Licencia MIT. Véase el archivo LICENSE.



import * as SQLite from "expo-sqlite";

export type Component = {
  id: number;
  name: string;
  purchaseDate: string;
  price: number;
  quantity: number;
  location: string | null;
  category: string | null;
};

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function initDb(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync("inventory.db");
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS components (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            purchaseDate TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            location TEXT,
            category TEXT
            );
        `);
  return db;
}

export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (dbPromise === null) {
    dbPromise = initDb();
  }
  return dbPromise;
}

export async function getAllComponents(): Promise<Component[]> {
  const db = await getDb();
  return db.getAllAsync<Component>("SELECT * FROM components ORDER BY name");
}

export async function getComponentById(id: number): Promise<Component | null> {
  const db = await getDb();
  return db.getFirstAsync<Component>(
    "SELECT * FROM components WHERE id = ?",
    id,
  );
}

export type NewComponent = Omit<Component, "id">;

export async function addComponent(c: NewComponent): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    "INSERT INTO components (name, purchaseDate, price, quantity, location, category) VALUES (?, ?, ?, ?, ?, ?)",
    c.name,
    c.purchaseDate,
    c.price,
    c.quantity,
    c.location,
    c.category,
  );
  return result.lastInsertRowId;
}

export async function updateComponent(c: Component): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    "UPDATE components SET name = ?, purchaseDate = ?, price = ?, quantity = ?, location = ?, category = ? WHERE id = ?",
    c.name,
    c.purchaseDate,
    c.price,
    c.quantity,
    c.location,
    c.category,
    c.id,
  );
}

export async function deleteComponent(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync("DELETE FROM components WHERE id = ?", id);
}

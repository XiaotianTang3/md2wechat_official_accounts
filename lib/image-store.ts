import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "md2wechat";
const DB_VERSION = 1;
const STORE = "images";

export type ImageRecord = {
  /** id 即 filename，作为 IndexedDB 的 keyPath。 */
  id: string;
  filename: string;
  blob: Blob;
  size: number;
  addedAt: number;
};

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

export async function putImage(record: ImageRecord): Promise<void> {
  const db = await getDB();
  await db.put(STORE, record);
}

export async function getImage(id: string): Promise<ImageRecord | null> {
  const db = await getDB();
  const record = (await db.get(STORE, id)) as ImageRecord | undefined;
  return record ?? null;
}

export async function listImages(): Promise<ImageRecord[]> {
  const db = await getDB();
  return (await db.getAll(STORE)) as ImageRecord[];
}

export async function deleteImage(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE, id);
}

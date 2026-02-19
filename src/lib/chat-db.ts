import Database from "better-sqlite3";
import { UIMessage } from "ai";
import { generateId } from "ai";

// Use the same database file as auth
const db = new Database("./sqlite.db");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    chat_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
  CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
`);

export interface Chat {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export async function createChat(userId: string, title?: string): Promise<string> {
  const id = generateId();
  const stmt = db.prepare(
    "INSERT INTO chats (id, user_id, title) VALUES (?, ?, ?)"
  );
  stmt.run(id, userId, title || null);
  return id;
}

export async function getChat(chatId: string): Promise<Chat | null> {
  const stmt = db.prepare("SELECT * FROM chats WHERE id = ?");
  const row = stmt.get(chatId) as Chat | undefined;
  return row || null;
}

export async function updateChatTitle(chatId: string, title: string): Promise<void> {
  const stmt = db.prepare("UPDATE chats SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
  stmt.run(title, chatId);
}

export async function deleteChat(chatId: string): Promise<void> {
  const stmt = db.prepare("DELETE FROM chats WHERE id = ?");
  stmt.run(chatId);
}

export async function getUserChats(userId: string): Promise<Chat[]> {
  const stmt = db.prepare(
    "SELECT * FROM chats WHERE user_id = ? ORDER BY updated_at DESC"
  );
  return stmt.all(userId) as Chat[];
}

export async function saveMessages(chatId: string, messages: UIMessage[]): Promise<void> {
  const insert = db.prepare(
    "INSERT OR REPLACE INTO messages (id, chat_id, role, content) VALUES (?, ?, ?, ?)"
  );
  
  const insertMany = db.transaction((msgs: UIMessage[]) => {
    for (const msg of msgs) {
      insert.run(msg.id, chatId, msg.role, JSON.stringify(msg));
    }
  });
  
  insertMany(messages);
  
  // Update the chat's updated_at timestamp
  const updateChat = db.prepare("UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = ?");
  updateChat.run(chatId);
}

export async function loadMessages(chatId: string): Promise<UIMessage[]> {
  const stmt = db.prepare(
    "SELECT content FROM messages WHERE chat_id = ? ORDER BY created_at ASC"
  );
  const rows = stmt.all(chatId) as { content: string }[];
  return rows.map((row) => JSON.parse(row.content));
}

export async function deleteMessages(chatId: string): Promise<void> {
  const stmt = db.prepare("DELETE FROM messages WHERE chat_id = ?");
  stmt.run(chatId);
}

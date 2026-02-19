import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "history.json");

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

async function readTransactions(): Promise<Transaction[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading transactions:", error);
    return [];
  }
}

async function writeTransactions(transactions: Transaction[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(transactions, null, 2), "utf-8");
}

// GET /api/transactions
export async function GET() {
  try {
    const transactions = await readTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error in GET /api/transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// POST /api/transactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { type, name, category, amount, date } = body;
    
    if (!type || !name || !category || amount === undefined || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["Income", "Expense"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be 'Income' or 'Expense'" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    const transactions = await readTransactions();
    
    // Generate new ID
    const newId = transactions.length > 0 
      ? Math.max(...transactions.map(t => t.id)) + 1 
      : 1;

    const newTransaction: Transaction = {
      id: newId,
      type,
      name,
      category,
      amount,
      date,
    };

    transactions.push(newTransaction);
    await writeTransactions(transactions);

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/transactions:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions?id=123
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const transactionId = parseInt(id, 10);
    if (isNaN(transactionId)) {
      return NextResponse.json(
        { error: "Invalid transaction ID" },
        { status: 400 }
      );
    }

    let transactions = await readTransactions();
    const initialLength = transactions.length;
    
    transactions = transactions.filter(t => t.id !== transactionId);
    
    if (transactions.length === initialLength) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    await writeTransactions(transactions);

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/transactions:", error);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}

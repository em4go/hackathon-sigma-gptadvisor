# CoFinance

An AI-powered personal finance dashboard with a conversational AI advisor. Built with Next.js, Vercel AI SDK, and Better Auth.

> **Note:** This is a demo/proof-of-concept application using static JSON data, not a live bank connection.

## What It Does

CoFinance reads financial data from local JSON files and provides:
- A dashboard with charts showing your financial situation
- An AI chat interface that answers questions about your finances
- Personalized recommendations based on your spending, investments, and goals

The AI uses the Vercel AI SDK's `ToolLoopAgent` with 8 specialized tools to analyze your data and give contextual responses.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| AI | Vercel AI SDK 6 (ToolLoopAgent) |
| Auth | Better Auth |
| Database | SQLite (better-sqlite3) |
| Charts | Recharts |
| Icons | Lucide React |

## Environment Variables

Create a `.env.local` file:

```env
# Required: Better Auth configuration
# Generate with: openssl rand -hex 32
BETTER_AUTH_SECRET=your-random-secret-key-min-32-characters-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# AI Provider Keys (at least one required)

# Option 1: Google Gemini (recommended - free tier available)
# Get key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your-gemini-api-key

# Option 2: Kimi (Moonshot AI)
# Get key from: https://platform.moonshot.cn/
KIMI_API_KEY=your-kimi-api-key

# Option 3: ProxyPal (for local development)
PROXYPAL_API_KEY=proxypal-local
```

### About the AI Providers

The app supports multiple AI providers through `src/lib/models.ts`:

1. **Google Gemini** (`gemini-2.5-flash`, `gemini-2.5-pro`)
   - Free tier with generous limits
   - Easiest setup for new users

2. **Kimi via ProxyPal** (`kimi-k2.5`)
   - Routes through local ProxyPal server
   - Base URL: `http://127.0.0.1:8317/v1`
   - Good for development without API costs

3. **Kimi Direct** (original Moonshot API)
   - Direct connection to Moonshot AI
   - Base URL: `https://api.kimi.com/coding/v1`

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime
- At least one AI API key (Gemini recommended)

### Installation

```bash
# Clone and install
git clone https://github.com/em4go/hackathon-sigma-gptadvisor
cd cofinance
bun install

# Set up environment variables
cp .env.example .env

# IMPORTANT: Generate a secure secret for Better Auth
# On macOS/Linux:
openssl rand -hex 32
# Copy the output and paste it as BETTER_AUTH_SECRET in .env.local

# Edit .env.local with your API keys
```

### Database Setup

The SQLite database (`sqlite.db`) is created automatically on first run:

- **Better Auth tables**: `user`, `session`, `account`, `verification` - created by Better Auth when first initialized
- **Chat tables**: `chats`, `messages` - created by `chat-db.ts` on module import

**No migrations needed** - tables are created automatically with `CREATE TABLE IF NOT EXISTS`.

If you need to reset the database:
```bash
# Delete the database file
rm sqlite.db
# Restart the dev server - tables will be recreated automatically
bun dev
```

### Running the App

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

### First Run

1. Make sure `BETTER_AUTH_SECRET` is set (minimum 32 characters)
2. Register an account at `/login`
3. The database will be created automatically on first auth operation
4. Financial data is loaded from `/data/*.json` files
5. The default AI model is `kimi-k2.5` via ProxyPal

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts           # AI streaming endpoint
│   │   ├── auth/[...all]/route.ts  # Better Auth handler
│   │   ├── transactions/route.ts   # Transaction API
│   │   └── stock-history/route.ts  # Stock data API
│   ├── dashboard/
│   │   ├── page.tsx                # Dashboard (Server Component)
│   │   └── dashboard-client.tsx    # Dashboard UI (Client Component)
│   ├── chat/                       # Chat interface pages 
│   ├── login/                      # Auth pages
│   └── page.tsx                    # Landing page
├── components/
│   ├── ai-elements/                # 40+ AI UI components
│   │   ├── message.tsx
│   │   ├── prompt-input.tsx
│   │   ├── toolbar.tsx
│   │   └── ...
│   ├── charts/                     # Financial charts
│   ├── ui/                         # shadcn/ui components
│   └── auth/                       # Auth components
├── lib/
│   ├── agent.ts                    # AI agent with 8 tools
│   ├── auth.ts                     # Better Auth config
│   ├── models.ts                   # AI provider setup
│   ├── chat-db.ts                  # Chat persistence (SQLite)
│   ├── financial-context.ts        # Load/format financial data
│   └── kimi-provider.ts            # Kimi/ProxyPal providers
└── hooks/                          # Custom React hooks

data/                               # Static JSON data
├── history.json                    # Transaction history
├── inversions.json                 # Investment portfolio
├── objectives.json                 # Financial goals
├── restaurants.json                # Restaurant data
├── clothe.json                     # Clothing stores
└── drinks.json                     # Bars/pubs

sqlite.db                           # SQLite database (auto-created)
```

## How It Works

### Data Flow

1. **Financial Data** → Stored in `/data/*.json` files
2. **Financial Context** → `financial-context.ts` loads and caches data
3. **Chat Request** → User sends message
4. **Context Injection** → Current financial snapshot added to prompt
5. **AI Processing** → ToolLoopAgent decides which tools to call
6. **Tool Execution** → Agent queries relevant data via tools
7. **Response** → AI generates personalized answer with real numbers
8. **Persistence** → Chat history saved to SQLite

### AI Tools

The agent has access to 8 tools in `src/lib/agent.ts`:

| Tool | Purpose |
|------|---------|
| `getTransactionHistory` | Query income/expenses with filters |
| `getPortfolio` | Investment portfolio analysis |
| `getGoals` | Financial goals lookup |
| `analyzeSpending` | Spending pattern analysis |
| `getFinancialAdvice` | Generate personalized recommendations |
| `getRestaurants` | Local dining within budget |
| `getClothingStores` | Shopping suggestions |
| `getDrinkPlaces` | Entertainment options |

### Chat System

Located in `src/app/api/chat/route.ts`:

```typescript
// 1. Load previous messages from SQLite
const previousMessages = await loadMessages(chatId);

// 2. Get current financial context
const financialContext = await getCachedFinancialContext();

// 3. Create agent with model and context
const agent = createPersonalAdvisorAgent(model, contextString);

// 4. Stream response
return createAgentUIStreamResponse({ agent, uiMessages, onFinish });
```

### Authentication

Better Auth is configured in `src/lib/auth.ts`:

```typescript
export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: { enabled: true },
});
```

- SQLite stores users, sessions, and chat data
- Protected routes check session with `auth.api.getSession()`

## Customizing Data

Edit files in `/data/` to use your own financial information:

### Transaction History (`history.json`)
```json
[
  {
    "id": 1,
    "type": "Income",
    "name": "Salary",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-01-15"
  },
  {
    "id": 2,
    "type": "Expense",
    "name": "Grocery Store",
    "category": "Food",
    "amount": 150.50,
    "date": "2024-01-16"
  }
]
```

### Investment Portfolio (`inversions.json`)
```json
{
  "portfolio_summary": {
    "total_invested": 10000,
    "current_value": 12500,
    "total_profit_loss": 2500,
    "total_profit_loss_percentage": 25,
    "currency": "USD"
  },
  "asset_allocation": [...],
  "positions": [...],
  "historical_evolution_6m": [...]
}
```

### Financial Goals (`objectives.json`)
```json
{
  "personal_goals": [
    {
      "category": "Travel",
      "items": [
        {
          "name": "Trip to Japan",
          "description": "2 weeks in Tokyo and Kyoto",
          "reference_price": 3500,
          "currency": "USD"
        }
      ]
    }
  ]
}
```

## Adding New AI Tools

1. Define the tool in `src/lib/agent.ts`:

```typescript
export const myNewTool = tool({
  description: "What this tool does and when to use it",
  inputSchema: z.object({
    param: z.string().describe("Description of parameter"),
  }),
  execute: async ({ param }) => {
    // Load data, process, return result
    const data = await loadSomeData();
    return { result: data };
  },
});
```

2. Add to the agent:

```typescript
return new ToolLoopAgent({
  model: getModel(modelId),
  instructions,
  tools: {
    // ... existing tools
    myNewTool: myNewTool,
  },
});
```

## Development

```bash
# Development server
bun dev

# Linting
bun lint

# Production build
bun run build

# Inspect SQLite database
sqlite3 sqlite.db ".tables"
sqlite3 sqlite.db ".schema"
sqlite3 sqlite.db "SELECT * FROM message LIMIT 10;"
```

## Troubleshooting

### " BETTER_AUTH_SECRET is required"

You need to generate a secret key:
```bash
openssl rand -hex 32
```

Copy the output and add it to `.env.local` as `BETTER_AUTH_SECRET`.

### Database tables not created

If you get errors about missing tables:

1. Check if `sqlite.db` exists: `ls -la sqlite.db`
2. If it exists but has no tables, delete it and restart:
   ```bash
   rm sqlite.db
   bun dev
   ```
3. The tables will be created automatically when:
   - Better Auth first initializes (on first auth operation)
   - `chat-db.ts` is imported (happens on first chat API call)

### "Cannot find module 'better-sqlite3'"

Better SQLite3 requires native compilation. If installation fails:

```bash
# On macOS with Homebrew
brew install sqlite3

# Then reinstall dependencies
rm -rf node_modules
bun install
```

## Deployment

### Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
   - `NEXT_PUBLIC_BETTER_AUTH_URL`
   - `GEMINI_API_KEY` (or your chosen provider)

**Important:** SQLite is file-based and won't persist across serverless function invocations on Vercel. For production:
- Use PostgreSQL with Better Auth
- Or deploy to a server with persistent storage

## Current Limitations

- **Static Data:** Uses JSON files, not live bank APIs
- **SQLite:** File-based database not suitable for multi-user production
- **Single User:** Designed for personal use/demo purposes
- **No Bank Connections:** This is a demo, not a real fintech product

## Potential Improvements

- [ ] Connect to real bank APIs (Plaid, TrueLayer, GoCardless)
- [ ] Migrate to PostgreSQL for multi-user support
- [ ] Add CSV/Excel import for transactions
- [ ] Implement recurring transaction detection
- [ ] Add budget creation and tracking
- [ ] Mobile app with React Native
- [ ] Push notifications for spending alerts
- [ ] Export reports to PDF

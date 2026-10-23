# KiranaLoop

**Quick-commerce speed, from the kirana shop you already trust.**

KiranaLoop is an AI-powered hyperlocal commerce platform. Customers order groceries from neighbourhood kirana stores and get them delivered in minutes. Store owners get a simple dashboard to manage stock and orders. AI works quietly in the background to make both sides smarter.

This is more than a visual clone of a quick-commerce app. The goal is a working platform that combines customer shopping, per-store inventory, order management and applied machine learning.

## Who it is for

- **Customers** find nearby shops, search for products, fill a basket and place an order.
- **Store owners** manage products, prices, stock and orders, and see what sells.
- **Delivery partners** receive assigned orders and update delivery progress.
- **The platform** forecasts demand, recommends restocking and supports natural-language shopping.

## Status

The project is at the start of Phase 3. The storefront is built on mock data; there is no backend yet.

| Phase | Scope | State |
| --- | --- | --- |
| 1. Frontend foundation | Landing page, categories, product cards, search box, basket | Done (mock data) |
| 2. Ecommerce workflows | Product detail, address selection, saved basket, checkout UI | Done (mock data) |
| 3. Backend and database | FastAPI endpoints and PostgreSQL models for stores, products, inventory, orders | Next |
| 4. Multi-store operations | Store-specific stock, serviceability, order assignment, delivery status | Planned |
| 5. AI capabilities | Demand forecasting, restocking recommendations, natural-language shopping | Planned |
| 6. Testing and deployment | Automated tests, security checks, observability, production deploy | Planned |

### What works today

- Responsive landing page for laptop and mobile, with a bottom tab bar on phones
- Product detail pages with price, savings, the selling shop and related items
- Basket drawer with quantity controls, saved in the browser
- Address book with validation and serviceable pincodes for Palakollu (534260), Yelamanchili (534268) and Narasapuram (534275) in West Godavari, Andhra Pradesh
- Checkout with delivery time, payment choice and an order summary grouped by shop
- Order confirmation page

### What is not built yet

- Backend, database and real inventory
- Payments. Online payment options in checkout are a preview, and no money moves.
- Login, the store-owner dashboard and delivery-partner tools
- AI features. The "usual basket" and the search hint are interface stand-ins.
- Automated tests and deployment

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| UI | shadcn/ui, Lucide icons, Sonner toasts |
| State and validation | Zustand, Zod |
| Backend (planned) | FastAPI, Python, Pydantic |
| Database (planned) | PostgreSQL |
| AI (planned) | Python, ML forecasting, LLM API |
| Payments (planned) | Razorpay test mode |
| Hosting (planned) | Vercel (frontend), Render (backend) |

## Getting started

You need Node.js 20 or later and npm.

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

Other commands, run from `frontend/`:

```bash
npm run build     # production build, includes a typecheck
npm run start     # serve the production build
npx tsc --noEmit  # typecheck only
```

No environment variables are needed yet. When the backend and Razorpay arrive, secrets belong in `.env` files, which are git-ignored. Never commit them.

## Project structure

```
kiranaloop/
├── README.md
└── frontend/
    └── src/
        ├── app/          Routes: landing, product/[id], checkout, order-confirmed
        ├── components/   landing, product, checkout, and shadcn ui primitives
        ├── lib/          Mock data, address validation, helpers
        └── store/        Zustand stores: basket, addresses, orders
```

A `backend/` folder will sit next to `frontend/` when Phase 3 starts.

## Design notes

- **Stock belongs to a shop.** A customer's address decides which shops can serve them, so inventory is modelled per store from the start.
- **One order can span several shops.** Checkout already groups items by shop, and the backend will split orders the same way.
- **Built for India.** Prices are in rupees, pincodes have 6 digits and mobile numbers have 10.
- **Mock data is the seam.** Components read products and stores through small functions in `frontend/src/lib/mock-data.ts`. The backend replaces those functions without rewriting the interface.

## Roadmap ideas beyond Phase 6

- Hindi and regional-language support for search and the storefront
- Real-time order tracking on a map
- Shop-owner onboarding that works from a phone

## Contributing

This is an early-stage project. Open an issue to discuss a change before sending a pull request. Run `npm run build` in `frontend/` before you push, and check any interface change in a browser at both phone and laptop widths.

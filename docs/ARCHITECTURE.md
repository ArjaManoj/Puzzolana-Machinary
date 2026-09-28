# PUZZOLANA MACHINERY - ENTERPRISE ARCHITECTURE SPECIFICATION

## 1. System Philosophy
The Puzzolana Machinery redevelopment is an enterprise industrial platform tailored specifically for aggregate producers, mining operators, road contractors, and infrastructure conglomerates.

### Core Architectural Pillars:
1. **Rule-Based Machinery Discovery**: Eliminates guesswork by matching raw material, feed size, output fraction, and capacity (TPH) to precise verified equipment.
2. **Machine-First Technical Deep Dive**: Multi-tab technical specification matrix with responsive desktop-table to mobile-sticky scrolling.
3. **Enterprise B2B Quotation Workflow**: Generates formatted reference tracking IDs (`PZQ-YYYY-XXXXXX`), customer receipt confirmation, and role-based sales alerts.
4. **Database-Driven Verified Truth**: All statistics, certifications, model specs, and case studies are backed by MongoDB schemas with draft-to-publish validation, preventing zero-value or placeholder metrics.
5. **Separation of Concerns**: Decoupled Express API with strict TypeScript contracts and Next.js 14 App Router optimized for Core Web Vitals and SEO.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend Framework** | Next.js 14+ (App Router) | Server Components, SEO dynamic metadata, instant page transitions |
| **Language** | TypeScript | Strict type safety for complex engineering specs and forms |
| **Styling** | Tailwind CSS + Vanilla CSS Tokens | Custom industrial design system (Safety Gold, Steel Slate, Charcoal) |
| **Iconography** | Lucide React | Lightweight, crisp, accessible industrial and UI icons |
| **Backend Framework** | Node.js + Express.js | Scalable, modular B2B REST API engine |
| **Database** | MongoDB Atlas with Mongoose ODM | Flexible schema validation for diverse machinery technical spec matrices |
| **Security** | Helmet, Rate-Limit, CORS, Bcrypt, JWT | Hardened API surface conforming to OWASP standards |
| **Validation** | Zod & Mongoose Validators | Dual-layer strict schema and payload verification |
| **Testing** | Jest, Supertest, React Testing Library | Comprehensive unit and integration verification |

---

## 3. High-Level Flow Diagram

```
[ Industrial Client / Visitor ]
              │
              ▼
[ Next.js 14 Frontend Application ] (Port 3000)
    │                  │                      │
    ├─ Static Pages    ├─ Interactive Tools    └─ B2B Quotations & Portals
    │  (SEO Cached)    │  • Machine Finder        • Quote Request (PZQ-XXXX)
    │                  │  • Multi-Model Compare   • Spare Parts Enquiry
    │                  │  • Spec Matrix Viewer    • Dealer Registration
    ▼                  ▼                      ▼
[ REST API Gateway / Express Engine ] (Port 5000)
    │
    ├── Middleware: Helmet, CORS, RateLimiter, JWT Auth Guard, Input Sanitizer
    ├── Controllers & Service Layer: Business Logic, Unique ID Generator
    └── Data Access Layer (Mongoose ODM)
              │
              ▼
[ MongoDB Database Cluster ]
    ├── products & productCategories
    ├── quoteEnquiries & sparePartsEnquiries
    ├── caseStudies & applications
    └── statistics & auditLogs
```

<p align="center">
  <a href="https://motion-films.vercel.app/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png" width="120" alt="React Logo" />
  </a>
</p>

<h1 align="center">Motin Films 🚀</h1>

<p align="center">
  Sistema Full Stack de captação e gestão de leads com com Next.js e Clean Architecture.
</p>

<p align="center">
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/alvarobraz/motion-films"/>

  <a href="https://nextjs.org/">
    <img alt="Made with Next.js" src="https://img.shields.io/badge/made%20with-next.js%2015-%23000000">
  </a>

  <a href="https://www.linkedin.com/in/alvarobraz/">
    <img alt="Made by alvarobraz" src="https://img.shields.io/badge/made%20by-alvarobraz-%237519C1">
  </a>

  <a href="https://github.com/alvarobraz/motion-films">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alvarobraz/motion-films">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/alvarobraz/motion-films">
</p>

---

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0; 
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#structure-estrutura">Estrutura</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requerimentos">Requerimentos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a>
</p>

<br>

## :dart: Sobre

O **Motin Films** é um mini-ecossistema desenvolvido para otimizar a conversão e gestão de clientes. O projeto consiste em uma **Landing Page de alta performance** para captação de leads e um **Dashboard Administrativo** seguro para controle de status, análise de métricas e arquivamento de contatos.

## :rocket: Tecnologias

O projeto utiliza as tecnologias mais modernas do ecossistema JavaScript/TypeScript, com foco em **SOLID** e **Clean Architecture**:

### Core & Frontend

- **Next.js 15 (App Router)** - SSR, ISR e Server Actions.
- **React 19** - UI moderna com hooks e componentes otimizados.
- **Tailwind CSS v4** - Estilização fluida e responsiva (Mobile-First).
- **Recharts** - Visualização de dados e métricas em tempo real.
- **Lucide React** - Iconografia leve e consistente.

### Backend & Segurança

- **Prisma ORM** - Modelagem de dados e Type-safe queries.
- **Zod** - Validação rigorosa de esquemas e contratos de dados.
- **Jose (JWT)** - Autenticação stateless segura e performática.
- **Bcryptjs** - Hashing de senhas para segurança de usuários admin.
- **Clean Architecture** - Separação clara entre Domínio, Aplicação e Infraestrutura.

## Estrutura

```
.
├── commitlint.config.js
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20260325194042_create_leads_table
│   │   │   └── migration.sql
│   │   ├── 20260326034149_add_status_and_one_to_one_relation
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts
├── public
│   ├── hero-bg.webp
│   ├── hero-video.mp4
│   ├── og-image.webp
│   └── projects
│       ├── biobio.webp
│       ├── lj-santos-a.webp
│       └── unifateb.webp
├── README.md
├── src
│   ├── app
│   │   ├── actions
│   │   │   ├── create-lead.ts
│   │   │   ├── lead-actions.ts
│   │   │   └── login-action.ts
│   │   ├── (admin)
│   │   │   ├── dashboard
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api
│   │   │   └── auth
│   │   │       └── logout
│   │   │           └── route.ts
│   │   ├── components
│   │   │   ├── dashboard
│   │   │   │   ├── leads-chart.tsx
│   │   │   │   └── ui
│   │   │   │       ├── confirm-modal.tsx
│   │   │   │       ├── conversion-card.tsx
│   │   │   │       ├── header.tsx
│   │   │   │       ├── lead-actions-buttons.tsx
│   │   │   │       ├── lead-card.tsx
│   │   │   │       ├── Pagination.tsx
│   │   │   │       └── search-leads.tsx
│   │   │   ├── layout
│   │   │   │   ├── footer.tsx
│   │   │   │   └── header.tsx
│   │   │   ├── sections
│   │   │   │   ├── contact-form-client.tsx
│   │   │   │   ├── contact-form.tsx
│   │   │   │   ├── hero-content.tsx
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── portfolio.tsx
│   │   │   │   └── portfolio-wrapper.tsx
│   │   │   └── ui
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── logout-button.tsx
│   │   │       ├── select-input.tsx
│   │   │       └── textarea.tsx
│   │   ├── favicon.ico
│   │   ├── hooks
│   │   │   ├── use-contact-form.ts
│   │   │   ├── use-lead-actions.ts
│   │   │   ├── use-login.ts
│   │   │   └── use-logout.ts
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── (public)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── services
│   │       └── admin
│   │           └── get-dashboard-stats.ts
│   ├── application
│   │   └── use-cases
│   │       ├── create-lead-use-case.ts
│   │       ├── delete-lead-use-case.ts
│   │       ├── get-dashboard-stats-use-case.ts
│   │       ├── login-use-case.ts
│   │       └── update-lead-status-use-case.ts
│   ├── domain
│   │   ├── repositories
│   │   │   ├── lead-repository.ts
│   │   │   └── user-repository.ts
│   │   └── services
│   │       └── auth-service.ts
│   ├── infra
│   │   ├── repositories
│   │   │   ├── prisma-lead-repository.ts
│   │   │   └── prisma-user-repository.ts
│   │   └── services
│   │       ├── bcrypt-service.ts
│   │       └── jwt-service.ts
│   ├── lib
│   │   ├── prisma.ts
│   │   ├── schemas.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   └── styles
│       └── globals.css
└── tsconfig.json

```

## :white_check_mark: Requerimentos

- [Node.js 20.19.3+](https://nodejs.org/)
- [PNPM](https://pnpm.io/) (Recomendado)
- Instância de Banco de Dados (PostgreSQL/MySQL)

## :checkered_flag: Começando

```bash
# Clone o projeto
$ $ git clone https://github.com/alvarobraz/motion-films

# Acesse a pasta
$ cd motion-films

# Instale as dependências
$ pnpm install

# Configure seu .env (DATABASE_URL, JWT_SECRET)
$ cp .env.example .env

# Sincronize o banco de dados
$ npx prisma migrate dev

# Inicie o servidor de desenvolvimento
$ pnpm dev

# O servidor estará disponível em http://localhost:3000.
```

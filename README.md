# Doc Gen

This is a full-stack document tool that provides various document management features, such as converting DOCX to PDF, downloading uploaded DOCX files, editing e-signing document templates, and circulating documents for e-signing. It is built as a monorepo using Turbo Repo, which helps manage multiple packages within a single repository.

## Features

- **Convert DOCX to PDF**: Easily convert DOCX files to PDF for better document compatibility.
- **Download Uploaded DOCX**: Download previously uploaded DOCX files from the server.
- **Edit E-Signing Doc Templates**: Modify e-signing document templates using docuseal/react.
- **Circulate Docs by Docuseal**: Share and circulate documents for e-signing through Docuseal integration.

## Technology Stack

### Backend (API Server)

- Nest.js
- AWS SDK (for S3 integration)
- Mongoose (for MongoDB)
- Axios

### Frontend (UI)

- Next.js
- SWR (Stale-While-Revalidate)
- Tailwind CSS
- docuseal/react (for e-signing)
- TypeScript

### Central Configurations

- `eslint-config-custom`: Centralized ESLint configuration.
- `tailwind-config`: Centralized Tailwind CSS configuration.
- `tsconfig`: Centralized TypeScript configuration.

### Shared UI Components

- `packages/ui`: A collection of shared React components.

## Installation

1. Clone this repository:

```bash
   git clone git@github.com:regahr/doc-gen.git
```

2. Install dependencies for both apps/api and apps/web (using yarn):

```bash
   cd ./doc-gen
   yarn
```

3. Install dependencies for both apps/api and apps/web (using yarn):

```bash
   cd ./doc-gen
   yarn dev
```

4. Open your browser and access the web application at `http://localhost:3000`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

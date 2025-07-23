# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Docusaurus-based documentation site for a workshop on building multimodal PDF agents with n8n, MongoDB Atlas, and Voyage AI. The site serves as educational content for workshop participants working in GitHub Codespaces.

## Development Commands

### Local Development
```bash
npm install          # Install dependencies
npm start           # Start dev server (accessible on 0.0.0.0:3000)
npm run build       # Build for production
npm run serve       # Serve built site (accessible on 0.0.0.0:3000)
```

### Workshop-Specific Commands
```bash
npm run workshop:setup    # Run setup script from .devcontainer/
npm run workshop:start    # Start Docker services and dev server
npm run workshop:stop     # Stop Docker services
npm run workshop:restart  # Restart Docker services
npm run workshop:logs     # View Docker service logs
npm run workshop:reset    # Reset Docker services (removes volumes)
npm run dev               # Start both docs site and Docker services
npm run test:services     # Test workshop services
```

### Other Commands
```bash
npm run clear             # Clear Docusaurus cache
npm run deploy           # Deploy to GitHub Pages
npm run swizzle          # Customize Docusaurus components
```

## Architecture

### Site Structure
- **docs/** - Workshop tutorial pages (MDX format, auto-generated sidebar)
- **src/components/** - Custom React components (BrowserWindow, Screenshot, Link)
- **src/pages/** - Custom pages (homepage, helloWorld)
- **static/** - Static assets (images, PDFs, upload interface HTML)
- **docusaurus.config.js** - Main site configuration

### Key Configuration
- **Workshop Name**: `multimodal-pdf-agent-n8n`
- **Organization**: `mongodb-developer`
- **Deployment**: Configured for both GitHub Pages and Vercel
- **Features**: Mermaid diagrams, search (Lunr), internationalization (en/es)
- **Codespaces Support**: Dynamic URL configuration for port forwarding

### Content Organization
Tutorial content follows numerical naming (10-intro.mdx, 20-prerequisites.mdx, etc.) for ordered presentation. The sidebar is auto-generated from the docs/ folder structure.

### Deployment Targets
- **Vercel**: Configured via vercel.json with npm build command
- **GitHub Pages**: Configured for gh-pages deployment branch
- **Codespaces**: Dynamic URL handling for development environment

## Custom Components
- **BrowserWindow**: Simulates browser interface for screenshots
- **Screenshot**: Displays workshop screenshots
- **Link**: Enhanced link component
- **MDXComponents**: Custom MDX component mappings
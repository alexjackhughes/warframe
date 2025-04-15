# Warframe Terminal

A modern, AI-powered terminal interface. This project provides a sleek and intuitive terminal-like experience for interacting with AIs the way you imagined them.

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Animations**: Tailwind Animate
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alexjackhughes/warframe
cd warframe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
└── styles/          # Global styles and Tailwind configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is released into the public domain under the [Unlicense](https://unlicense.org/). You are free to use, modify, distribute, and sell this software for any purpose, with or without attribution.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - The unstyled, accessible component library

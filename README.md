# 🎲 Soc Ops

### Social Bingo for Real-World Connections

Break the ice at your next meetup, conference, or team event with an interactive bingo game that gets people talking! Find someone who matches each prompt, mark your square, and race to get 5 in a row.

---

## ✨ Features

🎯 **Interactive Gameplay** — Tap squares to mark them as you meet people  
🎊 **Win Detection** — Automatic celebration when you complete a row, column, or diagonal  
💾 **Auto-Save Progress** — Your board persists in localStorage  
📱 **Mobile-Friendly** — Responsive design works on any device  
🎨 **Customizable** — Easy to modify questions and styling  
🚀 **Zero Backend** — Pure frontend app, deploys to GitHub Pages

## 🎮 Try It Live

**👉 [Play Demo](https://zsinkob.github.io/vscode-lab/)**

The game deploys automatically to GitHub Pages on every push to `main`.

## 🛠️ Tech Stack

Built with modern web technologies:
- **React 19** with TypeScript
- **Vite** for lightning-fast builds
- **Tailwind CSS v4** for styling
- **Vitest** for testing
- **GitHub Actions** for CI/CD

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

**Prerequisites:** [Node.js 22](https://nodejs.org/) or higher

## 📚 Workshop Lab

This project doubles as a hands-on VS Code Agent workshop! Learn how to use AI coding assistants effectively.

👉 **[Follow the Lab Guide](.lab/GUIDE.md)** for a 1-hour interactive tutorial covering:
- Context engineering and workspace instructions
- Custom agents and TDD workflows  
- Design-first frontend development
- Multi-agent task orchestration

## 🎨 Customization

Want to make it your own? The codebase is designed for easy customization:

- **Questions**: Edit `src/data/questions.ts`
- **Colors & Theme**: Modify `src/index.css` with Tailwind v4 tokens
- **Game Logic**: Pure functions in `src/utils/bingoLogic.ts`

See [copilot-instructions.md](.github/copilot-instructions.md) for architecture details.

## 📄 License

MIT — See [LICENSE](LICENSE) for details

---

Made with ❤️ by [Harald Kirschner](https://github.com/digitarald) and the VS Code team

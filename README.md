## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS or higher)

### Installation

1. **Clone the repository**

2. **Install dependencies**

   ```bash
   npm i
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

That's it! Your application will launch in development mode with hot reloading enabled.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the app in development mode with hot reloading |
| `npm run package` | Package the app for the current platform |
| `npm run make` | Create distributable packages for the current platform |
| `npm run publish` | Publish the app (configure publishers in forge.config.ts) |

## 🔧 Configuration

### Customizing the Build

The project uses Electron Forge for building and packaging. You can customize the build process by modifying:

- **`forge.config.ts`** - Main Forge configuration
- **`config/vite.*.config.ts`** - Vite configurations for different processes
- **`package.json`** - Scripts and metadata

### Adding New Features

The boilerplate is designed to be easily extensible:

1. **New UI Components** - Add to `src/app/components/`
2. **New Screens** - Add to `src/app/screens/`
3. **IPC Channels** - Define in `src/channels/` and handle in `src/ipc/`
4. **Styling** - Use TailwindCSS classes in your components or create custom styles in `src/app/styles/`

## 📄 License

This project is licensed under the [MIT License](./LICENSE) - feel free to use it for your own projects!

This project uses [Reactronite](https://github.com/flaviodelgrosso/reactronite) template, so a special thanks to [Flavio Del Grosso](https://github.com/flaviodelgrosso)!
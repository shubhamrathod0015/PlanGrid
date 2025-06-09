# 📋 PlanGrid

A lightweight, responsive Plan board application built with React, Redux Toolkit, and react-beautiful-dnd. This project provides a Trello-like task management interface with intuitive drag-and-drop functionality for organizing workflow and tracking project progress.

![PlanGrid Screenshot](https://via.placeholder.com/800x400?text=PlanGrid+Screenshot)

## ✨ Features

- **🔄 Intuitive Drag & Drop Interface**: Easily move cards between lists
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🌓 Dark Mode Support**: Toggle between light and dark themes
- **💾 Persistent Storage**: Automatically saves your board state to localStorage
- **⚙️ CRUD Operations**: Create, read, update, and delete lists and cards
- **🏷️ Custom Labels**: Add labels to cards for better organization
- **🎨 Modern UI**: Clean, minimalist interface with smooth animations

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/shubhamrathod0015/PlanGrid.git

# Navigate to the project directory
cd PlanGrid

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

## 🔧 Usage

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
bun dev

# Build for production
npm run build
# or
yarn build
# or
bun run build
```

Once the development server is running, you can access the application at `http://localhost:5173/`.

## 💻 Technologies Used

- **⚛️ React**: UI library for building the user interface
- **🔄 Redux Toolkit**: State management
- **👆 react-beautiful-dnd**: Drag and drop functionality
- **🎨 Tailwind CSS**: Utility-first CSS framework for styling
- **⚡ Vite**: Fast build tool and development server

## 📁 Project Structure

```
src/
├── app/
│   └── store.js              # Redux store configuration
├── components/
│   ├── Board/                # Board components
│   ├── List/                 # List components
│   ├── Card/                 # Card components
│   └── UI/                   # Reusable UI components
├── features/
│   ├── board/                # Board state management
│   └── theme/                # Theme state management
├── utils/                    # Utility functions
├── App.jsx                   # Root component
└── index.jsx                 # Entry point
```

## 🌟 Features in Detail

### 📝 Lists

- Create new lists
- Rename existing lists
- Delete lists with confirmation dialog
- Automatic scrolling for many lists

### 📑 Cards

- Create new cards within any list
- Edit card content and labels
- Move cards between lists via drag and drop
- Delete cards with confirmation dialog

### 🎭 Theming

- Light and dark mode support
- System preference detection
- Persistent theme preference

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for the drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
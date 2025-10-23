# 🌸 Quiz PuriToro 🌸

A cute, pastel-themed quiz application built with React + TypeScript. Choose between options A or B for 10 rounds of adorable images!

## ✨ Features

- **Three Beautiful Screens**: Title, Game, and Result screens with smooth transitions
- **10 Random Images**: Each quiz session shows 10 randomly selected images from a pool of 20 (no duplicates)
- **A/B Choice Gameplay**: Simple and intuitive - just choose A or B for each image
- **Cute Pastel UI**: Soft colors, rounded buttons, and delightful animations
- **Image Preloading**: All images preloaded to prevent flicker during gameplay
- **Progress Tracking**: Visual progress bar shows your current round
- **Score Results**: See your preference breakdown at the end

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. Click "Start Quiz" on the title screen
2. View the image and choose option A or B
3. Repeat for 10 rounds
4. See your results and play again!

## 🏗️ Project Structure

```
Quiz_PuriToro/
├── public/
│   └── images/          # 20 SVG images with pastel colors
├── src/
│   ├── screens/         # Title, Game, Result screens
│   ├── hooks/           # Custom React hooks (useGameState)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions (image handling)
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
```

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

## 🎨 Design Features

- Gradient backgrounds with pastel colors
- Rounded buttons with hover effects
- Smooth fade-in and slide-in animations
- Bounce-in effects for titles
- Progress bars with smooth transitions
- Responsive design

## 📝 License

This project is open source and available for personal and educational use.

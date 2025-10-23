# 🐾 クイズにゃんトロ 🐾

React + TypeScript で作られた、かわいいパステルテーマのクイズアプリケーションです。10ラウンドの可愛い画像に対して、AかBかを選びましょう！

## ✨ 特徴

- **3つの美しい画面**: タイトル、ゲーム、リザルト画面がスムーズに遷移
- **ランダム10枚の画像**: 20枚の画像プールから10枚がランダムに選択（重複なし）
- **A/Bの選択ゲームプレイ**: シンプルで直感的 - 各画像に対してAかBを選ぶだけ
- **正誤判定機能**: 各画像には正解があり、あなたの回答が正しいかどうかを判定
- **正解数の表示**: リザルト画面で総正解数を確認できます
- **かわいいパステルUI**: ソフトな色、丸いボタン、楽しいアニメーション
- **猫テーマ**: 猫耳、肉球アイコン、にゃんにゃんモチーフの可愛いデザイン 😺
- **画像プリロード**: すべての画像を事前読み込みして、ゲームプレイ中のちらつきを防止
- **進行状況トラッキング**: ビジュアル進行バーで現在のラウンドを表示
- **スコア結果**: スコアに基づいた条件付きメッセージと画像を最後に表示

## 🚀 はじめ方

### 前提条件

- Node.js 18+ 
- npm 8+

### インストール

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# プロダクション用にビルド
npm run build

# プロダクションビルドをプレビュー
npm run preview
```

## 🎮 遊び方

1. タイトル画面で「スタート」ボタンをクリック
2. 画像を見て、選択肢AまたはBを選ぶ
3. 10ラウンド繰り返す
4. 結果を確認して、もう一度プレイ！

## 🖼️ 画像の追加方法

ゲームで使用する画像は以下のフォルダに配置してください：

```
public/images/
```

**重要**: 
- 画像ファイルは `image1.svg`, `image2.svg`, ..., `image20.svg` のように連番で命名してください
- 現在のシステムは20枚の画像をサポートしています
- 画像を追加または変更した場合は、`src/data/imageAnswers.ts` ファイルで各画像の正解（AまたはB）を設定してください
- 形式: SVG（推奨）または PNG/JPG も使用可能

例：
```typescript
// src/data/imageAnswers.ts
export const IMAGE_ANSWERS: Record<number, 'A' | 'B'> = {
  1: 'A',  // image1.svg の正解は A
  2: 'B',  // image2.svg の正解は B
  // ... 他の画像も同様に設定
};
```

## 🏗️ プロジェクト構造

```
Quiz_PuriToro/
├── public/
│   └── images/          # 20枚のSVG画像（パステルカラー）
│                        # ★ここに画像を追加してください ★
├── src/
│   ├── screens/         # タイトル、ゲーム、リザルト画面
│   ├── hooks/           # カスタムReactフック（useGameState）
│   ├── types/           # TypeScript型定義
│   ├── utils/           # ユーティリティ関数（画像処理）
│   ├── data/            # 画像の正解データ
│   ├── App.tsx          # ルーティングを含むメインアプリ
│   └── main.tsx         # エントリーポイント
```

## 🛠️ 使用技術

- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **React Router** - ナビゲーション
- **Vite** - ビルドツールと開発サーバー
- **CSS3** - アニメーション付きスタイリング

## 🎨 デザイン機能

- パステルカラーのグラデーション背景
- ホバーエフェクト付きの丸いボタン
- スムーズなフェードインとスライドインアニメーション
- タイトルのバウンスインエフェクト
- スムーズな遷移を持つ進行バー
- 猫耳装飾と肉球アイコン 🐾
- フローティング猫マスコット 😺
- 正解数に応じた条件付き結果画像
- レスポンシブデザイン

## 📝 ライセンス

このプロジェクトはオープンソースで、個人利用および教育目的で利用可能です。

---

# 🌸 Quiz PuriToro 🌸

A cute, pastel-themed quiz application built with React + TypeScript. Choose between options A or B for 10 rounds of adorable images!

## ✨ Features

- **Three Beautiful Screens**: Title, Game, and Result screens with smooth transitions
- **10 Random Images**: Each quiz session shows 10 randomly selected images from a pool of 20 (no duplicates)
- **A/B Choice Gameplay**: Simple and intuitive - just choose A or B for each image
- **Answer Judging**: Each image has a correct answer, and the game judges whether your answer is correct
- **Correct Count Display**: See your total correct answers on the Result screen
- **Cute Pastel UI**: Soft colors, rounded buttons, and delightful animations
- **Cat Theme**: Cat ears, paw icons, and meow motif for extra cuteness 😺
- **Image Preloading**: All images preloaded to prevent flicker during gameplay
- **Progress Tracking**: Visual progress bar shows your current round
- **Score Results**: Conditional messages and images based on your final score

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

## 🖼️ How to Add Images

Place your images in the following folder:

```
public/images/
```

**Important**: 
- Name image files sequentially: `image1.svg`, `image2.svg`, ..., `image20.svg`
- The current system supports 20 images
- When adding or changing images, set the correct answer (A or B) for each image in `src/data/imageAnswers.ts`
- Format: SVG (recommended) or PNG/JPG also work

Example:
```typescript
// src/data/imageAnswers.ts
export const IMAGE_ANSWERS: Record<number, 'A' | 'B'> = {
  1: 'A',  // Correct answer for image1.svg is A
  2: 'B',  // Correct answer for image2.svg is B
  // ... configure other images similarly
};
```

## 🏗️ Project Structure

```
Quiz_PuriToro/
├── public/
│   └── images/          # 20 SVG images with pastel colors
│                        # ★ ADD YOUR IMAGES HERE ★
├── src/
│   ├── screens/         # Title, Game, Result screens
│   ├── hooks/           # Custom React hooks (useGameState)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions (image handling)
│   ├── data/            # Image correct answer data
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
- Cat ears decoration and paw icons 🐾
- Floating cat mascot 😺
- Conditional result images based on score
- Responsive design

## 📝 License

This project is open source and available for personal and educational use.

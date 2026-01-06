# Todo アプリケーション（Laravel 12 + Inertia + React/TypeScript）

<p align="left">
<img alt="Static Badge" src="https://img.shields.io/badge/wsl2-w?style=plastic&logo=linux&logoColor=000000&labelColor=%23FCC624&color=%23FCC624"> <img alt="Static Badge" src="https://img.shields.io/badge/ubuntu-u?style=plastic&logo=ubuntu&logoColor=%23ffffff&labelColor=%23E95420&color=%23E95420">
<img alt="Static Badge" src="https://img.shields.io/badge/alpine-l?style=plastic&logo=alpinelinux&logoColor=%23ffffff&labelColor=%230D597F&color=%230D597F">
<img alt="Static Badge" src="https://img.shields.io/badge/Docker-d?style=plastic&logo=docker&logoColor=%23ffffff&labelColor=%232496ED&color=%232496ED">
<img alt="Static Badge" src="https://img.shields.io/badge/Laravel12-l?style=plastic&logo=laravel&logoColor=%23ffffff&labelColor=%23FF2D20&color=%23FF2D20">
<img alt="Static Badge" src="https://img.shields.io/badge/Inertia.js-%20?style=plastic&logo=Inertia&logoColor=FFFFFF&labelColor=%239553E9&color=%239553E9">
<img alt="Static Badge" src="https://img.shields.io/badge/React-%20?style=plastic&logo=react&logoColor=%23000000&labelColor=%2361DAFB&color=%2361DAFB">
<img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-%20?style=plastic&logo=typescript&logoColor=%233178C6&labelColor=%23ffffff&color=%23ffffff">
<img alt="Static Badge" src="https://img.shields.io/badge/-fortify?style=plastic&logo=fortify&label=fortify&labelColor=c1c1c1&color=c1c1c1">
</p>

## プロジェクト概要
- Laravel 12 + React/TypeScript + Inertia.js で構築した学習用フルスタックアプリ
- WSL2 + Docker で Backend/Frontend を分離したマルチコンテナ構成
- Todo 管理 + カレンダー表示機能を実装、SPA体験を学習
※Todo 管理 + カレンダー表示機能を実装、SPA体験を学習

## 学習・検証目的
- Laravel と React の最適な組み合わせ・データ受け渡し方法の理解  
- TypeScript によるフロントエンド型安全性の確保  
- サービス層（`app/Services`）での責務分離（SRP）の実践  
※LaravelからReactへデータ受渡しはTodo一覧のみで、カレンダーはTodo表示＋詳細画面遷移までを対象

## 主な機能
- ユーザー認証（Laravel Fortify）
- Todo CRUD機能
- カレンダー表示（締切日グルーピング）
- Inertia.js による SPA 遷移
- マルチコンテナ環境での独立した Backend/Frontend 管理

## 使用技術
| カテゴリ | 使用技術 |
| :--- | :--- |
| **Backend** | Laravel 12, Fortify, PHP_CodeSniffer, Debugbar |
| **Frontend** | React, TypeScript, Inertia.js, Vite, Tailwind CSS |
| **Infrastructure** | Docker Compose (App / Node / MySQL / Nginx) |
| **OS Environment** | WSL2 (Ubuntu / Alpine Linux) |
| **Database** | MySQL 8.x |

## マルチコンテナ分離構成 (Separation of Concerns)
各サービスの責務を分離したコンテナ管理を行っています。
- **App Container (PHP-FPM/Alpine)**: ビジネスロジックおよびサーバーサイド処理を担当。
- **Node Container (Vite)**: フロントエンドのビルドおよびホットリロードを担当。
- **DB Container (MySQL)**: データの永続化を担当。

## 設計・実装の特徴
- **サービス層での責務分離**  
  → コントローラは入力受付とレスポンス返却に集中。テスト容易性と保守性向上  
- **型安全性重視**  
  → TypeScript + 型定義ファイルによりフロントエンドバグを抑制  
- **再利用性の高い UI コンポーネント設計**  
  → `resources/ts/Components` に汎用コンポーネントを配置  
- **将来拡張可能なカレンダー設計**  
  → 日付クリックで作成/編集機能を追加可能（現状未実装）

## 主要ディレクトリ構成
- **`app/Services/`** : ビジネスロジック集約（カレンダー生成・Todo操作）  
- **`app/Actions/Fortify/`** : 認証ロジックカスタマイズ  
- **`resources/ts/`** : React/TypeScript フロントエンド資産  
  - `Components/`: 再利用可能UI  
  - `Pages/`: Inertia.js ページビュー  
  - `types/`: 型定義  
- **`lang/ja/`** : 日本語化（バリデーション・認証エラーなど）

## セットアップ手順

### 1. インフラのビルドと起動
```bash
docker compose build
docker compose up -d
```

### 2. バックエンドの初期化
```
docker compose exec app ash
composer install
php artisan migrate
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```
### 3. フロントエンドの起動
```
docker compose exec node sh
npm install
npm run dev
``` 

## 今後の改善予定

- カレンダー UI の改善（セルクリックで Todo 作成/編集画面遷移）
- Service 層のテスト拡充
- UX向上（ドラッグ＆ドロップやモバイル対応）

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
本リポジトリは、WSL2上のDocker環境において、**Backend(PHP)とFrontend(Node.js)を独立したコンテナとして稼働**させたフルスタック・アプリケーションです。

Inertia.jsを採用することで、サーバーサイドでのルーティング制御とReactによるSPAの操作性を両立させています。

## このアプリケーションの目的
本アプリケーションは、**「Laravelをバックエンドとしつつ、フロントエンドにReactをどのように最適に組み込むか」**を学習・検証することを主目的としています。特に以下の点を重視した設計を行っています。
Todo の編集・状態管理は React 主導になるため、詳細表示までを対象としています。

- **脱Blade構成**: Inertia.jsを用いてLaravelとReactを密結合させ、モダンな開発フローを実現。
- **責務の分離**: Controller / Service / Frontend 間での明確な責務分離と効率的なデータ受け渡し。
- **フレームワークの活用**: Laravelの強力な認証（Fortify）・ルーティングを活かしつつ、フロントエンドをReactで構築。
- **型安全性の担保**: React + TypeScript による、ランタイムエラーを抑制する堅牢なフロントエンド実装。


*※Todo管理やカレンダー表示機能は、これらのアーキテクチャを実践的に検証するための題材として実装しています。*

## 使用技術
| カテゴリ | 使用技術 |
| :--- | :--- |
| **Backend** | Laravel 12, Fortify, PHP_CodeSniffer, Debugbar |
| **Frontend** | React, TypeScript, Inertia.js, Vite, Tailwind CSS |
| **Infrastructure** | Docker Compose (App / Node / MySQL / Nginx) |
| **OS Environment** | WSL2 (Ubuntu / Alpine Linux) |
| **Database** | MySQL 8.x |

## 主な機能
- **ユーザー認証**: Laravel Fortifyを用いたセキュアな認証基盤。
- **Todo管理**: 作成 / 編集 / 削除の基本CRUD機能。
- **カレンダー連携**: 締切日でグルーピングしたカレンダー表示（`CreateCalendarService`による実装）。
- **シームレスな遷移**: APIとInertiaを使ったシングルページアプリケーション体験。

## マルチコンテナ分離構成 (Separation of Concerns)
各サービスの責務を分離したコンテナ管理を行っています。
- **App Container (PHP-FPM/Alpine)**: ビジネスロジックおよびサーバーサイド処理を担当。
- **Node Container (Vite)**: フロントエンドのビルドおよびホットリロードを担当。
- **DB Container (MySQL)**: データの永続化を担当。

## 主要ディレクトリ構成

本プロジェクトでは、メンテナンス性と拡張性を考慮し、以下のディレクトリ構成に重点を置いて設計しています。

- **`app/Services/`** : **[最重要] ビジネスロジックの集約**
  - `CreateCalendarService.php`: カレンダー生成ロジック。
  - `TodoService.php`: Todo操作（CRUD）の集約。
  - *意図: Controllerからロジックを分離し、単体テストの容易性とコードの再利用性を高めています。*

- **`app/Actions/Fortify/`** : **認証ロジックのカスタマイズ**
  - Fortifyを利用したヘッドレス認証の具体的な振る舞いを定義。
  - *意図: 標準の認証機能を実務要件に合わせて柔軟に拡張しています。*

- **`resources/ts/`** : **フロントエンド資産（React/TypeScript）**
  - `Components/`: 再利用可能なUI部品。
  - `Pages/`: Inertia.jsを介してレンダリングされる各ページビュー。
  - `types/`: TypeScriptによる型定義ファイル。
  - *意図: フロントエンドの型安全性を担保し、大規模開発に耐えうる構成にしています。*

- **`lang/ja/`** : **ローカライズ（日本語化）対応**
  - バリデーションメッセージ、認証エラー等の日本語化定義。
  - *意図: ユーザー体験（UX）を向上させるための細かな調整を徹底しています。*

## 設計方針
- **シンプルさと責務分離（SRP）**: ビジネスロジックを `app/Services` に集約し、  
コントローラは入力の受け取りとレスポンス返却に集中。これによりテスト容易性と保守性を向上させています。
- **型と安全性**: フロントエンドにTypeScriptを導入し、ランタイムでのバグ抑制を重視。
- **再利用性**: `TodoService`に処理をまとめ、将来的なAPI利用や別UIからの再利用を想定。
- **ユーザビリティ**: Inertia.jsにより、サーバーサイドの堅牢さを保ちつつ滑らかな画面遷移を実現。

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

- カレンダー UI の改善
- Service 層のテスト拡充

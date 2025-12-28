# Laravel+React  
## 環境  
<img alt="Static Badge" src="https://img.shields.io/badge/wsl2-w?style=plastic&logo=linux&logoColor=000000&labelColor=%23FCC624&color=%23FCC624"> <img alt="Static Badge" src="https://img.shields.io/badge/ubuntu-u?style=plastic&logo=ubuntu&logoColor=%23ffffff&labelColor=%23E95420&color=%23E95420">
<img alt="Static Badge" src="https://img.shields.io/badge/alpine-l?style=plastic&logo=alpinelinux&logoColor=%23ffffff&labelColor=%230D597F&color=%230D597F">  
<img alt="Static Badge" src="https://img.shields.io/badge/Docker-d?style=plastic&logo=docker&logoColor=%23ffffff&labelColor=%232496ED&color=%232496ED">
<img alt="Static Badge" src="https://img.shields.io/badge/Laravel12-l?style=plastic&logo=laravel&logoColor=%23ffffff&labelColor=%23FF2D20&color=%23FF2D20"> 
<img alt="Static Badge" src="https://img.shields.io/badge/NGINX-n?style=plastic&logo=nginx&logoColor=%23ffffff">
<img alt="Static Badge" src="https://img.shields.io/badge/MySQL-m?style=plastic&logo=mysql&logoColor=%23ffffff&labelColor=%234479A1&color=%234479A1">
<img alt="Static Badge" src="https://img.shields.io/badge/php-p?style=plastic&logo=php&logoColor=%23ffffff&labelColor=%23777BB4&color=%23777BB4">  
<img alt="Static Badge" src="https://img.shields.io/badge/bootstrap-b?style=plastic&logo=bootstrap&logoColor=%23ffffff&labelColor=%237952B3&color=%237952B3">
<img alt="Static Badge" src="https://img.shields.io/badge/tailwind-%20?style=plastic&logo=tailwindcss&logoColor=ffffff&color=%2306B6D4">
<img alt="Static Badge" src="https://img.shields.io/badge/npm-n?style=plastic&logo=npm&logoColor=%23ffffff&labelColor=%23CB3837&color=%23CB3837">  
<img alt="Static Badge" src="https://img.shields.io/badge/Inertia.js-%20?style=plastic&logo=Inertia&logoColor=FFFFFF&labelColor=%239553E9&color=%239553E9">
<img alt="Static Badge" src="https://img.shields.io/badge/JavaScript-%20?style=plastic&logo=javascript&logoColor=%23F7DF1E&labelColor=%23ffffff&color=%23ffffff">
<img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-%20?style=plastic&logo=typescript&logoColor=%233178C6&labelColor=%23ffffff&color=%23ffffff">  
<img alt="Static Badge" src="https://img.shields.io/badge/vite-v?style=plastic&logo=vite&logoColor=%23ffffff&labelColor=%23646CFF&color=%23646CFF">
<img alt="Static Badge" src="https://img.shields.io/badge/React-%20?style=plastic&logo=react&logoColor=%23000000&labelColor=%2361DAFB&color=%2361DAFB">
<img alt="Static Badge" src="https://img.shields.io/badge/-fotify?style=plastic&logo=fotify&label=fotify&labelColor=c1c1c1&color=c1c1c1">


## 概要  
#### Laravel12で下記環境を構築しています。
- HMR  
- Vite(TypeScript)  
- Inertia設定  
- nodeコンテナ別作成  

#### [環境手順はこちら](https://github.com/Demo-YH/Document/blob/master/laravel12_react_v1.md)  

## 参考  
#### [参考サイト:環境構築](https://qiita.com/daki/items/6a6a75a677c7bc583d38)  
#### [参考サイト:React](https://reffect.co.jp/laravel/laravel_inertia_js_react#i-7)

## 備考
#### 個人学習目的なのでコメントもそれに付随したものとなっています。  
#### 独学なので内容・動作の保証は不可、あくまで個人学習の範囲で試行錯誤したものとなっています。  

## 所感  
#### 変更をかけずに長期的に使える構成の検討は難しい
#### 必要なファイルと書き換える構成はなんとなく理解した。
#### 分けるものらしいけど、Larvelの中で共存しないとで辛い…
#### 本番環境では使えないとか…
#### 今回下記を初めて使用したコマンド少しだけ知識が増えた…今更だが便利！
```
php artisan tinker
```
#### ※今まで下記かlog直接見るを実施  
#### ※特にvar_dumpの使用を推奨された↓  
```
\Log::debug($test);
var_dump();
dd();
```
#### 実務使用経験あり  
```
tail -f
```

#### curlは存在は知っているが、コーディング中に使用初、実務では仕様調査の為に使用したのみ
| Command | Description |
| --- | --- |
| curl http\://localhost:xxxx | SSRサーバーが応答するか確認 |
| curl -X POST http\://localhost:xxxx/render -d '{"url":"/"}' | SSR出力を確認 |
  
#### サーバー設定でお世話になった方々
```
cat .env | grep VITE
ss -ltnp | grep
docker compose logs -f node
php artisan inertia:check-ssr
```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- CSRF --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @viteReactRefresh
    @vite('resources/ts/app.tsx')
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>

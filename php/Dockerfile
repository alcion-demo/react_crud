FROM php:8.4-fpm-alpine3.21

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apk add --no-cache vim curl zip unzip icu-dev git bash \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl pdo_mysql

WORKDIR /var/www/html

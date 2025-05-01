FROM node:22-alpine AS builder

ARG VITE_API_BASE_URL
ARG VITE_COUNTRY_API_URL

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_COUNTRY_API_URL=${VITE_COUNTRY_API_URL}

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM caddy:2.10.0-alpine

# Copy the Caddyfile
COPY ./Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist /srv/

EXPOSE 80
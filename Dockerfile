# Stage 1: Builder
FROM node:20.12.1-alpine3.19 AS builder

WORKDIR /opt

# Install dependencies and build the application
RUN apk update --no-cache \
  && apk add --no-cache libc6-compat python3 make g++ \
  && npm config set fetch-retries 5 \
  && npm config set fetch-retry-factor 10 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm config set registry https://registry.npmjs.org

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Runner
FROM node:20.12.1-alpine3.19 AS runner

ARG DB_TYPE
ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE
ARG NODE_ENV

ENV DB_TYPE=${DB_TYPE}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_DATABASE=${DB_DATABASE}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Create a non-root user and group
ARG USER=appuser
ARG GROUP=appgroup
ARG UID=1337
ARG GID=1337

RUN addgroup -g ${GID} ${GROUP} \
  && adduser -u ${UID} -G ${GROUP} -s /bin/sh -D ${USER}

# Copy only necessary files
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /opt/dist ./dist
COPY --from=builder /opt/entrypoint.sh ./

RUN chown -R ${USER}:${GROUP} . \
  && chmod +x ./entrypoint.sh

USER ${USER}

# Expose port
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

FROM node:22-alpine AS build
WORKDIR /app
# Le manifeste ET le lock : --frozen-lockfile exige la présence du lock
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
# Copier le reste du code
COPY . .
# Compiler AVANT de supprimer les devDependencies
RUN npm run build
# Alléger le stage de build
RUN npm prune --prod
FROM node:22-alpine
WORKDIR /src
ENV NODE_ENV=production
COPY src/package.json ./package.json
RUN npm install
COPY src ./
COPY public ./public
EXPOSE 3000
CMD ["npm","run","start"]
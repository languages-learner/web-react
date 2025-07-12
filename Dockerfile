FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

ENV NODE_ENV=production

CMD ["npm", "run", "preview"]

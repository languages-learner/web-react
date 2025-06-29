FROM node:20-alpine

WORKDIR /app

ARG BUNDLE_STATS_BASELINE=false
ENV BUNDLE_STATS_BASELINE=${BUNDLE_STATS_BASELINE}

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

RUN echo "BUNDLE_STATS_BASELINE is $BUNDLE_STATS_BASELINE"
RUN npm run build

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

CMD ["npm", "run", "preview"]

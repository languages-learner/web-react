FROM node:20-alpine

WORKDIR /app

ARG BUNDLE_STATS_BASELINE=false
ENV BUNDLE_STATS_BASELINE=${BUNDLE_STATS_BASELINE}

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN echo "BUNDLE_STATS_BASELINE is $BUNDLE_STATS_BASELINE"
RUN pnpm --filter app-web run build

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

CMD ["pnpm", "--filter", "app-web", "run", "preview"]

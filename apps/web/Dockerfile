FROM node:20-alpine

WORKDIR /app

ARG BUNDLE_STATS_BASELINE=false
ENV BUNDLE_STATS_BASELINE=${BUNDLE_STATS_BASELINE}

# Install pnpm
RUN npm install -g pnpm

# Copy root files required by pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Copy environment variables file (needed for build and runtime)
COPY .env ./

# Copy TypeScript configuration files needed for build
COPY tsconfig.base.json tsconfig.base.composite.json tsconfig.json ./

# Copy package.json files of all workspace packages for proper dependency resolution
# Using find to preserve directory structure
COPY packages packages/
COPY apps apps/

# Install dependencies (this will install all workspace dependencies)
# We copy everything first, then install - this allows pnpm to resolve workspace dependencies correctly
RUN pnpm install --frozen-lockfile

RUN echo "BUNDLE_STATS_BASELINE is $BUNDLE_STATS_BASELINE"
RUN pnpm --filter app-web run build

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

CMD ["pnpm", "--filter", "app-web", "run", "preview"]

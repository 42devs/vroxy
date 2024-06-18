ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-slim as base

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

ARG PORT=3001

WORKDIR /app
COPY . /app

FROM  base as prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile


FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


FROM base as prod
ENV PORT=$PORT
COPY --from=build /app/.output /app/.output
COPY --from=prod-deps /app/node_modules /app/node_modules

CMD [ "node", ".output/server/index.mjs" ]

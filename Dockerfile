FROM --platform=linux/amd64 node:22.5-alpine

WORKDIR /surim_site

COPY public /public
COPY src /src
COPY package*.json /
COPY next.config.mjs /
COPY postcss.config.mjs /
COPY tailwind.config.ts /
COPY tsconfig.json /

RUN npm install
RUN npm run build

CMD npm run start

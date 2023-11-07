FROM node:18

WORKDIR /app

ARG CODEARTIFACT_AUTH_TOKEN
ENV CODEARTIFACT_AUTH_TOKEN=${CODEARTIFACT_AUTH_TOKEN}

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY ./dist ./dist

COPY dist/main.js dist/server.js

COPY .env.* ./

EXPOSE 8080

CMD ["node", "dist/server.js"]

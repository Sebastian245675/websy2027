FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY db ./db
COPY src ./src
COPY scripts ./scripts
USER node
EXPOSE 4100
CMD ["node", "src/server.js"]

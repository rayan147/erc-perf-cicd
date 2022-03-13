# stage 1 buiding image
FROM  node:16.0.0 as builder
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2 run image
FROM  node:16.0.0 as runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD node ./dist/index.js 



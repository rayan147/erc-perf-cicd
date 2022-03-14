# stage 1 buiding image
FROM  node:17.0.0 as builder
WORKDIR /app
ENV NODE_ENV=production
ENV  S3_URL=${S3_URL}
COPY package*.json ./
RUN npm install
COPY . .


# stage 2 run image
FROM  node:17.0.0 
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder ./app /app/
CMD ["sh", "-c", "node index.js ${S3_URL}"] 



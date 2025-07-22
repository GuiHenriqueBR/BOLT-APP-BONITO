FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app/backend
CMD ["npm", "run", "start:dev"]
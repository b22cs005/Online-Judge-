FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++ gcc python3 py3-pip
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node","index.js"]

ENV MONGODB_URL=mongodb+srv://b22cs005:b22cs005@cluster0.0tmqsyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV PORT=5000
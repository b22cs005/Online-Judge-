FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++ gcc python3 py3-pip
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node","index.js"]

ENV google_client_id=250970997404-d2qbusipminjpo4nghrvo7s2o1huvbof.apps.googleusercontent.com
ENV google_client_secret=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
ENV database_name=b22cs005
ENV database_password=b22cs005
ENV TOKEN_KEY=TOKEN_KEY
ENV MONGODB_URL=mongodb+srv://b22cs005:b22cs005@cluster0.0tmqsyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV PORT=4000
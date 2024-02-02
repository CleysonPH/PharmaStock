FROM node:18.8.0-alpine

WORKDIR /app

COPY . .

ENV PORT=3000

EXPOSE ${PORT}

RUN npm install
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start"]
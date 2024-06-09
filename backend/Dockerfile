FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate && npx prisma migrate dev --name init

EXPOSE 3333

CMD ["npm", "run", "dev"]

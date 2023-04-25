FROM node:16-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
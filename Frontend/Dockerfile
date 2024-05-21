FROM node:21
WORKDIR /app
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
EXPOSE 5000 
CMD ["npm", "start"]



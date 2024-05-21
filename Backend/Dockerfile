FROM node:21
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ .
EXPOSE 5000 
CMD ["npm", "start"]


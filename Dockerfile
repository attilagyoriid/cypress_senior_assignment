FROM cypress/base:20.11.0

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install

CMD ["npm", "run", "cypress:run"]
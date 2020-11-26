# TypeScript Node.js Project

The purpose of this project is to develop an application which consume puppeteer to scrap the data from vivino.com and show the wines list to the user according to the parameter the user is sending as query parameters.

To run the project, please execute the following commands.

```
git clone https://github.com/faisalqburst/Node.js-exercise.git
```

```
npm install
```

To run the project from the command line, execute the following command.

```
npm i -g ts-node 
ts-node src/index.ts <wineName> <minRating> <maxRating> <minPrice> <maxPrice> <minNoRatings> <maxNoRatings>
```

Or if we need to run it on the browser, follow the below command.

```
npm run start dev
```


To test the application, please run the following command.

```
npm run test
```

The application has integration with swagger. To get the swagger document, please go to http://localhost:3000/api-docs/#/

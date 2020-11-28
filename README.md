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
ts-node src/index.ts --grapes=<grapeNames> --minRating=<minRating>  --minPrice=<minPrice> --maxPrice=<maxPrice> --minNoRatings=<minNoRatings> --maxNoRatings=<maxNoRatings> --wineStyles=<wineStyles> --foodPairings=<foodPairings> --countryCodes=<countryCodes> --regions=<regions> --wineTypes=<wineTypes> --orderBy=<orderBy> --order=<order>
```

grapes,wineStyles,foodPairings,countryCodes,regions, and wineTypes can take multiple entries separated by comma.

You can omit the parameters as well.

An example for the command is given below.

```
ts-node src/index.ts --grapes="malbec,merlot" --minRating=1 --minPrice=30 --maxPrice=40 --minNoRatings=10 --maxNoRatings=10000 --wineStyles="Argentinian Malbec,Spanish Red" --foodPairings="Poultry" --wineTypes="red,white"
```

Response will be in the format

```
[
    {
        title: string,
        vintage: number,
        averagePrice: number,
        currency: string,
        averageRating: number,
        numberOfRatings: number,
        imageUrl: string,
        region: string,
        country: string,
        bottleVolume: number,
        discountPercent: number
    }
]

Or if we need to run it on the browser, follow the below command.

```

npm run start dev

```

To test the application, please run the following command.

```

npm run test

```

The application has integration with swagger. To get the swagger document, please go to http://localhost:3000/api-docs/#/
```

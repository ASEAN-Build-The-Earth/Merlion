const countries = require("./countries");

const countriesObject = {};

countries.forEach(country => {
  countriesObject[country.Slug] = true
});

const FileSystem = require("fs");
FileSystem.writeFile('countries.json', JSON.stringify(countriesObject), (err) => {
  if (err) throw err;
});


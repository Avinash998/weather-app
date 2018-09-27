// console.log("Inside app.js");
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

const FtoD = f => {
	return ((f-32)*(5/9)).toPrecision(4);
};
const argv = yargs
			.options({
				'address':{
					alias: 'a',
					describe: 'detailed address',
					demandOption: true,
					string: true
				}
			})
			.help()
			.alias('help','h')
			.argv;

geocode.geocodeAddress(argv.address, (errorMessage,result) =>{
	if(errorMessage){
		console.log(errorMessage);
	}
	else{
		console.log(result.address);

		weather.getWeather(result.latitude,result.longitude, (errorMessage,weatherResults) => {
			if(errorMessage){
				console.log(errorMessage);
			}
			else{
				// console.log(JSON.stringify(weatherResults,undefined,2));
				console.log(`It's currently ${FtoD(weatherResults.temperature)} C. It feels like ${FtoD(weatherResults.apparentTemperature)} C.`);
			}
		});

	}
});


// https://api.darksky.net/forecast/4e92265d4c9bd703ef1a713cbf7ad64f/37.8267,-122.4233



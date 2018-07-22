const yargs = require('yargs');
const axios = require('axios');


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

	const encodedAddress = encodeURIComponent(argv.address);
	const encodedURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

	axios.get(encodedURL).then((response) => {

		if(response.data.status === 'ZERO_RESULTS'){
			throw new Error('Unable to find the address...');
		}

		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		let weatherURL = `https://api.darksky.net/forecast/4e92265d4c9bd703ef1a713cbf7ad64f/${lat},${lng}`;
		console.log(response.data.results[0].formatted_address);
		
		return axios.get(weatherURL);

	}).then((response) => {
		var temperature = FtoD(response.data.currently.temperature);
		var apparentTemperature = FtoD(response.data.currently.apparentTemperature);
		console.log(`It's currently ${temperature} C. It flles like  ${apparentTemperature} C.`);
	}).catch((e) => {
		if(e.code === 'ENOTFOUND'){
			console.log('Unable to connect to api server....');
		}
		else{
			console.log(e.message);
		}
	});


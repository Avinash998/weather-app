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
	// const encodedURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
	const encodedURL = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodedAddress}&app_id=HKEoyGBzCrMkIc9zFgMS&app_code=nUqh_eMcXRGh4mWRxxpiYw&gen=9`;
	axios.get(encodedURL).then((response) => {

		if(response.data.Response.View.length === 0){
			throw new Error('Unable to find the address...');
		}

		let lat = response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
		let lng = response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
		let weatherURL = `https://api.darksky.net/forecast/4e92265d4c9bd703ef1a713cbf7ad64f/${lat},${lng}`;
		console.log(response.data.Response.View[0].Result[0].Location.Address.Label);
		
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


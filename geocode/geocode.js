const request = require('request');


const geocodeAddress = (address , callback) => {

	const encodedAddress = encodeURIComponent(address);
	const encodedURL = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodedAddress}&app_id=HKEoyGBzCrMkIc9zFgMS&app_code=nUqh_eMcXRGh4mWRxxpiYw&gen=9`;
	console.log(encodedURL);

	request({
		url: encodedURL,
		json: true
	}, function (error,response,body){

		if(error){
			callback(`Unable to find Google Servers , Error message:  ${error}`);
		}
		else if(response.body.Response.View.length === 0){
			callback('Unable to find the address.');
		}
		else if(response.body.Response.View.length !== 0){
			callback(undefined, {
				address: response.body.Response.View[0].Result[0].Location.Address.Label,
				latitude: response.body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
				longitude: response.body.Response.View[0].Result[0].Location.DisplayPosition.Longitude

			});
		}
		else {
			callback('Other Error');
		}
	});

};

module.exports = {
	geocodeAddress
};
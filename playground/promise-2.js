const request = require('request');

const geocodeAddress = (address) => {
	return new Promise((resolve,reject) => {

		const encodedAddress = encodeURIComponent(address);
		const encodedURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
		console.log(encodedURL);

		request({
				url: encodedURL,
				json: true
			}, function (error,response,body){
				// console.log(JSON.stringify(body,undefined,2));
				// console.log(JSON.stringify(response.body,undefined,2));
				//console.log(JSON.stringify(error,undefined,2));
				if(error){
					reject(`Unable to find Google Servers , Error message:  ${error}`);
				}
				else if(body.status === 'ZERO_RESULTS'){
					reject('Unable to find the address.');
				}
				else if(body.status === 'OK'){
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng

					});
				}
				else {
					reject('Other Error');
				}
			});

	});
};

geocodeAddress('713321').then((res) => {
	console.log(JSON.stringify(res,undefined,2));
},(errrorMessage) => {
	console.log(`---------------`);
	console.log(errrorMessage);
});
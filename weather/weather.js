const request = require('request');

const getWeather = (lat,lng,callback) => {

	request({
	url: `https://api.darksky.net/forecast/4e92265d4c9bd703ef1a713cbf7ad64f/${lat},${lng}`,
	json: true
},function(error,response,body){
	if(error){
		callback(error);
	}

	else if(response.statusCode === 400){
		callback(body.error);
	}
	else if(response.statusCode === 200){
		callback(undefined , {
			temperature: body.currently.temperature,
			apparentTemperature: body.currently.apparentTemperature
		});
	}
	else{
		callback('Some other error');
		
	}
});

};

module.exports = {
	getWeather
};



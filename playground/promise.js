var asyncAdd = (a,b) => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			if(typeof a === 'number' && typeof b === 'number'){
				resolve(a+b);

			}
			else{
				reject('Type is not matching');		
			}
		},1500);
	});
};

asyncAdd(5,'7').then((res)=>{
	console.log(`Result : ${res}`);
	return asyncAdd(res, 37);
}).then((res) => {
	console.log(`Result should be something : ${res}`);
}).catch((errorMessage) => {
	console.log(errorMessage);
});

/*var somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Hey, It worked!');
		reject('Unable to fulfil promise.');
	},2500);
});

somePromise.then((message) => {
	console.log(`Success : ${message}`);
}, (errorMessage) => {
	console.log(`Error: ${errorMessage}`);
});*/
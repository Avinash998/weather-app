console.log('staring app');

setTimeout(() => {
	console.log('inside of callback');
},2000);

setTimeout(() => {
	console.log('2nd time out');
},0);

setTimeout(() => {
	console.log('3rd time out');
});

console.log('Finising app');
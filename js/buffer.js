var bytes = new Buffer(258);

for(var i = 0; i < bytes.length; i++){
	bytes[i] = i;
}

var end = bytes.slice(240, 258);

console.log(end);
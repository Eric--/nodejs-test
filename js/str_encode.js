
var buffer = new Buffer(16);
buffer.write("中国", "utf-8");
buffer.write("你好", 6, "utf-8");
console.log(buffer.toString("utf-8"));
buffer[0] = buffer[0] + 1;
console.log(buffer.toString("utf-8"));

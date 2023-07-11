const Responder = require("./server/responder");
const Requester = require("./server/requester");


const responder = new Responder(3);


const requester1 = new Requester('Requester1', 5);

const request1 = requester1.sendRequest('hey');
console.log(responder.newRequest(requester1, request1.requestId, request1.data));

const request2 = requester1.sendRequest('Request2');
console.log(responder.newRequest(requester1, request2.requestId, request2.data));

const request3 = requester1.sendRequest('Request3');
console.log(responder.newRequest(requester1, request3.requestId, request3.data));


responder.newRequest(requester1, 123, 'dummy1');
responder.newRequest(requester1, 234, 'dummy 2');
responder.newRequest(requester1, 14251, 'dummy3');

const request4 = requester1.sendRequest('Request4');
console.log(responder.newRequest(requester1, request4.requestId, request4.data));

const request5 = requester1.sendRequest('Request5');
console.log(responder.newRequest(requester1, request5.requestId, request5.data));


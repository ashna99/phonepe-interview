 const Request = require("./request");
 const requests = require("./requests");

class Responder {
    constructor(maxConcurrentRequests) {
      this.maxConcurrentRequests = maxConcurrentRequests;
      this.requestQueue = [];
      this.currentRequests = new Set();
    }
  
    newRequest(requester, requestId, data) {
      if (requester.quota === 0) {
        return 'Request rejected. Quota exceeded.';
      }
      requests[requestId] = new Request(requestId, data, requester);
      if (this.currentRequests.size >= this.maxConcurrentRequests || this.requestQueue.length > 0) {
        this.requestQueue.push({ requester, requestId });
        return 'Request queued.';
      }
  
      this.executeRequest(requester, requestId);
      return 'Request handled.';
    }
  
    executeRequest(requester, requestId) {
      this.currentRequests.add(requestId);
      requester.quota--;
      
      setTimeout(() => {
        const result = `Result for Request ${requestId}`;
        this.completeRequest(requestId, result);
        this.processQueue();
      }, 2000);
    }
  
    completeRequest(requestId, result) {
      this.currentRequests.delete(requestId);
      const request = requests[requestId];
      if (request) {
        console.log(`processed request with requestId ${requestId} ${request.data}`);
        request.setStatus('Completed');
        request.setResult(result);
      } 
    }
  
    processQueue() {
        while (this.currentRequests.size < this.maxConcurrentRequests && this.requestQueue.length > 0) {
          const { requester, requestId } = this.requestQueue.shift();
          this.executeRequest(requester, requestId);
        }
      }
    

    getRequestStatus(requestId) {
      if (requests[requestId]) {
        return requests[requestId].getStatus();
      } else {
        return 'Request not found.';
      }
    }
  
    cancelRequest(requestId) {
      if (requests[requestId]) {
        requests[requestId].setStatus('Cancelled');
        return 'Request cancelled.';
      } else {
        return 'Request not found.';
      }
    }

    getRequests(){
        return requests;
    }
  }

  module.exports = Responder;
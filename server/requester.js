const requests = require("./requests");

class Requester {
    constructor(requesterId, quota) {
      this.requesterId = requesterId;
      this.quota = quota;
      this.responder= Responder;
    }
  
    sendRequest(data) {
      const requestId = Math.random()
      return {requestId,data};
    }
  
   
    getUsageStats() {
      const totalRequests = Object.values(requests).filter((request)=> request.requesterId=== this.requesterId).length;
      const pendingRequests = Object.values(requests).filter(request => request.requesterId=== this.requesterId && request.getStatus() === 'Pending').length;
      const cancelledRequests = Object.values(requests).filter(request => request.requesterId=== this.requesterId && request.getStatus() === 'Cancelled').length;
  
      return {
        totalRequests,
        pendingRequests,
        cancelledRequests,
      };
    }
  }

  modules.export = Requester;
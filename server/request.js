class Request {
    constructor(requestId,data, requester) {
      this.requestId = requestId;
      this.status = 'Pending';
      this.result = null;
      this.data= data;
      this.requester= requester;
    }
  
    cancel() {
      this.status = 'Cancelled';
    }
  
    setStatus(status) {
      this.status = status;
    }
  
    setResult(result) {
      this.result = result;
    }
  
    getStatus() {
      return this.status;
    }
  
    getResult() {
      return this.result;
    }
  }

  module.exports = Request;
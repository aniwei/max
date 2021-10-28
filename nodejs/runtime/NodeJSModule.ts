
export class NodeJSModule {
  import (moduleId: string) {
    const req = new XMLHttpRequest();
    let response;
    
    req.responseType = 'text';
    req.open('get', moduleId, false);
    req.addEventListener('load', () => {
      const status = req.status;

      if (status === 200 || status === 304) {
        response = req.responseText;
      }
    });
    req.send(null);

    return response
  }
}


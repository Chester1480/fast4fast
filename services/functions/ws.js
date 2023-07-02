const { WebSocketServer } = require('ws');
const websocketIdsMap = new Map();

const wss = new WebSocketServer({
        port:3101,
        perMessageDeflate: {
          zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3
          },
          zlibInflateOptions: {
            chunkSize: 10 * 1024
          },
          // Other options settable:
          clientNoContextTakeover: true, // Defaults to negotiated value.
          serverNoContextTakeover: true, // Defaults to negotiated value.
          serverMaxWindowBits: 10, // Defaults to negotiated value.
          // Below options specified as default values.
          concurrencyLimit: 10, // Limits zlib concurrency for perf.
          threshold: 1024 // Size (in bytes) below which messages
          // should not be compressed if context takeover is disabled.
        }
});

wss.on('connection', function connection(ws,req) {
    // console.log(Object.keys(ws._sender))
    const id = req.url.split('/')[1];
    ws.id = id;
    websocketIdsMap.set(id, ws);
  
    ws.on('error', console.error);
    ws.on('message', function message(data) {
      
      try{
        const messageObject = JSON.parse(Buffer.from(data).toString());
        // messageObject.type 0:private 1:public 
        // messageObject.message
        // messageObject.senderId  0:主機
        // messageObject.acceptId  

        //私密 取得對方ID
        if (messageObject.type == 0) {
          messageObject.senderId = ws.id;
          const acceptWs = websocketIdsMap.get(messageObject.acceptId);
          acceptWs.send(JSON.stringify(messageObject));
        }
        
        //廣播
        if (messageObject.type == 1) {
          const mapToArray = Array.from(websocketIdsMap.values());
          messageObject.senderId = 0;
          mapToArray.forEach(item => {
            item.send(JSON.stringify(mapToArray));
          })
        }
  
       
      } catch (e) {
        
      }
     
    });
  
    ws.on('close', () => {
      websocketIdsMap.delete(ws.id);
    })
  
    ws.send(JSON.stringify({
        id,
        message:'connection success'
    }));
});

// const wss2 = new WebSocketServer({
//     port:3002,
//     perMessageDeflate: {
//       zlibDeflateOptions: {
//         // See zlib defaults.
//         chunkSize: 1024,
//         memLevel: 7,
//         level: 3
//       },
//       zlibInflateOptions: {
//         chunkSize: 10 * 1024
//       },
//       // Other options settable:
//       clientNoContextTakeover: true, // Defaults to negotiated value.
//       serverNoContextTakeover: true, // Defaults to negotiated value.
//       serverMaxWindowBits: 10, // Defaults to negotiated value.
//       // Below options specified as default values.
//       concurrencyLimit: 10, // Limits zlib concurrency for perf.
//       threshold: 1024 // Size (in bytes) below which messages
//       // should not be compressed if context takeover is disabled.
//     }
// });

// wss2.on('connection', function connection(ws) {
//     ws.on('error', console.error);

//     ws.on('message', function message(data) {

//         console.log('received: %s', data);
        
//     });

//     ws.send('connection success');
// });
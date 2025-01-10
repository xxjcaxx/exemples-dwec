/* Todo este código sólo funciona en nodejs por los errores de CORS */



const HOST = '192.168.8.200'
const PORT = 8069
const DB = 'proves'
const USER = 'admin'
const PASS = '1234'


const generate_call = (service,method,DB,USER,PASS,args) =>{
    let call_template = {
        jsonrpc: "2.0",
        method: "call",
        params: {
            service, // o "common"
            method,
            args: [DB,USER,PASS,...args]
        },
        id: Math.floor(Math.random()*1000000000)
    }
    console.log(call_template);
    return call_template;
}

const jsonRpc = (HOST,PORT,call)=> {
    return fetch(`http://${HOST}:${PORT}/jsonrpc`,{method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(call)});
} 


let call = generate_call("common","login",DB,USER,PASS,[]);
jsonRpc(HOST,PORT,call).then(response => response.json()).then(data => {
    console.log(data); 
    let uid=data.result;
    let call_partners = generate_call("object","execute",DB,uid,PASS,["res.partner","search",[]]);
    jsonRpc(HOST,PORT,call_partners).then(response => response.json()).then(data => console.log(data));
});


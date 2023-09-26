import EsealDB, { Eseal } from "./db";
import EsealService from "./service";

const db = new EsealDB();
const service = new EsealService(db);

const server = Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  async fetch(request: Request): Promise<Response> {
    // response.
    request.headers.set('Access-Control-Allow-Origin', "*");
    const {method, url} = request;
    const {pathname, searchParams} = new URL(url);

    console.log(`Method : ${method}\nURL : ${url}\nPathname : ${pathname}\nSearch Params : ${searchParams}`);

    if (method === 'GET' && pathname === '/eseals') {
      const result = service.getEseals();
      console.log(`RESPONSE=${result}\nSTATUS=200`);
      const response = new Response(JSON.stringify(result), {status: 200});
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    } 

    if (method === 'GET' && pathname ==='/eseal') {
      const hash: string = searchParams.get("filehash");
      const result: Eseal = service.getEseal(hash);
      console.log(`RESPONSE=${result}\nSTATUS=200`);
      const response = new Response(JSON.stringify(result), {status: 200});
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
    
    if (method === 'GET' && pathname ==='/tx_hash') {
      const hash: string = searchParams.get("filehash");
      const result: string = service.getTxHash(hash);
      console.log(`RESPONSE=${result}\nSTATUS=200`);
      const response = new Response(result, {status: 200});
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }

    if (method === 'POST' && pathname === '/eseal') {
      const data = await request.json();
      console.log(data);
      console.log(data[0]);
      console.log(data[1]);
      console.log(data[2]);
      console.log(data[3]);
      console.log(data[4]);
      console.log(data[5]);
      console.log(data[6]);
      const filehash: string = data[0];
      const issued_to: string = data[1];
      const issued_by: string = data[2];
      const cert_type: string = data[3];
      const tx_hash: string = data[4];
      const timestamp: string = data[5];
      const signer: string = data[6];
      service.createEseal(filehash, issued_to, issued_by, cert_type, tx_hash, timestamp, signer);
      console.log(`RESPONSE=SUCCESS\nSTATUS=201`);
      const response = new Response("Successfully Written The Record to Database", {status: 201});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    if (method === 'POST' && pathname === '/tx_hash') {
      const req: [] = await request.json();
      console.log(req);
      console.log(req[0]);
      console.log(req[1]);
      const filehash: string = req[0];
      const tx_hash: string = req[1];
      console.log(`Filehash : ${filehash}\nTx_hash : ${tx_hash}`);
      service.createTxHash(filehash, tx_hash);
      console.log(`RESPONSE=SUCCESS\nSTATUS=201`);
      const response = new Response("Successfully Written The Record to Database", {status: 201});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    return new Response("You reached the Bun Server! You should try reaching the data using /eseals /eseal endpoints", {status: 200});
  }
});

console.log(`Server is listening on http://localhost:${server.port}`);

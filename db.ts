import { Database } from 'bun:sqlite';

export interface Eseal {
  filehash: string,
  issued_to: string,
  issued_by: string,
  cert_type: string,
  tx_hash: string,
  timestamp: string,
  signer: string
};

export default class EsealDB {
  db: Database;

  constructor() {
    this.db = new Database("eseal.db");

    this.db.run(
      "CREATE TABLE IF NOT EXISTS eseal (filehash TEXT PRIMARY KEY NOT NULL, issued_to TEXT, issued_by, cert_type TEXT, tx_hash TEXT, timestamp TEXT, signer TEXT)"
    );
  }

  getEseals(): Eseal[] {
    var res: Eseal[] = this.db.query("SELECT * FROM eseal").all();
    return res;
  }

  getEseal(filehash: string): Eseal {
    var res: Eseal = this.db.query("SELECT * FROM eseal WHERE filehash = $filehash").get({$filehash: filehash});
    return res;
  }

  getTxHash(filehash: string) {
    var res: string = this.db.query("SELECT tx_hash FROM eseal WHERE filehash = $filehash").get({$filehash: filehash});
    const str_res = JSON.stringify(res);
    console.log(`DB_LOG=RESULT=${str_res}`);
    return str_res;
  }

  createEseal(filehash: string, issued_to: string, issued_by: string, cert_type: string, tx_hash: string, timestamp: string, signer: string) {
    this.db.run("INSERT INTO eseal (filehash, issued_to, issued_by, cert_type, tx_hash, timestamp, signer) VALUES($filehash, $issued_to, $issued_by, $cert_type, $tx_hash, $timestamp, $signer)", 
      filehash, issued_to, issued_by, cert_type, tx_hash, timestamp, signer
    )
  }

  createTxHash(filehash: string, tx_hash: string) {
    this.db.run("INSERT INTO eseal (filehash, tx_hash) VALUES($filehash, $tx_hash)", filehash, tx_hash)
  }
}

import EsealDB from "./db";

export default class EsealService {
  db: EsealDB;

  constructor(db: EsealDB) {
    this.db = db;
  }

  getEseals() {
    return this.db.getEseals();
  }

  getEseal(filehash: string) {
    return this.db.getEseal(filehash);
  }

  getTxHash(filehash: string) {
    return this.db.getTxHash(filehash);
  }

  createEseal(
    filehash: string,
    issued_to: string,
    issued_by: string, 
    cert_type: string, 
    tx_hash:string,
    timestamp: string,
    signer: string
  ) {
    this.db.createEseal(filehash, issued_to, issued_by, cert_type, tx_hash, timestamp, signer);
  }

  createTxHash(filehash: string, tx_hash: string) {
    this.db.createTxHash(filehash, tx_hash);
  }
}


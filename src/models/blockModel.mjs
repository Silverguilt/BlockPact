export default class Block {
  constructor({ timestamp, id, previousHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.id = id;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
}

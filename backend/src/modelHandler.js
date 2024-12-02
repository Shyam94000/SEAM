const crypto = require('crypto');
const fs = require('fs').promises;

class ModelHandler {
  constructor() {
    this.encryptionKey = this.generateKey();
  }

  generateKey() {
    const secret = process.env.MODEL_ENCRYPTION_KEY || 'default_secret_key';
    const keyBuffer = Buffer.alloc(32);
    const sourceBuffer = crypto.createHash('sha256').update(secret).digest();
    sourceBuffer.copy(keyBuffer, 0, 0, 32);
    return keyBuffer;
  }

  encrypt(buffer) {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
      const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  decrypt(encryptedBuffer) {
    try {
      const iv = encryptedBuffer.slice(0, 16);
      const data = encryptedBuffer.slice(16);
      const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, iv);
      const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = ModelHandler;

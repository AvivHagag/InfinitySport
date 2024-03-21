"use server";
import * as CryptoJS from "crypto-js";
export const encryptAES = (plaintext: string, key: string): string => {
  const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
  console.log("before encrypted " + plaintext);
  console.log("after encrypted " + encrypted);
  console.log("after decrypeted " + decryptAES(encrypted, key));
  return encrypted;
};
export const decryptAES = (encryptedText: string, key: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};

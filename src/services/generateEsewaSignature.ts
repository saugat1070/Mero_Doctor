import CryptoJS from 'crypto-js';

export interface EsewaPayload {
  amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  [key: string]: string;
}

export function generateEsewaSignature(data: EsewaPayload, secretKey: string): string {
  const fields = data.signed_field_names.split(',');
  const signingString = fields
    .map(field => `${field}=${data[field]}`)
    .join(',');
    //similar as 
    //const signingstring = `product_id=${product_id},amount=${amount}`;
  const hash = CryptoJS.HmacSHA256(signingString, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
}



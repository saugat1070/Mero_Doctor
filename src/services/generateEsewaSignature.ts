import crypto from 'crypto';
import { envConfig } from '../Config/envConfig';
import axios from 'axios';

export interface EsewaPayload {
  amount: string;
  transaction_uuid: string;
  product_code: string;
  [key: string]: string;
}

// export function generateEsewaSignature(data: EsewaPayload, secretKey: string): string {
//   const fields = data.signed_field_names.split(',');
//   const signingString = fields
//     .map(field => `${field}=${data[field]}`)
//     .join(',');
//     //similar as 
//     //const signingstring = `product_id=${product_id},amount=${amount}`;
//   const hash = CryptoJS.HmacSHA256(signingString, secretKey);
//   return CryptoJS.enc.Base64.stringify(hash);
// }

export function generateEsewaSignature(data:EsewaPayload){
  const beforeHash = `amount=${data.amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code}`;
  const hash = crypto.createHmac("sha256",envConfig.esewa_secret_key)
  .update(beforeHash)
  .digest("base64")


  return {
    signature: hash,
    signed_field_names : "amount transaction_uuid product_code"
  };
}

export async function verifyEsewa(encodedData:any){
  const decoded = atob(encodedData) //decoding base64 receive from esewa
  const decodedData = JSON.parse(decoded)

  const data = `amount=${decodedData.amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${decodedData.product_code}`

  const hashData = crypto.createHmac('sha256',envConfig.esewa_secret_key)
  .update(data).digest('base64')

  if(decodedData.signature != hashData){
    throw {message : "invalid info",decodedData}
  }

  const response = await axios.get(`https://rc.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${decodedData.amount}&transaction_uuid=${decodedData.transaction_uuid}`)
  if(response.data.status !== "COMPLETE" || response.data.transaction_uuid !== Number(decodedData.transaction_uuid)  || Number(response.data.total_amount) !== Number(decodedData.total_amount)){
    throw {message : "Invalid process for payment"}
}

return {response:response.data,decodedData}

}


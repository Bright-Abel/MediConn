import * as sdk from 'node-appwrite';

const {
  // PROJECT_ID,
  // API_KEY,
  // DATABASE_ID,
  // PATIENT_COLLECTION_ID,
  // DOCTOR_COLLECTION_ID,
  // APPOINTMENT_COLLECTION_ID,
  // NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  // NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const PATIENT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID;
const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(APIKEY!);

// console.log(ENDPOINT, PROJECT_ID, APIKEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
export const account = new sdk.Account(client);
export const avatars = new sdk.Avatars(client);

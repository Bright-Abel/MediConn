'use server';

import { databases, storage, users, account } from '../appwrite.config';
import { ID, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { CreateUserParams, RegisterUserParams } from '@/types/index';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const createUser = async (data: CreateUserParams) => {
  const { phone, password, email, name } = data;
  try {
    const user = await users.create(ID.unique(), email, phone, password, name);

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.log(error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('phone', [data.phone!])]);

      return documents?.users[0];
    }
  }
};

export const loginUser = async (data: CreateUserParams) => {
  const { email, password } = data;
  try {
    // cookies().delete('user-session');

    const session = await account.createEmailPasswordSession(email, password);
    const userSession = {
      secret: session.secret,
      userId: session.userId,
    };

    if (session) {
      // Convert the object to a string (JSON) for storage in the cookie
      cookies().set('user-session', JSON.stringify(userSession), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
    }

    // console.log(cookies().get('user-session'));
    const user = await users.get(session.userId);

    const userRole = user?.prefs?.role;

    return { session, userRole };
  } catch (error: any) {
    if (error?.code === 401) {
      return error?.response.message;
    }
    return error;
  }
};

export const getUserSession = () => {
  const session = cookies().get('user-session')?.value;

  if (session) {
    return JSON.parse(session);
  }
};

export const getUser = async (userid: string) => {
  try {
    const user = await users.get(userid);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return error;
  }
};

export const registerPatient = async ({
  identification_document,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identification_document) {
      const inputFile = InputFile.fromBuffer(
        identification_document?.get('blobFile') as Blob,
        identification_document?.get('fileName') as string
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identification_document_id: file?.$id || null,
        identification_document_url: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        ...patient,
      }
    );
    return JSON.parse(JSON.stringify(newPatient));
  } catch (error) {
    console.log('patient error', error);
  }
};

export const getPatient = async (userid: string) => {
  try {
    const patient = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userid)]
    );

    return JSON.parse(JSON.stringify(patient.documents[0]));
  } catch (error) {
    console.log('patient error', error);
  }
};

export const signOutUser = async () => {
  try {
    cookies().delete('user-session');
    await account.deleteSession('current');

    redirect('/');
  } catch (error) {
    console.log(error);
  }
};

export const restrictUser = async (userid: string) => {
  try {
    const patient = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userid)]
    );
    
    return JSON.parse(JSON.stringify(patient.total));
  } catch (error) {
    console.log('patient error', error);
  }
};

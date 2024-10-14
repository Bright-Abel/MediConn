'use server';
import { ID } from 'node-appwrite';
import { databases, storage } from '../appwrite.config';
import { InputFile } from 'node-appwrite/file';
import { DoctorParams } from '@/types';

export const uploadImage = async (image: FormData | undefined) => {
  try {
    let file;
    if (image) {
      const inputFile = InputFile.fromBuffer(
        image?.get('blobFile') as Blob,
        image?.get('fileName') as string
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export const createDoctorDetail = async (data: DoctorParams) => {
  try {
    const newDoctor = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {
        ...data,
      }
    );
    return JSON.parse(JSON.stringify(newDoctor));
  } catch (error) {
    console.log(error);
  }
};

export const getDoctors = async () => {
  try {
    const doctor = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID!
    );

    return JSON.parse(JSON.stringify(doctor.documents));
  } catch (error) {
    console.log(error);
  }
};

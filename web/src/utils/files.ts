import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from "@/db/fileStorage";

export async function uploadFile(file: File, folder: string) {
  const storage = getStorage(app, process.env.FIREBASE_STORAGE_BUCKET);

  const buffer = await file.arrayBuffer();

  const mediaRef = ref(storage, `${folder}/${crypto.randomUUID()}`);

  await uploadBytes(mediaRef, buffer, { contentType: file.type });

  const tweetMediaUrl = await getDownloadURL(mediaRef);

  return tweetMediaUrl;
}

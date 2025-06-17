async function uploadFileToS3(file: File, folder: string) {
  const fileName = file.name ?? 'untitled';
  const fileType = file.type ?? 'application/octet-stream';

  const base64File = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const base64Data = base64File.split(',')[1];

  const res = await fetch('/api/s3/client', {
    method: 'POST',
    body: JSON.stringify({
      fileName,
      fileType,
      fileContent: base64Data,
      folder,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error('Failed to upload file');
  }

  const data = await res.json();
  return data.imageUrl;
}

async function deleteFileFromS3(fileUrl: string) {
  console.log('fileUrl', fileUrl);
  const res = await fetch('/api/s3/client', {
    method: 'DELETE',
    body: JSON.stringify({
      fileUrl,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error('Failed to delete file');
  }
  return true;
}

export { uploadFileToS3, deleteFileFromS3 };

export const readFileAsync = (file: File | Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = (reader.result as string).split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const decodeBase64 = (base64Input: string) => {
  const binaryString = atob(base64Input);
  const binaryData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    binaryData[i] = binaryString.charCodeAt(i);
  }
  return new Blob([binaryData], { type: "application/octet-stream" });
};
//
// export default function blobToBase64(blob: Blob) {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });
// }

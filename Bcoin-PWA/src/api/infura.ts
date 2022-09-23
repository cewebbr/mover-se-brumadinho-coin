import { create } from 'ipfs-http-client'

const url = process.env.REACT_APP_INFURA_URL;
const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  url,
  headers: {
    authorization: auth
  }
});

export function uploadFiles(files: File[]){
  const filesStream = files.map((file) => file.stream());

  return ipfs.addAll(filesStream as any);
}
import * as firebase from './firebase';
import * as contract from './contract';
import * as infura from './infura';

async function addFilesToProject(projectId: string, files: File[]){
  const filesCIDs: string[] = [];

  console.log('enviando arquivos pro IPFS');
  for await (const FSentry of infura.uploadFiles(files)) {
    filesCIDs.push(FSentry.cid.toString());
  }
  console.log('arquivos enviados');

  console.log('Adicionando CIDs no smart contract');
  const txResponse = await contract.addFiles(projectId, filesCIDs, files.map(file => file.type));
  await txResponse.wait();
  console.log('CIDS adicionadas');

}

// a ordem importa, firebase sobrepoe contract
const api = {
  ...contract,
  ...firebase,
  ...infura,
  addFilesToProject
}

export default api;

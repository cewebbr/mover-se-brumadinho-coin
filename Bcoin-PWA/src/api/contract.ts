import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { Wallet } from "@ethersproject/wallet";

import ABI from "./contractABI.json";
import { User } from "../hooks/useUser";

const networkName = process.env.REACT_APP_BLOCKHAIN_NETWORK || "";
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY || "";
const contractAddr = process.env.REACT_APP_CONTRACT_ADDR || "";
console.log("Contract address", contractAddr);

const provider = new ethers.providers.InfuraProvider(
  networkName,
  alchemyApiKey
);
let contract = new ethers.Contract(contractAddr, ABI, provider);
let wallet: undefined | Wallet = undefined;

export async function setSigner(user: User, password: string) {
  wallet = await ethers.Wallet.fromEncryptedJson(
    user.encryptedWallet,
    password
  );
  wallet = wallet.connect(provider);

  contract = contract.connect(wallet);
  console.log("signer", await contract.signer.getAddress());
}

export function removeSigner() {
  wallet = undefined;
  contract = new ethers.Contract(contractAddr, ABI, provider);
}

export function getWallet() {
  return wallet;
}

export function getAllProjectInCreatedStatus() {
  return contract.getAllProjectInCreatedStatus();
}

export function signProject(id: BigNumber) {
  return contract.toSign(id);
}

export function finishProject(projectId: string) {
  return contract.setPercentDone(projectId, 100);
}

export function addFiles(
  projectId: string,
  filesCID: string[],
  filesType: string[]
) {
  return contract.addFiles(projectId, filesCID, filesType);
}

export function addComment(projectId: string, comment: string) {
  return contract.addComment(projectId, comment);
}

export async function getUserwalletAddress() {
  return contract.signer.getAddress();
}

export async function getProjectsOfInExecution(userAddress: string) {
  return contract.getProjectsOfInExecution(userAddress);
}

export async function getProjectsOfFinished(userAddress: string) {
  return contract.getProjectsOfFinished(userAddress);
}

// TODO: converter value para BigInt
export function createProject(
  authorityAddr: string,
  title: string,
  description: string,
  value: string
) {
  return contract.createProject(authorityAddr, title, description, { value });
}

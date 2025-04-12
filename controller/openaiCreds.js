import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiVersion = "2024-04-01-preview";
const endpoint = "https://nikhi-m9egwbjs-eastus2.cognitiveservices.azure.com/";
const modelName = "gpt-4o";
const deployment = "gpt-4o";
const options = { endpoint, apiKey, deployment, apiVersion }
const client = new AzureOpenAI(options);

export { client, modelName };
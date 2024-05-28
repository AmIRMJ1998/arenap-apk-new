"use client";
import config from "./config.json";

const apiDomainNobat =
  process.env.NODE_ENV === "development" 
    ? config.developmentNobatApi
    : config.developmentNobatApi;
const apiDomain =
  process.env.NODE_ENV === "development" 
    ? config.developmentApi
    : config.developmentApi;

export { apiDomain, apiDomainNobat };

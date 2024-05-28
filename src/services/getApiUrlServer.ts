// const IS_SERVER = typeof window === "undefined";

const apiDomainNobat = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_NOBAT_API : process.env.DEVELOPMENT_NOBAT_API
const apiDomain = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_API : process.env.DEVELOPMENT_API


export { apiDomainNobat, apiDomain };

// const apiDomainNobat = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_NOBAT_API : process.env.PRODUCTION_NOBAT_API
// const apiDomain = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_API : process.env.PRODUCTION_API  


// export { apiDomainNobat, apiDomain };
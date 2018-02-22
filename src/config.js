// Papertrail = add to here
require('dotenv').config({ silent: true });

module.exports = {
  // Services
  mongo_url: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  rabbit_url: process.env.CLOUDAMQP_URL || 'amqp://localhost:5672',
  apiAi_key: process.env.APIAI_KEY || "",
  port: 8080,
  hostname: process.env.HOSTNAME || "http://localhost:3000",
  hostname_redirect: process.env.HOSTNAME_REDIRECT || "http://localhost:3000",

  //Api.ai key


  //NEB Website data
  NEBDigestURL : "http://nebcloner.neb.com/#!/redigest",
  NEBCompanyName : "New England BioLabs",

  // Security
  cookie_secret: process.env.COOKIE_SECRET || 'myCookieSecret',

  // App behavior
  verbose: bool(process.env.VERBOSE) || true,                    // Log 200s?
  concurrency: int(process.env.CONCURRENCY) || 1,                 // Number of Cluster processes to fork in Server
  worker_concurrency: int(process.env.WORKER_CONCURRENCY) || 1,   // Number of Cluster processes to fork in Worker
  thrifty: bool(process.env.THRIFTY) || true,                    // Web process also executes job queue?
  view_cache: bool(process.env.VIEW_CACHE) || true,               // Cache rendered views?
  mongo_cache: int(process.env.MONGO_CACHE) || 10000,             // LRU cache for mongo queries

  // Benchmarking
  benchmark: bool(process.env.BENCHMARK) || false,                   // Enable benchmark route?
  //benchmark_add: float(process.env.BENCHMARK_ADD) || 0.02,        // Likelihood of benchmarking a new article
  //benchmark_vote: float(process.env.BENCHMARK_VOTE) || 0.12       // Likelihood of benchmarking an upvote
  // Postmark
  postmark_api_key: process.env.POSTMARK_API_KEY || "061fe227-b1fa-4dc2-ac22-2ead3e777f87"
};

function bool(str) {
  if (str == void 0) return false;
  return str.toLowerCase() === 'true';
}

function int(str) {
  if (!str) return 0;
  return parseInt(str, 10);
}

function float(str) {
  if (!str) return 0;
  return parseFloat(str, 10);
}

import cors, { type CorsOptions } from "cors"; // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

const options: CorsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", // local dev
        "https://customdomain.com", // production domain
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, // allow cookies
    preflightContinue: false,
    maxAge: 600, // cache preflight for 10 mins
    optionsSuccessStatus: 204,
  };

const corsConfig = cors(options);

export default corsConfig;
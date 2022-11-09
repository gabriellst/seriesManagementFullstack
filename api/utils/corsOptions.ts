const whitelist = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(",")
  : ["http://localhost:" + process.env.PORT];

const corsOptions: any = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;

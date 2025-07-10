/** @type {import('drizzle-kit').Config} */
export default {
  schema: "./utils/schema.js",  // Path to your schema file
  dialect: "postgresql",  // Dialect for PostgreSQL
  dbCredentials: {
    url: 'postgresql://interviewdat_owner:Ix13zfeNyXDa@ep-restless-grass-a47cfibm-pooler.us-east-1.aws.neon.tech/interviewdat?sslmode=require' // Your PostgreSQL connection URL
  }
};

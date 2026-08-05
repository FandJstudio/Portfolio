export const CONTACT_EMAIL = "fjstudiobuisness@gmail.com";
export const CONTACT_PHONE = "+48 509 371 015";

/*
  Google Analytics measurement id.

  Written here rather than read from the environment on purpose. It is not a
  secret - it ships inside the page for anyone to read - and the site already
  lost its contact form once to an environment variable that existed locally
  and not on the host. A value that cannot be forgotten cannot be forgotten in
  production either.
*/
export const GA_MEASUREMENT_ID = "G-NR0K9DVKMR";

/*
  Analytics only exists in a production build, so development and local testing
  never report into the studio's real statistics.
*/
export const ANALYTICS_ENABLED = process.env.NODE_ENV === "production";

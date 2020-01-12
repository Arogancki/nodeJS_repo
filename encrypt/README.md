### Crypto Service

#### envs

-   NODE_ENV=dev
-   PORT=8080
-   MONGODB_URI
-   SALT
-   JWT_SECRET_KEY
-   JWT_EXPIRATION_TIME
-   PATH_TO_PDF_FILE
-   KEY_GENERATION_PASSPHRASE

#### EPs:

##### POST /api/sign-in

Sign in with email and password, send token back

##### POST /api/sign-up

Sign up with email and password, after successful response user can sign in

##### POST /api/encrypt/generate-key-pair

Sends back private and public keys to encrypt or decrypt data

##### POST /api/encrypt

Sends encrypted with user private Key file back

##### POST /api/decrypt

takes message (from /api/encrypt) and user privateKey from request body and sends decrypted file back to user
(made for testing purposes)

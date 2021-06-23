import admin from 'firebase-admin'
import serviceAccountData from './serviceAccount.json'

const serviceAccount = {
    type: 'service_account',
    projectId: serviceAccountData.project_id,
    privateKeyId: serviceAccountData.private_key_id,
    privateKey: serviceAccountData.private_key,
    clientEmail: serviceAccountData.client_email,
    clientId: serviceAccountData.client_id,
    authUri: serviceAccountData.auth_uri,
    tokenUri: serviceAccountData.token_uri,
    authProviderX509CertUrl: serviceAccountData.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccountData.client_x509_cert_url
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const accessDenied = (url: string, res) => {
    return res.status(403).json({
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: url,
        message: 'Access Denied',
    })
}

async function decodeIDToken(req, res, next) {
    const header = req.headers?.authorization;
    
    if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        try {
            req['user'] = await admin.auth().verifyIdToken(idToken);
            next()
        } catch (err) {
            accessDenied(req.url, res)
        }
    } else {
        accessDenied(req.url, res)
    }
}
export default decodeIDToken

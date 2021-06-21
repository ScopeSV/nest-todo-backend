import admin from 'firebase-admin'
import firebase from 'firebase'
import fs from 'fs'
import serviceAccountData from './serviceAccount.json'

const fire = firebase.initializeApp({
    apiKey: "AIzaSyCj9fHPqOGVKAgyf7Oh3rcJW1scSDh3XR0",
    authDomain: "easy-peasy-e3227.firebaseapp.com",
    projectId: "easy-peasy-e3227",
    storageBucket: "easy-peasy-e3227.appspot.com",
    messagingSenderId: "914228046352",
    appId: "1:914228046352:web:dcfd1cd8904e6a6a807895"
})

const money = {};
const message = {author: {id: 0}};
money[message.author.id] = {
    bank: 1000,
    cash: 0,
};

fire.auth().signInWithEmailAndPassword('stephan@devalo.no', '77840102a').then(() => {
    firebase.auth().onAuthStateChanged((user) => {
        user.getIdToken().then((token) => {
            //fs.writeFileSync('token.txt', token)
            admin.auth().verifyIdToken('eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4ZGYxMzgwM2I3NDM2NjExYWQ0ODE0NmE4ZGExYjA3MTg2ZmQxZTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWFzeS1wZWFzeS1lMzIyNyIsImF1ZCI6ImVhc3ktcGVhc3ktZTMyMjciLCJhdXRoX3RpbWUiOjE2MjQyOTg2MDMsInVzZXJfaWQiOiJsVFFMMVdVUnJ6Y1oySDlJYjZPNG5mSGlrOWwxIiwic3ViIjoibFRRTDFXVVJyemNaMkg5SWI2TzRuZkhpazlsMSIsImlhdCI6MTYyNDI5ODYwMywiZXhwIjoxNjI0MzAyMjAzLCJlbWFpbCI6InN0ZXBoYW5AZGV2YWxvLm5vIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInN0ZXBoYW5AZGV2YWxvLm5vIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.YU2vYt72mBmlVUIz4-hCSWOXs61kR5Iyis3awjKiQ68VXj2ESulpSx67O0O6YGixGmlxsRF1RvD3TDPt1YXBtEbpPRa9Y5mPOzfUh5VoY0EUDJ8DEPTAfawNzX8T8J6-tUDviw3ZG3NF9gW8sjBOFa9ib94-bxMxmap7SOdkEY-XDugGLhnZOMgXh-qPNYdZgJjBsS7JmZU0mTcfPKqyhR6hxXf3zmh4A3LJHUu73xueaAl4oHg8Ej5VuOAE9vUdlW-mdqhyc4_3fXGdgFP15xQPlukaPCReuAM0bpBzBmTl-PUkJsHu532_dps79qKpRcGS2SxxOEiSTGFM1EDDzA').then((sumthn) => {
            })
        })
    })
})

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
    databaseURL: 'https://phone-book-fe436.firebaseio.com',
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

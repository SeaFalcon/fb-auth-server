const { default: Axios } = require('axios');
const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, "rn-practice-a5618-firebase-adminsdk-e2rns-3e1e23c9b9.json"));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rn-practice-a5618.firebaseio.com"
});

app.post('/kakao', async (req, res) => {
  const { accessToken } = req.body;

  console.log('req.body', req.body);

  try {
    const profileResponse = await Axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    });

    console.log('profileResponse', profileResponse);

    admin.auth().updateUser()

    const customToken = await admin.auth().createCustomToken(id, { provider: 'KAKAO' });
    console.log(customToken);
    res.json({ customToken });
  } catch (err) {
    console.log('Error creating custom token:', err);
    res.json({ error: err });
  }
});



app.listen(3000, () => { console.log('listening on 3000...') });
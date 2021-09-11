import firebase from 'firebase'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

if (!firebase.app.length) {
  firebase.initializeApp(config)
}

export default firebase

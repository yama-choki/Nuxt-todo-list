import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAlCcQnIoW2hv5mRwqWhjScLzAMrw_YgDM',
    authDomain: 'todo-list-14284.firebaseapp.com',
    projectId: 'todo-list-14284',
    storageBucket: 'todo-list-14284.appspot.com',
    messagingSenderId: '109257066913',
    appId: '1:109257066913:web:c87c0fddbf3332ca73e3e0',
    measurementId: 'G-G4BYK96PJQ'
  })
}

export default firebase

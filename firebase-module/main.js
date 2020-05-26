import firebase from 'firebase/app'

const config = {"apiKey":"AIzaSyDyfOiP4muV38cWTPoq3ztHM6eLctsSIRI","authDomain":"rdfariz-data.firebaseapp.com","databaseURL":"https:\u002F\u002Frdfariz-data.firebaseio.com","projectId":"rdfariz-data","storageBucket":"rdfariz-data.appspot.com","messagingSenderId":"418992693682","appId":"1:418992693682:web:89692e4085ca9198ad04ab","measurementId":"G-VGGY9XM72G"}

export default async ({ res }, inject) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const session = firebase.apps[0]

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------- FIREBASE FIRESTORE ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  await import('firebase/firestore')

  const fireStore = session.firestore()
  const fireStoreObj = firebase.firestore
  inject('fireStore', fireStore)
  inject('fireStoreObj', fireStoreObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ----------------------------------- FIREBASE ANALYTICS -------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side
  if (process.client) {
    await import('firebase/analytics')

    const fireAnalytics = session.analytics()
    const fireAnalyticsObj = firebase.analytics
    inject('fireAnalytics', fireAnalytics)
    inject('fireAnalyticsObj', fireAnalyticsObj)
  }
}

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAb1uyyW06AqTf18CqncngPAloZfMStEjc",
    authDomain: "kc-clothing-store.firebaseapp.com",
    databaseURL: "https://kc-clothing-store.firebaseio.com",
    projectId: "kc-clothing-store",
    storageBucket: "kc-clothing-store.appspot.com",
    messagingSenderId: "966999910162",
    appId: "1:966999910162:web:3b79df06bdb299651eb5cb",
    measurementId: "G-QWDT62CRRF"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Creates a new document in the users collection 
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        try {
            await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


// Adds the given items to the firestore collection
export const addItems = async (collectionName, items) => {
    const collectionRef = firestore.collection(collectionName);
    const batch = firestore.batch();
    items.forEach(item => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, item);
    });

    return await batch.commit();
}

export const fetchShopData = async () => {
    const querySnapshot = await firestore.collection('storeCollections').get();
    const transformedData = querySnapshot.docs.map( doc => {
        const { title, items } = doc.data();
        return {
            id: doc.id,
            title,
            items,
            routeName: encodeURI(title).toLowerCase()
        };
    });

    return transformedData.reduce( (hashTable, current) => {
        hashTable[current.title.toLowerCase()] = current;
        return hashTable;
    }, {});
}

export default firebase;
// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app'; //had to add 'compat'
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAoUsQ-wzy6GGi8cTdzeT950PVuDNAYZqA",
  authDomain: "tujijenge2.firebaseapp.com",
  projectId: "tujijenge2",
  storageBucket: "tujijenge2.appspot.com",
  messagingSenderId: "582818285070",
  appId: "1:582818285070:web:6838d9a72117f00f24de5f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.firestore()
const storage = firebase.storage()

export {auth, database, storage}
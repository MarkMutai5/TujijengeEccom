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
  apiKey: "AIzaSyA05HeFDcvjCcUfzUwgMoD1qT3CX11Kk5M",
  authDomain: "tujijenge3.firebaseapp.com",
  projectId: "tujijenge3",
  storageBucket: "tujijenge3.appspot.com",
  messagingSenderId: "535759359871",
  appId: "1:535759359871:web:ac4dc46a9b5d3ac009d44a"
}; 

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.firestore()
const storage = firebase.storage()

export {auth, database, storage}
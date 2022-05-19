import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import moment from "moment";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export async function getChatrooms() {
  const chatroomsRef = collection(db, "chatrooms");
  const q = query(chatroomsRef, orderBy("updatedAt", "desc"));
  const chatroomsSnap = await getDocs(q);

  const chatrooms = [];
  chatroomsSnap.forEach((doc) => {
    const chatroom = {
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
    };

    chatrooms.push(chatroom);
  });

  return chatrooms;
}

function compare(a, b) {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (a.createdAt > b.createdAt) {
    return 1;
  }
  return 0;
}

export async function getChatroom(chatroomId) {
  const chatroomRef = doc(db, "chatrooms", chatroomId);
  const chatroomSnap = await getDoc(chatroomRef);

  if (chatroomSnap.exists()) {
    const messagesRef = collection(db, "chatrooms", chatroomId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(50));
    const messagesSnap = await getDocs(q);

    const messages = [];
    messagesSnap.forEach((doc) => {
      const createdAt = doc.data().createdAt.seconds;

      const humanizedDate =
        moment.duration(moment().unix() - createdAt, "second").humanize() +
        " ago";

      const message = {
        id: doc.id,
        text: doc.data().text,
        uid: doc.data().uid,
        name: doc.data().displayName,
        avatar: doc.data().avatarURL,
        imageUrl: doc.data().imageUrl,
        createdAt: createdAt,
        humanizedCreatedAt: humanizedDate,
      };

      messages.push(message);
    });

    const chatroom = {
      id: chatroomId,
      name: chatroomSnap.data().name,
      description: chatroomSnap.data().description,
      messages: messages.sort(compare),
    };

    return chatroom;
  }

  return null;
}

export async function saveMessage(inputText, chatroomId, imageUrl) {
  const messagesRef = collection(db, "chatrooms", chatroomId, "messages");

  const chatroomRef = doc(db, "chatrooms", chatroomId);

  await updateDoc(chatroomRef, { updatedAt: Timestamp.now() });

  return await addDoc(messagesRef, {
    text: inputText,
    uid: auth.currentUser.uid,
    createdAt: Timestamp.now(),
    displayName: auth.currentUser.displayName,
    avatarURL: auth.currentUser.photoURL,
    imageUrl: imageUrl,
  });
}

export async function sendImage(uri, chatroomId) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(
    getStorage(),
    "/chatrooms/" + chatroomId + "messages/" + uuidv4()
  );
  const result = await uploadBytes(fileRef, blob);

  console.log(result);

  // We're done with the blob, close and release it
  blob.close();

  const imageUrl = await getDownloadURL(fileRef);

  await saveMessage(null, chatroomId, imageUrl);
}

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
} from "firebase/firestore";
import { db, auth } from "../firebase";

import moment from "moment";

export async function getChatrooms() {
  const chatroomsRef = collection(db, "chatrooms");
  const chatroomsSnap = await getDocs(chatroomsRef);

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
        avatar: doc.data().photoURL,
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

export async function saveMessage(
  inputText,
  chatroomId,
  photoURL,
  displayName
) {
  const messagesRef = collection(db, "chatrooms", chatroomId, "messages");

  return await addDoc(messagesRef, {
    text: inputText,
    uid: auth.currentUser.uid,
    createdAt: Timestamp.now(),
    displayName: displayName,
    photoURL: photoURL,
  });
}

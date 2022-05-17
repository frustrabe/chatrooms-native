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
  if (a.created_at < b.created_at) {
    return -1;
  }
  if (a.created_at > b.created_at) {
    return 1;
  }
  return 0;
}

export async function getChatroom(chatroom_id) {
  const chatroomRef = doc(db, "chatrooms", chatroom_id);
  const chatroomSnap = await getDoc(chatroomRef);

  if (chatroomSnap.exists()) {
    const messagesRef = collection(db, "chatrooms", chatroom_id, "messages");
    const q = query(messagesRef, orderBy("created_at", "desc"), limit(50));
    const messagesSnap = await getDocs(q);

    const messages = [];
    messagesSnap.forEach((doc) => {
      const message = {
        id: doc.id,
        text: doc.data().text,
        uid: doc.data().uid,
        created_at: doc.data().created_at.seconds,
      };

      messages.push(message);
    });

    const chatroom = {
      id: chatroom_id,
      name: chatroomSnap.data().name,
      description: chatroomSnap.data().description,
      messages: messages.sort(compare),
    };

    return chatroom;
  }

  return null;
}

export async function saveMessage(inputText, chatroom_id) {
  const messagesRef = collection(db, "chatrooms", chatroom_id, "messages");

  return await addDoc(messagesRef, {
    text: inputText,
    uid: auth.currentUser.uid,
    created_at: Timestamp.now(),
  });
}

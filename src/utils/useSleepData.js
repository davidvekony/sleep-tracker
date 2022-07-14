import { db } from "../../config/firebase.config";
import {
  getDocs,
  addDoc,
  query,
  collection,
  where,
  orderBy,
} from "firebase/firestore";

export const fetchSleepData = async (user) => {
  const data = [];
  const q = query(
    collection(db, "sleep"),
    where("user", "==", user.uid),
    orderBy("sleepTime")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  data.forEach((sleep) => {
    sleep.sleepTime = sleep.sleepTime.toDate();
    sleep.wakeUpTime = sleep.wakeUpTime.toDate();
  });
  return data;
};

export const filterSleepData = (sleepData, daysBack) => {
  const data = [];
  const today = new Date();
  const startDate = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);
  sleepData.forEach((sleep) => {
    if (sleep.sleepTime >= startDate) {
      data.push(sleep);
    }
  });
  return data;
};

export const addSleepData = async (sleepTime, wakeUpTime, user) => {
  const docRef = await addDoc(collection(db, "sleep"), {
    sleepTime: Timestamp.fromDate(sleepTime),
    wakeUpTime: Timestamp.fromDate(wakeUpTime),
    sleepDuration: Math.abs(wakeUpTime - sleepTime) / 36e5,
    user: user.uid,
    timestamp: Timestamp.fromDate(new Date()),
  });
  return docRef;
};
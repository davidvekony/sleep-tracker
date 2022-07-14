import { db } from "../../config/firebase.config";
import {
  getDocs,
  addDoc,
  query,
  collection,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const fetchSleepData = async (user) => {
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

const filterSleepData = (sleepData, daysBack) => {
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

const addSleepData = async (sleepTime, wakeUpTime, user) => {
  await addDoc(collection(db, "sleep"), {
    sleepTime: Timestamp.fromDate(sleepTime),
    wakeUpTime: Timestamp.fromDate(wakeUpTime),
    sleepDuration: Math.abs(wakeUpTime - sleepTime) / 36e5,
    user: user.uid,
    timestamp: Timestamp.fromDate(new Date()),
  });
};

const deleteSleepData = async (sleepId) => {
  await deleteDoc(doc(db, "sleep", sleepId));
};

const updateSleepData = async (sleepId, sleepTime, wakeUpTime) => {
  const docRef = doc(db, "cities", sleepId);

  await updateDoc(docRef, {
    sleepTime: Timestamp.fromDate(sleepTime),
    wakeUpTime: Timestamp.fromDate(wakeUpTime),
    sleepDuration: Math.abs(wakeUpTime - sleepTime) / 36e5,
  });
};

export {
  fetchSleepData,
  filterSleepData,
  addSleepData,
  deleteSleepData,
  updateSleepData,
};

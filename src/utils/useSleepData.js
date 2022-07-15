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
  doc,
  getDoc,
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
    const newDoc = doc.data();
    newDoc.id = doc.id;
    data.push(newDoc);
  });
  data.forEach((sleep) => {
    sleep.sleepTime = sleep.sleepTime.toDate();
    sleep.wakeUpTime = sleep.wakeUpTime.toDate();
  });
  return data;
};

const filterSleepData = (data, daysBack) => {
  const filteredData = [];
  const today = new Date();
  const startDate = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);
  data.forEach((sleep) => {
    if (sleep.sleepTime >= startDate) {
      filteredData.push(sleep);
    }
  });
  return filteredData;
};

const fetchSingleLog = async (sleepId) => {
  const docRef = doc(db, "sleep", sleepId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists) {
    const data = docSnap.data();
    data.sleepTime = data.sleepTime.toDate();
    data.wakeUpTime = data.wakeUpTime.toDate();
    return data;
  } else {
    return null;
  }
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
  fetchSingleLog,
  addSleepData,
  deleteSleepData,
  updateSleepData,
};

import { db } from "../../config/firebase.config";
import { getDocs, query, collection, where, orderBy } from "firebase/firestore";

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

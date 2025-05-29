import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_KEY = 'notifications';

export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: string;
};

export const getNotifications = async (): Promise<Notification[]> => {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY);
  return data ? JSON.parse(data) : [];
};

export const addNotification = async (notification: Notification) => {
  const list = await getNotifications();
  list.unshift(notification);
  await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(list));
};

export const removeNotification = async (id: string) => {
  const list = await getNotifications();
  const newList = list.filter(n => n.id !== id);
  await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(newList));
};

export const clearNotifications = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
}; 
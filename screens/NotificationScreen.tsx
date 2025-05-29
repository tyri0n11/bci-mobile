import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, spacing, typography, commonStyles } from '../theme';

const getTypeColor = (type: string) => {
  switch (type) {
    case 'message':
      return colors.primary;
    case 'system':
      return '#10B981'; // green
    case 'feature':
      return '#F59E0B'; // amber
    case 'profile':
      return '#6366F1'; // indigo
    default:
      return colors.primary;
  }
};

const dummyNotifications = [
  {
    id: '1',
    title: 'Hurray!',
    message: 'You have logged your mood successfully',
    timestamp: '2 minutes ago',
    type: 'message',
  },
  {
    id: '2',
    title: 'Hey there...',
    message: 'You forgot to log your mood today',
    timestamp: '1 hour ago',
    type: 'system',
  },
  {
    id: '4',
    title: 'New Feature',
    message: 'Check out our new meditation feature!',
    timestamp: '1 day ago',
    type: 'feature',
  },
  {
    id: '5',
    title: 'Profile Update',
    message: 'Your profile has been successfully updated',
    timestamp: '2 days ago',
    type: 'profile',
  },
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
    <View style={styles.notificationContent}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  </View>
);

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={dummyNotifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
    color: colors.text.primary,
    padding: spacing.md,
  },
  listContainer: {
    padding: spacing.md,
  },
  notificationItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  typeIndicator: {
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  notificationContent: {
    flex: 1,
    padding: spacing.md,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
  },
  notificationMessage: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

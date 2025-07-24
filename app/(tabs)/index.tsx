import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    title: 'Dallas Fort Worth International Airport',
    subtitle: 'DFW Airport',
    image: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753378572/Frame_427321863_mcpz4a.png',
    documents: 10,
    issues: 5,
  },
  {
    id: '2',
    title: 'AT&T Stadium',
    subtitle: 'Metroplex Elevator Systems',
    image: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753378571/Frame_26_dt9ond.png',
    documents: 12,
    issues: 3,
  },
];

export default function HomeScreen() {
  return (
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select from List</Text>
          <Ionicons name="grid-outline" size={18} color="#444" />
        </TouchableOpacity>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <Card item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
  );
}

function Card({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.subtitleRow}>
          <Ionicons name="business-outline" size={14} color="#555" />
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: '#e5f0fb' }]}>
            <Ionicons name="document-text-outline" size={14} color="#2563eb" />
            <Text style={[styles.badgeText, { color: '#2563eb' }]}>{item.documents}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#fde8e8' }]}>
            <Ionicons name="alert-circle-outline" size={14} color="#ef4444" />
            <Text style={[styles.badgeText, { color: '#ef4444' }]}>{item.issues}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#cfeafe',
    margin: 18,
    borderRadius: 24,
    padding: 16,
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minWidth: 180,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    gap: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 2,
    color: '#222',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    marginRight: 10,
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

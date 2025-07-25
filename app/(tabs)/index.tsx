import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WebMap from './WebMap';

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

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      subscription.remove();
    };
  }, []);

  const isSmallScreen = screenWidth < 768; // Example breakpoint

  return (
    <View style={styles.mainContainer}>
      {isSmallScreen ? (
        <Text style={styles.smallScreenText}>This content is visible on small screens.</Text>
      ) : (
        <View style={styles.contentMapContainer}>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Select from Map</Text>
            <Ionicons name="grid-outline" size={18} color="#444" />
          </TouchableOpacity>
          <View style={styles.mapContainer}>
            <div style={{ width: '100%', height: 'calc(100% - 68px)', borderRadius: 16, overflow: 'hidden' }}>
              <WebMap />
            </div>
          </View>
        </View>
      )}
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
    </View>
  );
}

type CardItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  documents: number;
  issues: number;
};

function Card({ item }: { item: CardItem }) {
  const navigation = useNavigation() as any;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('about')}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    borderRadius: 24,
    width: '100%',
    height: '100%',
  },
  smallScreenText: {
    display: 'none',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  contentMapContainer: {
    flex: 1,
    backgroundColor: '#D5EDFC',
    margin: 18,
    borderRadius: 24,
    padding: 16,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D5EDFC',
    margin: 18,
    borderRadius: 24,
    padding: 16,
    maxWidth: 500,
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

import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

export default function AboutScreen() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setScreenWidth(Dimensions.get('window').width);
    });
    return () => subscription.remove();
  }, []);

  const isSmallScreen = screenWidth < 768;

  const data = [
    {
      id: '1',
      title: 'Dallas Fort Worth International Airport',
      subtitle: 'DFW Airport',
      image: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753378572/Frame_427321863_mcpz4a.png',
      documents: 10,
      issues: 5,
    }
  ];

  const chartData = [
    {
      name: 'Out Of Service',
      population: 15,
      color: '#FF4C4C',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'In Alarm',
      population: 3,
      color: '#FFA500',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Okay',
      population: 50,
      color: '#32CD32',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {isSmallScreen ? (
        <Text style={styles.smallScreenText}>This content is visible on small screens.</Text>
      ) : (
        <View style={styles.contentMapContainer}>
          <View>
            <View style={styles.card}>
              <Image source={{ uri: data[0].image }} style={styles.thumbnail} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{data[0].title}</Text>
                <View style={styles.subtitleRow}>
                  <Ionicons name="business-outline" size={14} color="#555" />
                  <Text style={styles.subtitle}>{data[0].subtitle}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Equipment Condition</Text>

              <View style={styles.row}>
                <Text style={styles.statusBox}>🔧 65</Text>
                <Text style={styles.alertBox}>❗3</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <PieChart
                  data={chartData}
                  width={screenWidth - 80}
                  height={200}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: () => `#000`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  center={[0, 0]}
                  hasLegend={false}
                  absolute
                />
                <View style={{ marginTop: -50 }}>
                  <Text style={styles.statusText}>🟥 Out Of Service — 15</Text>
                  <Text style={styles.statusText}>🟧 In Alarm — 3</Text>
                  <Text style={styles.statusText}>🟩 Okay — 50</Text>
                </View>
              </View>
            </View>

            <View style={styles.selectBox}>
              <Text style={styles.selectText}>🏢 Select from Buildings ➡️</Text>
            </View>

            <View style={styles.infoBox}>
              <InfoRow label="Company" value="DFW Airport" />
              <InfoRow label="Address" value="2400 Aviation Dr, Dallas, TX 75261" />
              <InfoRow label="Location" value="Texas" />
              <InfoRow label="Country" value="United States" />
              <InfoRow label="State" value="TX" />
              <InfoRow label="City" value="DFW Airport" />
              <InfoRow label="Zip Code" value="75261" />
            </View>
          </View>
        </View>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select from List</Text>
          <Ionicons name="grid-outline" size={18} color="#444" />
        </View>
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.rowBetween}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e0f2ff',
    padding: 16,
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
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
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
  section: {
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  statusBox: {
    backgroundColor: '#e0f2ff',
    padding: 6,
    borderRadius: 16,
    color: '#0077cc',
  },
  alertBox: {
    backgroundColor: '#ffe5ec',
    padding: 6,
    borderRadius: 16,
    color: '#cc0033',
  },
  chartPlaceholder: {
    textAlign: 'center',
    paddingVertical: 16,
    color: '#888',
  },
  statusText: {
    fontSize: 14,
    paddingVertical: 2,
    color: '#333',
    textAlign: 'center',
  },
  selectBox: {
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  selectText: {
    fontWeight: '500',
    color: '#0077cc',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    color: '#888',
  },
  value: {
    color: '#111',
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  smallScreenText: {
    display: 'none',
  },
  contentMapContainer: {
    flex: 1,
    backgroundColor: '#D5EDFC',
    margin: 18,
    borderRadius: 24,
    padding: 16,
    maxWidth: 500,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D5EDFC',
    margin: 18,
    borderRadius: 24,
    padding: 16,
    width: '100%',
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
});

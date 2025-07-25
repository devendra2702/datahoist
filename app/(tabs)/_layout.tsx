import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="about" options={{ title: 'About', headerShown: false, tabBarStyle: { display: 'none' } }} />
    </Tabs>
  );
}

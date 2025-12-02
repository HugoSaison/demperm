import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '@/styles/vote_style';
import ProfilePicture from '@/components/ProfilePicture';

const themes = [
  { id: '1', name: 'Domaine 1' },
  { id: '2', name: 'Domaine 2' },
  { id: '3', name: 'Domaine 3' },
  { id: '4', name: 'Domaine 4' },
  { id: '5', name: 'Domaine 5' },
];

export default function PageVoteMain() {
  const router = useRouter();

  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={[styles.item, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
      onPress={() => router.push({ pathname: '/page_vote', params: { theme: item.name } })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
        onPress={() =>router.push('/profile')/* router.push({ pathname: '/profile', params: { userId: '123' } })*/} 
      >
        <ProfilePicture size={40}/>
      </TouchableOpacity>        <View style={{ marginLeft: 10 }}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir un thème</Text>
      <FlatList
        data={themes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

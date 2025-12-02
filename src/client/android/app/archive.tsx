import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import ComponentList, { Person } from '@/components/ComponentList';
import SubMenuComponent from '@/components/SubMenuComponent';
import styles from '@/styles/vote_style';
/*
function mapVoteResultToPerson(vote: VoteResult): Person {
  return {
    id: vote.userId,
    Nom: vote.domain, 
    Prenom: "",
    Photo: require('@/public/images/utilisateur2.png'),
    points: vote.count.toString(),
    extra: vote.electedAt || undefined,
  };
}
*/



export default function ArchiveScreen() {

  const data1: Person[] = [
  { id: "1", Nom: "Dupont", Prenom: "Jean1", Photo: require('@/public/images/utilisateur2.png'),points: "60" },
  { id: "2", Nom: "Dupont", Prenom: "Jean2", Photo: require('@/public/images/utilisateur2.png') },
  { id: "3", Nom: "Dupont", Prenom: "Jean3", Photo: require('@/public/images/utilisateur2.png') },
  { id: "4", Nom: "Dupont", Prenom: "Jean4", Photo: require('@/public/images/utilisateur2.png') },
  ];

  const data2: Person[] = [
  { id: "5", Nom: "Dupont", Prenom: "Paul1", Photo: require('@/public/images/utilisateur2.png'),points: "60" },
  { id: "6", Nom: "Dupont", Prenom: "Paul2", Photo: require('@/public/images/utilisateur2.png'),points: "60" },
  { id: "7", Nom: "Dupont", Prenom: "Paul3", Photo: require('@/public/images/utilisateur2.png'),points: "60"},
  { id: "8", Nom: "Dupont", Prenom: "Paul4", Photo: require('@/public/images/utilisateur2.png'),points: "60"},
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SubMenuComponent
        tabs={["Mes Votes", "Les Elus"]}
        onChange={(index) => setActiveIndex(index)}
      />

      <View style={styles.container}>
        {activeIndex === 0 ? (
          <ComponentList data={data1} />
        ) : (
          <ComponentList data={data2} />
        )}
      </View>
    </View>
  );
}

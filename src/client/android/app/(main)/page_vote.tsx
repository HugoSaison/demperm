import React, { useState } from "react";
import { View, Text, TextInput, Image, Modal, TouchableOpacity } from "react-native";
import styles from '@/styles/vote_style';
import ComponentListVote, { VoteItem } from '@/components/ComponentListVote';

export default function VotePage() {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<VoteItem | null>(null);
  const [inputName, setInputName] = useState("");

  const [voteList, setVoteList] = useState<VoteItem[]>([
    { id: "1", title: "Position à élire", voted: false, remainingVotes: 9 },
    { id: "2", title: "Position à élire", voted: false, remainingVotes: 2 },
    { id: "3", title: "Position à élire", voted: false, remainingVotes: 1 },

    { id: "4", title: "Position à élire", voted: true, name: "Jean Dupont", votes: 24, bonus: 13 },
    { id: "5", title: "Position à élire", voted: true, name: "Jean Dupont", votes: 25, bonus: 1 },
    { id: "6", title: "Position à élire", voted: true, name: "Jean Dupont", votes: 45, bonus: 11 },
  ]);

  // Filtrage par recherche
  const filteredData = voteList.filter((item) => {
    const text = item.voted ? item.name : item.title;
    return text?.toLowerCase().includes(searchText.toLowerCase());
  });

  // Validation du vote
  const validateVote = () => {
      if (!selectedItem || !inputName.trim()) return;

      setVoteList((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                voted: true,
                name: inputName,
                votes: item.votes ?? 1,
                bonus: item.bonus ?? 0,
              }
            : item
        )
      );

      setInputName("");
      setSelectedItem(null);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélection pour le vote</Text>

      {/* BARRE DE RECHERCHE */}
      <View style={styles.searchContainer}>
        <Image
          source={require("@/public/images/search.png")}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchBar}
          placeholder="Recherche"
          value={searchText}
          onChangeText={setSearchText}
        />

        <Text style={styles.text_voix}>9 Voix</Text>
      </View>

      {/* LISTE DE VOTE */}
      <ComponentListVote
        data={filteredData}
        onPressItem={(item: VoteItem) => {
          setSelectedItem(item);
          setInputName(item.name ?? "");
        }}
      />

      {/* MODAL DE VOTE */}
      <Modal visible={!!selectedItem} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Entrer un nom
            </Text>

            <TextInput
              placeholder="Nom du candidat"
              value={inputName}
              onChangeText={setInputName}
              style={[
                styles.searchBar,
                { marginBottom: 15 },
              ]}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => setSelectedItem(null)}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: "gray" }}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={validateVote}>
                <Text style={{ color: "#2563EB", fontWeight: "600" }}>
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
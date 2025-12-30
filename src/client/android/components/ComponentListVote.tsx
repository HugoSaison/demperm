import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import styles from "@/styles/vote_style";

export type VoteItem = {
  id: string;
  title: string;
  voted: boolean;
  name?: string;
  votes?: number;
  bonus?: number;
  remainingVotes?: number;
};

type Props = {
  data: VoteItem[];
  onPressItem: (item: VoteItem) => void;
};

const ComponentListVote: React.FC<Props> = ({ data, onPressItem }) => {

  // non votés en premier
  const sortedData = [...data].sort((a, b) =>
    a.voted === b.voted ? 0 : a.voted ? 1 : -1
  );

  const renderItem = ({ item }: { item: VoteItem }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <View style={[styles.item, { flexDirection: "row", alignItems: "center" }]}>

          {/* ICONE */}
          <View style={styles.circle}>
            <Image
              source={
                item.voted
                  ? require("@/public/images/utilisateur2.png")
                  : require("@/public/images/search.png")
              }
              style={{ width: 24, height: 24 }}
            />
          </View>

          {/* TEXTE CENTRAL */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={[
                styles.text,
                { color: item.voted ? "#1E3A8A" : "#9CA3AF", fontWeight: "600" },
              ]}
            >
              {item.voted ? item.name : item.title}
            </Text>

            <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
              {item.voted ? "Position élue" : "Position à élire"}
            </Text>
          </View>

          {/* VOIX */}
          <View style={{ alignItems: "flex-end" }}>
            {item.voted ? (
              <>
                <Text style={{ color: "red", fontSize: 26, fontWeight: "bold" }}>
                  {item.votes}
                  <Text style={{ fontSize: 14 }}> voix</Text>
                </Text>

                {item.bonus && (
                  <Text style={{ color: "#93C5FD", fontSize: 12 }}>
                    +{item.bonus}
                  </Text>
                )}
              </>
            ) : (
              <Text style={{ color: "#9CA3AF", fontSize: 22 }}>
                {item.remainingVotes}
                <Text style={{ fontSize: 14 }}> voix</Text>
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={sortedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ComponentListVote;

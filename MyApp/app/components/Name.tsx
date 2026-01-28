import React, { useState, useEffect } from "react";
import { data } from "../system/data";
import { Text } from "react-native";

interface NameProps {
  userId: string;
  isAnonymous?: boolean;
}

const Name: React.FC<NameProps> = ({ userId, isAnonymous }) => {
  const [displayname, setDisplayname] = useState<string | null>(null);

  const fetchDisplayName = async (): Promise<void> => {
    const name = await data.getUserDisplayName(userId);
    setDisplayname(name);
  };

  useEffect(() => {
    if (!isAnonymous) {
      fetchDisplayName();
    }
  }, [userId]);

  if (isAnonymous) {
    return <Text>Anonymous</Text>;
  }
  return <Text>{displayname}</Text>;
};

export default Name;

export type GuessType = {
  characters: Array<{ name: string; state: string }>;
  isFilled: boolean;
};

export type AlphabetItem = {
  name: string;
  isActive: boolean;
};

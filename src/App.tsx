import React, { useState } from "react";
import { AlphabetItem, GuessType } from "./types";

const states = {
  RED: "red",
  YELLOW: "yellow",
  GREEN: "green",
  GRAY: "gray",
};
function App() {
  const word = "pasta";
  const emptyGuess: GuessType = {
    characters: [
      { name: "", state: states.GRAY },
      { name: "", state: states.GRAY },
      { name: "", state: states.GRAY },
      { name: "", state: states.GRAY },
      { name: "", state: states.GRAY },
    ],
    isFilled: false,
  };
  const guessesListInitialState: GuessType[] = [
    emptyGuess,
    emptyGuess,
    emptyGuess,
    emptyGuess,
    emptyGuess,
  ];

  const [guessesList, setGussesList] = useState<GuessType[]>(
    guessesListInitialState
  );

  const alphabetInitialState: AlphabetItem[] = [
    { name: "Q", isActive: true },
    { name: "W", isActive: true },
    { name: "E", isActive: true },
    { name: "R", isActive: true },
    { name: "T", isActive: true },
    { name: "Y", isActive: true },
    { name: "U", isActive: true },
    { name: "I", isActive: true },
    { name: "O", isActive: true },
    { name: "P", isActive: true },
    { name: "A", isActive: true },
    { name: "S", isActive: true },
    { name: "D", isActive: true },
    { name: "F", isActive: true },
    { name: "G", isActive: true },
    { name: "H", isActive: true },
    { name: "J", isActive: true },
    { name: "K", isActive: true },
    { name: "L", isActive: true },
    { name: "Z", isActive: true },
    { name: "X", isActive: true },
    { name: "C", isActive: true },
    { name: "V", isActive: true },
    { name: "B", isActive: true },
    { name: "N", isActive: true },
    { name: "M", isActive: true },
  ];
  const [alphabet, setAlphabet] =
    useState<AlphabetItem[]>(alphabetInitialState);

  const handleCharacterClick = (character: AlphabetItem) => {
    const currentGuessIndex = guessesList.findIndex((guess) => !guess.isFilled);
    const currentGuess = { ...guessesList[currentGuessIndex] };
    if (currentGuess) {
      const currentCharacterIndex = currentGuess.characters.findIndex(
        (charachter) => charachter.name === ""
      );
      currentGuess.characters = currentGuess.characters.map(
        (currentGuessCharacter, index) => {
          if (index === currentCharacterIndex) {
            return { name: character.name, state: states.GRAY };
          }
          return currentGuessCharacter;
        }
      );
    }
    const newGuessList = guessesList.map((guess, index) => {
      if (index === currentGuessIndex) {
        return currentGuess;
      }
      return guess;
    });
    setGussesList(newGuessList);
  };
  const handleDeleteCharacter = () => {
    const currentGuessIndex = guessesList.findIndex((guess) => !guess.isFilled);
    const currentGuess = { ...guessesList[currentGuessIndex] };
    if (currentGuess) {
      const firstEmptyCharacterIndex = currentGuess.characters.findIndex(
        (charachter) => charachter.name === ""
      );
      let currentCharacterIndex = 0;
      if (firstEmptyCharacterIndex === 0) {
        return;
      } else if (firstEmptyCharacterIndex === -1) {
        currentCharacterIndex = currentGuess.characters.length - 1;
      } else {
        currentCharacterIndex = firstEmptyCharacterIndex - 1;
      }

      currentGuess.characters = currentGuess.characters.map(
        (currentGuessCharacter, index) => {
          if (index === currentCharacterIndex) {
            return { name: "", state: states.GRAY };
          }
          return currentGuessCharacter;
        }
      );
    }
    const newGuessList = guessesList.map((guess, index) => {
      if (index === currentGuessIndex) {
        return currentGuess;
      }
      return guess;
    });
    setGussesList(newGuessList);
  };
  const getCharachterState = (
    character: string,
    characterIndex: number
  ): string => {
    console.log(
      word,
      word[characterIndex],
      character,
      word.includes(character)
    );
    if (
      word[characterIndex].toLocaleLowerCase() === character.toLocaleLowerCase()
    ) {
      return states.GREEN;
    }
    if (word.includes(character.toLocaleLowerCase())) {
      return states.YELLOW;
    }
    return states.RED;
  };
  const handleEnterClick = () => {
    const currentGuessIndex = guessesList.findIndex((guess) => !guess.isFilled);
    const currentGuess = { ...guessesList[currentGuessIndex] };
    if (currentGuess) {
      currentGuess.characters = currentGuess.characters.map(
        (currentGuessCharacter, index) => ({
          ...currentGuessCharacter,
          state: getCharachterState(currentGuessCharacter.name, index),
        })
      );
      currentGuess.isFilled = true;
    }
    const newGuessList = guessesList.map((guess, index) => {
      if (index === currentGuessIndex) {
        return currentGuess;
      }
      return guess;
    });
    setGussesList(newGuessList);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <div className="text-gray-200 text-3xl font-bold text-center pt-10 pb-4 w-96 border-b border-gray-400">
        WORDLE
      </div>
      <div className="mt-16">
        {guessesList.map((guess, index) => (
          <div className="gap-2 mb-2 flex" key={index}>
            {guess.characters.map((character, index) => (
              <div
                className={`
                  w-14 h-14 border border-gray-400 text-gray-200 flex items-center justify-center text-lg font-bold
                  ${character.state === states.RED && "bg-red-500"}
                  ${character.state === states.GREEN && "bg-green-500"}
                  ${character.state === states.YELLOW && "bg-yellow-500"}
                `}
                key={index}
              >
                {character.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-16 text-gray-200 flex flex-col items-center">
        <div className="flex gap-2 mb-2">
          {alphabet.slice(0, 10).map((charachter) => (
            <div
              key={charachter.name}
              className="w-10 h-14 bg-gray-500 flex justify-center items-center rounded-md text-sm font-bold cursor-pointer"
              onClick={() => handleCharacterClick(charachter)}
            >
              {charachter.name}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-2">
          {alphabet.slice(10, 19).map((charachter) => (
            <div
              key={charachter.name}
              className="w-10 h-14 bg-gray-500 flex justify-center items-center rounded-md text-sm font-bold cursor-pointer"
              onClick={() => handleCharacterClick(charachter)}
            >
              {charachter.name}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div
            className="w-20 h-14 bg-gray-500 flex justify-center items-center rounded-md text-sm font-bold cursor-pointer"
            onClick={handleEnterClick}
          >
            Enter
          </div>
          {alphabet.slice(19, 26).map((charachter) => (
            <div
              key={charachter.name}
              className="w-10 h-14 bg-gray-500 flex justify-center items-center rounded-md text-sm font-bold cursor-pointer"
              onClick={() => handleCharacterClick(charachter)}
            >
              {charachter.name}
            </div>
          ))}
          <div
            className="w-20 h-14 bg-gray-500 flex justify-center items-center rounded-md text-sm font-bold cursor-pointer"
            onClick={handleDeleteCharacter}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

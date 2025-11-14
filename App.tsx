import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, NumberOptionState, Level } from './types';
import { generateSpeech } from './services/geminiService';
import { Unicorn } from './components/Unicorn';
import { NumberOption } from './components/NumberOption';
import { StarTracker } from './components/StarTracker';
import { ReinforcementAnimation } from './components/ReinforcementAnimation';
import { LEVELS } from './constants';
import { SparkleIcon, BackIcon } from './components/Icons';

// Audio decoding functions as per guidelines
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [optionStates, setOptionStates] = useState<{[key: number]: NumberOptionState}>({});
  const [stars, setStars] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
  }, []);

  const playAudio = useCallback(async (base64Audio: string) => {
    if (!audioContextRef.current) return;
    try {
      const audioBytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start();
      source.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.error("Failed to play audio:", error);
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    setIsSpeaking(true);
    setFeedback(text);
    try {
      const base64Audio = await generateSpeech(text);
      await playAudio(base64Audio);
    } catch (error)
 {
      console.error("Speech generation failed:", error);
      setIsSpeaking(false);
    }
  }, [playAudio]);

  const startNewRound = useCallback(() => {
    const level: Level = LEVELS[currentLevelIndex];
    setOptionStates({});
    setFeedback('');

    const potentialNumbers = Array.from({ length: level.range[1] - level.range[0] + 1 }, (_, i) => level.range[0] + i);
    const newTarget = potentialNumbers[Math.floor(Math.random() * potentialNumbers.length)];
    setTargetNumber(newTarget);

    const distractors = new Set<number>();
    while (distractors.size < 3) {
      const randomDistractor = potentialNumbers[Math.floor(Math.random() * potentialNumbers.length)];
      if (randomDistractor !== newTarget) {
        distractors.add(randomDistractor);
      }
    }
    const newOptions = [newTarget, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(newOptions);
    
    setTimeout(() => {
        speak(`Ivy, can you find the number ${newTarget}?`);
    }, 500);

  }, [currentLevelIndex, speak]);

  const handleStartGame = () => {
    setGameState(GameState.LevelSelect);
    speak("Hi Princess Ivy! Let's find some magic numbers!");
  };

  const handleLevelSelect = (levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    setStars(0);
    setGameState(GameState.Playing);
    setTimeout(startNewRound, 500);
  }

  const handleOptionSelect = (selectedNumber: number) => {
    if (isSpeaking || optionStates[selectedNumber] === NumberOptionState.Correct || optionStates[selectedNumber] === NumberOptionState.Incorrect) return;

    if (selectedNumber === targetNumber) {
      setStars(prev => prev + 1);
      setOptionStates(prev => ({...prev, [selectedNumber]: NumberOptionState.Correct}));
      speak(`You did it! That's the number ${targetNumber}! Let's count the unicorns!`).then(() => {
         setTimeout(() => {
            setGameState(GameState.Reinforcement);
         }, 1000);
      });
    } else {
      setOptionStates(prev => ({...prev, [selectedNumber]: NumberOptionState.Incorrect}));
      speak("Oops, try again! You can do it!");
      setTimeout(() => {
        setOptionStates(prev => ({...prev, [selectedNumber]: NumberOptionState.Idle}));
      }, 1500);
    }
  };

  const handleReinforcementComplete = () => {
    setGameState(GameState.Playing);
    startNewRound();
  };
  
  const renderGameState = () => {
    switch (gameState) {
      case GameState.Start:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <Unicorn />
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mt-4 drop-shadow-lg">Ivy's Unicorn</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-purple-500 mb-8 drop-shadow-lg">Number Quest</h2>
            <button
              onClick={handleStartGame}
              disabled={isSpeaking}
              className="flex items-center gap-3 text-2xl md:text-3xl bg-yellow-300 hover:bg-yellow-400 text-yellow-800 font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SparkleIcon className="w-8 h-8"/>
              Start Playing
              <SparkleIcon className="w-8 h-8"/>
            </button>
          </div>
        );
      case GameState.LevelSelect:
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-8 drop-shadow-md">Choose a Level!</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    {LEVELS.map((level, index) => (
                        <button
                            key={index}
                            onClick={() => handleLevelSelect(index)}
                            className="text-xl bg-white/80 backdrop-blur-sm hover:bg-pink-100 text-pink-600 font-bold py-6 px-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                        >
                            Level {index + 1}
                            <span className="block text-3xl font-bold mt-1 text-purple-500">{level.range[0]} - {level.range[1]}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
      case GameState.Playing:
        return (
          <div className="w-full flex flex-col items-center">
            <button onClick={() => setGameState(GameState.LevelSelect)} className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-pink-100 transition-colors">
                <BackIcon className="w-6 h-6 text-purple-500" />
            </button>
            <StarTracker count={stars} />
            <div className="relative mb-6">
                <Unicorn />
                {isSpeaking && (
                     <div className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md animate-pulse">
                        <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M8.464 15.536a5 5 0 010-7.072" /></svg>
                        </div>
                     </div>
                )}
            </div>
            <p className="text-2xl md:text-3xl text-purple-600 font-semibold mb-8 text-center min-h-[3rem] px-4">{isSpeaking ? 'Listen...' : 'Choose a number!'}</p>
            <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-md px-4">
              {options.map((num) => (
                <NumberOption 
                  key={num} 
                  number={num} 
                  onClick={() => handleOptionSelect(num)} 
                  state={optionStates[num] || NumberOptionState.Idle}
                  disabled={isSpeaking}
                />
              ))}
            </div>
          </div>
        );
      case GameState.Reinforcement:
        return (
            <ReinforcementAnimation 
                count={targetNumber!}
                onComplete={handleReinforcementComplete}
            />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 overflow-hidden">
        <div 
            className="absolute inset-0 bg-no-repeat bg-center" 
            style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'100%25\\' height=\\'100%25\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cdefs%3E%3Cpattern id=\\'p\\' width=\\'50\\' height=\\'50\\' patternUnits=\\'userSpaceOnUse\\' patternTransform=\\'rotate(45)\\'%3E%3Cpath id=\\'a\\' data-color=\\'outline\\' fill=\\'none\\' stroke=\\'%23FFFFFF\\' stroke-width=\\'0.5\\' d=\\'M0 0l50 50Zm0 50L50 0Z\\'%3E%3C/path%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\\'url(%23p)\\' width=\\'100%25\\' height=\\'100%25\\'/%3E%3C/svg%3E')", opacity: '0.2'}}>
        </div>
      <main className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        {renderGameState()}
      </main>
    </div>
  );
};

export default App;

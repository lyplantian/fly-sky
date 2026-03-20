import { useState } from 'react';

const excuses = [
  "I'm not feeling too well today.",
  "Something urgent came up, I can't make it.",
  "I have a family thing I need to handle.",
  "My energy levels are really low today.",
  "I need to take a mental health day.",
  "I'm running behind on things and need to focus.",
  "I overcommitted myself, need to scale back.",
  "I'm not in the right headspace for this."
];

const tinyWins = [
  "Drink a glass of water",
  "Take 3 deep breaths",
  "Stretch for 2 minutes",
  "Text someone you care about",
  "Make your bed",
  "Open a window for fresh air",
  "Write down one thing you're grateful for",
  "Do a 5-minute tidy up",
  "Put on your favorite song",
  "Step outside for 2 minutes"
];

const hotTakes = [
  "Pizza is a breakfast food.",
  "Email is just modern fax.",
  "Socks with sandals is fine actually.",
  "Breaking up over text is okay sometimes.",
  "Movies are better than books.",
  "Monday is the best day of the week.",
  "Cold coffee is better than hot coffee.",
  "You don't *need* a college degree to be successful."
];

const minimalTips = [
  "You don't have to reply to every message immediately.",
  "Cancel plans if you need to - your peace matters.",
  "Some days, 'good enough' is perfect.",
  "It's okay to say no without explaining.",
  "Your worth isn't measured by productivity.",
  "Doing less can be doing enough.",
  "You don't have to 'maximize' every day."
];

export function ExcuseGenerator() {
  const [excuse, setExcuse] = useState('');
  
  const generateExcuse = () => {
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    setExcuse(randomExcuse);
  };
  
  return (
    <div className="tool-modal">
      <h3>Excuse Generator</h3>
      {excuse && <p className="excuse-text">{excuse}</p>}
      <button onClick={generateExcuse}>
        {excuse ? 'New Excuse' : 'Generate Excuse'}
      </button>
      {excuse && (
        <button onClick={() => navigator.clipboard.writeText(excuse)}>
          Copy
        </button>
      )}
    </div>
  );
}

export function TinyWin() {
  const [win, setWin] = useState('');
  
  const generateWin = () => {
    const randomWin = tinyWins[Math.floor(Math.random() * tinyWins.length)];
    setWin(randomWin);
  };
  
  return (
    <div className="tool-modal">
      <h3>Tiny Win</h3>
      {win && <p className="win-text">{win}</p>}
      <button onClick={generateWin}>
        {win ? 'Another One' : 'Show Me a Tiny Win'}
      </button>
    </div>
  );
}

export function HotTake() {
  const [take, setTake] = useState('');
  
  const generateTake = () => {
    const randomTake = hotTakes[Math.floor(Math.random() * hotTakes.length)];
    setTake(randomTake);
  };
  
  return (
    <div className="tool-modal">
      <h3>Hot Take 🔥</h3>
      {take && <p className="hot-take-text">{take}</p>}
      <button onClick={generateTake}>
        {take ? 'Another Hot Take' : 'Give Me a Hot Take'}
      </button>
    </div>
  );
}

export function MinimalLifeTip() {
  const [tip, setTip] = useState('');
  
  const generateTip = () => {
    const randomTip = minimalTips[Math.floor(Math.random() * minimalTips.length)];
    setTip(randomTip);
  };
  
  return (
    <div className="tool-modal">
      <h3>Minimal Life Tip</h3>
      {tip && <p className="tip-text">{tip}</p>}
      <button onClick={generateTip}>
        {tip ? 'Another Tip' : 'Show Me a Tip'}
      </button>
    </div>
  );
}

export function BrainDump() {
  const [text, setText] = useState('');
  
  const clear = () => {
    if (text && !confirm('Clear everything?')) return;
    setText('');
  };
  
  return (
    <div className="tool-modal brain-dump">
      <h3>Brain Dump</h3>
      <p className="dump-hint">Just write. No judgment, no need to make sense.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's in your head right now?"
        rows="8"
      />
      <div className="dump-actions">
        <button onClick={clear}>Clear</button>
        <button onClick={() => setText('')} disabled={!text}>
          Done
        </button>
      </div>
    </div>
  );
}

export function WhatNow() {
  const activities = [
    "Watch a 90s cartoon episode",
    "Take a 10-minute walk outside",
    "Make yourself a nice drink",
    "Dance to one song",
    "Text a friend a silly meme",
    "Take a power nap (20 minutes)",
    "Organize one drawer",
    "Try a new snack",
    "Stretch for 5 minutes",
    "Write down 3 things that went well today"
  ];
  
  const [activity, setActivity] = useState('');
  
  const generateActivity = () => {
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    setActivity(randomActivity);
  };
  
  return (
    <div className="tool-modal what-now">
      <h3>What Now? 🎲</h3>
      {activity && <p className="activity-text">{activity}</p>}
      <button onClick={generateActivity}>
        {activity ? 'Something Else' : 'Roll the Dice'}
      </button>
    </div>
  );
}

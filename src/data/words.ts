export interface Word {
  id: string;
  english: string;
  telugu: string;
  sentence: string;
  teluguSentence: string;
  image: string; // emoji as fallback
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  words: Word[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  wordId: string;
}

export const categories: Category[] = [
  {
    id: "greetings",
    title: "Greetings",
    icon: "👋",
    words: [
      { id: "g1", english: "Hello", telugu: "హలో", sentence: "Hello, how are you?", teluguSentence: "హలో, మీరు ఎలా ఉన్నారు?", image: "👋" },
      { id: "g2", english: "Good Morning", telugu: "శుభోదయం", sentence: "Good morning, have a nice day.", teluguSentence: "శుభోదయం, మంచి రోజు గడపండి.", image: "🌅" },
      { id: "g3", english: "Thank You", telugu: "ధన్యవాదాలు", sentence: "Thank you for your help.", teluguSentence: "మీ సహాయానికి ధన్యవాదాలు.", image: "🙏" },
      { id: "g4", english: "Please", telugu: "దయచేసి", sentence: "Please sit down.", teluguSentence: "దయచేసి కూర్చోండి.", image: "🙂" },
      { id: "g5", english: "Sorry", telugu: "క్షమించండి", sentence: "I am sorry for being late.", teluguSentence: "ఆలస్యం అయినందుకు క్షమించండి.", image: "😔" },
      { id: "g6", english: "Good Night", telugu: "శుభ రాత్రి", sentence: "Good night, sleep well.", teluguSentence: "శుభ రాత్రి, బాగా నిద్రపోండి.", image: "🌙" },
      { id: "g7", english: "Welcome", telugu: "స్వాగతం", sentence: "Welcome to our home.", teluguSentence: "మా ఇంటికి స్వాగతం.", image: "🏠" },
      { id: "g8", english: "Goodbye", telugu: "వీడ్కోలు", sentence: "Goodbye, see you tomorrow.", teluguSentence: "వీడ్కోలు, రేపు కలుద్దాం.", image: "👋" },
      { id: "g9", english: "How are you?", telugu: "మీరు ఎలా ఉన్నారు?", sentence: "How are you today?", teluguSentence: "మీరు ఈ రోజు ఎలా ఉన్నారు?", image: "😊" },
      { id: "g10", english: "I am fine", telugu: "నేను బాగున్నాను", sentence: "I am fine, thank you.", teluguSentence: "నేను బాగున్నాను, ధన్యవాదాలు.", image: "😄" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    icon: "🛒",
    words: [
      { id: "s1", english: "Money", telugu: "డబ్బు", sentence: "I need money to buy rice.", teluguSentence: "బియ్యం కొనడానికి నాకు డబ్బు కావాలి.", image: "💰" },
      { id: "s2", english: "Price", telugu: "ధర", sentence: "What is the price of this?", teluguSentence: "దీని ధర ఎంత?", image: "🏷️" },
      { id: "s3", english: "Buy", telugu: "కొనుగోలు", sentence: "I want to buy vegetables.", teluguSentence: "నేను కూరగాయలు కొనాలనుకుంటున్నాను.", image: "🛍️" },
      { id: "s4", english: "Sell", telugu: "అమ్మకం", sentence: "He will sell fruits today.", teluguSentence: "అతను ఈ రోజు పండ్లు అమ్ముతాడు.", image: "🏪" },
      { id: "s5", english: "Market", telugu: "మార్కెట్", sentence: "The market is very busy.", teluguSentence: "మార్కెట్ చాలా రద్దీగా ఉంది.", image: "🏬" },
      { id: "s6", english: "Shop", telugu: "దుకాణం", sentence: "The shop opens at 9 AM.", teluguSentence: "దుకాణం ఉదయం 9 గంటలకు తెరుస్తారు.", image: "🏪" },
      { id: "s7", english: "Cheap", telugu: "చవక", sentence: "This cloth is cheap.", teluguSentence: "ఈ బట్ట చవక.", image: "👍" },
      { id: "s8", english: "Expensive", telugu: "ఖరీదైన", sentence: "This phone is expensive.", teluguSentence: "ఈ ఫోన్ ఖరీదైనది.", image: "📱" },
      { id: "s9", english: "Bag", telugu: "సంచి", sentence: "Put it in the bag.", teluguSentence: "దాన్ని సంచిలో పెట్టండి.", image: "👜" },
      { id: "s10", english: "Bill", telugu: "బిల్లు", sentence: "Please give me the bill.", teluguSentence: "దయచేసి నాకు బిల్లు ఇవ్వండి.", image: "🧾" },
    ],
  },
  {
    id: "health",
    title: "Health",
    icon: "🏥",
    words: [
      { id: "h1", english: "Doctor", telugu: "డాక్టర్", sentence: "I need to see a doctor.", teluguSentence: "నేను డాక్టర్‌ని చూడాలి.", image: "👨‍⚕️" },
      { id: "h2", english: "Medicine", telugu: "మందు", sentence: "Take this medicine after food.", teluguSentence: "ఈ మందు భోజనం తర్వాత తీసుకోండి.", image: "💊" },
      { id: "h3", english: "Hospital", telugu: "ఆసుపత్రి", sentence: "The hospital is nearby.", teluguSentence: "ఆసుపత్రి దగ్గరలో ఉంది.", image: "🏥" },
      { id: "h4", english: "Fever", telugu: "జ్వరం", sentence: "I have a fever.", teluguSentence: "నాకు జ్వరం వచ్చింది.", image: "🤒" },
      { id: "h5", english: "Pain", telugu: "నొప్పి", sentence: "I feel pain in my leg.", teluguSentence: "నా కాలిలో నొప్పి ఉంది.", image: "😣" },
      { id: "h6", english: "Water", telugu: "నీరు", sentence: "Drink more water.", teluguSentence: "ఎక్కువ నీరు తాగండి.", image: "💧" },
      { id: "h7", english: "Rest", telugu: "విశ్రాంతి", sentence: "You need rest.", teluguSentence: "మీకు విశ్రాంతి కావాలి.", image: "🛏️" },
      { id: "h8", english: "Healthy", telugu: "ఆరోగ్యం", sentence: "Eat healthy food.", teluguSentence: "ఆరోగ్యకరమైన ఆహారం తినండి.", image: "💪" },
      { id: "h9", english: "Cough", telugu: "దగ్గు", sentence: "I have a bad cough.", teluguSentence: "నాకు చాలా దగ్గు వస్తోంది.", image: "🤧" },
      { id: "h10", english: "Headache", telugu: "తలనొప్పి", sentence: "I have a headache.", teluguSentence: "నాకు తలనొప్పి ఉంది.", image: "🤕" },
    ],
  },
  {
    id: "daily-work",
    title: "Daily Work",
    icon: "🔨",
    words: [
      { id: "d1", english: "Work", telugu: "పని", sentence: "I go to work every day.", teluguSentence: "నేను ప్రతి రోజు పనికి వెళ్తాను.", image: "💼" },
      { id: "d2", english: "Farm", telugu: "పొలం", sentence: "He works in the farm.", teluguSentence: "అతను పొలంలో పని చేస్తాడు.", image: "🌾" },
      { id: "d3", english: "Cook", telugu: "వంట", sentence: "She can cook well.", teluguSentence: "ఆమె బాగా వంట చేస్తుంది.", image: "👩‍🍳" },
      { id: "d4", english: "Clean", telugu: "శుభ్రం", sentence: "Clean the house.", teluguSentence: "ఇల్లు శుభ్రం చేయండి.", image: "🧹" },
      { id: "d5", english: "Wash", telugu: "ఉతకడం", sentence: "Wash your hands.", teluguSentence: "మీ చేతులు కడుక్కోండి.", image: "🧼" },
      { id: "d6", english: "Build", telugu: "నిర్మించు", sentence: "They build houses.", teluguSentence: "వాళ్ళు ఇళ్ళు నిర్మిస్తారు.", image: "🏗️" },
      { id: "d7", english: "Carry", telugu: "మోయడం", sentence: "Help me carry this.", teluguSentence: "ఇది మోయడంలో నాకు సహాయం చేయండి.", image: "📦" },
      { id: "d8", english: "Dig", telugu: "తవ్వడం", sentence: "Dig a well here.", teluguSentence: "ఇక్కడ బావి తవ్వండి.", image: "⛏️" },
      { id: "d9", english: "Sew", telugu: "కుట్టడం", sentence: "She can sew clothes.", teluguSentence: "ఆమె బట్టలు కుడుతుంది.", image: "🧵" },
      { id: "d10", english: "Fix", telugu: "బాగు చేయడం", sentence: "Fix the broken chair.", teluguSentence: "విరిగిన కుర్చీ బాగు చేయండి.", image: "🔧" },
    ],
  },
  {
    id: "transport",
    title: "Transport",
    icon: "🚌",
    words: [
      { id: "t1", english: "Bus", telugu: "బస్సు", sentence: "The bus comes at 8 AM.", teluguSentence: "బస్సు ఉదయం 8 గంటలకు వస్తుంది.", image: "🚌" },
      { id: "t2", english: "Train", telugu: "రైలు", sentence: "We travel by train.", teluguSentence: "మేము రైలులో ప్రయాణిస్తాము.", image: "🚂" },
      { id: "t3", english: "Road", telugu: "రోడ్డు", sentence: "The road is long.", teluguSentence: "రోడ్డు చాలా పొడవుగా ఉంది.", image: "🛤️" },
      { id: "t4", english: "Ticket", telugu: "టిక్కెట్", sentence: "Buy a ticket first.", teluguSentence: "ముందుగా టిక్కెట్ కొనండి.", image: "🎫" },
      { id: "t5", english: "Auto", telugu: "ఆటో", sentence: "Take an auto to the market.", teluguSentence: "మార్కెట్‌కి ఆటో తీసుకోండి.", image: "🛺" },
      { id: "t6", english: "Bicycle", telugu: "సైకిల్", sentence: "He rides a bicycle.", teluguSentence: "అతను సైకిల్ తొక్కుతాడు.", image: "🚲" },
      { id: "t7", english: "Walk", telugu: "నడక", sentence: "Let us walk to school.", teluguSentence: "బడికి నడిచి వెళ్దాం.", image: "🚶" },
      { id: "t8", english: "Station", telugu: "స్టేషన్", sentence: "The station is far.", teluguSentence: "స్టేషన్ దూరంగా ఉంది.", image: "🏢" },
      { id: "t9", english: "Driver", telugu: "డ్రైవర్", sentence: "The driver is very good.", teluguSentence: "డ్రైవర్ చాలా మంచివాడు.", image: "👨‍✈️" },
      { id: "t10", english: "Fast", telugu: "వేగం", sentence: "The train is very fast.", teluguSentence: "రైలు చాలా వేగంగా వెళ్తుంది.", image: "💨" },
    ],
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    icon: "🍽️",
    words: [
      { id: "f1", english: "Rice", telugu: "అన్నం", sentence: "I eat rice every day.", teluguSentence: "నేను ప్రతి రోజు అన్నం తింటాను.", image: "🍚" },
      { id: "f2", english: "Tea", telugu: "చాయ్", sentence: "I drink tea in the morning.", teluguSentence: "నేను ఉదయం చాయ్ తాగుతాను.", image: "🍵" },
      { id: "f3", english: "Milk", telugu: "పాలు", sentence: "Milk is good for health.", teluguSentence: "పాలు ఆరోగ్యానికి మంచివి.", image: "🥛" },
      { id: "f4", english: "Bread", telugu: "రొట్టె", sentence: "Give me two breads.", teluguSentence: "నాకు రెండు రొట్టెలు ఇవ్వండి.", image: "🍞" },
      { id: "f5", english: "Fruit", telugu: "పండు", sentence: "Eat fresh fruit daily.", teluguSentence: "ప్రతి రోజు తాజా పండ్లు తినండి.", image: "🍎" },
      { id: "f6", english: "Vegetable", telugu: "కూరగాయ", sentence: "Buy fresh vegetables.", teluguSentence: "తాజా కూరగాయలు కొనండి.", image: "🥬" },
      { id: "f7", english: "Sugar", telugu: "పంచదార", sentence: "Add some sugar.", teluguSentence: "కొంచెం పంచదార వేయండి.", image: "🍬" },
      { id: "f8", english: "Salt", telugu: "ఉప్పు", sentence: "Add a little salt.", teluguSentence: "కొంచెం ఉప్పు వేయండి.", image: "🧂" },
      { id: "f9", english: "Egg", telugu: "గుడ్డు", sentence: "I ate two eggs.", teluguSentence: "నేను రెండు గుడ్లు తిన్నాను.", image: "🥚" },
      { id: "f10", english: "Chicken", telugu: "చికెన్", sentence: "We had chicken for lunch.", teluguSentence: "మేము భోజనానికి చికెన్ తిన్నాము.", image: "🍗" },
    ],
  },
];

export function getQuizQuestions(categoryId: string): QuizQuestion[] {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return [];

  const words = [...category.words].sort(() => Math.random() - 0.5).slice(0, 5);

  return words.map((word) => {
    const otherWords = category.words.filter((w) => w.id !== word.id);
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [word.telugu, ...shuffledOthers.map((w) => w.telugu)].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(word.telugu);

    return {
      question: `What is the Telugu meaning of "${word.english}"?`,
      options,
      correctIndex,
      wordId: word.id,
    };
  });
}

export const totalWords = categories.reduce((sum, c) => sum + c.words.length, 0);

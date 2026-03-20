import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const problems = [
  // LOGICAL REASONING - EASY
  { title: "Missing Number", description: "Find the missing: 2, 4, 8, 16, ?", topic: "Logical Reasoning", difficulty: "easy", options: ["24","32","28","30"], answer: "32", explanation: "Each number doubles. 16×2=32." },
  { title: "Odd One Out", description: "Which does NOT belong: Apple, Mango, Carrot, Banana?", topic: "Logical Reasoning", difficulty: "easy", options: ["Apple","Mango","Carrot","Banana"], answer: "Carrot", explanation: "Carrot is a vegetable. All others are fruits." },
  { title: "Direction Test", description: "Ram walks 5km North, 3km East, 5km South. How far from start?", topic: "Logical Reasoning", difficulty: "easy", options: ["3km","5km","8km","10km"], answer: "3km", explanation: "North and South cancel. Only 3km East remains." },
  { title: "Alphabet Series", description: "A, C, E, G, ?", topic: "Logical Reasoning", difficulty: "easy", options: ["H","I","J","K"], answer: "I", explanation: "Every alternate letter. A,C,E,G,I." },
  { title: "Simple Analogy", description: "Book : Library :: Painting : ?", topic: "Logical Reasoning", difficulty: "easy", options: ["Museum","School","Artist","Canvas"], answer: "Museum", explanation: "Books are kept in Library. Paintings in Museum." },
  { title: "What Am I", description: "I have cities but no houses, mountains but no trees, water but no fish. What am I?", topic: "Logical Reasoning", difficulty: "easy", options: ["A map","A painting","A dream","A mirror"], answer: "A map", explanation: "A map has representations but not real things." },
  { title: "Ranking Logic", description: "A > B > C, D < B, E > A. Who is smallest?", topic: "Logical Reasoning", difficulty: "easy", options: ["A","B","C","D"], answer: "D", explanation: "Chain: E>A>B>C>D. D is smallest." },
  { title: "Days Calculation", description: "How many days in 3 weeks and 4 days?", topic: "Logical Reasoning", difficulty: "easy", options: ["21","25","24","28"], answer: "25", explanation: "3×7=21. 21+4=25." },
  { title: "Letter Value", description: "If A=1, B=2...Z=26, what is CAT?", topic: "Logical Reasoning", difficulty: "easy", options: ["24","27","29","30"], answer: "24", explanation: "C=3, A=1, T=20. Sum=24." },
  { title: "Classification", description: "Rose, Lotus, Marigold, Mango — which is odd?", topic: "Logical Reasoning", difficulty: "easy", options: ["Rose","Lotus","Marigold","Mango"], answer: "Mango", explanation: "Mango is a fruit. Others are flowers." },
  { title: "Position Logic", description: "In queue of 10, Rahul is 4th from front. Position from back?", topic: "Logical Reasoning", difficulty: "easy", options: ["6th","7th","8th","5th"], answer: "7th", explanation: "10+1-4=7th from back." },
  { title: "Coin Riddle", description: "I have 2 coins totalling 30 paise. One is not a 5-paise coin. What are they?", topic: "Logical Reasoning", difficulty: "easy", options: ["Two 15p","25p and 5p","10p and 20p","15p and 15p"], answer: "25p and 5p", explanation: "One is NOT 5p — but the other one IS. A 25p and a 5p coin = 30p." },
  { title: "Animal Odd One", description: "Sparrow, Penguin, Eagle, Crow — which cannot fly?", topic: "Logical Reasoning", difficulty: "easy", options: ["Sparrow","Penguin","Eagle","Crow"], answer: "Penguin", explanation: "Penguins are flightless birds." },
  { title: "Vowel Count", description: "How many vowels in EDUCATION?", topic: "Logical Reasoning", difficulty: "easy", options: ["4","5","6","3"], answer: "5", explanation: "E,U,A,I,O = 5 vowels." },
  { title: "Simple Logic", description: "All cats are animals. Tiger is a cat. Therefore Tiger is?", topic: "Logical Reasoning", difficulty: "easy", options: ["Animal","Bird","Fish","Insect"], answer: "Animal", explanation: "Simple syllogism: Tiger is a cat, all cats are animals." },

  // LOGICAL REASONING - MEDIUM
  { title: "Blood Relation", description: "A is B's sister. B is C's brother. C is D's father. How is A related to D?", topic: "Logical Reasoning", difficulty: "medium", options: ["Aunt","Mother","Sister","Grandmother"], answer: "Aunt", explanation: "A→B sister→C sister→D's aunt." },
  { title: "Calendar Problem", description: "If Jan 1 2024 is Monday, what day is Feb 1 2024?", topic: "Logical Reasoning", difficulty: "medium", options: ["Wednesday","Thursday","Friday","Tuesday"], answer: "Thursday", explanation: "31 days in Jan. 31 mod 7=3. Monday+3=Thursday." },
  { title: "Mirror Clock", description: "Clock shows 4:45. Mirror image shows?", topic: "Logical Reasoning", difficulty: "medium", options: ["7:15","8:15","7:45","6:15"], answer: "7:15", explanation: "Mirror time = 11:60 - 4:45 = 7:15." },
  { title: "Statement Logic", description: "All birds can fly. Penguins are birds. Penguins can fly. This is?", topic: "Logical Reasoning", difficulty: "medium", options: ["Valid logically","Invalid logically","Factually correct","Both valid and factual"], answer: "Valid logically", explanation: "Logically valid even if factually wrong." },
  { title: "Assumption Test", description: "Ad: Use Brand X for whiter teeth. Assumption?", topic: "Logical Reasoning", difficulty: "medium", options: ["Implicit","Explicit","Not an assumption","Invalid"], answer: "Implicit", explanation: "Ad assumes people want whiter teeth — implicit." },
  { title: "Age Riddle", description: "When I was 6 my sister was half my age. I'm now 40. Sister's age?", topic: "Logical Reasoning", difficulty: "medium", options: ["20","34","37","38"], answer: "37", explanation: "Sister was 3 when I was 6. Difference always 3. 40-3=37." },
  { title: "Series Completion", description: "AZ, BY, CX, DW, ?", topic: "Logical Reasoning", difficulty: "medium", options: ["EV","FU","EU","FV"], answer: "EV", explanation: "Forward A→E, backward Z→V. EV." },
  { title: "Coding Alphabet", description: "MANGO = NBOIP. What is GRAPE?", topic: "Logical Reasoning", difficulty: "medium", options: ["HSBQF","ISBQF","HSAQF","HSBRF"], answer: "HSBQF", explanation: "Each letter +1. G→H,R→S,A→B,P→Q,E→F." },
  { title: "Number Analogy", description: "36:6 :: 64:?", topic: "Logical Reasoning", difficulty: "medium", options: ["7","8","9","10"], answer: "8", explanation: "36=6². 64=8². Square root relationship." },
  { title: "Critical Reasoning", description: "All politicians are liars. Some liars are rich. Some politicians are rich. Valid?", topic: "Logical Reasoning", difficulty: "medium", options: ["Valid","Invalid","Partially Valid","Cannot Determine"], answer: "Cannot Determine", explanation: "Rich liars may not overlap with politicians." },

  // LOGICAL REASONING - HARD
  { title: "Syllogism", description: "All roses are flowers. Some flowers fade. Some roses fade. Valid?", topic: "Logical Reasoning", difficulty: "hard", options: ["Valid","Invalid","Partially Valid","Cannot Determine"], answer: "Invalid", explanation: "Fading flowers may not be roses. Cannot distribute." },
  { title: "Critical Path", description: "Tasks: A(3d), B(4d), C(2d after A), D(3d after B), E(1d after C&D). Min days?", topic: "Logical Reasoning", difficulty: "hard", options: ["8","9","10","11"], answer: "8", explanation: "A+C+E=6, B+D+E=8. Critical = 8." },
  { title: "Advanced Code", description: "5+3=28, 9+1=810, 8+6=214, 7+3=?", topic: "Logical Reasoning", difficulty: "hard", options: ["410","49","421","44"], answer: "410", explanation: "(a-b)(a+b): 7-3=4, 7+3=10. Answer=410." },
  { title: "Logic Chain", description: "P→Q, Q→R, R→S, ¬S. Can we conclude ¬P?", topic: "Logical Reasoning", difficulty: "hard", options: ["Yes","No","Only if P true","Cannot determine"], answer: "Yes", explanation: "Modus Tollens chain: ¬S→¬R→¬Q→¬P." },
  { title: "Barber Paradox", description: "Barber shaves all who don't shave themselves. Who shaves barber?", topic: "Logical Reasoning", difficulty: "hard", options: ["Himself","Someone else","Nobody","Paradox"], answer: "Paradox", explanation: "Russell's Paradox — self-referential contradiction." },
  { title: "100 Days", description: "What day is 100 days from Monday?", topic: "Logical Reasoning", difficulty: "hard", options: ["Tuesday","Wednesday","Thursday","Friday"], answer: "Wednesday", explanation: "100 mod 7=2. Monday+2=Wednesday." },
  { title: "Logical Equivalence", description: "Equivalent to 'If P then Q'?", topic: "Logical Reasoning", difficulty: "hard", options: ["If Q then P","If not P then not Q","If not Q then not P","P and Q"], answer: "If not Q then not P", explanation: "Contrapositive P→Q is ¬Q→¬P. Logically equivalent." },
  { title: "Factorial Series", description: "1, 2, 6, 24, 120, 720, ?", topic: "Logical Reasoning", difficulty: "hard", options: ["4320","5040","6720","7200"], answer: "5040", explanation: "Factorials: 7!=5040." },

  // MATH PUZZLES - EASY
  { title: "Train Speed", description: "300m train passes pole in 30 seconds. Speed in km/h?", topic: "Math Puzzles", difficulty: "easy", options: ["30","36","40","45"], answer: "36", explanation: "300/30=10 m/s × 3.6=36 km/h." },
  { title: "Profit Percentage", description: "Buy ₹800, sell ₹1000. Profit %?", topic: "Math Puzzles", difficulty: "easy", options: ["20%","25%","15%","30%"], answer: "25%", explanation: "Profit=200. 200/800×100=25%." },
  { title: "Simple Interest", description: "₹5000 at 10% p.a. SI for 3 years. Interest?", topic: "Math Puzzles", difficulty: "easy", options: ["₹1200","₹1500","₹1800","₹2000"], answer: "₹1500", explanation: "SI=5000×10×3/100=₹1500." },
  { title: "Average", description: "Average of 5 numbers is 20. Four are 10,20,25,30. Fifth?", topic: "Math Puzzles", difficulty: "easy", options: ["10","15","20","25"], answer: "15", explanation: "Sum=100. Known=85. Fifth=15." },
  { title: "Percentage Easy", description: "15% of 200?", topic: "Math Puzzles", difficulty: "easy", options: ["25","30","35","40"], answer: "30", explanation: "15/100 × 200 = 30." },
  { title: "LCM", description: "LCM of 12 and 18?", topic: "Math Puzzles", difficulty: "easy", options: ["24","36","48","72"], answer: "36", explanation: "12=2²×3, 18=2×3². LCM=2²×3²=36." },
  { title: "Speed", description: "Car travels 240km in 4 hours. Speed?", topic: "Math Puzzles", difficulty: "easy", options: ["50","55","60","65"], answer: "60", explanation: "240/4=60 km/h." },
  { title: "Square Root", description: "√225=?", topic: "Math Puzzles", difficulty: "easy", options: ["13","14","15","16"], answer: "15", explanation: "15×15=225." },
  { title: "Discount", description: "₹500 with 20% discount. Final price?", topic: "Math Puzzles", difficulty: "easy", options: ["₹380","₹390","₹400","₹420"], answer: "₹400", explanation: "500-100=₹400." },
  { title: "Circle Area", description: "Circle radius 7cm. Area? (π=22/7)", topic: "Math Puzzles", difficulty: "easy", options: ["144","154","164","174"], answer: "154", explanation: "22/7 × 49 = 154 cm²." },
  { title: "Power", description: "2⁸=?", topic: "Math Puzzles", difficulty: "easy", options: ["128","256","512","64"], answer: "256", explanation: "2^8=256." },
  { title: "Time Zones", description: "2 PM London (GMT). Time in Mumbai (GMT+5:30)?", topic: "Math Puzzles", difficulty: "easy", options: ["7:30 PM","8:30 PM","6:30 PM","9:30 PM"], answer: "7:30 PM", explanation: "2:00+5:30=7:30 PM." },
  { title: "Odd Numbers Sum", description: "Sum of first 5 odd numbers?", topic: "Math Puzzles", difficulty: "easy", options: ["20","23","25","27"], answer: "25", explanation: "1+3+5+7+9=25=5²." },
  { title: "Volume Cube", description: "Cube with side 5cm. Volume?", topic: "Math Puzzles", difficulty: "easy", options: ["100","115","125","150"], answer: "125", explanation: "5³=125 cm³." },
  { title: "Ratio Easy", description: "Divide ₹360 in 3:5. Smaller share?", topic: "Math Puzzles", difficulty: "easy", options: ["₹100","₹120","₹135","₹150"], answer: "₹135", explanation: "3/8 × 360=₹135." },

  // MATH PUZZLES - MEDIUM
  { title: "Pipes Cistern", description: "Pipe A fills in 4h, B in 6h. Together?", topic: "Math Puzzles", difficulty: "medium", options: ["2.4 hours","3 hours","2 hours","3.5 hours"], answer: "2.4 hours", explanation: "1/4+1/6=5/12. Time=12/5=2.4h." },
  { title: "Compound Interest", description: "₹5000 at 10% CI for 2 years. Amount?", topic: "Math Puzzles", difficulty: "medium", options: ["₹6000","₹6050","₹6100","₹5500"], answer: "₹6050", explanation: "5000×1.1²=₹6050." },
  { title: "Age Puzzle", description: "Father is 3x son's age. 12 years later father is 2x. Son's age?", topic: "Math Puzzles", difficulty: "medium", options: ["10","12","14","16"], answer: "12", explanation: "3x+12=2(x+12). x=12." },
  { title: "Speed Meeting", description: "Two trains 200km apart, 60 and 40 km/h toward each other. Meet when?", topic: "Math Puzzles", difficulty: "medium", options: ["1 hour","2 hours","2.5 hours","3 hours"], answer: "2 hours", explanation: "200/100=2 hours." },
  { title: "Percentage Change", description: "Price +20% then -20%. Net?", topic: "Math Puzzles", difficulty: "medium", options: ["0%","-4%","+4%","-2%"], answer: "-4%", explanation: "100→120→96. Net=-4%." },
  { title: "Work Together", description: "A does job in 10d, B in 15d. A works 5d then leaves. B finishes. Total days?", topic: "Math Puzzles", difficulty: "medium", options: ["13","12.5","11.5","14"], answer: "12.5", explanation: "A does 1/2 in 5d. B finishes 1/2 in 7.5d. Total=12.5." },
  { title: "Mixture", description: "20L milk:water=3:1. Add water for 3:2. How much?", topic: "Math Puzzles", difficulty: "medium", options: ["4L","5L","6L","8L"], answer: "5L", explanation: "Milk=15, water=5. 15/(5+x)=3/2. x=5." },
  { title: "Boats Streams", description: "Boat 10km/h, stream 4km/h. 42km downstream+return?", topic: "Math Puzzles", difficulty: "medium", options: ["9h","9.5h","10h","10.5h"], answer: "10h", explanation: "42/14+42/6=3+7=10h." },
  { title: "Probability", description: "Bag: 3 red, 4 blue. Draw one. P(red)?", topic: "Math Puzzles", difficulty: "medium", options: ["3/4","3/7","4/7","1/2"], answer: "3/7", explanation: "3/(3+4)=3/7." },
  { title: "Clocks Angle", description: "Angle between hands at 3:30?", topic: "Math Puzzles", difficulty: "medium", options: ["65°","75°","80°","85°"], answer: "75°", explanation: "Minute=180°. Hour=105°. Diff=75°." },
  { title: "Quadratic", description: "Roots of x²-5x+6=0?", topic: "Math Puzzles", difficulty: "medium", options: ["2 and 3","1 and 6","2 and 4","3 and 3"], answer: "2 and 3", explanation: "(x-2)(x-3)=0." },
  { title: "Log", description: "log₂(64)=?", topic: "Math Puzzles", difficulty: "medium", options: ["4","5","6","8"], answer: "6", explanation: "2⁶=64." },
  { title: "Set Theory", description: "100 students: 60 cricket, 50 football, 30 both. Neither?", topic: "Math Puzzles", difficulty: "medium", options: ["10","15","20","25"], answer: "20", explanation: "60+50-30=80. 100-80=20." },
  { title: "Train Bridge", description: "300m train at 54km/h crosses 200m bridge. Time?", topic: "Math Puzzles", difficulty: "medium", options: ["30s","33.3s","35s","40s"], answer: "33.3s", explanation: "500m at 15m/s=33.3s." },
  { title: "Ratio Advanced", description: "A:B=3:4, B:C=6:5. A:B:C=?", topic: "Math Puzzles", difficulty: "medium", options: ["9:12:10","3:4:5","6:8:10","18:24:20"], answer: "9:12:10", explanation: "A:B=9:12, B:C=12:10. Combined 9:12:10." },

  // MATH PUZZLES - HARD
  { title: "Probability Both Red", description: "Bag: 3 red, 4 blue. Draw 2 without replacement. P(both red)?", topic: "Math Puzzles", difficulty: "hard", options: ["1/7","3/14","2/7","1/14"], answer: "1/7", explanation: "(3/7)×(2/6)=6/42=1/7." },
  { title: "Permutation", description: "4-digit numbers from 1,2,3,4,5 no repeat?", topic: "Math Puzzles", difficulty: "hard", options: ["60","120","240","360"], answer: "120", explanation: "5P4=5×4×3×2=120." },
  { title: "Circle vs Square", description: "Square and circle equal perimeter 44cm. Greater area?", topic: "Math Puzzles", difficulty: "hard", options: ["Square","Circle","Equal","Cannot say"], answer: "Circle", explanation: "Square area=121. Circle area=154. Circle wins." },
  { title: "Geometric Series", description: "Sum of infinite GP: first=1, ratio=1/2?", topic: "Math Puzzles", difficulty: "hard", options: ["1","1.5","2","2.5"], answer: "2", explanation: "a/(1-r)=1/0.5=2." },
  { title: "Modular Arithmetic", description: "7¹⁰⁰ mod 5=?", topic: "Math Puzzles", difficulty: "hard", options: ["0","1","2","4"], answer: "1", explanation: "7 mod 5=2. 2⁴ mod 5=1. 100 mod 4=0. Answer=1." },
  { title: "Integration", description: "Area under y=x² from x=0 to x=3?", topic: "Math Puzzles", difficulty: "hard", options: ["7","8","9","10"], answer: "9", explanation: "∫₀³x²dx=[x³/3]₀³=27/3=9." },
  { title: "Matrix Det", description: "Determinant of [[2,3],[1,4]]?", topic: "Math Puzzles", difficulty: "hard", options: ["4","5","6","7"], answer: "5", explanation: "2×4-3×1=8-3=5." },
  { title: "AP Sum", description: "Sum of multiples of 7 between 100 and 200?", topic: "Math Puzzles", difficulty: "hard", options: ["2107","2156","2177","2205"], answer: "2107", explanation: "First=105, Last=196. n=14. 14/2×301=2107." },

  // VERBAL REASONING - EASY
  { title: "Doctor Analogy", description: "Doctor : Hospital :: Teacher : ?", topic: "Verbal Reasoning", difficulty: "easy", options: ["School","Book","Student","Classroom"], answer: "School", explanation: "Doctor works in Hospital. Teacher in School." },
  { title: "Synonym Kind", description: "Synonym of BENEVOLENT?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Kind","Cruel","Angry","Jealous"], answer: "Kind", explanation: "Benevolent means kindly." },
  { title: "Antonym Abundant", description: "Antonym of ABUNDANT?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Scarce","Plenty","Rich","Full"], answer: "Scarce", explanation: "Abundant=plentiful. Antonym=Scarce." },
  { title: "Sentence Complete", description: "The scientist made a _____ discovery that changed medicine.", topic: "Verbal Reasoning", difficulty: "easy", options: ["groundbreaking","boring","small","forgotten"], answer: "groundbreaking", explanation: "Groundbreaking means revolutionary." },
  { title: "Idiom Tree", description: "Meaning of 'barking up the wrong tree'?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Wrong course","Shouting","Climbing","Aggressive"], answer: "Wrong course", explanation: "Means pursuing a mistaken course." },
  { title: "Bilingual", description: "One who speaks two languages:", topic: "Verbal Reasoning", difficulty: "easy", options: ["Polyglot","Bilingual","Monolingual","Multilingual"], answer: "Bilingual", explanation: "Bi=two. Bilingual=two languages." },
  { title: "Paw Hoof", description: "Paw : Cat :: Hoof : ?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Horse","Dog","Bird","Fish"], answer: "Horse", explanation: "Paw is cat's foot. Hoof is horse's foot." },
  { title: "Antonym Ancient", description: "Antonym of ANCIENT?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Old","Modern","Historical","Classic"], answer: "Modern", explanation: "Ancient=very old. Antonym=Modern." },
  { title: "Verbose", description: "VERBOSE means?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Too many words","Speaking softly","Being quiet","Speaking clearly"], answer: "Too many words", explanation: "Verbose=using excessive words." },
  { title: "Correct Spelling", description: "Which is spelled correctly?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Accomodation","Accommodation","Acommodation","Acomodation"], answer: "Accommodation", explanation: "Double 'c' and double 'm'." },
  { title: "School of Fish", description: "A _____ of fish:", topic: "Verbal Reasoning", difficulty: "easy", options: ["pack","herd","school","flock"], answer: "school", explanation: "A school of fish is correct collective noun." },
  { title: "Abstract Noun", description: "Which is an abstract noun?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Chair","Mango","Honesty","Teacher"], answer: "Honesty", explanation: "Abstract nouns name qualities. Honesty is abstract." },
  { title: "Prefix DIS", description: "DIS prefix in disagree, disappear means?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Before","After","Not/Opposite","Again"], answer: "Not/Opposite", explanation: "DIS means not or opposite." },
  { title: "Actions Proverb", description: "Meaning of 'Actions speak louder than words'?", topic: "Verbal Reasoning", difficulty: "easy", options: ["Loud people effective","What you do matters more","Words are useless","Actions are loud"], answer: "What you do matters more", explanation: "Behaviour reveals true character more than words." },
  { title: "Good At", description: "She is good ___ mathematics.", topic: "Verbal Reasoning", difficulty: "easy", options: ["in","at","on","with"], answer: "at", explanation: "'Good at' is the correct preposition." },

  // VERBAL REASONING - MEDIUM
  { title: "Comprehension", description: "Amazon produces 20% of Earth's oxygen and houses 10% of species. Primary importance?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Oxygen production","Tourism","Timber","Agriculture"], answer: "Oxygen production", explanation: "First and primary mention is oxygen." },
  { title: "Para Jumble", description: "Arrange: (A)Failed (B)Never studied (C)Exams tough (D)But lazy. Order?", topic: "Verbal Reasoning", difficulty: "medium", options: ["CBDA","BCDA","CDBA","BDCA"], answer: "CBDA", explanation: "C(context)B(cause)D(elaboration)A(result)." },
  { title: "Ephemeral", description: "EPHEMERAL means?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Eternal","Short-lived","Important","Mysterious"], answer: "Short-lived", explanation: "Ephemeral=lasting very short time." },
  { title: "Architect Score", description: "Architect : Blueprint :: Composer : ?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Song","Score","Note","Instrument"], answer: "Score", explanation: "Architect makes blueprint. Composer makes score." },
  { title: "Bite Bullet", description: "'He bit the bullet.' Meaning?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Ate something","Endured stoically","Ran away","Got angry"], answer: "Endured stoically", explanation: "Bite the bullet = endure pain with courage." },
  { title: "Book Reader", description: "All educated read books. John reads. John is educated?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Yes","No","Cannot Determine","Partially"], answer: "Cannot Determine", explanation: "Not all readers are necessarily educated." },
  { title: "Pungent", description: "'PUNGENT smell of garlic.' PUNGENT means?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Sweet","Strong and sharp","Mild","Pleasant"], answer: "Strong and sharp", explanation: "Pungent=strong, sharp smell." },
  { title: "Ameliorate", description: "AMELIORATE means?", topic: "Verbal Reasoning", difficulty: "medium", options: ["To worsen","To improve","To maintain","To destroy"], answer: "To improve", explanation: "Ameliorate=make something better." },
  { title: "Drought Famine", description: "Drought : Famine :: War : ?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Peace","Destruction","Victory","Army"], answer: "Destruction", explanation: "Drought causes Famine. War causes Destruction." },
  { title: "Encryption Weakens", description: "Tech=less privacy. Which weakens this?", topic: "Verbal Reasoning", difficulty: "medium", options: ["Companies share data","Encryption protects","Phones track","Social media collects"], answer: "Encryption protects", explanation: "Encryption is tech that enhances privacy." },

  // VERBAL REASONING - HARD
  { title: "Prologue Finale", description: "Prologue : Epilogue :: Overture : ?", topic: "Verbal Reasoning", difficulty: "hard", options: ["Opera","Finale","Symphony","Prelude"], answer: "Finale", explanation: "Prologue begins, Epilogue ends. Overture begins, Finale ends." },
  { title: "Democracy Education", description: "'No effective democracy without educated populace.' Inference?", topic: "Verbal Reasoning", difficulty: "hard", options: ["Education harms","Education is prerequisite","Democracy causes education","Educated avoid politics"], answer: "Education is prerequisite", explanation: "Education is necessary for democracy — direct inference." },
  { title: "Metaphor Pen", description: "'Pen is mightier than sword.' Uses?", topic: "Verbal Reasoning", difficulty: "hard", options: ["Simile","Metaphor","Alliteration","Personification"], answer: "Metaphor", explanation: "Direct comparison without 'like/as' = metaphor." },
  { title: "Affirming Consequent", description: "A-students study hard. Some B-students also study hard. B-students are A-students. Flaw?", topic: "Verbal Reasoning", difficulty: "hard", options: ["False premise","Affirming the consequent","Circular","Slippery slope"], answer: "Affirming the consequent", explanation: "If P→Q, Q true doesn't mean P true." },
  { title: "Sanguine", description: "SANGUINE means?", topic: "Verbal Reasoning", difficulty: "hard", options: ["Pessimistic","Optimistic","Aggressive","Passive"], answer: "Optimistic", explanation: "Sanguine=optimistic especially in difficulties." },
  { title: "Telescope Ambiguity", description: "'She saw man with telescope.' How many interpretations?", topic: "Verbal Reasoning", difficulty: "hard", options: ["1","2","3","4"], answer: "2", explanation: "She used it OR man had it. Two meanings." },
  { title: "Philosophy Etymology", description: "PHILO+SOPHIA means?", topic: "Verbal Reasoning", difficulty: "hard", options: ["Love of wisdom","Study of nature","Art of speaking","Science of numbers"], answer: "Love of wisdom", explanation: "Philo=love, Sophia=wisdom." },
  { title: "Sarcasm Detect", description: "Which phrase reveals sarcasm: criticizing education cuts?", topic: "Verbal Reasoning", difficulty: "hard", options: ["Policy failed","Oh yes, brilliant idea to cut education","We need reform","Data shows decline"], answer: "Oh yes, brilliant idea to cut education", explanation: "Sarcasm praises ironically to criticize." },

  // PATTERN RECOGNITION - EASY
  { title: "Fibonacci", description: "1, 1, 2, 3, 5, 8, 13, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["18","19","20","21"], answer: "21", explanation: "8+13=21. Fibonacci sequence." },
  { title: "Letter Skip", description: "A, C, E, G, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["H","I","J","K"], answer: "I", explanation: "Skip one letter. A,C,E,G,I." },
  { title: "Doubling", description: "3, 6, 12, 24, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["36","42","48","54"], answer: "48", explanation: "×2 each time. 24×2=48." },
  { title: "Adding Five", description: "5, 10, 15, 20, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["22","24","25","30"], answer: "25", explanation: "+5 each time. 20+5=25." },
  { title: "Symbol Pattern", description: "◆◆○◆◆○◆◆?", topic: "Pattern Recognition", difficulty: "easy", options: ["○","◆","□","△"], answer: "○", explanation: "Pattern ◆◆○ repeats. After ◆◆ comes ○." },
  { title: "Halving", description: "256, 128, 64, 32, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["8","12","16","20"], answer: "16", explanation: "÷2 each time. 32÷2=16." },
  { title: "Perfect Squares", description: "1, 4, 9, 16, 25, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["30","35","36","40"], answer: "36", explanation: "1²,2²,3²,4²,5²,6²=36." },
  { title: "Backwards Skip", description: "Z, X, V, T, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["Q","R","S","P"], answer: "R", explanation: "Go back skipping one. Z,X,V,T,R." },
  { title: "Cubes", description: "1, 8, 27, 64, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["100","115","125","135"], answer: "125", explanation: "1³,2³,3³,4³,5³=125." },
  { title: "Missing Letter Box", description: "B, E, H, K, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["M","N","O","L"], answer: "N", explanation: "+3 each time. B(2),E(5),H(8),K(11),N(14)." },
  { title: "Subtract Six", description: "50, 44, 38, 32, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["24","26","28","30"], answer: "26", explanation: "-6 each time. 32-6=26." },
  { title: "Even Numbers", description: "2, 4, 6, 8, 10, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["11","12","13","14"], answer: "12", explanation: "+2 each time. 10+2=12." },
  { title: "Roman Numerals", description: "I, III, V, VII, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["VIII","IX","X","XI"], answer: "IX", explanation: "Odd numbers in Roman. 9=IX." },
  { title: "Color Repeat", description: "Red, Blue, Green, Red, Blue, ?", topic: "Pattern Recognition", difficulty: "easy", options: ["Red","Blue","Green","Yellow"], answer: "Green", explanation: "Pattern Red,Blue,Green repeats." },
  { title: "Matrix", description: "Row1:1,2,3. Row2:4,5,6. Row3:7,8,?", topic: "Pattern Recognition", difficulty: "easy", options: ["9","10","11","12"], answer: "9", explanation: "Sequential numbers. After 8=9." },

  // PATTERN RECOGNITION - MEDIUM
  { title: "Complex Series", description: "2, 6, 12, 20, 30, 42, ?", topic: "Pattern Recognition", difficulty: "medium", options: ["52","54","56","58"], answer: "56", explanation: "Differences +2 each: 4,6,8,10,12,14. 42+14=56." },
  { title: "Word Series", description: "ACE, BDF, CEG, DFH, ?", topic: "Pattern Recognition", difficulty: "medium", options: ["EGI","EHI","FGI","EGH"], answer: "EGI", explanation: "Each group +1 in all letters. EGI." },
  { title: "Mixed Series", description: "3, 7, 13, 21, 31, 43, ?", topic: "Pattern Recognition", difficulty: "medium", options: ["55","57","59","61"], answer: "57", explanation: "Differences 4,6,8,10,12,14. 43+14=57." },
  { title: "Alternating", description: "1, -2, 3, -4, 5, -6, ?", topic: "Pattern Recognition", difficulty: "medium", options: ["6","7","-7","8"], answer: "7", explanation: "Alternating +/-. Next positive integer=7." },
  { title: "Letter Number", description: "A1, B4, C9, D16, ?", topic: "Pattern Recognition", difficulty: "medium", options: ["E20","E25","F25","E24"], answer: "E25", explanation: "Letters in order, squares: 1,4,9,16,25. E25." },
  { title: "Cube Faces", description: "3×3×3 cube painted, cut into 27. Exactly 2 faces painted?", topic: "Pattern Recognition", difficulty: "medium", options: ["8","12","6","4"], answer: "12", explanation: "Edge pieces have 2 faces painted. 12 edges." },
  { title: "Pythagorean", description: "After 3,4,5 the next Pythagorean triple is?", topic: "Pattern Recognition", difficulty: "medium", options: ["5,12,13","6,8,10","7,8,9","4,5,6"], answer: "5,12,13", explanation: "5,12,13 is the next primitive triple." },
  { title: "Mirror Number", description: "12321, 123321, 1233321, ?", topic: "Pattern Recognition", difficulty: "medium", options: ["12333321","12344321","123444321","1234321"], answer: "12333321", explanation: "One more 3 added each time." },
  { title: "Rotation", description: "Shape rotates 90° clockwise per step. After 7 steps, net rotation?", topic: "Pattern Recognition", difficulty: "medium", options: ["0°","90°","180°","270°"], answer: "270°", explanation: "7×90=630. 630 mod 360=270°." },
  { title: "Venn Diagram", description: "100 students: 60 cricket, 50 football, 30 both. Neither?", topic: "Pattern Recognition", difficulty: "medium", options: ["10","15","20","25"], answer: "20", explanation: "60+50-30=80. 100-80=20." },

  // PATTERN RECOGNITION - HARD
  { title: "Complex Rule", description: "3→12, 5→30, 7→56, 9→?", topic: "Pattern Recognition", difficulty: "hard", options: ["72","88","90","96"], answer: "90", explanation: "n×(n+1). 9×10=90." },
  { title: "Lucas Sequence", description: "2,1,3,4,7,11,18,?", topic: "Pattern Recognition", difficulty: "hard", options: ["25","27","29","31"], answer: "29", explanation: "Lucas numbers: 11+18=29." },
  { title: "Zero Painted", description: "3×3×3 cube, how many unit cubes have NO painted face?", topic: "Pattern Recognition", difficulty: "hard", options: ["1","8","6","4"], answer: "1", explanation: "Only the center cube has zero painted faces." },
  { title: "Magic Square", description: "Magic square sum=15. One row is 2,7,6. Top-left if middle row is 9,5,1?", topic: "Pattern Recognition", difficulty: "hard", options: ["2","4","6","8"], answer: "4", explanation: "Standard 3×3 magic square: top-left=4." },
  { title: "Prime Differences", description: "Differences between 2,3,5,7,11,13?", topic: "Pattern Recognition", difficulty: "hard", options: ["1,2,2,4,2","1,1,2,2,2","2,2,4,2,2","1,2,4,2,2"], answer: "1,2,2,4,2", explanation: "3-2=1,5-3=2,7-5=2,11-7=4,13-11=2." },
  { title: "Caesar Cipher", description: "Caesar +3: KHOOR=?", topic: "Pattern Recognition", difficulty: "hard", options: ["HELLO","WORLD","HOUSE","HILLY"], answer: "HELLO", explanation: "-3 each: K→H,H→E,O→L,O→L,R→O=HELLO." },
  { title: "Recursive", description: "a(1)=1, a(n)=2×a(n-1)+1. a(5)=?", topic: "Pattern Recognition", difficulty: "hard", options: ["21","31","41","51"], answer: "31", explanation: "1,3,7,15,31." },
  { title: "Sierpinski", description: "Sierpinski triangle: Level 0=1, Level 1=3, Level 2=9. Level 4=?", topic: "Pattern Recognition", difficulty: "hard", options: ["27","54","81","108"], answer: "81", explanation: "3ⁿ. 3⁴=81." },
];

async function main() {
  console.log('🌌 Seeding ORION database...');
  await prisma.progress.deleteMany();
  await prisma.problem.deleteMany();

  const today = new Date();
  const data = problems.map((p, i) => {
    const podDate = new Date(today);
    podDate.setDate(today.getDate() + i);
    return { ...p, options: JSON.stringify(p.options), podDate };
  });

  await prisma.problem.createMany({ data });

  const count = await prisma.problem.count();
  console.log(`✅ Seeded ${count} problems!`);

  const topics = {};
  problems.forEach(p => { topics[p.topic] = (topics[p.topic] || 0) + 1; });
  Object.entries(topics).forEach(([t, c]) => console.log(`   ${t}: ${c}`));
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
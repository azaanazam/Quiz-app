const questions = [
  { question: "Pakistan ka comi khana konsa hai?", answer: "nihari" },
  { question: "Pakistan kab azad howa?", answer: "14 August 1947" },
  { question: "Pakistan kis ne azad karaya?", answer: "Quaid-e-Azam Muhammad Ali Jinnah" },
  { question: "2 + 2 = ?", answer: "4" },
  { question: "Pakistan ka comi perinda konsa hai?", answer: "Chakor" },
  { question: "Pakistan ka comi khal konsa hai?", answer: "Hockey" },
  { question: "Pakistan ki comi language konsi hai?", answer: "Urdu" },
  { question: "Pakistan ki kis famous city ko 'City of Lights' kaha jata hai?", answer: "Karachi" },
  { question: "Pakistan ka favourite ice cream flavor kaunsa hai?", answer: "Kulfa" },
  { question: "Pakistan ki sabse famous city kaunsi hai?", answer: "Lahore" },
  { question: "Pakistan ka national drink kaunsa hai?", answer: "Ganne ka ras" },
  { question: "Larkiyan kis cheez se sabse zyada pyaar karti hain?", answer: "Shopping aur selfies!" },
  { question: "Larkiyan kis cheez ka sabse zyada khayal rakhti hain?", answer: "Apni hair style aur makeup!" },
  { question: "Namaz kitni waqt ki hoti hai?", answer: "Namaz 5 waqt ki hoti hai!" },
  { question: "Dua-e-Qunoot kis rakat mai perhi jati hai?", answer: "Dua-e-Qunoot Witr namaz mein padi jati hai." },
  { question: "100 - 45 =", answer: "55" },
  { question: "26 + 7", answer: "33" },
  { question: "Quaid-e-Azam ka asal naam kya tha?", answer: "Muhammad Ali Jinnah" },
  { question: "Quaid-e-Azam ki qabar kahan hai?", answer: "Mazar-e-Quaid, Karachi" },
  { question: "Larkiyon ka favourite color konsa hota hai?", answer: "Pink color" }
];

let currentIndex = 0;
let score = 0;
let userName = ''; // Variable to store the user's name
let startTime, endTime; // Variables to store quiz start and end times

// Start the quiz
function startQuiz() {
userName = document.getElementById("userName").value.trim();
if (userName === '') {
  alert("Please enter your name to start the quiz.");
  return;
}

document.getElementById("userNameSection").style.display = "none"; // Hide name input
loadQuestion(); // Load the first question
startTime = new Date(); // Start the timer when quiz starts
}

// Load the next question
function loadQuestion() {
if (currentIndex < questions.length) {
  document.getElementById("question").innerText = `Question ${currentIndex + 1}: ${questions[currentIndex].question}`;
  document.getElementById("userInput").value = ""; // Clear previous answer
  document.getElementById("feedback").innerText = ""; // Clear feedback
} else {
  endTime = new Date(); // End the timer when quiz finishes
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds
  
  document.getElementById("question").style.display = "none";
  document.getElementById("userInput").style.display = "none";
  document.querySelector("button").style.display = "none";
  
  document.getElementById("finalResult").innerText = `Quiz Finished! Your score: ${score} out of ${questions.length}`;
  document.getElementById("congratulations").innerText = `Congratulations, ${userName}!`;
  
  const grade = calculateGrade();
  document.getElementById("certificateName").innerText = `Name: ${userName}`;
  document.getElementById("certificateScore").innerText = `Score: ${score}`;
  document.getElementById("certificateGrade").innerText = `Grade: ${grade}`;
  
  document.getElementById("certificate").style.display = "block"; // Show certificate section
}
}

// Calculate grade based on score
function calculateGrade() {
if (score === questions.length) return "A+";
if (score >= questions.length * 0.8) return "A";
if (score >= questions.length * 0.6) return "B";
if (score >= questions.length * 0.4) return "C";
return "D";
}

// Submit the user's answer
function submitAnswer() {
const userAnswer = document.getElementById("userInput").value.trim().toLowerCase();
const correctAnswer = questions[currentIndex].answer.toLowerCase();

if (userAnswer === correctAnswer) {
  document.getElementById("feedback").innerText = "✅ Correct answer!";
  score++;
} else {
  document.getElementById("feedback").innerText = `❌ Incorrect. Correct answer: ${questions[currentIndex].answer}`;
}

currentIndex++;
setTimeout(loadQuestion, 1500); // 1.5 second delay to show feedback
}

// Generate and download the certificate as a PDF
function downloadCertificate() {
const { jsPDF } = window.jspdf; // Get jsPDF object
const doc = new jsPDF();

doc.setFontSize(20);
doc.text("Certificate of Completion", 105, 30, null, null, "center");

doc.setFontSize(14);
doc.text(`Name: ${userName}`, 20, 50);
doc.text(`Score: ${score} out of ${questions.length}`, 20, 60);
doc.text(`Grade: ${document.getElementById("certificateGrade").innerText}`, 20, 70);

doc.text("Thank you for completing the quiz!", 20, 90);

doc.save(`${userName}_Quiz_Certificate.pdf`);
}

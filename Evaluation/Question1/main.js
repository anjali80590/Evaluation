
const createScoreManager=require('./scoreManager.js')

// const scoreManager = createScoreManager();
// scoreManager.addScore("Alice", 85);
// scoreManager.addScore("Bob", 72);
// scoreManager.addScore("Charlie", 90);
// scoreManager.addScore("David", 58);

// console.log(scoreManager.getScores());
// console.log(scoreManager.getSortedScores());
// console.log(scoreManager.getFilteredScores(60));
// console.log(scoreManager.getAverageScore());


const scoreManager = createScoreManager();
scoreManager.addScore("Eve", 92);
scoreManager.addScore("Frank", 45);
scoreManager.addScore("Grace", 78);

console.log(scoreManager.getScores());
console.log(scoreManager.getSortedScores());
console.log(scoreManager.getFilteredScores(60));
console.log(scoreManager.getAverageScore());


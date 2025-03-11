// services/calculateOdds.js

const calculateOdds = (event) => {
    const totalBets = event.totalBets || 1; // Avoid division by zero
    const homeWinProbability = event.score.home / (event.score.home + event.score.away + 1);
    const awayWinProbability = event.score.away / (event.score.home + event.score.away + 1);
    const drawProbability = 1 - (homeWinProbability + awayWinProbability);
  
    return {
      home: (1 / homeWinProbability) * 0.9, // Adjust for profit margin
      away: (1 / awayWinProbability) * 0.9,
      draw: (1 / drawProbability) * 0.9,
    };
  };
  
  export default calculateOdds;
  
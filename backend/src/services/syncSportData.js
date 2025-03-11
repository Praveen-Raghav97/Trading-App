
// services/syncSportsData.js

import Event from "../models/Event";
import calculateOdds from "./calculateOdds";
import fetchData from "./fetchData";

const syncSportsData = async () => {
  const sportsData = await fetchData();
  if (!sportsData) return;

  for (const game of sportsData) {
    const existingEvent = await Event.findOne({ externalId: game.GameID });
    
//Calculate odds
    const odds = calculateOdds({
        score: {
          home: game.HomeTeamScore,
          away: game.AwayTeamScore,
        },
        totalBets: game.TotalBets || 100,
      });

    if (existingEvent) {
      // Update existing event if it’s live
      await Event.findByIdAndUpdate(existingEvent._id, {
        score: {
          home: game.HomeTeamScore,
          away: game.AwayTeamScore,
        },
        odds,
        status: game.Status === 'InProgress' ? 'live' : game.Status.toLowerCase(),
      });
    } else {
      // Create new event if it doesn’t exist
      await Event.create({
        name: `${game.HomeTeam} vs ${game.AwayTeam}`,
        date: game.DateTime,
        odds: {
          home: game.HomeTeamMoneyLine,
          away: game.AwayTeamMoneyLine,
          draw: game.DrawMoneyLine || null,
        },
        score: {
          home: game.HomeTeamScore,
          away: game.AwayTeamScore,
        },
        status: game.Status === 'InProgress' ? 'live' : game.Status.toLowerCase(),
        externalId: game.GameID,
      });
    }
  }

  console.log('Sports data synced successfully');
};

export default syncSportsData;

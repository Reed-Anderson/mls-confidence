import * as React from 'react';
import { Box } from 'grommet';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../launch/app';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import GamePicker from '../components/game-picker';
import { TeamID, TeamLookup } from '../utils/team-lookup';

export interface GamePick {
    AwayGoals?: number
    AwayName?: string
    Confidence?: number
    HomeGoals?: number
    HomeName?: string
    Kickoff?: string
}

/**
 * Functional Component for the about page
 */
const PickView = () => {

    /***
     * Hooks
     **/

    /* Pull week number from url params */
    const { weekNumber } = useParams();

    /* Use firebase context */
    const firebase = React.useContext(FirebaseContext);

    /***
     * Picks
     **/

    /* Picks state */
    const [picks, setPicks] = React.useState([] as GamePick[]);

    /* On init, promise the week then handle picks */
    React.useEffect(() => {
        const weekPromise = firebase.requestWeek(parseInt(weekNumber));
        weekPromise.then(week => {
            const options: Intl.DateTimeFormatOptions = {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }
            const gamePicks: GamePick[] = week?.games?.map((game: any) => {
                const kickoff = new Date(game.kickoff?.seconds * 1000);
                const koDisplay = kickoff.toLocaleTimeString('en-US', options);
                const homeId: TeamID = game['home'];
                const awayId: TeamID = game['away'];
                const homeName = TeamLookup[homeId].name
                const awayName = TeamLookup[awayId].name
                return {
                    AwayGoals: 0,
                    AwayName: awayName,
                    HomeGoals: 0,
                    HomeName: homeName,
                    Kickoff: koDisplay
                }
            })
            setPicks(gamePicks);
        });
    }, []);

    /* Set the AwayGoals for the game at the given index */
    const setAwayGoals = (newIndex: number, newGoalCount: number) => {
        if (newGoalCount < 0) {
            newGoalCount = 0;
        }
        setPicks(prevPicks => prevPicks.map((pick, index) => {
            if (newIndex === index) {
                pick.AwayGoals = newGoalCount;
            }
            return pick;
        }));
    }

    /* Set the Confidence for the game at the given index */
    const setConfidence = (newIndex: number, newConfidence: number) => {
        setPicks(prevPicks => prevPicks.map((pick, index) => {
            if (newIndex === index) {
                if (pick.Confidence === newConfidence) {
                    newConfidence = undefined;
                }
                pick.Confidence = newConfidence;
            }
            /* Reset any pick already using this confidence */
            else if (pick.Confidence === newConfidence) {
                pick.Confidence = undefined;
            }
            return pick;
        }));
    }

    /* Set the HomeGoals for the game at the given index */
    const setHomeGoals = (newIndex: number, newGoalCount: number) => {
        if (isNaN(newGoalCount) || newGoalCount < 0) {
            newGoalCount = 0;
        }
        setPicks(prevPicks => prevPicks.map((pick, index) => {
            if (newIndex === index) {
                pick.HomeGoals = newGoalCount;
            }
            return pick;
        }));
    }

    /**
     * Handle confidence numbers
     */

    /* Returns sorted array of all numbers available for selection */
    const getAllNumbers = (): number[] => {
        const countDownNumber = 13
        const allNumbers = picks.map((pick, index) => {
            if (countDownNumber - index > 0) {
                return countDownNumber - index;
            }
            else {
                return index + 1;
            }
        });
        allNumbers.sort((a, b) => a - b);
        return allNumbers;
    }

    /* Returns array of all numbers already in use */
    const getUsedNumbers = (): number[] => {
        return picks.map(pick => pick.Confidence).filter(truthy => truthy);
    }

    /* Render the pick display */
    return (
        <Box as='div' fill align='center'>
            <ViewTitle title={`Picks for Week ${weekNumber}!`} />
            {picks.map((pick: GamePick, index: number) => {
                return (
                    <GamePicker
                        key={`game_${index}`}
                        allNumbers={getAllNumbers()}
                        setAwayGoals={val => setAwayGoals(index, val)}
                        setConfidence={val => setConfidence(index, val)}
                        setHomeGoals={val => setHomeGoals(index, val)}
                        usedNumbers={getUsedNumbers()}
                        {...pick}
                    />
                );
            })}
        </Box>
    );
};

export default () => Headered(PickView(), 'Pick');
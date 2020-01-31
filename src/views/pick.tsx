import * as React from 'react';
import { Box } from 'grommet';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../launch/app';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import GamePicker from '../components/game-picker';
import { TeamID, TeamLookup } from '../utils/team-lookup';
import SaveRow from '../components/save-row';
import { dateToString } from '../utils/helpers';
import PageLoader from '../components/page-loader';

/* Interface for picking a single game */
export interface GamePick {
    AwayGoals: number
    AwayName: string
    Confidence?: number
    HomeGoals: number
    HomeName: string
    Kickoff: string
};

/**
 * Functional Component for the about page
 */
const PickView = () => {

    /************************
     * Hooks
     ***********************/

    /* Pull week number from url params */
    const { weekNumber } = useParams();

    /* Use firebase context */
    const firebase = React.useContext(FirebaseContext);

    /************************
     * State
     ***********************/

    /* Store due date returned from firebase */
    const [dueDate, setDueDate] = React.useState('Due Date Unknown');

    /* State for picks returned from firebase and modified by user */
    const [picks, setPicks] = React.useState([] as GamePick[]);

    /************************
     * Picks
     ***********************/

    /**
     * On init, promise the week then handle picks
     */
    React.useEffect(() => {
        const weekPromise = firebase.requestWeek(parseInt(weekNumber));
        const pickPromise = firebase.requestWeekPick(parseInt(weekNumber));
        Promise.all([weekPromise, pickPromise]).then(([week, picks]) => {
            setDueDate(dateToString(new Date(week.dueDate?.seconds * 1000)));
            const gamePicks: GamePick[] = week?.games?.map(
                (game: any, index: number) => {
                    const kickoff = new Date(game.kickoff?.seconds * 1000);
                    const homeId: TeamID = game['home'];
                    const awayId: TeamID = game['away'];
                    return {
                        AwayGoals: picks?.picks[index]?.awayGoals || 0,
                        AwayName: TeamLookup[awayId].name,
                        Confidence: picks?.picks[index]?.confidence,
                        HomeGoals: picks?.picks[index]?.homeGoals || 0,
                        HomeName: TeamLookup[homeId].name,
                        Kickoff: dateToString(kickoff)
                    };
                }
            );
            setPicks(gamePicks);
        });
    }, [weekNumber]);

    /**
     * Set the AwayGoals for the game at the given index
     */
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
    };

    /**
     * Set the Confidence for the game at the given index
     */
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
    };

    /**
     * Set the HomeGoals for the game at the given index
     */
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
    };

    /************************
     * Confidence
     ***********************/

    /**
     * Returns sorted array of all numbers available for selection
     */
    const countDownNumber = 13;
    const allNumbers = picks.map((pick, index) => {
        if (countDownNumber - index > 0) {
            return countDownNumber - index;
        }
        else {
            return index + 1;
        }
    });
    allNumbers.sort((a, b) => a - b);

    /**
     * Returns array of all numbers already in use
     */
    const usedNumbers = picks
        .map(pick => pick.Confidence)
        .filter(truthy => truthy);

    /************************
     * General Functions
     ***********************/

    /**
     * Save the week to firebase
     */
    const saveFn = () => firebase.writePicks(parseInt(weekNumber), picks);

    /************************
     * Render Pick view
     ***********************/
    return (
        <Box align='center' fill height={{ min: 'fit-content' }}>
            <ViewTitle title={`Picks for Week ${weekNumber}!`} />
            <PageLoader loading={!picks.length} />
            {picks.map((pick: GamePick, index: number) => {
                return (
                    <GamePicker
                        key={`game_${index}`}
                        allNumbers={allNumbers}
                        setAwayGoals={val => setAwayGoals(index, val)}
                        setConfidence={val => setConfidence(index, val)}
                        setHomeGoals={val => setHomeGoals(index, val)}
                        usedNumbers={usedNumbers}
                        {...pick}
                    />
                );
            })}
            {!!picks.length && (
                <SaveRow
                    disableSave={allNumbers.length !== usedNumbers.length}
                    dueDate={dueDate}
                    onSave={saveFn}
                />
            )}
        </Box>
    );
};

export default () => Headered(PickView(), 'Pick');
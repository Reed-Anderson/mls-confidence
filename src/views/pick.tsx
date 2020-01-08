import * as React from 'react';
import * as FireBase from 'firebase/app';
import { Box } from 'grommet';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../launch/app';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import TeamScoreSelect from '../components/game-picker';

/**
 * Functional Component for the about page
 */
const PickView = () => {
    /* Pull week number from url params */
    const { weekNumber } = useParams();

    /* Use firebase context */
    const firebase = React.useContext(FirebaseContext);

    /* Week state */
    const [week, setWeek] = React.useState(
        null as firebase.firestore.DocumentData
    );

    /* On init, promise the week */
    React.useEffect(() => {
        const weekPromise = firebase.requestWeek(parseInt(weekNumber));
        weekPromise.then(setWeek);
    }, []);

    /* State for teams */
    const [teams, setTeams] = React.useState(
        null as FireBase.firestore.DocumentData
    );
    React.useEffect(() => {
        firebase.requestTeams().then(setTeams);
    }, []);

    /* Render list of games this week */
    const renderWeekInfo = () => {
        if (week?.games) {
            return week.games.map((game: any) => {
                const homeRef: firebase.firestore.DocumentReference
                    = game['home'];
                const awayRef: firebase.firestore.DocumentReference
                    = game['away'];
                const homeTeamName = teams ?
                    teams[homeRef.id]?.name : homeRef.id;
                const awayTeamName = teams ?
                    teams[awayRef.id]?.name : awayRef.id;
                return (
                    <TeamScoreSelect
                        key={`${homeRef.id}_vs_${awayRef.id}`}
                        awayTeamName={homeTeamName}
                        homeTeamName={awayTeamName}
                    />
                );
            });
        }
    };

    /* Render the pick display */
    return (
        <Box as='div' fill align='center'>
            <ViewTitle title={`Picks for Week ${weekNumber}!`} />
            {renderWeekInfo()}
        </Box>
    );
};

export default () => Headered(PickView(), 'Pick');
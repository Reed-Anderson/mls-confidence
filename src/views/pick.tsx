import * as React from 'react';
import { Box } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../launch/app';
import TeamScoreSelect from '../components/game-picker';

/**
 * Functional Component for the about page
 */
const PickView = () => {
    /* Pull week number from url params */
    const { weekNumber } = useParams();

    /* Use firebase context */
    const firebase = React.useContext(FirebaseContext);

    /* On init, promise the week */
    // React.useEffect(() => {
    //     const weekPromise = firebase.requestWeek(parseInt(weekNumber));
    //     weekPromise.then(() => {
    //         const someData = firebase.Weeks.get(parseInt(weekNumber));
    //         console.log(parseInt(weekNumber), someData);
    //     })
    // }, [])

    /* Render the pick display */
    return (
        <Box as='div' fill align='center'>
            <ViewTitle title={`Picks for Week ${weekNumber}!`} />
            <TeamScoreSelect
                AwayTeamName='Vancouver Whitecaps'
                HomeTeamName='Sporting Kansas City'
            />
        </Box>
    );
};

export default () => Headered(PickView(), 'Pick');
import * as React from 'react';
import { Box } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../launch/app';

/**
 * Functional Component for the about page
 */
const PickView = () => {
    /* Pull week number from url params */
    const { weekNumber } = useParams();

    /* Grab week from database */
    const firebase = React.useContext(FirebaseContext);
    const weekPromise = firebase.getWeek(parseInt(weekNumber));
    const gamesPromise = firebase.getGames(parseInt(weekNumber));

    /* Use useEffect for this. This is just me testing */
    weekPromise.then(week => {
        console.log(week.data());
    });
    gamesPromise.then(games => {
        console.log(games);
        console.log(games.docs);
        games.docs.forEach(doc => console.log(doc));
    });

    return (
        <Box as='div' fill align='center'>
            <ViewTitle title={`Picks for Week ${weekNumber}!`} />
        </Box>
    );
};

export default () => Headered(PickView(), 'Pick');
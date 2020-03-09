import * as React from 'react';
import { Box, Text, Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import PageLoader from '../components/page-loader';
import { FirebaseContext } from '../launch/app';
import { useLocation } from 'react-router-dom';
import StandingsPicker, { StandingsType } from '../components/standings-picker';

/**
 * Functional Component for the about page
 */
const StandingsView = () => {

    /* State for users being displayed */
    const [users, setUsers] = React.useState([]);

    /* State for loading */
    const [loading, setLoading] = React.useState(true);

    /* Use query strings to determine standings mode */
    let standingsType: StandingsType = 'Overall';
    const loc = useLocation();
    const query = new URLSearchParams(loc.search);
    if (query.get('weekly')?.toLowerCase() === 'true') {
        standingsType = 'Weekly Wins';
    }
    else if (query.get('week')) {
        standingsType = parseInt(query.get('week'));
    }

    /* Firebase context */
    const firebase = React.useContext(FirebaseContext);

    /* Get the standings, then set users and loading */
    const weekNumber = typeof standingsType === 'number' ? standingsType : 0;
    const standingsPromise = firebase.requestStandings(weekNumber);
    standingsPromise.then((result: any) => {
        if (result?.users) {
            result.users.sort((a: any, b: any) => {
                if (standingsType === 'Weekly Wins') {
                    return b.weeklyWins - a.weeklyWins;
                }
                else {
                    return b.totalPoints - a.totalPoints;
                }
            });
            setUsers(result.users);
            setLoading(false);
        }
    });

    /* Reset state when changing standings type */
    const reset = () => {
        setLoading(true);
        setUsers([]);
    };

    return (
        <Box
            align='center'
            as='div'
            fill
            height='100%'
            overflow={{ vertical: 'auto' }}
        >
            <ViewTitle title='Season Standings' />
            <StandingsPicker onSelect={reset} type={standingsType} />
            <PageLoader loading={loading} />
            {!loading && (
                <Box
                    height={{ min: 'auto' }}
                    pad={{ bottom: '25px' }}
                    width={{ max: '675px' }}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell border='bottom' size='large'>
                                    Name
                                </TableCell>
                                {typeof standingsType === 'number' && (
                                    <TableCell border='bottom' size='small'>
                                        Points Doubled
                                    </TableCell>
                                )}
                                <TableCell border='bottom' size='small'>
                                    Total Points
                                </TableCell>
                                {typeof standingsType !== 'number' && (
                                    <TableCell border='bottom' size='small'>
                                        Weekly Wins
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.uid}>
                                    <TableCell size='large'>
                                        <Text
                                            margin={{ right: '10px' }}
                                            weight='bold'
                                        >
                                            {index + 1}
                                        </Text>
                                        <Text>
                                            {user.firstName} {user.lastName}
                                        </Text>
                                    </TableCell>
                                    {typeof standingsType === 'number' && (
                                        <TableCell size='small'>
                                            {user.pointsDoubled}
                                        </TableCell>
                                    )}
                                    <TableCell size='small'>
                                        {user.totalPoints}
                                    </TableCell>
                                    {typeof standingsType !== 'number' && (
                                        <TableCell size='small'>
                                            {user.weeklyWins}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};

export default () => Headered(StandingsView(), 'Standings');
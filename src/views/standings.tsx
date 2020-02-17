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
    let standingsType: StandingsType = 'Overall'
    const loc = useLocation();
    const query = new URLSearchParams(loc.search);
    if (query.get('weekly')?.toLowerCase() === 'true') {
        standingsType = 'Weekly Wins'
    }

    /* Firebase context */
    const firebase = React.useContext(FirebaseContext);

    /* Get the standings, then set users and loading */
    const standingsPromise = firebase.requestStandings();
    standingsPromise.then((result: any) => {
        if (result?.users) {
            result.users.sort((a: any, b: any) => {
                if (standingsType === 'Overall') {
                    return b.totalPoints - a.totalPoints;
                }
                else {
                    return b.weeklyWins - a.weeklyWins;
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
    }

    return (
        <Box as='div' fill align='center'>
            <ViewTitle title='Season Standings' />
            <StandingsPicker onSelect={reset} type={standingsType} />
            <PageLoader loading={loading} />
            {!loading && (
                <Box width={{ max: '675px' }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell border='bottom' size='large'>
                                    Name
                                </TableCell>
                                <TableCell border='bottom' size='small'>
                                    Total Points
                                </TableCell>
                                <TableCell border='bottom' size='small'>
                                    Weekly Wins
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.uid}>
                                    <TableCell size='large'>
                                        <Text weight='bold'>
                                            {user.firstName} {user.lastName}
                                        </Text>
                                    </TableCell>
                                    <TableCell size='small'>
                                        {user.totalPoints}
                                    </TableCell>
                                    <TableCell size='small'>
                                        {user.weeklyWins}
                                    </TableCell>
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
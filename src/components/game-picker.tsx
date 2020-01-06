import * as React from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { COLORS } from '../utils/constants';
import TeamScorePicker from './team-score-picker';
import { FirebaseContext } from '../launch/app';

/* Props for the component */
interface Props {
    AwayTeamId: string
    HomeTeamId: string
};

/* Team Score Select component */
const TeamScoreSelect = (props: Props) => {

    /* Use firebase context */
    const firebase = React.useContext(FirebaseContext);

    /* State for the score set */
    const [score, setScore] = React.useState(0);

    /* State for home team name */
    const [homeTeamName, setHomeTeamName] = React.useState(props.HomeTeamId);
    React.useEffect(() => {
        firebase.requestTeam(props.HomeTeamId).then(team => {
            setHomeTeamName(team['name']);
        })
    }, []);

    /* State for away team name */
    const [awayTeamName, setAwayTeamName] = React.useState(props.AwayTeamId);
    React.useEffect(() => {
        firebase.requestTeam(props.AwayTeamId).then(team => {
            setAwayTeamName(team['name']);
        });
    }, []);


    /* Return Game Picker component */
    return (
        <ResponsiveContext.Consumer>
            {size => (
                <Box
                    background='light-1'
                    border={{ color: COLORS['brand'], size: 'xsmall' }}
                    direction={size === 'small' ? 'column' : 'row'}
                    flex={false}
                    gap='small'
                    margin='small'
                    pad='small'
                    round='small'
                >
                    <TeamScorePicker
                        labelOnLeft
                        onChange={setScore}
                        score={score}
                        teamName={homeTeamName}
                    />
                    <TeamScorePicker
                        labelOnLeft={size === 'small'}
                        onChange={setScore}
                        score={score}
                        teamName={awayTeamName}
                    />
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default TeamScoreSelect;
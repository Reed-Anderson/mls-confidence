import * as React from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { COLORS } from '../utils/constants';
import TeamScorePicker from './team-score-picker';

/* Props for the component */
interface Props {
    AwayTeamName: string
    HomeTeamName: string
};

/* Team Score Select component */
const TeamScoreSelect = (props: Props) => {

    /* State for the score set */
    const [score, setScore] = React.useState(0);

    /* Return Game Picker component */
    return (
        <ResponsiveContext.Consumer>
            {size => (
                <Box
                    background='light-1'
                    border={{ color: COLORS['brand'], size: 'xsmall' }}
                    direction={size === 'small' ? 'column' : 'row'}
                    gap='small'
                    margin='small'
                    pad='small'
                    round='small'
                    id='pickSheet'
                >
                    <TeamScorePicker
                        labelOnLeft
                        onChange={setScore}
                        score={score}
                        teamName={props.HomeTeamName}
                    />
                    <TeamScorePicker
                        labelOnLeft={size === 'small'}
                        onChange={setScore}
                        score={score}
                        teamName={props.AwayTeamName}
                    />
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default TeamScoreSelect;
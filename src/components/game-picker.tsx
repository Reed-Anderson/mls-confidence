import * as React from 'react';
import { Box, ResponsiveContext, Text } from 'grommet';
import { COLORS } from '../utils/constants';
import TeamScorePicker from './team-score-picker';
import DesktopConfidencePicker from './desktop-confidence-picker';
import { GamePick } from '../views/pick';
import { arraysEqual } from '../utils/helpers';

/* Props for the component */
interface Props extends GamePick {
    allNumbers: number[]
    setAwayGoals: (goals: number) => void
    setConfidence: (confidence: number) => void
    setHomeGoals: (goals: number) => void
    usedNumbers: number[]
};

/* Indicates whether the component should skip an update */
const propsAreEqual = (a: Props, b: Props) => (
    a.AwayGoals === b.AwayGoals
    && a.AwayName === b.AwayName
    && a.Confidence === b.Confidence
    && a.HomeGoals === b.HomeGoals
    && a.HomeName === b.HomeName
    && a.Kickoff === b.Kickoff
    && arraysEqual(a.allNumbers, b.allNumbers)
    && arraysEqual(a.usedNumbers, b.usedNumbers)
);

/* Team Score Select component */
const GamePicker = React.memo((props: Props) => {

    /* Indicates win, loss, or tie for the given team */
    const getPick = (team: 'home' | 'away'): 'win' | 'lose' | 'tie' => {
        if (props.HomeGoals === props.AwayGoals) {
            return 'tie';
        }
        else if (props.HomeGoals > props.AwayGoals) {
            return team === 'home' ? 'win' : 'lose';
        }
        else {
            return team === 'away' ? 'win' : 'lose';
        }
    };

    /* Return Game Picker component */
    return (
        <ResponsiveContext.Consumer>
            {size => (
                <>
                    <Text
                        alignSelf='center'
                        size='large'
                    >
                        {props.Kickoff}
                    </Text>
                    <Box
                        background='light-1'
                        border={{ color: COLORS['brand'], size: 'xsmall' }}
                        elevation='small'
                        flex={false}
                        gap='small'
                        margin={{ top: 'xsmall', bottom: 'medium' }}
                        width='675px'
                        pad='small'
                        round='small'
                    >
                        <Box direction={size === 'small' ? 'column' : 'row'}>
                            <TeamScorePicker
                                labelOnLeft
                                onChange={props.setHomeGoals}
                                pick={getPick('home')}
                                score={props.HomeGoals}
                                teamName={props.HomeName}
                            />
                            <div style={{ flexGrow: 1 }} />
                            <TeamScorePicker
                                labelOnLeft={size === 'small'}
                                onChange={props.setAwayGoals}
                                pick={getPick('away')}
                                score={props.AwayGoals}
                                teamName={props.AwayName}
                            />
                        </Box>
                        {size !== 'small' && (
                            <DesktopConfidencePicker
                                allNumbers={props.allNumbers}
                                setConfidence={props.setConfidence}
                                selectedNumber={props.Confidence}
                                usedNumbers={props.usedNumbers}
                            />
                        )}
                    </Box>
                </>
            )}
        </ResponsiveContext.Consumer>
    );
}, propsAreEqual);

export default GamePicker;
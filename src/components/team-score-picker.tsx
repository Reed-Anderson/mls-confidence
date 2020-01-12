import * as React from 'react';
import { Box, Text, TextInput } from 'grommet';
import { Checkmark, Close, Subtract } from 'grommet-icons';

/* Interface for props */
interface Props {
    labelOnLeft: boolean
    onChange: (newScore: number) => void
    pick: 'win' | 'lose' | 'tie'
    score: number
    teamName: string
};

/* Team Score Picker Component */
const TeamScorePicker = React.memo((props: Props) => {

    /* JSX.Element for pick icon */
    let Icon: JSX.Element;
    switch (props.pick) {
        case 'win':
            Icon = (
                <Box margin='small'>
                    <Checkmark color='status-ok' />
                </Box>
            );
            break;
        case 'lose':
            Icon = (
                <Box margin='small'>
                    <Close color='status-warning' />
                </Box>
            );
            break;
        case 'tie':
            Icon = (
                <Box margin='small'>
                    <Subtract />
                </Box>
            );
            break;
    }

    /**
     * Input to be render to the left or right of the label
     *  depending on props
     */
    const Input = (
        <Box width='80px'>
            <TextInput
                onChange={e => props.onChange(parseInt(e.target.value))}
                type='number'
                value={props.score.toString() || '0'}
            />
        </Box>
    );

    /* Box that grows and centers the team name */
    const TeamName = (
        <Box flex='grow'>
            <Text size='small' textAlign='center' weight='bold'>
                {props.teamName}
            </Text>
        </Box>
    );

    /* Return TeamScorePicker component */
    return (
        <Box
            align='center'
            alignSelf='end'
            direction='row'
            width='315px'
        >
            {props.labelOnLeft ?
                <>
                    {Icon}
                    {TeamName}
                    {Input}
                </>
                :
                <>
                    {Input}
                    {TeamName}
                    {Icon}
                </>
            }
        </Box>
    );
});

export default TeamScorePicker;
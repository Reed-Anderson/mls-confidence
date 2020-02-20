import * as React from 'react';
import { Box, Text } from 'grommet';
import ToggleBox from './toggle-box';
import { arraysEqual } from '../utils/helpers';

/* Props for the component */
interface Props {
    allNumbers: number[]
    selectedNumber?: number
    setConfidence: (confidence: number) => void
    usedNumbers: number[]
};

/* Indicates whether the component should skip an update */
const propsAreEqual = (a: Props, b: Props) => (
    arraysEqual(a.allNumbers, b.allNumbers)
    && a.setConfidence === b.setConfidence
    && a.selectedNumber === b.selectedNumber
    && arraysEqual(a.usedNumbers, b.usedNumbers)
);

/* Confidence Picker on desktop */
const DesktopConfidencePicker = React.memo((props: Props) => {

    /* useCallback to avoid unnecessary rerenders */
    const setConfidence = React.useCallback(
        (number) => props.setConfidence(number),
        []
    );

    /* Determine if a number is active, dim, or normal */
    const getToggleBoxStatus = (num: number): 'normal' | 'dim' | 'active' => {
        if (num === props.selectedNumber) {
            return 'active';
        }
        else if (props.usedNumbers.includes(num)) {
            return 'dim';
        }
        else {
            return 'normal';
        }
    }

    /* Display all numbers with a 'Confidence' label */
    return (
        <Box
            alignContent='center'
            alignSelf='stretch'
            direction='row'
            wrap
        >
            <Text
                alignSelf='center'
                color='dark-3'
                margin='xsmall'
                weight='bold'
            >
                Confidence:
            </Text>
            {props.allNumbers.map(number => {
                return (
                    <ToggleBox
                        key={number}
                        onClick={setConfidence}
                        status={getToggleBoxStatus(number)}
                        value={number}
                    />
                )
            })}
        </Box>
    )
}, propsAreEqual);

export default DesktopConfidencePicker;
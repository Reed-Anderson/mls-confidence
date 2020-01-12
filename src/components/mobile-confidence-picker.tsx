import * as React from 'react';
import { arraysEqual } from '../utils/helpers';
import { Box, Select, Text } from 'grommet';

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

/* Confidence Picker on mobile */
const MobileConfidencePicker = React.memo((props: Props) => {

    const options = ['(none)'].concat(
        props.allNumbers.filter(num => !props.usedNumbers.includes(num))
            .map(num => num.toString())
    );

    const onChange = (val: any) => (
        props.setConfidence( parseInt( val.value ) || undefined )
    );
        
    /* Component is a labeled select to set confidence */
    return (
        <Box align='center' direction='row' flex='grow' width='315px'>
            <Box margin='6px' width='24px' />
            <Box flex='grow'>
                <Text size='small' textAlign='center' weight='bold'>
                    Confidence
                </Text>
            </Box>
            <Box width='80px'>
                <Select
                    onChange={onChange}
                    options={options}
                    value={props.selectedNumber?.toString() || ''}
                />
            </Box>
        </Box>
    )
}, propsAreEqual);

export default MobileConfidencePicker;
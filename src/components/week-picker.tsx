import * as React from 'react';
import { Box, Select, Text } from 'grommet';
import { getCurrentWeek } from '../utils/helpers';
import { useHistory } from 'react-router-dom';

/* Props for the component */
interface Props {
    onSelect: () => void
    weekNumber: number
};

/* Count up to three more than the current week */
const getOptions = () => {
    const options: number[] = [];
    const currentWeek = getCurrentWeek();

    for (let i = 1; i < currentWeek + 4; i++) {
        options.push(i);
    };

    return options;
};

/* Week Picker component */
const WeekPicker = (props: Props) => {

    /* Use history to change pick page */
    const history = useHistory();

    /* When selecting an option, change URL's week number */
    const selectOption = (option: { value: number }) => {
        if (option.value !== props.weekNumber) {
            props.onSelect();
            history.replace(option.value.toString());
        }
    };

    /* Return the week picker component */
    return (
        <Box
            align='center'
            direction='row'
            flex={{ shrink: 0 }}
            pad={{ bottom: 'medium' }}
        >
            <Text margin={{ right: 'small' }}>
                Displayed Week:
            </Text>
            <Box width='100px'>
                <Select
                    onChange={selectOption}
                    options={getOptions()}
                    value={props.weekNumber.toString()}
                />
            </Box>
        </Box>
    );
};

export default WeekPicker;
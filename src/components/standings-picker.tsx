import * as React from 'react';
import { Box, Select, Text } from 'grommet';
import { useHistory } from 'react-router-dom';
import { getCurrentWeek } from '../utils/helpers';

/* Props for the component */
interface Props {
    onSelect?: () => void
    type: StandingsType
};

/* Union Type for select values */
export type StandingsType = 'Overall' | 'Weekly Wins' | number;

/* Options are 'Overall', 'Weekly Wins', and every week that has passed */
const getOptions = () => {
    const options: StandingsType[] = ['Overall', 'Weekly Wins'];
    const currentWeek = getCurrentWeek();

    for (let i = 1; i < currentWeek; i++) {
        options.push(i);
    }

    return options;
}

/* Standings Picker component */
const StandingsPicker = (props: Props) => {

    /* Use history to change standings page */
    const history = useHistory();

    /* Change the query strings when selecting a type */
    const selectType = (option: { value: StandingsType }) => {
        if (option.value !== props.type) {
            props.onSelect?.();
            switch(option.value) {
                case 'Overall':
                    history.push('/standings');
                    break;
                case 'Weekly Wins':
                    history.push('/standings?weekly=true');
                    break;
                default:
                    history.push('/standings');
                    break;
            }
        }
    }

    /* Return standings picker component */
    return (
        <Box
            align='center'
            direction='row'
            pad={{ bottom: 'medium' }}
        >
            <Text margin={{ right: 'small' }}>
                Standings Type:
            </Text>
            <Box width='175px'>
                <Select
                    onChange={selectType}
                    options={getOptions()}
                    value={props.type.toString()}
                />
            </Box>
        </Box>
    );
};

export default StandingsPicker;
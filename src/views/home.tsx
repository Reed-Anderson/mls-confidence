import * as React from 'react';
import { Box } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import LoginStatusBox from '../components/login-status-box';
import TitledFloatBox from '../components/titled-float-box';
import { getCurrentWeek } from '../utils/helpers';
import PickStatusBox, { PickStatus } from '../components/pick-status-box';
import ConfusedBox from '../components/confused-box';
import { FirebaseContext } from '../launch/app';

const secondaryTitle = `Test your knowledge (or luck!) of Major League
                        Soccer against experts, friends, and strangers.`;

const TitledFloatBoxProps = {
    gap: 'small',
    height: '350px',
    margin: 'medium',
    pad: 'small',
    width: '300px'
}

/**
 * Functional Component for the home page
 */
const HomeView = () => {

    /* Firebase context */
    const firebase = React.useContext(FirebaseContext);

    /* State to determine if week is loading */
    const [pickStatus, setPickStatus] = React.useState(PickStatus.Loading);
    /* On init, get the current week of picks */
    React.useEffect(() => {
        firebase.requestWeekPick(getCurrentWeek()).then(picks => {
            setPickStatus(picks ? PickStatus.Complete : PickStatus.Incomplete);
        })
    }, []);

    return (
        <Box
            align='center'
            overflow='auto'
            pad={{ horizontal: 'small' }}
        >
            <ViewTitle
                pushFromTop
                secondaryTitle={secondaryTitle}
                title='Welcome to the MLS Confidence Pool!'
            />
            <Box
                direction='row'
                justify='center'
                pad='small'
                width={{ max: '1075px' }}
                wrap
            >
                <ConfusedBox />
                <LoginStatusBox />
                <PickStatusBox
                    pickStatus={pickStatus}
                    weekNumber={getCurrentWeek()}
                />
                <TitledFloatBox
                    boxProps={TitledFloatBoxProps}
                    color='neutral-1'
                    loading
                    title={`Last Week's Results`}
                >
                </TitledFloatBox>
                <TitledFloatBox
                    boxProps={TitledFloatBoxProps}
                    color='neutral-3'
                    loading
                    title='Total Point Leaders'
                    to='/standings'
                >
                </TitledFloatBox>
                <TitledFloatBox
                    boxProps={TitledFloatBoxProps}
                    color='neutral-4'
                    loading
                    title='Weekly Win Leaders'
                    to='/standings?weekly=true'
                >
                </TitledFloatBox>
            </Box>
        </Box>
    );
};

export default () => Headered(HomeView(), 'Home');
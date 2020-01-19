import * as React from 'react';
import { Box, ResponsiveContext } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import LoginStatusBox from '../components/login-status-box';
import { COLORS } from '../utils/constants';
import TitledFloatBox from '../components/titled-float-box';
import { getCurrentWeek } from '../utils/helpers';

const secondaryTitle = `Test your knowledge (or luck!) of
                        MLS against experts, friends, and strangers.`;

const TitledFloatBoxProps = {
    gap: 'small',
    margin: { bottom: 'medium' },
    pad: 'small',
    height: '350px',
    width: '300px'
}

/**
 * Functional Component for the home page
 */
const HomeView = () => {
    return (
        <ResponsiveContext.Consumer>
            {size => (
                <Box align='center' overflow='auto' pad={{ horizontal: 'small' }}>
                    <ViewTitle
                        pushFromTop={size !== 'small'}
                        secondaryTitle={secondaryTitle}
                        title='Welcome to the MLS Confidence Pool!'
                    />
                    <LoginStatusBox />
                    <Box
                        direction={size === 'small' ? 'column' : 'row'}
                        gap='large'
                        pad='small'
                    >
                        <TitledFloatBox
                            boxProps={TitledFloatBoxProps}
                            color={COLORS["neutral-1"]}
                            title={`Last Week's Results`}
                            to={`/results/${getCurrentWeek() - 1}`}
                        />
                        <TitledFloatBox
                            boxProps={TitledFloatBoxProps}
                            color={COLORS["neutral-3"]}
                            title='Total Point Leaders'
                            to='/standings'
                        />
                        <TitledFloatBox
                            boxProps={TitledFloatBoxProps}
                            color={COLORS["neutral-4"]}
                            title='Weekly Win Leaders'
                            to='/standings/weekly'
                        />
                    </Box>
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default () => Headered(HomeView(), 'Home');
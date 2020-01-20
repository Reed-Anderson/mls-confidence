import * as React from 'react';
import { Box, ResponsiveContext } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import LoginStatusBox from '../components/login-status-box';
import TitledFloatBox from '../components/titled-float-box';
import { getCurrentWeek } from '../utils/helpers';
import PickStatusBox from '../components/pick-status-box';
import AboutPageBox from '../components/about-page-box';

const secondaryTitle = `Test your knowledge (or luck!) of Major League
                        Soccer against experts, friends, and strangers.`;

const TitledFloatBoxProps = {
    gap: 'small',
    margin: 'medium',
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
                        <AboutPageBox />
                        <LoginStatusBox />
                        <PickStatusBox />
                        <TitledFloatBox
                            boxProps={TitledFloatBoxProps}
                            color='neutral-1'
                            loading
                            title={`Last Week's Results`}
                            to={`/results/${getCurrentWeek() - 1}`}
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
                            to='/standings/weekly'
                        >
                        </TitledFloatBox>
                    </Box>
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default () => Headered(HomeView(), 'Home');
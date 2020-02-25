import * as React from 'react';
import { Box, BoxProps, Text, ResponsiveContext } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import TitledFloatBox from '../components/titled-float-box';

/* Extra properties for the FloatBox */
const boxProps: BoxProps = {
    gap: 'small',
    margin: 'small',
    pad: 'small',
    width: { max: '675px' }
};

/* Text for What is a Confidence Pool */
const whatIsText = (
    `A confidence pool is a pick-em style of competition, most
    commonly run in conjunction with the NFL season. Each week
    participants predict the winner of each game, and assign a
    "confidence" number to each prediction made. High numbers
    indicate high confidence, low numbers indicate low
    confidence. Numbers cannot be reused. Correctly predicting a
    game earns the participant points equal to the assigned
    confidence.`
);

/* Text for MLS-Specific Rules */
const mlsSpecText = (
    `Since Major League Soccer lacks the consistent schedule that
    the NFL has, and ties occur much more often, some additional
    rules are needed.`
);

/* Text for the first list element */
const li1 = (
    `Each game participants select a winner or a tie.`
);

/* Text for the second list element */
const li2 = (
    `In addition to predicting the winner and assigning a
    confidence, participants will also predict the score
    of the game. Correct winner AND score will earn
    double points. Correct predictions are not penalized
    for incorrect scores.`
);

/* Text for the third list element */
const li3 = (
    `Weeks will sometimes be merged together to prevent
    weeks with too few games.`
);

/* Text for Standings */
const standingsText = (
    `There will be multiple forms of standings through the
    season. Each week will have its own standings page and
    winner(s). There will be two forms of overall standings:
    most total points, most weekly wins. At the end of the
    season, the leaders of these standings will be declared
    the Supporters' Shield and MLS Confidence Pool champions,
    respectively.`
);

/**
 * Functional Component for the rules page
 */
const RulesView = () => {
    return (
        <Headered activeDisplayName='Rules'>
            <ResponsiveContext.Consumer>
                {size => {
                    const textSize = size === 'small' ? 'small' : 'medium'
                    return (
                        <Box align='center' as='div' fill pad='medium'>
                            <ViewTitle title='MLS Confidence Pool Rules' />
                            <Box height={{ min: 'auto' }} pad='small'>
                                <TitledFloatBox
                                    boxProps={boxProps}
                                    color='neutral-1'
                                    title='What is a Confidence Pool?'
                                >
                                    <Text margin='small' size={textSize}>
                                        {whatIsText}
                                    </Text>
                                </TitledFloatBox>
                                <TitledFloatBox
                                    boxProps={boxProps}
                                    color='neutral-3'
                                    title='MLS-Specific Rules'
                                >
                                    <Text margin='small' size={textSize}>
                                        {mlsSpecText}
                                        <ul>
                                            <Text
                                                as='li'
                                                size={textSize}
                                                margin={{ vertical: 'small' }}
                                            >
                                                {li1}
                                            </Text>
                                            <Text
                                                as='li'
                                                size={textSize}
                                                margin={{ vertical: 'small' }}
                                            >
                                                {li2}
                                            </Text>
                                            <Text
                                                as='li'
                                                size={textSize}
                                                margin={{ vertical: 'small' }}
                                            >
                                                {li3}
                                            </Text>
                                        </ul>
                                    </Text>
                                </TitledFloatBox>
                                <TitledFloatBox
                                    boxProps={boxProps}
                                    color='neutral-4'
                                    title='Standings'
                                >
                                    <Text margin='small' size={textSize}>
                                        {standingsText}
                                    </Text>
                                </TitledFloatBox>
                            </Box>
                        </Box>
                    )
                }}
            </ResponsiveContext.Consumer>
        </Headered>
    );
};

export default RulesView;
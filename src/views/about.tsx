import * as React from 'react';
import { Box, Text, ResponsiveContext, BoxProps, Button } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import TitledFloatBox from '../components/titled-float-box';
import { Github } from 'grommet-icons';

/* Extra properties for the FloatBox */
const boxProps: BoxProps = {
    gap: 'small',
    margin: 'small',
    pad: 'small',
    width: { max: '675px' }
};

/* Link to my github page */
const githubLink = 'https://github.com/Reed-Anderson/mls-confidence';

/* Text for motivations section */
const motivationsText = (
    `When I was growing up, my parents ran a confidence pool for the NFL
    together through emails and voicemail. I participated when I was old
    enough, but never cared much for football. When I wasn't able to find
    a similar competition for soccer, I decided to make one myself. The
    project has been a unique combination of many of my interests, and I've
    enjoyed it enough to continue working on it in my spare time in the future.`
);

/* Text for contact me section */
const contactMeText = (
    `Hey! My name is Reed, and I would love to hear from you. Have a question,
    comment, complaint, or suggestion? Send me an email at reeda@ksu.edu. I'll
    do my best to respond to everyone who reaches out, but do keep in mind that
    this is a solo project that I work on in my spare time, and my to-do list is
    very long!`
);

/* Text for behind the scenes section */
const behindText = (
    `I created this project in TypeScript using the React Framework, the Grommet
    UI library, a Google Firebase database, and a handful of other technologies
    and libraries. I've made all my code (excluding database secrets) public on
    my personal Github. I encourage anyone curious to check out the source code
    and reach out with any questions or suggestions! I also want to thank Eileen
    Moran, who was an enourmous help in populating the database with the MLS
    schedule!`
);

/**
 * Functional Component for the about page
 */
const AboutView = () => {
    return (
        <ResponsiveContext.Consumer>
            {size => {
                const textSize = size === 'small' ? 'small' : 'medium'
                return (
                    <Box align='center' as='div' fill pad='medium'>
                        <ViewTitle title='About MLS Confidence Pool' />
                        <TitledFloatBox
                            boxProps={boxProps}
                            color='neutral-1'
                            title='Project Motivations'
                        >
                            <Text margin='small' size={textSize}>
                                {motivationsText}
                            </Text>
                        </TitledFloatBox>
                        <TitledFloatBox
                            boxProps={boxProps}
                            color='neutral-3'
                            title='Contact Me'
                        >
                            <Text margin='small' size={textSize}>
                                {contactMeText}
                            </Text>
                        </TitledFloatBox>
                        <TitledFloatBox
                            boxProps={boxProps}
                            color='neutral-4'
                            title='Behind The Scenes'
                        >
                            <Text margin='small' size={textSize}>
                                {behindText}
                            </Text>
                            <Box
                                align='center'
                                pad={{ bottom: 'small', horizontal: 'small' }}
                            >
                                <Button
                                    color='brand'
                                    icon={<Github />}
                                    href={githubLink}
                                    label='Github'
                                    target='_blank'
                                />
                            </Box>
                        </TitledFloatBox>
                    </Box>
                )
            }}
        </ResponsiveContext.Consumer>
    );
};

export default () => Headered(AboutView(), 'About');
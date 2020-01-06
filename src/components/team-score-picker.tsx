import * as React from 'react';
import styled from 'styled-components';
import { Box, Text, TextInput } from 'grommet';

/* Interface for props */
export interface TeamScorePickerProps {
    labelOnLeft: boolean
    onChange: ( newScore: number ) => void
    score: number
    teamName: string
};

/* Style for the component */
const StyledTeamScoreSelect = styled.div`
    align-items: center;
    display: flex;
    width: 300px;
`;

/* Style for Text input */
const StyledInputWrapper = styled.div`
    margin: 0 10px;
    width: 75px;
`;

/* Team Score Picker Component */
const TeamScorePicker = ( props: TeamScorePickerProps ) => {
    
    /**
     * Input to be render to the left or right of the label
     *  depending on props
     */
    const Input = (
        <StyledInputWrapper>
            <TextInput
                onChange={e => props.onChange(parseInt(e.target.value))}
                type='number'
                value={props.score || 0}
            />
        </StyledInputWrapper>
    );

    /* Div with flexGrow style to fill space between Label and Input */
    const GrowDiv = (
        <div style={{ flexGrow: 1 }} />
    );

    /* Return TeamScorePicker component */
    return (
        <StyledTeamScoreSelect>
            <Box direction='row' flex='grow'>
                {!props.labelOnLeft && Input}
                {!props.labelOnLeft && GrowDiv}
            </Box>
            <Text size='medium' textAlign='center'>{props.teamName}</Text>
            <Box direction='row' flex='grow'>
                {props.labelOnLeft && GrowDiv}
                {props.labelOnLeft && Input}
            </Box>
        </StyledTeamScoreSelect>
    );
};

export default TeamScorePicker
import * as React from 'react';
import styled from 'styled-components';
import { Text, TextInput } from 'grommet';

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
                value={props.score}
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
            {!props.labelOnLeft && Input}
            {!props.labelOnLeft && GrowDiv}
            <Text size='medium'>{props.teamName}</Text>
            {props.labelOnLeft && GrowDiv}
            {props.labelOnLeft && Input}
        </StyledTeamScoreSelect>
    );
};

export default TeamScorePicker
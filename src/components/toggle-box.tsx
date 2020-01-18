import * as React from 'react';
import { Box, Text } from 'grommet';
import { BorderType } from 'grommet/utils';
import styled from 'styled-components';

/* Props for the component */
interface Props {
    onClick: (val: number) => void
    status: 'dim' | 'normal' | 'active'
    value: number
};

/* Style for ToggleBox */
const StyledToggleBox = styled(Box)`
    min-width: 35px;
    text-align: center;
`

/* ToggleBox component */
const ToggleBox = React.memo((props: Props) => {

    /* Shortcuts for active and dim */
    const active = props.status === 'active';
    const dim = props.status === 'dim';

    /* Variable to control the border when active */
    const border: BorderType = {
        color: active ? 'accent-1' : 'light-1',
        size: 'small'
    }

    /* Return the ToggleBox component */
    return (
        <StyledToggleBox
            background={active ? 'white' : ''}
            border={border}
            elevation={active ? 'xsmall' : ''}
            focusIndicator={false}
            onClick={() => props.onClick(props.value)}
            pad='xsmall'
            round='xsmall'
        >
            <Text
                color={dim ? 'light-5' : ''}
                weight={active ? 'bold' : 'normal'}
            >
                {props.value}
            </Text>
        </StyledToggleBox>
    )
});

export default ToggleBox;
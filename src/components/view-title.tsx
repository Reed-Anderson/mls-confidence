import * as React from 'react';
import styled from 'styled-components';
import { Heading, HeadingProps, Text } from 'grommet';

/* Interface for props needed for the ViewTitle component */
export interface ViewTitleProps {
    pushFromTop?: boolean
    secondaryTitle?: string
    title: string
};

/* Additional props for StyledViewTitle */
type StyledViewTitleProps = HeadingProps & {
    marginTop?: string
};

/* Styled View Title */
const StyledViewTitle = styled(Heading) <StyledViewTitleProps>`
    line-height: 30px;
    margin: ${props => props.marginTop || '50px'} 0 30px 0;
    text-align: center;
    width: 100%;
`;

/**
 * The returned ViewTitle
 */
const ViewTitle = (props: ViewTitleProps) => (
    <>
        <StyledViewTitle
            level={2}
            marginTop={props.pushFromTop ? '100px' : undefined}
        >
            {props.title}
        </StyledViewTitle>
        {props.secondaryTitle && (
            <Text
                margin={{
                    top: '0',
                    bottom: props.pushFromTop ? '50px' : '30px'
                }}
                size='small'
                textAlign='center'
            >
                {props.secondaryTitle}
            </Text>
        )}
    </>
);

export default ViewTitle;
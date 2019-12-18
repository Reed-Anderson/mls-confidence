import * as React from 'react';
import styled from 'styled-components';
import { Heading } from 'grommet';

/* Interface for props needed for the ViewTitle component */
export interface ViewTitleProps {
    title: string
};

/* Styled View Title */
const StyledViewTitle = styled(Heading)`
    line-height: 30px;
    margin: 50px 0;
    text-align: center;
    width: 100%;
`;

/**
 * The returned ViewTitle
 */
const ViewTitle = (props: ViewTitleProps) => (
    <StyledViewTitle level={2}>{props.title}</StyledViewTitle>
);

export default ViewTitle;
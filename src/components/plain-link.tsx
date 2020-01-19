import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

/* Style for the PlainLink */
const StyledPlainLink = styled(Link)`
    text-decoration: none;
`;

/* Simple component to remove text decoration from links */
const PlainLink = (props: LinkProps) => <StyledPlainLink {...props} />;

export default PlainLink;
import * as React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import { Box } from 'grommet';
import { COLORS } from '../utils/constants';

/* Props for PageLoader */
interface Props {
    loading: boolean
};

/* PageLoader Component */
const PageLoader = (props: Props) => {
    return props.loading && (
        <Box
            margin='xlarge'
            pad={{ right: '15px', bottom: '15px' }}
            responsive={false}
        >
            <RingLoader color={COLORS['accent-2']} size={80} />
        </Box>
    )
};

export default PageLoader;
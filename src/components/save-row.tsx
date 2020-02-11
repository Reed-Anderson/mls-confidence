import * as React from 'react';
import { Box, Button, Text, ResponsiveContext } from 'grommet';
import { Add } from 'grommet-icons';
import GrowDiv from './grow-div';

/* Props for the component */
interface Props {
    disableSave: boolean
    dueDate: string
    onSave: () => void
};

/* Component for SaveRow */
const SaveRow = (props: Props) => {
    return (
        <ResponsiveContext.Consumer>
            {size => (
                <Box
                    align='center'
                    background={'light-3'}
                    direction={size === 'small' ? 'column' : 'row'}
                    height='fit-content'
                    margin={{ bottom: 'medium' }}
                    pad='small'
                    round='small'
                    width={size === 'small' ? 'fit-content' : '675px'}
                >
                    <Text>
                        Picks are due <b>{props.dueDate}</b>.
                    </Text>
                    <GrowDiv />
                    <Button
                        disabled={props.disableSave}
                        icon={<Add />}
                        label='Save'
                        margin={size === 'small' ? { top: 'small' } : undefined}
                        onClick={props.onSave}
                    />
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default SaveRow;
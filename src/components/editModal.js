import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function EditModal({ }) {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            size={'medium'}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='blue' floated='right'>Edit</Button>}
        >
            <Modal.Content >
                <Modal.Description>
                   
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Save Changes
                </Button>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditModal

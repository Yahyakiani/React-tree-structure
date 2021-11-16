import React from 'react'
import { Button, Header, Label, Modal } from 'semantic-ui-react'

function DetailModal({ name, dob, jobTitle, jobArea, jobType,projects, size }) {
    const [open, setOpen] = React.useState(false)
    const projectNames=projects?.map(proj=>proj) 

    return (
        <Modal
            size={size}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>View Details</Button>}
        >
            <Modal.Content>
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>
                        <Label as='p'>Date of Birth</Label>&nbsp;{new Date(dob).toLocaleDateString()}
                    </p>
                    <p>
                    <Label as='p'>Job Area</Label>&nbsp;{jobArea}
                    </p>
                    <p>
                    <Label as='p'>Job Title</Label>&nbsp;{jobTitle}
                    </p>
                    <p>
                    <Label as='p'>Job Type</Label>&nbsp;{jobType}
                    </p>
                    {
                        projectNames?.length ?
                        <p>
                    <Label as='p'>Projects Working on</Label>&nbsp;{projectNames.join(', ')}
                    </p>
                    :  <Label as='p'>No Projects</Label>
                    }

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DetailModal

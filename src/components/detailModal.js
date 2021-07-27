import React from 'react'
import { Button, Header, Label, Modal } from 'semantic-ui-react'

function DetailModal({ name, dob, jobTitle, jobArea, jobType,projects, size }) {
    const [open, setOpen] = React.useState(false)
    const projectNames=projects?.map(proj=>proj.name) 

    return (
        <Modal
            size={size}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>View Details</Button>}
        >
            <Modal.Content >
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>
                        <Label>Date of Birth</Label>&nbsp;{new Date(dob).toLocaleDateString()}
                    </p>
                    <p>
                    <Label>Job Area</Label>&nbsp;{jobArea}
                    </p>
                    <p>
                    <Label>Job Title</Label>&nbsp;{jobTitle}
                    </p>
                    <p>
                    <Label>Job Type</Label>&nbsp;{jobType}
                    </p>
                    {
                        projectNames?.length ?
                        <p>
                    <Label>Projects Working on</Label>&nbsp;{projectNames.join(', ')}
                    </p>
                    : null
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

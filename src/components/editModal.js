import React from "react";
import { Button, Header, Label, Modal } from "semantic-ui-react";
import EditForm from "./editForm";

function EditModal({ id, name, companyId, department, employees }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      // size={'large'}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="blue" floated="right">
          Edit
        </Button>
      }
    >
      <Modal.Content>
        <Modal.Description>
          <span>
            <Header>{name}</Header>
            <Label>{department}</Label>
          </span>

          <EditForm id={id} name={name} companyId={companyId} employees={employees} closeModal={() => setOpen(false)} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default EditModal;

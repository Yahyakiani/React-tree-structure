import React from "react";
import EditModal from "./editModal";
import { Card, Divider, Icon, Label } from "semantic-ui-react";


const DisplayCard = (props) => {

  let content;

  props.type === "PROJECTS"
    ? (content = (
        <Card>
          <Card.Content header={`Department: ${props.department}`} />
          <Card.Content>
            {props.projectEmployees.length > 0 ? (
              <Label>Employees on this Project</Label>
            ) : (
              <Label>No Employees</Label>
            )}
            <EditModal
              id={props.id}
              name={props.name}
              companyId={props.companyId}
              department={props.department}
              employees={props.projectEmployees}
            />
            <Divider horizontal></Divider>
            {props.projectEmployees?.map((emp) => (
              <div key={emp.id}>
                <Icon name='user'>
                  {emp.firstName} {emp.lastName}
                </Icon>
              </div>
            ))}
          </Card.Content>
        </Card>
      ))
    : (content = props.address ? (
        <Card>
          <Card.Content header={props.address.country} />
          <Card.Content meta={props.address.state} />
          <Card.Content extra>
            <p>{props.address.city}</p>
            <p>{props.address.street}</p>
          </Card.Content>
        </Card>
      ) : (
        <Label>No data</Label>
      ));

  return content;
};

export default DisplayCard;

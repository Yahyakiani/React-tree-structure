import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Checkbox, Form, Modal } from "semantic-ui-react";
import { selectAllEmployee } from "../features/employeeSlice";
import MultipleSelect from "./multiSelect";

const EditForm = ({ id, name, employees,closeModal }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [projectName, setProjectname] = useState(name);
    const [options, setOptions] = useState([]);
    const allEmployees = useSelector(selectAllEmployee)

    useEffect(() => {
        const selectList=employees.map(emp=> emp.id)
        const optionList=allEmployees[0].map(emp=>{
            return {
                key:emp.id,
                text:`${emp.firstName} ${emp.lastName}`,
                value:emp.id
            }
        })
        setOptions(optionList)
        setSelectedItems(selectList)
        
    }, [])

    const onSubmit = (e)=> {
        e.preventDefault()
        const projectData={
            projectID:id,
            projectName:projectName,
            employees:selectedItems
        }
        console.log(projectData);
        closeModal()

    }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Project Name</label>
        <input placeholder="Project Name" value={projectName} onChange={e => setProjectname(e.target.value)} />
      </Form.Field>
      <Form.Field
        label="Employees"
        control={MultipleSelect}
        options={options}
        selected={selectedItems}
        setSelect={setSelectedItems}
      />

      <Form.Field>
        <Button type="submit" color="green">
          Update
        </Button>
      </Form.Field>
    </Form>
  );
};

export default EditForm;
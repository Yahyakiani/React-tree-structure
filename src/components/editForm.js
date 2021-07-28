import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { getCompanies } from "../features/companySlice";
import { selectAllEmployee } from "../features/employeeSlice";
import { updateProject } from "../features/projectSlice";
import MultipleSelect from "./multiSelect";

const EditForm = ({ id, name, employees,closeModal }) => {

    const dispatch = useDispatch()
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
        
    }, [employees])

    const onSubmit = (e)=> {
        e.preventDefault()
        const projectData={
            projectID:id,
            projectName:projectName,
            employees:selectedItems
        }
        dispatch(updateProject(projectData))
        dispatch(getCompanies())
        // console.log(projectData);
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

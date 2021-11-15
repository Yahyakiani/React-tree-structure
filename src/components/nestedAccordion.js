import React, { useEffect, useState } from 'react'
import { Accordion, Label } from 'semantic-ui-react'
import DetailModal from './detailModal'
import DisplayCard from './displayCard'
import DataLoader from './loader'

const NestedAccordion = ({ all_companies, all_addr, all_projects, all_employees }) => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (all_companies?.length && all_addr?.length && all_projects?.length && all_employees?.length) {
      const data = processData(all_companies, all_employees, all_projects, all_addr),
            accordion = generateRootAccord(data)

      setContent(accordion)
    }
  }, [all_companies,all_addr, all_projects, all_employees])

  function generateRootAccord(data) {
    return Object.keys(data)
      .reduce((acc, cur) => {
        const company = data[cur]

        acc.push({
          key: company.id,
          title: company.name,
          content: (
            <Accordion.Content>
              <Accordion.Accordion panels={[{ key: 'jobarea', title: 'Job Areas', content: generateAreasAccord(company) }]} />
              <Accordion.Accordion panels={[{ key: 'projects', title: 'Projects', content: generateProjectsAccord(company) }]} />
            </Accordion.Content>
          )
        })

        return acc
      }, [])
  }

  function generateProjectsAccord({ projects }) {
    const panels = Object.keys(projects)
      .reduce((acc, cur) => {
        const project = projects[cur]

        acc.push({
          key: project.id,
          title: project.name,
          content: (
            <Accordion.Content>
              <DisplayCard 
                id={project.key}
                type={'PROJECTS'}
                companyId={project.companyId}
                name={project.name}
                department={project.department}
                projectEmployees={project.employeesId}
              />
            </Accordion.Content>
          )
        })

        return acc
      }, [])

    return (
      <Accordion.Content>
        {panels.length 
          ? ( <Accordion.Accordion panels={panels} /> )
          : <Label>No data</Label>
        }
      </Accordion.Content>
    )
  }

  function generateAreasAccord({ employees, areas }) {
    const panels = Object.keys(areas)
      .reduce((acc, cur) => {
        const area = areas[cur]

        acc.push({
          key: area.name,
          title: `${area.name} (${area.employees.length})`,
          content: (
            <Accordion.Content>
              <ul style={{ margin: 0, padding: '.75em 1em', listStyleType: 'none' }}>
                {area.employees.map(employee => {
                  const emp = employees[employee]

                  return (
                    <li key={emp.id} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{emp.firstName} {emp.lastName}</span>
                        <DetailModal 
                          size={'small'}
                          name={emp.name}
                          dob={emp.dateOfBirth} 
                          jobArea={emp.jobArea} 
                          jobTitle={emp.jobTitle} 
                          jobType={emp.jobType} 
                          projects={emp.projects}
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Accordion.Content>
          )
        })

        return acc
      }, [])

    return (
      <Accordion.Content>
        {panels.length 
          ? <Accordion.Accordion panels={panels} />
          : <Label>No data</Label>
        }
      </Accordion.Content>
    )
  }

  function processData(companies, employees, projects, adresses) {
    /* create initial company entries */
    const data = companies
      .reduce((acc, company) => {
        acc[company.id] = {
          ...company,
          areas: {},
          employees: {},
          projects: []
        }

        return acc
      }, {})

    /* loop all employees once and create areas/employees entries */
    for (let i = 0; i < employees.length; i++) {
      const employee = { ...employees[i], projects: [] },
            company = data[employee.companyId],
            area = employee.jobArea.toLowerCase()

      company.employees[employee.id] = employee

      /* check if area key is not registered */
      if (!company.areas[area]) {
        /* set initial value */
        company.areas[area] = {
          name: area,
          employees: []
        }
      }

      company.areas[area].employees.push(employee.id)
    }

    /* loop all projects */
    for (let i = 0; i < projects.length; i++) {
      const project = { ...projects[i] },
            company = data[project.companyId],
            employees = project.employeesId

      project.employeesId = employees.map((emp) => {
        const employee = company.employees[emp]
        // console.log(employee);
  
        company.employees[emp]?.projects.push(project.name)

        return employee ? { id: emp, name: `${employee.firstName} ${employee.lastName}}` } : null
      })
      project.employeesId=project.employeesId.filter(emp=> emp !=null)
      // console.log(project.employeesId);

      company.projects.push(project)
    }

    return data
  }

  return (
    <>
      { content !== null
        ? <Accordion defaultActiveIndex={0} panels={content} styled /> 
        : <DataLoader />
      }
    </>
  )
}

export default NestedAccordion
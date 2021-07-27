import React, { useEffect, useState } from 'react'
import { Accordion, Label } from 'semantic-ui-react'
import DetailModal from './detailModal'
import DisplayCard from './displayCard'
import DataLoader from './loader'




const NestedAccordion = ({ all_companies, all_addr, all_projects, all_employees }) => {

  const [content, setContent] = useState(null)


  useEffect(() => {
    
    let temp_companies;
    if(all_companies?.length && all_addr?.length && all_projects?.length && all_employees?.length){

      // Copy the companies so i can add property to the object in a specific 
      // structure that accordian component requires

      temp_companies = JSON.parse(JSON.stringify(all_companies));
      const temp_data = process(temp_companies)
      accordianNesting(temp_data);
      setContent(temp_data)
    }


  }, [all_companies,all_addr, all_projects, all_employees])


   // Process data to covert it in the form that nestedaccordian requires
  const process = (data) => {
    for (const company of data) {

      company.key = company.id
      company.title = company.name

      company.employees = all_employees.filter(emp => emp.companyId === company.id)
      const address = all_addr.filter(addr => addr.companyId === company.id)
      const projects = all_projects.filter(proj => proj.companyId === company.id).map(proj => {

        //Employees working on current Project from this company
        const projectEmployees = company.employees?.filter(ce => proj.employeesId?.some(pe => ce.id === pe));
        // console.log(projectEmployees);
        return {
          key: proj.id,
          title: proj.name,
          type: 'PROJECTS',
          department:proj.department,
          projectEmployees: projectEmployees,
          content: []

        }
      })
      let jobAreas = company.employees.map(emp => {

        const areaEmployees = company.employees.filter(e => e.jobArea === emp.jobArea).map(e => {
          let projectsPartOf=[]
          for (const project of all_projects) {
            const found = project?.employeesId.some(emp=> emp===e.id)
            if(found){
              projectsPartOf.push(project)
            }
          }
          // console.log(projectsPartOf);


          return {
            key: e.id,
            title: `${e.firstName} ${e.lastName}`,
            dob: e.dateOfBirth,
            jobArea: e.jobArea,
            jobType: e.jobType,
            jobTitle: e.jobTitle,
            projects:projectsPartOf,
            type: 'EMPLOYEES',
            content: []
          }
        })
        console.log(areaEmployees.length);

        return {
          key: company.employees.filter(e => e.jobArea === emp.jobArea).map(e => e.jobArea)[0],
          title: `${company.employees.filter(e => e.jobArea === emp.jobArea).map(e => e.jobArea)[0]} (${areaEmployees.length})`,
          content: [
            ...areaEmployees
          ]
        }
      })

      //Removing Duplicate job Areas for different employees
      jobAreas = jobAreas.filter((v, i, a) => a.findIndex(t => (t.key === v.key)) === i)

      company.content = [
        {
          key: "Job Areas",
          title: "Job Areas",
          content: [...jobAreas]
        },
        {
          key: "Projects",
          title: "Projects",
          content: [
            ...projects,
          ],
        }
        , {
          key: "Address",
          title: "Address",
          content: [
          ],
          address: address,
          type:'ADDRESS'
        }

      ]

    };

    const final = [
      {
        key: "Companies",
        title: "Companies",
        content: [...data]
      }
    ]
    return final

  }

  // Rendering the json object recursively
  const accordianNesting = (jsonData) => {
    if (jsonData.length === 0) {
      return;
    } else {
      for (let i = 0; i < jsonData.length; i++) {
        accordianNesting(jsonData[i]["content"]);

        if (jsonData[i]["content"].length !== 0) {
          jsonData[i]["content"] = {
            content: (
              <div>
                <Accordion.Accordion panels={jsonData[i]["content"]} />
              </div>
            ),
          };
        } else {

          if(jsonData[i]?.type ==='PROJECTS'){

            jsonData[i]["content"] = {
              content: (
                <DisplayCard 
                type={'PROJECTS'}
                name={jsonData[i].title}
                department={jsonData[i].department}
                projectEmployees={jsonData[i].projectEmployees} />
                ),
              } 
              }
          else if (jsonData[i]?.type ==='EMPLOYEES'){
            jsonData[i]["content"] = {
              content: (
                <DetailModal 
                size={'small'}
                name={jsonData[i].title} 
                dob={jsonData[i].dob} 
                jobArea={jsonData[i].jobArea} 
                jobTitle={jsonData[i].jobTitle} 
                jobType={jsonData[i].jobType} 
                projects={jsonData[i].projects}
                 />
                ),
              }
               
          }
          else if (jsonData[i]?.type ==='ADDRESS'){
            // console.log(jsonData[i].address[0]);
            jsonData[i]["content"] = {
              content: (
                <DisplayCard
                type={'ADDRESS'}
                address={jsonData[i].address[0]} />
                ),
              }
          }
          else{
            jsonData[i]["content"] = {
              content: (
                <Label>No data</Label>
                ),
              }

          }
          
        }
      }
    }
  }




  return (
    <>
    {

      content!==null ?
      <Accordion defaultActiveIndex={-1} panels={content} styled /> : <DataLoader />
    }
    </>
  );
}

export default NestedAccordion;
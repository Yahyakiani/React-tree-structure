import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCompanies, selectAllCompanies } from '../features/companySlice';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import { getAddress, selectAllAddress } from '../features/addressSlice';
import { getProjects, selectAllProjects } from '../features/projectSlice';
import { getEmployees, selectAllEmployee } from '../features/employeeSlice';
import NestedAccordion from '../components/nestedAccordion';
import NavBar from '../components/Menu';

export default function Home() {
  const dispatch = useDispatch()
  const companies = useSelector(selectAllCompanies)
  const addresses = useSelector(selectAllAddress)
  const projects = useSelector(selectAllProjects)
  const employees = useSelector(selectAllEmployee)
  // const companyStatus = useSelector(state => state.company.status)

  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getAddress())
    dispatch(getProjects())
    dispatch(getEmployees())
  }, [dispatch]);

  return (
    <Container>
      <NavBar />
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='building' />
          Company Details
        </Header>
      </Divider>
      <NestedAccordion all_addr={addresses} all_projects={projects} all_companies={companies} all_employees={employees} />
    </Container>
  )
}
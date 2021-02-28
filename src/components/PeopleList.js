import  React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Button, Col, } from 'react-bootstrap' ;
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default function PeopleList() {

    const initailState = {firstName:"", 
                          lastName:"",
                          gen:"", age:"",
                          nation:"",
                          phone:""};
    const [people, setPeople] = useState(initailState);
    const [peopleList, setPeopleList] = useState([]);
    const [temp, setTemp] = useState("");

    const colums = [
        { dataField: 'index', text: 'ID', sort: true },
        { dataField: 'firstName', text: 'First Name', sort: true },
        { dataField: 'lastName', text: 'Last Name', sort: true},
        { dataField: 'gen', text: 'Gen', sort: true },
        { dataField: 'age', text: 'Age', sort: true },
        { dataField: 'nation', text: 'Nationality', sort: true },
        { dataField: 'phone', text: 'Phone', sort: true }
    ]

    const defaultSorted = [{
        dataField: 'firstName',
        order: 'desc'
    }];

    const pagination = paginationFactory({
        page: 2,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        perPageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }

    });

    const { ExportCSVButton } = CSVExport;
    
    return(
        <div  className = "mb-3">
            <h3 align = "center">
                People
            </h3>
            <br/> 

            <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="First name"
                value={people.firstName} 
                onChange={e =>{
                    setPeople({...people, firstName: e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Last name"
                value={people.lastName} 
                onChange={e =>{
                    setPeople({...people, lastName: e.target.value})
                }} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridGen">
                    <Form.Label>Gen</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..."
                    value={people.gen} 
                    onChange={e =>{
                        setPeople({...people, gen: e.target.value})
                    }}>
                        <option>Choose...</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control placeholder="Age"
                    value={people.age} 
                    onChange={e =>{
                        setPeople({...people, age: e.target.value})
                    }} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Nationality</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..."
                    value={people.nation} 
                    onChange={e =>{
                        setPeople({...people, nation: e.target.value})
                    }}>
                        <option>Choose...</option>
                        <option>Thai</option>
                        <option>English</option>
                        <option>Other</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>TelePhone</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." 
                    value={temp} 
                    onChange={e =>{
                        setTemp(e.target.value)
                    }}>
                        <option>Choose...</option>
                        <option>+66</option>
                        <option>+00</option>
                    </Form.Control>
                    <Form.Control type="text" placeholder="your number"
                    value= {people.phone}
                    onChange={e =>{
                        setPeople({...people, phone:e.target.value})
                    }}/>
                </Form.Group>

            </Form.Row>

            <Button variant="primary" type="submit"
            onClick = {e =>{
                e.preventDefault();
                setPeopleList([...peopleList, {...people, index: peopleList.length}])
            }}>
                Submit
            </Button>
            </Form>

            {/*<ul>
                {peopleList.map(item => <li>key = {item.index} First Name: {item.firstName},
                                                Last Name:{item.lastName}, Gen: {item.gen}, 
                                                Age: {item.age}, Nationality: {item.nation},
                                                Phone: {item.phone}</li>)}
                </ul>*/}

            <h3 align="center" >People table</h3>
            <br/>

            <ToolkitProvider
                keyField="id"
                data={ peopleList }
                columns={ colums }
                exportCSV
                >
                {
                    props => (
                    <div>
                        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                        <hr />
                        <BootstrapTable defaultSorted={defaultSorted}
                        pagination={pagination} { ...props.baseProps } cellEdit={cellEditFactory({ mode: 'click' })}/>
                    </div>
                    )
                }
            </ToolkitProvider>


        </div>
        
    );
    
}

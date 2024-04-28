import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const MyAccordion = () => {
  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);

  const toggleMenu1 = () => {
    setMenu1Open(!menu1Open);
    if (menu2Open) {
      setMenu2Open(false);
    }
  };

  const toggleMenu2 = () => {
    setMenu2Open(!menu2Open);
    if (menu1Open) {
      setMenu1Open(false);
    }
  };

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={toggleMenu1}>
              Menu 1
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0" in={menu1Open}>
            <Card.Body>
              Content for Menu 1
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={toggleMenu2}>
              Menu 2
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1" in={menu2Open}>
            <Card.Body>
              Content for Menu 2
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default MyAccordion;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { Button, Container, Form, ListGroup } from 'react-bootstrap';

const Popup = () => {
  const [date, setDate] = React.useState('');
  const [dates, setDates] = React.useState([]);

  const handleSubmit = () => {
    setDates([...dates, date]);
    setDate('');
  };

  const handleDelete = (index) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleSelect = (index) => {
    // Get the selected date.
    const selectedDate = dates[index];
  
    // Calculate the remaining days for the selected date.
    const remainingDays = Math.ceil((new Date(selectedDate) - new Date()) / (1000 * 60 * 60 * 24));

    // Send a message to the background script to update the badge value.
    chrome.runtime.sendMessage({
      type: 'updateBadgeValue',
      remainingDays: remainingDays,
    });
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Days Tracker</h1>
      <Form className="mb-3">
        <Form.Group controlId="date">
          <Form.Label>Select a Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-50 small-input" // Add a custom class for smaller input
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} className="small-button">
          Submit
        </Button>
      </Form>
      <ListGroup>
        {dates.map((date, index) => (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between small-list-item">
            <Form.Check
              type="radio"
              id={`date-radio-${index}`}
              label=""
              onChange={() => handleSelect(index)}
              className="small-radio-button mr-2"
            />
            <span className="small-date-text mr-2">
              {date}
            </span>
            <Button
              variant="danger"
              onClick={() => handleDelete(index)}
              className="small-delete-button"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Popup;

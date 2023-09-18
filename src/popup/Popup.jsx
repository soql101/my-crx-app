import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { Button, Container, Form, ListGroup, Badge } from 'react-bootstrap';

const Popup = () => {
  const [date, setDate] = React.useState('');
  const [eventName, setEventName] = React.useState('');
  const [dates, setDates] = React.useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(null);

  const handleSubmit = () => {
    if (date && eventName) {
      setDates([...dates, { date, eventName }]);
      setDate('');
      setEventName('');
    }
  };

  const handleDelete = (index) => {
    setDates(dates.filter((_, i) => i !== index));
    if (index === selectedDateIndex) {
      setSelectedDateIndex(null);
    }
  };

  const handleSelect = (index) => {
    setSelectedDateIndex(index);
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Days Tracker</h1>
      <Form className="mb-3">
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="small-input"
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="small-input"
          />
        </Form.Group>
        <div className="text-center"> {/* Centered the Submit button */}
          <Button variant="primary" onClick={handleSubmit} className="small-button mt-3">
            Submit
          </Button>
        </div>
      </Form>
      <div className="mb-3">
        {selectedDateIndex !== null && (
          <div className="d-flex justify-content-center">
            <Badge variant="primary">
              {Math.ceil(
                (new Date(dates[selectedDateIndex].date) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )}{' '}
              days
            </Badge>
          </div>
        )}
      </div>
      <ListGroup>
        {dates.map((data, index) => (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between small-list-item">
            <Form.Check
              type="radio"
              id={`date-radio-${index}`}
              label=""
              onChange={() => handleSelect(index)}
              className="small-radio-button mr-2"
              checked={selectedDateIndex === index}
            />
            <span className="small-date-text mr-2">
              {data.eventName} - {data.date}
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

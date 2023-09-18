import React from 'react';

const Popup = () => {
  const [date, setDate] = React.useState('');
  const [dates, setDates] = React.useState([]);

  const handleSubmit = () => {
    setDates([...dates, date]);
  };

  const handleDelete = (index) => {
    setDates(dates.filter((date, i) => i !== index));
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
    <div>
      <h1>Days Tracker</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <ul>
      {dates.map((date, index) => (
        <li key={index}>
          <input
            type="radio"
            name="date"
            value={date}
            onChange={() => handleSelect(index)} // Pass index to the handler
          />
          {date}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Popup;

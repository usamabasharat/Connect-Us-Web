import React, { useEffect } from 'react';
import { Calendar, Button } from 'antd';
import { useSelector } from 'react-redux';
import { GetDataByID } from '../API/api';

function Dashboard() {
  let allMeetings;
  const { user } = useSelector((state) => state.user);
  const Id = user.id;

  useEffect(() => {
    async function fetchMeetings() {
      const meetings = await GetDataByID('meetings', Id);
      allMeetings = await meetings.json();
    }
    fetchMeetings();
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <div className="flex w-2/3 justify-center">
        <Calendar />
      </div>
      <div className="flex w-1/3 justify-center mt-8">
        <div className="flex flex-col w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
          {allMeetings.map(() => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium">g with John Doe</h3>
                <p className="text-gray-500 text-sm mt-1">Wednesday, March 23, 2023 at 10:00 AM</p>
              </div>
              <div className="p-4 flex justify-end">
                <Button className="mr-2">Accept</Button>
                <Button className="mr-2">Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

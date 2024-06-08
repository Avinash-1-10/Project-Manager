import React from 'react';
import Layout from '../Layout';

const Activities = () => {
  const activities = [
    {
      project: 'Project Alpha',
      member: 'John Doe',
      action: 'moved task from Todo to In Progress',
      timestamp: '2023-06-05 10:15:00',
    },
    {
      project: 'Project Beta',
      member: 'Jane Smith',
      action: 'moved task from In Progress to Done',
      timestamp: '2023-06-05 12:30:00',
    },
    {
      project: 'Project Alpha',
      member: 'Mark Brown',
      action: 'created new task in Todo',
      timestamp: '2023-06-04 09:00:00',
    },
    // Add more dummy activities here
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Project Activities</h1>
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center p-2  shadow-sm rounded-lg border border-red-500">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                {activity.member[0]}
              </div>
              <div className="ml-2">
                <p className="text-sm font-semibold">{activity.member}</p>
                <p className="text-xs text-gray-500">{activity.action}</p>
                <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-600 font-medium">{activity.project}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Activities;

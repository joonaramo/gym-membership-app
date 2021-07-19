import { useState } from 'react';
import { ScaleIcon } from '@heroicons/react/outline';

import Sidebar from './Sidebar';
import Header from './Header';
import PageHeader from './PageHeader';
import Overview from './Overview';
import Activity from './Activity';

const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
];

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className='flex-1 overflow-auto focus:outline-none'>
        <Header setSidebarOpen={setSidebarOpen} />
        <main className='flex-1 relative pb-8 z-0 overflow-y-auto'>
          {/* Page header */}
          <PageHeader />
          <div className='mt-8'>
            <Overview cards={cards} />
            <Activity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

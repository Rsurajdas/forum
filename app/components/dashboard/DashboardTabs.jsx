import { useState } from 'react';
import { Tabs } from '@mantine/core';
import DashboardCard from './DashboardCard';
import {
  IconEye,
  IconMessage,
  IconMessageDots,
  IconThumbUp,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react';

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('one-day');

  return (
    <Tabs value={activeTab} onChange={setActiveTab} color="lime">
      <Tabs.List>
        <Tabs.Tab value="one-day">24 Hours</Tabs.Tab>
        <Tabs.Tab value="30-day">30 Days</Tabs.Tab>
        <Tabs.Tab value="all-time">All time</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="one-day">
        <div className="grid grid-cols-5 pt-6 flex-wrap gap-4">
          <DashboardCard
            value={10}
            label="Page views"
            icon={IconEye}
            iconStroke={1}
          />
          <DashboardCard
            value={25}
            label="Topics"
            icon={IconMessage}
            iconStroke={1}
          />
          <DashboardCard
            value={67}
            label="Posts"
            icon={IconMessageDots}
            iconStroke={1}
          />
          <DashboardCard
            value={234}
            label="Likes"
            icon={IconThumbUp}
            iconStroke={1}
          />
          <DashboardCard
            value={234}
            label="Users"
            icon={IconUsers}
            iconStroke={1}
          />
          <DashboardCard
            value={108}
            label="Follows"
            icon={IconUserPlus}
            iconStroke={1}
          />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="30-day">
        <div className="grid grid-cols-5 pt-6 flex-wrap gap-4">
          <DashboardCard
            value={5490}
            label="Page views"
            icon={IconEye}
            iconStroke={1}
          />
          <DashboardCard
            value={156}
            label="Topics"
            icon={IconMessage}
            iconStroke={1}
          />
          <DashboardCard
            value={345}
            label="Posts"
            icon={IconMessageDots}
            iconStroke={1}
          />
          <DashboardCard
            value={3456}
            label="Likes"
            icon={IconThumbUp}
            iconStroke={1}
          />
          <DashboardCard
            value={1234}
            label="Users"
            icon={IconUsers}
            iconStroke={1}
          />
          <DashboardCard
            value={845}
            label="Follows"
            icon={IconUserPlus}
            iconStroke={1}
          />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="all-time">
        <div className="grid grid-cols-5 pt-6 flex-wrap gap-4">
          <DashboardCard
            value={8990}
            label="Page views"
            icon={IconEye}
            iconStroke={1}
          />
          <DashboardCard
            value={356}
            label="Topics"
            icon={IconMessage}
            iconStroke={1}
          />
          <DashboardCard
            value={756}
            label="Posts"
            icon={IconMessageDots}
            iconStroke={1}
          />
          <DashboardCard
            value={4356}
            label="Likes"
            icon={IconThumbUp}
            iconStroke={1}
          />
          <DashboardCard
            value={1334}
            label="Users"
            icon={IconUsers}
            iconStroke={1}
          />
          <DashboardCard
            value={945}
            label="Follows"
            icon={IconUserPlus}
            iconStroke={1}
          />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}

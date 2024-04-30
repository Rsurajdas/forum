import { Card } from '@mantine/core';

export default function DashboardCard({
  value,
  label,
  icon: Icon,
  iconStroke,
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="relative">
      <Icon
        color="#639F0E"
        size="50"
        className="absolute top-2 right-4"
        stroke={iconStroke}
      />
      <span className="text-xl font-semibold">{value}</span>
      <p className="text-gray-500 mt-1">{label}</p>
    </Card>
  );
}

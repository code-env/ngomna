'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabsStore } from '@/providers/tabs';
import { Tab } from './sidebar';
import { HelpCircle, QrCode } from 'lucide-react';
import { ROlES } from '@prisma/client';

const TabsComponents = () => {
  const { activeTab, setActiveTab } = useTabsStore() as {
    activeTab: string;
    setActiveTab: (value: string) => void;
  };

  const user = {
    id: '1',
    clerkId: 'clerk123',
    email: 'jean.kouam@example.com',
    username: 'jeankouam',
    role: ROlES.USER, // Assuming ROLES is an enum and 'USER' is a valid value
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    name: 'Jean Kouam',
    licenseStatus: 'Active',
    licenseNumber: 'CM12345678',
    expiryDate: '2025-12-31',
    biometricStatus: 'Verified',
  };

  const tabs: Tab[] = [
    {
      tab: 'my-license',
      title: 'My License',
      icon: 'House',
    },
    {
      tab: 'application',
      title: 'Application/Renewal',
      icon: 'FileText',
    },
    {
      tab: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
    },
    {
      tab: 'payments',
      title: 'Payment History',
      icon: 'CreditCard',
    },
    {
      tab: 'support',
      title: 'Support',
      icon: 'CircleHelp',
    },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      message: 'Your license renewal is due in 30 days',
      date: '2024-09-15',
    },
    { id: 2, message: 'New traffic regulation update', date: '2024-09-10' },
  ];

  // Mock payment history
  const payments = [
    {
      id: 1,
      amount: 15000,
      date: '2024-08-01',
      description: 'License Renewal Fee',
    },
    {
      id: 2,
      amount: 5000,
      date: '2024-07-15',
      description: 'Document Verification',
    },
  ];
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger key={tab.tab} value={tab.tab}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="my-license" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Digital License Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="font-semibold">License Number:</span>
                <span>{user.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Expiry Date:</span>
                <span>{user.expiryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Biometric Verification:</span>
                <span className="text-green-600">{user.biometricStatus}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>QR Code for Instant Validation</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <QrCode size={200} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="application">
        <Card>
          <CardHeader>
            <CardTitle>Application/Renewal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Your current application is in progress.</p>
              <ol className="list-decimal list-inside space-y-1">
                <li className="text-green-600">Submit application ✓</li>
                <li className="text-green-600">Pay fees ✓</li>
                <li className="text-blue-600 font-semibold">
                  Document verification (in progress)
                </li>
                <li className="text-gray-400">Biometric capture</li>
                <li className="text-gray-400">License issuance</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {notifications.map(notification => (
                <li
                  key={notification.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{notification.message}</span>
                  <span className="text-sm text-gray-500">
                    {notification.date}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payments">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {payments.map(payment => (
                <li
                  key={payment.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{payment.description}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">
                      {payment.amount} FCFA
                    </span>
                    <Button variant="outline" size="sm">
                      Download Receipt
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="support">
        <Card>
          <CardHeader>
            <CardTitle>Customer Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Need help? Our support team is here to assist you.
            </p>
            <Button>
              <HelpCircle className="mr-2 h-4 w-4" />
              Open Support Ticket
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponents;

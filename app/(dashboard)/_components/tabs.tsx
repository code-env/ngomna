'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabsStore } from '@/providers/tabs';
import { Tab } from './sidebar';
import { HelpCircle } from 'lucide-react';
import { ROlES, User } from '@prisma/client';
import { useOrigin } from '@/hooks/use-origin';
import QrCode from 'qrcode';
import { useEffect, useState, useCallback } from 'react';

const TabsComponents = ({ user }: { user: User }) => {
  const origin = useOrigin();
  const [src, setSrc] = useState<string | null>(null);

  const { activeTab, setActiveTab } = useTabsStore() as {
    activeTab: string;
    setActiveTab: (value: string) => void;
  };

  useEffect(() => {
    QrCode.toDataURL(`${origin}/d/profile/${user.id}`, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setSrc(url);
    });
  }, [origin]);

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

  const generateBadge = useCallback(() => {
    if (!src) {
      console.error('QR code URL is not available');
      return;
    }

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
        <rect width="100%" height="100%" fill="#fff"/>
        <rect width="100%" height="200" fill="#FACC15"/>
        <g transform="translate(50, 120)">
          <text x="0" y="0" font-size="16" fill="#333">
            <tspan x="0" dy="1.2em">Username: ${user.username}</tspan>
          </text>
          <text x="0" y="50" font-size="16" fill="#333">
            <tspan x="0" dy="1.2em">Email: ${user.email || 'Not specified'}</tspan>
          </text>
          <text x="0" y="100" font-size="16" fill="#333">
            <tspan x="0" dy="1.2em">Matriculation: ${user.clerkId || 'Not specified'}</tspan>
          </text>
        </g>
        <image x="170" y="350" width="150" height="150" href="${src}"/>
      </svg>
    `;

    const svgBlob = new Blob([svgContent], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `badge-${user.username}.png`;
        link.href = pngUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to get 2D context');
      }
    };
    img.src = url;
  }, [src, user.id, user.clerkId, user.email, user.username]);

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
                <span>Nothing</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Expiry Date:</span>
                <span>Nothing2</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Biometric Verification:</span>
                <span className="text-green-600">GAY</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p>QR Code for Instant Validation</p>
              <Button disabled={!src} onClick={generateBadge}>
                Generate badge
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="size-40 bg-muted">
              {src && <img src={src} alt="QR Code" />}
            </div>
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

'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, User, Lock, Monitor, ShieldCheck, Globe, Copy, Scan, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UserSettingsPage() {
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BUIE3I43CVBXEMIG');
    toast({
      title: 'Copied',
      description: 'Setup key copied to clipboard.',
    });
  };

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your profile and account settings.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8 items-start">
        <TabsList className="flex md:flex-col h-auto md:w-64 bg-transparent p-0 gap-1 space-y-0 md:space-y-1 items-start">
          <TabsTrigger
            value="profile"
            className="justify-start px-4 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none w-full"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="justify-start px-4 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none w-full"
          >
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger
            value="2fa"
            className="justify-start px-4 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none w-full"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Two-Factor Auth
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="justify-start px-4 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none w-full"
          >
            <Monitor className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* Profile Section */}
          <TabsContent value="profile" className="mt-0 space-y-8">
            <section className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Profile information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your name and email address.
                </p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="chinedu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" defaultValue="chinextworld@yahoo.com" className="bg-yellow-50/50" />
                </div>
                <Button className="bg-black text-white hover:bg-black/90">Save</Button>
              </div>
            </section>

            <Separator />

            <section className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Delete account</h3>
                <p className="text-sm text-muted-foreground">
                  Delete your account and all of its resources.
                </p>
              </div>
              <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-600 max-w-2xl">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                <AlertTitle className="font-bold">Warning</AlertTitle>
                <AlertDescription>
                  Please proceed with caution, this cannot be undone.
                </AlertDescription>
                <div className="mt-4">
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete account</Button>
                </div>
              </Alert>
            </section>
          </TabsContent>

          {/* Password Section */}
          <TabsContent value="password" className="mt-0 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Ensure your account is using a long, random password to stay secure.
              </p>
            </div>
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </div>
          </TabsContent>

          {/* 2FA Section */}
          <TabsContent value="2fa" className="mt-0 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Manage your two-factor authentication settings.
              </p>
            </div>
            
            <div className="space-y-4 max-w-2xl">
              <Badge variant="destructive" className="rounded-md px-2 py-0.5 font-normal">Disabled</Badge>
              <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
                When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone.
              </p>
              <Button 
                variant="outline" 
                className="rounded-full gap-2 border-primary/20 hover:bg-primary/5"
                onClick={() => setIs2FAModalOpen(true)}
              >
                <Scan className="h-4 w-4" />
                Continue Setup
              </Button>
            </div>

            <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
              <DialogContent className="sm:max-w-md flex flex-col items-center text-center p-8">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Scan className="h-6 w-6 text-muted-foreground" />
                </div>
                <DialogHeader className="items-center">
                  <DialogTitle className="text-xl font-bold">Enable Two-Factor Authentication</DialogTitle>
                  <CardDescription className="max-w-[280px]">
                    To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app.
                  </CardDescription>
                </DialogHeader>
                
                <div className="my-6 p-4 border rounded-xl bg-white">
                  <QrCode className="h-40 w-40 text-black" strokeWidth={1.5} />
                </div>

                <Button className="w-full bg-black text-white hover:bg-black/90 h-11" onClick={() => setIs2FAModalOpen(false)}>
                  Continue
                </Button>

                <div className="w-full flex items-center gap-2 my-4">
                  <div className="h-px bg-border flex-1" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">or, enter the code manually</span>
                  <div className="h-px bg-border flex-1" />
                </div>

                <div className="w-full flex items-center gap-2 rounded-lg border bg-muted/30 p-1 pl-3 pr-1">
                  <span className="text-xs font-mono font-medium flex-1 text-left">BUIE3I43CVBXEMIG</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background" onClick={handleCopyCode}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Appearance & Language Section */}
          <TabsContent value="appearance" className="mt-0 space-y-8">
            <section className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                  Customize the look and feel of the platform.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 max-w-2xl sm:grid-cols-3">
                <div className="cursor-pointer space-y-2 rounded-md border p-3 hover:bg-accent transition-colors">
                  <div className="aspect-video w-full rounded-sm bg-slate-100 border" />
                  <p className="text-center text-xs font-medium">Light</p>
                </div>
                <div className="cursor-pointer space-y-2 rounded-md border p-3 hover:bg-accent transition-colors">
                  <div className="aspect-video w-full rounded-sm bg-slate-950 border" />
                  <p className="text-center text-xs font-medium">Dark</p>
                </div>
                <div className="cursor-pointer space-y-2 rounded-md border p-3 border-primary bg-primary/5">
                  <div className="flex aspect-video w-full overflow-hidden rounded-sm border">
                    <div className="flex-1 bg-slate-100" />
                    <div className="flex-1 bg-slate-950" />
                  </div>
                  <p className="text-center text-xs font-medium">System</p>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Language</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select your preferred language for the interface.
                </p>
              </div>
              <div className="max-w-2xl">
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}

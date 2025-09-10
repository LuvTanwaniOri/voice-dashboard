import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Phone, 
  Plus, 
  Settings, 
  Globe, 
  CreditCard, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Copy,
  Edit,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for existing phone numbers
const mockPhoneNumbers = [
  {
    id: '1',
    number: '+1 (555) 123-4567',
    provider: 'Twilio',
    type: 'Purchased',
    status: 'Active',
    monthlyRate: '$2.50',
    country: 'United States'
  },
  {
    id: '2', 
    number: '+1 (555) 987-6543',
    provider: 'SIP Trunk',
    type: 'Connected',
    status: 'Active',
    monthlyRate: 'N/A',
    country: 'United States'
  }
];

const providers = [
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Reliable cloud communications platform',
    setupFee: '$0',
    monthlyRate: '$2.50',
    perMinute: '$0.013'
  },
  {
    id: 'telnyx',
    name: 'Telnyx', 
    description: 'Global connectivity cloud platform',
    setupFee: '$0',
    monthlyRate: '$2.00',
    perMinute: '$0.011'
  },
  {
    id: 'sarvam',
    name: 'Sarvam',
    description: 'AI-native communication platform',
    setupFee: '$0',
    monthlyRate: '$2.25',
    perMinute: '$0.012'
  }
];

export function Telephony() {
  const [phoneNumbers, setPhoneNumbers] = useState(mockPhoneNumbers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createMethod, setCreateMethod] = useState<'sip' | 'buy'>('buy');
  const [selectedProvider, setSelectedProvider] = useState('twilio');
  const [selectedCountry, setSelectedCountry] = useState('US');

  const handleCreatePhoneNumber = () => {
    // Mock implementation
    console.log('Creating phone number with method:', createMethod);
    setIsCreateDialogOpen(false);
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <Badge variant={status === 'Active' ? 'default' : 'secondary'} className="flex items-center gap-1">
      {status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {status}
    </Badge>
  );

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Phone Numbers</h1>
            <p className="text-text-muted mt-1">Manage your phone numbers for voice campaigns</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Phone Number
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Phone Number</DialogTitle>
                <DialogDescription>
                  Choose how you'd like to add a phone number to your account
                </DialogDescription>
              </DialogHeader>

              <Tabs value={createMethod} onValueChange={(value) => setCreateMethod(value as 'sip' | 'buy')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Buy Phone Number
                  </TabsTrigger>
                  <TabsTrigger value="sip" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    SIP Trunking
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">🇺🇸 United States</SelectItem>
                            <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                            <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                            <SelectItem value="IN">🇮🇳 India</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area-code">Area Code (Optional)</Label>
                        <Input id="area-code" placeholder="e.g., 555" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Choose Provider</Label>
                      <div className="grid gap-4">
                        {providers.map((provider) => (
                          <Card 
                            key={provider.id} 
                            className={cn(
                              "cursor-pointer transition-all duration-200 hover:shadow-md",
                              selectedProvider === provider.id && "ring-2 ring-primary"
                            )}
                            onClick={() => setSelectedProvider(provider.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-text-primary">{provider.name}</h3>
                                    <p className="text-sm text-text-muted">{provider.description}</p>
                                  </div>
                                </div>
                                <div className="text-right space-y-1">
                                  <div className="text-sm">
                                    <span className="text-text-muted">Setup: </span>
                                    <span className="font-medium text-text-primary">{provider.setupFee}</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-text-muted">Monthly: </span>
                                    <span className="font-medium text-text-primary">{provider.monthlyRate}</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-text-muted">Per min: </span>
                                    <span className="font-medium text-text-primary">{provider.perMinute}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sip" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">SIP Trunking Setup</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                            Connect your existing phone number through your SIP provider. You'll need SIP credentials from your provider.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sip-domain">SIP Domain</Label>
                        <Input id="sip-domain" placeholder="sip.yourprovider.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sip-port">Port</Label>
                        <Input id="sip-port" placeholder="5060" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sip-username">Username</Label>
                        <Input id="sip-username" placeholder="Your SIP username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sip-password">Password</Label>
                        <Input id="sip-password" type="password" placeholder="Your SIP password" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input id="phone-number" placeholder="+1 (555) 123-4567" />
                      <p className="text-xs text-text-muted">The phone number associated with this SIP trunk</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePhoneNumber}>
                  {createMethod === 'buy' ? 'Purchase Number' : 'Connect SIP Trunk'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Phone Numbers List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Your Phone Numbers</h2>
            <Badge variant="secondary" className="text-sm">
              {phoneNumbers.length} number{phoneNumbers.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="grid gap-4">
            {phoneNumbers.map((phone) => (
              <Card key={phone.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-text-primary">{phone.number}</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy number</TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-text-muted">{phone.provider}</span>
                          <Badge variant="outline" className="text-xs">
                            {phone.type}
                          </Badge>
                          <span className="text-sm text-text-muted">📍 {phone.country}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <StatusBadge status={phone.status} />
                        {phone.monthlyRate !== 'N/A' && (
                          <p className="text-sm text-text-muted mt-1">{phone.monthlyRate}/month</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit settings</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove number</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {phoneNumbers.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No phone numbers yet</h3>
                <p className="text-text-muted mb-4">Get started by adding your first phone number</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Phone Number
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pricing Information */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent-blue/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Pricing Information
            </CardTitle>
            <CardDescription>
              Transparent pricing for all providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {providers.map((provider) => (
                <div key={provider.id} className="space-y-2 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <h4 className="font-semibold text-text-primary">{provider.name}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Setup Fee:</span>
                      <span className="font-medium">{provider.setupFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Monthly:</span>
                      <span className="font-medium">{provider.monthlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Per Minute:</span>
                      <span className="font-medium">{provider.perMinute}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
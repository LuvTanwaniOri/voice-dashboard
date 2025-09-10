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
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState<typeof mockPhoneNumbers[0] | null>(null);
  const [createMethod, setCreateMethod] = useState<'sip' | 'buy' | 'import'>('buy');
  const [selectedProvider, setSelectedProvider] = useState('twilio');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [importProvider, setImportProvider] = useState('twilio');

  const handleCreatePhoneNumber = () => {
    // Mock implementation
    console.log('Creating phone number with method:', createMethod);
    setIsCreateDialogOpen(false);
  };

  const handleEditPhoneNumber = (phone: typeof mockPhoneNumbers[0]) => {
    if (phone.type === 'Connected') {
      setEditingPhone(phone);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEdit = () => {
    // Mock implementation
    console.log('Saving phone number edit');
    setIsEditDialogOpen(false);
    setEditingPhone(null);
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
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
              <DialogHeader className="pb-4">
                <DialogTitle>Add Phone Number</DialogTitle>
                <DialogDescription>
                  Choose how you'd like to add a phone number to your account
                </DialogDescription>
              </DialogHeader>

              <Tabs value={createMethod} onValueChange={(value) => setCreateMethod(value as 'sip' | 'buy' | 'import')} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="buy" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Buy Phone Number
                  </TabsTrigger>
                  <TabsTrigger value="import" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Import Phone Number
                  </TabsTrigger>
                  <TabsTrigger value="sip" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    SIP Trunking
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-sm">Country</Label>
                          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger className="h-9">
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
                          <Label htmlFor="area-code" className="text-sm">Area Code (Optional)</Label>
                          <Input id="area-code" className="h-9" placeholder="e.g., 555" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm">Choose Provider</Label>
                      <div className="space-y-2">
                        {providers.map((provider) => (
                          <Card 
                            key={provider.id} 
                            className={cn(
                              "cursor-pointer transition-all duration-200 hover:shadow-sm",
                              selectedProvider === provider.id && "ring-2 ring-primary"
                            )}
                            onClick={() => setSelectedProvider(provider.id)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-text-primary text-sm">{provider.name}</h3>
                                    <p className="text-xs text-text-muted">{provider.description}</p>
                                  </div>
                                </div>
                                <div className="text-right space-y-0.5">
                                  <div className="text-xs">
                                    <span className="text-text-muted">Setup: </span>
                                    <span className="font-medium text-text-primary">{provider.setupFee}</span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-text-muted">Monthly: </span>
                                    <span className="font-medium text-text-primary">{provider.monthlyRate}</span>
                                  </div>
                                  <div className="text-xs">
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

                <TabsContent value="import" className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column - Provider Selection & Instructions */}
                    <div className="space-y-4">
                      <div className="bg-surface-2 p-3 rounded-lg border border-border">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-text-primary text-sm">Import Existing Numbers</h4>
                            <p className="text-xs text-text-muted mt-1">
                              Import phone numbers from your existing provider accounts.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm">Choose Provider to Import From</Label>
                        <div className="space-y-2">
                          {[
                            { id: 'twilio', name: 'Twilio', description: 'Import from Twilio', icon: '🔷' },
                            { id: 'telnyx', name: 'Telnyx', description: 'Import from Telnyx', icon: '🟢' },
                            { id: 'sarvam', name: 'Sarvam', description: 'Import from Sarvam', icon: '🔵' }
                          ].map((provider) => (
                            <Card 
                              key={provider.id} 
                              className={cn(
                                "cursor-pointer transition-all duration-200 hover:shadow-sm",
                                importProvider === provider.id && "ring-2 ring-accent-blue"
                              )}
                              onClick={() => setImportProvider(provider.id)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                                    <span className="text-sm">{provider.icon}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-text-primary text-sm">{provider.name}</h3>
                                    <p className="text-xs text-text-muted truncate">{provider.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Configuration Forms */}
                    <div className="space-y-4">
                      {importProvider === 'twilio' && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-text-primary text-sm flex items-center gap-2">
                            🔷 Twilio Import Configuration
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label htmlFor="twilio-country" className="text-xs">Country</Label>
                              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                <SelectTrigger className="h-8">
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
                            <div className="space-y-1">
                              <Label htmlFor="twilio-phone" className="text-xs">Phone Number</Label>
                              <Input id="twilio-phone" className="h-8 text-sm" placeholder="+14156021922" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="twilio-sid" className="text-xs">
                              Twilio Account SID
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-3 h-3 ml-1 text-accent-blue inline cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-surface border-border text-text-primary">
                                  <p className="text-xs">Found in your Twilio Console dashboard</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input id="twilio-sid" className="h-8 text-sm" placeholder="Twilio Account SID" />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="twilio-token" className="text-xs">
                              Twilio Auth Token
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-3 h-3 ml-1 text-accent-blue inline cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-surface border-border text-text-primary">
                                  <p className="text-xs">Your secret auth token from Twilio Console</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input id="twilio-token" className="h-8 text-sm" type="password" placeholder="Twilio Auth Token" />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="twilio-label" className="text-xs">Label</Label>
                            <Input id="twilio-label" className="h-8 text-sm" placeholder="Label for Phone Number" />
                          </div>

                          <div className="flex items-center justify-between p-2 bg-surface-2 rounded-md">
                            <div className="space-y-0">
                              <Label className="text-xs font-medium">SMS Enabled</Label>
                              <p className="text-xs text-text-muted">Enable SMS messaging</p>
                            </div>
                            <input type="checkbox" className="w-3 h-3" defaultChecked />
                          </div>
                        </div>
                      )}

                      {importProvider === 'telnyx' && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-text-primary text-sm flex items-center gap-2">
                            🟢 Telnyx Import Configuration
                          </h4>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label htmlFor="telnyx-country" className="text-xs">Country</Label>
                              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                <SelectTrigger className="h-8">
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
                            <div className="space-y-1">
                              <Label htmlFor="telnyx-phone" className="text-xs">Phone Number</Label>
                              <Input id="telnyx-phone" className="h-8 text-sm" placeholder="+14156021922" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="telnyx-api-key" className="text-xs">
                              API Key
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-3 h-3 ml-1 text-accent-blue inline cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-surface border-border text-text-primary">
                                  <p className="text-xs">Your Telnyx API key from the developer portal</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input id="telnyx-api-key" className="h-8 text-sm" type="password" placeholder="Enter API Key" />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="telnyx-label" className="text-xs">Label</Label>
                            <Input id="telnyx-label" className="h-8 text-sm" placeholder="Label for Phone Number" />
                          </div>

                          <div className="flex items-center justify-between p-2 bg-surface-2 rounded-md">
                            <div className="space-y-0">
                              <Label className="text-xs font-medium">SMS Enabled</Label>
                              <p className="text-xs text-text-muted">Enable SMS messaging</p>
                            </div>
                            <input type="checkbox" className="w-3 h-3" defaultChecked />
                          </div>
                        </div>
                      )}

                      {importProvider === 'sarvam' && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-text-primary text-sm flex items-center gap-2">
                            🔵 Sarvam Import Configuration
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label htmlFor="sarvam-country" className="text-xs">Country</Label>
                              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                <SelectTrigger className="h-8">
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
                            <div className="space-y-1">
                              <Label htmlFor="sarvam-phone" className="text-xs">Phone Number</Label>
                              <Input id="sarvam-phone" className="h-8 text-sm" placeholder="+14156021922" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="sarvam-sid" className="text-xs">
                              Sarvam Account SID
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-3 h-3 ml-1 text-accent-blue inline cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-surface border-border text-text-primary">
                                  <p className="text-xs">Found in your Sarvam Console dashboard</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input id="sarvam-sid" className="h-8 text-sm" placeholder="Sarvam Account SID" />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="sarvam-token" className="text-xs">
                              Sarvam Auth Token
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-3 h-3 ml-1 text-accent-blue inline cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-surface border-border text-text-primary">
                                  <p className="text-xs">Your secret auth token from Sarvam Console</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input id="sarvam-token" className="h-8 text-sm" type="password" placeholder="Sarvam Auth Token" />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="sarvam-label" className="text-xs">Label</Label>
                            <Input id="sarvam-label" className="h-8 text-sm" placeholder="Label for Phone Number" />
                          </div>

                          <div className="flex items-center justify-between p-2 bg-surface-2 rounded-md">
                            <div className="space-y-0">
                              <Label className="text-xs font-medium">SMS Enabled</Label>
                              <p className="text-xs text-text-muted">Enable SMS messaging</p>
                            </div>
                            <input type="checkbox" className="w-3 h-3" defaultChecked />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sip" className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column - Instructions */}
                    <div className="space-y-4">
                      <div className="bg-surface-2 p-4 rounded-lg border border-border">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-text-primary">SIP Trunking Setup</h4>
                            <p className="text-sm text-text-muted mt-1">
                              Connect your existing phone number through your SIP provider. You'll need SIP credentials from your provider.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Configuration Form */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sip-domain" className="text-sm">SIP Domain</Label>
                          <Input id="sip-domain" className="h-9" placeholder="sip.yourprovider.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sip-port" className="text-sm">Port</Label>
                          <Input id="sip-port" className="h-9" placeholder="5060" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sip-username" className="text-sm">Username</Label>
                          <Input id="sip-username" className="h-9" placeholder="Your SIP username" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sip-password" className="text-sm">Password</Label>
                          <Input id="sip-password" className="h-9" type="password" placeholder="Your SIP password" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone-number" className="text-sm">Phone Number</Label>
                        <Input id="phone-number" className="h-9" placeholder="+1 (555) 123-4567" />
                        <p className="text-xs text-text-muted">The phone number associated with this SIP trunk</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePhoneNumber}>
                  {createMethod === 'buy' ? 'Purchase Number' : createMethod === 'import' ? 'Import Number' : 'Connect SIP Trunk'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* SIP Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit SIP Trunk</DialogTitle>
                <DialogDescription>
                  Update your SIP trunk configuration
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-sip-domain">SIP Domain</Label>
                    <Input 
                      id="edit-sip-domain" 
                      placeholder="sip.yourprovider.com"
                      defaultValue={editingPhone?.provider === 'SIP Trunk' ? 'sip.yourprovider.com' : ''} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-sip-port">Port</Label>
                    <Input 
                      id="edit-sip-port" 
                      placeholder="5060"
                      defaultValue="5060" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-sip-username">Username</Label>
                    <Input 
                      id="edit-sip-username" 
                      placeholder="Your SIP username"
                      defaultValue="sipuser123" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-sip-password">Password</Label>
                    <Input 
                      id="edit-sip-password" 
                      type="password" 
                      placeholder="Your SIP password"
                      defaultValue="••••••••" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone-number">Phone Number</Label>
                  <Input 
                    id="edit-phone-number" 
                    placeholder="+1 (555) 123-4567"
                    defaultValue={editingPhone?.number || ''} 
                  />
                  <p className="text-xs text-text-muted">The phone number associated with this SIP trunk</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
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
                             <TooltipContent className="bg-surface border-border text-text-primary">
                               <p className="text-xs">Copy number</p>
                             </TooltipContent>
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
                        {phone.type === 'Connected' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditPhoneNumber(phone)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-surface border-border text-text-primary">
                              <p className="text-xs">Edit SIP settings</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-surface border-border text-text-primary">
                            <p className="text-xs">Remove number</p>
                          </TooltipContent>
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

      </div>
    </TooltipProvider>
  );
}
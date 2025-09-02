import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Volume2, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Download,
  Play,
  Headphones,
  Globe,
  Save
} from "lucide-react";

export function VoiceLexicon() {
  const [selectedAgent, setSelectedAgent] = useState("agt_1");
  const [selectedLocale, setSelectedLocale] = useState("en-US");

  const lexiconEntries = [
    {
      id: 1,
      original: "Rohit",
      pronunciation: "roʊˈhɪt",
      format: "ipa",
      locale: "en-US",
      agentId: "agt_1",
      status: "active"
    },
    {
      id: 2,
      original: "Shri",
      pronunciation: "ʃriː",
      format: "ipa", 
      locale: "en-US",
      agentId: "agt_1",
      status: "active"
    },
    {
      id: 3,
      original: "Mumbai",
      pronunciation: "mʊmˈbaɪ",
      format: "ipa",
      locale: "en-US", 
      agentId: "agt_1",
      status: "active"
    },
    {
      id: 4,
      original: "Lakhs",
      pronunciation: "L AE K S",
      format: "arpabet",
      locale: "en-US",
      agentId: "agt_1", 
      status: "active"
    }
  ];

  const sttBoostPhrases = [
    {
      id: 1,
      text: "budget range",
      weight: 1.5,
      locale: "en-US",
      agentId: "agt_1"
    },
    {
      id: 2, 
      text: "decision maker",
      weight: 1.3,
      locale: "en-US",
      agentId: "agt_1"
    },
    {
      id: 3,
      text: "timeline for implementation",
      weight: 1.4,
      locale: "en-US", 
      agentId: "agt_1"
    },
    {
      id: 4,
      text: "not interested",
      weight: 1.2,
      locale: "en-US",
      agentId: "agt_1"
    }
  ];

  const agents = [
    { id: "agt_1", name: "Aarav - Lead Qualifier" },
    { id: "agt_2", name: "Sarah - Collections" },
    { id: "agt_3", name: "Maya - Survey Bot" }
  ];

  const locales = [
    { code: "en-US", name: "English (US)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "en-IN", name: "English (India)" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Voice & Pronunciation</h1>
          <p className="text-muted-foreground">Manage custom pronunciations and STT phrase boosting</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocale} onValueChange={setSelectedLocale}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locales.map((locale) => (
                <SelectItem key={locale.code} value={locale.code}>
                  {locale.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="lexicon" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lexicon" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>TTS Lexicon</span>
          </TabsTrigger>
          <TabsTrigger value="stt-boost" className="flex items-center space-x-2">
            <Headphones className="w-4 h-4" />
            <span>STT Phrase Boost</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lexicon" className="space-y-6">
          {/* Add New Entry */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-primary" />
                <span>Add Pronunciation Entry</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="original">Original Word</Label>
                  <Input id="original" placeholder="e.g., Rohit" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pronunciation">Pronunciation</Label>
                  <Input id="pronunciation" placeholder="e.g., roʊˈhɪt" />
                </div>
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select defaultValue="ipa">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ipa">IPA</SelectItem>
                      <SelectItem value="arpabet">ARPABET</SelectItem>
                      <SelectItem value="respell">Respelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end space-x-2">
                  <Button className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Add Entry
                  </Button>
                  <Button variant="outline" size="icon">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lexicon Entries */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <span>Pronunciation Entries</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Original</TableHead>
                    <TableHead>Pronunciation</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Locale</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lexiconEntries
                    .filter(entry => entry.agentId === selectedAgent && entry.locale === selectedLocale)
                    .map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.original}</TableCell>
                      <TableCell>
                        <code className="bg-accent px-2 py-1 rounded text-sm">
                          {entry.pronunciation}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {entry.format.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.locale}</TableCell>
                      <TableCell>
                        <Badge variant={entry.status === 'active' ? 'default' : 'secondary'}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stt-boost" className="space-y-6">
          {/* Add Boost Phrase */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-primary" />
                <span>Add STT Boost Phrase</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="boost-phrase">Phrase</Label>
                  <Input id="boost-phrase" placeholder="e.g., budget range" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Boost Weight</Label>
                  <Select defaultValue="1.5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.1">1.1x (Light boost)</SelectItem>
                      <SelectItem value="1.3">1.3x (Medium boost)</SelectItem>
                      <SelectItem value="1.5">1.5x (Strong boost)</SelectItem>
                      <SelectItem value="2.0">2.0x (Maximum boost)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Add Phrase
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boost Phrases */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-primary" />
                <span>STT Boost Phrases</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phrase</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Locale</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sttBoostPhrases
                    .filter(phrase => phrase.agentId === selectedAgent && phrase.locale === selectedLocale)
                    .map((phrase) => (
                    <TableRow key={phrase.id}>
                      <TableCell className="font-medium">{phrase.text}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {phrase.weight}x
                        </Badge>
                      </TableCell>
                      <TableCell>{phrase.locale}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Bulk Import */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>Bulk Import Phrases</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-phrases">Phrases (one per line)</Label>
                <Textarea 
                  id="bulk-phrases"
                  className="min-h-[120px]"
                  placeholder={`budget range
decision maker
timeline for implementation
not interested
qualified lead`}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="space-y-2">
                  <Label>Default Weight</Label>
                  <Select defaultValue="1.3">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.1">1.1x</SelectItem>
                      <SelectItem value="1.3">1.3x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2.0">2.0x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Import Phrases
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
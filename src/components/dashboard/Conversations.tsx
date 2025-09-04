import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Search, 
  Play, 
  Pause, 
  Download, 
  Phone, 
  Clock, 
  User, 
  ChevronDown,
  PhoneCall,
  Calendar,
  Timer,
  TrendingUp,
  MapPin,
  Mail,
  BarChart3,
  FileText,
  Shield,
  Headphones,
  Star,
  Activity,
  Target,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CallSession {
  id: string;
  phoneNumber: string;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'missed' | 'transferred';
  campaign: string;
  outcome: string;
  transcript: Array<{
    timestamp: string;
    speaker: 'bot' | 'customer';
    message: string;
  }>;
  details: {
    callDuration: string;
    hangupBy: 'customer' | 'bot' | 'system';
    transferredTo?: string;
    callQuality: number;
    recordingUrl?: string;
  };
  insights: {
    disposition: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    intent: string;
    resolution: boolean;
    satisfaction: number;
  };
  customer: {
    name?: string;
    email?: string;
    location?: string;
    previousCalls: number;
    totalDebt?: string;
    creditScore?: number;
  };
}

// Mock data
const mockSessions: CallSession[] = [
  {
    id: "sess_9k3m7p2x8q1z",
    phoneNumber: "+1 (555) 123-4567",
    date: "Sep 4, 2025",
    time: "8:15:37 AM 49T",
    duration: "0:05",
    status: 'completed',
    campaign: "Debt Collection Campaign",
    outcome: "Payment Arranged",
    transcript: [
      {
        timestamp: "8:15:46 AM",
        speaker: 'bot',
        message: "Hello, NA... This is Nicole with consumer services. How are you doing today?"
      },
      {
        timestamp: "8:17:15 AM",
        speaker: 'customer',
        message: "Doing fine."
      },
      {
        timestamp: "8:15:59 AM",
        speaker: 'bot',
        message: "I'm glad to hear that. I'm calling because our records show you've been making payments on your credit cards on time, but you're still carrying over 7 thousand dollars in balances, is that right?"
      },
      {
        timestamp: "8:17:15 AM",
        speaker: 'customer',
        message: "Yeah, it's correct."
      }
    ],
    details: {
      callDuration: "1:37",
      hangupBy: 'customer',
      callQuality: 4.5,
      recordingUrl: "/mock-recording.mp3"
    },
    insights: {
      disposition: "Payment Arranged",
      sentiment: 'positive',
      intent: "Debt Resolution",
      resolution: true,
      satisfaction: 8.5
    },
    customer: {
      name: "NA",
      email: "customer@example.com",
      location: "California, USA",
      previousCalls: 3,
      totalDebt: "26000",
      creditScore: 680
    }
  },
  {
    id: "sess_4h8n2w5f9j6r",
    phoneNumber: "+1 (555) 987-6543",
    date: "Sep 4, 2025",
    time: "8:19:46 AM 45T",
    duration: "1:41",
    status: 'transferred',
    campaign: "Lead Generation",
    outcome: "Transfer to Sales",
    transcript: [
      {
        timestamp: "8:19:46 AM",
        speaker: 'bot',
        message: "Good morning! This is Alex from TechSolutions. I hope you're having a great day!"
      },
      {
        timestamp: "8:20:15 AM",
        speaker: 'customer',
        message: "Hi, yes I'm interested in learning more about your services."
      }
    ],
    details: {
      callDuration: "1:41",
      hangupBy: 'bot',
      transferredTo: "Sales Team",
      callQuality: 4.8
    },
    insights: {
      disposition: "Qualified Lead",
      sentiment: 'positive',
      intent: "Product Interest",
      resolution: true,
      satisfaction: 9.2
    },
    customer: {
      name: "John Smith",
      email: "john.smith@company.com",
      location: "New York, USA",
      previousCalls: 0
    }
  }
];

export function Conversations() {
  const [selectedSession, setSelectedSession] = useState<CallSession | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [callDetailsOpen, setCallDetailsOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [customerInfoOpen, setCustomerInfoOpen] = useState(false);
  const [performanceOpen, setPerformanceOpen] = useState(false);
  const [recordingOpen, setRecordingOpen] = useState(false);

  const filteredSessions = mockSessions.filter(session =>
    session.phoneNumber.includes(searchQuery) ||
    session.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.customer.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/20 text-success border-success/30';
      case 'missed': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'transferred': return 'bg-accent-blue/20 text-accent-blue border-accent-blue/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  return (
    <div className="h-screen flex bg-surface">
      {/* Left Panel - Sessions List */}
      <div className="w-80 border-r border-border/50 flex flex-col">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Conversations</h2>
            <Badge variant="secondary" className="bg-accent-blue/10 text-accent-blue">
              {filteredSessions.length} Sessions
            </Badge>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by phone number or call ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredSessions.map((session) => (
              <Card
                key={session.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md border",
                  selectedSession?.id === session.id 
                    ? "border-accent-blue bg-accent-blue/5" 
                    : "border-border/50 hover:border-accent-blue/50"
                )}
                onClick={() => setSelectedSession(session)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-accent-blue" />
                      <span className="font-medium text-sm text-text-primary">
                        {session.phoneNumber}
                      </span>
                    </div>
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-mono text-text-muted bg-surface-2 px-2 py-1 rounded">
                      Session Id: {session.id}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-xs text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{session.date} {session.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Timer className="w-3 h-3" />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-text-secondary">
                    Campaign: {session.campaign}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Middle Panel - Call Details & Transcript */}
      {selectedSession ? (
        <div className="flex-1 flex flex-col">
          {/* Call Header */}
          <div className="p-6 border-b border-border/50 bg-gradient-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Session {selectedSession.id}
                  </h3>
                  <Badge variant="outline" className="text-xs font-mono">
                    {selectedSession.phoneNumber}
                  </Badge>
                </div>
                <p className="text-sm text-text-muted">
                  {selectedSession.date} at {selectedSession.time}
                </p>
              </div>
              <Badge className={getStatusColor(selectedSession.status)}>
                {selectedSession.status}
              </Badge>
            </div>

            {/* Audio Player */}
            <div className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border/50 shadow-sm">
              <Button
                size="sm"
                variant={isPlaying ? "secondary" : "default"}
                onClick={() => setIsPlaying(!isPlaying)}
                className="shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-primary h-full rounded-full w-1/3 transition-all duration-300"></div>
              </div>
              <span className="text-sm text-text-muted font-mono">0:00 / 1:36</span>
              <Button size="sm" variant="ghost" className="hover:bg-accent-blue/10">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Transcript */}
          <div className="flex-1 bg-gradient-to-b from-surface to-surface-2/30">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <h4 className="font-semibold text-text-primary flex items-center">
                    <PhoneCall className="w-4 h-4 mr-2 text-accent-blue" />
                    Call Transcript
                  </h4>
                  <span className="text-xs text-text-muted bg-surface-2 px-2 py-1 rounded-full">
                    {selectedSession.transcript.length} messages
                  </span>
                </div>
                
                <div className="space-y-4">
                  {selectedSession.transcript.map((entry, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-3 transition-all duration-200 hover:bg-surface-2/50 p-2 rounded-lg",
                        entry.speaker === 'bot' ? "justify-start" : "justify-end"
                      )}
                    >
                      {entry.speaker === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <PhoneCall className="w-4 h-4 text-accent-blue" />
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[70%] group relative",
                          entry.speaker === 'customer' && "order-first"
                        )}
                      >
                        <div
                          className={cn(
                            "p-4 rounded-2xl shadow-sm border transition-all duration-200",
                            entry.speaker === 'bot'
                              ? "bg-surface-2 text-text-primary border-border/50 rounded-tl-md"
                              : "bg-gradient-primary text-white border-accent-blue/20 rounded-tr-md"
                          )}
                        >
                          <p className="text-sm leading-relaxed">{entry.message}</p>
                        </div>
                        
                        <div className={cn(
                          "flex items-center mt-2 text-xs opacity-70 group-hover:opacity-100 transition-opacity",
                          entry.speaker === 'bot' ? "text-text-muted" : "text-text-muted justify-end"
                        )}>
                          <span className="mr-2 font-medium">
                            {entry.speaker === 'bot' ? 'AI Agent' : 'Customer'}
                          </span>
                          <span className="font-mono">{entry.timestamp}</span>
                        </div>
                      </div>
                      
                      {entry.speaker === 'customer' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <PhoneCall className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Select a Conversation</h3>
            <p className="text-text-muted">Choose a session from the left to view details</p>
          </div>
        </div>
      )}

      {/* Right Panel - Enhanced Call Details & Insights */}
      {selectedSession && (
        <div className="w-80 border-l border-border/50 bg-gradient-to-b from-surface to-surface-2/30 overflow-y-auto">
          <div className="p-4 space-y-3">
            
            {/* Performance Metrics */}
            <Collapsible open={performanceOpen} onOpenChange={setPerformanceOpen} defaultOpen={true}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 hover:bg-surface-2/80 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-accent-blue" />
                    <span className="font-semibold text-text-primary">Performance</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform text-text-muted", performanceOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-surface-2/50 rounded-lg p-4 border border-border/30 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface rounded-lg p-3 border border-border/20">
                      <div className="flex items-center space-x-2 mb-1">
                        <Star className="w-3 h-3 text-warning" />
                        <span className="text-xs text-text-muted">Satisfaction</span>
                      </div>
                      <p className="text-lg font-bold text-text-primary">{selectedSession.insights.satisfaction}/10</p>
                    </div>
                    <div className="bg-surface rounded-lg p-3 border border-border/20">
                      <div className="flex items-center space-x-2 mb-1">
                        <Shield className="w-3 h-3 text-success" />
                        <span className="text-xs text-text-muted">Quality</span>
                      </div>
                      <p className="text-lg font-bold text-text-primary">{selectedSession.details.callQuality}/5</p>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center justify-between p-3 rounded-lg border",
                    selectedSession.insights.resolution 
                      ? "bg-success/10 border-success/30 text-success" 
                      : "bg-destructive/10 border-destructive/30 text-destructive"
                  )}>
                    <span className="text-sm font-medium">Resolution Status</span>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span className="font-semibold">
                        {selectedSession.insights.resolution ? "Resolved" : "Unresolved"}
                      </span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Call Details */}
            <Collapsible open={callDetailsOpen} onOpenChange={setCallDetailsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 hover:bg-surface-2/80 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-accent-blue" />
                    <span className="font-semibold text-text-primary">Call Details</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform text-text-muted", callDetailsOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-surface-2/50 rounded-lg p-4 border border-border/30 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Timer className="w-3 h-3 text-text-muted" />
                        <span className="text-xs text-text-muted">Duration</span>
                      </div>
                      <p className="font-semibold text-text-primary">{selectedSession.details.callDuration}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Activity className="w-3 h-3 text-text-muted" />
                        <span className="text-xs text-text-muted">Hangup By</span>
                      </div>
                      <p className="font-semibold text-text-primary capitalize">{selectedSession.details.hangupBy}</p>
                    </div>
                  </div>
                  {selectedSession.details.transferredTo && (
                    <div className="p-3 bg-accent-blue/10 rounded-lg border border-accent-blue/20">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-accent-blue" />
                        <div>
                          <span className="text-xs text-text-muted">Transferred To</span>
                          <p className="font-semibold text-accent-blue">{selectedSession.details.transferredTo}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Recording Details */}
            <Collapsible open={recordingOpen} onOpenChange={setRecordingOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 hover:bg-surface-2/80 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-accent-blue" />
                    <span className="font-semibold text-text-primary">Recording</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform text-text-muted", recordingOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-surface-2/50 rounded-lg p-4 border border-border/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Available</span>
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      Yes
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Format</span>
                    <span className="text-sm font-medium text-text-primary">MP3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Size</span>
                    <span className="text-sm font-medium text-text-primary">2.4 MB</span>
                  </div>
                  <Button size="sm" className="w-full mt-2" variant="outline">
                    <Download className="w-3 h-3 mr-2" />
                    Download Recording
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Call Insights */}
            <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 hover:bg-surface-2/80 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-accent-blue" />
                    <span className="font-semibold text-text-primary">Call Insights</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform text-text-muted", insightsOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-surface-2/50 rounded-lg p-4 border border-border/30 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Disposition</span>
                      <Badge variant="secondary" className="bg-surface text-text-primary">
                        {selectedSession.insights.disposition}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Sentiment</span>
                      <Badge className={cn(
                        "capitalize",
                        selectedSession.insights.sentiment === 'positive' ? "bg-success/20 text-success border-success/30" :
                        selectedSession.insights.sentiment === 'negative' ? "bg-destructive/20 text-destructive border-destructive/30" :
                        "bg-warning/20 text-warning border-warning/30"
                      )}>
                        {selectedSession.insights.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Intent</span>
                      <span className="text-sm font-semibold text-text-primary">{selectedSession.insights.intent}</span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Customer Information */}
            <Collapsible open={customerInfoOpen} onOpenChange={setCustomerInfoOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 hover:bg-surface-2/80 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-accent-blue" />
                    <span className="font-semibold text-text-primary">Customer Info</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform text-text-muted", customerInfoOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-surface-2/50 rounded-lg p-4 border border-border/30 space-y-4">
                  {selectedSession.customer.name && (
                    <div className="flex items-center space-x-3 p-2 bg-surface rounded-lg border border-border/20">
                      <User className="w-4 h-4 text-accent-blue flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs text-text-muted block">Name</span>
                        <p className="font-semibold text-text-primary truncate">{selectedSession.customer.name}</p>
                      </div>
                    </div>
                  )}
                  {selectedSession.customer.email && (
                    <div className="flex items-center space-x-3 p-2 bg-surface rounded-lg border border-border/20">
                      <Mail className="w-4 h-4 text-accent-blue flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs text-text-muted block">Email</span>
                        <p className="font-semibold text-text-primary truncate">{selectedSession.customer.email}</p>
                      </div>
                    </div>
                  )}
                  {selectedSession.customer.location && (
                    <div className="flex items-center space-x-3 p-2 bg-surface rounded-lg border border-border/20">
                      <MapPin className="w-4 h-4 text-accent-blue flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs text-text-muted block">Location</span>
                        <p className="font-semibold text-text-primary truncate">{selectedSession.customer.location}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/30">
                    <div className="text-center p-2 bg-surface rounded-lg border border-border/20">
                      <p className="text-lg font-bold text-text-primary">{selectedSession.customer.previousCalls}</p>
                      <span className="text-xs text-text-muted">Previous Calls</span>
                    </div>
                    {selectedSession.customer.creditScore && (
                      <div className="text-center p-2 bg-surface rounded-lg border border-border/20">
                        <p className="text-lg font-bold text-text-primary">{selectedSession.customer.creditScore}</p>
                        <span className="text-xs text-text-muted">Credit Score</span>
                      </div>
                    )}
                  </div>
                  
                
                </div>
              </CollapsibleContent>
            </Collapsible>

          </div>
        </div>
      )}
    </div>
  );
}
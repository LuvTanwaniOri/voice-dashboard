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
  Mail
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
    id: "70045-1",
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
    id: "70045-2",
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
          <div className="p-6 border-b border-border/50 bg-surface-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Call {selectedSession.id}
                </h3>
                <p className="text-sm text-text-muted">
                  {selectedSession.date} at {selectedSession.time}
                </p>
              </div>
              <Badge className={getStatusColor(selectedSession.status)}>
                {selectedSession.status}
              </Badge>
            </div>

            {/* Audio Player */}
            <div className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border/50">
              <Button
                size="sm"
                variant={isPlaying ? "secondary" : "default"}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-accent-blue h-2 rounded-full w-1/3"></div>
              </div>
              <span className="text-sm text-text-muted">0:00 / 1:36</span>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Transcript */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary mb-4">Call Transcript</h4>
              {selectedSession.transcript.map((entry, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    entry.speaker === 'bot' ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] p-3 rounded-lg",
                      entry.speaker === 'bot'
                        ? "bg-surface-2 text-text-primary"
                        : "bg-accent-blue text-white"
                    )}
                  >
                    <p className="text-sm">{entry.message}</p>
                    <div className={cn(
                      "flex items-center mt-1 text-xs",
                      entry.speaker === 'bot' ? "text-text-muted" : "text-white/70"
                    )}>
                      <User className="w-3 h-3 mr-1" />
                      <span className="mr-2">{entry.speaker === 'bot' ? 'Bot' : 'Customer'}</span>
                      <span>{entry.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
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

      {/* Right Panel - Call Details & Insights */}
      {selectedSession && (
        <div className="w-80 border-l border-border/50 p-4 space-y-4 overflow-y-auto">
          {/* Call Details */}
          <Collapsible open={callDetailsOpen} onOpenChange={setCallDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-2">
                <span className="font-medium text-text-primary">Call Details</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", callDetailsOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 p-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-text-muted">Duration</span>
                  <p className="font-medium text-text-primary">{selectedSession.details.callDuration}</p>
                </div>
                <div>
                  <span className="text-text-muted">Hangup By</span>
                  <p className="font-medium text-text-primary capitalize">{selectedSession.details.hangupBy}</p>
                </div>
                <div>
                  <span className="text-text-muted">Quality</span>
                  <p className="font-medium text-text-primary">{selectedSession.details.callQuality}/5</p>
                </div>
                {selectedSession.details.transferredTo && (
                  <div>
                    <span className="text-text-muted">Transferred To</span>
                    <p className="font-medium text-text-primary">{selectedSession.details.transferredTo}</p>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Call Insights */}
          <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-2">
                <span className="font-medium text-text-primary">Call Insights</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", insightsOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 p-2">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-text-muted">Disposition</span>
                  <p className="font-medium text-text-primary">{selectedSession.insights.disposition}</p>
                </div>
                <div>
                  <span className="text-text-muted">Sentiment</span>
                  <p className={cn("font-medium capitalize", getSentimentColor(selectedSession.insights.sentiment))}>
                    {selectedSession.insights.sentiment}
                  </p>
                </div>
                <div>
                  <span className="text-text-muted">Intent</span>
                  <p className="font-medium text-text-primary">{selectedSession.insights.intent}</p>
                </div>
                <div>
                  <span className="text-text-muted">Resolution</span>
                  <p className={cn("font-medium", selectedSession.insights.resolution ? "text-success" : "text-destructive")}>
                    {selectedSession.insights.resolution ? "Resolved" : "Unresolved"}
                  </p>
                </div>
                <div>
                  <span className="text-text-muted">Satisfaction</span>
                  <p className="font-medium text-text-primary">{selectedSession.insights.satisfaction}/10</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Customer Information */}
          <Collapsible open={customerInfoOpen} onOpenChange={setCustomerInfoOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-2">
                <span className="font-medium text-text-primary">Customer Information</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", customerInfoOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 p-2">
              <div className="space-y-3 text-sm">
                {selectedSession.customer.name && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-text-muted" />
                    <div>
                      <span className="text-text-muted">Name</span>
                      <p className="font-medium text-text-primary">{selectedSession.customer.name}</p>
                    </div>
                  </div>
                )}
                {selectedSession.customer.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <div>
                      <span className="text-text-muted">Email</span>
                      <p className="font-medium text-text-primary">{selectedSession.customer.email}</p>
                    </div>
                  </div>
                )}
                {selectedSession.customer.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <div>
                      <span className="text-text-muted">Location</span>
                      <p className="font-medium text-text-primary">{selectedSession.customer.location}</p>
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-text-muted">Previous Calls</span>
                  <p className="font-medium text-text-primary">{selectedSession.customer.previousCalls}</p>
                </div>
                {selectedSession.customer.totalDebt && (
                  <div>
                    <span className="text-text-muted">Total Debt</span>
                    <p className="font-medium text-text-primary">${selectedSession.customer.totalDebt}</p>
                  </div>
                )}
                {selectedSession.customer.creditScore && (
                  <div>
                    <span className="text-text-muted">Credit Score</span>
                    <p className="font-medium text-text-primary">{selectedSession.customer.creditScore}</p>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
}
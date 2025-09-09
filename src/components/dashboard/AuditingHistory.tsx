import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Filter, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Calendar as CalendarIcon,
  Search,
  CheckCircle2,
  Clock,
  Star,
  ArrowUpDown,
  Play,
  Pause,
  Download,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Volume2,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ClientCallAudit } from "./ClientCallAuditDialog";

// Mock data for demonstration
const mockAudits: (ClientCallAudit & { 
  id: string; 
  timestamp: string; 
  status: 'open' | 'resolved'; 
  createdBy: string;
  audioUrl?: string;
  transcript?: Array<{
    speaker: 'agent' | 'customer';
    text: string;
    timestamp: string;
  }>;
})[] = [
  {
    id: "audit-1",
    sessionId: "session-123",
    timestamp: "2024-01-15T10:30:00Z",
    speechToText: ["wrong-transcription", "background-noise"],
    aiBusinessLogic: ["script-deviation"],
    textToSpeech: [],
    callExperience: ["high-latency"],
    systemLevel: [],
    overallFeedback: "The bot had difficulty understanding due to background noise and deviated from the script multiple times.",
    rating: 2,
    severity: "high",
    status: "open",
    createdBy: "John Doe",
    audioUrl: "https://example.com/audio/session-123.mp3",
    transcript: [
      { speaker: 'agent', text: 'Hello, thank you for calling. How can I help you today?', timestamp: '00:00:02' },
      { speaker: 'customer', text: 'Hi, I need help with my account balance.', timestamp: '00:00:08' },
      { speaker: 'agent', text: 'I can help you with that. Can you please provide your account number?', timestamp: '00:00:12' },
      { speaker: 'customer', text: 'Sure, it\'s 12345678.', timestamp: '00:00:18' },
      { speaker: 'agent', text: 'Thank you. Let me look that up for you...', timestamp: '00:00:22' }
    ]
  },
  {
    id: "audit-2", 
    sessionId: "session-456",
    timestamp: "2024-01-14T15:45:00Z",
    speechToText: [],
    aiBusinessLogic: ["tone-mismatch"],
    textToSpeech: ["speech-rate-issues"],
    callExperience: [],
    systemLevel: [],
    overallFeedback: "Bot spoke too quickly and tone was inappropriate for the customer's concern.",
    rating: 3,
    severity: "medium",
    status: "resolved",
    createdBy: "Jane Smith",
    audioUrl: "https://example.com/audio/session-456.mp3",
    transcript: [
      { speaker: 'agent', text: 'Good afternoon, how may I assist you?', timestamp: '00:00:01' },
      { speaker: 'customer', text: 'I\'m having trouble with my recent order.', timestamp: '00:00:05' },
      { speaker: 'agent', text: 'I understand your frustration. Let me help resolve this quickly.', timestamp: '00:00:09' }
    ]
  },
  {
    id: "audit-3",
    sessionId: "session-789",
    timestamp: "2024-01-13T09:20:00Z",
    speechToText: ["partial-transcription"],
    aiBusinessLogic: [],
    textToSpeech: [],
    callExperience: ["awkward-pauses"],
    systemLevel: ["session-drop"],
    overallFeedback: "Call was dropped midway and had several awkward pauses.",
    rating: 1,
    severity: "high",
    status: "open",
    createdBy: "Mike Johnson",
    audioUrl: "https://example.com/audio/session-789.mp3",
    transcript: [
      { speaker: 'agent', text: 'Hello, welcome to our support line.', timestamp: '00:00:02' },
      { speaker: 'customer', text: 'Hi, I need to speak with someone about billing.', timestamp: '00:00:06' }
    ]
  },
  {
    id: "audit-4",
    sessionId: "session-101",
    timestamp: "2024-01-12T14:20:00Z",
    speechToText: ["unclear-audio"],
    aiBusinessLogic: ["context-loss"],
    textToSpeech: [],
    callExperience: ["interruptions"],
    systemLevel: [],
    overallFeedback: "Multiple interruptions and context was lost during conversation.",
    rating: 2,
    severity: "medium",
    status: "open",
    createdBy: "Sarah Wilson"
  },
  {
    id: "audit-5",
    sessionId: "session-202",
    timestamp: "2024-01-11T11:15:00Z",
    speechToText: [],
    aiBusinessLogic: [],
    textToSpeech: ["robotic-voice"],
    callExperience: [],
    systemLevel: [],
    overallFeedback: "Voice sounded very robotic and unnatural.",
    rating: 3,
    severity: "low",
    status: "resolved",
    createdBy: "David Chen"
  },
  {
    id: "audit-6",
    sessionId: "session-303",
    timestamp: "2024-01-10T16:30:00Z",
    speechToText: ["accent-issues"],
    aiBusinessLogic: ["inappropriate-response"],
    textToSpeech: [],
    callExperience: [],
    systemLevel: ["timeout"],
    overallFeedback: "Bot struggled with customer accent and gave inappropriate responses.",
    rating: 1,
    severity: "high",
    status: "open",
    createdBy: "Lisa Anderson"
  },
  {
    id: "audit-7",
    sessionId: "session-404",
    timestamp: "2024-01-09T08:45:00Z",
    speechToText: [],
    aiBusinessLogic: [],
    textToSpeech: [],
    callExperience: ["excellent-flow"],
    systemLevel: [],
    overallFeedback: "Great conversation flow and customer was satisfied.",
    rating: 5,
    severity: "low",
    status: "resolved",
    createdBy: "Tom Rodriguez"
  },
  {
    id: "audit-8",
    sessionId: "session-505",
    timestamp: "2024-01-08T13:10:00Z",
    speechToText: ["missing-words"],
    aiBusinessLogic: ["script-adherence"],
    textToSpeech: ["pronunciation"],
    callExperience: [],
    systemLevel: [],
    overallFeedback: "Some words were missed in transcription and pronunciation issues noted.",
    rating: 3,
    severity: "medium",
    status: "resolved",
    createdBy: "Emily Foster"
  },
  {
    id: "audit-9",
    sessionId: "session-606",
    timestamp: "2024-01-07T12:00:00Z",
    speechToText: [],
    aiBusinessLogic: ["knowledge-gap"],
    textToSpeech: [],
    callExperience: ["long-wait"],
    systemLevel: [],
    overallFeedback: "Agent lacked knowledge on specific product features, causing delays.",
    rating: 2,
    severity: "medium",
    status: "open",
    createdBy: "Alex Thompson"
  },
  {
    id: "audit-10",
    sessionId: "session-707",
    timestamp: "2024-01-06T10:30:00Z",
    speechToText: [],
    aiBusinessLogic: [],
    textToSpeech: [],
    callExperience: [],
    systemLevel: ["api-error"],
    overallFeedback: "System API error prevented proper call completion.",
    rating: 1,
    severity: "high",
    status: "open",
    createdBy: "Rachel Kim"
  },
  {
    id: "audit-11",
    sessionId: "session-808",
    timestamp: "2024-01-05T15:20:00Z",
    speechToText: [],
    aiBusinessLogic: [],
    textToSpeech: [],
    callExperience: ["smooth-handoff"],
    systemLevel: [],
    overallFeedback: "Smooth handoff to human agent when needed.",
    rating: 4,
    severity: "low",
    status: "resolved",
    createdBy: "Mark Davis"
  },
  {
    id: "audit-12",
    sessionId: "session-909",
    timestamp: "2024-01-04T09:15:00Z",
    speechToText: ["echo-issues"],
    aiBusinessLogic: [],
    textToSpeech: [],
    callExperience: ["audio-quality"],
    systemLevel: [],
    overallFeedback: "Echo and audio quality issues affected call quality.",
    rating: 2,
    severity: "medium",
    status: "resolved",
    createdBy: "Jennifer Lee"
  }
];

interface Filters {
  callId: string;
  startDate: Date | null;
  endDate: Date | null;
  severity: string;
  status: string;
}

type SortField = 'timestamp' | 'severity' | 'status' | 'rating' | 'createdBy';
type SortDirection = 'asc' | 'desc';

export function AuditingHistory() {
  const [filters, setFilters] = useState<Filters>({
    callId: '',
    startDate: null,
    endDate: null,
    severity: 'all-severities',
    status: 'all-statuses'
  });
  
  const [sortField, setSortField] = useState<SortField>('status');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedAudits = useMemo(() => {
    let filtered = mockAudits.filter(audit => {
      if (filters.callId && !audit.sessionId.toLowerCase().includes(filters.callId.toLowerCase())) {
        return false;
      }
      if (filters.startDate && new Date(audit.timestamp) < filters.startDate) {
        return false;
      }
      if (filters.endDate && new Date(audit.timestamp) > filters.endDate) { 
        return false;
      }
      if (filters.severity && filters.severity !== 'all-severities' && audit.severity !== filters.severity) {
        return false;
      }
      if (filters.status && filters.status !== 'all-statuses' && audit.status !== filters.status) {
        return false;
      }
      return true;
    });

    // Sort by status first (open > resolved), then by severity (high > medium > low)
    filtered.sort((a, b) => {
      if (sortField === 'status') {
        const statusOrder = { open: 0, resolved: 1 };
        const statusCompare = statusOrder[a.status] - statusOrder[b.status];
        if (statusCompare !== 0) {
          return sortDirection === 'asc' ? statusCompare : -statusCompare;
        }
        // Secondary sort by severity
        const severityOrder = { high: 0, medium: 1, low: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      
      if (sortField === 'severity') {
        const severityOrder = { high: 0, medium: 1, low: 2 };
        const severityCompare = severityOrder[a.severity] - severityOrder[b.severity];
        return sortDirection === 'asc' ? severityCompare : -severityCompare;
      }
      
      if (sortField === 'timestamp') {
        const dateCompare = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        return sortDirection === 'asc' ? -dateCompare : dateCompare;
      }
      
      if (sortField === 'rating') {
        const ratingCompare = (b.rating || 0) - (a.rating || 0);
        return sortDirection === 'asc' ? -ratingCompare : ratingCompare;
      }
      
      if (sortField === 'createdBy') {
        return sortDirection === 'asc' 
          ? a.createdBy.localeCompare(b.createdBy)
          : b.createdBy.localeCompare(a.createdBy);
      }
      
      return 0;
    });

    return filtered;
  }, [filters, sortField, sortDirection]);

  // Pagination calculations
  const totalRecords = filteredAndSortedAudits.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedAudits = filteredAndSortedAudits.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters, sortField, sortDirection]);

  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === 'startDate' || key === 'endDate') return value !== null;
    if (key === 'severity') return value !== 'all-severities';
    if (key === 'status') return value !== 'all-statuses';
    return value !== '';
  });

  const removeFilter = (filterKey: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterKey === 'startDate' || filterKey === 'endDate' ? null : 
                   filterKey === 'severity' ? 'all-severities' :
                   filterKey === 'status' ? 'all-statuses' : ''
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      callId: '',
      startDate: null,
      endDate: null,
      severity: 'all-severities',
      status: 'all-statuses'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-surface-2 text-text-muted border-border/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-surface-2 text-text-muted border-border/20';
    }
  };

  const getIssuesCount = (audit: ClientCallAudit) => {
    return audit.speechToText.length + audit.aiBusinessLogic.length + 
           audit.textToSpeech.length + audit.callExperience.length + 
           audit.systemLevel.length;
  };

  const toggleAuditStatus = (auditId: string) => {
    // In real implementation, this would make an API call
    console.log(`Toggling status for audit ${auditId}`);
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-0 text-text-primary hover:text-accent-blue font-medium"
    >
      <span className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field ? (
          sortDirection === 'asc' ? 
            <ChevronUp className="w-4 h-4" /> : 
            <ChevronDown className="w-4 h-4" />
        ) : (
          <ArrowUpDown className="w-4 h-4 opacity-50" />
        )}
      </span>
    </Button>
  );

  if (selectedAudit) {
    const audit = mockAudits.find(a => a.id === selectedAudit);
    if (audit) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setSelectedAudit(null)}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to History</span>
            </Button>
            <Badge variant="secondary" className="text-xs">
              Audit Details
            </Badge>
          </div>
          
          {/* Enhanced Audit Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Call Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Call Information</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => toggleAuditStatus(audit.id)}
                        className={cn(
                          audit.status === 'open' 
                            ? "bg-success hover:bg-success/90" 
                            : "bg-warning hover:bg-warning/90"
                        )}
                      >
                        {audit.status === 'open' ? 'Mark Resolved' : 'Reopen'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/debug/call/${audit.sessionId}`, '_blank')}
                        className="flex items-center space-x-1"
                      >
                        <Activity className="w-4 h-4" />
                        <span>Debug Call</span>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-text-muted">Call ID</Label>
                      <p className="font-mono text-sm">{audit.sessionId}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted">Created</Label>
                      <p className="text-sm">{format(new Date(audit.timestamp), "MMM dd, HH:mm")}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted">Severity</Label>
                      <Badge className={cn("text-xs", getSeverityColor(audit.severity))}>
                        {audit.severity}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted">Rating</Label>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              audit.rating && i < audit.rating 
                                ? "text-warning fill-current" 
                                : "text-text-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compact Audio Player */}
              {audit.audioUrl && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Volume2 className="h-4 w-4" />
                      Call Recording
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-8 w-8 p-0 hover:bg-background"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1 bg-background rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full w-1/3 transition-all duration-300" />
                      </div>
                      <span className="text-xs text-muted-foreground min-w-fit">1:23 / 4:15</span>
                      <Select value={playbackSpeed.toString()} onValueChange={(value) => setPlaybackSpeed(parseFloat(value))}>
                        <SelectTrigger className="w-14 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5x</SelectItem>
                          <SelectItem value="1">1x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="2">2x</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-background">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* WhatsApp-Style Call Transcript */}
              {audit.transcript && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MessageSquare className="h-4 w-4" />
                      Call Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ScrollArea className="h-80">
                      <div className="space-y-3 p-2">
                        {audit.transcript.map((entry, index) => {
                          const isCustomer = entry.speaker === 'customer';
                          return (
                            <div key={index} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} mb-3`}>
                              <div className={`max-w-[75%] ${isCustomer ? 'order-2' : 'order-1'}`}>
                                <div className={`rounded-2xl px-4 py-2 ${
                                  isCustomer 
                                    ? 'bg-primary text-primary-foreground rounded-br-md' 
                                    : 'bg-muted text-foreground rounded-bl-md'
                                }`}>
                                  <p className="text-sm leading-relaxed">{entry.text}</p>
                                </div>
                                <div className={`flex items-center gap-2 mt-1 ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                                  <Badge 
                                    variant={isCustomer ? 'outline' : 'secondary'} 
                                    className="text-xs px-2 py-0"
                                  >
                                    {entry.speaker === 'agent' ? 'AI Agent' : 'Customer'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Issues and Feedback */}
            <div className="space-y-6">
              {/* Issues Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Issues Identified</CardTitle>
                  <p className="text-sm text-text-muted">{getIssuesCount(audit)} total issues</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {audit.speechToText.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-2">Speech-to-Text</p>
                      <div className="space-y-1">
                        {audit.speechToText.map(issue => (
                          <Badge key={issue} variant="secondary" className="text-xs mr-1 mb-1">
                            {issue.replace(/[_-]/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {audit.aiBusinessLogic.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-2">AI/Business Logic</p>
                      <div className="space-y-1">
                        {audit.aiBusinessLogic.map(issue => (
                          <Badge key={issue} variant="secondary" className="text-xs mr-1 mb-1">
                            {issue.replace(/[_-]/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {audit.textToSpeech.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-2">Text-to-Speech</p>
                      <div className="space-y-1">
                        {audit.textToSpeech.map(issue => (
                          <Badge key={issue} variant="secondary" className="text-xs mr-1 mb-1">
                            {issue.replace(/[_-]/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {audit.callExperience.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-2">Call Experience</p>
                      <div className="space-y-1">
                        {audit.callExperience.map(issue => (
                          <Badge key={issue} variant="secondary" className="text-xs mr-1 mb-1">
                            {issue.replace(/[_-]/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {audit.systemLevel.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-text-primary mb-2">System Level</p>
                      <div className="space-y-1">
                        {audit.systemLevel.map(issue => (
                          <Badge key={issue} variant="secondary" className="text-xs mr-1 mb-1">
                            {issue.replace(/[_-]/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Overall Feedback */}
              {audit.overallFeedback && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary leading-relaxed">{audit.overallFeedback}</p>
                  </CardContent>
                </Card>
              )}

              {/* Audit Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-text-muted">Created By</Label>
                    <p className="text-sm font-medium">{audit.createdBy}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-text-muted">Status</Label>
                    <Badge className={cn("text-xs mt-1", getStatusColor(audit.status))}>
                      {audit.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-xs text-text-muted">Created On</Label>
                    <p className="text-sm">{format(new Date(audit.timestamp), "PPP 'at' p")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span>Auditing History</span>
          </h1>
          <p className="text-text-muted mt-1">Review and manage client call audit feedback</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="callId" className="text-sm">Call ID</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  id="callId"
                  placeholder="Search call ID"
                  value={filters.callId}
                  onChange={(e) => setFilters(prev => ({ ...prev, callId: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate ? format(filters.startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.startDate || undefined}
                    onSelect={(date) => setFilters(prev => ({ ...prev, startDate: date || null }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.endDate ? format(filters.endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.endDate || undefined}
                    onSelect={(date) => setFilters(prev => ({ ...prev, endDate: date || null }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm">Severity</Label>
              <Select value={filters.severity} onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All severities" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border/50 shadow-lg z-50">
                  <SelectItem value="all-severities">All severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border/50 shadow-lg z-50">
                  <SelectItem value="all-statuses">All statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center space-x-2 pt-2 border-t border-border/50">
              <span className="text-sm text-text-muted">Active filters:</span>
              <div className="flex items-center space-x-2">
                {activeFilters.map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="flex items-center space-x-1 text-xs"
                  >
                    <span>
                      {key === 'callId' ? `Call: ${value}` :
                       key === 'startDate' ? `From: ${format(value as Date, "MMM dd")}` :
                       key === 'endDate' ? `To: ${format(value as Date, "MMM dd")}` :
                       `${key}: ${value}`}
                    </span>
                    <button
                      onClick={() => removeFilter(key)}
                      className="hover:bg-surface-2 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-6 px-2"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Audit Results ({totalRecords} total records)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Records per page selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label className="text-sm text-text-muted">Show:</Label>
                <Select value={recordsPerPage.toString()} onValueChange={(value) => setRecordsPerPage(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-border/50 shadow-lg z-50">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-sm text-text-muted">records per page</Label>
              </div>
              
              <div className="text-sm text-text-muted">
                Showing {startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} entries
              </div>
            </div>

            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-surface-2 border-border/50">
                    <TableHead className="w-[120px]">
                      <SortButton field="status">Status</SortButton>
                    </TableHead>
                    <TableHead>
                      <SortButton field="severity">Severity</SortButton>
                    </TableHead>
                    <TableHead>
                      <SortButton field="timestamp">Created On</SortButton>
                    </TableHead>
                    <TableHead>
                      <SortButton field="createdBy">Created By</SortButton>
                    </TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>
                      <SortButton field="rating">Rating</SortButton>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAudits.map((audit) => (
                    <TableRow
                      key={audit.id}
                      className="cursor-pointer hover:bg-surface-2/50 border-border/30 transition-colors"
                      onClick={() => setSelectedAudit(audit.id)}
                    >
                      <TableCell>
                        <Badge className={cn("text-xs", getStatusColor(audit.status))}>
                          {audit.status === 'open' ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          )}
                          {audit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", getSeverityColor(audit.severity))}>
                          {audit.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {format(new Date(audit.timestamp), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium">{audit.createdBy}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {getIssuesCount(audit)} issues
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                audit.rating && i < audit.rating 
                                  ? "text-warning fill-current" 
                                  : "text-text-muted/30"
                              )}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAuditStatus(audit.id);
                          }}
                          className="text-xs hover:bg-surface-2"
                        >
                          {audit.status === 'open' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Resolve
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Reopen
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10 h-9"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-text-muted px-2">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10 h-9"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="text-sm text-text-muted">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
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
  ArrowUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ClientCallAudit } from "./ClientCallAuditDialog";

// Mock data for demonstration
const mockAudits: (ClientCallAudit & { id: string; timestamp: string; status: 'open' | 'resolved'; createdBy: string })[] = [
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
    createdBy: "John Doe"
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
    createdBy: "Jane Smith"
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
    createdBy: "Mike Johnson"
  },
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
              <ChevronDown className="w-4 h-4 rotate-90" />
              <span>Back to History</span>
            </Button>
            <Badge variant="secondary" className="text-xs">
              Audit Details
            </Badge>
          </div>
          
          {/* Audit Detail View - simplified for now */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Call Audit Details</span>
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
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-text-muted">Call ID</Label>
                  <p className="font-mono text-sm">{audit.sessionId}</p>
                </div>
                <div>
                  <Label className="text-xs text-text-muted">Created</Label>
                  <p className="text-sm">{format(new Date(audit.timestamp), "MMM dd, yyyy")}</p>
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
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-text-primary mb-2 block">
                  Issues Identified ({getIssuesCount(audit)} total)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {audit.speechToText.length > 0 && (
                    <div>
                      <p className="text-xs text-text-muted mb-1">Speech-to-Text</p>
                      <div className="space-y-1">
                        {audit.speechToText.map(issue => (
                          <Badge key={issue} variant="secondary" className="text-xs">
                            {issue.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Add other issue categories similarly */}
                </div>
              </div>
              
              {audit.overallFeedback && (
                <div>
                  <Label className="text-sm font-medium text-text-primary mb-2 block">
                    Overall Feedback
                  </Label>
                  <Card className="bg-surface-2">
                    <CardContent className="pt-4">
                      <p className="text-sm text-text-secondary">{audit.overallFeedback}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
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
              Audit Results ({filteredAndSortedAudits.length} records)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-2">
                  <TableHead>
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
                  <TableHead>Issues Marked</TableHead>
                  <TableHead>
                    <SortButton field="rating">Call Rating</SortButton>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedAudits.map((audit) => (
                  <TableRow
                    key={audit.id}
                    className="hover:bg-surface-2 cursor-pointer transition-colors"
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
                    <TableCell className="text-sm">
                      {format(new Date(audit.timestamp), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-sm">{audit.createdBy}</TableCell>
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
                                : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAuditStatus(audit.id);
                        }}
                        className="text-xs"
                      >
                        {audit.status === 'open' ? 'Resolve' : 'Reopen'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
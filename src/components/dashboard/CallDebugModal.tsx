import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContextualHelp } from '@/components/ui/contextual-help';
import { 
  Clock, 
  PhoneOff, 
  Activity, 
  AlertTriangle,
  Mic,
  MessageSquare,
  Brain,
  Volume2,
  User,
  Bot,
  Download,
  Filter
} from 'lucide-react';

// Debug log types
type LogType = 'STT' | 'TTS' | 'LLM' | 'SYSTEM' | 'MESSAGE';
type LogLevel = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

interface DebugLog {
  id: string;
  timestamp: string;
  timeInCall: string; // Format: "00:01:23"
  type: LogType;
  level: LogLevel;
  message: string;
  metadata: Record<string, any>;
  duration?: number; // in milliseconds
  speaker?: 'bot' | 'customer';
}

interface CallSummary {
  callId: string;
  duration: string;
  disconnectedBy: 'customer' | 'bot' | 'system';
  totalEvents: number;
  errorCount: number;
  sttEvents: number;
  ttsEvents: number;
  llmEvents: number;
  messageCount: number;
}

interface CallDebugModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callId: string;
}

// Mock data for demonstration
const mockCallSummary: CallSummary = {
  callId: 'call_12345',
  duration: '04:32',
  disconnectedBy: 'customer',
  totalEvents: 47,
  errorCount: 2,
  sttEvents: 12,
  ttsEvents: 8,
  llmEvents: 15,
  messageCount: 10
};

const mockDebugLogs: DebugLog[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    timeInCall: '00:00:00',
    type: 'SYSTEM',
    level: 'INFO',
    message: 'Call initiated from +1-555-0123',
    metadata: { phoneNumber: '+1-555-0123', campaign: 'Lead Gen Q1' }
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:30:02Z',
    timeInCall: '00:00:02',
    type: 'MESSAGE',
    level: 'INFO',
    message: 'Hello! Thank you for calling ABC Corp. How can I help you today?',
    metadata: { speaker: 'bot', messageType: 'greeting' },
    speaker: 'bot'
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:30:05Z',
    timeInCall: '00:00:05',
    type: 'STT',
    level: 'INFO',
    message: 'Processing audio input',
    metadata: { provider: 'OpenAI Whisper', audioLength: 3.2 },
    duration: 850
  },
  {
    id: '4',
    timestamp: '2024-01-15T10:30:06Z',
    timeInCall: '00:00:06',
    type: 'MESSAGE',
    level: 'INFO',
    message: 'Hi, I\'m interested in your software solutions for small businesses.',
    metadata: { speaker: 'customer', confidence: 0.94 },
    speaker: 'customer'
  },
  {
    id: '5',
    timestamp: '2024-01-15T10:30:07Z',
    timeInCall: '00:00:07',
    type: 'LLM',
    level: 'INFO',
    message: 'Processing customer inquiry about software solutions',
    metadata: { 
      provider: 'OpenAI GPT-4',
      tokens: 45,
      context: 'business_inquiry'
    },
    duration: 1200
  },
  {
    id: '6',
    timestamp: '2024-01-15T10:30:09Z',
    timeInCall: '00:00:09',
    type: 'MESSAGE',
    level: 'INFO',
    message: 'That\'s great! We have several solutions designed specifically for small businesses. Could you tell me more about your current business size and needs?',
    metadata: { speaker: 'bot', messageType: 'qualification_question' },
    speaker: 'bot'
  },
  {
    id: '7',
    timestamp: '2024-01-15T10:30:10Z',
    timeInCall: '00:00:10',
    type: 'TTS',
    level: 'INFO',
    message: 'Converting text to speech',
    metadata: { 
      provider: 'ElevenLabs',
      voice: 'professional_female',
      textLength: 147
    },
    duration: 2100
  },
  {
    id: '8',
    timestamp: '2024-01-15T10:30:25Z',
    timeInCall: '00:00:25',
    type: 'STT',
    level: 'WARNING',
    message: 'Audio quality degraded, switching to backup model',
    metadata: { 
      provider: 'OpenAI Whisper',
      originalConfidence: 0.72,
      backupModel: 'DeepSpeech'
    },
    duration: 1500
  },
  {
    id: '9',
    timestamp: '2024-01-15T10:30:27Z',
    timeInCall: '00:00:27',
    type: 'MESSAGE',
    level: 'INFO',
    message: 'We have about 25 employees and we\'re looking for CRM and project management tools.',
    metadata: { speaker: 'customer', confidence: 0.88 },
    speaker: 'customer'
  },
  {
    id: '10',
    timestamp: '2024-01-15T10:32:15Z',
    timeInCall: '00:02:15',
    type: 'SYSTEM',
    level: 'ERROR',
    message: 'TTS provider timeout, falling back to secondary',
    metadata: { 
      primaryProvider: 'ElevenLabs',
      fallbackProvider: 'AWS Polly',
      timeoutDuration: 5000
    }
  }
];

export function CallDebugModal({ open, onOpenChange, callId }: CallDebugModalProps) {
  console.log("CallDebugModal rendered with:", { open, callId });
  const [selectedLogType, setSelectedLogType] = useState<LogType | 'ALL'>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | 'ALL'>('ALL');

  const filteredLogs = mockDebugLogs.filter(log => {
    const typeMatch = selectedLogType === 'ALL' || log.type === selectedLogType;
    const levelMatch = selectedLevel === 'ALL' || log.level === selectedLevel;
    return typeMatch && levelMatch;
  });

  const getLogIcon = (type: LogType) => {
    switch (type) {
      case 'STT': return <Mic className="w-4 h-4" />;
      case 'TTS': return <Volume2 className="w-4 h-4" />;
      case 'LLM': return <Brain className="w-4 h-4" />;
      case 'MESSAGE': return <MessageSquare className="w-4 h-4" />;
      case 'SYSTEM': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSpeakerIcon = (speaker?: 'bot' | 'customer') => {
    if (speaker === 'bot') return <Bot className="w-4 h-4 text-accent" />;
    if (speaker === 'customer') return <User className="w-4 h-4 text-primary" />;
    return null;
  };

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'ERROR': return 'text-destructive';
      case 'WARNING': return 'text-warning';
      case 'SUCCESS': return 'text-success';
      case 'INFO': return 'text-text-primary';
      default: return 'text-text-primary';
    }
  };

  const getTypeColor = (type: LogType) => {
    switch (type) {
      case 'STT': return 'bg-accent-subtle text-accent border-accent/20';
      case 'TTS': return 'bg-primary-subtle text-primary border-primary/20';
      case 'LLM': return 'bg-success-subtle text-success border-success/20';
      case 'MESSAGE': return 'bg-warning-subtle text-warning border-warning/20';
      case 'SYSTEM': return 'bg-surface-glass text-text-secondary border-border';
      default: return 'bg-surface-glass text-text-secondary border-border';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Call Debug</h2>
              <p className="text-text-muted">Detailed analysis for call {callId}</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Call Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="neural-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-text-muted">Call Duration</CardTitle>
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-text-primary mb-1">{mockCallSummary.duration}</div>
                  <p className="text-xs text-text-muted">Total call length</p>
                </CardContent>
              </Card>

              <Card className="neural-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-text-muted">Disconnected By</CardTitle>
                    <PhoneOff className="w-4 h-4 text-warning" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-text-primary mb-1 capitalize">{mockCallSummary.disconnectedBy}</div>
                  <p className="text-xs text-text-muted">Call termination</p>
                </CardContent>
              </Card>

              <Card className="neural-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-text-muted">Total Events</CardTitle>
                    <Activity className="w-4 h-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-text-primary mb-1">{mockCallSummary.totalEvents}</div>
                  <p className="text-xs text-text-muted">System activities</p>
                </CardContent>
              </Card>

              <Card className="neural-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-text-muted">Error Count</CardTitle>
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive mb-1">{mockCallSummary.errorCount}</div>
                  <p className="text-xs text-text-muted">Issues detected</p>
                </CardContent>
              </Card>
            </div>

            {/* Event Breakdown */}
            <Card className="neural-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Event Breakdown</span>
                  <ContextualHelp 
                    content="Shows the distribution of different event types during the call"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-accent-subtle">
                      <Mic className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{mockCallSummary.sttEvents}</div>
                    <div className="text-xs text-text-muted">STT Events</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary-subtle">
                      <Volume2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{mockCallSummary.ttsEvents}</div>
                    <div className="text-xs text-text-muted">TTS Events</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-success-subtle">
                      <Brain className="w-6 h-6 text-success" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{mockCallSummary.llmEvents}</div>
                    <div className="text-xs text-text-muted">LLM Events</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-warning-subtle">
                      <MessageSquare className="w-6 h-6 text-warning" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{mockCallSummary.messageCount}</div>
                    <div className="text-xs text-text-muted">Messages</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Debug Logs */}
            <Card className="neural-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>Debug Logs</span>
                    <ContextualHelp 
                      content="Chronological list of all events during the call. Filter by type or level to focus on specific issues."
                    />
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Filter className="w-4 h-4 text-text-muted" />
                      <select 
                        value={selectedLogType}
                        onChange={(e) => setSelectedLogType(e.target.value as LogType | 'ALL')}
                        className="bg-surface-secondary border border-border rounded px-3 py-2 text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="ALL">All Types</option>
                        <option value="STT">STT</option>
                        <option value="TTS">TTS</option>
                        <option value="LLM">LLM</option>
                        <option value="MESSAGE">Message</option>
                        <option value="SYSTEM">System</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <select 
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value as LogLevel | 'ALL')}
                        className="bg-surface-secondary border border-border rounded px-3 py-2 text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="ALL">All Levels</option>
                        <option value="INFO">Info</option>
                        <option value="WARNING">Warning</option>
                        <option value="ERROR">Error</option>
                        <option value="SUCCESS">Success</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Time</TableHead>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead className="w-[80px]">Level</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="w-[100px]">Duration</TableHead>
                        <TableHead className="w-[200px]">Metadata</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id} className="hover:bg-surface-glass/30">
                          <TableCell className="font-mono text-xs text-text-muted">
                            {log.timeInCall}
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(log.type)} variant="outline">
                              <div className="flex items-center space-x-1">
                                {getLogIcon(log.type)}
                                <span>{log.type}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={`text-xs font-medium ${getLevelColor(log.level)}`}>
                              {log.level}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-start space-x-2">
                              {getSpeakerIcon(log.speaker)}
                              <span className="text-sm text-text-primary">{log.message}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-text-muted">
                            {log.duration ? `${log.duration}ms` : '-'}
                          </TableCell>
                          <TableCell>
                            <div className="text-xs text-text-muted max-w-[200px]">
                              {Object.entries(log.metadata).slice(0, 2).map(([key, value]) => (
                                <div key={key} className="truncate">
                                  <span className="font-mono">{key}:</span> {String(value)}
                                </div>
                              ))}
                              {Object.keys(log.metadata).length > 2 && (
                                <div className="text-text-muted/60">+{Object.keys(log.metadata).length - 2} more</div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
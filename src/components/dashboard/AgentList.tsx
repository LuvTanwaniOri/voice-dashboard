import { useState } from "react";
import { Search, Plus, Bot, Clock, Zap, Users, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Draft' | 'Deprecated';
  voice: string;
  creator: {
    name: string;
    avatar?: string;
  };
  lastEdited: string;
  successRate?: number;
  avgLatency?: string;
  callsToday?: number;
}

interface AgentListProps {
  onSelectAgent: (agentId: string) => void;
  onCreateAgent: () => void;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Healthcare Check-In',
    type: 'Single Prompt',
    status: 'Active',
    voice: 'Kate',
    creator: { name: 'Kate', avatar: '/avatars/kate.jpg' },
    lastEdited: '09/04/2025, 11:42',
    successRate: 94,
    avgLatency: '1.2s',
    callsToday: 156
  },
  {
    id: '2',
    name: 'Retail Customer Support',
    type: 'Conversation Flow',
    status: 'Active',
    voice: 'Cimo',
    creator: { name: 'Cimo', avatar: '/avatars/cimo.jpg' },
    lastEdited: '08/05/2025, 16:37',
    successRate: 87,
    avgLatency: '1.5s',
    callsToday: 89
  },
  {
    id: '3',
    name: 'Patient Screening',
    type: 'Conversation Flow',
    status: 'Active',
    voice: 'Cimo',
    creator: { name: 'Cimo', avatar: '/avatars/cimo.jpg' },
    lastEdited: '08/05/2025, 16:36',
    successRate: 91,
    avgLatency: '1.3s',
    callsToday: 67
  },
  {
    id: '4',
    name: 'Real Estate Lead Qualification',
    type: 'Conversation Flow',
    status: 'Active',
    voice: 'Cimo',
    creator: { name: 'Cimo', avatar: '/avatars/cimo.jpg' },
    lastEdited: '08/05/2025, 16:32',
    successRate: 88,
    avgLatency: '1.4s',
    callsToday: 34
  },
  {
    id: '5',
    name: 'Lead Qualification',
    type: 'Multi Prompt',
    status: 'Active',
    voice: 'Anna',
    creator: { name: 'Anna', avatar: '/avatars/anna.jpg' },
    lastEdited: '07/27/2025, 21:02',
    successRate: 82,
    avgLatency: '1.8s',
    callsToday: 23
  },
  {
    id: '6',
    name: 'Notification System',
    type: 'Single Prompt',
    status: 'Draft',
    voice: 'Emily',
    creator: { name: 'Emily', avatar: '/avatars/emily.jpg' },
    lastEdited: '06/25/2025, 12:19',
    successRate: undefined,
    avgLatency: undefined,
    callsToday: 0
  }
];

export function AgentList({ onSelectAgent, onCreateAgent }: AgentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.voice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Draft':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Deprecated':
        return 'bg-danger/10 text-danger border-danger/20';
      default:
        return 'bg-surface-2 text-text-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">AI Agents</h1>
          <p className="text-text-secondary mt-1">Manage and configure your AI voice agents</p>
        </div>
        <Button 
          onClick={onCreateAgent}
          className="bg-accent-blue hover:bg-accent-blue-hover text-white shadow-glow/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 bg-surface border-border/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search agents by name, type, or voice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-surface-2 border-border/50 text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>
      </Card>

      {/* Agents Table */}
      <Card className="bg-surface border-border/50">
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-text-secondary font-medium">Agent</TableHead>
                <TableHead className="text-text-secondary font-medium">Status</TableHead>
                <TableHead className="text-text-secondary font-medium">Performance</TableHead>
                <TableHead className="text-text-secondary font-medium">Creator</TableHead>
                <TableHead className="text-text-secondary font-medium">Last Edited</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow 
                  key={agent.id}
                  className="border-border/50 hover:bg-surface-2/50 cursor-pointer transition-colors"
                  onClick={() => onSelectAgent(agent.id)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-accent-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{agent.name}</div>
                        <div className="text-sm text-text-muted">{agent.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(agent.status)} font-medium`}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {agent.successRate !== undefined ? (
                        <>
                          <div className="flex items-center space-x-2 text-sm">
                            <Zap className="w-3 h-3 text-success" />
                            <span className="text-text-primary font-medium">{agent.successRate}%</span>
                            <span className="text-text-muted">success</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-3 h-3 text-text-muted" />
                            <span className="text-text-secondary">{agent.avgLatency}</span>
                            <span className="text-text-muted">avg</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-text-muted text-sm">No data yet</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={agent.creator.avatar} />
                        <AvatarFallback className="bg-accent-blue/10 text-accent-blue text-xs">
                          {agent.creator.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-text-secondary text-sm">{agent.creator.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-text-secondary">{agent.lastEdited}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="w-8 h-8 text-text-muted hover:text-text-primary hover:bg-surface-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-surface border-border/50">
                        <DropdownMenuItem 
                          className="text-text-primary hover:bg-surface-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAgent(agent.id);
                          }}
                        >
                          Edit Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-text-primary hover:bg-surface-2">
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-text-primary hover:bg-surface-2">
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-danger hover:bg-danger/10">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No agents found</h3>
            <p className="text-text-muted mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first AI agent to get started"}
            </p>
            {!searchQuery && (
              <Button 
                onClick={onCreateAgent}
                className="bg-accent-blue hover:bg-accent-blue-hover text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface border-border/50">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-text-muted">Total Agents</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">{mockAgents.length}</div>
        </Card>
        
        <Card className="p-4 bg-surface border-border/50">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-success" />
            <span className="text-sm text-text-muted">Active</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {mockAgents.filter(a => a.status === 'Active').length}
          </div>
        </Card>
        
        <Card className="p-4 bg-surface border-border/50">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm text-text-muted">Draft</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {mockAgents.filter(a => a.status === 'Draft').length}
          </div>
        </Card>
        
        <Card className="p-4 bg-surface border-border/50">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-text-muted">Calls Today</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {mockAgents.reduce((sum, agent) => sum + (agent.callsToday || 0), 0)}
          </div>
        </Card>
      </div>
    </div>
  );
}
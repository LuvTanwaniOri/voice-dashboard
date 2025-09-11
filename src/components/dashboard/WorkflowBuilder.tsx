import { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus,
  Play,
  X,
  Copy,
  Settings,
  Phone,
  Bot,
  Wrench,
  PhoneCall,
  Square,
  Users,
  FileCode,
  Webhook,
  Search,
  Download,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowNode {
  id: string;
  type: 'start' | 'subagent' | 'condition' | 'end' | 'transfer' | 'phone_transfer' | 'tool';
  x: number;
  y: number;
  data: any;
  connections: string[];
}

interface WorkflowBuilderProps {
  workflowData?: any;
  onSave?: (data: any) => void;
}

export function WorkflowBuilder({ workflowData, onSave }: WorkflowBuilderProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'start',
      type: 'start',
      x: 100,
      y: 100,
      data: { label: 'Start' },
      connections: []
    }
  ]);
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showAddMenu, setShowAddMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const nodeTypes = [
    { type: 'subagent', label: 'Subagent', icon: Bot, description: 'Route to another agent' },
    { type: 'condition', label: 'Configure condition', icon: Settings, description: 'Add conditional logic' },
    { type: 'tool', label: 'Tool', icon: Wrench, description: 'Execute a tool or function' },
    { type: 'transfer', label: 'Agent transfer', icon: Users, description: 'Transfer to human agent' },
    { type: 'phone_transfer', label: 'Phone number transfer', icon: PhoneCall, description: 'Transfer to phone number' },
    { type: 'end', label: 'End', icon: Square, description: 'End the conversation' }
  ];

  const addNode = (type: string, afterNodeId: string) => {
    const afterNode = nodes.find(n => n.id === afterNodeId);
    if (!afterNode) return;

    const newNode: WorkflowNode = {
      id: `${type}_${Date.now()}`,
      type: type as any,
      x: afterNode.x,
      y: afterNode.y + 120,
      data: getDefaultNodeData(type),
      connections: []
    };

    setNodes(prev => {
      const updated = prev.map(node => 
        node.id === afterNodeId 
          ? { ...node, connections: [...node.connections, newNode.id] }
          : node
      );
      return [...updated, newNode];
    });
    
    setShowAddMenu(null);
    setSelectedNode(newNode.id);
  };

  const getDefaultNodeData = (type: string) => {
    switch (type) {
      case 'subagent':
        return { label: 'New subagent', agent: '', condition: '' };
      case 'condition':
        return { label: 'Configure condition', condition: '', llmCondition: '' };
      case 'tool':
        return { label: 'Dispatch tool', toolType: 'client', name: '', description: '' };
      case 'transfer':
        return { label: 'Agent transfer', transferType: 'agent', phoneNumber: '+1' };
      case 'phone_transfer':
        return { label: 'Phone number transfer', phoneNumber: '+1' };
      case 'end':
        return { label: 'End', message: 'The conversation will end when this node is reached.' };
      default:
        return { label: 'New node' };
    }
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === 'start') return; // Can't delete start node
    
    setNodes(prev => {
      // Remove the node and update connections
      const filtered = prev.filter(n => n.id !== nodeId);
      return filtered.map(node => ({
        ...node,
        connections: node.connections.filter(id => id !== nodeId)
      }));
    });
    
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const duplicateNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || node.type === 'start') return;

    const newNode: WorkflowNode = {
      ...node,
      id: `${node.type}_${Date.now()}`,
      x: node.x + 20,
      y: node.y + 20,
      connections: []
    };

    setNodes(prev => [...prev, newNode]);
  };

  const updateNodeData = (nodeId: string, data: any) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
    ));
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedNode(nodeId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setNodes(prev => prev.map(node => 
      node.id === draggedNode ? { ...node, x, y } : node
    ));
  }, [draggedNode, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
  }, []);

  // Attach global mouse events
  useState(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'start': return <Play className="w-4 h-4" />;
      case 'subagent': return <Bot className="w-4 h-4" />;
      case 'condition': return <Settings className="w-4 h-4" />;
      case 'tool': return <Wrench className="w-4 h-4" />;
      case 'transfer': return <Users className="w-4 h-4" />;
      case 'phone_transfer': return <PhoneCall className="w-4 h-4" />;
      case 'end': return <Square className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start': return 'text-primary';
      case 'subagent': return 'text-blue-500';
      case 'condition': return 'text-orange-500';
      case 'tool': return 'text-green-500';
      case 'transfer': return 'text-purple-500';
      case 'phone_transfer': return 'text-indigo-500';
      case 'end': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const renderNode = (node: WorkflowNode) => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const isTerminal = ['end', 'transfer', 'phone_transfer'].includes(node.type);
    
    return (
      <div
        key={node.id}
        className={cn(
          "absolute bg-background border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 min-w-[180px] group shadow-sm",
          isSelected && "border-primary shadow-lg ring-2 ring-primary/20 bg-primary/5",
          !isSelected && "border-border hover:border-primary/50 hover:shadow-md hover:bg-accent/50",
          node.type === 'start' && "border-primary/70 bg-primary/10"
        )}
        style={{ left: node.x, top: node.y }}
        onMouseDown={(e) => handleMouseDown(e, node.id)}
        onClick={() => setSelectedNode(node.id)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className={cn("p-1.5 rounded-lg bg-background border", getNodeColor(node.type))}>
            {getNodeIcon(node.type)}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground block truncate">
              {node.data.label}
            </span>
            {node.data.selectedAgent && (
              <span className="text-xs text-muted-foreground block truncate">
                {node.data.selectedAgent}
              </span>
            )}
            {node.data.phoneNumber && (
              <span className="text-xs text-muted-foreground block truncate">
                {node.data.countryCode || '+1'} {node.data.phoneNumber}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {node.type !== 'start' && (
          <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                duplicateNode(node.id);
              }}
              className="h-7 w-7 p-0 hover:bg-background/80"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                deleteNode(node.id);
              }}
              className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Plus button for adding nodes */}
        {!isTerminal && (isHovered || node.connections.length === 0) && (
          <Button
            size="sm"
            variant="outline"
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-7 w-7 p-0 rounded-full bg-background border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            onClick={(e) => {
              e.stopPropagation();
              setShowAddMenu({ 
                nodeId: node.id, 
                x: node.x + 90, 
                y: node.y + 100 
              });
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}

        {/* Condition badges for branches */}
        {node.type === 'condition' && node.connections.length > 0 && (
          <div className="absolute -bottom-1 right-2">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              Configure condition
            </Badge>
          </div>
        )}
      </div>
    );
  };

  const renderConnections = () => {
    return nodes.map(node => 
      node.connections.map(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (!targetNode) return null;

        const startX = node.x + 80; // Center of node
        const startY = node.y + 40; // Bottom of node
        const endX = targetNode.x + 80;
        const endY = targetNode.y;

        return (
          <svg
            key={`${node.id}-${connectionId}`}
            className="absolute pointer-events-none"
            style={{
              left: Math.min(startX, endX) - 10,
              top: Math.min(startY, endY) - 10,
              width: Math.abs(endX - startX) + 20,
              height: Math.abs(endY - startY) + 20
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="hsl(var(--border))"
                />
              </marker>
            </defs>
            <line
              x1={startX - Math.min(startX, endX) + 10}
              y1={startY - Math.min(startY, endY) + 10}
              x2={endX - Math.min(startX, endX) + 10}
              y2={endY - Math.min(startY, endY) + 10}
              stroke="hsl(var(--border))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        );
      })
    );
  };

  const renderAddMenu = () => {
    if (!showAddMenu) return null;

    return (
      <div
        className="absolute z-50 bg-background border rounded-lg shadow-lg p-2 space-y-1"
        style={{ left: showAddMenu.x, top: showAddMenu.y }}
      >
        {nodeTypes.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => addNode(type, showAddMenu.nodeId)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    );
  };

  const renderConfigPanel = () => {
    const node = nodes.find(n => n.id === selectedNode);
    if (!node) return null;

    return (
      <Card className="h-full">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{node.data.label}</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedNode(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {node.type === 'transfer' && (
            <div className="space-y-4">
              <div>
                <Label>Transfer to</Label>
                <Select
                  value={node.data.selectedAgent || ''}
                  onValueChange={(value) => updateNodeData(node.id, { selectedAgent: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zomato-agent">Zomato Agent</SelectItem>
                    <SelectItem value="medicare-test">Medicare Test</SelectItem>
                    <SelectItem value="test-agent">Test agent</SelectItem>
                    <SelectItem value="new-agent">New agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Delay before transfer (milliseconds)</Label>
                <Input
                  type="number"
                  value={node.data.delay || '0'}
                  onChange={(e) => updateNodeData(node.id, { delay: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Transfer Message</Label>
                <Textarea
                  value={node.data.transferMessage || ''}
                  onChange={(e) => updateNodeData(node.id, { transferMessage: e.target.value })}
                  placeholder="Enter message to say during transfer (optional)."
                  rows={2}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enable-first-message"
                  checked={node.data.enableFirstMessage || false}
                  onCheckedChange={(checked) => updateNodeData(node.id, { enableFirstMessage: checked })}
                />
                <Label htmlFor="enable-first-message">Enable First Message</Label>
              </div>
            </div>
          )}

          {node.type === 'phone_transfer' && (
            <div className="space-y-4">
              <div>
                <Label>Transfer type</Label>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={node.data.transferType === 'conference' ? 'default' : 'outline'}
                    onClick={() => updateNodeData(node.id, { transferType: 'conference' })}
                    className="flex-1"
                  >
                    Conference
                  </Button>
                  <Button
                    size="sm"
                    variant={node.data.transferType === 'sip_refer' ? 'default' : 'outline'}
                    onClick={() => updateNodeData(node.id, { transferType: 'sip_refer' })}
                    className="flex-1"
                  >
                    SIP REFER
                  </Button>
                </div>
              </div>
              <div>
                <Label>Number type</Label>
                <Select
                  value={node.data.numberType || 'phone'}
                  onValueChange={(value) => updateNodeData(node.id, { numberType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sip_uri">SIP URI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Phone Number</Label>
                <div className="flex">
                  <Select
                    value={node.data.countryCode || '+1'}
                    onValueChange={(value) => updateNodeData(node.id, { countryCode: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      <SelectItem value="+216">🇹🇳 +216</SelectItem>
                      <SelectItem value="+90">🇹🇷 +90</SelectItem>
                      <SelectItem value="+993">🇹🇲 +993</SelectItem>
                      <SelectItem value="+1649">🇹🇨 +1</SelectItem>
                      <SelectItem value="+688">🇹🇻 +688</SelectItem>
                      <SelectItem value="+256">🇺🇬 +256</SelectItem>
                      <SelectItem value="+380">🇺🇦 +380</SelectItem>
                      <SelectItem value="+971">🇦🇪 +971</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className="flex-1 ml-2"
                    value={node.data.phoneNumber || ''}
                    onChange={(e) => updateNodeData(node.id, { phoneNumber: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          )}

          {node.type === 'subagent' && (
            <div className="space-y-4">
              <div>
                <Label>Label</Label>
                <Input
                  value={node.data.label}
                  onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
                  placeholder="New subagent"
                />
              </div>
              <div>
                <Label>Agent</Label>
                <Select
                  value={node.data.selectedAgent || ''}
                  onValueChange={(value) => updateNodeData(node.id, { selectedAgent: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zomato-agent">Zomato Agent</SelectItem>
                    <SelectItem value="medicare-test">Medicare Test</SelectItem>
                    <SelectItem value="test-agent">Test agent</SelectItem>
                    <SelectItem value="new-agent">New agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition</Label>
                <Textarea
                  value={node.data.condition || ''}
                  onChange={(e) => updateNodeData(node.id, { condition: e.target.value })}
                  placeholder="e.g. The user wants to place an order"
                  rows={3}
                />
              </div>
            </div>
          )}

          {node.type === 'condition' && (
            <div className="space-y-4">
              <div>
                <Label>Transition type</Label>
                <Select defaultValue="llm">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llm">LLM Condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Label</Label>
                <Input
                  value={node.data.label}
                  onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
                  placeholder="Configure condition"
                />
              </div>
              <div>
                <Label>LLM condition</Label>
                <Textarea
                  value={node.data.llmCondition || ''}
                  onChange={(e) => updateNodeData(node.id, { llmCondition: e.target.value })}
                  placeholder="e.g. The user has an issue with billing"
                  rows={3}
                />
              </div>
            </div>
          )}

          {node.type === 'tool' && (
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger value="json">JSON Mode</TabsTrigger>
              </TabsList>
              
              <TabsContent value="form" className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={node.data.name || ''}
                    onChange={(e) => updateNodeData(node.id, { name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={node.data.description || ''}
                    onChange={(e) => updateNodeData(node.id, { description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="wait-response" />
                    <Label htmlFor="wait-response">Wait for response</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select this box to make the agent wait for the tool to finish executing before resuming the conversation.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="disable-interruptions" />
                    <Label htmlFor="disable-interruptions">Disable interruptions</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select this box to disable interruptions while the tool is running.
                  </p>
                </div>
                <div>
                  <Label>Pre-tool speech</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Force agent speech before tool execution or let it decide automatically based on recent execution times.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="json" className="space-y-4">
                <Textarea
                  value={JSON.stringify(node.data, null, 2)}
                  onChange={(e) => {
                    try {
                      const data = JSON.parse(e.target.value);
                      updateNodeData(node.id, data);
                    } catch {}
                  }}
                  rows={10}
                  className="font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          )}

          {node.type === 'end' && (
            <div>
              <p className="text-sm text-muted-foreground">
                {node.data.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex h-[700px] border rounded-xl bg-background shadow-sm">
      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="flex-1 relative bg-dot-pattern overflow-hidden rounded-l-xl"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
        onClick={() => {
          setSelectedNode(null);
          setShowAddMenu(null);
        }}
      >
        {/* Canvas header */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              Workflow Builder
            </Badge>
            <div className="flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
        </div>

        {/* Canvas toolbar */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-lg p-2 border">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Search className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {renderConnections()}
        {nodes.map(renderNode)}
        {renderAddMenu()}

        {/* Unsaved changes notification */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-orange-700 dark:text-orange-300">You have unsaved changes</span>
            <Button size="sm" variant="ghost" className="h-6 text-orange-700 dark:text-orange-300">
              Clear
            </Button>
            <Button size="sm" className="h-6 bg-orange-600 hover:bg-orange-700 text-white">
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      {selectedNode && (
        <div className="w-96 border-l bg-muted/30">
          {renderConfigPanel()}
        </div>
      )}
    </div>
  );
}
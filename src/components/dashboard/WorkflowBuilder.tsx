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
  Webhook
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

  const renderNode = (node: WorkflowNode) => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const isTerminal = ['end', 'transfer', 'phone_transfer'].includes(node.type);
    
    return (
      <div
        key={node.id}
        className={cn(
          "absolute bg-background border rounded-lg p-3 cursor-pointer transition-all duration-200 min-w-[160px]",
          isSelected && "border-primary shadow-lg ring-2 ring-primary/20",
          !isSelected && "border-border hover:border-primary/50 hover:shadow-md"
        )}
        style={{ left: node.x, top: node.y }}
        onMouseDown={(e) => handleMouseDown(e, node.id)}
        onClick={() => setSelectedNode(node.id)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <div className="flex items-center space-x-2 mb-2">
          {node.type === 'start' && <Play className="w-4 h-4 text-primary" />}
          {node.type === 'subagent' && <Bot className="w-4 h-4 text-blue-500" />}
          {node.type === 'condition' && <Settings className="w-4 h-4 text-orange-500" />}
          {node.type === 'tool' && <Wrench className="w-4 h-4 text-green-500" />}
          {node.type === 'transfer' && <Users className="w-4 h-4 text-purple-500" />}
          {node.type === 'phone_transfer' && <PhoneCall className="w-4 h-4 text-indigo-500" />}
          {node.type === 'end' && <Square className="w-4 h-4 text-red-500" />}
          <span className="text-sm font-medium">{node.data.label}</span>
        </div>
        
        {node.type !== 'start' && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                duplicateNode(node.id);
              }}
              className="h-6 w-6 p-0"
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
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
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
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-6 w-6 p-0 rounded-full bg-background"
            onClick={(e) => {
              e.stopPropagation();
              setShowAddMenu({ 
                nodeId: node.id, 
                x: node.x + 80, 
                y: node.y + 80 
              });
            }}
          >
            <Plus className="w-3 h-3" />
          </Button>
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
                <Label>Transfer type</Label>
                <Select
                  value={node.data.transferType || 'agent'}
                  onValueChange={(value) => updateNodeData(node.id, { transferType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Conference</SelectItem>
                    <SelectItem value="phone">SIP REFER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={node.data.phoneNumber || '+1'}
                  onChange={(e) => updateNodeData(node.id, { phoneNumber: e.target.value })}
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
    <div className="flex h-[600px] border rounded-lg">
      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="flex-1 relative bg-muted/5 overflow-hidden"
        onClick={() => {
          setSelectedNode(null);
          setShowAddMenu(null);
        }}
      >
        {renderConnections()}
        {nodes.map(renderNode)}
        {renderAddMenu()}
      </div>

      {/* Configuration Panel */}
      {selectedNode && (
        <div className="w-80 border-l">
          {renderConfigPanel()}
        </div>
      )}
    </div>
  );
}
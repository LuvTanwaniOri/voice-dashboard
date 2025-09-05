import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioWaveformProps {
  audioUrl?: string;
  duration: number;
  onTimeSelect: (startTime: number, endTime: number) => void;
  selectedRange?: { start: number; end: number };
  className?: string;
}

export function AudioWaveform({ 
  audioUrl, 
  duration, 
  onTimeSelect, 
  selectedRange,
  className = "" 
}: AudioWaveformProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(selectedRange?.start || 0);
  const [endTime, setEndTime] = useState(selectedRange?.end || duration);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate mock waveform data
  const generateWaveform = () => {
    const points = 100;
    return Array.from({ length: points }, () => Math.random() * 0.8 + 0.2);
  };

  const waveformData = generateWaveform();

  useEffect(() => {
    if (selectedRange && 
        (selectedRange.start !== startTime || selectedRange.end !== endTime)) {
      setStartTime(selectedRange.start);
      setEndTime(selectedRange.end);
    }
  }, [selectedRange]);

  // Only call onTimeSelect when user explicitly changes values, not on initial load
  const handleTimeChange = (newStart: number, newEnd: number) => {
    setStartTime(newStart);
    setEndTime(newEnd);
    onTimeSelect(newStart, newEnd);
  };

  // Draw waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / waveformData.length;
    
    waveformData.forEach((amplitude, index) => {
      const barHeight = amplitude * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;
      
      const timePosition = (index / waveformData.length) * duration;
      const isInSelection = timePosition >= startTime && timePosition <= endTime;
      
      ctx.fillStyle = isInSelection 
        ? 'hsl(var(--accent-blue))' 
        : 'hsl(var(--muted-foreground) / 0.3)';
      
      ctx.fillRect(x, y, Math.max(barWidth - 1, 1), barHeight);
    });

    // Draw selection markers
    const startX = (startTime / duration) * width;
    const endX = (endTime / duration) * width;
    
    // Selection overlay
    ctx.fillStyle = 'hsl(var(--accent-blue) / 0.2)';
    ctx.fillRect(startX, 0, endX - startX, height);
    
    // Selection borders
    ctx.strokeStyle = 'hsl(var(--accent-blue))';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX, height);
    ctx.moveTo(endX, 0);
    ctx.lineTo(endX, height);
    ctx.stroke();

    // Current time indicator
    if (isPlaying) {
      const currentX = (currentTime / duration) * width;
      ctx.strokeStyle = 'hsl(var(--destructive))';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currentX, 0);
      ctx.lineTo(currentX, height);
      ctx.stroke();
    }
  }, [waveformData, startTime, endTime, currentTime, duration, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaySelected = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickTime = (clickX / canvas.width) * duration;
    
    // Determine which handle is closer
    const distToStart = Math.abs(clickTime - startTime);
    const distToEnd = Math.abs(clickTime - endTime);
    
    if (distToStart < distToEnd) {
      const newStart = Math.max(0, Math.min(clickTime, endTime - 0.1));
      handleTimeChange(newStart, endTime);
    } else {
      const newEnd = Math.min(duration, Math.max(clickTime, startTime + 0.1));
      handleTimeChange(startTime, newEnd);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              if (audioRef.current.currentTime >= endTime) {
                audioRef.current.pause();
                setIsPlaying(false);
              }
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Waveform Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={80}
          className="w-full h-20 bg-surface-2/50 rounded-lg border border-border/30 cursor-pointer"
          onClick={handleCanvasClick}
        />
      </div>

      {/* Time Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>Start: {formatTime(startTime)}</span>
          <span>Duration: {formatTime(endTime - startTime)}</span>
          <span>End: {formatTime(endTime)}</span>
        </div>
        
        {/* Start Time Slider */}
        <div className="space-y-2">
          <label className="text-xs text-text-muted">Start Time</label>
          <Slider
            value={[startTime]}
            onValueChange={(value) => {
              const newStart = Math.min(value[0], endTime - 0.1);
              handleTimeChange(newStart, endTime);
            }}
            max={duration}
            step={0.1}
            className="w-full"
          />
        </div>
        
        {/* End Time Slider */}
        <div className="space-y-2">
          <label className="text-xs text-text-muted">End Time</label>
          <Slider
            value={[endTime]}
            onValueChange={(value) => {
              const newEnd = Math.max(value[0], startTime + 0.1);
              handleTimeChange(startTime, newEnd);
            }}
            max={duration}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePlaySelected}
            disabled={!audioUrl}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="ml-2">Play Selection</span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Volume2 className="w-4 h-4" />
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
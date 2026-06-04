import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface WebcamPanelProps {
  isExamRunning?: boolean;
  onViolationTriggered?: (violationText: string, severity: 'low' | 'medium' | 'critical') => void;
  mockAlerts?: boolean;
}

export default function WebcamPanel({
  isExamRunning = false,
  onViolationTriggered,
  mockAlerts = false
}: WebcamPanelProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [faceDetected, setFaceDetected] = useState<boolean>(true);
  const [multipleFaces, setMultipleFaces] = useState<boolean>(false);
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High'>('Low');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Attempt to load genuine user media
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, facingMode: 'user' }, 
        audio: true 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => console.log('Video play error', err));
      }
      setHasPermission(true);
      setCameraActive(true);
      setMicActive(true);
    } catch (err) {
      console.warn('Real webcam access not granted or unavailable, switching to live smart interactive simulator.', err);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // AI-face wireframe simulation loop using HTML5 Canvas overlays
  useEffect(() => {
    let animationId: number;
    let frameCount = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderOverlay = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!cameraActive) {
        // Red overlay when camera is closed
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // If we don't have real feed, let's draw a nice animated abstract 3D face silhouette!
      if (!hasPermission) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated grid or starfield background
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        const gridGap = 20;
        const offset = (frameCount % gridGap);
        for (let x = offset; x < canvas.width; x += gridGap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = offset; y < canvas.height; y += gridGap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Animated avatar shadow
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 + 10;
        
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.beginPath();
        // Head
        ctx.arc(centerX, centerY - 25, 30, 0, Math.PI * 2);
        // Body shoulder
        ctx.moveTo(centerX - 50, centerY + 40);
        ctx.quadraticCurveTo(centerX - 50, centerY + 10, centerX - 30, centerY + 10);
        ctx.lineTo(centerX + 30, centerY + 10);
        ctx.quadraticCurveTo(centerX + 50, centerY + 10, centerX + 50, centerY + 40);
        ctx.closePath();
        ctx.fill();
        
        // Face missing status
        if (!faceDetected) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.font = 'bold 12px monospace';
          ctx.fillText('NO FACE DETECTED', centerX - 55, centerY - 15);
        }
      }

      // Draw custom bounding boxes / Scanning lines
      if (faceDetected) {
        const pulse = Math.sin(frameCount * 0.05) * 5;
        const boxX = 60 + pulse;
        const boxY = 40 - pulse / 2;
        const boxW = 120 - pulse * 2;
        const boxH = 140 + pulse;

        // Bounding box representing AI face identification
        ctx.strokeStyle = multipleFaces ? '#f59e0b' : '#10b981';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 8;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Custom crosshair targets
        ctx.strokeStyle = '#6366f1';
        ctx.beginPath();
        // Top-left corner brackets
        ctx.moveTo(boxX - 5, boxY - 5); ctx.lineTo(boxX + 15, boxY - 5);
        ctx.moveTo(boxX - 5, boxY - 5); ctx.lineTo(boxX - 5, boxY + 15);
        // Top-right
        ctx.moveTo(boxX + boxW + 5, boxY - 5); ctx.lineTo(boxX + boxW - 15, boxY - 5);
        ctx.moveTo(boxX + boxW + 5, boxY - 5); ctx.lineTo(boxX + boxW + 5, boxY + 15);
        // Bottom-left
        ctx.moveTo(boxX - 5, boxY + boxH + 5); ctx.lineTo(boxX + 15, boxY + boxH + 5);
        ctx.moveTo(boxX - 5, boxY + boxH + 5); ctx.lineTo(boxX - 5, boxY + boxH - 15);
        // Bottom-right
        ctx.moveTo(boxX + boxW + 5, boxY + boxH + 5); ctx.lineTo(boxX + boxW - 15, boxY + boxH + 5);
        ctx.moveTo(boxX + boxW + 5, boxY + boxH + 5); ctx.lineTo(boxX + boxW + 5, boxY + boxH - 15);
        ctx.stroke();

        // Face stats labels on top of the box
        ctx.fillStyle = multipleFaces ? '#f59e0b' : '#10b981';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`CANDIDATE: ID_09204`, boxX + 4, boxY + 14);
        ctx.fillText(`MATCH CONFIDENCE: ${multipleFaces ? '42' : '98'}.4%`, boxX + 4, boxY + 26);
        ctx.fillText(`GAZE TRACKING: STABLE`, boxX + 4, boxY + 38);

        // Face mesh landmark dots
        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
        const landmarks = [
          { x: boxX + boxW * 0.3, y: boxY + boxH * 0.35 }, // Left eye
          { x: boxX + boxW * 0.7, y: boxY + boxH * 0.35 }, // Right eye
          { x: boxX + boxW * 0.5, y: boxY + boxH * 0.52 }, // Nose
          { x: boxX + boxW * 0.5, y: boxY + boxH * 0.72 }, // Mouth
          { x: boxX + boxW * 0.35, y: boxY + boxH * 0.70 }, // Left mouth corner
          { x: boxX + boxW * 0.65, y: boxY + boxH * 0.70 }, // Right mouth corner
        ];
        landmarks.forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Scanner bar sweeping down
      const sweepY = (frameCount * 1.5) % canvas.height;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, sweepY);
      ctx.lineTo(canvas.width, sweepY);
      ctx.stroke();

      animationId = requestAnimationFrame(renderOverlay);
    };

    renderOverlay();
    return () => cancelAnimationFrame(animationId);
  }, [hasPermission, cameraActive, faceDetected, multipleFaces]);

  // Periodic simulated violations during exams (gaze away, lookup, phone) to make landing & exam live-wire
  useEffect(() => {
    if (!isExamRunning || !mockAlerts) return;

    const interval = setInterval(() => {
      const roll = Math.random();
      if (roll < 0.15) {
        // Trigger face missing simulation
        setFaceDetected(false);
        onViolationTriggered?.('Gaze deviation: Student looking away from center screen', 'low');
        setTimeout(() => setFaceDetected(true), 4000);
      } else if (roll < 0.25) {
        // Multiple faces
        setMultipleFaces(true);
        setRiskLevel('Medium');
        onViolationTriggered?.('Secondary identity detected in frame background profile', 'medium');
        setTimeout(() => {
          setMultipleFaces(false);
          setRiskLevel('Low');
        }, 5050);
      } else if (roll < 0.32) {
        onViolationTriggered?.('Automated Audio Sensor: Human whispering spectrum noticed (25dB)', 'low');
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isExamRunning, mockAlerts, onViolationTriggered]);

  return (
    <div id="proctor-cam-card" className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-lg overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      {/* Visual Header */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-850 px-4 py-2.5 border-b border-slate-200/40 dark:border-slate-800">
        <span className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-350">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${cameraActive ? 'animate-ping bg-emerald-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${cameraActive ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          </span>
          AI Proctor Camera
        </span>
        <button
          onClick={startCamera}
          className="text-[10px] font-mono flex items-center gap-1 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 hover:opacity-85 transition-opacity"
          title="Regrant permission & refresh feed"
        >
          <RefreshCw className="h-3 w-3" /> Grant
        </button>
      </div>

      {/* Camera feed/Canvas area */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* Genuine Video Stream if permitted */}
        {hasPermission && (
          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover select-none scale-x-[-1]"
          />
        )}

        {/* Dynamic Canvas overlay mapping wireframes */}
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          className="absolute inset-0 h-full w-full z-10 pointer-events-none"
        />

        {/* Offline overlay */}
        {!cameraActive && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-4">
            <CameraOff className="h-9 w-9 text-rose-500 mb-2 animate-bounce" />
            <p className="text-xs font-bold font-display text-slate-200">Video Capture Disabled</p>
            <p className="text-[10px] text-slate-500 text-center">Examiner can suspend your record timeline.</p>
          </div>
        )}
      </div>

      {/* Hardware / Sensor Controls */}
      <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <button
          onClick={() => setCameraActive(!cameraActive)}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-colors ${
            cameraActive ? 'text-indigo-600 hover:bg-slate-50 dark:text-sky-400 dark:hover:bg-slate-850' : 'text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/20'
          }`}
        >
          {cameraActive ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4 text-rose-500" />}
          <span>{cameraActive ? 'Cam Live' : 'Cam Off'}</span>
        </button>

        <button
          onClick={() => setMicActive(!micActive)}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-colors ${
            micActive ? 'text-indigo-600 hover:bg-slate-50 dark:text-sky-400 dark:hover:bg-slate-850' : 'text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/20'
          }`}
        >
          {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4 text-rose-500" />}
          <span>{micActive ? 'Mic Active' : 'Mic Muted'}</span>
        </button>
      </div>

      {/* Real-Time Sensor Metrics & Diagnostics */}
      <div className="p-3 bg-slate-50/50 dark:bg-slate-950 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Acoustic level:</span>
          <span className="font-mono text-slate-700 dark:text-slate-350">{micActive ? '32 dB (Stable)' : '0 dB'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Identity confidence:</span>
          <span className={`font-mono font-bold ${faceDetected && !multipleFaces ? 'text-emerald-500' : 'text-amber-500'}`}>
            {cameraActive && faceDetected ? (multipleFaces ? '42%' : '98%') : '0%'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Exam Risk Level:</span>
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
            riskLevel === 'High' ? 'bg-red-100 text-red-800' : riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {riskLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
export { WebcamPanel };

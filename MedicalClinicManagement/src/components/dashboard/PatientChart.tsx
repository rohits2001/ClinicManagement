import React, { useEffect, useRef } from 'react';
import Card from '../common/Card';
import { getPatientRegistrationData } from '../../data/mockData';

const PatientChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    const data = getPatientRegistrationData();
    
    // Clear canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
    
    // Set dimensions
    const width = chartRef.current.width;
    const height = chartRef.current.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Find max value for scaling
    const maxCount = Math.max(...data.map(d => d.count), 5);
    
    // Draw horizontal grid lines and labels
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i / 5) * chartHeight;
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.strokeStyle = '#f3f4f6';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Label
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(i * maxCount / 5).toString(), padding - 5, y + 3);
    }
    
    // Draw data points and lines
    const pointWidth = chartWidth / (data.length - 1);
    
    // Draw line
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = padding + i * pointWidth;
      const y = height - padding - (point.count / maxCount) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw area under the line
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    data.forEach((point, i) => {
      const x = padding + i * pointWidth;
      const y = height - padding - (point.count / maxCount) * chartHeight;
      
      ctx.lineTo(x, y);
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fill();
    
    // Draw points
    data.forEach((point, i) => {
      const x = padding + i * pointWidth;
      const y = height - padding - (point.count / maxCount) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.stroke();
    });
    
    // Draw x-axis labels (every 5 days)
    for (let i = 0; i < data.length; i += 5) {
      const x = padding + i * pointWidth;
      
      // Label
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      const date = new Date(data[i].date);
      const label = `${date.getDate()}/${date.getMonth() + 1}`;
      ctx.fillText(label, x, height - padding + 15);
    }
    
    // Chart title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Patient Registrations (Last 30 Days)', width / 2, 20);
    
  }, []);

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Registration Trends</h2>
      <div className="w-full h-80">
        <canvas 
          ref={chartRef} 
          width={800} 
          height={300} 
          className="w-full h-full"
        ></canvas>
      </div>
    </Card>
  );
};

export default PatientChart;
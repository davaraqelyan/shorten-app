import { Smartphone, Monitor, Tablet, LucideIcon } from 'lucide-react';

export function getDeviceIcon(userAgent?: string): LucideIcon {
  if (!userAgent) return Monitor;
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('android')) {
    return Smartphone;
  }
  
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return Tablet;
  }
  
  return Monitor;
}

export function parseUserAgent(userAgent?: string) {
  if (!userAgent) {
    return {
      browser: 'Unknown',
      device: 'Unknown',
      os: 'Unknown',
    };
  }

  const ua = userAgent.toLowerCase();
  
  let browser = 'Unknown';
  if (ua.includes('chrome') && !ua.includes('edge')) {
    browser = 'Chrome';
  } else if (ua.includes('firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari';
  } else if (ua.includes('edge')) {
    browser = 'Edge';
  } else if (ua.includes('opera')) {
    browser = 'Opera';
  }

  let device = 'Desktop';
  if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('android')) {
    device = 'Mobile';
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    device = 'Tablet';
  }

  let os = 'Unknown';
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('macintosh') || ua.includes('mac os')) {
    os = 'macOS';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }

  return { browser, device, os };
}
import { describe, it, expect, vi } from 'vitest';
import { uploadVideo, generateVideoUrl } from './storage';

describe('Storage Service', () => {
  it('should upload video file and return URL', async () => {
    const mockFile = new File(['test video content'], 'test.mp4', { type: 'video/mp4' });
    const analysisId = 'test-analysis-123';

    const result = await uploadVideo(mockFile, analysisId);

    expect(result.success).toBe(true);
    expect(result.url).toContain('vastuji-uploads');
    expect(result.url).toContain(analysisId);
  });

  it('should reject non-video files', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const analysisId = 'test-analysis-123';

    const result = await uploadVideo(mockFile, analysisId);

    expect(result.success).toBe(false);
    expect(result.error).toContain('video');
  });

  it('should reject files larger than 100MB', async () => {
    const largeFile = new File([new ArrayBuffer(101 * 1024 * 1024)], 'large.mp4', { type: 'video/mp4' });
    const analysisId = 'test-analysis-123';

    const result = await uploadVideo(largeFile, analysisId);

    expect(result.success).toBe(false);
    expect(result.error).toContain('100MB');
  });

  it('should generate public URL for uploaded video', () => {
    const path = 'videos/test-analysis-123/video.mp4';
    const url = generateVideoUrl(path);

    expect(url).toContain('supabase');
    expect(url).toContain(path);
  });
});

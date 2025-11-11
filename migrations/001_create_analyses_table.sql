-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Input data
  property_type ENUM('home', 'office', 'shop', 'factory', 'plot') NOT NULL,
  selected_goals JSON,
  video_url VARCHAR(2048) NOT NULL,
  compass_heading DECIMAL(5,2) NOT NULL CHECK (compass_heading >= 0 AND compass_heading < 360),

  -- Processing status
  status ENUM('uploading', 'processing', 'complete', 'failed') NOT NULL DEFAULT 'uploading',

  -- Generated outputs (stored as JSON for flexibility)
  floor_plan JSON,
  zones JSON,
  summary JSON,
  detailed_report JSON,

  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

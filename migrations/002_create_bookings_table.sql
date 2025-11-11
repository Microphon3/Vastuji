-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(36) PRIMARY KEY,
  analysis_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Contact information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  property_address TEXT,

  -- Scheduling
  scheduled_time TIMESTAMP NOT NULL,
  timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',

  -- Payment
  payment_status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  payment_id VARCHAR(255),
  amount INT NOT NULL, -- Amount in paise (₹2999 = 299900)

  -- Consultation
  consultant_id VARCHAR(36),
  consultation_status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  notes TEXT,

  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE,
  INDEX idx_analysis_id (analysis_id),
  INDEX idx_email (email),
  INDEX idx_scheduled_time (scheduled_time),
  INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

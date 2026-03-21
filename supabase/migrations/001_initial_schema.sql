-- Heavy Match DB Schema
-- 중장비 배차 매칭 플랫폼

-- ============================================
-- 1. users (사용자)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('requester','owner','operator','callcenter','salesperson','admin')),
  company_name VARCHAR(200),
  business_number VARCHAR(20),
  referred_owner_id UUID REFERENCES users(id),
  callcenter_id UUID REFERENCES users(id),
  parent_id UUID REFERENCES users(id),
  region_sido VARCHAR(20),
  region_sigungu VARCHAR(40),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. equipment_types (장비 종류)
-- ============================================
CREATE TABLE equipment_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(10),
  sort_order INT DEFAULT 0
);

-- ============================================
-- 3. equipment_specs (장비 규격)
-- ============================================
CREATE TABLE equipment_specs (
  id SERIAL PRIMARY KEY,
  equipment_type_id INT REFERENCES equipment_types(id),
  spec_name VARCHAR(50) NOT NULL,
  sort_order INT DEFAULT 0
);

-- ============================================
-- 4. time_units (시간 단위)
-- ============================================
CREATE TABLE time_units (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  hours DECIMAL(4,1),
  sort_order INT DEFAULT 0
);

-- ============================================
-- 5. owner_prices (중장비사장 단가표)
-- ============================================
CREATE TABLE owner_prices (
  id SERIAL PRIMARY KEY,
  owner_id UUID REFERENCES users(id) NOT NULL,
  equipment_type_id INT REFERENCES equipment_types(id) NOT NULL,
  spec_id INT REFERENCES equipment_specs(id) NOT NULL,
  time_unit_id INT REFERENCES time_units(id) NOT NULL,
  price INT NOT NULL DEFAULT 0,
  UNIQUE(owner_id, equipment_type_id, spec_id, time_unit_id)
);

-- ============================================
-- 6. dispatch_requests (배차 요청)
-- ============================================
CREATE TABLE dispatch_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES users(id) NOT NULL,
  equipment_type_id INT REFERENCES equipment_types(id) NOT NULL,
  spec_id INT REFERENCES equipment_specs(id) NOT NULL,
  time_unit_id INT REFERENCES time_units(id) NOT NULL,
  price INT NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  site_address TEXT NOT NULL,
  payment_date DATE,
  requester_name VARCHAR(100),
  requester_title VARCHAR(50),
  requester_phone VARCHAR(20),
  site_manager_name VARCHAR(100),
  site_manager_title VARCHAR(50),
  site_manager_phone VARCHAR(20),
  requester_signature TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending'
    CHECK (status IN (
      'pending', 'exclusive_call', 'callcenter_call', 'shared_call',
      'matched', 'operator_assigned', 'in_progress', 'completed', 'cancelled'
    )),
  target_owner_id UUID REFERENCES users(id),
  matched_owner_id UUID REFERENCES users(id),
  assigned_operator_id UUID REFERENCES users(id),
  original_callcenter_id UUID REFERENCES users(id),
  exclusive_call_at TIMESTAMPTZ,
  callcenter_call_at TIMESTAMPTZ,
  shared_call_at TIMESTAMPTZ,
  matched_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  operator_signature TEXT,
  work_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. commissions (수수료 기록)
-- ============================================
CREATE TABLE commissions (
  id SERIAL PRIMARY KEY,
  dispatch_id UUID REFERENCES dispatch_requests(id) NOT NULL,
  total_price INT NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 15.00,
  total_commission INT NOT NULL,
  requester_reward INT NOT NULL,
  company_fee INT NOT NULL,
  callcenter_fee INT NOT NULL,
  salesperson_fee INT NOT NULL,
  callcenter_id UUID REFERENCES users(id),
  salesperson_id UUID REFERENCES users(id),
  is_cancelled BOOLEAN DEFAULT FALSE,
  cancel_fee INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. sms_logs (SMS 발송 기록)
-- ============================================
CREATE TABLE sms_logs (
  id SERIAL PRIMARY KEY,
  dispatch_id UUID REFERENCES dispatch_requests(id),
  recipient_phone VARCHAR(20) NOT NULL,
  recipient_id UUID REFERENCES users(id),
  message_type VARCHAR(20) NOT NULL,
  token VARCHAR(100),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'sent'
);

-- ============================================
-- 9. call_history (재주문 이력)
-- ============================================
CREATE TABLE call_history (
  id SERIAL PRIMARY KEY,
  requester_id UUID REFERENCES users(id) NOT NULL,
  owner_id UUID REFERENCES users(id) NOT NULL,
  equipment_type_id INT REFERENCES equipment_types(id),
  spec_id INT REFERENCES equipment_specs(id),
  site_address TEXT,
  company_name VARCHAR(200),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  use_count INT DEFAULT 1,
  UNIQUE(requester_id, owner_id, equipment_type_id, spec_id, site_address)
);

-- ============================================
-- 인덱스
-- ============================================
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_region ON users(region_sido, region_sigungu);
CREATE INDEX idx_users_callcenter ON users(callcenter_id);
CREATE INDEX idx_users_parent ON users(parent_id);
CREATE INDEX idx_dispatch_status ON dispatch_requests(status);
CREATE INDEX idx_dispatch_requester ON dispatch_requests(requester_id);
CREATE INDEX idx_dispatch_target_owner ON dispatch_requests(target_owner_id);
CREATE INDEX idx_dispatch_matched_owner ON dispatch_requests(matched_owner_id);
CREATE INDEX idx_dispatch_operator ON dispatch_requests(assigned_operator_id);
CREATE INDEX idx_commissions_dispatch ON commissions(dispatch_id);
CREATE INDEX idx_sms_dispatch ON sms_logs(dispatch_id);
CREATE INDEX idx_sms_token ON sms_logs(token);
CREATE INDEX idx_call_history_requester ON call_history(requester_id);

-- ============================================
-- RLS 활성화
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispatch_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_units ENABLE ROW LEVEL SECURITY;

-- 장비/규격/시간은 모든 인증 사용자 읽기 가능
CREATE POLICY "equipment_types_read" ON equipment_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "equipment_specs_read" ON equipment_specs FOR SELECT TO authenticated USING (true);
CREATE POLICY "time_units_read" ON time_units FOR SELECT TO authenticated USING (true);

-- users: 본인 프로필 조회/수정
CREATE POLICY "users_read_own" ON users FOR SELECT TO authenticated
  USING (id = auth.uid());
CREATE POLICY "users_update_own" ON users FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- admin은 모든 사용자 조회 가능
CREATE POLICY "users_admin_read" ON users FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- owner_prices: 본인 단가만
CREATE POLICY "owner_prices_own" ON owner_prices FOR ALL TO authenticated
  USING (owner_id = auth.uid());

-- dispatch_requests: 역할별 (service_role로 우회 가능)
CREATE POLICY "dispatch_requester" ON dispatch_requests FOR SELECT TO authenticated
  USING (requester_id = auth.uid());
CREATE POLICY "dispatch_owner_exclusive" ON dispatch_requests FOR SELECT TO authenticated
  USING (target_owner_id = auth.uid());
CREATE POLICY "dispatch_owner_matched" ON dispatch_requests FOR SELECT TO authenticated
  USING (matched_owner_id = auth.uid());
CREATE POLICY "dispatch_operator" ON dispatch_requests FOR SELECT TO authenticated
  USING (assigned_operator_id = auth.uid());

-- call_history: 본인 이력만
CREATE POLICY "call_history_own" ON call_history FOR ALL TO authenticated
  USING (requester_id = auth.uid());

-- commissions: 관련자만
CREATE POLICY "commissions_read" ON commissions FOR SELECT TO authenticated
  USING (
    callcenter_id = auth.uid() OR salesperson_id = auth.uid()
    OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

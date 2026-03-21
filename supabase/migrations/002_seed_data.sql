-- 장비 종류 (8종)
INSERT INTO equipment_types (name, icon, sort_order) VALUES
  ('크레인', '🏗️', 1),
  ('스카이', '🔝', 2),
  ('카고크레인', '🚛', 3),
  ('거미크레인', '🕷️', 4),
  ('펌프카', '💧', 5),
  ('굴삭기', '⛏️', 6),
  ('지게차', '📦', 7),
  ('덤프', '🚚', 8);

-- 크레인 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (1, '25T', 1), (1, '50T', 2), (1, '70T', 3), (1, '100T', 4), (1, '200T', 5);

-- 스카이 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (2, '45m', 1), (2, '52m', 2), (2, '58m', 3), (2, '65m', 4);

-- 카고크레인 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (3, '5T', 1), (3, '8T', 2), (3, '11T', 3), (3, '15T', 4), (3, '25T', 5);

-- 거미크레인 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (4, '3T', 1), (4, '5T', 2), (4, '8T', 3), (4, '10T', 4);

-- 펌프카 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (5, '32m', 1), (5, '37m', 2), (5, '42m', 3), (5, '47m', 4), (5, '52m', 5);

-- 굴삭기 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (6, '0.6T', 1), (6, '1T', 2), (6, '3T', 3), (6, '6T', 4),
  (6, '8T', 5), (6, '20T', 6), (6, '30T', 7);

-- 지게차 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (7, '2.5T', 1), (7, '3T', 2), (7, '5T', 3), (7, '7T', 4), (7, '11T', 5);

-- 덤프 규격
INSERT INTO equipment_specs (equipment_type_id, spec_name, sort_order) VALUES
  (8, '15T', 1), (8, '25T', 2);

-- 시간 단위
INSERT INTO time_units (name, hours, sort_order) VALUES
  ('1시간', 1.0, 1),
  ('오전(4h)', 4.0, 2),
  ('오후(4h)', 4.0, 3),
  ('하루(8h)', 8.0, 4);

INSERT INTO owners (iin_hmac, display_name, region) VALUES
  ('hmac_demo_1','Алия Сатыбалды','Алматы'),
  ('hmac_demo_2','Ерлан Касымов','Астана'),
  ('hmac_demo_3','Данияр Абильдин','Шымкент')
ON CONFLICT (iin_hmac) DO NOTHING;

INSERT INTO breeders (kennel_name, kennel_name_kz, registration, region, tier, badges) VALUES
  ('Aday Tazy','Адай Тазы','NZ-0001','Алматы',3,ARRAY['founder','verified']),
  ('Sary Arka Tazy','Сарыарқа Тазы','NZ-0002','Караганда',2,ARRAY['verified']),
  ('Altai Sunqar','Алтай Сұңқар','NZ-0003','ВКО',2,ARRAY['verified'])
ON CONFLICT DO NOTHING;

INSERT INTO dogs (name, name_kz, sex, birthdate, colour, region, public) VALUES
  ('Akku','Аққу','F','2022-04-12','белый','Алматы',true),
  ('Burkit','Бүркіт','M','2021-07-03','палевый','Астана',true),
  ('Sary','Сары','M','2023-02-18','рыжий','Караганда',true),
  ('Aikyn','Айқын','M','2020-11-09','чёрный','Шымкент',true),
  ('Tomiris','Томирис','F','2024-01-30','серый','Алматы',true)
ON CONFLICT DO NOTHING;

INSERT INTO health_tests (dog_id, test_type, lab_or_vet, test_date, result, is_public)
SELECT id, 'OFA-Hips','Almaty Vet Clinic','2024-03-15','Good',true FROM dogs WHERE name='Akku'
UNION ALL SELECT id,'DNA-COI','Astana Genetics','2024-06-01','COI 4.2%',true FROM dogs WHERE name='Burkit'
UNION ALL SELECT id,'Cardiac','Shymkent Vet','2024-09-10','Normal',true FROM dogs WHERE name='Aikyn';

INSERT INTO pedigree_edges (child_id, sire_id, dam_id, source, confidence)
SELECT c.id, s.id, d.id, 'manual', 3
FROM dogs c, dogs s, dogs d
WHERE c.name='Tomiris' AND s.name='Burkit' AND d.name='Akku'
ON CONFLICT DO NOTHING;

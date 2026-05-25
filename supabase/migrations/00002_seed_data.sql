-- Seed data for LinkedOut

-- Posts
insert into posts (name, tag, time, icon, text, reactions, comments_count) values
  ('Ama, Ghosted Since Tuesday', 'Rejected but moisturized', '12m', 'InboxIcon', 'Just received a rejection email for a job I forgot I applied to. Honestly, closure is closure.', 2400, 2),
  ('Kwesi, CV Version 19_Final_FINAL', 'Open to suffering', '48m', 'TrophyIcon', 'Entry-level role. Requirements: 8 years experience, PhD, ability to tame dragons, and proficiency in Excel. Salary: exposure.', 5800, 1),
  ('Nana, Interview Stage 7 Survivor', 'Emotionally available to recruiters', '2h', 'FaceFrownIcon', 'The recruiter said "we''re like a family here" and suddenly I remembered I have boundaries.', 1100, 0);

-- Comments
insert into comments (post_id, name, text, time)
  select id, 'GhostedMango402', 'Closure is a myth but I''ll take what I can get.', '8m' from posts where text like '%closure is closure%'
  union all
  select id, 'TiredTeapot567', 'The fact that you forgot says everything about this market.', '5m' from posts where text like '%closure is closure%'
  union all
  select id, 'StillWaitingMicrowave123', 'I saw that same listing. They want a unicorn for exposure bucks.', '30m' from posts where text like '%entry-level%';

-- Messages
insert into messages (name, preview, time) values
  ('Kojo', 'That rejection email looked auto-generated. You were better than that role anyway.', 'now'),
  ('Nana', 'If you got a reply today, even a rejection, count that as movement.', '14m'),
  ('Yaw', 'That recruiter used "circle back" three times on one call.', '1h');

-- Message replies
insert into message_replies (message_id, name, text, time)
  select id, 'You', 'I know right? At least they replied I guess...', 'now'
  from messages where name = 'Kojo';

-- Jobs
insert into jobs (company, title, salary, requirements, description, applicants, posted, urgent) values
  ('Startupify Inc.', 'Senior Excel Ninja (Unpaid)', '0 — exposure',
   array['10+ years experience with pivot tables', 'Black belt in VLOOKUP', 'Willing to work for "culture"', 'Must provide your own laptop'],
   'We''re looking for a rockstar who lives and breathes spreadsheets.', 847, '2h ago', true),
  ('Synergy Corp', 'Chief Happiness Officer', 'Free snacks',
   array['Must smile constantly', 'No experience necessary', 'Must bring your own happiness', 'Knowledge of "fun" required'],
   'We need someone to stand by the coffee machine and ask people how their weekend was.', 231, '5h ago', false),
  ('DisruptCo', 'Professional Meeting Attender', '$15/hr (capped at 10hrs/week)',
   array['Available 9-5 for meetings about meetings', 'Must say "circle back" at least 3x per meeting', 'Can type "noted" convincingly', 'No actual decision-making allowed'],
   'You''ll attend 8 hours of meetings daily and produce zero deliverables.', 156, '1d ago', false),
  ('Venture Capital Vibes', 'Junior Blockchain Evangelist', 'Unpaid (equity: 0.0001%)',
   array['Must use "Web3" in every sentence', 'NFT collection preferred but not required', 'Hoodie mandatory'],
   'We''re disrupting the lemonade industry with blockchain technology.', 412, '3d ago', false),
  ('HR Nightmares Ltd', 'Talent Acquisition Specialist (Ghosting)', 'Based on "vibes"',
   array['Must enjoy reading applications and never responding', 'Proficient in auto-generated rejection emails', 'Must use the phrase "we''ll keep your resume on file"'],
   'Do you love power? Join our HR team where you''ll post fake job listings.', 89, '4d ago', true);

-- Notifications
insert into notifications (icon, text, time, read) values
  ('ghost', '3 people ghosted you today. Classic.', '12m', false),
  ('eye', 'A recruiter viewed your profile and kept scrolling.', '45m', false),
  ('reject', 'You''ve been rejected from a job you don''t remember applying to.', '2h', false),
  ('view', 'Your application was viewed. They immediately closed the tab.', '4h', false),
  ('coffee', 'No interviews today. Have you considered becoming a barista?', '6h', true),
  ('ghost', 'The recruiter who said "I''ll call you next week" has entered witness protection.', '1d', true);

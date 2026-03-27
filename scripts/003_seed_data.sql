-- Seed Site Images
insert into public.site_images (page, section, image_url, alt_text, sort_order) values
  ('home', 'hero', '/football-academy.jpg', 'Young football players training at Olympic Monaf Sport Academy', 1),
  ('about', 'main', '/modern-football-academy-building.jpg', 'Olympic Monaf Sport Academy building', 1),
  ('about', 'training', '/football-player-training.jpg', 'Player training at OMSA', 2),
  ('programs', 'sport-etudes', '/football-academy.jpg', 'Sport-Etudes program training', 1),
  ('programs', 'boarding', '/boarding-academy-dormitory.jpg', 'Academy boarding facilities', 2),
  ('programs', 'day', '/football-player-training.jpg', 'Day program training session', 3)
on conflict (page, section) do nothing;

-- Seed News Articles
insert into public.news_articles (title, excerpt, content, category, featured_image_url, author, is_published, published_at) values
  ('U17 Team Wins Regional Championship', 'Our U17 squad demonstrated exceptional teamwork and skill to claim the regional title.', 'The OMSA U17 team has won the Cameroon Regional Youth Championship after a thrilling final match. The team displayed outstanding coordination and determination throughout the tournament, securing a 3-1 victory in the final. Coach Mbarga praised the players for their dedication during training sessions that prepared them for this achievement.', 'results', '/football-academy.jpg', 'OMSA Admin', true, now() - interval '2 days'),
  ('New Training Facilities Opening Soon', 'State-of-the-art training grounds will be available for all academy players by next month.', 'Olympic Monaf Sport Academy is proud to announce the upcoming opening of our new training facilities. The expanded grounds include a full-size synthetic pitch, a covered training area for rainy season sessions, and an upgraded gymnasium. These improvements reflect our commitment to providing the best possible environment for young football talent development.', 'announcement', '/modern-football-academy-building.jpg', 'OMSA Admin', true, now() - interval '5 days'),
  ('Registration Open for 2025-2026 Season', 'Applications are now being accepted for all age categories for the upcoming season.', 'We are excited to announce that registration for the 2025-2026 season is now open. We welcome applications for all categories from U9 through Senior. Our programs include Sport-Etudes, Boarding, and Day options to suit different needs. Visit our registration page or contact the academy office for more information.', 'announcement', '/football-player-training.jpg', 'OMSA Admin', true, now() - interval '10 days');

-- Seed Staff Members
insert into public.staff_members (full_name, position, role, email, phone, bio, profile_image_url, sort_order, is_active) values
  ('Jean-Pierre Mbarga', 'Head Coach', 'Coach', 'jp.mbarga@omsa.cm', '+237 670 000 001', 'CAF A License holder with 15 years of coaching experience in youth development.', '', 1, true),
  ('Paul Essomba', 'Assistant Coach', 'Assistant Coach', 'p.essomba@omsa.cm', '+237 670 000 002', 'Former professional player with Coton Sport, specialized in technical skills development.', '', 2, true),
  ('Marie-Claire Ngo', 'Goalkeeping Coach', 'Coach', 'm.ngo@omsa.cm', '+237 670 000 003', 'National team goalkeeping trainer with expertise in youth goalkeeper development.', '', 3, true),
  ('Dr. Samuel Fouda', 'Team Physician', 'Medical Staff', 's.fouda@omsa.cm', '+237 670 000 004', 'Sports medicine specialist ensuring player health and recovery protocols.', '', 4, true),
  ('Emmanuel Tabi', 'Fitness Coach', 'Coach', 'e.tabi@omsa.cm', '+237 670 000 005', 'Certified strength and conditioning coach focused on age-appropriate athletic development.', '', 5, true),
  ('Francois Kamga', 'Academy Director', 'Management', 'f.kamga@omsa.cm', '+237 670 000 006', 'Oversees all academy operations and strategic development with 20 years in football administration.', '', 0, true);

-- Seed Gallery Items
insert into public.gallery_items (title, description, image_url, media_type, season, category, is_public) values
  ('Training Session - U15', 'Regular training session for U15 players', '/football-academy.jpg', 'photo', '2024-2025', 'training', true),
  ('Match Day - Regional Cup', 'Semi-final of the regional cup tournament', '/football-player-training.jpg', 'photo', '2024-2025', 'matches', true),
  ('Academy Facilities', 'Our modern training grounds and facilities', '/modern-football-academy-building.jpg', 'photo', '2024-2025', 'facilities', true),
  ('Boarding Life', 'Daily life at the academy boarding house', '/boarding-academy-dormitory.jpg', 'photo', '2024-2025', 'campus', true);

-- Seed Events
insert into public.events (title, description, event_date, location, category, status) values
  ('Inter-Academy Tournament', 'Annual tournament featuring top youth academies from the region.', now() + interval '30 days', 'OMSA Main Pitch', 'tournament', 'upcoming'),
  ('Open Day & Trials', 'Open day for prospective players and families to visit the academy and participate in trials.', now() + interval '14 days', 'Olympic Monaf Sport Academy', 'trials', 'upcoming'),
  ('End of Season Awards', 'Celebrating the achievements of our players throughout the season.', now() + interval '60 days', 'OMSA Hall', 'ceremony', 'upcoming');

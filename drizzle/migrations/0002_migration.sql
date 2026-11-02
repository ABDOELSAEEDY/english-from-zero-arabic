
-- U1 practice
insert into public.exercises (unit_id, story_id, quiz_id, order_index, type, question, options, correct_answer, explanation_ar) values
('b0000000-0000-0000-0000-000000000001',null,null,1,'multiple_choice','إيه معنى كلمة "goodbye"؟','["أهلاً","مع السلامة","شكراً","آسف"]','مع السلامة','goodbye بنقولها لما نمشي.'),
('b0000000-0000-0000-0000-000000000001',null,null,2,'fill_blank','I ___ a student.','["am","is","are"]','am','مع I دايماً بنستخدم am.'),
('b0000000-0000-0000-0000-000000000001',null,null,3,'fill_blank','She ___ my friend.','["am","is","are"]','is','مع he/she/it بنستخدم is.'),
('b0000000-0000-0000-0000-000000000001',null,null,4,'fill_blank','They ___ from Egypt.','["am","is","are"]','are','مع you/we/they بنستخدم are.'),
('b0000000-0000-0000-0000-000000000001',null,null,5,'word_order','رتّب الكلمات: اسمك إيه؟','["name","your","What","is"]','What is your name','السؤال بيبدأ بكلمة السؤال What وبعدها is.'),
('b0000000-0000-0000-0000-000000000001',null,null,6,'word_order','رتّب الكلمات: أنا من مصر.','["from","I","Egypt","am"]','I am from Egypt','الترتيب: الفاعل + am + from + المكان.'),
('b0000000-0000-0000-0000-000000000001',null,null,7,'translate_choice','Nice to meet you.','["تصبح على خير","فرصة سعيدة","عامل إيه؟","آسف"]','فرصة سعيدة','بنقولها أول مرة نقابل حد.'),
('b0000000-0000-0000-0000-000000000001',null,null,8,'translate_choice','How are you?','["إنت منين؟","اسمك إيه؟","عامل إيه؟","مع السلامة"]','عامل إيه؟',null),
('b0000000-0000-0000-0000-000000000001',null,null,9,'listening','Good morning','["Good night","Good morning","Good evening","Goodbye"]','Good morning','Good morning = صباح الخير.'),
('b0000000-0000-0000-0000-000000000001',null,null,10,'listening','Thank you','["Thank you","Sorry","Please","Hello"]','Thank you','Thank you = شكراً.'),
('b0000000-0000-0000-0000-000000000001',null,null,11,'multiple_choice','لما حد يقولك "How are you?" ترد بإيه؟','["My name is Ali.","I am fine, thanks.","Goodbye.","I am from Cairo."]','I am fine, thanks.','الرد المناسب إنك تقول حالك.'),
('b0000000-0000-0000-0000-000000000001',null,null,12,'multiple_choice','الاختصار الصحيح لـ "I am" هو:','["I''s","Im''","I''m","Iam"]','I''m','الفاصلة العلوية مكان الحرف المحذوف a.'),
('b0000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001',null,13,'multiple_choice','What is the boy''s name?','["Youssef","Adam","Karim","Omar"]','Adam','الولد قال: My name is Adam.'),
('b0000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001',null,14,'multiple_choice','Where is Youssef from?','["Tanta","Cairo","Giza","Alexandria"]','Giza','يوسف قال: I am from Giza.'),
('b0000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001',null,15,'multiple_choice','Is Adam new at school?','["Yes, he is.","No, he is not."]','Yes, he is.','آدم قال: I am new here, too.');

-- U1 test
insert into public.exercises (unit_id, quiz_id, order_index, type, question, options, correct_answer, explanation_ar) values
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',1,'fill_blank','We ___ friends.','["am","is","are"]','are','we معاها are.'),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',2,'fill_blank','He ___ a teacher.','["am","is","are"]','is','he معاها is.'),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',3,'fill_blank','___ you from Egypt?','["Am","Is","Are"]','Are','السؤال مع you بيبدأ بـ Are.'),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',4,'translate_choice','Good night','["صباح الخير","مساء الخير","تصبح على خير","أهلاً"]','تصبح على خير',null),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',5,'translate_choice','Where are you from?','["إنت منين؟","إنت فين؟","عامل إيه؟","اسمك إيه؟"]','إنت منين؟',null),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',6,'multiple_choice','إيه معنى "please"؟','["آسف","من فضلك","شكراً","صاحب"]','من فضلك',null),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',7,'word_order','رتّب: دي صاحبتي نور.','["my","This","friend","Nour","is"]','This is my friend Nour','This is + الشخص.'),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',8,'word_order','رتّب: أنا مش تعبان.','["not","I","tired","am"]','I am not tired','not بتيجي بعد am.'),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',9,'listening','Nice to meet you','["Nice to meet you","See you later","How are you","Thank you"]','Nice to meet you',null),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',10,'listening','I am a student','["I am a teacher","I am a student","I am from Egypt","I am fine"]','I am a student',null),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',11,'multiple_choice','اختار الجملة الصحيحة:','["She are kind.","She is kind.","She am kind.","She be kind."]','She is kind.','she معاها is.'),
('b0000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001',12,'multiple_choice','"Sorry, I am late." معناها:','["شكراً، أنا جاي","آسف، أنا متأخر","أهلاً، أنا هنا","مع السلامة"]','آسف، أنا متأخر',null);

-- U2 practice
insert into public.exercises (unit_id, story_id, quiz_id, order_index, type, question, options, correct_answer, explanation_ar) values
('b0000000-0000-0000-0000-000000000002',null,null,1,'fill_blank','I have ___ apple.','["a","an"]','an','apple بتبدأ بصوت متحرك، فبنستخدم an.'),
('b0000000-0000-0000-0000-000000000002',null,null,2,'fill_blank','She has ___ cat.','["a","an"]','a','cat بتبدأ بصوت ساكن.'),
('b0000000-0000-0000-0000-000000000002',null,null,3,'fill_blank','I have two ___.','["book","books","a book"]','books','بعد two الاسم يبقى جمع.'),
('b0000000-0000-0000-0000-000000000002',null,null,4,'multiple_choice','جمع كلمة "box" هو:','["boxs","boxes","boxies","box"]','boxes','الكلمات اللي بتنتهي بـ x بنضيف لها es.'),
('b0000000-0000-0000-0000-000000000002',null,null,5,'multiple_choice','جمع كلمة "child" هو:','["childs","childes","children","childrens"]','children','جمع شاذ لازم يتحفظ.'),
('b0000000-0000-0000-0000-000000000002',null,null,6,'translate_choice','The sky is blue.','["السما زرقا.","الشجرة خضرا.","الشمس صفرا.","التفاحة حمرا."]','السما زرقا.',null),
('b0000000-0000-0000-0000-000000000002',null,null,7,'translate_choice','Friday','["الحد","الاتنين","الجمعة","السبت"]','الجمعة',null),
('b0000000-0000-0000-0000-000000000002',null,null,8,'word_order','رتّب: النهارده الاتنين.','["Monday","is","Today"]','Today is Monday','أيام الأسبوع بحرف كبير.'),
('b0000000-0000-0000-0000-000000000002',null,null,9,'word_order','رتّب: لوني المفضل الأخضر.','["color","green","My","is","favorite"]','My favorite color is green',null),
('b0000000-0000-0000-0000-000000000002',null,null,10,'listening','twenty','["twelve","twenty","two","ten"]','twenty','twenty = عشرين.'),
('b0000000-0000-0000-0000-000000000002',null,null,11,'listening','yellow','["yellow","white","red","black"]','yellow','yellow = أصفر.'),
('b0000000-0000-0000-0000-000000000002',null,null,12,'multiple_choice','الأسبوع فيه كام يوم؟ A week has ___ days.','["five","six","seven","ten"]','seven',null),
('b0000000-0000-0000-0000-000000000002','c0000000-0000-0000-0000-000000000002',null,13,'multiple_choice','What day is it in the story?','["Monday","Sunday","Friday","Tuesday"]','Friday','أول جملة: Today is Friday.'),
('b0000000-0000-0000-0000-000000000002','c0000000-0000-0000-0000-000000000002',null,14,'multiple_choice','How many apples does Laila buy?','["one","two","three","five"]','three','She buys three red apples.'),
('b0000000-0000-0000-0000-000000000002','c0000000-0000-0000-0000-000000000002',null,15,'multiple_choice','What color is the cat?','["black","white","yellow","green"]','white','Laila sees a white cat.');

-- U2 test
insert into public.exercises (unit_id, quiz_id, order_index, type, question, options, correct_answer, explanation_ar) values
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',1,'fill_blank','It is ___ egg.','["a","an"]','an','egg بتبدأ بصوت متحرك.'),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',2,'fill_blank','He is ___ doctor.','["a","an"]','a',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',3,'fill_blank','Wait ___ hour, please.','["a","an"]','an','h في hour مش بتتنطق، فالصوت متحرك.'),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',4,'multiple_choice','جمع "bus":','["buss","buses","busies","bus"]','buses',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',5,'multiple_choice','جمع "woman":','["womans","women","womens","woman"]','women','جمع شاذ.'),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',6,'translate_choice','three green trees','["تلات شجرات خضرا","شجرتين خضرا","تلات وردات حمرا","شجرة خضرا"]','تلات شجرات خضرا',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',7,'translate_choice','black','["أبيض","أسود","أزرق","أحمر"]','أسود',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',8,'word_order','رتّب: معايا تلات أقلام.','["three","I","pens","have"]','I have three pens',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',9,'listening','Sunday','["Monday","Sunday","Friday","Saturday"]','Sunday',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',10,'listening','I have five red apples','["I have five red apples","I have four red apples","I have five green apples","I have nine red apples"]','I have five red apples',null),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',11,'multiple_choice','اختار الصح:','["a books","two book","two books","an book"]','two books','الجمع من غير a ومعاه s.'),
('b0000000-0000-0000-0000-000000000002','d0000000-0000-0000-0000-000000000002',12,'multiple_choice','"ten" معناها:','["اتنين","خمسة","عشرة","عشرين"]','عشرة',null);

-- U3 practice
insert into public.exercises (unit_id, story_id, quiz_id, order_index, type, question, options, correct_answer, explanation_ar) values
('b0000000-0000-0000-0000-000000000003',null,null,1,'fill_blank','She ___ two brothers.','["have","has"]','has','مع she بنستخدم has.'),
('b0000000-0000-0000-0000-000000000003',null,null,2,'fill_blank','I ___ a big family.','["have","has"]','have','مع I بنستخدم have.'),
('b0000000-0000-0000-0000-000000000003',null,null,3,'fill_blank','This is Ali. ___ father is a doctor.','["His","Her","My"]','His','علي مذكر، فبنستخدم his.'),
('b0000000-0000-0000-0000-000000000003',null,null,4,'fill_blank','This is Mona. ___ bag is red.','["His","Her","Your"]','Her','منى مؤنث، فبنستخدم her.'),
('b0000000-0000-0000-0000-000000000003',null,null,5,'multiple_choice','"grandmother" معناها:','["خالة","تيتة","أم","أخت"]','تيتة',null),
('b0000000-0000-0000-0000-000000000003',null,null,6,'multiple_choice','أخو أبوك أو أمك اسمه:','["cousin","uncle","son","brother"]','uncle',null),
('b0000000-0000-0000-0000-000000000003',null,null,7,'translate_choice','Her sister is young.','["أختها صغيرة.","أخته صغيرة.","أختي كبيرة.","أمها صغيرة."]','أختها صغيرة.','her = بتاعها.'),
('b0000000-0000-0000-0000-000000000003',null,null,8,'translate_choice','We have a baby.','["عندهم بيبي.","عندنا بيبي.","عندي بيبي.","عنده بيبي."]','عندنا بيبي.',null),
('b0000000-0000-0000-0000-000000000003',null,null,9,'word_order','رتّب: اسم أمي سارة.','["name","mother''s","is","My","Sara"]','My mother''s name is Sara','''s للملكية.'),
('b0000000-0000-0000-0000-000000000003',null,null,10,'word_order','رتّب: هو عنده عربية زرقا.','["blue","He","car","a","has"]','He has a blue car','الصفة blue قبل الاسم car.'),
('b0000000-0000-0000-0000-000000000003',null,null,11,'listening','daughter','["doctor","daughter","father","water"]','daughter','daughter = بنت (ابنة).'),
('b0000000-0000-0000-0000-000000000003',null,null,12,'listening','My cousin is tall','["My cousin is tall","My cousin is small","My uncle is tall","My sister is tall"]','My cousin is tall',null),
('b0000000-0000-0000-0000-000000000003','c0000000-0000-0000-0000-000000000003',null,13,'multiple_choice','What is Salma''s mother''s job?','["doctor","engineer","teacher","nurse"]','teacher','my mother is a teacher.'),
('b0000000-0000-0000-0000-000000000003','c0000000-0000-0000-0000-000000000003',null,14,'multiple_choice','What does Hassan have?','["a red car","a blue bike","a white cat","a big bag"]','a blue bike','he has a blue bike.'),
('b0000000-0000-0000-0000-000000000003','c0000000-0000-0000-0000-000000000003',null,15,'multiple_choice','Who lives with Salma''s family?','["her uncle","her grandmother","her cousin","her aunt"]','her grandmother','My grandmother lives with us.');

-- U3 test
insert into public.exercises (unit_id, quiz_id, order_index, type, question, options, correct_answer, explanation_ar) values
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',1,'fill_blank','They ___ three children.','["have","has"]','have','they معاها have.'),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',2,'fill_blank','My father ___ a new car.','["have","has"]','has','my father = he، فبنستخدم has.'),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',3,'fill_blank','We love ___ grandmother.','["our","their","his"]','our','we ← our.'),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',4,'fill_blank','Does she ___ a sister?','["has","have"]','have','بعد does بنرجع لـ have.'),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',5,'multiple_choice','"aunt" معناها:','["عمة / خالة","عم / خال","جدة","بنت"]','عمة / خالة',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',6,'multiple_choice','عكس "young":','["tall","old","kind","small"]','old',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',7,'translate_choice','Their son is a student.','["ابنهم طالب.","ابني طالب.","بنتهم طالبة.","ابنه طالب."]','ابنهم طالب.',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',8,'translate_choice','Is your brother tall?','["أخوك طويل؟","أختك طويلة؟","أبوك طويل؟","أخويا طويل؟"]','أخوك طويل؟',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',9,'word_order','رتّب: معنديش عربية.','["have","I","a","car","don''t"]','I don''t have a car',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',10,'listening','My grandfather is very kind','["My grandfather is very kind","My grandmother is very kind","My father is very kind","My grandfather is very old"]','My grandfather is very kind',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',11,'listening','family','["family","father","finally","funny"]','family',null),
('b0000000-0000-0000-0000-000000000003','d0000000-0000-0000-0000-000000000003',12,'multiple_choice','اختار الجملة الصحيحة:','["She have a son.","She has a son.","She haves a son.","She is have a son."]','She has a son.',null);

-- PLACEMENT (20)
insert into public.exercises (quiz_id, level_id, order_index, type, question, options, correct_answer, explanation_ar) values
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',1,'fill_blank','I ___ from Egypt.','["am","is","are"]','am',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',2,'translate_choice','Good morning','["صباح الخير","مساء الخير","مع السلامة","شكراً"]','صباح الخير',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',3,'fill_blank','She has ___ orange.','["a","an"]','an',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',4,'multiple_choice','جمع "child":','["childs","children","childes"]','children',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',5,'fill_blank','This is Omar. ___ sister is a doctor.','["His","Her","Its"]','His',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',6,'listening','My favorite color is blue','["My favorite color is blue","My favorite car is blue","My favorite color is black","My father is blue"]','My favorite color is blue',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000001',7,'fill_blank','They ___ two cats.','["has","have","is"]','have',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',8,'fill_blank','Yesterday I ___ to the market.','["go","went","going","goes"]','went','الماضي من go هو went.'),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',9,'fill_blank','He usually ___ coffee in the morning.','["drink","drinks","drinking","drank"]','drinks','المضارع البسيط مع he بياخد s.'),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',10,'fill_blank','Look! The children ___ in the garden.','["play","plays","are playing","played"]','are playing',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',11,'multiple_choice','Cairo is ___ than Luxor.','["big","bigger","biggest","more big"]','bigger',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',12,'fill_blank','There isn''t ___ milk in the fridge.','["some","any","a","many"]','any',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',13,'translate_choice','I am going to visit my aunt tomorrow.','["هزور خالتي بكرة.","زرت خالتي امبارح.","بزور خالتي كل يوم.","كنت بزور خالتي."]','هزور خالتي بكرة.',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000002',14,'fill_blank','We ___ watch TV last night.','["don''t","didn''t","doesn''t","aren''t"]','didn''t',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000003',15,'fill_blank','I have lived in Alexandria ___ 2015.','["for","since","from","at"]','since',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000003',16,'fill_blank','If it rains, we ___ at home.','["stay","will stay","stayed","would stay"]','will stay',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000003',17,'fill_blank','She was cooking when the phone ___.','["rings","rang","was ringing","has rung"]','rang',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000003',18,'multiple_choice','This book ___ by a famous writer.','["wrote","was written","is writing","writes"]','was written',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000003',19,'fill_blank','You ___ wear a seatbelt. It is the law.','["must","might","could","would"]','must',null),
('d0000000-0000-0000-0000-000000000010','a0000000-0000-0000-0000-000000000003',20,'translate_choice','I have never been to Paris.','["عمري ما رحت باريس.","رحت باريس السنة اللي فاتت.","هروح باريس قريب.","أنا في باريس دلوقتي."]','عمري ما رحت باريس.',null);

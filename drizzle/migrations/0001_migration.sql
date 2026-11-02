
insert into public.levels (id, code, title_ar, title_en, description_ar, order_index) values
('a0000000-0000-0000-0000-000000000001','A1','المبتدئ','Beginner','هتبدأ من الصفر: التحيات، الأرقام، الألوان، والعيلة. أساس قوي لكل اللي جاي.',1),
('a0000000-0000-0000-0000-000000000002','A2','الأساسي','Elementary','هتتكلم عن يومك، الأكل، التسوق، والأماكن بجمل بسيطة.',2),
('a0000000-0000-0000-0000-000000000003','B1','المتوسط','Intermediate','هتحكي عن تجاربك، وتفهم قصص ومحادثات أطول.',3),
('a0000000-0000-0000-0000-000000000004','B2','فوق المتوسط','Upper Intermediate','هتناقش آراء وموضوعات أعمق بثقة وطلاقة.',4),
('a0000000-0000-0000-0000-000000000005','C1','المتقدم','Advanced','هتستخدم الإنجليزي بمرونة في الشغل والدراسة.',5);

insert into public.units (id, level_id, order_index, title_en, title_ar, description_ar, icon) values
('b0000000-0000-0000-0000-000000000001','a0000000-0000-0000-0000-000000000001',1,'Greetings & Introductions','التحيات والتعارف','إزاي تسلّم على الناس وتعرّفهم بنفسك، ومعاها فعل "to be".','👋'),
('b0000000-0000-0000-0000-000000000002','a0000000-0000-0000-0000-000000000001',2,'Numbers, Days & Colors','الأرقام والأيام والألوان','الأرقام من ١ لـ ٢٠، أيام الأسبوع، والألوان، ومعاها a/an والجمع.','🎨'),
('b0000000-0000-0000-0000-000000000003','a0000000-0000-0000-0000-000000000001',3,'Family & People','العيلة والناس','أفراد العيلة ووصف الناس، ومعاها my/your/his/her و has/have.','👨‍👩‍👧');

-- UNIT 1 VOCAB
insert into public.vocabulary (unit_id, order_index, word, translation_ar, part_of_speech, example_en, example_ar, phonetic) values
('b0000000-0000-0000-0000-000000000001',1,'hello','أهلاً / مرحباً','interjection','Hello, my name is Omar.','أهلاً، اسمي عمر.','/həˈloʊ/'),
('b0000000-0000-0000-0000-000000000001',2,'hi','هاي / أهلاً (غير رسمي)','interjection','Hi, Sara! How are you?','هاي يا سارة! عاملة إيه؟','/haɪ/'),
('b0000000-0000-0000-0000-000000000001',3,'goodbye','مع السلامة','interjection','Goodbye, see you tomorrow.','مع السلامة، أشوفك بكرة.','/ɡʊdˈbaɪ/'),
('b0000000-0000-0000-0000-000000000001',4,'good morning','صباح الخير','phrase','Good morning, teacher!','صباح الخير يا أستاذ!','/ɡʊd ˈmɔːrnɪŋ/'),
('b0000000-0000-0000-0000-000000000001',5,'good evening','مساء الخير','phrase','Good evening, everyone.','مساء الخير يا جماعة.','/ɡʊd ˈiːvnɪŋ/'),
('b0000000-0000-0000-0000-000000000001',6,'good night','تصبح على خير','phrase','Good night, Mom.','تصبحي على خير يا ماما.','/ɡʊd naɪt/'),
('b0000000-0000-0000-0000-000000000001',7,'name','اسم','noun','What is your name?','اسمك إيه؟','/neɪm/'),
('b0000000-0000-0000-0000-000000000001',8,'nice to meet you','فرصة سعيدة / تشرفنا','phrase','I am Ali. Nice to meet you.','أنا علي. فرصة سعيدة.','/naɪs tə miːt juː/'),
('b0000000-0000-0000-0000-000000000001',9,'how are you','إزيك / عامل إيه','phrase','Hi Ahmed, how are you?','أهلاً يا أحمد، عامل إيه؟','/haʊ ɑːr juː/'),
('b0000000-0000-0000-0000-000000000001',10,'fine','كويس / تمام','adjective','I am fine, thank you.','أنا كويس، شكراً.','/faɪn/'),
('b0000000-0000-0000-0000-000000000001',11,'thank you','شكراً','phrase','Thank you for your help.','شكراً على مساعدتك.','/ˈθæŋk juː/'),
('b0000000-0000-0000-0000-000000000001',12,'please','من فضلك / لو سمحت','adverb','Sit down, please.','اقعد لو سمحت.','/pliːz/'),
('b0000000-0000-0000-0000-000000000001',13,'sorry','آسف','adjective','Sorry, I am late.','آسف، أنا متأخر.','/ˈsɑːri/'),
('b0000000-0000-0000-0000-000000000001',14,'friend','صاحب / صديق','noun','Mona is my friend.','منى صاحبتي.','/frend/'),
('b0000000-0000-0000-0000-000000000001',15,'teacher','مدرس / مدرسة','noun','She is a teacher.','هي مدرسة.','/ˈtiːtʃər/'),
('b0000000-0000-0000-0000-000000000001',16,'student','طالب / طالبة','noun','I am a student.','أنا طالب.','/ˈstuːdənt/'),
('b0000000-0000-0000-0000-000000000001',17,'from','من (بلد/مكان)','preposition','I am from Egypt.','أنا من مصر.','/frʌm/');

insert into public.sentences (unit_id, order_index, text_en, text_ar, note_ar) values
('b0000000-0000-0000-0000-000000000001',1,'Hello! My name is Karim.','أهلاً! اسمي كريم.','"My name is" هي أسهل طريقة تقول بيها اسمك.'),
('b0000000-0000-0000-0000-000000000001',2,'What is your name?','اسمك إيه؟','في السؤال الإنجليزي، كلمة السؤال What بتيجي في الأول.'),
('b0000000-0000-0000-0000-000000000001',3,'Nice to meet you, too.','وأنا كمان اتشرفت بيك.','too في الآخر معناها "كمان".'),
('b0000000-0000-0000-0000-000000000001',4,'How are you today?','عامل إيه النهارده؟',null),
('b0000000-0000-0000-0000-000000000001',5,'I am fine, thanks. And you?','أنا كويس، شكراً. وإنت؟','thanks هي طريقة أبسط من thank you.'),
('b0000000-0000-0000-0000-000000000001',6,'Where are you from?','إنت منين؟','from بتيجي في آخر السؤال.'),
('b0000000-0000-0000-0000-000000000001',7,'I am from Cairo, Egypt.','أنا من القاهرة، مصر.',null),
('b0000000-0000-0000-0000-000000000001',8,'This is my friend, Nour.','دي صاحبتي، نور.','This is بنستخدمها لما نعرّف حد على حد.'),
('b0000000-0000-0000-0000-000000000001',9,'Good morning! Have a nice day.','صباح الخير! يومك سعيد.',null),
('b0000000-0000-0000-0000-000000000001',10,'Goodbye! See you later.','مع السلامة! أشوفك بعدين.','See you later = أشوفك بعدين.');

insert into public.grammar_lessons (unit_id, title_ar, explanation_ar, examples) values
('b0000000-0000-0000-0000-000000000001','فعل الكينونة: to be (am / is / are)',
'## يعني إيه to be؟

في العربي بنقول "أنا مصري" من غير فعل في النص. لكن في الإنجليزي **لازم** نحط فعل بين الشخص والوصف، والفعل ده هو **to be**.

## الأشكال التلاتة

| الضمير | الفعل | مثال |
|---|---|---|
| I (أنا) | **am** | I am a student |
| you / we / they (إنت / إحنا / هم) | **are** | You are kind |
| he / she / it (هو / هي / لغير العاقل) | **is** | She is a teacher |

## الاختصار

في الكلام بنختصر كتير:
- I am ← **I''m**
- you are ← **you''re**
- he is ← **he''s**

## النفي والسؤال

- النفي: نحط **not** بعد الفعل: I am **not** tired.
- السؤال: نقدّم الفعل: **Are** you from Egypt?

> نصيحة: احفظ القاعدة دي: **I am – He/She/It is – You/We/They are**.',
'[{"en":"I am Omar.","ar":"أنا عمر."},{"en":"You are my friend.","ar":"إنت صاحبي."},{"en":"He is a doctor.","ar":"هو دكتور."},{"en":"She is from Alexandria.","ar":"هي من إسكندرية."},{"en":"We are students.","ar":"إحنا طلبة."},{"en":"Are you fine? Yes, I am.","ar":"إنت كويس؟ أيوه."}]'::jsonb);

insert into public.stories (id, unit_id, title_en, title_ar, body_en, body_ar) values
('c0000000-0000-0000-0000-000000000001','b0000000-0000-0000-0000-000000000001','A New Friend','صاحب جديد',
'Today is my first day at school.
A boy says, "Hello! My name is Adam."
I say, "Hi, Adam. I am Youssef. Nice to meet you."
Adam smiles and says, "Nice to meet you, too."
"Where are you from?" he asks.
"I am from Giza. And you?"
"I am from Tanta. I am new here, too."
Now Adam is my new friend.',
'النهارده أول يوم ليا في المدرسة.
ولد بيقول: "أهلاً! اسمي آدم."
أنا بقول: "هاي يا آدم. أنا يوسف. فرصة سعيدة."
آدم بيبتسم وبيقول: "وأنا كمان اتشرفت بيك."
بيسألني: "إنت منين؟"
"أنا من الجيزة. وإنت؟"
"أنا من طنطا. أنا كمان جديد هنا."
دلوقتي آدم بقى صاحبي الجديد.');

-- UNIT 2
insert into public.vocabulary (unit_id, order_index, word, translation_ar, part_of_speech, example_en, example_ar, phonetic) values
('b0000000-0000-0000-0000-000000000002',1,'one','واحد','number','I have one brother.','عندي أخ واحد.','/wʌn/'),
('b0000000-0000-0000-0000-000000000002',2,'two','اتنين','number','I have two cats.','عندي قطتين.','/tuː/'),
('b0000000-0000-0000-0000-000000000002',3,'three','تلاتة','number','There are three apples.','فيه تلات تفاحات.','/θriː/'),
('b0000000-0000-0000-0000-000000000002',4,'five','خمسة','number','I work five days a week.','بشتغل خمس أيام في الأسبوع.','/faɪv/'),
('b0000000-0000-0000-0000-000000000002',5,'ten','عشرة','number','The class has ten students.','الفصل فيه عشر طلبة.','/ten/'),
('b0000000-0000-0000-0000-000000000002',6,'twenty','عشرين','number','She is twenty years old.','هي عندها عشرين سنة.','/ˈtwenti/'),
('b0000000-0000-0000-0000-000000000002',7,'Monday','الاتنين','noun','I go to the gym on Monday.','بروح الجيم يوم الاتنين.','/ˈmʌndeɪ/'),
('b0000000-0000-0000-0000-000000000002',8,'Friday','الجمعة','noun','Friday is a holiday in Egypt.','الجمعة أجازة في مصر.','/ˈfraɪdeɪ/'),
('b0000000-0000-0000-0000-000000000002',9,'Sunday','الحد','noun','School starts on Sunday.','المدرسة بتبدأ يوم الحد.','/ˈsʌndeɪ/'),
('b0000000-0000-0000-0000-000000000002',10,'day','يوم','noun','Have a good day!','يومك سعيد!','/deɪ/'),
('b0000000-0000-0000-0000-000000000002',11,'week','أسبوع','noun','A week has seven days.','الأسبوع فيه سبع أيام.','/wiːk/'),
('b0000000-0000-0000-0000-000000000002',12,'red','أحمر','adjective','The apple is red.','التفاحة حمرا.','/red/'),
('b0000000-0000-0000-0000-000000000002',13,'blue','أزرق','adjective','The sky is blue.','السما زرقا.','/bluː/'),
('b0000000-0000-0000-0000-000000000002',14,'green','أخضر','adjective','The tree is green.','الشجرة خضرا.','/ɡriːn/'),
('b0000000-0000-0000-0000-000000000002',15,'yellow','أصفر','adjective','The sun is yellow.','الشمس صفرا.','/ˈjeloʊ/'),
('b0000000-0000-0000-0000-000000000002',16,'black','أسود','adjective','My bag is black.','شنطتي سودا.','/blæk/'),
('b0000000-0000-0000-0000-000000000002',17,'white','أبيض','adjective','The cat is white.','القطة بيضا.','/waɪt/'),
('b0000000-0000-0000-0000-000000000002',18,'color','لون','noun','What is your favorite color?','إيه لونك المفضل؟','/ˈkʌlər/');

insert into public.sentences (unit_id, order_index, text_en, text_ar, note_ar) values
('b0000000-0000-0000-0000-000000000002',1,'I have two brothers and one sister.','عندي أخين وأخت واحدة.','بعد two بنضيف s للجمع: brothers.'),
('b0000000-0000-0000-0000-000000000002',2,'How old are you? I am twenty.','عندك كام سنة؟ عندي عشرين.','في الإنجليزي بنستخدم am للسن، مش have.'),
('b0000000-0000-0000-0000-000000000002',3,'Today is Monday.','النهارده الاتنين.','أيام الأسبوع دايماً بتبدأ بحرف كبير.'),
('b0000000-0000-0000-0000-000000000002',4,'What day is it today?','النهارده إيه؟',null),
('b0000000-0000-0000-0000-000000000002',5,'My favorite color is blue.','لوني المفضل الأزرق.',null),
('b0000000-0000-0000-0000-000000000002',6,'I have an orange and a banana.','معايا برتقانة وموزة.','an قبل الكلمة اللي بتبدأ بصوت حرف متحرك: an orange.'),
('b0000000-0000-0000-0000-000000000002',7,'There are seven days in a week.','فيه سبع أيام في الأسبوع.',null),
('b0000000-0000-0000-0000-000000000002',8,'The car is red, and the bus is yellow.','العربية حمرا، والأتوبيس أصفر.','الصفة في الإنجليزي بتيجي بعد is أو قبل الاسم: a red car.'),
('b0000000-0000-0000-0000-000000000002',9,'I have three new pens.','معايا تلات أقلام جديدة.',null),
('b0000000-0000-0000-0000-000000000002',10,'See you on Friday!','أشوفك يوم الجمعة!','مع الأيام بنستخدم on.');

insert into public.grammar_lessons (unit_id, title_ar, explanation_ar, examples) values
('b0000000-0000-0000-0000-000000000002','a / an والجمع',
'## a و an يعني إيه؟

الاتنين معناهم **"واحد"** أو أداة نكرة. بنستخدمهم مع اسم **مفرد** نقدر نعده.

## إمتى a وإمتى an؟

- **a** قبل كلمة بتبدأ **بصوت ساكن**: a book، a car، a pen
- **an** قبل كلمة بتبدأ **بصوت متحرك** (a, e, i, o, u): an apple، an egg، an orange

> المهم **الصوت** مش الحرف: an hour (لأن h مش بتتنطق)، و a university (لأنها بتتنطق "يو").

## الجمع

القاعدة العامة: نضيف **s** للاسم:
- one book ← two book**s**
- one car ← three car**s**

لو الكلمة بتنتهي بـ s / sh / ch / x نضيف **es**:
- bus ← bus**es**، box ← box**es**

لو بتنتهي بحرف ساكن + y، نشيل y ونضيف **ies**:
- baby ← bab**ies**

## جمع شاذ (احفظه)

- man ← **men**
- woman ← **women**
- child ← **children**

> ملاحظة: مع الجمع **مش** بنستخدم a أو an: ~~a books~~ ← books.',
'[{"en":"a cat","ar":"قطة"},{"en":"an apple","ar":"تفاحة"},{"en":"an hour","ar":"ساعة (وقت)"},{"en":"two cats","ar":"قطتين"},{"en":"three boxes","ar":"تلات صناديق"},{"en":"two children","ar":"طفلين"}]'::jsonb);

insert into public.stories (id, unit_id, title_en, title_ar, body_en, body_ar) values
('c0000000-0000-0000-0000-000000000002','b0000000-0000-0000-0000-000000000002','Laila at the Market','ليلى في السوق',
'Today is Friday.
Laila goes to the market with her mother.
She buys three red apples and an orange.
Her mother buys two big bags.
One bag is green, and one bag is blue.
Laila sees a white cat near the shop.
"Look, Mom! A cat!" she says.
They go home at five o''clock.',
'النهارده الجمعة.
ليلى بتروح السوق مع مامتها.
بتشتري تلات تفاحات حمرا وبرتقانة.
مامتها بتشتري شنطتين كبار.
شنطة خضرا، وشنطة زرقا.
ليلى بتشوف قطة بيضا جنب المحل.
بتقول: "بصي يا ماما! قطة!"
بيرجعوا البيت الساعة خمسة.');

-- UNIT 3
insert into public.vocabulary (unit_id, order_index, word, translation_ar, part_of_speech, example_en, example_ar, phonetic) values
('b0000000-0000-0000-0000-000000000003',1,'family','عيلة / أسرة','noun','I love my family.','بحب عيلتي.','/ˈfæməli/'),
('b0000000-0000-0000-0000-000000000003',2,'mother','أم','noun','My mother is a nurse.','أمي ممرضة.','/ˈmʌðər/'),
('b0000000-0000-0000-0000-000000000003',3,'father','أب','noun','My father has a car.','أبويا عنده عربية.','/ˈfɑːðər/'),
('b0000000-0000-0000-0000-000000000003',4,'brother','أخ','noun','My brother is tall.','أخويا طويل.','/ˈbrʌðər/'),
('b0000000-0000-0000-0000-000000000003',5,'sister','أخت','noun','Her sister is a student.','أختها طالبة.','/ˈsɪstər/'),
('b0000000-0000-0000-0000-000000000003',6,'son','ابن','noun','They have one son.','عندهم ابن واحد.','/sʌn/'),
('b0000000-0000-0000-0000-000000000003',7,'daughter','بنت (ابنة)','noun','His daughter is five.','بنته عندها خمس سنين.','/ˈdɔːtər/'),
('b0000000-0000-0000-0000-000000000003',8,'grandmother','جدة / تيتة','noun','My grandmother lives with us.','تيتة عايشة معانا.','/ˈɡrænmʌðər/'),
('b0000000-0000-0000-0000-000000000003',9,'grandfather','جد / جدو','noun','My grandfather is seventy.','جدو عنده سبعين سنة.','/ˈɡrænfɑːðər/'),
('b0000000-0000-0000-0000-000000000003',10,'uncle','عم / خال','noun','My uncle lives in Aswan.','عمي عايش في أسوان.','/ˈʌŋkl/'),
('b0000000-0000-0000-0000-000000000003',11,'aunt','عمة / خالة','noun','My aunt has two cats.','خالتي عندها قطتين.','/ænt/'),
('b0000000-0000-0000-0000-000000000003',12,'cousin','ابن/بنت العم أو الخال','noun','My cousin is my best friend.','ابن عمي أعز صحابي.','/ˈkʌzn/'),
('b0000000-0000-0000-0000-000000000003',13,'baby','بيبي / طفل رضيع','noun','The baby is sleeping.','البيبي نايم.','/ˈbeɪbi/'),
('b0000000-0000-0000-0000-000000000003',14,'man','راجل','noun','The man is a driver.','الراجل سواق.','/mæn/'),
('b0000000-0000-0000-0000-000000000003',15,'woman','ست','noun','The woman is a doctor.','الست دكتورة.','/ˈwʊmən/'),
('b0000000-0000-0000-0000-000000000003',16,'tall','طويل','adjective','My father is tall.','أبويا طويل.','/tɔːl/'),
('b0000000-0000-0000-0000-000000000003',17,'young','صغير في السن','adjective','My sister is young.','أختي صغيرة.','/jʌŋ/'),
('b0000000-0000-0000-0000-000000000003',18,'old','كبير في السن / قديم','adjective','My grandfather is old.','جدو كبير في السن.','/oʊld/');

insert into public.sentences (unit_id, order_index, text_en, text_ar, note_ar) values
('b0000000-0000-0000-0000-000000000003',1,'This is my family.','دي عيلتي.',null),
('b0000000-0000-0000-0000-000000000003',2,'My mother is a teacher.','أمي مدرسة.','my = بتاعي، وبتيجي قبل الاسم.'),
('b0000000-0000-0000-0000-000000000003',3,'I have one brother and two sisters.','عندي أخ واحد وأختين.','مع I بنستخدم have.'),
('b0000000-0000-0000-0000-000000000003',4,'He has a big family.','هو عنده عيلة كبيرة.','مع he/she/it بنستخدم has.'),
('b0000000-0000-0000-0000-000000000003',5,'Her name is Mariam.','اسمها مريم.','her = بتاعها.'),
('b0000000-0000-0000-0000-000000000003',6,'His father is a doctor.','أبوه دكتور.','his = بتاعه.'),
('b0000000-0000-0000-0000-000000000003',7,'Do you have any cousins?','عندك ولاد عم أو خال؟',null),
('b0000000-0000-0000-0000-000000000003',8,'My grandmother is very kind.','تيتة طيبة جداً.',null),
('b0000000-0000-0000-0000-000000000003',9,'Our house is small but happy.','بيتنا صغير بس مليان سعادة.','our = بتاعنا.'),
('b0000000-0000-0000-0000-000000000003',10,'What is your sister''s name?','أختك اسمها إيه؟','''s معناها ملكية: sister''s name = اسم أختك.');

insert into public.grammar_lessons (unit_id, title_ar, explanation_ar, examples) values
('b0000000-0000-0000-0000-000000000003','صفات الملكية و has / have',
'## صفات الملكية (بتاعي، بتاعك...)

في العربي بنضيف حرف للكلمة: كتاب**ي**، كتاب**ك**. في الإنجليزي بنحط كلمة **قبل** الاسم:

| الضمير | صفة الملكية | مثال |
|---|---|---|
| I | **my** (بتاعي) | my book = كتابي |
| you | **your** (بتاعك) | your name = اسمك |
| he | **his** (بتاعه) | his car = عربيته |
| she | **her** (بتاعها) | her bag = شنطتها |
| we | **our** (بتاعنا) | our house = بيتنا |
| they | **their** (بتاعهم) | their son = ابنهم |

> his للمذكر و her للمؤنث، حسب **صاحب** الحاجة مش الحاجة نفسها.

## has و have (عنده / عندي)

- **have** مع: I / you / we / they ← I **have** a sister.
- **has** مع: he / she / it ← She **has** a brother.

## النفي والسؤال

- النفي: I **don''t have** a car. / He **doesn''t have** a car.
- السؤال: **Do** you have a pen? / **Does** she have a cat?

> بعد doesn''t و does بنرجع لـ **have** مش has.',
'[{"en":"My name is Hana.","ar":"اسمي هنا."},{"en":"Your bag is red.","ar":"شنطتك حمرا."},{"en":"His brother is tall.","ar":"أخوه طويل."},{"en":"Her mother is a doctor.","ar":"أمها دكتورة."},{"en":"I have two sisters.","ar":"عندي أختين."},{"en":"She has a baby.","ar":"هي عندها بيبي."}]'::jsonb);

insert into public.stories (id, unit_id, title_en, title_ar, body_en, body_ar) values
('c0000000-0000-0000-0000-000000000003','b0000000-0000-0000-0000-000000000003','My Big Family','عيلتي الكبيرة',
'My name is Salma, and I have a big family.
My father is an engineer, and my mother is a teacher.
I have one brother. His name is Hassan.
Hassan is tall, and he has a blue bike.
My grandmother lives with us. She is old but very kind.
My uncle has two children.
Their names are Ziad and Malak.
On Friday, we all eat lunch together.',
'اسمي سلمى، وعندي عيلة كبيرة.
أبويا مهندس، وأمي مدرسة.
عندي أخ واحد. اسمه حسن.
حسن طويل، وعنده عجلة زرقا.
تيتة عايشة معانا. هي كبيرة في السن بس طيبة جداً.
عمي عنده طفلين.
أساميهم زياد وملك.
يوم الجمعة، بناكل الغدا كلنا مع بعض.');

insert into public.quizzes (id, unit_id, level_id, kind, title) values
('d0000000-0000-0000-0000-000000000001','b0000000-0000-0000-0000-000000000001',null,'unit_test','اختبار الوحدة ١: التحيات والتعارف'),
('d0000000-0000-0000-0000-000000000002','b0000000-0000-0000-0000-000000000002',null,'unit_test','اختبار الوحدة ٢: الأرقام والأيام والألوان'),
('d0000000-0000-0000-0000-000000000003','b0000000-0000-0000-0000-000000000003',null,'unit_test','اختبار الوحدة ٣: العيلة والناس'),
('d0000000-0000-0000-0000-000000000010',null,null,'placement','اختبار تحديد المستوى');

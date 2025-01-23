![alt text](./images/image.png)
SELECT t.name as 'Vārds',
t.surname as 'Uzvārds',
CONCAT(t.name, ' ', t.surname) AS 'Vārds, Uzvārds',
CONCAT(t.position_title, ' ', t.name, ' ', t.surname) AS 'Amats,Vārds, Uzvārds',
aStaff.cp_for_autumn AS 'KP pilnai slodzei',
w.cp_proportion_on_fulltime AS 'Slodzes daļa',
t.position_title AS 'Amata nosaukums',
aStaff.rank_name AS 'amata grupa',
s.status_name AS 'statuss',
w.include_in_budget AS 'Iekļaut budžetā',
fstaff.faculty_name AS 'pasniedzēja fakultāte',
w.semester AS 'semestris',
co.name AS 'Priekšmeta nosaukums',
w.credit_points_per_hour AS 'Progr. koef. KP/stundas',
co.credit_points AS 'Priekšmeta kp',
w.credit_points_per_group AS 'KP skaits grupai',
w.group_amount AS 'grupu skaits',
w.contact_hours AS 'Kontaktstundas',
co.course_id AS 'LAIS kods',
co.section AS 'Programmas daļa',
co.registration_type AS 'Reģistrācija',
fCourse.faculty_name AS 'Priekšmeta fakultāte',
fClass.faculty_name AS 'kursa fakultāte',
cl.program AS 'Programma',
co.study_level AS 'Studiju līmenis',
cl.name AS 'Grupa semestra grafikam',
w.comments AS 'Komentāri',
w.budget_position AS 'budžeta pozīcija',
cl.student_amount AS 'Studentu skaits',
aStaff.salary AS 'Alga',
w.industry_coefficiant AS 'Nozares koef.',
w.salary_per_month AS 'Alga mēnesī',
w.include_in_budget AS 'Vai atvaļinājums ieskaitās',
w.month_amount AS 'Mēnešu skaits',
w.expected_salary AS 'Algai paredzētais'

FROM workload AS w
JOIN teaching_staff AS t ON w.teaching_staff_id = t.teaching_staff_id
JOIN class AS cl ON cl.class_id = w.class_id
JOIN status_type AS s ON s.status_type_id = w.status_type_id
JOIN course AS co ON co.course_id = w.course_id
JOIN academic_rank AS aCourse ON aCourse.academic_rank_id = co.necessary_academic_rank_id
JOIN academic_rank AS aStaff ON aStaff.academic_rank_id = w.academic_rank_id
JOIN faculty AS fStaff ON fstaff.faculty_id = t.staff_faculty_id
JOIN faculty AS fCourse ON fCourse.faculty_id = co.necessary_academic_rank_id
JOIN faculty AS fClass ON fClass.faculty_id = cl.class_faculty_id

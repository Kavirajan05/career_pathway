USE prodigy_pathways;

INSERT INTO questions (domain, topic, difficulty, question, options, correctAnswer, explanation, resources, tags) VALUES
('programming', 'HTML', 'easy', 'What does HTML stand for?', 
 '["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"]', 
 0, 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
 '{"youtube": "https://www.youtube.com/results?search_query=html+basics+tutorial", "website": "https://www.w3schools.com/html/", "course": "https://www.codecademy.com/learn/learn-html"}',
 '["html", "web", "basics"]'),

('programming', 'JavaScript', 'easy', 'Which symbol is used for single-line comments in JavaScript?', 
 '["//"," /*", "#", "--"]', 
 0, 'JavaScript uses // for single-line comments and /* */ for multi-line comments.',
 '{"youtube": "https://www.youtube.com/results?search_query=javascript+comments", "website": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#comments", "course": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"}',
 '["javascript", "syntax", "comments"]'),

('programming', 'CSS', 'easy', 'What does CSS stand for?', 
 '["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"]', 
 1, 'CSS stands for Cascading Style Sheets, used for styling HTML elements.',
 '{"youtube": "https://www.youtube.com/results?search_query=css+basics+tutorial", "website": "https://www.w3schools.com/css/", "course": "https://www.codecademy.com/learn/learn-css"}',
 '["css", "styling", "web"]'),

('programming', 'Python', 'easy', 'Which of the following is the correct way to create a list in Python?', 
 '["list = {}", "list = []", "list = ()", "list = <>"]', 
 1, 'In Python, lists are created using square brackets [], dictionaries use {}, tuples use ().',
 '{"youtube": "https://www.youtube.com/results?search_query=python+lists+tutorial", "website": "https://www.w3schools.com/python/python_lists.asp", "course": "https://www.codecademy.com/learn/learn-python-3"}',
 '["python", "lists", "data-structures"]'),

('programming', 'Java', 'easy', 'What is the correct way to declare a variable in Java?', 
 '["var x = 5;", "int x = 5;", "x = 5;", "declare int x = 5;"]', 
 1, 'In Java, variables must be declared with their data type, such as int x = 5; for integers.',
 '{"youtube": "https://www.youtube.com/results?search_query=java+variables+tutorial", "website": "https://www.w3schools.com/java/java_variables.asp", "course": "https://www.codecademy.com/learn/learn-java"}',
 '["java", "variables", "syntax"]'),

('programming', 'Git', 'easy', 'Which command is used to initialize a new Git repository?', 
 '["git start", "git init", "git create", "git new"]', 
 1, 'The git init command is used to create a new Git repository in the current directory.',
 '{"youtube": "https://www.youtube.com/results?search_query=git+init+tutorial", "website": "https://git-scm.com/docs/git-init", "course": "https://www.udemy.com/course/git-complete/"}',
 '["git", "version-control", "initialization"]'),

('programming', 'SQL', 'easy', 'Which SQL statement is used to retrieve data from a database?', 
 '["GET", "SELECT", "RETRIEVE", "FETCH"]', 
 1, 'The SELECT statement is used to query and retrieve data from database tables.',
 '{"youtube": "https://www.youtube.com/results?search_query=sql+select+tutorial", "website": "https://www.w3schools.com/sql/sql_select.asp", "course": "https://www.codecademy.com/learn/learn-sql"}',
 '["sql", "database", "query"]'),

('programming', 'React', 'easy', 'What is JSX in React?', 
 '["A database library", "A syntax extension for JavaScript", "A CSS framework", "A testing tool"]', 
 1, 'JSX is a syntax extension for JavaScript that allows you to write HTML-like syntax in React components.',
 '{"youtube": "https://www.youtube.com/results?search_query=react+jsx+tutorial", "website": "https://reactjs.org/docs/introducing-jsx.html", "course": "https://www.codecademy.com/learn/react-101"}',
 '["react", "jsx", "javascript"]');
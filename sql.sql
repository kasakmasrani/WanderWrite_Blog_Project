
CREATE DATABASE wanderwrite_blog;

USE wanderwrite_blog;
select * from posts;
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE, -- URL-friendly title
    content TEXT NOT NULL,
    excerpt TEXT DEFAULT NULL, -- Short summary
    author TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL, -- Featured image URL
    category VARCHAR(100) DEFAULT NULL, -- Blog post category
    tags JSON DEFAULT NULL, -- Tags for categorization
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft', -- Post status
    views INT DEFAULT 0, -- Number of views
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Post creation date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last update date
);
ALTER TABLE posts 
ADD COLUMN webpage VARCHAR(255) DEFAULT NULL; -- URL for the blog post webpage


select * from posts;

    INSERT INTO posts (title, slug, content, excerpt, author, image, category, tags, status, webpage) 
VALUES 
    ('Why Traveling Solo Can Change Your Life', 
    'why-traveling-solo-can-change-your-life', 
    'Solo travel offers experiences that can lead to incredible personal growth, freedom, and adventure. Here’s why you should give it a try.', 
    'Discover how solo travel can transform your life with adventure and self-discovery.', 
    'Ethan Mitchell', 
    'img/travel-solo.jpg', 
    'Travel', 
    '["travel", "solo", "adventure"]', 
    'published',
    '6_blogpost.html'),

    ('Improve Design with Typography', 
    'improve-design-with-typography', 
    'Typography is more than just choosing fonts. It’s about creating a visual hierarchy, enhancing readability, and conveying the right emotions...', 
    'Learn how to improve your designs with typography techniques.', 
    'Alice Green', 
    'img/typography.jpg', 
    'Design', 
    '["design", "typography", "visual"]', 
    'published',
    '7_blogpost.html'),

    ('A Beginner’s Guide to Plant-Based Eating', 
    'beginners-guide-to-plant-based-eating', 
    'Switching to a plant-based diet can seem daunting, but with the right tips and mindset, you can make the transition smoothly...', 
    'Start your plant-based journey with these simple tips.', 
    'Sophia Carter', 
    'img/plant-based.jpg', 
    'Health', 
    '["health", "nutrition", "plant-based"]', 
    'published',
    '8_blogpost.html'),

    ('How to Stay Motivated During Challenging Times', 
    'how-to-stay-motivated-during-challenging-times', 
    'Everyone faces tough moments. Learn how to maintain your motivation and positivity even in difficult circumstances...', 
    'Stay motivated and positive even in difficult times.', 
    'Daniel Walker', 
    'img/motivation.jpg', 
    'Self-Improvement', 
    '["motivation", "self-help", "mental-strength"]', 
    'published',
    NULL),

    ('The Power of Daily Journaling for Mental Health', 
    'power-of-daily-journaling-for-mental-health', 
    'Journaling has become a popular tool for self-reflection and mental well-being. Discover how it can improve your mental health...', 
    'Improve your mental health through daily journaling.', 
    'Olivia Hughes', 
    'img/journaling.jpg', 
    'Mental Health', 
    '["journaling", "mental-health", "self-care"]', 
    'published',
    NULL),

    ('Sustainable Living: Tips for Reducing Your Carbon Footprint', 
    'sustainable-living-reducing-carbon-footprint', 
    'Simple changes in your daily habits can make a big difference. Learn how to live more sustainably and help the planet...', 
    'Practical tips for reducing your carbon footprint.', 
    'Maya Robinson', 
    'img/sustainability.jpg', 
    'Environment', 
    '["sustainability", "eco-friendly", "green-living"]', 
    'published',
    NULL);



select * from users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- Plain text password
);
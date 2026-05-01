-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255)  NOT NULL,
    review        TEXT          NOT NULL,
    rating        DECIMAL(2, 1) NOT NULL,
    review_status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by    VARCHAR(255),
    updated_by    VARCHAR(255),
    status        VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE'
);

INSERT INTO reviews (name, review, rating, review_status, created_by, updated_by, status, created_at, updated_at)
VALUES ('Amit', 'Buy and sell entries are now visible in one place, and my daily margin checks are much faster.', 4.5,
        'APPROVED', 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Meera', 'Tracking party ledgers and mandi expenses like labor and transport is now simple and accurate.', 5.0,
        'APPROVED', 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Ravi', 'We moved from notebooks to digital records and can now monitor claims and damages without confusion.',
        4.5, 'APPROVED', 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Kirtan',
        'Profit and loss per trade is instant, which helps us make better pricing decisions throughout the day.', 4.5,
        'APPROVED', 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Mukesh', 'My team can track tola, bora, and other costs without missing entries in manual books.', 4.5,
        'APPROVED', 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Mansaram', 'Mandi-Pro gives us clean visibility across trades, finances, and outstanding party balances.', 4.5,
        'APPROVED', 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

       ('Suresh', 'Invoice tracking and settlement reconciliation are much easier than before.', 4.0, 'APPROVED',
        'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Neha', 'We reduced manual errors in accounting and improved reporting accuracy significantly.', 5.0, 'APPROVED',
        'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Rajesh', 'Daily operations feel more organized and transparent with digital records.', 4.5, 'APPROVED',
        'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Pooja', 'Managing multiple parties and their balances has become seamless.', 4.5, 'APPROVED', 'SYSTEM',
        'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

       ('Anil', 'Real-time updates on trades help us make quicker business decisions.', 4.0, 'REJECTED', 'SYSTEM',
        'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Kavita', 'The system is easy to use and helps reduce dependency on paperwork.', 4.5, 'REJECTED', 'SYSTEM',
        'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Vikram', 'Stock tracking and reporting are now centralized and reliable.', 4.0, 'REJECTED', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Sunita', 'All mandi operations are now streamlined and efficient.', 5.0, 'REJECTED', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

       ('Deepak', 'We can now easily monitor outstanding dues and payments.', 4.5, 'APPROVED', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Rohit', 'The platform saves time and reduces calculation errors.', 4.0, 'APPROVED', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Geeta', 'Handling multiple commodities and transactions is no longer confusing.', 4.5, 'APPROVED', 'SYSTEM',
        'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Manoj', 'Reports and summaries give us better financial insights.', 5.0, 'APPROVED', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

       ('Alok', 'The dashboard provides a clear overview of business performance.', 4.5, 'PENDING', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Shalini', 'Overall, a very helpful tool for modern mandi management.', 5.0, 'PENDING', 'SYSTEM', 'SYSTEM',
        'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
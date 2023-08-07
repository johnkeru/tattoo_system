+----------------+       +-----------------+
|     Users      |       |  Tattoo Artists |
+----------------+       +-----------------+
| id (PK)        | 1---1 | id (PK)         |
| name           | 1---1 | user_id (FK)    |
| email          | 1    | specialization |
| password       | 1    | experience_years|
| role           | 1    | description     |
| created_at     |       | hourly_rate     |
| updated_at     |       | created_at      |
+----------------+       | updated_at      |
                         +-----------------+
                                 ^
                                 |
                                 | 1
                                 |
                                 |
                        +------------------+
                        |    Customers     |
                        +------------------+
                        | id (PK)          |
                        | user_id (FK)     |
                        | phone_number     |
                        | address          |
                        | created_at       |
                        | updated_at       |
                        +------------------+
                                 ^
                                 |
                                 | 1
                                 |
                                 |
                    +----------------------+
                    |    Tattoo Designs    |
                    +----------------------+
                    | id (PK)              |
                    | artist_id (FK)       |
                    | title                |
                    | description          |
                    | image_url            |
                    | created_at           |
                    | updated_at           |
                    +----------------------+
                                 ^
                                 |
                                 | N
                                 |
                                 |
                     +-------------------------+
                     |       Appointments      |
                     +-------------------------+
                     | id (PK)                 |
                     | customer_id (FK)        |
                     | artist_id (FK)          |
                     | appointment_date        |
                     | start_time              |
                     | end_time                |
                     | status                  |
                     | created_at              |
                     | updated_at              |
                     +-------------------------+
                                 ^
                                 |
                                 | 1
                                 |
                                 |
                    +----------------------+
                    |       Supplies       |
                    +----------------------+
                    | id (PK)              |
                    | name                 |
                    | description          |
                    | quantity_available   |
                    | price                |
                    | supplier_name        |
                    | created_at           |
                    | updated_at           |
                    +----------------------+
                                 ^
                                 |
                                 | N
                                 |
                                 |
                     +-------------------------+
                     |         Orders          |
                     +-------------------------+
                     | id (PK)                 |
                     | customer_id (FK)        |
                     | order_date              |
                     | total_amount            |
                     | status                  |
                     | created_at              |
                     | updated_at              |
                     +-------------------------+
                                 ^
                                 |
                                 | N
                                 |
                                 |
                     +-------------------------+
                     |      Order Items       |
                     +-------------------------+
                     | id (PK)                 |
                     | order_id (FK)           |
                     | supply_id (FK)          |
                     | quantity                |
                     | subtotal                |
                     | created_at              |
                     | updated_at              |
                     +-------------------------+
                                 ^
                                 |
                                 | N
                                 |
                                 |
                     +-------------------------+
                     |   Ratings and Reviews   |
                     +-------------------------+
                     | id (PK)                 |
                     | customer_id (FK)        |
                     | artist_id (FK)          |
                     | rating                 |
                     | review_text            |
                     | created_at             |
                     | updated_at             |
                     +-------------------------+

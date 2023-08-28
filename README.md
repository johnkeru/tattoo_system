## System Installation Guide

Follow these steps to set up the system:

### Prerequisites

Make sure you have the following technologies installed:

- **GIT**
- **PHP:** Version 8 or above
- **Composer:** Version 2.x.x
- **Node.js:** Version 17 or above

### Clone the Repository

```bash
git clone https://github.com/johnkeru/tattoo_system.git
```

### Installation

1. Open your command prompt and navigate to the desired installation folder for the system.

2. Run the following commands to install the necessary dependencies:
    ```bash
    composer require
    npm install
    ```

3. Once you've successfully installed the dependencies, update the `.env` file. If you're using Windows, run:
    ```bash
    copy .env.example .env
    ```
   If you're using macOS, run:
    ```bash
    cp .env.example .env
    ```

4. Edit the `.env` file with your preferred text editor. Before doing so, ensure you've created a database in your MySQL server. You need the database name for the `.env` file to establish a connection. Locate the `DB_DATABASE` field in the `.env` file and set it to the name of the database you created. For example:
    ```dotenv
    DB_DATABASE=your_db_name
    ```

5. Save the `.env` file.

6. Now, you can run the following commands to set up the database:
    ```bash
    php artisan migrate
    php artisan db:seed
    ```

7. Open Visual Studio Code and create two terminals for frontend and backend development.

    - In the first terminal, run:
        ```bash
        npm run dev
        ```

    - In the second terminal, run:
        ```bash
        php artisan serve
        ```

You're all set! The system is now up and running.

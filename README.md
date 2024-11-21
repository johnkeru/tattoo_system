## System Installation Guide  

Follow these steps to set up the system:  

### Prerequisites  

Ensure the following technologies are installed on your machine:  

- **Git**  
- **PHP:** Version 8 or above  
- **Composer:** Version 2.x.x  
- **Node.js:** Version 17 or above  
- **MySQL** or a compatible database management system  

### Clone the Repository  

Clone the project repository to your local machine:  

```bash  
git clone https://github.com/johnkeru/tattoo_system.git  
```  

### Installation  

1. **Navigate to the project folder:**  
   Open your command prompt or terminal and move to the folder where you cloned the repository.  

   ```bash  
   cd tattoo_system  
   ```  

2. **Set up the `.env` file:**  
   - On **Windows**, run:  
     ```bash  
     copy .env.example .env  
     ```  
   - On **macOS** or **Linux**, run:  
     ```bash  
     cp .env.example .env  
     ```  

3. **Update the `.env` file:**  
   Open the `.env` file in your preferred text editor and update the database configuration fields. Ensure you have created a database in your MySQL server beforehand. Example settings:  

   ```dotenv  
   DB_CONNECTION=mysql  
   DB_HOST=127.0.0.1  
   DB_PORT=3306  
   DB_DATABASE=your_database_name  
   DB_USERNAME=your_username  
   DB_PASSWORD=your_password  
   ```  

4. **Generate the application key:**  
   Run the following command to generate a unique application key:  
   ```bash  
   php artisan key:generate  
   ```  

5. **Install dependencies:**  
   Run the following commands to install the necessary backend and frontend dependencies:  

   ```bash  
   composer install  
   npm install  
   ```  

6. **Migrate and seed the database:**  
   Set up the database schema and seed it with initial data:  

   ```bash  
   php artisan migrate --seed  
   ```  
   Or, if you want to refresh and seed the database:  
   ```bash  
   php artisan migrate:fresh --seed  
   ```  

7. **Start the development servers:**  
   Open your code editor (e.g., Visual Studio Code) and create two terminals for running the backend and frontend servers:  

   - **Backend:** Run the following command in the first terminal:  
     ```bash  
     php artisan serve  
     ```  

   - **Frontend:** Run the following command in the second terminal:  
     ```bash  
     npm run dev  
     ```  

### Access the System  

After completing the above steps, open your web browser and navigate to the following URL to access the system:  

```
http://127.0.0.1:8000  
```  

Congratulations! The system is now successfully installed and running.  
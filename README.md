## 📁 Project Structure

```
src/
├── components/
│   ├── Searchbar.jsx    # Input form to search for city
│   ├── Card.jsx         # Weather display card
|   ├── Dashboard.jsx    # Main component with state and data fetching logic
├── App.jsx              # Entry component
```

---

## 🛠️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Make sure the backend server is running**  
   Your frontend expects a POST endpoint at:  
   ```
   http://localhost:5000/weather
   ```

   Sample request body:
   ```json
   {
     "location": "London"
   }
   ```

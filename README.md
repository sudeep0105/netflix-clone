# 🎬 Netflix Clone - Full Stack Project

A fully responsive Netflix clone featuring a polished frontend user interface and a robust backend infrastructure.

---

## 📸 Project Walkthrough & User Flow

### 🔑 1. User Authentication (Sign Up)
The entry point of the application features a polished, fully customized Netflix-themed authentication gateway running locally on port 3000. 

* **Registration:** New users can securely register an account using their email address and password.
* **Navigation Toggle:** Includes a seamless toggle at the bottom (`Sign in now`) to switch effortlessly between the registration and login views.
* **Backend Integration:** This form securely communicates with the backend API to handle user registration, credential validation, and session management.

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/e661ef05-7a93-44dc-913e-d2b900aec999" />



### 🔑 2. Account Creation Success & Redirect
After a user successfully registers on the Sign Up page, the application dynamically updates the state to show a clear validation message.

* **Success Notification:** A clean, green alert box (`Account created successfully! You can now Sign In.`) appears at the bottom to give immediate feedback to the user.
* **State Management:** The UI smoothly transitions from the sign-up view to the sign-in view without requiring a manual page refresh, prompting the user to log into their brand new account.

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/836eacf0-edad-42a7-86be-fa9a349bf2a6" />



### 🎬 3. Main Movie Dashboard & Browse Screen
Upon successful authentication, the user is granted access to the main streaming interface, which dynamically displays content categories and media assets.

* **Dynamic Hero Banner:** Features a prominent spotlight title (e.g., *House of the Dragon*) complete with an overview description, a "Play" button, and a "My List" button overlaying a high-quality background graphic.
* **Persistent Header Navigation:** The top navbar includes the official logo branding alongside session-specific details displaying the logged-in user's email ID (`user@gmail.com`) and a functional "Sign Out" button.
* **Content Catalog Grid:** Shows a well-organized horizontal carousel grid labeled "NETFLIX ORIGINALS" displaying high-resolution movie and show posters with a clean hover layout.

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/d5295bc7-6cbe-443b-a9cd-cec79b5791b7" />


---

## 🛠️ Tech Stack
* **Frontend:** HTML, CSS, React
* **Backend:** Node.js & Java Spring Boot
* **Database:** MySQL

## 🏃‍♂️ How to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/sudeep0105/netflix-clone.git](https://github.com/sudeep0105/netflix-clone.git)

2. Set up the backend:
   ```bash
   cd netflix-backend
   npm install
   npm start

3. Set up the frontend:
   ```bash
   cd ../netflix-frontend
   npm install
   npm start

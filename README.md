# **MathLab || Mathematics Made Easy**  

## **Overview**  
MathLab is a web-based application designed to help students practice and improve their math skills. When a student answers a question incorrectly, an AI generates a similar question with different numbers and stores it in Firebase Firestore. This ensures continuous learning by reinforcing weak areas.  

## **Features**  

- **User Authentication:** Users can register, log in, and log out using Firebase Authentication.  
- **Database Storage:** Questions are stored in Firebase Firestore.  
- **AI-Powered Question Generation:** OpenAI generates a new, similar question when a student answers incorrectly.  
- **Difficulty Levels:** Users can filter questions by difficulty (Easy, Normal, Hard, or Random).  
- **Dynamic Question Flow:** Users receive instant feedback and can generate new questions as needed.  

## **Technologies Used**  

- **React.js** â€“ Frontend framework  
- **Firebase Firestore** â€“ Database for storing questions  
- **Firebase Authentication** â€“ User registration & login  
- **OpenAI GPT-4o-mini** â€“ AI-powered question generation  

## **Database Structure (Firebase Firestore)**  

Questions are stored in the `questions` collection using the following structure:  

```json
{
  "question": "What is 8 + 5?",
  "answer": "13",
  "difficulty": "easy",
  "topic": "addition"
}
```

## **AI Model Used**  

This project utilizes **OpenAI GPT-4o-mini** to generate similar math questions. When a user answers incorrectly, a prompt is sent to OpenAI, which returns a modified version of the question with different numbers.

### **How the AI is Prompted:**
The system sends a prompt to OpenAI instructing it to generate a math question with different numbers while maintaining the same structure as the original question. The prompt also instructs OpenAI to return the output in JSON format, including both the new question and its correct answer in this format:
```json
{  
    "question": "New math question",  
    "answer": "Correct answer"  
}  
```

## **How It Works**  

1. A user logs in and selects a difficulty level.  
2. The app loads questions from Firebase Firestore.  
3. The user answers a question:  
   - If **correct**, they proceed to the next question.  
   - If **incorrect**, the AI generates a similar question with different numbers.  
4. The generated question is stored in Firestore and displayed to the user.  
5. The user attempts the newly generated question.
6. When the user submits an answer, it is compared with the correct answer stored in the JSON response.

## **Usage**  

1. Answer a question.  
2. If incorrect, click **"Generate"** to create a new similar question.  
3. The new question is added to the database.  
4. Repeat the process to reinforce learning.  

## **Installation**  

### **Prerequisites**  

- Node.js installed on your machine  
- Firebase account with a configured Firestore database  
- OpenAI API key  

### **Setup Steps**  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/olamilekan5162/mathLab.git
   cd mathLab
   ```  

2. **Install dependencies:**  
   ```sh
   npm install
   ```  

3. **Set up Firebase:**  
   - Create a Firebase project.  
   - Enable Firestore Database.  
   - Enable Firebase Authentication.  

4. **Set up OpenAI:**  
   - Get an OpenAI API key from [OpenAI](https://openai.com/).  

5. **Create an `.env.local` file** in the root directory and add the following environment variables:  

   ```ini
   VITE_OPENAI_API_KEY=your-openai-api-key

   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   ```  

   Replace `your-...` values with your actual Firebase and OpenAI credentials.  

6. **Start the application:**  
   ```sh
   npm run dev
   ```  

## **API Usage**  

- **Fetching Questions** â€“ Retrieves questions from Firebase Firestore.  
- **Uploading Questions** â€“ Adds AI-generated questions to Firestore.  
- **Generating New Questions** â€“ Uses OpenAI API to modify an incorrect question.  

## **Simulating AI Question Generation**  

- Answer a question incorrectly to trigger AI question generation.  
- Click the **"Generate"** button to manually generate a similar question using AI.  
- The new question is stored in Firebase for future use.  

## **Future Improvements**  

- Improve AI question formatting and variation.  
- Implement a leaderboard and user progress tracking.  
- Support additional subjects beyond mathematics.  

## **GitHub Repository**  

ðŸ”— [GitHub Repo](https://github.com/olamilekan5162/mathLab)  

## **Live Demo**  

ðŸŒ [MathLab Live](https://math-lab-theta.vercel.app)  

## **Contributions**  

Feel free to fork the project, make improvements, and submit a pull request.  

## **License**  

This project is for educational purposes and is open for modification.  
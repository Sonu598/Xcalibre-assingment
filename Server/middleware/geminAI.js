const axios = require("axios");
require("dotenv").config();

async function convertTextToSQL(naturalQuery, retries = 3) {
  const prompt = `Here's a breakdown of the SQL database table by table:

patients Table: This table stores information about patients.  It includes:

id: A unique integer identifier for each patient (primary key, auto-incrementing).
name: The patient's name (required).
age: The patient's age.
gender: The patient's gender (Male, Female, or Other).
created_at: A timestamp indicating when the patient record was created (defaults to the current time).
doctors Table: This table stores information about doctors. It includes:

id: A unique integer identifier for each doctor (primary key, auto-incrementing).
name: The doctor's name (required).
specialty: The doctor's specialty.
created_at: A timestamp indicating when the doctor record was created (defaults to the current time).
appointments Table: This table stores information about appointments. It includes:

id: A unique integer identifier for each appointment (primary key, auto-incrementing).
patient_id: The ID of the patient associated with the appointment (foreign key referencing the patients table).
doctor_id: The ID of the doctor associated with the appointment (foreign key referencing the doctors table).
appointment_date: The date and time of the appointment.
status: The status of the appointment (Scheduled, Completed, or Cancelled).
vitals Table: This table stores patient vital signs. It includes:

id: A unique integer identifier for each set of vital signs (primary key, auto-incrementing).
patient_id: The ID of the patient whose vital signs are recorded (foreign key referencing the patients table).
bp_systolic: The systolic blood pressure.
bp_diastolic: The diastolic blood pressure.
temperature: The patient's temperature.
recorded_at: A timestamp indicating when the vital signs were recorded (defaults to the current time).
  
And my query is : ${naturalQuery}
Only write the sql query. Nothing more than that and also I don't need clarification.`;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINAI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const sqlQuery = response.data.candidates[0]?.content?.parts[0]?.text;
      if (sqlQuery) return cleanSQLQuery(sqlQuery);
      throw new Error("Gemini API returned an empty response");
    } catch (error) {
      if (error.response && error.response.status === 429 && i < retries - 1) {
        let waitTime = 2 ** i * 2000;
        console.log(
          `Rate limit hit. Retrying in ${waitTime / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        throw new Error("Failed to convert text to SQL: " + error.message);
      }
    }
  }
}

function cleanSQLQuery(sqlQuery) {
  if (sqlQuery.startsWith('"') && sqlQuery.endsWith('"')) {
    sqlQuery = sqlQuery.slice(1, -1);
  }
  sqlQuery = sqlQuery.replace(/```sql\s*|```/g, "").trim();
  return sqlQuery;
}

module.exports = convertTextToSQL;

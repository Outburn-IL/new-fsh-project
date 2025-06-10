## Checklist for Creating a New Project in FSH

---

1.  **Clone the Repository:**
    * Clone the required repository into your new project's folder.
    * Ensure you give the new repository a suitable name for your project.

2.  **Edit `sushi-config.yaml`:**
    * Inside the project directory, open the `sushi-config.yaml` file.
    * Edit all fields that contain content within curly braces (`{}`).
    * **Note:** The ID must comply with FHIR guidelines, which can be found here: [https://confluence.hl7.org/plugins/servlet/mobile?contentId=35718629#content/view/35718629](https://confluence.hl7.org/plugins/servlet/mobile?contentId=35718629#content/view/35718629)

3.  **Edit `package.json`:**
    * Perform the same editing steps for the `package.json` file.
    * **Important:** For fields with identical names in both files, the values **must** be the same!

4.  **Edit `.gitignore`:**
    * Add any directory or file to the `.gitignore` file that you do not want to appear in the repository.

5.  **Install Dependencies:**
    * Open a console (CMD or within VSCode).
    * Run the following command: `npm install`

6.  **Create a New GitHub Repository:**
    * Create a new repository on Outburn's GitHub: [https://github.com/Outburn-IL/](https://github.com/Outburn-IL/)
    * If you're unsure how to do this, ask for assistance.

---

**Completion and Recommendations:**

Your project is now ready to go. At this stage, it's recommended to perform an **initial commit** to Git, so that tracking of changes begins from the project's very first modification.

From this point forward, you will work exclusively in **VSCode**. It's highly recommended to add the following line below the `Description` line in every Profile, VS, or CS file:
`* insert ConformanceMetadata`

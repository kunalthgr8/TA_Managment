import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createObjectCsvWriter } from "csv-writer";

import Skills from "../../models/ta/skills.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const academicsResolvers = {
  Mutation: {
    generateCsv: async () => {
      try {
        // Fetch all skills data from the database
        console.log("Generating CSV file...");
        const skillsData = await Skills.find().lean();

        // Define the CSV writer
        const csvWriter = createObjectCsvWriter({
          path: join(__dirname, "../../../public/temp/skillsData.csv"), // updated path
          header: [
            { id: "idNumber", title: "ID Number" },
            { id: "areaOfSpecialization", title: "Area Of Specialization" },
            { id: "primarySkills", title: "Primary Skills" },
            { id: "secondarySkills", title: "Secondary Skills" },
            { id: "primaryProgSkills", title: "Primary Programming Skills" },
            {
              id: "secondaryProgSkills",
              title: "Secondary Programming Skills",
            },
            { id: "softwareTools", title: "Software Tools" },
            { id: "hardwareTools", title: "Hardware Tools" },
            { id: "patents", title: "Patents" },
            { id: "publications", title: "Publications" },
          ],
        });

        // Transform the data to match CSV structure
        const records = skillsData.map((skill) => ({
          idNumber: skill.idNumber,
          areaOfSpecialization: skill.areaOfSpecialization.join(", "),
          primarySkills: skill.primarySkills.join(", "),
          secondarySkills: skill.secondarySkills.join(", "),
          primaryProgSkills: skill.primaryProgSkills.join(", "),
          secondaryProgSkills: skill.secondaryProgSkills.join(", "),
          softwareTools: skill.softwareTools.join(", "),
          hardwareTools: skill.hardwareTools.join(", "),
          patents: skill.patents.join(", "),
          publications: skill.publications.join(", "),
        }));

        // Write the records to the CSV file
        await csvWriter.writeRecords(records);

        return "CSV file has been generated successfully";
      } catch (error) {
        console.error("Error generating CSV file:", error);
        throw new Error("Internal Server Error");
      }
    },
    trainModel: async () => {
      try {
        // const scriptPath = path.join('../../../', 'train.py');
        const scriptPath =
          "/home/lalit/Desktop/TA/TA_Managment/Backend/train.py";

        // Execute the Python script
        await new Promise((resolve, reject) => {
          exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              reject(`Error: ${error.message}`);
            }
            if (stderr) {
              console.error(`Stderr: ${stderr}`);
              reject(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            resolve(`Training completed successfully.`);
          });
        });

        return "Training completed successfully.";
      } catch (error) {
        console.error(error);
        return `Training failed: ${error}`;
      }
    },
    getIdNumbersByCourse: async (_, { courseName }) => {
      try {
        const scriptPath =
          "/home/lalit/Desktop/TA/TA_Managment/Backend/predict.py";

        const result = await new Promise((resolve, reject) => {
          exec(
            `python3 ${scriptPath} "${courseName}"`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                reject(`Error: ${error.message}`);
              }
              if (stderr) {
                console.error(`Stderr: ${stderr}`);
                reject(`Stderr: ${stderr}`);
              }
              console.log(`Stdout: ${stdout}`);
              resolve(stdout.trim());
            }
          );
        });

        const idNumbers = result.split("\n"); // Assuming the output is newline-separated
        return idNumbers;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
};

export default academicsResolvers;
